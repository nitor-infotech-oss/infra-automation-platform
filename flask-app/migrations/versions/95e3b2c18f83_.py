"""empty message

Revision ID: 95e3b2c18f83
Revises: 26605908af4d
Create Date: 2020-07-28 23:15:33.482326

"""

# revision identifiers, used by Alembic.
revision = '95e3b2c18f83'
down_revision = '26605908af4d'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ticket',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_id', sa.String(length=255), nullable=True),
    sa.Column('envoiroment', sa.String(length=255), nullable=True),
    sa.Column('os', sa.String(length=255), nullable=True),
    sa.Column('platform', sa.String(length=255), nullable=True),
    sa.Column('instance_type', sa.String(length=255), nullable=True),
    sa.Column('region', sa.String(length=255), nullable=True),
    sa.Column('instance_name', sa.String(length=255), nullable=True),
    sa.Column('machine_username', sa.String(length=255), nullable=True),
    sa.Column('ram_size', sa.String(length=255), nullable=True),
    sa.Column('storage_size', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('ticket_id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ticket')
    ### end Alembic commands ###