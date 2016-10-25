class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    respond_to do |format|
      format.json { render json: @projects, status: 200 }
    end
  end

  def show
    @project = Project.includes(rows: :components).find(params[:id])
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
    p params
    if map_updates
      # respond_to do |format|
      #   format.json { render json: @project, status: 200 }
      # end
      render :show
    end
  end

  private
    def project_params
      params.require(:project).permit(:title, :description)
    end

    def map_updates
      if params["project"].keys.include?("rows")
        update_existing_rows if params["project"]["rows"].keys.include?("updated")
        add_new_rows if params["project"]["rows"].keys.include?("created")
        return true
      end
      return false
    end

    def update_existing_rows
      params["project"]["rows"]["updated"].each do |row|
        selected_row = @project.rows.find_by_id(row.id)
        selected_row.update( order: row.order )

        update_existing_components(row, selected_row) if row["components"].keys.include?("updated")

        add_new_components(row, selected_row) if row["components"].keys.include?("created")
      end
    end

    def add_new_rows
      params["project"]["rows"]["created"].each do |row|
        selected_row = @project.rows.create(order: row.order)

        update_existing_components(row, selected_row) if row["components"].keys.include?("updated")

        add_new_components(row, selected_row) if row["components"].keys.include?("created")
      end
    end
end
