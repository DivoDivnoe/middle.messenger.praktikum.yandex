import { Routes, publicRoutes } from './configs/Routes';
import AuthController from './controllers/AuthController';
import Loader from './modules/Loader';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import ChatsPage from './pages/chats';
import LoginPage from './pages/login';
import PasswordFormPage from './pages/passwordForm';
import ProfilePage from './pages/profile';
import ProfileFormPage from './pages/profileForm';
import SignupPage from './pages/signup';
import router from './utils/components/Router';
import renderDOM from './utils/helpers/renderDOM';

window.addEventListener('DOMContentLoaded', async () => {
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

  renderDOM('#app', new Loader({ props: {} }));

  router
    .use(Routes.SIGNUP, SignupPage)
    .use(Routes.LOGIN, LoginPage)
    .use(Routes.CHATS, ChatsPage)
    .use(Routes.PROFILE, ProfilePage)
    .use(Routes.EDIT_PROFILE, ProfileFormPage)
    .use(Routes.EDIT_PASSWORD, PasswordFormPage)
    .use(Routes.NOT_FOUND, NotFoundPage)
    .use(Routes.SERVER_ERROR, ServerErrorPage);

  const isProtectedRoute = !publicRoutes.includes(window.location.pathname as Routes);

  try {
    await AuthController.getUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.CHATS);
    }
  } catch {
    if (isProtectedRoute) {
      router.go(Routes.LOGIN);
    }

    router.start();
  }
});
