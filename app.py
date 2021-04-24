from flask import Flask, render_template, redirect, jsonify
import pymongo

# Create an instance of Flask
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.project2DB

# Route to render index.html template using data from Mongo
@app.route("/")
def welcome():

    return (
        f"Welcome to Tony's Project2 API<br/>"
        
    )
    
@app.route("/api/v1.0/expdata")
def expdata():
    expdata = tuple(db.exports.find())
    return jsonify(expdata)


@app.route("/api/v1.0/impdata")
def impdata():
    impdata = list(db.imports.find())
    return impdata

@app.route("/api/v1.0/top25expdata")
def top25expdata():
    top25expdata = list(db.top25exports.find())
    return top25expdata


@app.route("/api/v1.0/top25impdata")
def top25impdata():
    top25impdata = list(db.top25imports.find())
    return top25impdata

@app.route("/api/v1.0/completeexport")
def completeexport():
    completeexport = list(db.completeexports.find())
    return completeexport


@app.route("/api/v1.0/completeimport")
def completeimport():
    completeimport = list(db.completeimports.find())
    return completeimport

if __name__ == "__main__":
    app.run(debug=True)
