import { prefersReducedMotion } from './motion.js';

// 섹션이 뷰포트에 28% 들어오면 1회 재생, 순서와 시간은 profile.css
const ENTRY_THRESHOLD = 0.28;

export function initProfileReveal(section) {
  const reveal = () => section.classList.add('is-revealed');

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    reveal();
    return;
  }

  // 이미지 디코딩이 끝난 뒤 시작해 애니메이션 중간에 이미지가 뜨지 않게 한다
  const images = Array.from(section.querySelectorAll('img'));
  const ready = Promise.all(images.map((img) => img.decode().catch(() => {})));

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    ready.then(reveal);
  }, { threshold: ENTRY_THRESHOLD });

  observer.observe(section);
}
