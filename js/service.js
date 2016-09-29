'use strict';

var tad = tad || {};

tad.Service = (function (Service, BlogPersitence) {
    var useProxy = false;
    var serverURL = !useProxy ? 'http://www.temploamordivino.com.br:7139' : 'http://localhost:3000/proxy';

    function authenticate(userName, password) {
        BlogPersitence.setCurrentUser({ id: 'test' });
        return $.post(serverURL + '/authenticate', JSON.stringify({ userName: userName, password: password }))
            .done(function (user) {
                BlogPersitence.setCurrentUser(user);
            });
    }

    function changePassword(password, newPassword) {
        return $.post(serverURL + '/changePassword', JSON.stringify({ id: BlogPersitence.getCurrentUser().userName, oldPassword: password, newPassword: newPassword }));
    }

    function forgotPassword(email) {
        return $.post(serverURL + '/forgotPassword', JSON.stringify({ email: email }));
    }

    function registerPassword(userName, password) {
        return $.post(serverURL + '/registerPassword', JSON.stringify({ id: userName, password: password }));
    }

    function getPublicPosts(year, month, pageNumber) {
        pageNumber = !!pageNumber ? pageNumber : parseInt($("#searchCurrentPage").val());

        var queryString = '/' + pageNumber;

        var url = serverURL + '/published/posts/PUBLIC';
        if (!!year && year > 0 && !!month && month > 0) {
            url = url + '/archive/' + year + '/' + month + queryString;
            $("#filterArchiveYear").val(year);
            $("#filterArchiveMonth").val(month);
        } else {
            url = url + queryString;
            $("#filterArchiveYear").val("");
            $("#filterArchiveMonth").val("");
        }
        return $.ajax({
            url: url,
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function getPrivatePosts() {
        return $.ajax({
            url: serverURL + '/published/posts/INTERNAL',
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function getPublicArchives() {
        return $.ajax({
            url: serverURL + '/post/archives/PUBLIC',
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function getPrivateArchives() {
        return $.ajax({
            url: serverURL + '/post/archives/INTERNAL',
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function getPublicEvents(year) {
        return $.ajax({
            url: serverURL + '/events/PUBLIC/' + year,
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function getPostById(id) {
        return $.ajax({
            url: serverURL + '/post/' + id,
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    function post(postData, successAction, errorAction) {
        $.post(serverURL + '/post', postData)
            .done(function (data) {
                successAction(data);
            })
            .fail(function (ex) {
                errorAction(ex);
            });
    }

    function getCarouselImageNames() {
        return $.ajax({
            url: serverURL + '/carousel',
            type: 'GET',
            async: true,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    }

    Service.authenticate = authenticate;
    Service.changePassword = changePassword;
    Service.forgotPassword = forgotPassword;
    Service.registerPassword = registerPassword;
    Service.getPublicPosts = getPublicPosts;
    Service.getPrivatePosts = getPrivatePosts;
    Service.getPublicArchives = getPublicArchives;
    Service.getPrivateArchives = getPrivateArchives;
    Service.getPublicEvents = getPublicEvents;
    Service.getCarouselImageNames = getCarouselImageNames;
    Service.getPostById = getPostById;

    return Service;

})(tad.Service || {}, tad.BlogPersitence);