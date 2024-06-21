import { CanDeactivateFn } from '@angular/router';

///before navigate from current url we can ask like are sure ?
export const deactiveGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return true;
};
