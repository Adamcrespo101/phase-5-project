class CreateChatrooms < ActiveRecord::Migration[6.1]
  def change
    create_table :chatrooms do |t|
      t.string :message
      t.integer :patient_id
      t.integer :admin_id

      t.timestamps
    end
  end
end
