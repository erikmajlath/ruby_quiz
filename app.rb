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

  get '/quiz' do
    DB.collection('quiz').find.to_a.map{|t| from_bson_id(t)}.to_json
  end

  get '/quiz/:id' do
    from_bson_id(DB.collection('quiz').find_one(to_bson_id(params[:id]))).to_json
  end

  post '/quiz' do
    oid = DB.collection('quiz').insert(JSON.parse(request.body.read.to_s))
    "{\"_id\": \"#{oid.to_s}\"}"
  end

  delete '/quiz/:id' do
    DB.collection('quiz').remove('_id' => to_bson_id(params[:id]))
  end

  put '/quiz/:id' do
    DB.collection('quiz').update({'_id' => to_bson_id(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == '_id'}})
  end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end