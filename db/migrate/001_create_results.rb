class CreateResults < ActiveRecord::Migration
  def self.up
    create_table :results do |t|
      t.string :string, :null => false
      t.string :ham, :null => false
      t.string :hash, :null => false
      t.string :bin, :null => false
      t.datetime :timestamp
      t.string :ip
    end
  end

  def self.down
    drop_table :results
  end
end

