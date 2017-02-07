$(function() {
  $("#time .btn").click(function() {
    $(this).toggleClass("active");
  })

  $("#dropdownMenu2").click(function() {
    $(this).parent().toggleClass("open");
  })

  $('body').click(function (e) {
      if (!$('#filterMenu').is(e.target)
          && $('#filterMenu').has(e.target).length === 0
          && $('.open').has(e.target).length === 0
      ) {
          $('#filterMenu').removeClass('open');
      }
  });
});
