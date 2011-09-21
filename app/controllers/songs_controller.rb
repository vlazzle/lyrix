class SongsController < ApplicationController
  def index
    @songs = Song.order 'created_at desc'
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
