"""removed hp,atk,def

Revision ID: f0d9a4d75cfe
Revises: 0dade89d97ee
Create Date: 2023-10-02 14:25:50.503231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0d9a4d75cfe'
down_revision = '0dade89d97ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.Column('hp', sa.Integer(), nullable=False),
    sa.Column('atk', sa.Integer(), nullable=False),
    sa.Column('def_', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], name=op.f('fk_games_character_id_characters')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    # ### end Alembic commands ###