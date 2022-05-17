class Appointment < ApplicationRecord
    belongs_to :admin 
    belongs_to :patient
end
