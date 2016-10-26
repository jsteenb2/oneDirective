require 'Nokogiri'

class FileBuilder
  CDN_HASH = {
    css: {
      names: ['//fonts.googleapis.com/css?family=Roboto:300,400,500,700"',
        '//fonts.googleapis.com/icon?family=Material+Icons',
        'bootstrap.min.css',
        "bootstrap-material-design.min.css",
        "ripples.min.css"],
      rel: "stylsheet"
    },
    js: {
      names: ["jquery-1.12.4.min.js",
              "bootstrap.min.js",
              "material.min.js",
              "ripples.min.js"]
    }
  }

  def initialize(project_id)
    @project = Project.includes(rows: :components).find_by_id(project_id)
    build_html
    build_html_file
  end

  def build_html
    build_shell
  end

  def build_shell
    @builder = Nokogiri::HTML::Builder.new(:encoding => 'UTF-8') do |doc|
      doc.html{
        doc.head{
          CDN_HASH[:css][:names].each do |link|
            doc.link["href"] = "css/#{link}"
          end
          CDN_HASH[:js][:names].each do |link|
            doc.script["src"] = "js/#{link}"
          end
        }
        doc.body {
          @project.rows.each do |row|
            if row.components.pluck(:type).include?('nav')
              row.components.each do |component|
                if(component.type == "nav")
                  doc.nav(component.content)
                end
              end
            end
            doc.div["class"] = "container" {
              doc.div("class", "row") {
                row.components.each do |component|
                    unless (component.type == "nav")
                      doc.div(component.content)
                    end
                end
              }
            }
          end
        }
      }
    end
  end


  def build_html_file
    html = @builder.to_html
    File.open('public/repo/index.html', "w") do |file|
      file.write html
    end
  end
end
