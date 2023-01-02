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

const getChatTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isToday(date)) {
    const minutes = date.getMinutes();
    const hours = date.getHours();

    return `${hours}:${minutes}`;
  }

  if (isThisWeek(date)) {
    return days[date.getDay()] as string;
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return date.toLocaleDateString('ru-RU', options).replace(/ г./, '');
};

export default getChatTime;
