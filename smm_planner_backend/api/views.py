from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ideas, Posts
from .serializers import PostsSerializer, IdeaSerializer

class PostsListApi(ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

class PostsForDateApi(APIView):
    def get(self, request, *args, **kwargs):
        day = int(request.query_params.get('day', None), 10)
        month = int(request.query_params.get('month', None), 10)
        year = int(request.query_params.get('year', None), 10)


        print(f"Day: {day}, Month: {month}, Year: {year}")

        if day is not None and month is not None and year is not None:
            posts = Posts.objects.filter(postDay=day, postMonth=month, postYear=year)
            serializer = PostsSerializer(posts, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid parameters provided'})

class DaysWithPostsApi(APIView):
    def get(self, request, *args, **kwargs):
        month = int(request.query_params.get('month', None))
        year = int(request.query_params.get('year', None))

        print(f"Month: {month}, Year: {year}")

        if month is not None and year is not None:
            posts = Posts.objects.filter(postMonth=month, postYear=year)
            days_with_posts = list(set([post.postDay for post in posts]))
            return Response({'days_with_posts': days_with_posts})
        else:
            return Response({'error': 'Invalid parameters provided'})

class IdeasApi(APIView):
    def get(self, request):
        ideas_data = Ideas.objects.all()
        serializer = IdeaSerializer(ideas_data, many=True)
        return Response({'Ideas list': serializer.data})

    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'Ideas list': serializer.data})
