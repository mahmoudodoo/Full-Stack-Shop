from app import db
from datetime import datetime



class Order(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    totalAmount = db.Column(db.Float)
    date = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.String(50), db.ForeignKey('user.id'))
    
    #quantity =db.Column(db.Integer)
