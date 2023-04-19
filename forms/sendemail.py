import boto3
import smtplib
import random
from email.message import EmailMessage
from flask import request
from flask import Flask
from flask import make_response
from flask import jsonify
from flask_cors import CORS

application = Flask(__name__)


application.config['CORS_HEADERS'] = 'Content-Type'
CORS(application)
@application.route('/index',methods=['POST','GET'])
def test2():
    json = request.get_json()

    codigo = random.randint(0,999999) 
    username = "trshakira"

    server = smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("manuelaiturbides@gmail.com","wwfx rfvk ewke jsxf")

 
    msg = EmailMessage()
    msg['Subject'] = json["subject"]
    msg['From'] = json["email"]
    msg['To'] = "manuelaiturbides@gmail.com"#"appcrafters2023@gmail.com"
    msg['Message'] = json["message"]
    server.send_message(msg)

    return "successfull"


@application.route('/testconnection',methods=['POST','GET'])
def test():


    res = make_response(jsonify({"success":"successfull"}),200)
    return res

# run the app.
if __name__ == "__main__":
    
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
