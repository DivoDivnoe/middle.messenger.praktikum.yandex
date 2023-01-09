import UserApi from '@/api/UserApi';
import { PasswordUpdateType, User, UserMainData } from '@/api/types';
import { Routes } from '@/configs/Routes';
import store from '@/store/Store';
import router from '@/utils/components/Router';

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

  private async _getUsersToAddByLogin(login: string): Promise<void> {
    const users = await this._getUsersByLogin(login);

    if (!users.length) {
      throw new Error('no users found');
    }

    store.set(
      'usersToAddToChat',
      users.map(({ id }) => id),
    );
  }

  public getUsersToAddByLogin(login: string): Promise<void> {
    return this._request(() => this._getUsersToAddByLogin(login), 'add users to chat error');
  }

  private async _getUsersToRemoveByLogin(login: string): Promise<void> {
    const users = await this._getUsersByLogin(login);

    if (!users.length) {
      throw new Error('no users found');
    }

    store.set(
      'usersToRemoveFromChat',
      users.map(({ id }) => id),
    );
  }

  public getUsersToRemoveByLogin(login: string): Promise<void> {
    return this._request(
      () => this._getUsersToRemoveByLogin(login),
      'remove users from chat error',
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
