class AddIsAdminToAdmins < ActiveRecord::Migration[6.1]
  def change
    add_column :admins, :is_admin, :boolean
  end
end
