import datepicker from 'js-datepicker'; 

const date = new Date();

//календарь
const picker = datepicker('.datepicker', {
  startDay: 1,
  position: 'bl',
  minDate: new Date(),
  customDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  customMonths: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  overlayButton: 'Ok',
  overlayPlaceholder: `Year, ${date.getFullYear()}`,
});