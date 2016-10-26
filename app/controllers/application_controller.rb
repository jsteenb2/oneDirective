class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def update_existing_rows
    params["project"]["rows"]["updated"].each do |row|
      selected_row = @project.rows.find_by_id(row["id"])
      selected_row.update( order: row["order"] )

      update_existing_components(row, selected_row) if row["components"].keys.include?("updated")

      add_new_components(row, selected_row) if row["components"].keys.include?("created")
    end
  end

  def add_new_rows
    params["project"]["rows"]["created"].each do |row|
      selected_row = @project.rows.create(order: row["order"])

      update_existing_components(row, selected_row) if row["components"].keys.include?("updated")

      add_new_components(row, selected_row) if row["components"].keys.include?("created")

      delete_existing_components(row) if row["components"].keys.include?("deleted")
    end
  end

  def delete_existing_rows
    params["project"]["rows"]["deleted"].each do |row|
      _row = Row.find_by_id(row["id"])
      _row.destroy
    end
  end

  def update_existing_components(row, selected_row)
    puts "SELECTED ROW"
    p selected_row
    puts "ROW"
    p row
    row["components"]["updated"].each do |component|
      _component = Component.find_by_id(component["id"])
      _component.update(order: component["order"],
                        content: component["content"],
                        name: component["name"],
                        row_id: selected_row[:id])
    end
  end

  def add_new_components(row, selected_row)
    row["components"]["created"].each do |component|
      _component = selected_row.components.create( order: component["order"],
                                                   content: component["content"],
                                                   name: component["name"])
    end
  end

  def delete_existing_components(row)
    row["components"]["deleted"].each do |component|
      Component.find_by_id(component["id"]).destroy
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
