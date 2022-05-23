class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :startDate, :endDate, :admin_id, :patient_id, :location_type, :type_service, :time

  belongs_to :admin 
  belongs_to :patient
end
