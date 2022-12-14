import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import ChatsPage from './pages/chats';
import LoginPage from './pages/login';
import PasswordFormPage from './pages/passwordForm';
import ProfilePage from './pages/profile';
import SignupPage from './pages/signup';
import router from './utils/components/Router';

enum Routes {
  INDEX = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  PROFILE = '/profile',
  EDIT_PASSWORD = '/edit/password',
  CHATS = '/chats',
  NOT_FOUND = '/notfound',
  SERVER_ERROR = '/servererror',
}

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (evt) => {
    const target = evt.target as HTMLElement;

    if (target.tagName.toLowerCase() === 'a') {
      evt.preventDefault();

      const pathName =
        '/' +
        ((target as HTMLAnchorElement).href.split('://')[1] as string)
          .split('/')
          .slice(1)
          .join('/');

      router.go(pathName);
    }
  });

  router
    .use(Routes.SIGNUP, SignupPage)
    .use(Routes.LOGIN, LoginPage)
    .use(Routes.CHATS, ChatsPage)
    .use(Routes.PROFILE, ProfilePage)
    .use(Routes.EDIT_PASSWORD, PasswordFormPage)
    .use(Routes.NOT_FOUND, NotFoundPage)
    .use(Routes.SERVER_ERROR, ServerErrorPage);
  router.start();

  // router.go(Routes.CHATS);
});
