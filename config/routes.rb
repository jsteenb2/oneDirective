Rails.application.routes.draw do
  devise_for :users

  root 'static_pages#index'

  scope :api do
    scope :v1 do
      resources :projects
    end
  end
end
