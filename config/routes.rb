EmberRailsDevise::Application.routes.draw do


  resources :gigs


  devise_for :users, controllers: { sessions: 'sessions' }
  match '/users/:email' => "users#check_for"
  root to: 'home#index'
end
