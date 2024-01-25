import { createAction, props } from '@ngrx/store';

export const updateSalary = createAction(
  '[ReportSalaryUser] Update Salary',
  props<{ userId: number; month: number; newValue: number }>()
);
