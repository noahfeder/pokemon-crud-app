"use strict";
$(function(){

  function addAttributes(img, poke) {
    var content = img.parent().parent().children('.card-content').children('p');
    content.children('.name').text(poke.poke_name);
    content.children('.hp').text('HP: ' + poke.hp);
    content.children('.attack').text('Attack: ' + poke.attack);
    content.children('.defense').text('Defense: ' + poke.defense);
    content.children('.type').text('Type: ' + poke.type);
  };

  function addToTeam(poke, id) {
    var $firstEmpty = id ? $('#'+id).children('.card-image').children('img') : $($('img[src="#!"]')[0]);
    $firstEmpty.attr('src', 'http://www.pokestadium.com/sprites/green/'+poke.img_name+'.png');
    $firstEmpty.parent().parent().removeClass('hide')
      .attr({
        'poke-id':poke.poke_id,
        'hp': poke.hp,
        'attack' : poke.attack,
        'defense' : poke.defense
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
    var idArray = $(':selected').attr('data-id').split('_');
    idArray.forEach(function(el,index) {
      $.getJSON('/pokemon/'+el)
        .done(function(data){
          addToTeam(data,'pokemon'+String(index + 1));
      });
    });
  };

  function initializeEnemy() {
    var enemyArray = $('#enemyData').attr('data-id').split('_');
    enemyArray.forEach(function(el,index) {
      $.getJSON('/pokemon/'+el)
        .done(function(data){
          addToTeam(data,'enemy'+String(index + 1));
      });
    });
  };

  function battle() {
    for (var i = 1; i < 7; i++) {
      var $pokemon = $('#pokemon' + i),
        $enemy = $('#enemy' + i),
        $status = $('#status' + i);
      var pokemon = {
        'attack' : $pokemon.attr('attack'),
        'defense' : $pokemon.attr('defense'),
        'hp' : $pokemon.attr('hp')
      };
      var enemy = {
        'attack' : $enemy.attr('attack'),
        'defense' : $enemy.attr('defense'),
        'hp' : $enemy.attr('hp')
      };
      var myAttack = (((2 * pokemon.hp + 10) / 250 ) * (10 * pokemon.attack / enemy.defense) + 2),
       enemyAttack = (((2 * enemy.hp + 10) / 250 ) * (10 * enemy.attack / pokemon.defense) + 2);
      console.log('My attack: ' + myAttack);
      console.log('Enemy attack: ' + enemyAttack);
      if (myAttack > enemyAttack) {
        console.log('win')
        $status.text('win');
      } else if (myAttack < enemyAttack) {
        console.log('win')
        $status.text('lose');
      } else {
        console.log('win')
        $status.text('draw');
      }
    }
  }

  function initPage() {
    $('#team-select').on('change',initializeTeam)
    initializeEnemy();
    $('select').material_select();
    $('#battle').on('click',battle);
  };

  initPage();

});
