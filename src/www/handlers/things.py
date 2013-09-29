
import tornado.web

from handlers.base import BaseHandler

import requests

import utils.settings


class ThingVotesHandler(BaseHandler):


    def post(self, thing_id):
        
        current_user_uuid = self.get_current_user()
        
        print thing_id
        print current_user_uuid


        vote_id = self.mysqldb.execute("""INSERT INTO vote (thing_id, user_uuid) VALUES 
                (%s, %s) ON DUPLICATE KEY UPDATE id=id""",
                thing_id,
                current_user_uuid
                )

        vote = self.mysqldb.get("SELECT * FROM vote WHERE thing_id=%s AND user_uuid=%s", thing_id, current_user_uuid)


        self.write({"Status" : "OK", "vote" : vote})


class ThingReviewsHandler(BaseHandler):


    def post(self, thing_id):
        
        current_user_uuid = self.get_current_user()

        image_url = self.valid("image_url")
        text = self.valid("text")

        if self.errors:
            return self.send_error(400, chunk={'Status' : 'Error', 'Errors' : self.errors})

        
        print thing_id
        print current_user_uuid
        print image_url
        print text

        self.mysqldb.execute("""INSERT INTO review (thing_id, user_uuid, image_url, text) VALUES 
                (%s, %s, %s, %s) ON DUPLICATE KEY UPDATE image_url=%s, text=%s""",
                thing_id,
                current_user_uuid,
                image_url,
                text,
                image_url,
                text
                )

        review = self.mysqldb.get("SELECT * FROM review WHERE thing_id=%s AND user_uuid=%s", thing_id, current_user_uuid)




        self.write({"Status" : "OK", "review" : review})



        # create thing

        # create 







