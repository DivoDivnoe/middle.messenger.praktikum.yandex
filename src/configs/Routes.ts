export enum Routes {
  INDEX = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  PROFILE = '/profile',
  EDIT_PROFILE = '/edit/profile',
  EDIT_PASSWORD = '/edit/password',
  CHATS = '/chats',
  NOT_FOUND = '/notfound',
  SERVER_ERROR = '/servererror',
}

export const publicRoutes = [Routes.LOGIN, Routes.SIGNUP];
