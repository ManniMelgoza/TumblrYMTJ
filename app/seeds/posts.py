from app.models import db, User, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    posts = [
        # TODO We need to have a number amount of seeding files per features
        Post(owner_id = 1, post_title = "JS for WebDev", post_body = "JS ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753140615/CodeScreen_jadbvq.jpg"),

        Post(owner_id = 2, post_title = "React for WebDev", post_body = "REACT ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141376/SecurityCyber_bbnpwg.jpg"),

        Post(owner_id = 3, post_title = "Node.js for WebDev", post_body = "NODE.JS ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum tristique dolor. Vestibulum dui sapien, volutpat vel rutrum vel, posuere id diam.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141379/DesktopSetUp_axalue.jpg"),

        Post(owner_id = 4, post_title = "CSS Tricks", post_body = "CSS ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec luctus lorem. Nullam vehicula tortor in sem cursus dapibus.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141366/SecurityLogo_o2j3wv.jpg"),

        Post(owner_id = 5, post_title = "Python for Beginners", post_body = "PYTHON ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor quam at nulla tristique, nec feugiat quam pretium.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141874/Motherboard_gwzxxo.jpg"),

        Post(owner_id = 6, post_title = "Fullstack Dev Journey", post_body = "FULLSTACK ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia, eros non blandit cursus, libero est congue sem.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141874/CodingatDesk_aevasy.jpg"),

        Post(owner_id = 7, post_title = "APIs 101", post_body = "API ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in ante at elit luctus faucibus nec eu metus.", post_img_url = ""),

        Post(owner_id = 8, post_title = "Frontend vs Backend", post_body = "FRONTEND vs BACKEND ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu lorem eu ipsum sollicitudin bibendum.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141874/PairPrograming_autanx.jpg"),

        Post(owner_id = 9, post_title = "Django Crash Course", post_body = "DJANGO ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis turpis a sapien viverra fermentum.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753141874/Motherboard_gwzxxo.jpg"),

        Post(owner_id = 10, post_title = "Intro to Web Security", post_body = "SECURITY ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et nisi ut magna ullamcorper accumsan.", post_img_url = "")

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
