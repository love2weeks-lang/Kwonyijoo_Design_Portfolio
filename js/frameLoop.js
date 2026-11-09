import { onMotionChange } from './motion.js';

/**
 * 겹쳐 둔 프레임 이미지 중 하나만 보이게 하며 시퀀스를 반복 재생한다.
 * 프레임 교체는 visibility 토글만 사용하므로 레이아웃 재계산이 없다.
 *
 * @param {HTMLElement} container  .frame 이미지들을 담은 요소
 * @param {object} options
 * @param {() => Array<[number, number]>} options.sequence  한 사이클의 [프레임 인덱스, 유지 ms] 목록. 매 사이클 호출
 * @param {number} options.restFrame  정지 상태(탭 비활성, reduced-motion)에서 보여줄 프레임
 */
export function createFrameLoop(container, { sequence, restFrame }) {
  const frames = Array.from(container.querySelectorAll('.frame'));
  let current = frames.findIndex((f) => f.classList.contains('is-active'));
  let steps = [];
  let timer = 0;
  let unsubscribe = null;

  function show(index) {
    if (index === current) return;
    frames[current]?.classList.remove('is-active');
    frames[index].classList.add('is-active');
    current = index;
  }

  function tick() {
    if (!steps.length) steps = sequence();
    const [index, hold] = steps.shift();
    show(index);
    timer = setTimeout(tick, hold);
  }

  function pause() {
    clearTimeout(timer);
    timer = 0;
    steps = [];
    show(restFrame);
  }

  return {
    start() {
      if (unsubscribe) return;
      unsubscribe = onMotionChange((active) => {
        pause();
        if (active) tick();
      });
    },
    stop() {
      unsubscribe?.();
      unsubscribe = null;
      pause();
    },
  };
}
