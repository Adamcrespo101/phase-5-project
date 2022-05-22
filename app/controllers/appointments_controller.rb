class AppointmentsController < ApplicationController

    def index 
        render json: Appointment.all, status: :ok
    end

    def create 
        appointment = Appointment.create!(appointment_params)
        render json: appointment, status: :created
    end

    def destroy 
        appointment = Appointment.find_by(id: params[:id])
        appointment.destroy 
        head :no_content
    end

    def show 
        appointment = Appointment.find_by(id: params[:id])
        render json: appointment, status: :ok
    end

    private 

    def appointment_params
        params.permit(:title, :notes, :startDate, :type_service, :time, :endDate, :admin_id, :patient_id, :location_type)
    end

end
