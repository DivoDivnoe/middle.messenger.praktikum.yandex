import renderDOM from '@/utils/helpers/renderDOM';
import { UserProps } from '@/modules/UserData/UserData';
import ProfileWithPopup from '@/modules/ProfileWithPopup';

const mockUser: UserProps = {
  email: 'some.email@gmail.com',
  login: 'login',
  first_name: 'Andrey',
  second_name: 'Ivanov',
  phone: '+79999999999',
};

window.addEventListener('DOMContentLoaded', () => {
  const profileWithPopup = new ProfileWithPopup({
    props: {
      profile: { user: mockUser },
      avatar: { onSubmit: (value: FormDataEntryValue) => console.log(value) },
    },
  });

  renderDOM('#app', profileWithPopup);
});
