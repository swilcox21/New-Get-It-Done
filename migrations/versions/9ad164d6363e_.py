"""empty message

Revision ID: 9ad164d6363e
Revises: 778c226aa6d6
Create Date: 2021-03-05 15:52:10.851474

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ad164d6363e'
down_revision = '778c226aa6d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('task', 'completed',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    op.alter_column('task', 'date',
               existing_type=sa.DATE(),
               nullable=True)
    op.alter_column('task', 'priority',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('task', 'priority',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('task', 'date',
               existing_type=sa.DATE(),
               nullable=False)
    op.alter_column('task', 'completed',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###