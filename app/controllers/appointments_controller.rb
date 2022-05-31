class AppointmentsController < ApplicationController
    before_action :find_patient
    def index 
        render json: Appointment.all.order(:startDate), status: :ok
    end

    def create 
        
        appointment = Appointment.create!(appointment_params)
        if appointment.save
            NotifierMailer.appointment_booked(appointment).deliver_now
             render json: appointment, status: :created
        else
            render json: {error: "invalid appointment"}, status: 422
        end
    end

    def destroy 
        appointment = Appointment.find_by(id: params[:id])
        if appointment
        appointment.destroy 
        render json: appointment, status: 202
       else
           render json: {error: "appointment not found"}, status: 404
       end
    end

    def show 
        appointment = Appointment.find_by(id: params[:id])
        render json: appointment, include: :patient, status: :ok
    end

    def update
        appointment = Appointment.find_by(id: params[:id])
        if appointment
        appointment.update(admin_id: params[:admin_id], patient_id: params[:patient_id], time: params[:time], startDate: params[:startDate], endDate: params[:endDate], type_service: params[:type_service], notes: params[:notes], title: params[:title], location_type: params[:location_type])
        render json: appointment, status: :ok
        else 
            render json: {error: "appointment not found"}, status: 404
        end
    end

    private 

    def find_patient 
        @patient = Appointment.find_by(id: params[:patient_id])
    end

    def appointment_params
        params.permit(:title, :notes, :startDate, :type_service, :time, :endDate, :admin_id, :patient_id, :location_type)
    end

end
