from app.models import db, User, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    posts = [
        # TODO We need to have a number amount of seeding files per features
            Post(owner_id = 1, post_title = "V for Vendetta", post_body = "“Voilà! In view, a humble vaudevillian veteran cast vicariously as both victim and villain by the vicissitudes of Fate... you may call me “V”.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603931/VforVandera_tw96ef.png"),

            Post(owner_id = 2, post_title = "Batman Begins", post_body = "You become something entirely different… legend", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603932/BatmanBegins_m6wcmb.png"),

            Post(owner_id = 3, post_title = "The Dark Knight", post_body = "Madness, as you know, is like gravity. All it takes is a little push!", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603931/TheDarkKnight_dgpw80.png"),

            Post(owner_id = 1, post_title = "Dune (2021)", post_body = "The mystery of life isn't a problem to solve, but a reality to experience.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603939/Dune_dhiiac.png"),

            Post(owner_id = 2, post_title = "Jumanji (1995)", post_body = "I've seen things you've only seen in your nightmares…", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603933/Jumanji_y67jmh.png"),

            Post(owner_id = 3, post_title = "The Last Samurai", post_body = "What does it mean to be Samurai? To devote yourself utterly to a set of moral principles…", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603935/TheLastSamurai_caf1ju.png"),

            Post(owner_id = 1, post_title = "Interstellar", post_body = "Love is the one thing that transcends time and space.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603937/Interstellar_riapnk.png"),

            Post(owner_id = 2, post_title = "Inception", post_body = "An idea is like a virus, resilient, highly contagious…", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603936/Inception_netltv.png"),

            Post(owner_id = 3, post_title = "The Matrix", post_body = "You take the blue pill… You stay in Wonderland…", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603938/Matrix_eisgdf.png"),

            Post(owner_id = 1, post_title = "Starship Troopers", post_body = "Come on you apes, do you wanna live forever?", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603934/StarshipTroopers_ztsazp.png"),

            Post(owner_id = 2, post_title = "Idiocracy", post_body = "Welcome to Costco, I love you.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603936/Idiocracy_ugz97x.png"),

            Post(owner_id = 3, post_title = "Monty Python & the Holy Grail", post_body = "So if she weighs as much as a duck… she’s a witch!", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603946/MontyPython_ytkezl.png"),

            Post(owner_id = 1, post_title = "The Lord of the Rings: Fellowship of the Ring", post_body = "One Ring to rule them all, One Ring to find them…", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603944/LordoftheRingsFellowship_aetrp0.png"),

            Post(owner_id = 2, post_title = "Zombieland", post_body = "Rule #32 is 'Enjoy the Little Things'", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603941/Zombieland_dpzlvq.png"),

            Post(owner_id = 3, post_title = "Twister", post_body = "Cow. Another cow. I think that was the same cow.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603941/Twister_lv0lfg.png"),

            Post(owner_id = 1, post_title = "Furiosa", post_body = "Do you have it in you to make it epic?", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603941/Twister_lv0lfg.png"),

            Post(owner_id = 2, post_title = "Kingdom of Heaven", post_body = "What man is a man who does not make the world better?", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603942/KingdomofHeaven_qu0mzt.png"),

            Post(owner_id = 3, post_title = "Back to the Future", post_body = "If you put your mind to it, you can accomplish anything.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603943/BacktotheFuture_aqqrsa.png"),

            Post(owner_id = 1, post_title = "Bruce Lee", post_body = "A goal is not always meant to be reached; it often serves simply as something to aim at.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603940/Bruce_Lee_bhe9ft.png"),

            Post(owner_id = 2, post_title = "The Exorcist", post_body = "Avoid conversations with the demon… He is a liar… do not listen.", post_img_url = "https://res.cloudinary.com/dnfeiduuu/image/upload/v1753603930/The_Excorcist_ca4zzy.png")

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
