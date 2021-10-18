#import packages
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms_sqlalchemy.fields import QuerySelectField

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///WorldWaste.sql"
app.config['SECRET_KEY'] = 'Ajg211'

db = SQLAlchemy(app)

class Choice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

def choice_query():
    return Choice.query

class ChoiceForm(FlaskForm):
    opts = QuerySelectField(query_factory=choice_query(), allow_blank=True)

@app.route('/')
def index():

    return render_template('index.html')

if __name__=='__main__':
    app.run(debug=True)