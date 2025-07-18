from app.models import db, User, Post, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(user_id=1, post_id=2, comment_body="My very first comment!"),
        Comment(user_id=2, post_id=3, comment_body="I am user 2 commenting on post id 3"),
        Comment(user_id=3, post_id=1, comment_body="I am user 3 commenting on post id 1")
    ]

    for comment in comments: 
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    def undo_users():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()

