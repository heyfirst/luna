# Generated by Django 2.1 on 2018-08-30 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='facebook_token',
            field=models.CharField(default='', max_length=140),
        ),
    ]
