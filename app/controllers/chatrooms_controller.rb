class ChatroomsController < ApplicationController

def index 
    render json: Chatroom.all, status: 200
end

def create 
    message = Chatroom.create(chat_params)
    render json: message, status: 201
end

private 

def chat_params 
    params.permit(:message, :patient_id, :admin_id)
end

end
