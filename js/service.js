'use strict';

var tad = tad || {};

tad.Service = (function (Service, BlogPersitence) {
    var mockSuccess = { done: function (f) { f([{ title: 'Rituais para o Fim de Ano', published: 'Dezembro 24, 2014', publishedBy: 'Fábio A Falavinha', content: '<p><b>Ritual para Pai Oxalá - 24 / 12 ou 25 / 12</b></p>             <hr>             <p>O ritual de Pai Oxalá deve ser feito no dia 24/12 ou 25/12, reunindo toda a família em volta de uma mesa, com uma toalha branca, uma taça de vinho tinto doce, um copo de água, um prato com farinha de trigo,  um ou mais pães (pão francês), 1 vela branca.  Preparar os elementos do ritual, ajoelhar-se diante desta mesa, oferendando ao nosso divino Pai Oxalá!  As pessoas que participarem deste ritual, devem dar as mãos e agradecer pelo ano que tiveram, e pedir que nosso divino Pai Oxalá, traga a todos muita paz, amor, harmonia e prosperidade.  O pão deve ser repartido entre todos, e pode-se colocar o pão dentro do pote de arroz, para trazer prosperidade e o alimento de cada dia.</p>                           <br/>               <p><b>Ritual para Mãe Oiá Oxalá - 31 / 12</b></p>             <hr>               <p>Este ritual é de agradecimento a nossa divina Mãe Oiá, deve ser feito individualmente!  Os elementos para esta oferenda são:  1 vela branca palito 1 vela preta palito 1 limão ou maracujá cortados ao meio   Preferencialmente deve ser feito no tempo (varanda, quintal, local aberto).  Colocar a vela branca do lado direito e a vela preta do lado esquerdo, o limão ou maracujá, enfrente as velas.  Acender as velas, e agradecer a nossa divina Mãe Oiá (saudação Olhe o Tempo Minha Mãe) por tudo que recebemos, e fazer seus pedidos para o próximo ano!  Lembrem-se que Mãe Oiá é orixá feminino que comando o tempo em nossas vidas. Ela permite ou não que tudo se movimente, seja mais rápido, mais lento, ou, não se movimente.  Peçam o equilíbrio entre suas forças negativas e positivas. Lembrem-se que somos seres humanos e temos os nossos desequilíbrios na Fé, onde é exatamente o campo de atuação de Mãe Oiá.</p>' }]); } };

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