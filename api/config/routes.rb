Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, param: :_username
      get '/cars/:id', to: 'cars#show'
      resources :cars, param: :_username

      post '/auth/login', to: 'authentication#login'
      post '/register', to: 'registration#register'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
