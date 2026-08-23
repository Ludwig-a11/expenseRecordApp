import { format, fromUnixTime, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';

const formatRelativeDay = (unixTimestamp) => {
  const date = fromUnixTime(unixTimestamp);

  if (isToday(date)) return 'HOY';
  if (isYesterday(date)) return 'AYER';

  return format(date, "dd 'de' MMMM", { locale: es }).toUpperCase();
};

export default formatRelativeDay;
