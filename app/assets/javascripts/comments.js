function randomMusicalSymbol() {
  var choices = '9abc';
  return [
    '&#x266',
    choices[Math.floor(Math.random() * choices.length)],
    ';'
  ].join('');
}

function updateBox($box, zeroWidth) {
  $box.css({
    top: 0,
    left: $('#main').width(),
    width: zeroWidth ? 0 : halfWidth(),
    height: $(window).height()
  });
}

function halfWidth() {
  return $('body').width() - $('#main').width()
}

function trim(str) {
  return str.trim().replace(/\W*$/, '');
}

$(function() {
  conf = {
    songId: $('#lyrics').data('song_id')
  };
  
  $('.line').hover(function(e) {
    $('.add_comments', this).toggleClass('show');
  });
  
  $('.view_comments a').click(function(e) {
    var $line = $(e.target).parents('.line'),
        lineno = $line.attr('id').slice(1) - 1.
        $lyrics = $('#lyrics'),
        $lyric = $('.lyric', $line);

    $('#comment_list').remove();
    $('.lyric', $lyrics).removeClass('red');
    
    var $commentList = $([
      '<section id="comment_list"><div><h1><span class="gray">',
      randomMusicalSymbol(),
      '</span> ',
      trim($lyric.text()),
      '&hellip; <span class="gray">',
      randomMusicalSymbol(),
      '</span></h1>',
      '</div></section>'
    ].join('')).prependTo('body');
    
    var top = Math.min($lyric.position().top, Math.max($lyrics.position().top, $(window).scrollTop()));
    
    $commentList.css({
      display: 'block',
      position: 'fixed'
    });
    updateBox($commentList, true);
    
    $lyric.addClass('red');
    $commentList.animate({
      width: halfWidth(),
    }, 200);

    $.get('/songs/' + conf.songId + '/comments', {line:lineno}, function(data) {
      $('div', $commentList).append(data);
    });
    return false;
  });
  
  $('#main').scroll(function() {
    // check if we're at the bottom of the scrollable box
    var yPadding = parseInt($('#main2').css('padding-top')) + parseInt($('#main2').css('padding-bottom'));
    if ($('#main').scrollTop() >= $('#main2').height() - $(window).height() + yPadding - 1) {
      $.get('/songs/' + conf.songId + '/comments', function(data) {
        $('#discussion').append(data);
        
        // this scroll event handler should only be triggered once
        $('#main').unbind('scroll');
      });
    }
  });
  
  $(window).resize(function() {
    updateBox($('#comment_list'), false);
  });
});