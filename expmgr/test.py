from django.test import TestCase
import requests
import cookielib
import json

# Create your tests here.
class SimpleTestCase(TestCase):
###
##Sending POST request to the url testing login
## Assertions success to only users that exist: Admin exits even though not  configured
###
	#userInfo
	username = "william"
	password = "william"
	email = "william@toptal.com"
	
	#urls
	jar = cookielib.CookieJar()
	register_url= 'http://localhost:8000/api/auth/register'
	login_url= 'http://localhost:8000/api/auth/login'
	expense_url= 'http://localhost:8000/api/expenses/'
	report_url= 'http://localhost:8000/api/expenses/reports?type=WEEK'
	logout_url= 'http://localhost:8000/api/auth/logout'
	
	#data
	login_data = {'username':username,'password':password}
	regt_data = {'email':email, 'username':username,'password':password}
	reg_data = {'email':'arunabh1@a.com', 'username':'a2','password':'1213'}
	nlogin_data = {'username':username,'password':'1234346'}
	r = requests.post(register_url, cookies=jar, data=regt_data)
	r = requests.post(login_url, cookies=jar, data=login_data)
	decoded = json.loads(r.text)
	token = decoded['auth_token']
	tokenh = "Token " + token
	token_h = {'Authorization': tokenh}
	
	def test_add_expenses(self):
		exp_data = { 'amount': 3000.0, 'comment': 'testing expense', 'desc': 'fuel' , 'date': '2015-02-28', 'time':'10:29:48'}
		r = requests.post(self.expense_url, cookies=self.jar, headers=self.token_h, data=exp_data)
		self.assertEqual(r.status_code, 201)

'''
	def test_register(self):
		r = requests.post(self.register_url, cookies=self.jar, data=self.reg_data)
		print r.status_code
		decoded = json.loads(r.text)
		print decoded
		self.assertEqual(r.status_code, 201)

	def test_auth(self):
		r = requests.post(self.login_url, cookies=self.jar, data=self.login_data)
		print r.status_code
		decoded = json.loads(r.text)
		self.assertEqual(r.status_code, 200)

	def test_negativeauth(self):
		r = requests.post(self.login_url, cookies=self.jar, data=self.nlogin_data)
		decoded = json.loads(r.text)
		self.assertEqual(r.status_code, 400)
'''

'''
	def test_delete_expenses(self):
		r = requests.post(self.expense_url + "/1", cookies=self.jar, headers=self.token_h, data={})
		self.assertEqual(r.status_code, 200)

	def test_edit_expenses(self):
		exp_data = { 'amount': 10000.0, 'comment': 'testing expense', 'desc': 'fuel' , 'date': '2015-02-28', 'time':'10:29:48'}
		r = requests.post(self.expense_url + "/1", cookies=self.jar, headers=self.token_h, data=exp_data)
		self.assertEqual(r.status_code, 200)
		
	def test_report(self):
		r = requests.get(self.report_url, cookies=self.jar, headers=self.token_h, data={})
		self.assertEqual(r.status_code, 200)
'''

