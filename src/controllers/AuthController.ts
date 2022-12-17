import AuthApi from '@/api/AuthApi';
import { SigninData, SignupData } from '@/api/types';
import router from '@/utils/components/Router';
import store from '@/utils/components/Store';

class AuthController {
  private _api = new AuthApi();

  public async signin(signinData: SigninData) {
    store.set('user.loading', true);

    try {
      await this._api.signin(signinData);
      await this._getUser();

      router.go('/profile');
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `signin error ${err.message}`);
      }
    } finally {
      store.set('user.loading', false);
    }
  }

  public async signup(signupData: SignupData) {
    store.set('user.loading', true);

    try {
      await this._api.signup(signupData);
      await this._getUser();

      router.go('/profile');
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `signup error ${err.message}`);
      }
    } finally {
      store.set('user.loading', false);
    }
  }

  public async logout() {
    store.set('user.loading', true);

    try {
      await this._api.logout();

      router.go('/');
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `logout error ${err.message}`);
      }
    } finally {
      store.set('user.loading', false);
    }
  }

  public async getUser() {
    store.set('user.loading', true);

    try {
      await this._getUser();
    } finally {
      store.set('user.loading', false);
    }
  }

  private async _getUser() {
    try {
      const user = await this._api.getUser();
      store.set('user', user);
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `get user data error ${err.message}`);
      }
    }
  }
}

export default new AuthController();
