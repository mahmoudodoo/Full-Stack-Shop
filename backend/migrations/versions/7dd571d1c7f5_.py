"""empty message

Revision ID: 7dd571d1c7f5
Revises: 258adad8ba12
Create Date: 2021-01-26 15:26:11.130141

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7dd571d1c7f5'
down_revision = '258adad8ba12'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'order', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'order', type_='foreignkey')
    # ### end Alembic commands ###
