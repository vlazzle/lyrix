class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.text :lyrics
      t.string :title

      t.timestamps
    end
  end
end
