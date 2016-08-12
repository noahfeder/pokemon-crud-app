"use strict";
$(function(){

  function loadPokemonData(el) {
    var $card = $(el);
    var id = $card.attr('pokemon-id');
    $.getJSON('http://localhost:2020/id/'+id)
      .done(function(data) {
        $card.children('.card-image').children().attr('src', 'http://www.pokestadium.com/sprites/green/'+data.img_name+'.png');
        $card.children('.card-action').children('span').text(data.poke_name);
      });
  };



  function deleteTeam(el) {
    var id = $(el).attr('team-id');
    $.ajax({
      'url' : '/delete/'+ id,
      'method' : 'DELETE'
    }).always(function(response){
      if (response.deleted) {
        $('div[team-id="'+id+'"]').remove();
      } else {
        alert('Internal server error. Please log-in again.');
      }
    })
  };

  function initPage() {
    $('.delete_button').on('click', function(e) {
      e.preventDefault();
      deleteTeam(this);
    })
    $('.display_poke').each(function(ind,el){
      loadPokemonData(el);
    });
  };

  initPage();

});
