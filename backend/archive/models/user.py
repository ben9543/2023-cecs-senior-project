# from flask_login import UserMixin

users = [
    {
        "id": 1,
        "password": "password",
        "email": "john@example.com",
    },
    {
        "id": 2,
        "password": "password",
        "email": "jane@example.com",
    },
]

class User():
    def __init__(self, id, email, password):
        self.id = id
        self.password = password
        self.email = email

    @classmethod
    def find_by_email(cls, email: str):
        for user in users:
            if user["email"] == email:
                return User(**user)

    @classmethod
    def find_by_id(cls, id: int):
        for user in users:
            if user["id"] == id:
                return User(**user)
