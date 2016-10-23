class AddTitleToProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :title, :string
  end
end
