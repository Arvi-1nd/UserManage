from django.urls import path
from .views import (
    SignupView,
    LoginView,
    meView,
    AdminUserListView,
    AdminActivateUserView,
    AdminDeactivateUserView,
    ChangePasswordView,
    UpdateProfileView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", SignupView.as_view()),
    path("login/", LoginView.as_view()),        
    path("token/refresh/", TokenRefreshView.as_view()),
    path("me/", meView.as_view()),
    path("admin/users/", AdminUserListView.as_view()),
    path("admin/users/<int:user_id>/deactivate/", AdminDeactivateUserView.as_view()),
    path("admin/users/<int:user_id>/activate/", AdminActivateUserView.as_view()),
    path("change-password/", ChangePasswordView.as_view()),
    path("profile/", UpdateProfileView.as_view()),
]
