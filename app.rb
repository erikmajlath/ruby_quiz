# require rubygems and sinatra so you can run this application locally with ruby app.rb
require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'

DB = Mongo::Connection.new.db("quest", :pool_size => 5, :timeout => 5)
#auth = DB.authenticate('admin', 'Kd3FPI7xjibl')


  get '/' do 
    DB.collection(params[:thing]).find.to_a.map{|t| from_bson_id(t)}.to_json
    erb :index
  end

  get '/api/:thing' do
    DB.collection(params[:thing]).find.to_a.to_json
  end

  get '/quiz' do
    JSON.parse(File.read(DATA_FILE)).to_json
  end

  get '/reformat' do
    response = JSON.parse(File.read(DATA_FILE))

    File.open(DATA_FILE, 'w'){|f| f.write(response.to_json)}
  end

  post '/quiz' do
    data = JSON.parse(File.read(DATA_FILE))

    nextId = data.map{ |item|
      item[:id]
    }.max.next

  end

def to_bson_id(id) BSON::ObjectId.from_string(id) end
def from_bson_id(obj) obj.merge({'_id' => obj['_id'].to_s}) end