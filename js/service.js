var Service = function() {

  var serverURL = 'http://faf-box-22764.sae1.nitrousbox.com:8080';

  function post(postData, successAction, errorAction) {

    $.post(serverURL + '/post', postData)
      .done(function(data) {
        successAction(data);
      })
      .fail(function(ex) {
        errorAction(ex);
      });

  }

}();