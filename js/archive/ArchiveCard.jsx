import { useEffect, useRef, useState } from 'react';
import { UI } from './archives.js';

const SWIPE_MIN_PX = 40;

// 썸네일 기준 px 좌표를 CSS 변수로
const place = ({ x, y, w, h }) => ({ '--x': x, '--y': y, '--w': w, '--h': h });

// 이미지 한 장에서 점 하나를 원형으로 잘라 보여 준다
function DotCrop({ crop }) {
  return (
    <span className="thumb-dot-crop" style={{ '--size': crop.size }}>
      <img
        src={crop.src}
        alt=""
        style={{ '--img-w': crop.imgW, '--img-h': crop.imgH, '--cx': crop.cx, '--cy': crop.cy }}
      />
    </span>
  );
}

function Dots({ dots, count, index, onChange }) {
  return (
    <div className="thumb-dots" style={{ ...place(dots), background: dots.color }}>
      {dots.centers.slice(0, count).map((center, dotIndex) => (
        <button
          key={center}
          type="button"
          className="thumb-dot"
          style={{ '--dx': center, '--dy': dots.cy }}
          aria-label={`${dotIndex + 1}번째 슬라이드`}
          aria-current={dotIndex === index ? 'true' : undefined}
          onClick={() => onChange(dotIndex)}
        >
          <DotCrop crop={dotIndex === index ? dots.active : dots.inactive} />
        </button>
      ))}
    </div>
  );
}

/**
 * 직접 끌어서(마우스 드래그·터치 스와이프)만 슬라이드를 넘긴다.
 * 마우스 휠·트랙패드 스크롤은 슬라이드를 넘기지 않고 페이지 스크롤로 그대로 둔다.
 */
function useSwipe(ref, go) {
  const goRef = useRef(go);
  goRef.current = go;

  useEffect(() => {
    const node = ref.current;
    let start = null;

    const onDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    };
    const onUp = (event) => {
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) goRef.current(dx < 0 ? 1 : -1);
    };
    const onCancel = () => { start = null; };

    node.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    return () => {
      node.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
    };
  }, [ref]);
}

// 썸네일 안 슬라이드. 이미지·라벨·화살표·점은 모두 썸네일 기준 좌표로 겹쳐 놓는다
function ThumbCarousel({ title, carousel, offsetX, index, onChange }) {
  const count = carousel.slides.length;
  const go = (delta) => onChange((index + delta + count) % count);
  const slideName = (slide, slideIndex) => slide.name ?? `${slideIndex + 1}번째 슬라이드`;
  const swipeRef = useRef(null);
  useSwipe(swipeRef, go);

  return (
    <div
      className="thumb-carousel"
      style={{ '--offset': offsetX }}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} 슬라이드`}
    >
      {carousel.cover && (
        <span className="thumb-cover" style={{ ...place(carousel.cover), background: carousel.cover.color }} />
      )}
      {carousel.slides.map((slide, slideIndex) => {
        const active = slideIndex === index;
        return (
          <div key={slideIndex} className={`thumb-slide${active ? ' is-active' : ''}`} aria-hidden={!active}>
            {slide.images.map((item, imageIndex) => (
              <img
                key={item.src}
                className="thumb-layer"
                style={place(item)}
                src={item.src}
                alt={active && imageIndex === 0 ? `${title} ${slideName(slide, slideIndex)}` : ''}
                loading="eager"
                draggable={false}
              />
            ))}
            {slide.label && <img className="thumb-layer" style={place(slide.label)} src={slide.label.src} alt="" draggable={false} />}
          </div>
        );
      })}
      <div className="thumb-swipe" ref={swipeRef} style={place(carousel.area)} />
      {['left', 'right'].map((side) => (
        <button
          key={side}
          className="thumb-arrow"
          type="button"
          style={{ '--x': carousel.arrows[side].x, '--y': carousel.arrows[side].y }}
          aria-label={side === 'left' ? '이전 슬라이드' : '다음 슬라이드'}
          onClick={() => go(side === 'left' ? -1 : 1)}
        >
          <img src={carousel.arrows[side].src} alt="" draggable={false} />
        </button>
      ))}
      {carousel.dots && <Dots dots={carousel.dots} count={count} index={index} onChange={onChange} />}
    </div>
  );
}

export function ArchiveCard({ item, onOpen }) {
  const [slide, setSlide] = useState(0);
  const { info } = item;
  const hasPopup = item.pages.length > 0;

  return (
    <article className="archive-card" aria-labelledby={`archive-${item.id}`}>
      <h2 className="sr-only" id={`archive-${item.id}`}>{item.title}</h2>
      <p className="sr-only">{item.description}</p>
      <img
        className="archive-thumb"
        src={item.thumb.src}
        width={item.thumb.width}
        height={item.thumb.height}
        style={{ '--w': item.thumb.width, '--offset': item.offsetX }}
        alt=""
        loading="lazy"
        draggable={false}
      />
      {item.carousel && (
        <ThumbCarousel
          title={item.title}
          carousel={item.carousel}
          offsetX={item.offsetX}
          index={slide}
          onChange={setSlide}
        />
      )}
      <dl className="sr-only">
        {info.date && <><dt>작업 일시</dt><dd>{info.date}</dd></>}
        <dt>소요 기간</dt><dd>{info.period}</dd>
        <dt>기여도</dt><dd>{info.contribution}</dd>
        <dt>TOOL</dt><dd>{info.tools.join(', ')}</dd>
        <dt>AI 사용 범위</dt><dd>{info.ai === 'X' ? '없음' : info.ai}</dd>
      </dl>
      {hasPopup && (
        <button
          className="archive-full"
          type="button"
          aria-haspopup="dialog"
          aria-label={`FULL DESIGN: ${item.title}`}
          onClick={() => onOpen(item.carousel ? item.carousel.slides[slide].page : 0)}
        >
          <img className="btn-off" src={UI.buttonOff} alt="" />
          <img className="btn-on" src={UI.buttonOn} alt="" />
        </button>
      )}
    </article>
  );
}
