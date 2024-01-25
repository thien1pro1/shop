import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { addUser, loadUsersSuccess, removeUser } from '../actions/user.action';

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => [...state, ...users]),
  on(addUser, (state, { user }) => [...state, user]),
  on(removeUser, (state, { userId }) =>
    state.filter((user) => user.id !== userId)
  )
);
