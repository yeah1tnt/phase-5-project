"""reset

Revision ID: 98fd610a4f5b
Revises: 
Create Date: 2023-10-07 12:37:28.103493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '98fd610a4f5b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dungeons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('job', sa.String(), nullable=False),
    sa.Column('exp', sa.Integer(), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('str', sa.Integer(), nullable=False),
    sa.Column('agi', sa.Integer(), nullable=False),
    sa.Column('vit', sa.Integer(), nullable=False),
    sa.Column('int', sa.Integer(), nullable=False),
    sa.Column('dex', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_characters_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('monsters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('exp', sa.Integer(), nullable=False),
    sa.Column('hp', sa.Integer(), nullable=False),
    sa.Column('atk', sa.Integer(), nullable=False),
    sa.Column('red', sa.Integer(), nullable=False),
    sa.Column('dungeon_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['dungeon_id'], ['dungeons.id'], name=op.f('fk_monsters_dungeon_id_dungeons')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('character_id', sa.Integer(), nullable=True),
    sa.Column('hp', sa.Integer(), nullable=False),
    sa.Column('atk', sa.Integer(), nullable=False),
    sa.Column('red', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['character_id'], ['characters.id'], name=op.f('fk_games_character_id_characters')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    op.drop_table('monsters')
    op.drop_table('characters')
    op.drop_table('users')
    op.drop_table('dungeons')
    # ### end Alembic commands ###