from app.models import db, Follow
from sqlalchemy.sql import text

def seed_following():
    like1 = Like(user_id=1, post_id=1)
    like2 = Like(user_id=2, post_id=1)
    like3 = Like(user_id=1, post_id=2)

    db.session.add_all([like1, like2, like3])
    db.session.commit()


def undo_likes():
    db.session.execute(text("DELETE FROM likes"))
    db.session.commit()
