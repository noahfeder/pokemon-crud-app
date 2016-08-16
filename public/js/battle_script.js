"use strict";
$(function(){
  var types = {};

  function addAttributes(img, poke) {
    var content = img.parent().parent().children('.card-content').children('p');
    content.children('.type-img').attr('src', '/img/types/' + poke.type + '.png');
    content.children('.name').text(poke.poke_name);
    content.children('.hp').text('HP: ' + poke.hp);
    content.children('.attack').text('A:' + poke.attack);
    content.children('.defense').text('D:' + poke.defense);
  };

  function addToTeam(poke, id) {
    var $firstEmpty = id ? $('#'+id).children('.card-image').children('img') : $($('img[src="#!"]')[0]);
    $firstEmpty.attr('src', 'http://www.pokestadium.com/sprites/green/'+poke.img_name+'.png');
    $firstEmpty.parent().parent().removeClass('hide')
      .attr({
        'poke-id':poke.poke_id,
        'hp': poke.hp,
        'attack' : poke.attack,
        'defense' : poke.defense,
        'poke-type' : poke.type
      });
    addAttributes($firstEmpty,poke);
    var availableSlots = $('.hide.card').length;
    if (availableSlots === 0) {
      $('.btn-floating').removeClass('red').addClass('green rotate');
      $('.green').on('click',function(e){
        e.preventDefault();
        $('#modal1').openModal({'complete':function(){updateTeam()}});
      })
      $('#fab_text').text('done');
    } else {
      $('.green').off();
      $('.btn-floating').addClass('red').removeClass('green rotate');
      $('#fab_text').text('not_interested');
    }
  };

  function initializeTeam() {
    $('#battle').removeClass('disabled');
    $('#battle').on('click',battle);
    var idArray = $(':selected').attr('data-id').split('_');
    idArray.forEach(function(el,index) {
      $.getJSON('/pokemon/'+el)
        .done(function(data){
          addToTeam(data,'pokemon'+String(index + 1));
      });
    });
  };

  function newEnemy() {
    $.getJSON('/battle/new').done(function(data){
      var enemy = data.enemy;
      $('.team_name').text(enemy.team_name);
      $('.username').text(enemy.username);
      $('#enemyData').attr('data-id',enemy.pokemon_1_id + '_' + enemy.pokemon_2_id + '_' + enemy.pokemon_3_id + '_' + enemy.pokemon_4_id + '_' + enemy.pokemon_5_id + '_' + enemy.pokemon_6_id);
      initializeEnemy();
    }).fail(function(error){
      console.log(error);
    })
  }

  function initializeEnemy() {
    var enemyArray = $('#enemyData').attr('data-id').split('_');
    enemyArray.forEach(function(el,index) {
      $.getJSON('/pokemon/'+el)
        .done(function(data){
          addToTeam(data,'enemy'+String(index + 1));
      });
    });
  };

  function attack(good,bad) {
    return Math.floor((((2 * good.hp + 10) / 250 ) * (10 * good.attack / bad.defense) + 2) * types[good.type][bad.type]);
  }

  function battle() {
    $('.status').removeClass('hide');
    for (var i = 1; i < 7; i++) {
      var $pokemon = $('#pokemon' + i),
        $enemy = $('#enemy' + i),
        $status = $('#status' + i);
      var pokemon = {
        'attack' : $pokemon.attr('attack'),
        'defense' : $pokemon.attr('defense'),
        'hp' : $pokemon.attr('hp'),
        'type' : $pokemon.attr('poke-type')
      };
      var enemy = {
        'attack' : $enemy.attr('attack'),
        'defense' : $enemy.attr('defense'),
        'hp' : $enemy.attr('hp'),
        'type' : $enemy.attr('poke-type')
      };
      var myAttack = attack(pokemon,enemy);
      var enemyAttack = attack(enemy,pokemon);
      if (myAttack > enemyAttack) {
        $status.children('i')
          .text('thumb_up')
          .removeClass()
          .addClass('green-text material-icons');
        $status.children('span').text('WIN');
      } else if (myAttack < enemyAttack) {
        $status.children('i')
          .text('thumb_down')
          .removeClass()
          .addClass('red-text material-icons');
        $status.children('span').text('LOSE');
      } else {
        $status.children('i')
          .text('thumbs_up_down')
          .removeClass()
          .addClass('material-icons grey-text');
        $status.children('span').text('DRAW');
      }
    }
  }

  function cacheTypes() {
    $.getJSON('/types/').done(function(data){
      data.forEach(function(el) {
        types[el.type_name] = el;
      });
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
    bing('yellow');
    $('.button-collapse').sideNav();
    $('select').material_select();
    cacheTypes();
    initializeEnemy();
    $('#team-select').on('change',initializeTeam)
    $('.loop').on('click',newEnemy);
    $('#team').sortable({
      containment: '#team',
      appendTo: '.container.main',
      update: function() {
        var i = 1;
        $(this).children().children().each(function(index,el){
          $(el).attr('id','pokemon'+String(i));
          i++;
        });
        battle();
      }
    });
  };

  initPage();

});
