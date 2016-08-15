"use strict";
$(function(){

  function handleResponse(response) {
    if (response.logged_in) {
      location.reload();
    } else {
      $('.welcome_message').text(response.error).addClass('red-text');
    }
  };

  function makeRequest() {
    var fromClick = $(arguments[0].toElement).val()
    var route = (fromClick) ? fromClick : arguments[0];
    var data = {
      'username' : $('#username').val(),
      'password' : $('#password').val()
    };
    $.ajax({
      'url'    : '/users/' + route,
      'method' : 'POST',
      'data'   : data
    }).always(function(response) {
      handleResponse(response);
    });
  };

  function bing(color) {
    $.ajax({
      'method' : 'GET',
      'url' : '/images/q=nature&color=' + color
    }).always(function(data) {
      var rand = Math.floor(Math.random() * data.value.length);
      var img = data.value[rand].contentUrl
      $('body').css({
        'background-image': 'url(' + img + ')'
      });
    });
  };

  function initPage() {
    $('select').material_select();
    $('#login_button').on('click',makeRequest);
    $('#signup_button').on('click',makeRequest);
    $('#login_form').on('keydown',function(e) {
      if (e.which === 13) {
        e.preventDefault();
        makeRequest('login');
      }
    });
    bing('red');
  };

  initPage();

}); // end jquery
