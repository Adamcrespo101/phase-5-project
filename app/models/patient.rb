class Patient < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :casefiles, dependent: :destroy
    has_many :admins, through: :appointments

    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true 
    validates :email, presence: true
    validates :date_of_birth, presence: true
    validates :password_digest, presence: true
    validates :email, uniqueness: true
    #validates :bio, length: {minimum: 100, 
     #   too_short: "100 characters is the minimum required length for a patient bio"}
    validates_each :date_of_birth do |record, attr, value|
            begin
              Date.parse(value)
            rescue
              record.errors.add(attr, "Invalid date")
            end
          end

end
