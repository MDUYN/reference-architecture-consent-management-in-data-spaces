from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from app.extensions import db
from app.configuration.constants import \
    MAX_LENGTH_FIRST_NAME, MAX_LENGTH_LAST_NAME


class UserProfile(db.Model):
    """
    Class UserProfile: database model for the profile of a User.

    Attributes:
    A UserProfile instance consists out of the following attributes:

    - id: integer.
    - first_name: first name of an user
    - last_name: last name of an user
    - user_id: reference to the User instance id
    - user: reference to the User instance

    Relations:
    UserProfile deletes itself as a reaction on the cascade relation
    set by its User instance.
    """

    table_name = 'user_profiles'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(MAX_LENGTH_FIRST_NAME))
    last_name = Column(String(MAX_LENGTH_LAST_NAME))
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="profile")

    def __repr__(self):
        return self._repr(id=self.id)
