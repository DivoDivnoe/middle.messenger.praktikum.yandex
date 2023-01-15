import AuthApi from '@/api/AuthApi';
import { SigninData, SignupData } from '@/api/types';
import { Routes } from '@/configs/Routes';
import router from '@/utils/components/Router';
import store from '@/store/Store';
import MessagesController from './MessagesController';

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

  public async getUser() {
    store.set('isLoading', true);

    try {
      await this._getUser();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    } finally {
      store.set('isLoading', false);
    }
  }

  private async _signin(signinData: SigninData) {
    await this._api.signin(signinData);
    await this._getUser();

    router.go(Routes.CHATS);
  }

  private async _signup(signupData: SignupData) {
    await this._api.signup(signupData);
    await this._getUser();

    router.go(Routes.CHATS);
  }

  private async _logout() {
    await this._api.logout();
    MessagesController.disconnectAll();

    router.go(Routes.LOGIN);
  }

  private async _getUser() {
    const user = await this._api.getUser();
    store.set('user', user);
  }

  private async _request(req: () => Promise<void>, errorMessage = '') {
    store.set('isLoading', true);

    try {
      await req();
    } catch (err) {
      if (err instanceof Error) {
        alert(`${errorMessage} ${err.message}`);
      }
    } finally {
      store.set('isLoading', false);
    }
  }
}

export default new AuthController();
