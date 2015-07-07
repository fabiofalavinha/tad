'use strict';

var tad = tad || {};

tad.Service = (function (Service, BlogPersitence) {
    var useProxy = false;
    var serverURL = !useProxy ? 'http://faf-box-111242.nitrousapp.com:7139' : 'http://localhost:3000/proxy';

    function authenticate(userName, password) {
        BlogPersitence.setCurrentUser({ id: 'test' });
        return $.post(serverURL + '/authenticate', JSON.stringify({ userName: userName, password: password }))
            .done(function (user) {
                BlogPersitence.setCurrentUser(user);
            });
    };

    function changePassword(password, newPassword) {
        return $.post(serverURL + '/changePassword', JSON.stringify({ id: BlogPersitence.getCurrentUser().userName, oldPassword: password, newPassword: newPassword }));
    };

    function forgotPassword(email) {
        return $.post(serverURL + '/forgotPassword', JSON.stringify({ email: email }));
    };

    function registerPassword(userName, password) {
        return $.post(serverURL + '/registerPassword', JSON.stringify({ id: userName, password: password }));
    };

    function getPublicPosts(year, month) {
        var url = serverURL + '/published/posts/PUBLIC';
        if (!!year && !!month)
            url = url + '/archive/' + year + '/' + month;

        return $.get(url);
    };

    function getPrivatePosts() {
        return $.get(serverURL + '/published/posts/INTERNAL');
    };

    function getPublicArchives() {
        return $.get(serverURL + '/post/archives/PUBLIC');
    };

    function getPrivateArchives() {
        return $.get(serverURL + '/post/archives/INTERNAL');
    };

    function getEvents(year) {
        return $.get(serverURL + '/events/' + year);
    };

    function post(postData, successAction, errorAction) {

        $.post(serverURL + '/post', postData)
            .done(function (data) {
                successAction(data);
            })
            .fail(function (ex) {
                errorAction(ex);
            });

    };

    Service.authenticate = authenticate;
    Service.changePassword = changePassword;
    Service.forgotPassword = forgotPassword;
    Service.registerPassword = registerPassword;
    Service.getPublicPosts = getPublicPosts;
    Service.getPrivatePosts = getPrivatePosts;
    Service.getPublicArchives = getPublicArchives;
    Service.getPrivateArchives = getPrivateArchives;
    Service.getEvents = getEvents;

    return Service;

})(tad.Service || {}, tad.BlogPersitence);