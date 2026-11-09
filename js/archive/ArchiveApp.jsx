import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ARCHIVES } from './archives.js';
import { ArchivePage } from './ArchivePage.jsx';

// 해시 라우트: #/archive/<id>
const ROUTE = /^#\/archive\/([\w-]+)/;

function currentArchiveId() {
  const match = window.location.hash.match(ROUTE);
  return match && ARCHIVES[match[1]] ? match[1] : null;
}

export function ArchiveApp() {
  const [archiveId, setArchiveId] = useState(currentArchiveId);
  // 메인에서 들어온 경우 돌아갈 스크롤 위치
  const returnScroll = useRef(null);
  const homeTitle = useRef(document.title);

  useEffect(() => {
    const onHashChange = () => {
      const next = currentArchiveId();
      setArchiveId((previous) => {
        if (next && !previous) returnScroll.current = window.scrollY;
        return next;
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (archiveId) {
      root.classList.add('in-archive');
      document.title = `ARCHIVE ${ARCHIVES[archiveId].number} — ${ARCHIVES[archiveId].title}`;
      window.scrollTo(0, 0);
      return;
    }
    if (!root.classList.contains('in-archive')) return;
    root.classList.remove('in-archive');
    document.title = homeTitle.current;
    if (returnScroll.current !== null) {
      window.scrollTo(0, returnScroll.current);
      returnScroll.current = null;
    } else {
      document.getElementById('select-projects')?.scrollIntoView();
    }
  }, [archiveId]);

  const goHome = () => {
    if (returnScroll.current !== null) {
      window.history.back();
      return;
    }
    // 아카이브 주소로 바로 들어온 경우: 메인의 SELECT PROJECTS로 (기록을 교체해 다시 아카이브로 돌아오지 않게)
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  if (!archiveId) return null;
  return <ArchivePage key={archiveId} archive={ARCHIVES[archiveId]} onBack={goHome} />;
}
