function createMap(callback) {
  var mapWidget = new MapCreator(true);
  mapWidget.initMap;
  msnry.layout();
}

var MapCreator = function(trafficVal) {
  var self = this;
  this.traffic = trafficVal;
  this.initMap = function () {
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

    if (self.traffic === true) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
}