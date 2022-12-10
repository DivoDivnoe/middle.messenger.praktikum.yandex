import renderDOM from '@/utils/helpers/renderDOM';
import { UserProps } from '@/modules/UserData/UserData';
import ProfileBlock from '@/modules/ProfileBlock';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
};

window.addEventListener('DOMContentLoaded', () => {
  const profile = new ProfileBlock({ props: { user: mockUser } });
  renderDOM('#app', profile);
});
