import renderDOM from '@/utils/helpers/renderDOM';
import { UserProps } from '@/modules/UserData/UserData';
import ProfileFormBlock from '@/modules/ProfileFormBlock';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
};

window.addEventListener('DOMContentLoaded', () => {
  const profileForm = new ProfileFormBlock({
    props: {
      user: mockUser,
      onSubmit: (...args) => {
        console.log(...args);
      },
    },
  });

  renderDOM('#app', profileForm);
});
