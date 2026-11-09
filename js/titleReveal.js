import { prefersReducedMotion } from './motion.js';

// 진입 시 1회: translateY(35px), opacity 0 → 0, 1 / 0.9s ease-out (cover.css)
export function revealTitle(el) {
  el.classList.add(prefersReducedMotion() ? 'is-shown' : 'is-revealed');
}
