import json
import requests
import datetime # only for testing purposes only
import os # for getting environment variables

# inputs: userID, date, list of key words #
# session ID consists of userID and date #

class Recommender:
    GoogleAPIKey = os.environ.get('GOOGLE_API_KEY')

    def __init__(self, userID, date, keywords):
        self._userID = userID
        self._date = date
        self._keywords = keywords

    def getGoogleRecSimple(self, keywords):
        keywordString = ""
        for keyword in keywords:
            keywordString = keywordString + "+" + keyword
        try:
            url = "https://www.googleapis.com/books/v1/volumes?q=" + keywordString + "&key=" + self.GoogleAPIKey
            print(url)
        except TypeError as error:
            raise ValueError("Google API Key not found") from error
        else:
            resp = requests.get(url)
            if resp.status_code != 200:
                raise ValueError("Malformed Google Books API query URL: " + url)
            return resp

