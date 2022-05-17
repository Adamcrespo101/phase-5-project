class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.string :title
      t.string :notes
      t.string :startDate
      t.string :endDate
      t.integer :admin_id
      t.integer :patient_id

      t.timestamps
    end
  end
end
