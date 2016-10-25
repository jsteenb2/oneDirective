class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def update_existing_components(row, selected_row)
    row["components"]["updated"].each do |component|
      _component = selected_row.components.find_by_id(component["id"])
      _component.update(order: component["order"],
                        content: component["content"],
                        name: component["name"],
                        row_id: selected_row["id"])
    end
  end

  def add_new_components(row, selected_row)
    row["components"]["created"].each do |component|
      _component = selected_row.components.create( order: component["order"],
                                                   content: component["content"],
                                                   name: component["name"])
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
