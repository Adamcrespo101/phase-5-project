class AdminsController < ApplicationController

    def index
        render json: Admin.all, status: :ok
    end 

    def create 
        admin = Admin.create!(email: params[:email], first_name: params[:first_name], last_name: params[:last_name], password: params[:password])
        if admin.valid?
            session[:admin_id] = admin.id
            render json: admin, status: :created
        else
            render json: admin.errors.full_messages, status: 422
        end
    end

    def show 
        if params[:id] #if we have /:id we are getting any user 
            admin = Admin.find(params[:id])
            render json: admin 
        end
        #if we dont have /:id we are authenticating a logged in user 
        admin = Admin.find_by(id: session[:admin_id])
        if admin
            render json: admin, status: :ok
        else
            render json: {error: "admin not found"}, status: 401
        end
    end

    def destroy
        admin = Admin.find_by(id: params[:id])
        if admin 
            admin.destroy 
            head :no_content
        else
            render json: {error: "admin not found"}, status: 404
        end
    end
   
end
