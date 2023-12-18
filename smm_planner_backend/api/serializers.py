from rest_framework import serializers
from .models import Posts, Ideas

class PostsSerializer(serializers.ModelSerializer):
    socialMedia = serializers.CharField(max_length=15)
    postDay = serializers.IntegerField
    postMonth = serializers.IntegerField()
    postYear = serializers.IntegerField()
    postText = serializers.CharField(max_length=500)
    postFile = serializers.FileField()
    postType = serializers.CharField(max_length=10)

    class Meta:
        model = Posts
        fields = ( 'socialMedia', 'postDay', 'postMonth', 'postYear', 'postText', 'postFile', 'postType', )

class IdeaSerializer(serializers.ModelSerializer):
    ideaTitle = serializers.CharField(max_length=50)
    ideaText = serializers.CharField(max_length=1000)

    class Meta:
        model = Ideas 
        fields = ( 'ideaTitle', 'ideaText' )