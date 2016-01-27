/* -----------------------------------------------
Table of Contents

1. Google Map
  - geolocation
  - traffic layer
2. Location by IP
3. Open Weather/Weather Section
4. Google Calendar
5. Todo List
------------------------------------------------- */

// ** Begin Google Map ** //
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.739, lng: -104.990},
    zoom: 12
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

// ** End Google Map ** //


// ** Begin Location by IP ** //

// ** End Location by IP ** //


// ** Begin Open Weather ** //

// ** End Open Weather ** //


// ** Begin Google Calendar ** //

// ** End Google Calendar ** //


// ** Begin Todo List ** //

// ** End Todo List ** //

$(document).on('ready', function() {
  console.log('sanity check!');
});
