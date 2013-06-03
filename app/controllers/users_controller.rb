class UsersController < ApplicationController
	def check_for
		cruiser = User.where("email = ?", params[:email] + '.com')
		if User.exists?(:email => params[:email] + '.com')
			render :json => cruiser, :status => 200
		else
			render :json => cruiser, :status => 422
		end
		
	end
end