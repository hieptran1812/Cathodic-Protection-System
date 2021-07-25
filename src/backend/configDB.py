from flask_pymongo import pymongo
import urllib 

database_name = "CathodicDatabase"

client = pymongo.MongoClient("mongodb+srv://custom_db:hieptran1812@cluster0.eriug.mongodb.net/CathodicDatabase?retryWrites=true&w=majority")
db = client.get_database(database_name)


