class PatientsController < ApplicationController
    
    def index 
        render json: Patient.all, status: :ok
    end

    def create 
        patient = Patient.create!(patient_params)
        if patient.valid?
            session[:patient_id] = patient.id
            render json: patient, status: :created
        else
            render json: patient.errors.full_messages, status: 422
        end
    end

    def show 
        if params[:id] #if we have /:id we are getting any user 
            patient = Patient.find(params[:id])
            render json: patient
        end
        #if we dont have /:id we are authenticating a logged in user 
        patient = Patient.find_by(id: session[:patient_id])
        if patient
            render json: patient, status: :ok
        else
            render json: {error: "patient not found"}, status: 401
        end
    end


    private 

    def patient_params 
        params.permit(:first_name, :last_name, :email, :password, :bio, :date_of_birth)
    end

end
