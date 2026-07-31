import { describe, expect, it } from 'vitest';
import {
  createSubjectActionVisibilityState,
  resetSubjectActionVisibility,
  updateSubjectActionVisibility,
} from '../../src/lib/subject-action-visibility';

const maximum = 1_000;

describe('subject action visibility', () => {
  it('starts visible and stays visible before the hide position', () => {
    const initial = createSubjectActionVisibilityState(0, maximum);
    expect(initial.visibility).toBe('visible');
    expect(updateSubjectActionVisibility(initial, 90, maximum).visibility).toBe('visible');
  });

  it('hides after stable downward movement and shows after stable upward movement', () => {
    let state = createSubjectActionVisibilityState(80, maximum);
    state = updateSubjectActionVisibility(state, 100, maximum);
    expect(state.visibility).toBe('hidden');

    state = updateSubjectActionVisibility(state, 92, maximum);
    expect(state.visibility).toBe('hidden');
    state = updateSubjectActionVisibility(state, 84, maximum);
    expect(state.visibility).toBe('visible');
  });

  it('ignores alternating jitter below the direction threshold', () => {
    let state = createSubjectActionVisibilityState(140, maximum);
    for (const position of [148, 141, 149, 142, 150]) {
      state = updateSubjectActionVisibility(state, position, maximum);
    }
    expect(state.visibility).toBe('visible');
  });

  it('resets near the top and while visibility is protected', () => {
    let state = updateSubjectActionVisibility(
      createSubjectActionVisibilityState(100, maximum),
      140,
      maximum,
    );
    expect(state.visibility).toBe('hidden');

    state = updateSubjectActionVisibility(state, 150, maximum, true);
    expect(state).toEqual(createSubjectActionVisibilityState(150, maximum));
    state = updateSubjectActionVisibility(state, 20, maximum);
    expect(state).toEqual(createSubjectActionVisibilityState(20, maximum));
  });

  it('clamps mobile overscroll without changing visibility spuriously', () => {
    let state = createSubjectActionVisibilityState(0, maximum);
    state = updateSubjectActionVisibility(state, -40, maximum);
    expect(state).toEqual(createSubjectActionVisibilityState(0, maximum));

    state = createSubjectActionVisibilityState(maximum, maximum);
    state = updateSubjectActionVisibility(state, maximum + 80, maximum);
    expect(state.visibility).toBe('visible');
    expect(state.lastY).toBe(maximum);
  });

  it('resets an arbitrary state to visible at the current normalized position', () => {
    const hidden = {
      lastY: 200,
      direction: 'down' as const,
      distance: 40,
      visibility: 'hidden' as const,
    };
    expect(resetSubjectActionVisibility(250, maximum)).toEqual({
      ...hidden,
      lastY: 250,
      direction: null,
      distance: 0,
      visibility: 'visible',
    });
  });
});
