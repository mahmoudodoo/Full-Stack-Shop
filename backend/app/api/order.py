from flask import jsonify, request, abort,make_response
from app import db
from app import app
from app.models.Order import Order



@app.route('/order',methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    output = []
    for order in orders:
        order_data ={}
        order_data['id'] = order.id
        order_data['totalAmount'] = order.totalAmount
        order_data['user_id'] = order.user_id
        order_data['product_id'] = order.product_id
        output.append(order_data)
    return jsonify({'orders':output})

@app.route('/order/<order_id>',methods=['GET'])
def get_order(order_id):
    order = Order.query.filter_by(id=order_id).first()
    if not order:
        return jsonify({'message':'Order not Found!!!!'})
    order_data ={}
    order_data['id'] = order.id
    order_data['totalAmount'] = order.totalAmount
    order_data['user_id'] = order.user_id
    order_data['product_id'] = order.product_id
    return jsonify({'order':order_data})

@app.route('/order', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(totalAmount=data['totalAmount'],user_id=data['user_id'],product_id=data['product_id'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message':'Order has been added!!!'})

@app.route('/order/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.filter_by(id=order_id).first()
    if not order:
        return jsonify({'message':'Order not Found!!!!'})
    db.session.delete(order)
    db.session.commit()
    return jsonify({ 'message':'Order has Been Deleted !!!'})
