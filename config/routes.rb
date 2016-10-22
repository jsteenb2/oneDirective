Rails.application.routes.draw do
  get 'projects/index'

  devise_for :users

  root 'static_pages#index'

  scope :api do
    scope :v1 do
      :projects
    end
  end
end
