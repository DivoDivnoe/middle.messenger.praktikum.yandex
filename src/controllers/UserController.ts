import UserApi from '@/api/UserApi';
import { PasswordUpdateType, User, UserMainData } from '@/api/types';
import { Routes } from '@/configs/Routes';
import router from '@/utils/components/Router';
import store from '@/utils/components/Store';

class UserController {
  private _api = new UserApi();

  public updateProfile(options: UserMainData): Promise<void> {
    return this._request(() => this._updateProfile(options), 'update profile error');
  }

  public updateAvatar(data: File): Promise<void> {
    return this._request(() => this._updateAvatar(data), 'update avatar error');
  }

  public updatePassword(data: PasswordUpdateType): Promise<void> {
    return this._request(() => this._updatePassword(data), 'update password error');
  }

  public async getUserById(id: string): Promise<void> {
    return this._request(() => this._getUserById(id), 'get user error');
  }

  private async _updateProfile(options: UserMainData): Promise<void> {
    const user = await this._api.updateProfile(options);
    store.set('user.data', user);

    router.go(Routes.PROFILE);
  }

  private async _updateAvatar(data: File): Promise<void> {
    const user = await this._api.updateAvatar(data);
    store.set('user.data', user);
  }

  private async _updatePassword(data: PasswordUpdateType): Promise<void> {
    await this._api.updatePassword(data);
    router.go(Routes.PROFILE);
  }

  private async _getUserById(id: string): Promise<void> {
    const user = await this._api.getUserById(id);
    store.set('user.current', user);
  }

  private _getUsersByLogin(login: string): Promise<User[]> {
    return this._api.getUsersByLogin(login);
  }

  public async getUsersToAddByLogin(login: string): Promise<void> {
    const users = await this._getUsersByLogin(login);
    store.set(
      'usersToAddToChat',
      users.map(({ id }) => id),
    );
  }

  public async getUsersToRemoveByLogin(login: string): Promise<void> {
    const users = await this._getUsersByLogin(login);
    store.set(
      'usersToRemoveFromChat',
      users.map(({ id }) => id),
    );
  }

  private async _request(req: () => Promise<void>, errorMessage = '') {
    store.set('user.loading', true);
    store.set('user.error', null);

    try {
      await req();
    } catch (err) {
      if (err instanceof Error) {
        store.set('user.error', `${errorMessage} ${err.message}`);
        alert(`${errorMessage} ${err.message}`);
      }
    } finally {
      store.set('user.loading', false);
    }
  }
}

export default new UserController();
