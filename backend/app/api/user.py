from flask import jsonify, request, abort,make_response
from app import db
from app import app
from app.models.User import User
import uuid
from werkzeug.security import generate_password_hash,check_password_hash
import jwt
import datetime
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token= None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message':'Token is missing!'}), 401

        try:
            data =jwt.decode(token,app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!!!'}), 401

        return f(current_user,*args,**kwargs)
    return decorated

@app.route('/users', methods=['GET'])
@token_required
def get_all_users(current_user):
    users= User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] =user.public_id
        user_data['name']= user.name
        user_data['password']= user.password
        user_data['admin']= user.admin
        output.append(user_data)

    return jsonify({'users':output})

@app.route('/users/<public_id>',methods=['GET'])
@token_required
def get_one_user(current_user,public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message':'User not Found!!!!'})
    user_data = {}
    user_data['public_id'] =user.public_id
    user_data['name']= user.name
    user_data['password']= user.password
    user_data['admin']= user.admin
    return jsonify({'user':user_data})

@app.route('/users',methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'],method='sha256')
    new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password,admin=data['admin'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message' :'New User has been created!'})

@app.route('/users/<public_id>',methods=['PUT'])
@token_required
def update_user(current_user,public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message':'User not Found!!!!'})
    user.admin =True
    db.session.commit()
    return jsonify({'message':'The User has been Updated!!!'})

@app.route('/users/<public_id>',methods=['DELETE'])
@token_required
def delete_user(current_user,public_id):
    user = User.query.filter_by(public_id=public_id).first()
    userName = user.name
    userId = user.public_id
    if not user:
        return jsonify({'message':'User not Found!!!!'})
    db.session.delete(user)
    db.session.commit()
    return jsonify({
            'message': 'This user {0} has been deleted!! ID: {1}'.format(str(userName),str(userId))
                })


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify ',401,{'WWW-Authenticate':'Basic realm="Login requierd!"'})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Could not verify ',401,{'WWW-Authenticate':'Basic realm="Login requierd!"'})

    if check_password_hash(user.password,auth.password):
        token = jwt.encode({'public_id':user.public_id,'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token':token.decode('UTF-8'),'user_id':user.id,'isAdmin':user.admin})

    return make_response('Could not verify ',401,{'WWW-Authenticate':'Basic realm="Login requierd!"'})
