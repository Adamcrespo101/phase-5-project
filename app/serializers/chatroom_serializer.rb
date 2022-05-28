class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :message, :patient_id, :admin_id

  belongs_to :admin 
  belongs_to :patient
end
