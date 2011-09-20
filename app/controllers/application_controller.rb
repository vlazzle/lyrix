class ApplicationController < ActionController::Base
  protect_from_forgery
  
  layout :layout
  
  protected
  
  def layout
    !request.xhr? && 'application'
  end
end
