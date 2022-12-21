import AuthApi from '@/api/AuthApi';
import { SigninData, SignupData } from '@/api/types';
import router from '@/utils/components/Router';
import store from '@/utils/components/Store';

class AuthController {
  private _api = new AuthApi();

  public async signin(signinData: SigninData) {
    await this._request(() => this._signin(signinData), 'signin error');
  }

  public async signup(signupData: SignupData) {
    await this._request(() => this._signup(signupData), 'signup error');
  }

  public async logout() {
    await this._request(this._logout.bind(this), 'logout error');
  }

  private async _signin(signinData: SigninData) {
    await this._api.signin(signinData);
    await this._getUser();

    router.go('/profile');
  }

  private async _signup(signupData: SignupData) {
    await this._api.signup(signupData);
    await this._getUser();

    router.go('/profile');
  }

  private async _logout() {
    await this._api.logout();

    router.go('/login');
  }

  public async getUser() {
    await this._request(this._getUser.bind(this), 'get user error');
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

  private async _request(req: () => Promise<void>, errorMessage = '') {
    store.set('user.loading', true);
    store.set('user.error', null);

    try {
      await req();
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `${errorMessage} ${err.message}`);
      }
    } finally {
      store.set('user.loading', false);
    }
  }
}

export default new AuthController();
