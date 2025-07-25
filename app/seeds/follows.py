from app.models import db, Follow, User
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
    db.session.execute(text("DELETE FROM FOLLOWS"))
    db.session.commit()
