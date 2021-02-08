from app import db
from app import app
from flask import render_template,flash, redirect
from app.api.user import token_required


@app.route('/admin', methods=['GET', 'POST'])
def admin():
    return render_template('admin.html')
