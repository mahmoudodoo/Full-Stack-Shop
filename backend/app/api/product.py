from flask import jsonify, request, abort,make_response
from app import db
from app import app
from app.models.Product import Product


@app.route('/product',methods=['GET'])
def get_all_products():
    products = Product.query.all()
    if not products:
        return jsonify({'message':'No Products !!!'})
    output = []
    for product in products:
        product_data ={}
        product_data['id'] = product.id
        product_data['title'] = product.title
        product_data['imageUrl'] = product.imageUrl
        product_data['description'] = product.description
        product_data['price'] = product.price
        output.append(product_data)
    return jsonify({'products':output})

@app.route('/product/<product_id>',methods=['GET'])
def get_product(product_id):

    product = Product.query.filter_by(id=product_id).first()
    if not product:
        return jsonify({'message':'Product not Found!!!!'})

    product_data ={}
    product_data['id'] = product.id
    product_data['title'] = product.title
    product_data['imageUrl'] = product.imageUrl
    product_data['description'] = product.description
    product_data['price'] = product.price
    return jsonify({'product':product_data})

@app.route('/product',methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(title=data['title'],imageUrl=data['imageUrl'],description=data['description'],price=data['price'])
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message':'The product has been added !!'})

@app.route('/product/<product_id>',methods=['DELETE'])
def delete_product(product_id):
    product = product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({'message':'Product not Found!!!!'})
    db.session.delete(product)
    db.session.commit()
    return jsonify({ 'message':'Product has been deleted !!!'})

@app.route('/product/<product_id>',methods=['PUT'])
def edit_product(product_id):
    data = request.get_json()
    product = product.query.filter_by(product_id=product_id).first()
    if not product:
        return jsonify({'message':'Product not Found!!!!'})
    product.title=data['title']
    product.imageUrl=data['imageUrl']
    product.description=data['description']
    product.price=data['price']
    return jsonify({'message':'The product has been Updated !!'})
