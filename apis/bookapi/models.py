from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=20)
    isbn = models.IntegerField()
    category = models.CharField(max_length=20)
    desc = models.TextField()

    def __str__(self):
        return self.name