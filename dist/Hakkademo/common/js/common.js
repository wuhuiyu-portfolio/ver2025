'use strict';


$(function () {

    var leftMenu = $('.left-menu'),
        rightMenu = $('.right-menu'),
        leftMenuTrigger = $('.left-menu-trigger'),
        rightMenuTrigger = $('.right-menu-trigger'),
        leftMenuIsOpen = false,
        rightMenuIsOpen = false;

    leftMenuTrigger.on('click', toggleLeftMenu);
    rightMenuTrigger.on('click', toggleRightMenu);
    $('main').on('click', function(e) {
      var target = e.target;
      if(leftMenuIsOpen && target !== leftMenuTrigger) {
        toggleLeftMenu();
      }
      if(rightMenuIsOpen && target !== rightMenuTrigger) {
        toggleRightMenu();
       $(".right-menu-trigger").removeClass('colse'); 
       $(".black-bd").removeClass('open'); 
       $(".left-top-logo").removeClass('logo-open'); 
      }
    });

    function toggleLeftMenu() {
      if(rightMenuIsOpen) {
        rightMenu.removeClass('push-270-to-left');
        rightMenuIsOpen = false;
      }
      
      if(leftMenuIsOpen) {
        leftMenu.removeClass('push-270-to-right');
      } else {
        leftMenu.addClass('push-270-to-right');
      }
      leftMenuIsOpen = !leftMenuIsOpen;
    }

    function toggleRightMenu() {
      if(leftMenuIsOpen) {
        leftMenu.removeClass('push-270-to-right');
        leftMenuIsOpen = false;
      }
      
      if(rightMenuIsOpen) {
        rightMenu.removeClass('push-270-to-left');
      } else {
        rightMenu.addClass('push-270-to-left');
      }
      rightMenuIsOpen = !rightMenuIsOpen;
    }



    $(".right-menu-trigger").click(function(){
      $(".right-menu-trigger").toggleClass('colse');
      $(".black-bd").toggleClass('open');
      $(".left-top-logo").toggleClass('logo-open');
    });

});
