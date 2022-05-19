class CreateCasefiles < ActiveRecord::Migration[6.1]
  def change
    create_table :casefiles do |t|
      t.string :update
      t.integer :patient_id

      t.timestamps
    end
  end
end
