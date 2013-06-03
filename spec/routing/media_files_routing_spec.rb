require "spec_helper"

describe MediaFilesController do
  describe "routing" do

    it "routes to #index" do
      get("/media_files").should route_to("media_files#index")
    end

    it "routes to #new" do
      get("/media_files/new").should route_to("media_files#new")
    end

    it "routes to #show" do
      get("/media_files/1").should route_to("media_files#show", :id => "1")
    end

    it "routes to #edit" do
      get("/media_files/1/edit").should route_to("media_files#edit", :id => "1")
    end

    it "routes to #create" do
      post("/media_files").should route_to("media_files#create")
    end

    it "routes to #update" do
      put("/media_files/1").should route_to("media_files#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/media_files/1").should route_to("media_files#destroy", :id => "1")
    end

  end
end
