const photoWalk = photoWalk || {};
const google = google;

// ***********************************************************
// Page Templates
// ***********************************************************

// ** HOME PAGE **
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

// ** USER REGISTRATION FORM **
photoWalk.register = function(e) {
  if (e) e.preventDefault; // Prevents page reload
  this.$main.html(
    `
    <h2>Register</h2>
    <form class="pure-form" method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="pure-button pure-button-primary" type="submit" value="Register">
    </form>
    `
  );
};

// ** USER LOGIN FORM ** view
photoWalk.login = function(e) {
  if (e) e.preventDefault();
  this.$main.html(
    `
    <h2>Login</h2>
    <form class="pure-form" method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="pure-button pure-button-primary" type="submit" value="Login">
    </form>
    `
  );
};

// ** USER EDIT PAGE **
photoWalk.userEdit = function(e) {
  if (e) e.preventDefault();

  const userUrl = 'http://localhost:3000/api/users';
  const url = `${userUrl}/${$(this).attr('href')}`;
  // console.log('URL: ' + url);
  // console.log('This is: ' + this);

  const method = 'PUT';

  photoWalk.ajaxRequest(url, method, null, data => {
    console.log('ajaxRequest: ' + url);
    photoWalk.$main.html(
      `
      <h2>Edit User Profile</h2>
      <form class="pure-form" method="put" action="/users/${data.user._id}">
        <div class="form-group">
          <label for="username">User Name</label>
          <input id="username" class="form-control" type="text" name="user[username]" placeholder="Username" value="${data.user.username}">
        </div>
        <div class="form-group">
          <label for="bio">User Biography</label>
          <input id="bio" class="form-control" type="text" name="user[bio]" placeholder="User bio" value="${data.user.bio}">
        </div>
        <div class="form-group">
          <label for="img">Profile Image URL</label>
          <input id="img" class="form-control" type="text" name="user[img]" value="${data.user.profilePic}">
        </div>
        <input class="pure-button pure-button-primary" type="submit" value="Update Profile">
      </form>
      `
    );
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
};

// If a logged-in user clicks the logout link, the link states are toggled to 'Login'
// and the register function is called to show the user registration form
photoWalk.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  // this.home();
};

// On logout, this function is called to remove the jwt token from local storage
photoWalk.removeToken = function() {
  return window.localStorage.clear();
};

// This function deals with the content of a submitted form
photoWalk.handleForm = function(e) {
  e.preventDefault();
  // console.log('Form submitted');
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
    }
  });
};

//
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
// Helper Functions - Google Maps
// ***********************************************************

photoWalk.addInfoWindowForLandmark = function(landmark, marker) {
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
  $.get('http://localhost:3000/api/landmarks').done(this.loopThroughLandmarks);
};

// ***********************************************************
// Helper Functions - Modal
// ***********************************************************

photoWalk.callModal = function() {
  // this.$modal = $('#modal');
  const modal = document.getElementById('modal');
  const span = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';
  span.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};

// ***********************************************************
// INIT FUNCTION - Start point of app
// Sets base variables, adds event handlers, and checks
// whether a user is logged in or out
// ***********************************************************
photoWalk.init = function() {
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(51.516026,-0.062226),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Builds the base URL for subsequent Ajax requests
  this.apiUrl = 'http://localhost:3000/api';

  // makes 'main' available to us as required as an OOP photoWalk variable
  this.$main = $('main');


  this.map = new google.maps.Map(canvas, mapOptions);
  this.getLandmarks();

  // The 'this' in .bind(this) is back to photoWalk again rather than the click event
  $('.home').on('click', this.home.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('click', '.edit', this.userEdit);

   // ** Check understanding **
   // Think sets up which function is to be called when the form is submitted
  this.$main.on('submit', 'form', this.handleForm);

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
