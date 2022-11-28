$(function () {
  const amenityIds = [];
  const amenityNames = [];

  // START get amenity fitlters
  $('li input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenityIds.push($(this).attr('data-id'));
      amenityNames.push($(this).attr('data-name'));
    } else {
      amenityIds.pop($(this).attr('data-id'));
      amenityNames.pop($(this).attr('data-name'));
    }
    if (amenityNames.length > 0) {
      $('div.amenities > h4').text(amenityNames.join(', '));
    } else {
      $('div.amenities > h4').text('');
    }
  });
  // END get amenity filters

  // START check API status
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: (data) => {
      const divApi = $('div.api_status');
      if (data.status === 'OK') {
        divApi.addClass('available');
      } else {
        if (divApi.hasClass('.available')) { $('div.api_status').removeClass('.available'); }
      }
    }
  });
  // END check API status

  // START search for places using specified filters
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    headers: { 'Content-Type': 'application/json' },
    data: '{}',
    success: (data) => {
      $.each(data, (index, place) => {
        const article = $('<article></article>');
        const titleAndPrice = $('<div class="title_box"></div>');
        const title = $('<h2></h2>').text(place.name);
        const price = $('<div class="price_by_night"></div>').text(`$${place.price_by_night}`);
        const information = $('<div class="information"></div>');
        const maxGuest = $('<div class="max_guest"></div>');
        const numRooms = $('<div class="number_rooms"></div>');
        const numBathrooms = $('<div class="number_bathrooms"></div>');
        const description = $('<div class="description"></div>').html(place.description);
        const user = $('<div class="user"></div>');

        $.ajax({
          type: 'GET',
          url: 'http://0.0.0.0:5001/api/v1/users/' + place.user_id,
          success: (data) => { user.html(`<b>Owner:</b> ${data.first_name} ${data.last_name}`); }
        });

        titleAndPrice.append(title, price);
        information.append(maxGuest, numRooms, numBathrooms);
        article.append(titleAndPrice, information, user, description);
        $('section.places').append(article);
      });
    }
  });
  // END search for places using filters
}
);
