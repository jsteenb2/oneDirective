class AddWidthToComponents < ActiveRecord::Migration[5.0]
  def change
    add_column :components, :width, :string
  end
end
