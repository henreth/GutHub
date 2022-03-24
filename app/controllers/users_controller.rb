class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    #In your controller, you would just call Drinks.where(id: user.favorites)


    def index
        @users = User.all
        render json: @users
    end


    def update
        @user.update(user_params)
        render json: @user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @user
    end

    def destroy
        user = @user
        user.destroy
        head :no_content
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
    # Only allow a trusted parameter "white list" through.
    # Add Email to user params (stretch deliverable)
    def user_params
      params.require(:user).permit(
          :name, 
          :username, 
          :password, 
          :password_confirmation, 
          :image_url, 
          :description
          )
    end
end
