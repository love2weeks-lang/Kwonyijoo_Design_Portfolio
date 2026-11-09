import { createFrameLoop } from './frameLoop.js';

// ui_battery_0 ~ 6: 0칸 → 6칸 충전, 완충 유지 후 반복 (사이클 약 4.8초)
const STEP_MS = 600;
const FULL_HOLD_MS = 1200;

export function createBattery(container) {
  const last = container.querySelectorAll('.frame').length - 1;

  return createFrameLoop(container, {
    restFrame: last,
    sequence: () =>
      Array.from({ length: last + 1 }, (_, i) => [i, i === last ? FULL_HOLD_MS : STEP_MS]),
  });
}
