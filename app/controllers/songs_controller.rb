class SongsController < ApplicationController
  def index
    @all_songs = Song.order 'created_at desc'
    @featured_songs = @all_songs.take 3
    @other_songs = @all_songs.drop 3
  end
  
  def show
    @song = Song.find(params[:id])
  end
  
  def new
    @song = Song.new
  end
  
  def create
    @song = Song.new(params[:song])
    if @song.save
      flash[:notice] = 'Thanks for this lovely new song!'
      redirect_to song_path(@song)
    else
      flash[:error] = 'Sorry, there was an error creating this song'
      render :action => :new
    end
  end
end
