Rails.application.routes.draw do
  
  resources :appointments
  resources :patients
  resources :admins

  #Admin routes

  post '/login', to: "sessions#create"

  delete '/logout', to: "sessions#destroy"

  get '/me', to: 'admins#show'

  get '/find/:id', to: 'admins#find'

  #patient routes 
  post '/patient/login', to: "patient_sessions#create"

  get '/auth', to: "patients#show"

  get '/signup', to: "patients#create"

  post '/patient/login', to: "patient_sessions#create"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
