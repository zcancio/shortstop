
import tornado.web

from handlers.base import BaseHandler

import requests

import utils.settings


class VenuesSearchHandler(BaseHandler):
    def get(self):
        lat = self.valid('lat')
        lng = self.valid('lng')


        venues =  self.mysqldb.query("""SELECT 
            venue.*,
            3956 * 2 * ASIN(SQRT(  POWER(SIN((%s - venue.lat) * pi()/180 / 2), 2) +  
            COS(%s * pi()/180) *  COS(venue.lat * pi()/180) *  POWER(SIN((%s - venue.lng) * pi()/180 / 2), 2)  )) as
            distance 
            FROM venue
            ORDER BY distance ASC
            """,
            lat,
            lat,
            lng,
            )

        # for venue in venues:
        #     things = self.mysqldb.query("""SELECT * FROM thing WHERE venue_id=%s""", venue.id)

        #     for thing in things:
        #         votes = self.mysqldb.get("""SELECT count(*) AS vote_count FROM vote WHERE thing_id=%s""", thing.id)
        #         thing['vote_count'] = votes['vote_count']

        #     venue['things'] = things

        self.write({'Status' : 'OK', 'venues' : venues})




class VenueThingsHandler(BaseHandler):
    def get(self, venue_id):

        category = self.valid("category")

        things =  self.mysqldb.query("""SELECT thing.*, count(*) AS vote_count FROM thing JOIN vote ON thing.id = vote.thing_id
            WHERE thing.venue_id=%s
            AND thing.category=%s
            GROUP BY thing.id
            ORDER BY vote_count DESC
            """,
            venue_id,
            category
            )


        self.write({'Status' : 'OK', 'things' : things})





class FoursquareVenuesSearchHandler(BaseHandler):

    def get(self):

        lat = self.valid('lat')
        lng = self.valid('lng')
        v = '20130928'

        # 'https://query.yahooapis.com/v1/public/yql'
        # 'q='
        # 'format=json'
        # 'diagnostics=true'
        # 'callback='

        params = {
            'q' : 'use "store://OX3ZelqcUadzZACZRfV4pl" as foursquare.venues.search; SELECT * FROM foursquare.venues.search WHERE ll="%s,%s" and v="%s" and client_id="%s" and client_secret="%s"' % (lat, lng, v, utils.settings.FOURSQUARE_CLIENT_ID, utils.settings.FOURSQUARE_CLIENT_SECRET),
            'format' : 'json',
            'diagnostics' : 'true',
            'callback' : ''
        }
        
        # "https://query.yahooapis.com/v1/public/?q=use%20%22store%3A%2F%2FOX3ZelqcUadzZACZRfV4pl%22%20as%20foursquare.venues.search%3B%20SELECT%20*%20FROM%20foursquare.venues.search%20WHERE%20ll%3D%2240.7%2C-74%22%20and%20v%3D%2220130928%22%20and%20client_id%3D%22DLDABLDHR5MC2RGXXWNDVWURK2W344PGQYSHQDUIKRZ25HZM%22%20and%20client_secret%3D%22CSL1NFOWSHGFW0SG20QV52NFKQG4BK2A5ETMF2WPKOADFW1O%22&format=json&diagnostics=true&callback=")yql?q=use%20%22store%3A%2F%2FOX3ZelqcUadzZACZRfV4pl%22%20as%20foursquare.venues.search%3B%20SELECT%20*%20FROM%20foursquare.venues.search%20WHERE%20ll%3D%2240.7%2C-74%22%20and%20v%3D%2220130928%22%20and%20client_id%3D%22DLDABLDHR5MC2RGXXWNDVWURK2W344PGQYSHQDUIKRZ25HZM%22%20and%20client_secret%3D%22CSL1NFOWSHGFW0SG20QV52NFKQG4BK2A5ETMF2WPKOADFW1O%22&format=json&diagnostics=true&callback="
        # ?q=use%20%22store%3A%2F%2FOX3ZelqcUadzZACZRfV4pl%22%20as%20foursquare.venues.search%3B%20SELECT%20*%20FROM%20foursquare.venues.search%20WHERE%20ll%3D%2240.7%2C-74%22%20and%20v%3D%2220130928%22%20and%20client_id%3D%22DLDABLDHR5MC2RGXXWNDVWURK2W344PGQYSHQDUIKRZ25HZM%22%20and%20client_secret%3D%22CSL1NFOWSHGFW0SG20QV52NFKQG4BK2A5ETMF2WPKOADFW1O%22&format=json&diagnostics=true&callback=")
        

        resp = requests.get("https://query.yahooapis.com/v1/public/yql", params=params)


        result =  resp.json()['query']['results']['json']['response']
        venues = result['venues']

        for venue in venues:
            venue_name =  venue['name']
            venue_lat = venue['location']['lat']
            venue_lng = venue['location']['lng']
            venue_foursquare_id = venue['id']

            self.mysqldb.execute("""INSERT INTO venue (name, lat, lng, foursquare_id) VALUES 
                (%s, %s, %s, %s) ON DUPLICATE KEY UPDATE id=id""",
                venue_name,
                venue_lat,
                venue_lng,
                venue_foursquare_id
                )
            




        self.write({'Status' : 'OK', 'venues' : venues})

