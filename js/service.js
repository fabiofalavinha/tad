'use strict';

var tad = tad || {};

tad.Service = (function (Service, BlogPersitence) {
    var mockSuccess = { done: function (f) { f([{ title: 'Rituais para o Fim de Ano', published: 'Dezembro 24, 2014', publishedBy: 'F�bio A Falavinha', content: '<p><b>Ritual para Pai Oxal� - 24 / 12 ou 25 / 12</b></p>             <hr>             <p>O ritual de Pai Oxal� deve ser feito no dia 24/12 ou 25/12, reunindo toda a fam�lia em volta de uma mesa, com uma toalha branca, uma ta�a de vinho tinto doce, um copo de �gua, um prato com farinha de trigo,  um ou mais p�es (p�o franc�s), 1 vela branca.  Preparar os elementos do ritual, ajoelhar-se diante desta mesa, oferendando ao nosso divino Pai Oxal�!  As pessoas que participarem deste ritual, devem dar as m�os e agradecer pelo ano que tiveram, e pedir que nosso divino Pai Oxal�, traga a todos muita paz, amor, harmonia e prosperidade.  O p�o deve ser repartido entre todos, e pode-se colocar o p�o dentro do pote de arroz, para trazer prosperidade e o alimento de cada dia.</p>                           <br/>               <p><b>Ritual para M�e Oi� Oxal� - 31 / 12</b></p>             <hr>               <p>Este ritual � de agradecimento a nossa divina M�e Oi�, deve ser feito individualmente!  Os elementos para esta oferenda s�o:  1 vela branca palito 1 vela preta palito 1 lim�o ou maracuj� cortados ao meio   Preferencialmente deve ser feito no tempo (varanda, quintal, local aberto).  Colocar a vela branca do lado direito e a vela preta do lado esquerdo, o lim�o ou maracuj�, enfrente as velas.  Acender as velas, e agradecer a nossa divina M�e Oi� (sauda��o Olhe o Tempo Minha M�e) por tudo que recebemos, e fazer seus pedidos para o pr�ximo ano!  Lembrem-se que M�e Oi� � orix� feminino que comando o tempo em nossas vidas. Ela permite ou n�o que tudo se movimente, seja mais r�pido, mais lento, ou, n�o se movimente.  Pe�am o equil�brio entre suas for�as negativas e positivas. Lembrem-se que somos seres humanos e temos os nossos desequil�brios na F�, onde � exatamente o campo de atua��o de M�e Oi�.</p>' }]); } };

    var serverURL = 'http://faf-box-22764.sae1.nitrousbox.com:7139';

    function authenticate(userName, password) {
        return mockSuccess;
        return $.post(serverURL + '/authenticate', JSON.stringify({ userName: userName, password: password }))
            .done(function (user) {
                BlogPersitence.setCurrentUser(user);
            });
    };

    function changePassword(password, newPassword) {
        return mockSuccess;
        return $.post(serverURL + '/changePassword', JSON.stringify({ id: BlogPersitence.getCurrentUser().userName, oldPassword: password, newPassword: newPassword }));
    };

    function forgotPassword(email) {
        return mockSuccess;
        return $.post(serverURL + '/forgotPassword', JSON.stringify({ email: email }));
    };

    function registerPassword(userName, password) {
        return mockSuccess;
        return $.post(serverURL + '/registerPassword', JSON.stringify({ id: userName, password: password }));
    };

    function getPublicPosts() {
        return mockSuccess;
        return $.get(serverURL + '/publishedPosts/public');
    };

    function getPrivatePosts() {
        return $.get(serverURL + '/publishedPosts/private');
    };

    function getArchives() {
        return $.get(serverURL + '/archives');
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
    Service.getArchives = getArchives;
    Service.getEvents = getEvents;

    return Service;

})(tad.Service || {}, tad.BlogPersitence);