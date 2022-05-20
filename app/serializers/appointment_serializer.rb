class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :startDate, :endDate, :admin_id, :patient_id, :location_type

  belongs_to :admin 
  belongs_to :patient
end
