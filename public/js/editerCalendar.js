let dataPic1dis = ['2017/11/6'];
let dataPic2dis = ['2017/11/10'];

jQuery(document).ready(function($){
  $(function () {
    console.log('test')
    $('#datetimepicker1').datetimepicker({
      locale: 'ru',
      stepping:10,
      format: 'DD.MM.YYYY',
      defaultDate: moment('01.11.2017').format('DD.MM.YYYY'),
      disabledDates: dataPic1dis
    });
    $('#datetimepicker2').datetimepicker({
      locale: 'ru',
      stepping:10,
      format: 'DD.MM.YYYY',
      defaultDate: moment('01.11.2017').format('DD.MM.YYYY'),
      disabledDates: dataPic2dis
    });
  });
});
