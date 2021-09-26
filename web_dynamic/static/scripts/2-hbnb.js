$(document).ready(function () {
  const checkedAmenity = [];
  $('input').click(function () {
    dataId = $(this).attr('data-id');
    dataName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedAmenity[dataId] = dataName;
    } else {
      delete checkedAmenity[dataId];
    }
    arrayAmenity = $.map(checkedAmenity, function (dataName) {
      return dataName;
    });
    $('.amenities h4').text(arrayAmenity.join(', '));
  });
});

$(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
	  if (data.status === 'OK') {
      $('header #api_status').addClass('available');
	  }
  });
});
