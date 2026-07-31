export const SUBJECT_ACTION_TOP_RESET_PX = 32;
export const SUBJECT_ACTION_HIDE_AFTER_Y = 96;
export const SUBJECT_ACTION_DIRECTION_DELTA_PX = 16;

export interface SubjectActionVisibilityState {
  lastY: number;
  direction: 'up' | 'down' | null;
  distance: number;
  visibility: 'visible' | 'hidden';
}

function normalizeScrollY(scrollY: number, maxScrollY: number): number {
  const maximum = Number.isFinite(maxScrollY) ? Math.max(0, maxScrollY) : 0;
  const current = Number.isFinite(scrollY) ? scrollY : 0;
  return Math.min(maximum, Math.max(0, current));
}

export function createSubjectActionVisibilityState(
  scrollY = 0,
  maxScrollY = 0,
): SubjectActionVisibilityState {
  return {
    lastY: normalizeScrollY(scrollY, maxScrollY),
    direction: null,
    distance: 0,
    visibility: 'visible',
  };
}

export function resetSubjectActionVisibility(
  scrollY: number,
  maxScrollY: number,
): SubjectActionVisibilityState {
  return createSubjectActionVisibilityState(scrollY, maxScrollY);
}

export function updateSubjectActionVisibility(
  state: SubjectActionVisibilityState,
  scrollY: number,
  maxScrollY: number,
  forceVisible = false,
): SubjectActionVisibilityState {
  const nextY = normalizeScrollY(scrollY, maxScrollY);
  if (forceVisible || nextY <= SUBJECT_ACTION_TOP_RESET_PX) {
    return resetSubjectActionVisibility(nextY, maxScrollY);
  }

  const delta = nextY - state.lastY;
  if (delta === 0) return { ...state, lastY: nextY };

  const direction = delta > 0 ? 'down' : 'up';
  const distance = state.direction === direction
    ? state.distance + Math.abs(delta)
    : Math.abs(delta);
  let visibility = state.visibility;

  if (
    direction === 'down' &&
    nextY > SUBJECT_ACTION_HIDE_AFTER_Y &&
    distance >= SUBJECT_ACTION_DIRECTION_DELTA_PX
  ) {
    visibility = 'hidden';
  } else if (direction === 'up' && distance >= SUBJECT_ACTION_DIRECTION_DELTA_PX) {
    visibility = 'visible';
  }

  return { lastY: nextY, direction, distance, visibility };
}
