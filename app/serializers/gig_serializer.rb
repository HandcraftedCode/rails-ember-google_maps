class GigSerializer < ActiveModel::Serializer
  attributes :id, :name, :lat, :lng, :start, :end, :email, :notes, :external_url, :user_is_going, :ticket_url, :promoted, :cat1, :cat2, :pricelower, :pricehigher, :user_id
  has_many :attachments
end
