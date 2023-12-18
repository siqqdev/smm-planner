from django.contrib import admin

from .models import Ideas, Posts

admin.site.register(Posts)
admin.site.register(Ideas)
