json.project do |project|
  json.id @project.id
  json.title @project.title
  json.description @project.description
  json.rows @project.rows.order(order: :asc) do |row|
    json.id row.id
    json.order row.order
    json.components row.components.order(order: :asc) do |component|
      json.id component.id
      json.name component.name
      json.content component.content
      json.order component.order
      json.rowId row.id
    end
  end
end
