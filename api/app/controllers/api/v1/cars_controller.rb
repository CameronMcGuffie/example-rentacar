class Api::V1::CarsController < ApplicationController
  before_action :authorize_request
  # before_action :find_user, except: %i[create index]

  # GET /cars
  def index
    @cars = Car.all
    render json: @cars, status: :ok
  end

  # GET /cars/{car_id}
  def show
    if @car = Car.find_by_id(params[:id])
      render json: @car, status: :ok
    else
      render json: { 'message': 'Car not found' }, status: 404
    end
  end

  # POST /cars
  def create
    @car = Car.new(
      model: params['model'],
      year: params['year'],
      description: params['description'],
      image: params['image'],
      price: params['price'],
      hired: false,
      hired_by: nil,
      created_by: @current_user.id)

      if @car.save
      render json: { 
          message: 'Car created successfully' 
      }, status: :created
    else
      render json: { errors: @car.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def find_user
    @user = Car.find_by_username!(params[:_username])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: 'User not found' }, status: :not_found
  end

  def car_params
    params.permit(
      :model, :year, :description, :image, :price, :hired, :hired_by
    )
  end
end
