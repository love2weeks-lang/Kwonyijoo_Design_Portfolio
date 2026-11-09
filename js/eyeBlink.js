import { createFrameLoop } from './frameLoop.js';

// 감은 상태(EYE_04)로 시작해 뜬 상태(EYE_01)와 반복, 중간 프레임으로 자연스럽게 전환
const CLOSED_MS = 1000;
const OPEN_MS = 1000;
const TRANSITION_FRAME_MS = 80;

export function createEyeBlink(container) {
  return createFrameLoop(container, {
    restFrame: 0,
    sequence: () => [
      [3, CLOSED_MS],
      [2, TRANSITION_FRAME_MS],
      [1, TRANSITION_FRAME_MS],
      [0, OPEN_MS],
      [1, TRANSITION_FRAME_MS],
      [2, TRANSITION_FRAME_MS],
    ],
  });
}
