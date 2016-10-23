class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    respond_to do |format|
      format.json { render json: @projects, status: 200 }
    end
  end

  def edit
    @project = Project.find(params[:id])
    respond_to do |format|
      format.json { render json: @project.to_json,
        status: 200}
    end
  end
end
