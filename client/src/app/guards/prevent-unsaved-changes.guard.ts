import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<unknown> = (
  component
) => {
  const confirmService = inject(ConfirmService);

  if ((component as MemberEditComponent).editForm?.dirty)
    return confirmService.confirm(
      'Unsaved Changes',
      'You have unsaved changes. Are you sure you want to leave without saving?',
      'Cancel',
      'Leave'
    );

  return true;
};
