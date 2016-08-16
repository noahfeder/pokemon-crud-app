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
    $('.type').text('Type: ' + poke.type.toUpperCase());
    $('.hp').text('HP: ' + poke.hp);
    $('.attack').text('Attack: ' + poke.attack);
    $('.defense').text('Defense: ' + poke.defense);
    $('#addPokemon').attr('poke_id',poke.poke_id);
  }

  function addToTeam(poke) {
    var $firstEmpty = $($('img[src="#!"]')[0]);
    $firstEmpty.attr('src', 'http://www.pokestadium.com/sprites/green/'+poke.img_name+'.png');
    $firstEmpty.parent().parent().removeClass('hide')
      .attr('poke_id',poke.poke_id);
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
    $.getJSON('/pokemon/'+$(this).attr('poke_id'))
    .done(function(data){
      addToTeam(data);
    });
  };

  function removePokemon() {
    if ($('.hide.card').length === 0) {
      $('.green').off();
      $('.btn-floating').addClass('red').removeClass('green rotate');
      $('#fab_text').text('not_interested');
    }
    $(this).parent().parent().addClass('hide');
    $(this).parent().parent().children('.card-image').children('img').attr('src', '#!');
  }

  function teamNameError() {
    $('label[for="teamName"]').text('Try a new name, that one is taken!');
    $('#teamName').addClass('invalid');
    $('#modal1').addClass('animated shake')
  }

  function submitNewTeam() {
    var pokemon_data = {
      'pokemon_1_id' : $('#pokemon1').attr('poke_id'),
      'pokemon_2_id' : $('#pokemon2').attr('poke_id'),
      'pokemon_3_id' : $('#pokemon3').attr('poke_id'),
      'pokemon_4_id' : $('#pokemon4').attr('poke_id'),
      'pokemon_5_id' : $('#pokemon5').attr('poke_id'),
      'pokemon_6_id' : $('#pokemon6').attr('poke_id'),
      'team_name'    : $('#teamName').val()
    };
    $.ajax({
      'url'    : '/new',
      'method' : 'POST',
      'data'   : pokemon_data
    }).done(function(data){
      if (!data.error) {
        location.replace('/');
      } else {
        $('#modal1').openModal({'ready':teamNameError});
      }
    })
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
      console.log(data);
    });
  };

  function initPage() {
    $('select').material_select();
    $('#addPokemon').on('click',addPokemonListener);
    $('#typeSelectButton').on('click',typeChangeListener);
    $('#pokeSelect').on('change',pokeChangeListener);
    $('.remove_pokemon').on('click',removePokemon);
    $('#save_team').on('click', submitNewTeam);
    $(".button-collapse").sideNav();
    bing();
  }


  initPage();

}); // end jq wrapper

