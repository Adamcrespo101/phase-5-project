class CasefileSerializer < ActiveModel::Serializer
  attributes :id, :progress, :patient_id, :report_date

  belongs_to :patient

end
