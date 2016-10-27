
class FileBuilder
  CDN_HASH = {
    css: {
      font: ['http://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
              'https://fonts.googleapis.com/icon?family=Material+Icons'],
      names: [ "css/bootstrap-material-design.min.css",
               "css/ripples.min.css"],
      links: ['<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">']
    },
    js: {
      names: ["js/material.min.js",
              "js/ripples.min.js"],
      links: [ '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>']
    },
    meta: ['<meta charset="utf-8">',
           '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
           '<meta name="viewport" content="width=device-width, initial-scale=1">']
  }


  #
  # <!-- Material Design fonts -->
  # <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
  # <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


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

    CDN_HASH[:js][:links].each do |script_tag|
      fbuilder.doc.root.add_child(script_tag)
    end

    CDN_HASH[:js][:names].each do |link|
      add_script_tag(link, fbuilder.doc.root)
    end

    fs_parent.add_child(fbuilder.doc.root)
  end

  def add_head(fs_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      head {
      }
    }

    CDN_HASH[:meta].each do |tag|
      fbuilder.doc.root.add_child(tag)
    end

    CDN_HASH[:css][:font].each do |link|
      add_link_tag(link, fbuilder.doc.root)
    end

    CDN_HASH[:css][:links].each do |link_tag|
      fbuilder.doc.root.add_child(link_tag)
    end

    CDN_HASH[:css][:names].each do |link|
      add_link_tag(link, fbuilder.doc.root)
    end

    fbuilder.doc.root.add_child('<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>')

    fs_parent.add_child(fbuilder.doc.root)
  end

  def add_link_tag(link, head_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
    }

    head_parent.add_child(fbuilder.doc.root)
  end

  def add_link_tag(link, head_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      link("href" => link,
           "rel" => "stylesheet",
           "type" => "text/css"){
      }
    }

    head_parent.add_child(fbuilder.doc.root)
  end

  def add_script_tag(link, head_parent)
    fbuilder = Nokogiri::HTML::Builder.new {
      script("src" => link, "type" => "text/javascript"){
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
      body_parent.add_child(fbuilder.doc.root)
    end
  end

  def build_nav_row(row, body_parent)
    nav_content = row.components.first

    fbuilder = Nokogiri::HTML::Builder.new {
      nav{
      }
    }
    fbuilder.doc.root.add_child(nav_content.content)
    body_parent.add_child(fbuilder.doc.root)

    if row.components.length > 1
      jbuilder = Nokogiri::HTML::Builder.new {
        div("class" => "container"){
        }
      }
      add_row(row.components[1..-1], jbuilder.doc.root)
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
