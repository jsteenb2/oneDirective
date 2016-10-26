class StaticPagesController < ApplicationController
  def index
    if (current_user)
      render(action: 'index')
    else
      render(action: 'new')
    end
  end
end
