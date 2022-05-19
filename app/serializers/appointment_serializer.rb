class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :notes, :startDate, :endDate, :admin_id, :patient_id

  has_many :appointments
end
