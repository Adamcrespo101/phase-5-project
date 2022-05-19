class PatientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :email, :bio

  
  has_many :casefiles
end
