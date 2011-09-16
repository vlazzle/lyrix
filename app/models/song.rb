class Song < ActiveRecord::Base
  has_many :comments
  
  def lines
    @lines ||= lyrics.split "\n"
  end
  
  def reload
    @lines = nil
    
    super
  end
  
  def has_comment_on_line?(line)
    comments.exists? line:line
  end
end
