class CasefilesController < ApplicationController

    def index
        render json: Casefile.all, status: :ok
    end

    def create 
        casefile = Casefile.create!(progress: params[:progress], patient_id: params[:patient_id])
        render json: casefile, status: :ok
    end
end
