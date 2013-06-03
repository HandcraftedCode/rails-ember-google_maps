class Gig < ActiveRecord::Base
  belongs_to :user
  has_many :media_files
attr_accessible :cat1, :cat2, :email, :end, :external_url, :lat, :lng, :name, :notes, :pricehigher, :pricelower, :start, :ticket_url, :user_is_going, :user_id
attr_protected :promoted
end
