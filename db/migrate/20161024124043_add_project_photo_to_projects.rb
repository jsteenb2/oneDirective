class AddProjectPhotoToProjects < ActiveRecord::Migration[5.0]
  def self.up
    add_attachment :projects, :project_photo
  end

  def self.down
    remove_attachment :projects, :project_photo
  end
end
