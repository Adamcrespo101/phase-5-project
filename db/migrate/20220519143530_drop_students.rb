class DropStudents < ActiveRecord::Migration[6.1]
  def change
  drop_table :students
  end
end
