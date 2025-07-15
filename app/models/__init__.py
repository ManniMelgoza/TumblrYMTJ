# If adding more models we need to import them here in the init file
from .db import db
from .user import User
from .post import Post
from .db import environment, SCHEMA
from .like import Like #added by TJ
from .post import Post #added by TJ

__all__ = ['db', 'User', 'Post', 'Like']#added by TJ