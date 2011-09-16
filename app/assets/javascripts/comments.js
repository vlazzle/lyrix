$(function() {
  conf = {
    songId: $('#lyrics').data('song_id')
  };
  
  $('.line').hover(function(e) {
    $('.add_comments', this).toggleClass('show');
  });
  
  $('.view_comments a').click(function(e) {
    $.getJSON('/songs/' + conf.songId + '/comments', function(data) {
      console.debug(data);
    });
    return false;
  });
  
  $(window).scroll(function() {
    // check if we're at the bottom of the page
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      $.get('/songs/' + conf.songId + '/comments', function(data) {
        $('#discussion').append(data);
        
        // should only be triggered once
        $(window).unbind('scroll');
      });
    }
  });
});