import moment from 'moment';

export const format = (date, fmt) => (moment(date).format(fmt));
