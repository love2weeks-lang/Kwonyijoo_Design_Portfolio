import { useEffect, useMemo, useState } from 'react';
import { ARCHIVES, ARCHIVE_NAV, HEADER_TEXT, UI } from './archives.js';
import { ArchiveCard } from './ArchiveCard.jsx';
import { DetailPopup } from './DetailPopup.jsx';

function ArchiveHeader({ archive, onBack }) {
  return (
    <header className="archive-header">
      <img className="archive-header-box" src={UI.headerBox} alt="" />
      <div className="archive-header-inner">
        <button className="archive-back" type="button" aria-label="메인으로 돌아가기" onClick={onBack}>
          <img src={UI.headerBack} alt="" />
        </button>
        <nav className="archive-nav" aria-label="프로젝트 아카이브">
          <img className="archive-nav-text" src={HEADER_TEXT[archive.id]} alt="" />
          {ARCHIVE_NAV.map((item) => {
            const isCurrent = item.id === archive.id;
            const isReady = Boolean(ARCHIVES[item.id]);
            const style = { '--x': item.hit[0], '--w': item.hit[1] - item.hit[0] + 1 };
            return isReady ? (
              <a
                key={item.id}
                className="archive-nav-item"
                href={`#/archive/${item.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                style={style}
              >
                <span className="sr-only">{item.label}</span>
              </a>
            ) : (
              <span key={item.id} className="archive-nav-item is-disabled" aria-disabled="true" style={style}>
                <span className="sr-only">{item.label} (준비 중)</span>
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const TOP_VISIBLE_AFTER_PX = 400;

// 페이지 전체를 맨 위로 올리는 버튼. 조금 스크롤한 뒤에 나타난다
function TopButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > TOP_VISIBLE_AFTER_PX);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      className={`archive-top${shown ? ' is-shown' : ''}`}
      type="button"
      aria-label="맨 위로"
      tabIndex={shown ? 0 : -1}
      onClick={toTop}
    >
      <img src={UI.pageTop} alt="" />
      <img className="top-on" src={UI.pageTopOn} alt="" />
    </button>
  );
}

export function ArchivePage({ archive, onBack }) {
  // 팝업은 프로젝트 순서대로 모든 페이지(탭·회차)를 하나의 목록으로 넘긴다
  const pages = useMemo(
    () => archive.items.flatMap((item, itemIndex) =>
      item.pages.map((entry, pageIndex) => ({ ...entry, item, itemIndex, pageIndex }))),
    [archive],
  );
  const [popupIndex, setPopupIndex] = useState(null);

  const openPopup = (itemIndex, pageIndex = 0) => {
    setPopupIndex(pages.findIndex((entry) => entry.itemIndex === itemIndex && entry.pageIndex === pageIndex));
  };

  return (
    <div className="archive">
      <ArchiveHeader archive={archive} onBack={onBack} />
      <main
        className="archive-list"
        style={{ '--shift': archive.shiftX }}
        aria-label={`ARCHIVE ${archive.number} ${archive.title}`}
      >
        <h1 className="sr-only">ARCHIVE {archive.number} — {archive.title}</h1>
        {archive.items.map((item, index) => (
          <ArchiveCard key={item.id} item={item} onOpen={(pageIndex) => openPopup(index, pageIndex)} />
        ))}
      </main>
      <TopButton />
      <DetailPopup
        pages={pages}
        index={popupIndex}
        onChange={setPopupIndex}
        onClose={() => setPopupIndex(null)}
      />
    </div>
  );
}
