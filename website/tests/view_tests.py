from django.test import Client
from django.urls import reverse


def test_index():
    client = Client()
    url = reverse('index')
    response = client.get(url)
    assert response.status_code == 200
