import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const COUNT = 6;
const CARD_WIDTH = 381;
const CARD_HEIGHT = 537;
const DURATION_MS = 580;
const DRAG_THRESHOLD_PX = 6;
const WHEEL_STEP_PX = 50;
const WHEEL_GESTURE_GAP_MS = 120;
const WHEEL_GESTURE_MAX_MS = 600;
const MAX_QUEUED_STEPS = 3;

/*
 * 선택 인덱스와의 상대 거리(rel, -3 ~ 3)별 슬롯. x·y는 원본 카드 크기(381×537) 기준 px, 시안에서 측정.
 * 카드는 rel = ±3에서 opacity 0이므로 그 지점에서 반대편으로 넘어가도 보이지 않는다.
 * 순서: rel -3, -2, -1, 0, 1, 2, 3 중 0~3만 정의하고 음수는 x를 뒤집어 쓴다.
 */
const SLOTS = {
  desktop: [
    { x: 0, y: 0, scale: 1, dim: 0, opacity: 1 },
    { x: 392, y: 19, scale: 0.9554, dim: 0.5, opacity: 1 },
    { x: 760, y: 26.5, scale: 0.874, dim: 0.8, opacity: 1 },
    { x: 1100, y: 26.5, scale: 0.8, dim: 0.8, opacity: 0 },
  ],
};

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

const mod = (value, size) => ((value % size) + size) % size;
const wrapRel = (value) => mod(value + COUNT / 2, COUNT) - COUNT / 2;
const lerp = (a, b, t) => a + (b - a) * t;

// cubic-bezier(0.22, 1, 0.36, 1)
function easeOut(t) {
  const [x1, y1, x2, y2] = [0.22, 1, 0.36, 1];
  const axis = (a, b, u) => 3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;
  let u = t;
  for (let i = 0; i < 6; i += 1) {
    const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2);
    if (Math.abs(dx) < 1e-5) break;
    u -= (axis(x1, x2, u) - t) / dx;
  }
  return axis(y1, y2, u);
}

function slotAt(slots, rel) {
  const distance = Math.min(Math.abs(rel), slots.length - 1);
  const from = Math.floor(distance);
  const to = Math.min(from + 1, slots.length - 1);
  const t = distance - from;
  const side = Math.sign(rel);
  return {
    x: lerp(slots[from].x, slots[to].x, t) * side,
    y: lerp(slots[from].y, slots[to].y, t),
    scale: lerp(slots[from].scale, slots[to].scale, t),
    dim: lerp(slots[from].dim, slots[to].dim, t),
    // 사라지는 구간을 앞당겨 rel = ±3 부근(반대편으로 넘어가는 지점)에서는 항상 완전히 투명
    opacity: lerp(slots[from].opacity, slots[to].opacity, Math.min(1, t / 0.6)),
    glow: Math.max(0, 1 - distance),
  };
}

function glowFilter(color, alpha) {
  if (alpha <= 0) return 'none';
  const hex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `drop-shadow(0 0 calc(15 * var(--u)) ${color}${hex})`;
}

/**
 * 연속 값 pos 하나로 모든 카드의 transform·opacity·filter·z-index·딤을 계산한다.
 * 입력이 들어오면 pos의 목표만 바꾸므로 빠른 연속 입력에도 카드가 겹치거나 꼬이지 않는다.
 */
export function useCarousel(projects) {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const pos = useRef(0);
  const target = useRef(0);
  const tween = useRef(0);
  const slots = useRef(SLOTS.desktop);
  const activeRef = useRef(0);

  const render = useCallback(() => {
    cardsRef.current.forEach((node, index) => {
      if (!node) return;
      const rel = wrapRel(index - pos.current);
      const slot = slotAt(slots.current, rel);
      const tx = -50 + (slot.x / CARD_WIDTH) * 100;
      const ty = -50 + (slot.y / CARD_HEIGHT) * 100;
      node.style.transform = `translate(${tx}%, ${ty}%) scale(${slot.scale})`;
      node.style.opacity = slot.opacity;
      node.style.visibility = slot.opacity <= 0 ? 'hidden' : 'visible';
      node.style.zIndex = 100 - Math.round(Math.abs(rel) * 10);
      node.style.filter = glowFilter(projects[index].color, slot.glow);
      node.lastElementChild.style.opacity = slot.dim;
    });
  }, [projects]);

  const syncActive = useCallback((value) => {
    const next = mod(Math.round(value), COUNT);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  }, []);

  const animateTo = useCallback((value) => {
    target.current = value;
    syncActive(value);
    cancelAnimationFrame(tween.current);

    if (window.matchMedia(REDUCED_QUERY).matches) {
      pos.current = value;
      render();
      return;
    }

    const from = pos.current;
    const startedAt = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - startedAt) / DURATION_MS);
      pos.current = lerp(from, value, easeOut(t));
      render();
      if (t < 1) tween.current = requestAnimationFrame(frame);
    };
    tween.current = requestAnimationFrame(frame);
  }, [render, syncActive]);

  const step = useCallback((delta) => {
    const base = Math.round(pos.current);
    const next = target.current + delta;
    animateTo(Math.min(base + MAX_QUEUED_STEPS, Math.max(base - MAX_QUEUED_STEPS, next)));
  }, [animateTo]);

  const goTo = useCallback((index) => {
    step(wrapRel(index - mod(target.current, COUNT)));
  }, [step]);

  // 드래그·스와이프, 카드 클릭
  const drag = useRef(null);

  const onPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPos: pos.current,
      card: event.target.closest('[data-index]'),
      dragging: false,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    };
  }, []);

  const onPointerMove = useCallback((event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.startX;

    if (!state.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      // 세로 이동이 더 크면 페이지 스크롤에 양보
      if (Math.abs(event.clientY - state.startY) > Math.abs(dx)) {
        drag.current = null;
        return;
      }
      state.dragging = true;
      cancelAnimationFrame(tween.current);
      state.startPos = pos.current;
      state.startX = event.clientX;
      state.stepPx = cardsRef.current[0].offsetWidth * (slots.current[1].x / CARD_WIDTH);
      stageRef.current.setPointerCapture(event.pointerId);
      return;
    }

    const elapsed = Math.max(1, event.timeStamp - state.lastTime);
    state.velocity = (event.clientX - state.lastX) / elapsed;
    state.lastX = event.clientX;
    state.lastTime = event.timeStamp;
    pos.current = state.startPos - (event.clientX - state.startX) / state.stepPx;
    render();
    syncActive(pos.current);
  }, [render, syncActive]);

  const onPointerUp = useCallback((event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;

    if (state.dragging) {
      // 빠르게 튕기면 절반을 넘지 않아도 다음 카드로
      const flick = Math.max(-0.5, Math.min(0.5, (-state.velocity * 120) / state.stepPx));
      animateTo(Math.round(pos.current + flick));
      return;
    }
    if (event.type === 'pointerup' && state.card) {
      const rel = wrapRel(Number(state.card.dataset.index) - target.current);
      if (rel !== 0) step(rel);
    }
  }, [animateTo, step]);

  // 가로 휠·트랙패드. 세로 스크롤은 건드리지 않는다
  useEffect(() => {
    const stage = stageRef.current;
    let accumulated = 0;
    let lastEvent = 0;
    let lockedAt = 0;

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();

      const now = event.timeStamp;
      const newGesture = now - lastEvent > WHEEL_GESTURE_GAP_MS;
      lastEvent = now;
      if (newGesture) {
        accumulated = 0;
        lockedAt = 0;
      }
      // 관성 스크롤로 한 번의 제스처가 여러 칸 넘어가지 않게 잠금
      if (lockedAt && now - lockedAt < WHEEL_GESTURE_MAX_MS) return;

      accumulated += event.deltaX;
      if (Math.abs(accumulated) >= WHEEL_STEP_PX) {
        step(Math.sign(accumulated));
        accumulated = 0;
        lockedAt = now;
      }
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [step]);

  // 초기 배치. 모바일도 같은 배치를 비율대로 축소만 한다
  useLayoutEffect(() => {
    render();
    return () => cancelAnimationFrame(tween.current);
  }, [render]);

  const setCardRef = useCallback((index) => (node) => {
    cardsRef.current[index] = node;
  }, []);

  return {
    active,
    stageRef,
    setCardRef,
    step,
    goTo,
    stageHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
