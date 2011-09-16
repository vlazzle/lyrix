class CommentsController < ApplicationController
  respond_to :html, :json
  
  def index
    @comments = Comment.scoped
    @comments = @comments.where(:song_id => params[:song_id]) if params.include?(:song_id)
    @comments = @comments.where(:line => params[:line]) if params.include?(:line)
    
    respond_with(@comments, :layout => !request.xhr?) do |format|
      format.html
      format.json { render json:@comments }
    end
  end
end
