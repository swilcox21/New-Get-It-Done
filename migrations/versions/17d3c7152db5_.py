"""empty message

Revision ID: 17d3c7152db5
Revises: e587647addeb
Create Date: 2021-04-22 21:53:36.602117

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17d3c7152db5'
down_revision = 'e587647addeb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_first_name_key', 'user', type_='unique')
    op.drop_constraint('user_last_name_key', 'user', type_='unique')
    op.drop_constraint('user_time_zone_key', 'user', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('user_time_zone_key', 'user', ['time_zone'])
    op.create_unique_constraint('user_last_name_key', 'user', ['last_name'])
    op.create_unique_constraint('user_first_name_key', 'user', ['first_name'])
    # ### end Alembic commands ###