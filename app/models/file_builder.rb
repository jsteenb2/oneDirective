require 'open-uri'

class FileBuilder

  def initialize(project_id)
    @project = Project.find_by_id(project_id)
  end

end
