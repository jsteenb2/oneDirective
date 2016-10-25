json.project do |project|
  json.id @project.id
  json.title @project.title
  json.description @project.description
  json.rows @project.rows do |row|
    json.order row.order
    json.components row.components do |component|
      json.content component.content
      json.order component.order
    end
  end
end
