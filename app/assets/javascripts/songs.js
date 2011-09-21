$(function() {
  $('#add_song').click(function(e) {
    var $aButton = $(e.target);

    $.get($aButton.attr('href'), function(data) {
      $aButton.parent().after(data);
      var $songTitleField = $('#song_form :input:visible:first')
      $songTitleField.focus();
      
      // rebind click to prevent duplicate forms
      $aButton.unbind('click');
      $aButton.click(function() {
        $songTitleField.focus();
      });
      
      location.hash = $aButton.attr('id');
      $aButton.attr('href', location.hash);
    });
    
    return false;
  });
});