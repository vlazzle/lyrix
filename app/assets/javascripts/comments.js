var Comments = (function() {
  function randomMusicalSymbol() {
    var choices = '9abc';
    return [
      '&#x266',
      choices[Math.floor(Math.random() * choices.length)],
      ';'
    ].join('');
  }

  function updateParentBox($box, zeroWidth) {
    $box.parent().css({
      top: 0,
      left: $('#main').width(),
      width: zeroWidth ? 0 : halfWidth(),
      height: $(window).height()
    });
  }

  function halfWidth() {
    return $('body').width() - $('#main').width();
  }

  function trim(str) {
    return str.trim().replace(/\W*$/, '');
  }
  
  function formatDatesForLocale($container) {
    $('.date', $container).each(function() {
      var $date = $(this),
          date = new Date($date.html());
      
      $date.html(date.toLocaleDateString());
    });
  }

  function showSomeComments(xhrGetCallback) {
    _showComments(xhrGetCallback);
  }

  function showCommentsForSelector($songLineSelector, xhrGetCallback) {
    _showComments($songLineSelector, xhrGetCallback);
  }

  function _showComments(/* [$target], xhrGetCallback */) {
    var params = {};

    if (arguments.length === 2) {
      var xhrGetCallback = arguments[1];
          $target = arguments[0],
          $line = $target.parents('.line'),
          lineno = $line.attr('id').slice(1) - 1,
          $lyrics = $('#lyrics'),
          $lyric = $('.lyric', $line),
          header = trim($lyric.text()),
          showNotes = true;

      $('.lyric', $lyrics).removeClass('red');
      $lyric.addClass('red');

      params.line = lineno;
    }
    else {
      var xhrGetCallback = arguments[0],
          header = null,
          showNotes = false;
    }
    
    var url;
    if (typeof Song !== 'undefined' && typeof Song.id !== 'undefined') {
      url = '/songs/' + Song.id + '/comments';
      header = header || 'All Comments';
    }
    else {
      params.limit = 5;
      url = '/comments';
      header = header || 'Latest Comments';
    }

    var $commentList = $('#comment_list div');

    // TODO use template
    $commentList.html([
      '<h1><span class="gray">',
      Comments.randomMusicalSymbol(),
      '</span> ',
      header,
      '<span>&hellip; </span><span class="gray">',
      Comments.randomMusicalSymbol(),
      '</span></h1>'
    ].join(''));

    !showNotes && $('span', $commentList).hide();

    $commentList.parent().css({
      display: 'block',
      position: 'fixed'
    });
    Comments.updateParentBox($commentList, true);

    $commentList.parent().animate({
      width: Comments.halfWidth()
    }, 200);

    $.get(url, params, xhrGetCallback);
  }

  return {
    randomMusicalSymbol: randomMusicalSymbol,
    updateParentBox: updateParentBox,
    halfWidth: halfWidth,
    trim: trim,
    formatDatesForLocale: formatDatesForLocale,
    showSomeComments: showSomeComments,
    showCommentsForSelector: showCommentsForSelector
  };
}());

$(function() {
  Song = {
    id: $('#lyrics').data('song_id')
  };

  $('.line').hover(function(e) {
    $('.add_comments', this).toggleClass('show');
  });

/*
  $('#main').scroll(function() {
    // check if we're at the bottom of the scrollable box
    var yPadding = parseInt($('#main2').css('padding-top')) + parseInt($('#main2').css('padding-bottom'));
    if ($('#main').scrollTop() >= $('#main2').height() - $(window).height() + yPadding - 1) {
      $.get('/songs/' + Song.id + '/comments', function(data) {
        $('#discussion').append(data);

        // this scroll event handler should only be triggered once
        $('#main').unbind('scroll');
      });
    }
  });
*/

  var $commentList = $('#comment_list div');

  $('.view_comments a').click(function(e) {
    Comments.showCommentsForSelector($(e.target), function(data) {
      $commentList.append(data);
      Comments.formatDatesForLocale($commentList);
    });
    return false;
  });

  $(window).resize(function() {
    Comments.updateParentBox($commentList, false);
  });

  Comments.showSomeComments(function(data) {
    $commentList.append(data);
    $('#discussion').append(data);
    $('#discussion .comment, ' + $commentList.selector + ' .comment').each(function() {
      var $comment = $(this),
          lineno = parseInt($comment.data('line')) + 1;
      
      if (typeof Song !== 'undefined' && typeof Song.id !== 'undefined' && !isNaN(lineno)) {
        $('p:first', $comment).append(' at <a href="#l' + lineno + '">line ' + lineno + '</a>');
      }
      
      Comments.formatDatesForLocale($comment);
    });
  });
});
