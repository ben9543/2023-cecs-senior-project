from flask import Flask
from auth.auth import app as auth_app


if __name__ == '__main__':
    auth_app.run()
