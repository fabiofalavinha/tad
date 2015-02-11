'use strict';

var tad = tad || {};

tad.BlogPersitence = (function (BlogPersitence) {

    $(function () {
        //if (!Modernizr.localstorage) {
        //    aler('Your device does not support HTML5 Local Storage');
        //    return;
        //}
    });

    function setCurrentUser(user) {
        window.sessionStorage['user'] = user;
    };

    function getCurrentUser() {
        return window.sessionStorage['user'];
    };

    BlogPersitence.setCurrentUser = setCurrentUser;
    BlogPersitence.getCurrentUser = getCurrentUser;

    return BlogPersitence;

})(tad.BlogPersitence || {});