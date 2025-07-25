# Order matters as to what data needs to feed out of one another. Post would be first since that will feed to the rest of the items
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments # added by Yaseen 
from .likes import seed_likes, undo_likes
from .follows import seed_follow, undo_follow
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
# prefix command with seed in the command line
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_comments() # added by Yaseen 
        undo_likes() # added by Mani 
        undo_follow() # added by Jacob 
    seed_users()
    seed_posts()
    seed_comments() # added by Yaseen 
    seed_likes()
    seed_follow() # Jacob 
    # Add other seed functions here
    # We would had seed_post() here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments() # added by Yaseen
    undo_likes()
    undo_follow() # Jacob 
    # Add other undo functions here
    # We would had undo_post() here
