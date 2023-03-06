### Учебный проект "Чат"

- `npm install` — установка зависимостей;
- `npm run dev` — запуск dev-сервера;
- `npm run check` — проверка кода линтерами, запуск тестов и проверка на компиляцию ts;
- `npm run build` — сборка статики;
- `npm start` — запуск express сервера;

[Макет](<https://www.figma.com/file/jNZNeyawyLO3LIZqkumEWD/Chat_external_link-(Copy)?node-id=20%3A287>)

[Опубликованный проект](https://my-chat-b6qy.onrender.com/)

В проекте реализована авторизация, аутентификация, регистрация и обновление данных пользователя, клиентский роутинг, создание и удаление чатов, добавление и удаление пользователей в чат.

Из посторонних основных инструментов использовались:

- `handlebars` — шаблонизатор;
- `express` — запуск простейшего сервера для отображения статики;
- `webpack` — сборка проекта;
- `eslint, stylelint` — линтинг;
- `husky` - для прекоммит-хуков;
- `postcss` - для более удобной работы со стилями;
- `jest` - для написание тестов;
- `typescript` — для написания более качественного кода;
