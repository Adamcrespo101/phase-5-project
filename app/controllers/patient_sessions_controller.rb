class PatientSessionsController < ApplicationController

    def create 
        patient = patient.find_by(email: params[:email])
        if patient&.authenticate(params[:password])
            session[:patient_id] = patient.id
            render json: patient, status: :created
        else
            render json: { error: {login: "Invalid username or password"}, status: :unauthorized }
        end
    end

    def destroy 
        session.delete :admin_id
        session.delete :patient_id
    end

end
