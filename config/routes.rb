Rails.application.routes.draw do
  devise_for :users

  root :to => 'static_pages#index'

  scope :api do
    scope :v1 do
      resources :projects
      resources :rows
      resources :components
      get 'projects/:id/publish' => 'projects#publish'
    end
  end
end
