class ChangeDataTypeForDateOfBirth < ActiveRecord::Migration[6.1]
  def change
    change_column :patients, :date_of_birth, :string
  end
end
