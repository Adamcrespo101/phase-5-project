class AdminSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :is_admin
  has_many :appointments
  has_many :patients
  has_many :chatrooms 
end
