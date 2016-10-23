class ComponentsController < ApplicationController

  def index
    @components = Component.all
    respond_to do |format|
      format.json { render json: @components.to_json, status: 200 }
    end
  end
end
