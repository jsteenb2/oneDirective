class ProjectsController < ApplicationController
  # process params for file upload
  before_action :process_photo, only: [:update]

  def index
    @projects = current_user.projects
    respond_to do |format|
      format.json { render json: @projects, status: 200 }
    end
  end

  def show
    @project = Project.find(params[:id]).includes(rows: :components)
  end

  def create
    @project = current_user.projects.build(project_params)
    if @project.save
      respond_to do |format|
        format.json { render json: @project, status: 200 }
      end
    end
  end

  def edit
    @project = Project.find(params[:id])
    respond_to do |format|
      format.json { render json: @project.to_json,
        status: 200}
    end
  end

  def update
    @project = current_user.projects.find_by_id(params[:id])
    if @project.update(project_params)
      respond_to do |format|
        format.json { render json: { project: @project, params: project_params }, status: 200 }
      end
    end
    # if map_updates
    #   # respond_to do |format|
    #   #   format.json { render json: @project, status: 200 }
    #   # end
    #   render :show
    # end
  end

  private
    def project_params
      params.require(:project).permit(:title, :description, :project_photo)
    end

    def process_photo
      if params[:project_photo]
        params[:project] = {} if !params[:project]
        params[:project][:project_photo] = params[:file]
      end
    end

    def map_updates
      params["project"]["rows"].each do |row|
        new_row = @project.rows.create!(order: row["order"])
        row["components"].each do |component|
          new_row.components.create!( order: component["order"],
                                     name: component["name"],
                                     content: component["content"] )
        end
      end
      return true
    end
end
