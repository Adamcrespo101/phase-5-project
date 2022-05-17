class Patient < ApplicationRecord
    has_many :appointments 
    has_many :admins, through: :appointments

    has_secure_password
end
