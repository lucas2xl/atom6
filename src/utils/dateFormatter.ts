import { format } from 'date-fns';

export const dateFormatter = (date: Date) =>
  format(new Date(date).getTime(), 'dd/MM/yyyy');
