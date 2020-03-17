$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#header').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})

$('#header').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});