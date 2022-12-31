from flask import Flask, request, redirect, url_for, session
from oauth2client.client import OAuth2WebServerFlow
import os


app = Flask(__name__)

oauth2_flow = OAuth2WebServerFlow(client_id='42492',
                                  client_secret='c173f1d11bdd48528a6a4de03e9080e6',
                                  redirect_uri='http://localhost:5000/oauth2callback',
                                  auth_uri='https://www.bungie.net/en/OAuth/Authorize',
                                  scope=''
                                  )


@app.route('/')
def index():

    return "Euphorium OAUTH2 authentication server"


@app.route('/login')
def login():
    # Generate the authorization URL

    auth_url = oauth2_flow.step1_get_authorize_url()
    return redirect(auth_url)


@app.route('/oauth2callback')
def oauth2callback():
    # Exchange the authorization code for a token
    auth_code = request.args.get('code')
    # authcode ^
    credentials = oauth2_flow.step2_exchange(auth_code)

    # Store the token in the session or in a database, depending on your needs
    session['credentials'] = credentials.to_json()

    # Redirect the user to the index page or another page that you want to show after the authentication process is complete
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
