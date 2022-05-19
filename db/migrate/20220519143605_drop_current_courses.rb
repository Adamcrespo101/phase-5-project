class DropCurrentCourses < ActiveRecord::Migration[6.1]
  def change
    drop_table :current_courses
  end
end
