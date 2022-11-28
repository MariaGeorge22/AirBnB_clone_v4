$(function () {
  const amenityIds = [];
  const amenityNames = [];

  // START get amenity filters
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
}
);
