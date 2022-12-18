import BaseAPI from './BaseApi';
import Endpoint from './Endpoint';
import { SigninData, SignupData, User } from './types';

enum Path {
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  GET_USER = '/user',
  LOGOUT = '/logout',
}

class AuthApi extends BaseAPI {
  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;

  constructor() {
    super(Endpoint.AUTH);
  }

  public signin(signinData: SigninData) {
    console.log('sign in api');
    return this._http.post(Path.SIGN_IN, { data: signinData });
  }

  public signup(signupData: SignupData) {
    return this._http.post(Path.SIGN_UP, { data: signupData });
  }

  public getUser(): Promise<User> {
    return this._http.get<User>(Path.GET_USER);
  }

  public logout() {
    return this._http.post(Path.LOGOUT);
  }
}

export default AuthApi;
