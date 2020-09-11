let dataPic1dis;

async function start() {
  let response = await fetch(window.location.pathname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  dataPic1dis = await JSON.parse(response.json());
}

let dataPic2dis = ['2017/11/10'];

jQuery(document).ready(function ($) {
  $(function () {
    console.log('test');
    $('#datetimepicker1').datetimepicker({
      locale: 'ru',
      stepping: 10,
      format: 'DD.MM.YYYY',
      defaultDate: new Date().format('DD.MM.YYYY'),
      startDate: new Date().toLocaleDateString(),
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
