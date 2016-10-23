class RowsController < ApplicationController
  def index
    @rows = Row.all
    respond_to do |format|
      format.json { render json: @rows.to_json, status: 200 }
    end
  end
end
