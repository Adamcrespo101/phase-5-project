class AppointmentsController < ApplicationController

    def index 
        render json: Appointment.all, status: :ok
    end

    def create 
        appointment = Appointment.create!(appointment_params)
        render json: appointment, status: :created
    end

    private 

    def appointment_params
        params.permit(:title, :notes, :startDate, :type_service, :time, :endDate, :admin_id, :patient_id, :location_type)
    end

end
