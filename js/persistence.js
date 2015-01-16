var BlogPersitence = function() {

  if (!Modernizr.localstorage) {
    aler('Your device does not support HTML5 Local Storage');
    return;
  }

  function saveUser(user) {
    window.localStorage['user'] = user;
  }

  function getCurrentUser() {
    return window.localStorage['user'];
  }

}();