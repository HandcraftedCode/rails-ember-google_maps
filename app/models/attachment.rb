class Attachment < ActiveRecord::Base
	belongs_to :gig
  attr_accessible :format, :gig_id, :src
  validates :gig_id, :presence => true
end
