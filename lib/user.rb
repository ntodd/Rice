class User < ActiveRecord::Base
  validates_presence_of :email, :message => "can't be blank"
  validates_uniqueness_of :email
end