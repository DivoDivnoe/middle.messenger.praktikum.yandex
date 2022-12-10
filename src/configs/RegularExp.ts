const RegularExp = {
  LOGIN: /^(?=.*[a-z_-])[\w-]{3,20}$/i,
  NAME: /^[A-ZА-Я]{1}[A-zА-я-]+$/,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9-]+[A-Z].[A-Z]{2,4}$/i,
  PHONE: /^\+?\d{10,15}$/,
  PASSWORD: /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/,
  MESSAGE: /^.+$/,
};

export default RegularExp;
