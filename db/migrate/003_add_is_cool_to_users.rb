class AddIsCoolToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :is_cool, :string
  end

  def self.down
    remove_column :users, :is_cool, :string
  end
end

