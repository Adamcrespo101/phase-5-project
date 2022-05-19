class DropTeachers < ActiveRecord::Migration[6.1]
  def change
    drop_table :teachers
  end
end
