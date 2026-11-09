// 반복 애니메이션 공통 상태: 탭 가시성 + prefers-reduced-motion
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set();

export const prefersReducedMotion = () => reducedQuery.matches;

// 반복 애니메이션을 재생해도 되는 상태인지
export const canAnimate = () => !document.hidden && !reducedQuery.matches;

function notify() {
  document.documentElement.classList.toggle('is-page-hidden', document.hidden);
  const active = canAnimate();
  listeners.forEach((fn) => fn(active));
}

document.addEventListener('visibilitychange', notify);
reducedQuery.addEventListener('change', notify);

// fn(active)를 즉시 한 번, 이후 상태가 바뀔 때마다 호출. 해제 함수 반환
export function onMotionChange(fn) {
  listeners.add(fn);
  fn(canAnimate());
  return () => listeners.delete(fn);
}
