console.log('editercalendar');

let dataPic1dis;
let dataPic2dis = ['2017/11/10'];
let today = moment(new Date()).format('DD.MM.YYYY');
console.log(typeof today);
//console.log(moment(today).format('DD.MM.YYYY'));

async function start() {
  console.log('start');
  let response = await fetch(window.location.pathname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  dataPic1dis = JSON.parse(await response.json());

  jQuery(document).ready(function ($) {
    $(function () {
      console.log('dataPic1dis', dataPic1dis);
      $('#datetimepicker1').datetimepicker({
        locale: 'ru',
        stepping: 10,
        format: 'DD.MM.YYYY',
        //startDate: moment().format('MM.DD.YYYY'), //moment(today).format('DD.MM.YYYY'),
        defaultDate: moment(new Date()).format('MM.DD.YYYY'), //moment(today).format('DD.MM.YYYY'),
        disabledDates: dataPic1dis,
      });
      $('#datetimepicker2').datetimepicker({
        locale: 'ru',
        stepping: 10,
        format: 'DD.MM.YYYY',
        defaultDate: moment('01.11.2017').format('DD.MM.YYYY'),
        disabledDates: dataPic2dis,
      });
    });
  });

  // console.log(dataPic1dis);
}
start();
