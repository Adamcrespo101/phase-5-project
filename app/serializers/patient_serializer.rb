class PatientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :email, :bio, :full_name, :date_of_birth

  has_many :appointments
  has_many :casefiles
end
