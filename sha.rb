require 'rubygems'
require 'sinatra'
require 'init'
require 'haml'
require 'active_support'

get '/' do 
  haml :index
end

get '/process' do
  haml :process, :layout => :layout_process
end

post '/process' do
  request = ActiveSupport::JSON.decode(params[:request])
  p request[:ham]
end

post '/signup' do
  user = User.new(params)
  unless user.save()
    user.errors
  end
end