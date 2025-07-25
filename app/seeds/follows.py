from app.models import db, Follow, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follow():
    follows = [
        Follow(follower_id=1, following_id=2), # Demo should be following Marnie
        Follow(follower_id=2, following_id=3), # Marnie should be following Bobbie
        Follow(follower_id=3, following_id=1) # Bobby should be following demo
    ]

    for follow in follows:
        db.session.add(follow)

    db.session.commit()

def undo_follow():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
