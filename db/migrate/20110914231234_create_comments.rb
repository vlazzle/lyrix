class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :song_id
      t.text :text
      t.string :title
      t.integer :line

      t.timestamps
    end
    
    add_index :comments, :song_id
    add_index :comments, :user_id
    add_index :comments, :line
  end
end
