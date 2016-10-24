class StaticPagesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def new
  end

  def index
  end
end
