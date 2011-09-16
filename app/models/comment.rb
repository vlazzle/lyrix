class Comment < ActiveRecord::Base
  belongs_to :song
  
  validates_presence_of :user_id, :song_id, :text
end
