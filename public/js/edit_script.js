"use strict";
$(function(){

  function buildPokeOption(poke) {
    var $option = $('<option>');
    $option.addClass('left circle ' + poke.type)
      .attr({
        'value': poke.poke_id,
        'data-icon': 'http://www.pokestadium.com/sprites/green/'+poke.img_name+'.png'
      })
      .text('#'+poke.poke_id+': ' + poke.poke_name)
      .appendTo('#pokeSelect');
  };

  function addOptions(pokemon,activeTypes) {
    var $wrapper = $('#pokeSelectWrapper');
    $wrapper.empty();
    $('select').material_select('destroy');

    var $select = $('<select id="pokeSelect">');
    $select.append('<option disabled selected value="">Choose a Pokemon!</option>');
    $select.appendTo($wrapper);
    pokemon.forEach(function(el){
      if (activeTypes.indexOf(el.type) > -1) {
        buildPokeOption(el);
      }
    });
    $('select').material_select();
    $('#pokeSelect').on('change',pokeChangeListener);
  };

  function viewPokemon(poke) {
    $('.main > .card-image > img').attr('src', 'http://www.pokestadium.com/sprites/xy/'+poke.img_name+'.gif');
    $('.card-title').text('#'+poke.poke_id+': '+poke.poke_name);
    $('.type').text('Type: ' + poke.type);
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

  function typeChangeListener() {
    var activeTypes = $('#typeSelect').val();
    $.getJSON('/pokemon')
      .done(function(data) {
        addOptions(data, activeTypes);
    });
  }

  function pokeChangeListener() {
    var selected_poke = $('#pokeSelect').val();
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

  function teamNameError() {
    $('#teamName').addClass('invalid');
    $('#modal1').addClass('animated shake')
  }

  function updateTeam() {
    var team_data = {
      'poke1' : $('#pokemon1').attr('poke-id'),
      'poke2' : $('#pokemon2').attr('poke-id'),
      'poke3' : $('#pokemon3').attr('poke-id'),
      'poke4' : $('#pokemon4').attr('poke-id'),
      'poke5' : $('#pokemon5').attr('poke-id'),
      'poke6' : $('#pokemon6').attr('poke-id'),
      'id' : $('#team').attr('team-id')
    };
    $.ajax({
      'url'    : '/'+team_data.id,
      'method' : 'PUT',
      'data'   : team_data
    }).done(function(data){
      if (data.update) {
        location.replace('/');
      } else {
        $('#modal1').openModal({'ready':teamNameError});
      }
    })
  }

  function removePokemon() {
    if ($('.hide.card').length === 0) {
      $('.green').off();
      $('.btn-floating').addClass('red').removeClass('green rotate');
      $('#fab_text').text('not_interested');
    }
    $(this).parent().parent().addClass('hide');
    $(this).parent().parent().children('.card-image').children('img').attr('src', '#!');
  }

  function initPage() {
    $('select').material_select();
    $('#addPokemon').on('click',addPokemonListener);
    $('#typeSelectButton').on('click',typeChangeListener);
    $('#pokeSelect').on('change',pokeChangeListener);
    initializeTeam();
    $('#update').on('click',updateTeam)
    $('.remove_pokemon').on('click',removePokemon);
    $('.button-collapse').sideNav();
  }

  initPage();

}); // end jq wrapper

