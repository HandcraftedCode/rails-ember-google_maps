class CreateMediaFiles < ActiveRecord::Migration
  def change
    create_table :media_files do |t|
      t.string :src
      t.string :format
      t.integer :gig_id

      t.timestamps
    end
  end
end
