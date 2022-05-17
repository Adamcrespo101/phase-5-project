class PatientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :email, :bio
end
