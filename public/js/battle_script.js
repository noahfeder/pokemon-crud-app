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
      .attr('poke-id',poke.poke_id);
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
    console.log(idArray);
    idArray.forEach(function(el,index) {
      $.getJSON('/pokemon/id/'+el)
        .done(function(data){
          console.log(data);
          addToTeam(data,'pokemon'+String(index + 1));
      });
    });
  };

  function initializeEnemy() {
    var enemyArray = $('#enemyData').attr('data-id').split('_');
    enemyArray.forEach(function(el,index) {
      $.getJSON('/pokemon/id/'+el)
        .done(function(data){
          console.log(data);
          addToTeam(data,'enemy'+String(index + 1));
      });
    });
  };

  function initPage() {
    $('#team-select').on('change',initializeTeam)
    initializeEnemy();
    $('select').material_select();
  };

  initPage();

});
