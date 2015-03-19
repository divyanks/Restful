import json
import requests
import cookielib


jar = cookielib.CookieJar()
acc_pwd = {'login':'Log In',
            'username':'divyank_s@yahoo.com',
                'password':'love',
                    }
exp_data = {'email':'aed@yahoo.com','username':'divyank_s@yahoo.com','password':'love','id':5}
login_url='http://localhost:8000/api/auth/login'
print "Starting POST test on url ", login_url
#decoded = json.loads(exp_data) 
#print json.dumps(decoded, sort_keys=True, indent=4)
r = requests.post(login_url, cookies=jar, data=exp_data)

print r.status_code
decoded = json.loads(r.text)
print json.dumps(decoded, sort_keys=True, indent=4)
print "SUCCESS in OPTIONS for the login_url"

r = requests.options(login_url )
print r.status_code
decoded = json.loads(r.text)
print json.dumps(decoded, sort_keys=True, indent=4)
print "SUCCESS in GETTING the expenses"

acc_pwd = {
        'Authorization':'Token 689d480c40ab6ff12febdf6b74dee9d737dab479'
        }
expense_url='http://localhost:8000/api/expenses'
r = requests.get(expense_url,  headers=acc_pwd)
print r.status_code
decoded = json.loads(r.text)
print json.dumps(decoded, sort_keys=True, indent=4)
print "SUCCESS in POST the expenses"

print "logging out"
login_url='http://localhost:8000/api/auth/logout'
r = requests.post(login_url, cookies=jar, headers=acc_pwd)

print r.status_code
print "Successfull logged out"
