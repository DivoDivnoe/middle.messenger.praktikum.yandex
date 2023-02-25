export enum Routes {
  LOGIN = '/',
  SIGNUP = '/sign-up',
  PROFILE = '/settings',
  EDIT_PROFILE = '/edit/settings',
  EDIT_PASSWORD = '/edit/password',
  CHATS = '/messenger',
  NOT_FOUND = '/notfound',
  SERVER_ERROR = '/servererror',
}

export const publicRoutes = [Routes.LOGIN, Routes.SIGNUP];
