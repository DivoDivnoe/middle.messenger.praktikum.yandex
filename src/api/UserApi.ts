import BaseAPI from './BaseApi';
import Endpoint from './Endpoint';
import { PasswordUpdateType, User, UserMainData } from './types';

enum Path {
  PROFILE = '/profile',
  AVATAR = '/profile/avatar',
  PASSWORD = '/password',
  USER_BY_LOGIN = '/search',
}

class UserApi extends BaseAPI {
  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;

  constructor() {
    super(Endpoint.USER);
  }

  public updateProfile(options: UserMainData): Promise<User> {
    return this._http.put(Path.PROFILE, { data: options });
  }

  public updateAvatar(avatar: File): Promise<User> {
    const data = new FormData();
    data.append('avatar', avatar);
    return this._http.put(Path.AVATAR, { data });
  }

  public updatePassword(data: PasswordUpdateType): Promise<void> {
    return this._http.put(Path.PASSWORD, { data });
  }

  public getUserById(id: number): Promise<User> {
    return this._http.get(`/${id}`);
  }

  public getUsersByLogin(login: string): Promise<User[]> {
    return this._http.post(Path.USER_BY_LOGIN, { data: { login } });
  }
}

export default UserApi;
