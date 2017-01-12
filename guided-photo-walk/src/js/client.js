const googleMap = googleMap || {};
const google = google;

googleMap.addInfoWindowForLandmark = function(landmark, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content:
      `
      <img src='../images/${ landmark.file }' alt='${ landmark.name }'>
      <a href='${ landmark.website }'>
        <h3>${ landmark.name }</h3>
      </a>
      <p>${ landmark.address }</p>
      <p>${ landmark.postcode }</p>
      `
    });
    this.infoWindow.open(this.map, marker);
  });
};

googleMap.createMarkerForLandmark = function(landmark) {
  const latlng = new google.maps.LatLng(landmark.lat, landmark.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    // icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForLandmark(landmark, marker);
};

googleMap.loopThroughLandmarks = function(data) {
  $.each(data.landmarks, (index, landmark) => {
    setTimeout(() => {
      googleMap.createMarkerForLandmark(landmark);
    }, index * 50);
  });
};

googleMap.getLandmarks = function() {
  $.get('http://localhost:3000/api/landmarks').done(this.loopThroughLandmarks);
};

googleMap.mapSetup = function() {
  // console.log('Building map');
  const canvas = document.getElementById('map-canvas');
  console.log(canvas);
  const mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(51.516026,-0.062226),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getLandmarks();
};

$(googleMap.mapSetup.bind(googleMap));
