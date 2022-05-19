class AddTypeServiceToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :type_service, :string
  end
end
