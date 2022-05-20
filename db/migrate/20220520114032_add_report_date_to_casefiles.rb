class AddReportDateToCasefiles < ActiveRecord::Migration[6.1]
  def change
    add_column :casefiles, :report_date, :string
  end
end
