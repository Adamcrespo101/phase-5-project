# Preview all emails at http://localhost:3000/rails/mailers/notifier
class NotifierPreview < ActionMailer::Preview
    def appointment_booked
        appointment = Appoinment.last
        NotifierMailer.appointment_booked(appointment)
      end
end
