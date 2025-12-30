from rest_framework.test import APITestCase

from django.urls import reverse
from rest_framework import status
from .models import User

class AuthTests(APITestCase):
    
    def test_user_signup(self):
        response = self.client.post(
            "/api/signup/",
            {
                "email": "user@test.com",
                "full_name": "Test User",
                "password": "Test@123"
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            User.objects.filter(email="user@test.com").exists()
        )
        
        
    def test_deactivated_user_cannot_login(self):
        user = User.objects.create_user(
            email = "blocked@test.com",
            password = "Test@123",
            is_active = False
        )
        
        response = self.client.post(
            "/api/login/",
            {
                "email": "blocked@test.com",
                "password": "Test@123"
            }
        )
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_user_cannot_access_admin_users(self):
         user = User.objects.create_user(
                email="user2@test.com",
                password="Test@123"
            )

         login = self.client.post(
                "/api/login/",
                {
                    "email": "user2@test.com",
                    "password": "Test@123"
                }
            )

         token = login.data["access"]
         self.client.credentials(
                HTTP_AUTHORIZATION=f"Bearer {token}"
            )

         response = self.client.get("/api/admin/users/")
         self.assertEqual(response.status_code, status. HTTP_403_FORBIDDEN)


    def test_admin_can_access_admin_users(self):
        admin = User.objects.create_superuser(
            email="admin@test.com",
            password="Admin@123"
        )

        login = self.client.post(
            "/api/login/",
            {
                "email": "admin@test.com",
                "password": "Admin@123"
            }
        )

        token = login.data["access"]
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token}"
        )

        response = self.client.get("/api/admin/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)



    def test_change_password(self):
        user = User.objects.create_user(
            email="changepass@test.com",
            password="OldPass@123"
        )

        login = self.client.post(
            "/api/login/",
            {
                "email": "changepass@test.com",
                "password": "OldPass@123"
            }
        )

        token = login.data["access"]
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token}"
        )

        response = self.client.put(
            "/api/change-password/",
            {
                "old_password": "OldPass@123",
                "new_password": "NewPass@123"
            }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
