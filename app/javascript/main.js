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

  setFoldEffect();
  $(window).resize(function() {
    setFoldEffect();
  });
});

function setFoldEffect() {
  if ($(window).width() >= 992) {
    $('#college-container').hover(function() {
      $('#college-container').removeClass('col-md-1');
      $('#college-container').addClass('col-md-3');
      $('#course-container').removeClass('col-md-10');
      $('#course-container').addClass('col-md-8');
    }, function() {
      $('#college-container').removeClass('col-md-3');
      $('#college-container').addClass('col-md-1');
      $('#course-container').removeClass('col-md-8');
      $('#course-container').addClass('col-md-10');
    });
    $('#dept-container').hover(function() {
      $('#dept-container').removeClass('col-md-1');
      $('#dept-container').addClass('col-md-3');
      $('#course-container').removeClass('col-md-10');
      $('#course-container').addClass('col-md-8');
    }, function() {
      $('#dept-container').removeClass('col-md-3');
      $('#dept-container').addClass('col-md-1');
      $('#course-container').removeClass('col-md-8');
      $('#course-container').addClass('col-md-10');
    });
  } else {
    $('#college-container').unbind('mouseenter mouseleave');
    $('#dept-container').unbind('mouseenter mouseleave');
  }
}
