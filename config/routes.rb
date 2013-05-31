EmberRailsDevise::Application.routes.draw do
  resources :gigs


  devise_for :users, controllers: { sessions: 'sessions' }

  root to: 'home#index'
end
