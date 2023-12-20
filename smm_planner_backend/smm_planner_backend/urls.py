from django.contrib import admin
from django.urls import path
from api.views import IdeasApi, PostsListApi, PostsForDateApi, DaysWithPostsApi
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', PostsListApi.as_view(), name='posts-api'),
    path('api/posts/get/', PostsForDateApi.as_view(), name='get_posts_for_date'),
    path('api/posts/get_days/', DaysWithPostsApi.as_view(), name='get_days_with_posts'),
    path('api/ideas/', IdeasApi.as_view(), name='ideas-api'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
