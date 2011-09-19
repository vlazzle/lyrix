class CommentsController < ApplicationController
  respond_to :html, :json
  
  def index
    @comments = Comment.order 'created_at desc'
    @comments = @comments.where(:song_id => params[:song_id]) if params.include?(:song_id)
    @comments = @comments.where(:line => params[:line]) if params.include?(:line)
    @comments = @comments.limit(params[:limit]) if params.include?(:limit)
    
    respond_with(@comments, :layout => !request.xhr?) do |format|
      format.html
      format.json { render json:@comments }
    end
  end
end
