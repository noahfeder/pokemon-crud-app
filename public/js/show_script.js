"use strict";
$(function(){
  function viewPokemon(poke) {
    $('.main > .card-image > img').attr('src', 'http://www.pokestadium.com/sprites/xy/'+poke.img_name+'.gif');
    $('.card-title').text('#'+poke.poke_id+': '+poke.poke_name);
    $('.type').text('Type: ' + poke.type.toUpperCase());
    $('.hp').text('HP: ' + poke.hp);
    $('.attack').text('Attack: ' + poke.attack);
    $('.defense').text('Defense: ' + poke.defense);
    $('#addPokemon').attr('poke-id',poke.poke_id);
  }

  function addToTeam(poke, id) {
    var $firstEmpty = id ? $('#'+id).children('.card-image').children('img') : $($('img[src="#!"]')[0]);
    $firstEmpty.attr('src', 'http://www.pokestadium.com/sprites/green/'+poke.img_name+'.png');
    $firstEmpty.parent().parent().removeClass('hide')
      .attr('poke-id',poke.poke_id);
    var availableSlots = $('.hide.card').length;
    if (availableSlots === 0) {
      $('.btn-floating').removeClass('red').addClass('green rotate');
      $('.green').on('click',function(e){
        e.preventDefault();
        $('#modal1').openModal();
      })
      $('#fab_text').text('done');
    } else {
      $('.green').off();
      $('.btn-floating').addClass('red').removeClass('green rotate');
      $('#fab_text').text('not_interested');
    }
  }

  function pokeChangeListener() {
    var selected_poke = $(this).parent().parent().attr('poke-id');
    $.getJSON('/pokemon/'+selected_poke)
      .done(function(data){
        $('#addPokemon').removeClass('disabled');
        viewPokemon(data);
    });
  }

  function addPokemonListener() {
    $.getJSON('/pokemon/'+$(this).attr('poke-id'))
    .done(function(data){
      addToTeam(data);
    });
  };

  function initializeTeam() {
    var current = 1;
    $('.card.bottom-row').each(function(index, el) {
      $.getJSON('/pokemon/'+$(el).attr('poke-id'))
        .done(function(data){
          addToTeam(data,'pokemon'+current);
          current++;
      });
    });
  }

  function bing() {
    $.ajax({
      'method' : 'GET',
      'url' : '/images'
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
    $('.show_pokemon').on('click',pokeChangeListener);
    initializeTeam();
    $('.button-collapse').sideNav();
    bing();
  }

  initPage();

}); // end jq wrapper

