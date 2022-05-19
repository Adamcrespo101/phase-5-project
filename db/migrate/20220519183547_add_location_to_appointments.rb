class AddLocationToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :location, :string
  end
end
