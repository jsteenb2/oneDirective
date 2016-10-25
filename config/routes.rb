Rails.application.routes.draw do
  devise_for :users

  authenticated do
    root 'static_pages#index', as: :authenticated
  end

  # root :to => 'home#static_page'
  root to: 'static_pages#new'
  get 'home' => 'static_pages#new'

  scope :api do
    scope :v1 do
      resources :projects
      resources :rows
      resources :components
    end
  end
end
