
class FileBuilder
  CDN_HASH = {
    css: {
      names: ['//fonts.googleapis.com/css?family=Roboto:300,400,500,700"',
        '//fonts.googleapis.com/icon?family=Material+Icons',
        'bootstrap.min.css',
        "bootstrap-material-design.min.css",
        "ripples.min.css"]
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
    @rows = @project.rows
    @builder = Nokogiri::HTML::Builder.new {
      html('language' => 'en'){
        @fs_parent = parent;
      }

      def fs_parent
        return @fs_parent;
      end
    }
    build_html
    build_html_file
  end

  def build_html
    add_head(@builder.fs_parent)
    add_body(@builder.fs_parent)
  end

  def builder
    return @builder
  end

  def add_body(fs_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      body {
      }
    }

    @rows.each do |row|
      add_row_with_components(row, fbuilder.doc.root)
    end

    fs_parent.add_child(fbuilder.doc.root)
  end

  def add_head(fs_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      head {
      }
    }
    print "pre: #{fbuilder.doc}\n"

    CDN_HASH[:css][:names].each do |link|
      add_link_tags(link, fbuilder.doc.root)
    end

    CDN_HASH[:js][:names].each do |link|
      add_script_tags(link, fbuilder.doc.root)
    end

    print "after head: #{fbuilder.doc}\n"

    fs_parent.add_child(fbuilder.doc.root)
    print "post: #{fbuilder.doc}\n"
  end

  def add_link_tags(link, head_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      link("href" => "css/#{link}", "ref" => "stylesheet"){
      }
    }

    head_parent.add_child(fbuilder.doc.root)
  end

  def add_script_tags(link, head_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      script("src" => "js/#{link}"){
      }
    }

    head_parent.add_child(fbuilder.doc.root)
  end

  def add_row_with_components(row, body_parent)
    if row.components.first[:component_type] == "nav"
      build_nav_row(row, body_parent)
    else
      fbuilder = Nokogiri::HTML::Builder.new {
        div("class" => "container"){
        }
      }
      add_row(row.components, fbuilder.doc.root)
      print "#{fbuilder.doc}\n"
      body_parent.add_child(fbuilder.doc.root)
    end
  end

  def build_nav_row(row, body_parent)
    nav_content = row.components.shift
    body_parent.add_child(nav_content[:content])

    if row.components.length > 0
      jbuilder = Nokogiri::HTML::Builder.new {
        div("class" => "container"){
        }
      }
      add_row(row.components, jbuilder.doc.root)
      body_parent.add_child(jbuilder.doc.root)
    end
  end

  def add_row(components, container_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      div("class" => "row"){
      }
    }
    components.each do |component|
      fbuilder.doc.root.add_child(component[:content])
    end
    container_parent.add_child(fbuilder.doc.root)
  end

  def build_html_file
    html = @builder.to_html
    File.open('public/repo/index.html', "w") do |file|
      file.write html
    end
  end
end
