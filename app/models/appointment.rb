class Appointment < ApplicationRecord
    belongs_to :admin 
    belongs_to :patient

    validates :location_type, presence: true
    validates :time, presence: true
    validates :type_service, presence: true
    validates :title, presence: true
    def unique_date 
        if Appointment.find_by(startDate: startDate, time: time)
            errors.add(:appointment, "That appointment is already booked, select a different date/time.")
        end
    end

    validates_each :startDate, :endDate do |record, attr, value|
        begin
          Date.parse(value)
        rescue
          record.errors.add(attr, "Invalid date")
        end
      end

end
