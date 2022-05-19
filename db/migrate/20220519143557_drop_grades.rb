class DropGrades < ActiveRecord::Migration[6.1]
  def change
    drop_table :grades
  end
end
