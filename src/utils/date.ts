import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return format(date, 'HH:mm', { locale: ru })
};