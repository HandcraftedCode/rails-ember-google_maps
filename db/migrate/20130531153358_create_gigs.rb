class CreateGigs < ActiveRecord::Migration
  def change
    create_table :gigs do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.string :start
      t.string :end
      t.string :email
      t.text :notes
      t.string :external_url
      t.boolean :user_is_going
      t.string :ticket_url
      t.boolean :promoted
      t.string :cat1
      t.string :cat2
      t.float :pricelower
      t.float :pricehigher
      t.references :user

      t.timestamps
    end
    add_index :gigs, :user_id
  end
end
