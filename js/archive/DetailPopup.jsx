import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { UI } from './archives.js';

const FADE_MS = 250;
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

// 스크롤바 자리는 html.in-archive의 scrollbar-gutter로 유지해, 잠가도 헤더·카드 폭이 바뀌지 않는다
function useScrollLock(locked) {
  useLayoutEffect(() => {
    if (!locked) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [locked]);
}

// 팝업_스크롤바.png를 썸으로 쓰는 스크롤바. 썸을 끌어서 스크롤할 수 있다
function Scrollbar({ scrollerRef, trackRef, thumbRef }) {
  const onPointerDown = (event) => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    event.preventDefault();
    thumb.setPointerCapture(event.pointerId);
    const startY = event.clientY;
    const startTop = scroller.scrollTop;
    const range = track.clientHeight - thumb.offsetHeight;
    const max = scroller.scrollHeight - scroller.clientHeight;

    const onMove = (moveEvent) => {
      scroller.scrollTop = startTop + ((moveEvent.clientY - startY) / range) * max;
    };
    const onUp = () => {
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerup', onUp);
      thumb.removeEventListener('pointercancel', onUp);
    };
    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerup', onUp);
    thumb.addEventListener('pointercancel', onUp);
  };

  return (
    <div className="popup-track" ref={trackRef} aria-hidden="true">
      <img className="popup-thumb" ref={thumbRef} src={UI.popupScrollbar} alt="" onPointerDown={onPointerDown} draggable={false} />
    </div>
  );
}

/**
 * 상세 팝업. index가 null이 아니면 열린다.
 * 화살표는 열린 제작물의 페이지(탭·차수·회차) 안에서만 순환한다. 페이지가 하나면 화살표를 숨긴다.
 */
export function DetailPopup({ pages, index, onChange, onClose }) {
  const isOpen = index !== null;
  const [shownIndex, setShownIndex] = useState(index);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef(null);
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const returnFocus = useRef(null);
  const requestedIndex = useRef(null);

  // 열기·닫기 페이드. 닫는 동안에도 마지막 페이지를 유지한다
  useEffect(() => {
    const instant = window.matchMedia(REDUCED_QUERY).matches;
    requestedIndex.current = null;
    if (isOpen) {
      setShownIndex(index);
      if (!visible) {
        returnFocus.current = document.activeElement;
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      }
      return undefined;
    }
    if (shownIndex === null) return undefined;
    setVisible(false);
    const timer = setTimeout(() => {
      setShownIndex(null);
      returnFocus.current?.focus({ preventScroll: true });
    }, instant ? 0 : FADE_MS);
    return () => clearTimeout(timer);
  }, [isOpen, index]); // eslint-disable-line react-hooks/exhaustive-deps

  const mounted = shownIndex !== null;
  useScrollLock(mounted);

  const updateScrollbar = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!scroller || !track || !thumb) return;
    const max = scroller.scrollHeight - scroller.clientHeight;
    const ratio = max > 0 ? scroller.scrollTop / max : 0;
    thumb.style.transform = `translateY(${ratio * (track.clientHeight - thumb.offsetHeight)}px)`;
    track.style.visibility = max > 0 ? 'visible' : 'hidden';
  }, []);

  // 새 페이지는 항상 맨 위에서 시작
  useLayoutEffect(() => {
    if (!mounted) return;
    scrollerRef.current.scrollTop = 0;
    updateScrollbar();
  }, [mounted, shownIndex, updateScrollbar]);

  useEffect(() => {
    if (!mounted) return undefined;
    const scroller = scrollerRef.current;
    const observer = new ResizeObserver(updateScrollbar);
    observer.observe(scroller);
    observer.observe(scroller.firstElementChild);
    return () => observer.disconnect();
  }, [mounted, updateScrollbar]);

  useEffect(() => {
    if (visible) dialogRef.current?.querySelector('.popup-close')?.focus({ preventScroll: true });
  }, [visible]);

  if (!mounted) return null;

  const entry = pages[shownIndex];
  // 같은 제작물의 페이지들 (pages는 제작물 순서대로 이어져 있다)
  const siblings = pages.reduce((list, page, pageIndex) => {
    if (page.itemIndex === entry.itemIndex) list.push(pageIndex);
    return list;
  }, []);
  const hasPages = siblings.length > 1;

  // 같은 틱에 여러 번 눌려도 누적되도록 마지막으로 요청한 인덱스를 기준으로 계산
  const step = (delta) => {
    if (!hasPages) return;
    const base = requestedIndex.current ?? shownIndex;
    const position = siblings.indexOf(base);
    requestedIndex.current = siblings[(position + delta + siblings.length) % siblings.length];
    onChange(requestedIndex.current);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowLeft') {
      step(-1);
    } else if (event.key === 'ArrowRight') {
      step(1);
    } else if (event.key === 'Tab') {
      // 포커스를 팝업 안에 가둔다
      const items = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE)).filter((node) => node.offsetParent);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  // 화살표·여백 위에서 굴린 휠도 팝업 내용을 스크롤
  const onWheel = (event) => {
    if (scrollerRef.current.contains(event.target)) return;
    scrollerRef.current.scrollTop += event.deltaY;
  };

  const label = `${entry.item.title}${entry.label ? ` ${entry.label}` : ''}`;

  return (
    <div
      className={`popup-layer${visible ? ' is-visible' : ''}`}
      onKeyDown={onKeyDown}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div
        className="popup"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${label} 상세 디자인`}
        style={{ '--cw': entry.images[0].width }}
        onWheel={onWheel}
      >
        <div className="popup-scroller" ref={scrollerRef} onScroll={updateScrollbar} tabIndex={0}>
          <div className="popup-content">
            {entry.images.map((image, imageIndex) => (
              <img
                key={image.src}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={imageIndex === 0 ? `${label} 상세 디자인` : ''}
                loading={imageIndex < 2 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        </div>

        <button className="popup-close" type="button" aria-label="닫기" onClick={onClose}>
          <img src={UI.popupClose} alt="" />
        </button>
        {hasPages && (
          <>
            <button className="popup-arrow is-left" type="button" aria-label="이전 페이지" onClick={() => step(-1)}>
              <img src={UI.popupArrowLeft} alt="" />
            </button>
            <button className="popup-arrow is-right" type="button" aria-label="다음 페이지" onClick={() => step(1)}>
              <img src={UI.popupArrowRight} alt="" />
            </button>
          </>
        )}
        <Scrollbar scrollerRef={scrollerRef} trackRef={trackRef} thumbRef={thumbRef} />
      </div>
    </div>
  );
}
