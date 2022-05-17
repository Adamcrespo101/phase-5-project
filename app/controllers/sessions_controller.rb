class SessionsController < ApplicationController

    def create 
        admin = Admin.find_by(email: params[:email])
        if admin&.authenticate(params[:password])
            session[:admin_id] = admin.id
            render json: admin, status: :created
        else
            render json: { error: {login: "Invalid username or password"}, status: :unauthorized }
        end
    end

    def destroy 
        session.delete :admin_id
        session.delete :patient_id
    end



end
