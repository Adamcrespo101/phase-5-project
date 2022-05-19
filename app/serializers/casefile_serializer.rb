class CasefileSerializer < ActiveModel::Serializer
  attributes :id, :progress, :patient_id

  belongs_to :patient

end
