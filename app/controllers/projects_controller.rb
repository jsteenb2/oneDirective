class ProjectsController < ApplicationController
  # process params for file upload
  before_action :process_photo, only: [:update]
  before_action :set_github_instance, only: [:publish]
  before_action :build_page, only: [:publish]


  def index
    @projects = current_user.projects
    respond_to do |format|
      format.json { render json: @projects.to_json(methods: [:photo_url]), status: 200 }
    end
  end

  def show
    @project = Project.includes(rows: :components).find(params[:id])
  end

  def create
    @project = current_user.projects.build(project_params)
    if @project.save
      respond_to do |format|
        format.json { render json: @project.to_json(methods: [:photo_url]), status: 200 }
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
    if map_updates
      # respond_to do |format|
      #   format.json { render json: @project, status: 200 }
      # end
      render :show
    else
      update_cards
    end
  end

  def publish
    @repo = @github.push_final_html_to_github
    respond_to do |format|
      format.json {
        render json: @repo, status: 200
      }
    end
  end

  private
    # Updating the project cards on the dashboard.
    def set_github_instance
      @github = GithubApi.new
    end

    def build_page
      @project = current_user.projects.find_by_id(params[:id])
      FileBuilder.new(@project.id)
    end

    def update_cards
      if @project.update(project_params)
        respond_to do |format|
          format.json { render json: @project.to_json(methods: [:photo_url]), status: 200 }
        end
      end
    end

    def process_photo
      if params[:project_photo]
        uploaded = params[:project_photo]
        params[:project] = {} if !params[:project]
        params[:project][:project_photo] = uploaded
      end
    end

    def project_params
      params.require(:project).permit(:title, :description, :project_photo)
    end

    def map_updates
      if params["project"].keys.include?("rows")
        update_existing_rows if params["project"]["rows"].keys.include?("updated")
        add_new_rows if params["project"]["rows"].keys.include?("created")
        delete_existing_rows if params["project"]["rows"].keys.include?("deleted")
        return true
      end
      return false
    end
end
