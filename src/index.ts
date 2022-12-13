import ChatsPage from './pages/chats';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import router from './utils/components/Router';

enum Routes {
  INDEX = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  PROFILE = '/profile',
  CHATS = '/chats',
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

  router.use(Routes.SIGNUP, SignupPage).use(Routes.LOGIN, LoginPage).use(Routes.CHATS, ChatsPage);
  router.start();

  router.go(Routes.CHATS);
});
