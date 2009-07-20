class AddDefaultUser < ActiveRecord::Migration
  def self.up
    User.create(:email => "none", :count => 0)
  end

  def self.down
    # drop_table :users
  end
end

