from .db import db
from sqlalchemy import DateTime, func

class TimeStampMixin(object):
    __abstract__ = True

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
