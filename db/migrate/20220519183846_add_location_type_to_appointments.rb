class AddLocationTypeToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :location_type, :string
  end
end
