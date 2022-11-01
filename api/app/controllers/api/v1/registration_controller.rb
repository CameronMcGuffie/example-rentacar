class Api::V1::RegistrationController < ApplicationController # Thanks to https://medium.com/binar-academy/rails-api-jwt-authentication-a04503ea3248
    # POST /register
    def register
        search_user_by_email = User.find_by_email(params[:email])
        search_user_by_name = User.find_by_username(params[:username])

        if search_user_by_email || search_user_by_name
            render json: { 
                message: 'User with that username or email already exists' 
            }, status: 400

            return
        end

        @user = User.new(user_params)
        
        if @user.save
            render json: { 
                message: 'User created successfully' 
            }, status: :created
        else
          render json: { errors: @user.errors.full_messages },
                 status: :unprocessable_entity
        end
    end

    private

    def user_params
      params.permit(
        :name, :username, :email, :password
      )
    end
end
