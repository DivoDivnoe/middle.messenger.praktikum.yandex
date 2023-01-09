const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_PER_WEEK = 7 * MILLISECONDS_PER_DAY;

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const isToday = (date: Date): boolean => {
  const now = Date.now();
  const dateTime = date.getTime();

  return Math.floor(now / MILLISECONDS_PER_DAY) === Math.floor(dateTime / MILLISECONDS_PER_DAY);
};

const isThisWeek = (date: Date): boolean => {
  const now = Date.now();
  const dateTime = date.getTime();

  const nowRest = now % MILLISECONDS_PER_DAY;
  const dateTimeRest = dateTime % MILLISECONDS_PER_DAY;

  return now - nowRest - (dateTime - dateTimeRest) < MILLISECONDS_PER_WEEK;
};

const isThisYear = (date: Date): boolean => {
  const now = Date.now();

  return date.getFullYear() === new Date(now).getFullYear();
};

export const getTime = (date: Date): string => {
  const minutes = date.getMinutes();
  const hours = date.getHours();

  return `${hours}:${minutes}`;
};

export const getDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };

  if (isThisYear(date)) {
    return date.toLocaleDateString('ru-RU', options);
  }

  options.year = 'numeric';

  return date.toLocaleDateString('ru-RU', options).replace(/ г./, '');
};

const getChatTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isToday(date)) {
    return getTime(date);
  }

  if (isThisWeek(date)) {
    return days[date.getDay()] as string;
  }

  return getDate(date);
};

export default getChatTime;
