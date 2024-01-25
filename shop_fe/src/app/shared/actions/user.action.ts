import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const removeUser = createAction(
  '[User] Remove User',
  props<{ userId: number }>()
);
