const photoWalk = photoWalk || {};
const google = google;

// ***********************************************************
// ALL PAGE TEMPLATES
// ***********************************************************

// ** Home Page **
photoWalk.home = function(e) {
  if (e) e.preventDefault();
  // Something goes here
  this.$main.html(
    `
    <div class="imagebackdrop">
      <h1>Welcome to our Humble Home Page</h1>
      <p>We hope you'll enjoy your stay here and choose to hang out a while</p>
    </div
    `
  );
};

// ** Admin Template
photoWalk.adminTemplate = function() {
  const adminContent = (`
    <div class="admin-content">
      <nav class="pure-menu admin-menu">
        <h3 class="menu-heading">Admin Menu</h3>
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a href="#" class="pure-menu-link landmark-admin">Edit Landmarks</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link walk">Edit Walks</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link user">Edit Users</a></li>
        </ul>
      </nav>
      <section class="admin-body">
        <h1>Welcome to the admin section</h1>
      </section>
    </div>
    `);

  this.$main.html(adminContent);
};


// -----------------------------------------------------------
// USER MANAGEMENT
// -----------------------------------------------------------

// ** User Registration Modal **
photoWalk.register = function(e) {
  if (e) e.preventDefault; // Prevents page reload

  const registerHeader = (
    `
    <h2>Register</h2>
    `
  );

  const registerBody = (
    `
    <form class="pure-form" method="post" action="/register">
      <div class="form-group">
        <label for="username">Enter your username: </label>
        <input id="username" class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="email">Enter an email address: </label>
        <input id="email" class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="email">Enter a password: </label>
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="password_conf">Enter the password again: </label>
        <input id="password_conf" class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="pure-button pure-button-primary" type="submit" value="Register">
    </form>
    `
  );

  const registerFooter = (
    `
    <p>Made with <span class="redheart">&hearts;</span> at <a href="https://generalassemb.ly/locations/london">GA</a> in London</p>
    `
  );

  photoWalk.modalTemplate( registerHeader, registerBody, registerFooter );
  // this.$main.html(registerForm);
};

// ** User Login Modal ** view
photoWalk.login = function(e) {
  if (e) e.preventDefault();

  const loginHeader = (
    `
    <h2>Login</h2>
    `
  );

  const loginBody = (
    `
    <form class="pure-form" method="post" action="/login">
      <div class="form-group">
        <label for="email">Enter your registered email address: </label>
        <input id="email" class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="password">Enter your password: </label>
        <input id="password" class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="pure-button pure-button-primary" type="submit" value="Login">
    </form>
    `
  );

  const loginFooter = (
    `
    <p>Made with <span class="redheart">&hearts;</span> at <a href="https://generalassemb.ly/locations/london">GA</a> in London</p>
    `
  );

  photoWalk.modalTemplate( loginHeader, loginBody, loginFooter );
};

// ** User Edit View - UNUSED **
// photoWalk.userEdit = function(e) {
//   if (e) e.preventDefault();
//
//   const userUrl = 'https://localhost:3000/api/users';
//   const url = `${userUrl}/${$(this).attr('href')}`;
//   // console.log('URL: ' + url);
//   // console.log('This is: ' + this);
//
//   const method = 'PUT';
//
//   photoWalk.ajaxRequest(url, method, null, data => {
//     // console.log('ajaxRequest: ' + url);
//     photoWalk.$main.html(
//       `
//       <h2>Edit User Profile</h2>
//       <form class="pure-form" method="put" action="/users/${data.user._id}">
//         <div class="form-group">
//           <label for="username">User Name</label>
//           <input id="username" class="form-control" type="text" name="user[username]" placeholder="Username" value="${data.user.username}">
//         </div>
//         <div class="form-group">
//           <label for="bio">User Biography</label>
//           <input id="bio" class="form-control" type="text" name="user[bio]" placeholder="User bio" value="${data.user.bio}">
//         </div>
//         <div class="form-group">
//           <label for="img">Profile Image URL</label>
//           <input id="img" class="form-control" type="text" name="user[img]" value="${data.user.profilePic}">
//         </div>
//         <input class="pure-button pure-button-primary" type="submit" value="Update Profile">
//       </form>
//       `
//     );
//   });
// };

// -----------------------------------------------------------
// LANDMARK MANAGEMENT
// -----------------------------------------------------------

// ** Landmark Create View **
photoWalk.landmarkCreate = function(e) {
  if (e) e.preventDefault();

  $.ajax({
    method: 'POST',
    url: 'https://localhost:3000/api/landmarks',
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  });

  const newLandmarkHeader = (
    `
    <h2>Register</h2>
    `
  );

  const newLandmarkBody = (
    `
    <form class="pure-form" method="post" action="/create">

      <div class="form-group">
        <label for="landmarkName">Enter a name for the new landmark: </label>
        <input id="landmarkName" class="form-control" type="text" name="landmark[name]" placeholder="Landmark name">
      </div>

      <div class="form-group">
        <label for="landmarkAddress">Enter an address: </label>
        <input id="landmarkAddress" class="form-control" type="text" name="landmark[address]" placeholder="Postal address">
      </div>

      <div class="form-group">
        <label for="landmarkPostcode">Enter a postcode: </label>
        <input id="landmarkPostcode" class="form-control" type="text" name="landmark[postcode]" placeholder="Postcode">
      </div>

      <div class="form-group">
        <label for="landmarkBuildDate">Add a build date (if known): </label>
        <input id="landmarkBuildDate" class="form-control" type="text" name="landmark[buildDate]" placeholder="Add a build date">
      </div>

      <div class="form-group">
        <label for="landmarkListed">Listed building status (if known): </label>
        <input id="landmarkListed" class="form-control" type="text" name="landmark[listed]" placeholder="Add listed building status">
      </div>

      <div class="form-group">
        <label for="landmarkPublicAccess">Level of public access available: </label>
        <input id="landmarkPublicAccess" class="form-control" type="text" name="landmark[publicaccess]" placeholder="Level of Public Access available">
      </div>

      <div class="form-group">
        <label for="landmarkNearestTube">Add nearest tube station: </label>
        <input id="landmarkNearestTube" class="form-control" type="text" name="landmark[nearestTube]" placeholder="Add nearest tube station">
      </div>

      <div class="form-group">
        <label for="landmarkWebsite">Add website URL (if available): </label>
        <input id="landmarkWebsite" class="form-control" type="text" name="landmark[website]" placeholder="Add website URL">
      </div>

      <div class="form-group">
        <label for="landmarkImage">Add image file name: </label>
        <input id="landmarkImage" class="form-control" type="text" name="landmark[image]" placeholder="Add image file name">
      </div>

      <div class="form-group">
        <label for="landmarkDesc">Add a description for the landmark: </label>
        <input id="landmarkDesc" class="form-control" type="textarea" name="landmark[description]" placeholder="Add a description for the landmark">
      </div>

      <div class="form-group">
        <label for="landmarkLat">Add a Google LAT coordinate for the landmark: </label>
        <input id="landmarkLat" class="form-control" type="text" name="landmark[lat]" placeholder="Add a Google LAT coordinate for the landmark">
      </div>

      <div class="form-group">
        <label for="landmarkLng">Add a Google LNG coordinate for the landmark: </label>
        <input id="landmarkLng" class="form-control" type="text" name="landmark[lng]" placeholder="Add a Google LNG coordinate for the landmark">
      </div>

      <input class="pure-button pure-button-primary" type="submit" value="Save Landmark">
    </form>
    `
  );

  const newLandmarkFooter = (
    `
    <p>Made with <span class="redheart">&hearts;</span> at <a href="https://generalassemb.ly/locations/london">GA</a> in London</p>
    `
  );

  photoWalk.modalTemplate( newLandmarkHeader, newLandmarkBody, newLandmarkFooter );
};

// ** Landmark Show View **
photoWalk.landmarkIndex = function(e) {
  if (e) e.preventDefault();

  $.ajax({
    method: 'GET',
    url: 'https://localhost:3000/api/landmarks',
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  }).done(data => {
    let places = '';
    $.each(data.landmarks, (index, landmark) => {
      places +=
      `
        <tr id="${ landmark._id }">
          <td>${ index + 1}</td>
          <td><a href="${ this.apiUrl }/landmarks/${ landmark._id }">${ landmark.name }</a></td>
          <td>${ landmark.address }. ${ landmark.postcode }.</td>
          <td><a href="${ landmark.website }">${ landmark.website }</a></td>
          <td><button class="button-warning pure-button"><i class="fa fa-pencil fa-fw"></button></i></td>
          <td><button class="button-error pure-button"><i class="fa fa-trash-o fa-fw"></button></td>
        </tr>
      `;
    });
    const landmarkContent = (
      `
      <header class="admin-header">
        <h3 class="admin-heading">Landmark Administration</h3>
      </header>
      <table class="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address & Postcode</th>
            <th>Website</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>${ places }</tbody>
      </table>
      `
    );
    // console.log(landmarkContent);
    $('.admin-body').html(landmarkContent);
  });
};

// ** Landmark Edit View **
photoWalk.landmarkEdit = function(e) {
  if (e) e.preventDefault();

};

// -----------------------------------------------------------
// ROUTE MANAGEMENT
// -----------------------------------------------------------

photoWalk.AutocompleteDirectionsHandler = function () {
  this.originPlaceId      = null;
  this.destinationPlaceId = null;
  this.originInput        = document.getElementById('origin-input');
  this.destinationInput   = document.getElementById('destination-input');

  this.directionsService  = new google.maps.DirectionsService;
  this.directionsDisplay  = new google.maps.DirectionsRenderer;

  this.directionsDisplay.setMap(this.map);

  // Initialize the autocomplete fields to make them work!
  this.originAutocomplete  = new google.maps.places.Autocomplete(
      this.originInput, {placeIdOnly: true});
  this.destinationAutocomplete = new google.maps.places.Autocomplete(
      this.destinationInput, {placeIdOnly: true});

  this.setupAutocompletePlaceChangedListener(this.originAutocomplete, 'ORIG');
  this.setupAutocompletePlaceChangedListener(this.destinationAutocomplete, 'DEST');
};

photoWalk.setupAutocompletePlaceChangedListener = function(autocomplete, mode) {
  var self = this;

  autocomplete.bindTo('bounds', self.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert('Please select an option from the dropdown list.');
      return;
    }
    if (mode === 'ORIG') {
      self.originPlaceId = place.place_id;
    } else {
      self.destinationPlaceId = place.place_id;
    }
  });

};

// ** Make Route Record in Database **

photoWalk.route = function(waypoints, name) {
  var self = this;

  if (!self.originPlaceId || !self.destinationPlaceId) {
    console.log('No originPlaceId, destinationPlaceId');
    return;
  }

  const waypts = [];
  for (let i = 0; i < waypoints.length; i++) {
    // Might need to remove eval at some point?
    const tmp = eval(waypoints[i]);
    waypts.push({
      location: { lng: tmp[0], lat: tmp[1] },
      stopover: true
    });
  }

  self.directionsService.route({
    origin: { 'placeId': self.originPlaceId },
    destination: { 'placeId': self.destinationPlaceId },
    travelMode: 'WALKING',
    waypoints: waypts,
    optimizeWaypoints: true
  }, function(response, status) {
    if (status === 'OK') {
      self.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  const walk = {
    walkName: name,
    origin: self.originPlaceId,
    destination: self.destinationPlaceId,
    wayPoints: waypoints
  };

  // console.log('TO SAVE', walk);

  return photoWalk.ajaxRequest('/api/walks', 'post', { walk: walk }, data => {
    console.log(data);
  });
};

// ** Make Route on Map **
photoWalk.makeRoute = function(e) {
  if (e) e.preventDefault();

  // Close modal
  photoWalk.$modalContainer.css('display', 'none');
  photoWalk.$modalContainer.html('');

  const name        = $(e.target).find('#name').val();
  const waypoints   = $(e.target).find('input[name="waypoints"]:checked').map(function() {
    return $(this).val();
  }).toArray();

  // Display route on the map passing in the waypoints
  photoWalk.route(waypoints, name);
};

// ** Create Route Modal **
photoWalk.createRoute = function(e) {
  // Populate modal with available waypoints (inc. origin & dest)
  // Include ability to add a route name
  // Needs views for show, edit and delete
  if (e) e.preventDefault();

  $.ajax({
    method: 'GET',
    url: 'https://localhost:3000/api/landmarks',
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  }).done(data => {
    // let options = '';
    let selection = '';
    $.each(data.landmarks, (index, landmark) => {
      selection += `<label class="check-waypoint"><input name="waypoints" type="checkbox" value="[${ landmark.lng }, ${ landmark.lat }]"> - ${ landmark.name }<br>`;
    });

    const createRouteHeader = `<h2>Create a Route</h2>`;

    const createRouteBody = `
      <form id="makeRoute" class="pure-form pure-form-stacked">
        <fieldset class="form-fields">
          <div class="form-group">
            <label for="name">Add a name for your new route: </label>
            <input id="name" class="form-control" type="text" name="name" placeholder="Add route name">
          </div>
          <div class="form-group">
            <input id="origin-input" class="controls" type="text" placeholder="Enter an origin location">
          </div>
          <div class="form-group">
            <input id="destination-input" class="controls" type="text" placeholder="Enter a destination location">
          </div>
          <div class="form-group">
            <label for="waypoints">Enter your chosen waypoints: </label>
            ${ selection }
          </div>
          <input class="pure-button pure-button-primary" type="submit" value="Create Route">
        </fieldset>
      </form>
      `;

    const createRouteFooter = `
      <p>Made with <span class="redheart">&hearts;</span> at <a href="https://generalassemb.ly/locations/london">GA</a> in London</p>`;

    photoWalk.modalTemplate(createRouteHeader, createRouteBody, createRouteFooter);

    // Initialize the autocomplete fields in the modal and setup directions Service
    photoWalk.AutocompleteDirectionsHandler();
  });
};

photoWalk.plotRoute = function(e) {
  e.preventDefault();
  $.ajax({
    method: 'GET',
    url: $(e.target).attr('href'),
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  }).done(data => {
    const walk = data.walk;

    // console.log(walk);

    const waypts = [];
    for (let i = 0; i < walk.wayPoints.length; i++) {
      // Might need to remove eval at some point?
      const tmp = eval(walk.wayPoints[i]);
      waypts.push({
        location: { lng: tmp[0], lat: tmp[1] },
        stopover: true
      });
    }

    // Clear past routes
    // if (this.directionsDisplay !== null) {
    //   console.log('this.directionsDisplay is not null');
    //   this.directionsDisplay.setMap(null);
    //   this.directionsDisplay = null;
    // }

    this.directionsService  = new google.maps.DirectionsService;
    this.directionsDisplay  = new google.maps.DirectionsRenderer;

    this.directionsDisplay.setMap(this.map);
    // console.log('directionsDisplay is: ', this.directionsDisplay);

    photoWalk.directionsService.route({
      origin: { 'placeId': walk.origin },
      destination: { 'placeId': walk.destination },
      travelMode: 'WALKING',
      waypoints: waypts,
      optimizeWaypoints: true
    }, function(response, status) {
      if (status === 'OK') {
        console.log('Response is: ', response);
        photoWalk.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  });
};

photoWalk.availableRouteMenu = function(e) {
  if (e) e.preventDefault();

  const urlStr = 'https://localhost:3000/api/walks';
  const methodStr = 'GET';

  $.ajax({
    method: methodStr,
    url: urlStr,
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  }).done(data => {
    let walkMenu = '';
    $.each(data.walks, (index, walk) => {
      walkMenu += `<li class="pure-menu-item"><a href="${ urlStr }/${ walk._id }" class="pure-menu-link plotRoute">${ walk.walkName }</a></li>`;
    });
    $('#walk-menu').html(walkMenu);
  });
};

// ***********************************************************
// Helper Functions - Log In/Out
// ***********************************************************

// When called, the function calls a function to remove the jwt token and another
// to change the state of the links in the menu bar
photoWalk.logout = function(e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

// If user logs in, the link state is toggled to 'Logout',
// and the usersIndex function is called to display the Index view.
photoWalk.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$main.html('<div id="map-canvas"></div>');
  this.setupMap();
  photoWalk.availableRouteMenu();
};

// If a logged-in user clicks the logout link, the link states are toggled to 'Login'
// and the register function is called to show the user registration form
photoWalk.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.$main.html('<div id="map-canvas"></div>');
  this.setupMap();
};

// On logout, this function is called to remove the jwt token from local storage
photoWalk.removeToken = function() {
  return window.localStorage.clear();
};

// ***********************************************************
// Helper Functions - Handles content of a submitted form
// ***********************************************************
photoWalk.handleForm = function(e) {
  e.preventDefault();
  if ($(this).attr('id') === 'makeRoute') return;

  // console.log('Form submitted - handleForm function called');
  // Builds the URL values based on the requested action,
  // adds a method, and serializes the form data
  const url = `${photoWalk.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data = $(this).serialize();

  // Calls the ajaxRequest function, and if an account exists for the user
  // sets a jwt token and alters the state of the menu bar login/out options
  return photoWalk.ajaxRequest(url, method, data, data => {
    // Sets token into localStorage using the function setToken()
    // Sets to a logged in state

    if (data.token) {
      photoWalk.setToken(data.token);
      photoWalk.loggedInState();
      photoWalk.$modalContainer.css('display', 'none');
      photoWalk.$modalContainer.html('');
    }
  });
};

// ***********************************************************
// Helper Functions - Set Header for Ajax Requests
// ***********************************************************

photoWalk.ajaxRequest = function(url, method, data, callback) {
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

//
photoWalk.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

// Sets the jwt token into local storage
photoWalk.setToken = function(token) {
  return window.localStorage.setItem('token', token);
};

// Retrieves the jwt token from local storage
photoWalk.getToken = function() {
  return window.localStorage.getItem('token');
};

// ***********************************************************
// Helper Functions - Place Landmarks on Google Maps
// ***********************************************************

photoWalk.addInfoWindowForLandmark = function(landmark, marker) {
  let landmarkUrl = '';
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    if ( landmark.website ) {
      // console.log(landmark.website);
      landmarkUrl = `
      <a href='${ landmark.website }'>
        <h3>${ landmark.name }</h3>
      </a>
      `;
      // return landmarkUrl;
    } else {
      landmarkUrl = `<h3>${ landmark.name }</h3>`;
    }
    this.infoWindow = new google.maps.InfoWindow({
      content:
      `
      <img src='../images/${ landmark.file }' alt='${ landmark.name }'>
      ${ landmarkUrl }
      <p>${ landmark.address }</p>
      <p>${ landmark.postcode }</p>
      `
    });
    this.infoWindow.open(this.map, marker);
  });
};

photoWalk.createMarkerForLandmark = function(landmark) {
  const latlng = new google.maps.LatLng(landmark.lat, landmark.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    // icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForLandmark(landmark, marker);
};

photoWalk.loopThroughLandmarks = function(data) {
  $.each(data.landmarks, (index, landmark) => {
    setTimeout(() => {
      photoWalk.createMarkerForLandmark(landmark);
    }, index * 50);
  });
};

photoWalk.getLandmarks = function() {
  $.ajax({
    method: 'GET',
    url: 'https://localhost:3000/api/landmarks',
    beforeSend: photoWalk.setRequestHeader.bind(photoWalk)
  }).done(this.loopThroughLandmarks);
};

// ***********************************************************
// Helper Functions - Modal
// ***********************************************************

photoWalk.modalTemplate = function(modalHeader, modalBody, modalFooter) {
  const modalContent = (
    `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-header">${ modalHeader }</div>
      <div class="modal-body">${ modalBody }</div>
      <div class="modal-footer">${ modalFooter }</div>
    </div>
    `
  );

  this.$modalContainer.html(modalContent);
  photoWalk.callModal();
};

photoWalk.callModal = function() {
  this.$modalContainer.css('display', 'block');
  $('.close').on('click', function() {
    photoWalk.$modalContainer.css('display', 'none');
    photoWalk.$modalContainer.html('');
  });
  $(window).on('click', function(e) {
    if (e.target.className === photoWalk.$modalContainer[0].className) {
      photoWalk.$modalContainer.css('display', 'none');
      photoWalk.$modalContainer.html('');
    }
  });
};

// ***********************************************************
// Helper Functions - Setup Map
// ***********************************************************

photoWalk.setupMap = function(){
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(51.516026,-0.062226),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  if(this.getToken()){
    this.getLandmarks();
  }
};

// ***********************************************************
// INIT FUNCTION - Start point of app
// Sets base variables, adds event handlers, and checks
// whether a user is logged in or out
// ***********************************************************
photoWalk.init = function() {
  // Builds the base URL for subsequent Ajax requests
  this.apiUrl = 'https://localhost:3000/api';

  // makes 'main' and 'modal-container' available to us as required as an OOP photoWalk variables
  this.$main = $('main');
  this.$modalContainer = $('#modal');

  // Calls setupMap function to display Google Map on page
  this.setupMap();

  // The 'this' in .bind(this) is back to photoWalk again rather than the click event
  $('.home').on('click', this.setupMap.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.createLandmark').on('click', this.landmarkCreate.bind(this));
  $('.createRoute').on('click', this.createRoute.bind(this));
  $('.admin').on('click', this.adminTemplate.bind(this));
  $('.modal').on('submit', '#makeRoute', this.makeRoute.bind(this));
  $('body').on('click', '.landmark-admin', this.landmarkIndex.bind(this));
  $('body').on('click', '.plotRoute', this.plotRoute.bind(this));
  // this.$main.on('click', '.edit', this.userEdit);

   // ** Check understanding **
   // Think sets up which function is to be called when the form is submitted
  this.$main.on('submit', 'form', this.handleForm);
  this.$modalContainer.on('submit', 'form', this.handleForm);

  // Checks whether there is a user logged in or not
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

// Needs to be after the photoWalk.init function itself, otherwise the app dies
// ** Not sure why - ask question. **
// Binds init to the photoWalk object, rather than document
$(photoWalk.init.bind(photoWalk));
