Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :task, only: [:index, :show, :create, :destroy, :update]
    end
  end
end
