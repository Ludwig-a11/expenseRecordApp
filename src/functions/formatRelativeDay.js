import { format, fromUnixTime, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

const formatRelativeDay = (unixTimestamp) => {
  const date = fromUnixTime(unixTimestamp);

  if (isToday(date)) return 'HOY';
  if (isYesterday(date)) return 'AYER';

  return format(date, "dd 'de' MMMM", { locale: es }).toUpperCase();
};

const formatDayBadge = (unixTimestamp) => {
  const date = fromUnixTime(unixTimestamp);
  return format(date, 'EEEE d MMM', { locale: es }).toUpperCase();
};

export { formatDayBadge };
export default formatRelativeDay;
