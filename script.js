"use strict";
$(function(){

$('button').on('click',function(e){
  e.preventDefault();
  var pokemon = {};
  for (var i = 0; i < 152; i++) {
    $.getJSON('http://pokeapi.co/api/v2/pokemon/'+i).done(function(data){
      var stuff = {
        'id' : data.id,
        'name': data.name,
        'front_img' : data.sprites.front_default,
        'back_img' : data.sprites.back_default,
        'height' : data.height,
        'type1' :  data.types[0].type.name//,
        //'type2' :  data.types[1].type.name
      }
      if (data.types[1]) {
        stuff.type2 = data.types[1].type.name;
      }
      pokemon[data.name] = stuff;
      if (i === 151) {
        console.log(pokemon);
      }
    });
  }
  });
});

