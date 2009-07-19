class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :email, :null => false
      t.integer :count
      t.datetime :created_at
      t.datetime :updated_at
    end
  end

  def self.down
    drop_table :users
  end
end

