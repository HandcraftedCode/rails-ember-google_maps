EmberRailsDevise::Application.routes.draw do
  resources :media_files


  resources :gigs


  devise_for :users, controllers: { sessions: 'sessions' }
  match '/users/:email' => "users#check_for"
  root to: 'home#index'
end
