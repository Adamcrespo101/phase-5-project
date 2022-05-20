class CasefilesController < ApplicationController

    def index
        render json: Casefile.all, status: :ok
    end

    def create 
        casefile = Casefile.create!(progress: params[:progress], patient_id: params[:patient_id], report_date: params[:report_date])
        render json: casefile, status: :ok
    end

    def show 
        casefile = Casefile.find_by(id: params[:id])
        render json: casefile, status: :ok
    end

    def update 
        casefile = Casefile.find_by(id: params[:id])
        casefile.update(progress: params[:progress], patient_id: params[:patient_id], report_date: params[:report_date])
        render json: casefile, status: :accepted
    end

    def destroy 
        casefile = Casefile.find_by(id: params[:id])
        casefile.destroy 
        head :no_content
    end

end
