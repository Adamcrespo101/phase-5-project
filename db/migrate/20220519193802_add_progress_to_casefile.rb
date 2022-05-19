class AddProgressToCasefile < ActiveRecord::Migration[6.1]
  def change
    add_column :casefiles, :progress, :string
  end
end
