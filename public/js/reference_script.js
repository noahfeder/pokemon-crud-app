"use strict";
$(function(){

  function loadType() {
    var type = $(this).val();
    location.replace("/reference/pokemon/?type="+type);
  }

  function initPage() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('#typeFilter').on('change',loadType);
  }

  initPage();

});
