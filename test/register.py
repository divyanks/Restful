import json
import requests
import cookielib


jar = cookielib.CookieJar()
acc_pwd = {'login':'Log In',
           'username':'divyank_s@yahoo.com',
           'password':'love',
          }
exp_data = {'email':'aed@yahoo.com','username':'divyank_s@yahoo.com','password':'love','id':5}
login_url='http://localhost:8000/api/auth/register'
print "Starting POST test on url ", login_url
#decoded = json.loads(exp_data) 
#print json.dumps(decoded, sort_keys=True, indent=4)
r = requests.post(login_url, cookies=jar, data=exp_data)

print r.status_code
decoded = json.loads(r.text)
print json.dumps(decoded, sort_keys=True, indent=4)
print "SUCCESS in POST the expenses"

r = requests.options(login_url )
print r.status_code
decoded = json.loads(r.text)
print json.dumps(decoded, sort_keys=True, indent=4)
print "SUCCESS in POST the expenses"
