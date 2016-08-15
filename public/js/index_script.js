"use strict";
$(function(){

  function loadPokemonData(el) {
    var $card = $(el);
    var id = $card.attr('pokemon-id');
    $.getJSON('/pokemon/'+id)
      .done(function(data) {
        $card.children('.card-image').children().attr('src', 'http://www.pokestadium.com/sprites/green/'+data.img_name+'.png');
        $card.children('.card-action').children('span').text(data.poke_name);
      });
  };



  function deleteTeam(el) {
    var id = $(el).attr('team-id');
    $.ajax({
      'url' : '/' + id,
      'method' : 'DELETE'
    }).always(function(response){
      if (response.deleted) {
        $('div[team-id="'+id+'"]').remove();
      } else {
        alert('Internal server error. Please log-in again.');
      }
    })
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
    bing('monochrome');
    $('.delete_button').on('click', function(e) {
      e.preventDefault();
      deleteTeam(this);
    })
    $('.display_poke').each(function(ind,el){
      loadPokemonData(el);
    });
    $(".button-collapse").sideNav();
  };

  initPage();

});
