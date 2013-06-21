class GigsController < ApplicationController
  # GET /gigs
  # GET /gigs.json
  def index
    @gigs = Gig.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gigs }
    end
  end

  # GET /gigs/1
  # GET /gigs/1.json
  def show
    @gig = Gig.find(params[:id])

    respond_to do |format|
      format.html {render json: @gig, status: :ok}
      format.json { render json: @gig, status: :ok }
    end
  end

  # GET /gigs/new
  # GET /gigs/new.json
  def new
    @gig = Gig.new()
    @gig.build_attachment
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @gig }
    end
  end

  # GET /gigs/1/edit
  def edit
    @gig = Gig.find(params[:id])
  end

  # POST /gigs
  # POST /gigs.json
  def create
    gig = Gig.new()
    respond_to do |format|
      if update_gig(gig)
        format.html { render json: gig, status: :created, location: gig }
        format.json { render json: gig, status: :created, location: gig }
      else
        format.html { render action: "new" }
        format.json { render json: gig.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /gigs/1
  # PUT /gigs/1.json
  def update
    @gig = Gig.find(params[:id])

    respond_to do |format|
      if update_gig(@gig)
        format.html { redirect_to @gig, notice: 'Gig was successfully updated.' }
        format.json { render json: @gig, status: :ok, location: @gig }
      else
        format.html { render action: "edit" }
        format.json { render json: @gig.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gigs/1
  # DELETE /gigs/1.json
  def destroy
    @gig = Gig.find(params[:id])
    @gig.destroy

    respond_to do |format|
      format.html { redirect_to gigs_url }
      format.json { render json: nil, status: :ok }
    end
  end
  

  
  private
  
  def permitted_params
   	params.require(:gig).permit(:cat1, :cat2, :email, :end, :external_url, :lat, :lng, :name, :notes, :pricehigher, :pricelower, :start, :ticket_url, :user_is_going, :user_id,
                                    attachments: [:id, :format, :src])
  end

  def update_gig(gig)
  	logger.debug "in update gig"
  	
    gig_params = permitted_params
    logger.debug "permitted_params: #{gig_params}" #!!!!!!!!!!!!!!!!!!!!problem
    attachments_param = gig_params.extract!(:attachments)
    attachments_param = attachments_param[:attachments]
    attachments_param ||= []

    # Because updates to the gig and its associations should be atomic,
    # wrap them in a transaction.
    Gig.transaction do
      # Update the gig's own attributes first.
      gig.attributes = gig_params
      gig.save!

      # Update the gig's attachments, creating/destroying as appropriate.
      specified_attachments = []
      attachments_param.each do |attachment_params|
        if attachment_params[:id]
          pn = gig.attachments.find(attachment_params[:id])
          pn.update_attributes(attachment_params)
        else
          pn = gig.attachments.create(attachment_params)
        end
        specified_attachments << pn
      end
      gig.attachments.each do |pn|
        pn.destroy unless specified_attachments.include?(pn)
      end
    end

    # Important! Reload the gig to ensure that changes to its associations
    # (i.e. attachments) will be serialized correctly.
    gig.reload

    return true
  rescue
    return false
  end
end
  