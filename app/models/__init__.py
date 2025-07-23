# If adding more models we need to import them here in the init file
from .db import db
from .user import User
from .post import Post
from .db import environment, SCHEMA
from .like import Like #added by TJ
from .post import Post #added by TJ
from .comment import Comment # added by Yaseen 

__all__ = ['db', 'User', 'Post', 'Like', 'Comment']#added by TJ
"""
__all__ accounts for what are called wildcard imports like if one of us uses:
 from app.models import * 
 it will import all of whatever we put in the dictionary for __all__ so  
 app.models import * 
is the same as 
from app.models.db import db
from app.models.user import User
from app.models.post import Post
from app.models.like import Like

it also makes sure that when alembic scans our files it automatically detects our models. 
"""