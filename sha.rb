require 'rubygems'
require 'sinatra'
require 'init'
require 'haml'
require 'active_support'

helpers do
  def number_with_delimiter(number, delimiter=",")
    number.to_s.gsub(/(\d)(?=(\d\d\d)+(?!\d))/, "\\1#{delimiter}")
  end  
end

get '/' do
  @count = User.sum('count')
  @lowest_ham = Result.minimum("ham")
  haml :index
end

get '/process' do
  haml :process, :layout => :layout_process
end

post '/process' do
  request = params[:request]
  result = Result.new( :ham => request[:ham], :string => request[:string], :sha => request[:hash], :bin => request[:bin], :timestamp => Time.now, :email => request[:email] )
  result.save
end

post '/signup' do
  user = User.new(params)
  user.count = 0
  unless user.save()
    user.errors
  end
end

post '/user' do
  if User.exists?(:email => params[:email])
    user = User.find_by_email(params[:email])
  else
    user = User.find_by_email("none")
  end
  user.count = user.count + params[:count].to_i
  user.save
end