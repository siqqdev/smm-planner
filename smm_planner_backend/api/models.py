from django.db import models

class Posts(models.Model):
    socialMedia = models.CharField(max_length=15)
    postDay = models.IntegerField()
    postMonth = models.IntegerField()
    postYear = models.IntegerField()
    postText = models.CharField(max_length=500)
    postFile = models.FileField(upload_to='media/files', default='')
    postType = models.CharField(max_length=10)

class Ideas(models.Model):
    ideaTitle = models.CharField(max_length=50)
    ideaText = models.CharField(max_length=1000)
