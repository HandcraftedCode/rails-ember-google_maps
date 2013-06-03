class MediaFile < ActiveRecord::Base
	belongs_to :gig
  attr_accessible :format, :gig_id, :src
end
