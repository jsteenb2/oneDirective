class ChangeTypeColName < ActiveRecord::Migration[5.0]
  def change
    rename_column(:components, :type, :component_type)
  end
end
