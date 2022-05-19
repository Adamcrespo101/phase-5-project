class RemoveUpdateFromCasefiles < ActiveRecord::Migration[6.1]
  def change
    remove_column :casefiles, :update
  end
end
