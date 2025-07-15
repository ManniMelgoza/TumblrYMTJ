from app.models import db, User, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    posts = [
        Post(owner_id = 1, post_title = "JS for webdev", post_body = "JS ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = "https://example.com/somepage"),
        Post(owner_id = 2, post_title = "React for webdev", post_body = "REACT ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = ""),
        Post(owner_id = 3, post_title = "Node.Js for webdev", post_body = "Node.JS ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = "https://example.com/somepage")
        ]

    for post in posts:
        db.session.add(post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
