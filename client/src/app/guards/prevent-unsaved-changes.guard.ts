import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if ((component as MemberEditComponent).editForm?.dirty)
    return confirm(
      'Are you sure you want to leave? Unsaved changes will be lost.'
    );

  return true;
};
