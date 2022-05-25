class NotifierMailer < ApplicationMailer
    default from: 'Appointmentbot@healwelltherapy.com'

def appointment_booked
    @patient = Patient.second
    mail(
        to: @patient.email,
        subject: "Your appointment is booked!"
    ) do |format|
        format.html { render 'appointment_created' }
        format.text { render plain: 'Render text' }
      end

end

end
