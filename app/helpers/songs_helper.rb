module SongsHelper
  def lyrics_preview(song, length=200)
    # try to grab the chorus; fall back to the beginning of the song
    blurb = excerpt(song.lyrics, 'chorus', radius:length / 2) || truncate(song.lyrics, length:length)
    
    simple_format(blurb)
  end
end
