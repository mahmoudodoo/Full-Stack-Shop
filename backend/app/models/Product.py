from app import db


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    imageUrl = db.Column(db.String(200))
    description =db.Column(db.String(150))
    price = db.Column(db.Float)
    orders = db.relationship("Order", backref="product")
