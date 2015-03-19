from django.db import models
from django.contrib.auth.models import User
import datetime

class Expense(models.Model):
	user = models.ForeignKey(User, default=None, blank=True, null=True)
	amount = models.FloatField(default=0.00)
	desc = models.TextField(max_length=500)
	comment = models.CharField(max_length=200)
	date = models.DateField(default=datetime.datetime.now)
	time = models.TimeField(default=datetime.datetime.now)
