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
  request = params[:request]
  result = Result.new( :ham => request[:ham], :string => request[:string], :sha => request[:hash], :bin => request[:bin], :timestamp => Time.now, :email => request[:email] )
  result.save
  
  # user = User.find_by_email(request[:email])
  # user.count = user.count + request[:count].to_i
  # user.save
  
end

post '/signup' do
  user = User.new(params)
  user.count = 0
  unless user.save()
    user.errors
  end
end

post '/user' do
  user = User.find_by_email(params[:email])
  user.count = user.count + params[:count].to_i
  user.save
end