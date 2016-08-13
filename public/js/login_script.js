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
    console.log(route);
    var data = {
      'username' : $('#username').val(),
      'password' : $('#password').val()
    };
    $.ajax({
      'url'    : '/' + route,
      'method' : 'POST',
      'data'   : data
    }).always(function(response) {
      console.log(response);
      handleResponse(response);
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
  };

  initPage();

}); // end jquery