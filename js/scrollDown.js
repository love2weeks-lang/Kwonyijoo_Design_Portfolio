import { prefersReducedMotion } from './motion.js';

// 깜빡임은 cover.css(.scroll-down), 여기서는 클릭/키보드 이동만 처리
// 이동 대상: 표지(.cover) 바로 다음 섹션. 없으면 아무 동작도 하지 않는다
export function initScrollDown(button) {
  const cover = button.closest('.cover');

  button.addEventListener('click', () => {
    const target = cover.nextElementSibling;
    if (!target) return;

    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // 키보드 사용자의 포커스도 다음 섹션으로 이동
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
