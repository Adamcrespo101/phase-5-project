class Casefile < ApplicationRecord
    belongs_to :patient

    validates :progress, presence: true
    validates :report_date, presence: true
    validates_each :report_date do |record, attr, value|
        begin
          Date.parse(value)
        rescue
          record.errors.add(attr, "Invalid date")
        end
      end

end
