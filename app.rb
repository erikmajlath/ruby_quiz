# require rubygems and sinatra so you can run this application locally with ruby app.rb
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'

DB = Mongo::Connection.new.db("quest", :pool_size => 5, :timeout => 5)
#auth = DB.authenticate('admin', 'Kd3FPI7xjibl')


  get '/' do 
    @questions = DB.collection('quiz').find.to_a.map{|t| from_bson_id(t)}.to_json
    erb :index
  end

  get '/api/:thing' do
    DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
  end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end