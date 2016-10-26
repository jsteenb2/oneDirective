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
    @project = Project.find_by_id(project_id)
  end

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
          doc.div["class"] = "container"
        }
      }

    end
end
