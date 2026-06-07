import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_health_check(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'


def test_contact_validation(client):
    response = client.post('/api/contact', json={
        'full_name': 'ab',
        'phone': '123',
        'email': 'invalid',
        'introduction': 'short',
    })
    assert response.status_code == 400


def test_admin_login_invalid(client):
    response = client.post('/api/admin/login', json={
        'username': 'wrong',
        'password': 'wrongpass',
    })
    assert response.status_code == 401


def test_admin_login_valid(client):
    response = client.post('/api/admin/login', json={
        'username': 'admin',
        'password': 'admin123',
    })
    assert response.status_code == 200
    data = response.get_json()
    assert 'access_token' in data
