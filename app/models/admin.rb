class Admin < ApplicationRecord
    has_many :appointments
    has_many :patients, through: :appointments
    has_many :chatrooms

    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true 
    validates :email, presence: true
    validates :password_digest, presence: true
    validates :email, uniqueness: true
    
end
