class MediaFileSerializer < ActiveModel::Serializer
  attributes :id, :src, :format, :gig_id
  has_one :gig
end
