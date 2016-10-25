Rails.application.routes.draw do
  devise_for :users

  root 'static_pages#index', as: :authenticated

  get 'home' => 'static_pages#new'

  scope :api do
    scope :v1 do
      resources :projects
      resources :rows
      resources :components
    end
  end
end
