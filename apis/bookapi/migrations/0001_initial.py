# Generated by Django 5.0.3 on 2024-11-21 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('isbn', models.IntegerField()),
                ('category', models.CharField(max_length=20)),
                ('desc', models.TextField()),
            ],
        ),
    ]
