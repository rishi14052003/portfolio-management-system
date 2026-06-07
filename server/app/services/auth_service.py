from app.config import Config


class AuthService:
    @staticmethod
    def authenticate(username: str, password: str) -> bool:
        return (
            username == Config.ADMIN_USERNAME
            and password == Config.ADMIN_PASSWORD
        )

    @staticmethod
    def get_profile(username: str) -> dict:
        return {
            'username': username,
            'role': 'admin',
        }
