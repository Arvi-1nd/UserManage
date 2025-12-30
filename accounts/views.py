from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer,UserProfileSerializer, ChangePasswordSerializer, UpdateProfileSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminRole
from .models import User
from rest_framework.pagination import PageNumberPagination
from .pagination import AdminUserPagination

class SignupView(APIView):
    permission_classes = []
    
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {"message": "User created",
             "user":{
                 "id": user.id,
                 "email": user.email,
                 "full_name": user.full_name,
                 "role": user.role,
                 },
             "tokens":{
                 "refresh": str(refresh),
                 "access": str(refresh.access_token),
                 }
             },
            status=status.HTTP_201_CREATED
            )
    
class meView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
    
class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    
    def get(self, request):
        users = User.objects.all().order_by("-created_at")
        
        paginator = AdminUserPagination()
        paginated_users = paginator.paginate_queryset(users, request)
        serializer = UserProfileSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(serializer.data)
    

class AdminDeactivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    
    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
        user.is_active = False
        user.save()
        
        return Response(
            {"message": "User deactivated successfully"},
            status=status.HTTP_200_OK
        )
    
class AdminActivateUserView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    
    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
        user.is_active = True
        user.save()
        
        return Response(
            {"message": "User activated successfully"},
            status=status.HTTP_200_OK
        )
        

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        serializer = ChangePasswordSerializer(
            data = request.data,
            context = {"request": request}
        )
        serializer.is_valid(raise_exception=True)
        
        
        request.user.set_password(
            serializer.validated_data["new_password"]
        )
        request.user.save()
        
        return Response(
            {"message": "Password changed successfully"},
            status=status.HTTP_200_OK
        )
        
class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        serializer = UpdateProfileSerializer(
            request.user,
            data = request.data,
            context = {"request": request}
        )
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(
            {
                "message": "Profile updated successfully",
                "user": serializer.data
            },
            status=status.HTTP_200_OK
        )