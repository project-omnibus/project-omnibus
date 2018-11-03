import datetime
import unittest
import os
from recommender import *

class RecommenderTest(unittest.TestCase):
    def testEnvironmentVariables(self):
        self.assertNotEqual(os.environ.get('GOOGLE_API_KEY'), None)
        self.assertNotEqual(os.environ.get('OMNIBUS_DATABASE_URL'), None)

    def testInitialization(self):
        recommender = Recommender("person1", datetime.date.today(), ["keyword1", "keyword2", "keyword3"])
        self.assertEqual(recommender._userID, "person1")
        self.assertEqual(recommender._date, datetime.date.today())
        self.assertEqual(recommender._keywords, ["keyword1", "keyword2", "keyword3"])
        self.assertNotEqual(recommender._userID, "person2")


if __name__ == '__main__':
    unittest.main()