/*
 * 최초 접속 로딩 화면.
 * - 표시 여부는 index.html <head>의 인라인 스크립트가 html.is-loading으로 미리 정한다
 *   (같은 탭에서 이미 봤거나 아카이브 주소로 바로 들어오면 표시하지 않음).
 * - 진행률 = COVER 이미지 디코딩 + 웹폰트 준비 중 끝난 항목의 비율 (실제 측정값).
 * - 끝나면 0.5초 페이드아웃 후 제거하고 loaderDone을 resolve 한다. COVER 애니메이션은 이걸 기다린다.
 */

export const LOADER_SEEN_KEY = 'pf-loading-seen';

const MIN_SHOW_MS = 900; // 정상 환경에서도 바가 차는 모습이 보일 만큼만
const MAX_WAIT_MS = 8000; // 리소스 문제가 있어도 이 시간이 지나면 진입
const HOLD_FULL_MS = 150; // 100%를 잠깐 보여 준 뒤 페이드
const FADE_FALLBACK_MS = 700;

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function markSeen() {
  try {
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  } catch {
    // 저장이 막혀 있어도 로딩 화면 동작에는 영향 없음
  }
}

function requiredTasks() {
  const cover = document.querySelector('.cover');
  const images = cover ? Array.from(cover.querySelectorAll('img')) : [];
  const loaderImages = Array.from(document.querySelectorAll('[data-loader] img'));
  return [
    ...images.map((img) => img.decode().catch(() => {})),
    ...loaderImages.map((img) => img.decode().catch(() => {})),
    document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
  ];
}

function run(loader) {
  const fill = loader.querySelector('.loader-fill');
  const bar = loader.querySelector('[role="progressbar"]');
  const tasks = requiredTasks();
  const startedAt = performance.now();
  let settled = 0;
  let forced = false;
  let shown = 0;

  tasks.forEach((task) => task.then(() => { settled += 1; }));
  const timeout = setTimeout(() => { forced = true; }, MAX_WAIT_MS);

  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timeout);
      loader.classList.add('is-leaving');
      let done = false;
      const remove = () => {
        if (done) return;
        done = true;
        markSeen();
        root.classList.remove('is-loading');
        loader.remove();
        resolve();
      };
      loader.addEventListener('transitionend', (event) => {
        if (event.target === loader) remove();
      });
      setTimeout(remove, FADE_FALLBACK_MS);
    };

    const frame = (now) => {
      const actual = forced ? 1 : settled / tasks.length;
      // 실제 진행률을 넘지 않고, 너무 빨리 끝나 깜빡이지 않도록 최소 표시 시간만큼만 늦춘다
      const target = reducedMotion ? actual : Math.min(actual, (now - startedAt) / MIN_SHOW_MS);
      shown = reducedMotion ? target : shown + (target - shown) * 0.18;
      if (target >= 1 && shown > 0.995) shown = 1;

      fill.style.setProperty('--progress', shown.toFixed(4));
      bar.setAttribute('aria-valuenow', String(Math.round(actual * 100)));

      if (shown >= 1) {
        setTimeout(finish, HOLD_FULL_MS);
        return;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
}

function start() {
  const loader = document.querySelector('[data-loader]');
  if (!root.classList.contains('is-loading') || !loader) {
    loader?.remove();
    return Promise.resolve();
  }
  return run(loader);
}

/** 로딩 화면이 완전히 사라지면 resolve. 표시하지 않는 경우 바로 resolve */
export const loaderDone = start();
