class RenameMediaFilesToAttachments < ActiveRecord::Migration
  def change
  		rename_table :media_files, :attachments
  end
end
