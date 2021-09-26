
const checkedAmenity = [];

const checkAmenities = function () {
  $(document).ready(function () {
    $('input').click(function () {
      const dataId = $(this).attr('data-id');
      const dataName = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        checkedAmenity[dataId] = dataName;
      } else {
        delete checkedAmenity[dataId];
      }
      const arrayAmenity = $.map(checkedAmenity, function (dataName) {
        return dataName;
      });
      $('.amenities h4').text(arrayAmenity.join(', '));
    });
  });
}


const checkStatus = function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('header #api_status').addClass('available');
    }
  });
}

const postPlaces = function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: (response) => {
      response.forEach(element => {
      const htmlContent = articleHtml(element);
      $(htmlContent).appendTo('.places');
      });
    }
  });
}

  
function articleHtml(element) {
	return (`
	  <article>
		<div class='title_box'>
		  <h2>${element.name}</h2>
		  <div class='price_by_night'>${element.price_by_night}</div>
		</div>
		<div class='information'>
		  <div class='max_guest'>${element.max_guest} Guests</div>
		  <div class='number_rooms'>${element.number_rooms} Bedrooms</div>
		  <div class='number_bathrooms'>${element.number_bathrooms} Bathrooms</div>
		</div>
		<div class='description'>${element.description}</div>
	  </article>`
	);
}

$(() => {
  checkAmenities();
  checkStatus();
  postPlaces(checkedAmenity);
  $('button').on('click', () => {
    postPlaces(checkedAmenity);
  });
});
