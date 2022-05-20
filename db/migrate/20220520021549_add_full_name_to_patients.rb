class AddFullNameToPatients < ActiveRecord::Migration[6.1]
  def change
    add_column :patients, :full_name, :string
  end
end
