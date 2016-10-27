class AddTypeToComponents < ActiveRecord::Migration[5.0]
  def change
    add_column :components, :type, :string
  end
end
