from django.contrib import admin
from django.urls import path
from api.views import IdeasApi, PostsApi
from django.conf import settings
from django.conf.urls.static import static
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', PostsApi.as_view(), name='posts-api'),
    path('api/posts/get/', PostsApi.as_view(), name='get_posts_for_date'),
    path('api/ideas/', IdeasApi.as_view(), name='ideas-api')

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
