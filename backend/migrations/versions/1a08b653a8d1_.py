"""empty message

Revision ID: 1a08b653a8d1
Revises: 7dd571d1c7f5
Create Date: 2021-01-30 21:02:55.227537

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a08b653a8d1'
down_revision = '7dd571d1c7f5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('quantity', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('order', 'quantity')
    # ### end Alembic commands ###
