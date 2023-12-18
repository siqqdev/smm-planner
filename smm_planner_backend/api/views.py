from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ideas, Posts
from .serializers import PostsSerializer, IdeaSerializer

class PostsApi(ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    def get(self, request, *args, **kwargs):
        day = int(request.query_params.get('day', 0))
        month = int(request.query_params.get('month', 0))
        year = int(request.query_params.get('year', '0').split('/')[0])

        if day and month and year:
            posts = Posts.objects.filter(postDay=day, postMonth=month, postYear=year)
            serializer = self.get_serializer(posts, many=True)
            return Response({'Posts List for Date': serializer.data})
        else:
            return super().list(request, *args, **kwargs)



    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'Posts List': serializer.data})
    
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
        
