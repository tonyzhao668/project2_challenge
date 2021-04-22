from flask import Flask, render_template, redirect
# from flask_pymongo import PyMongo
import pymongo
# import scrape_mars
#from flask_table import Table, Col


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/project2DB")
# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.project2DB

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # deliver the data to index.html
    expdata = list(db.exports.find())
    impdata = list(db.imports.find())
    top25expdata = list(db.top25exports.find())
    top25impdata = list(db.top25imports.find())

    print(expdata)
        
    return render_template("index.html", expdata = expdata, impdata = impdata, top25expdata = top25expdata, top25impdata = top25impdata)
    # return render_template("index.html", expdata = expdata)

if __name__ == "__main__":
    app.run(debug=True)
