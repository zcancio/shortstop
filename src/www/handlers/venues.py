
import tornado.web

from handlers.base import BaseHandler

import requests

import utils.settings



class VenuesSearchByThingsHandler(BaseHandler):

    def get(self):

        category = self.valid("category")
        sw_lat = self.valid("sw_lat")
        sw_lng = self.valid("sw_lng")
        ne_lat = self.valid("ne_lat")
        ne_lng = self.valid("ne_lng")


        # join venues and things to get lat, lng

        # get all venues within area
        # find the top thing for each venue and for the given category
        # rank things in order of vote_count 
        # get the first 10.

        venues = self.mysqldb.query("""SELECT * FROM venue 
            WHERE lat >= %s AND lat <= %s
            AND lng >= %s AND lng <= %s
            """,
            sw_lat,
            ne_lat,
            sw_lng,
            ne_lng
            )

        for venue in venues:
            things = self.mysqldb.query("""SELECT thing.*, count(*) AS vote_count FROM thing JOIN vote ON thing.id = vote.thing_id 
                WHERE thing.venue_id=%s 
                AND thing.category=%s 
                GROUP BY thing.id
                ORDER BY vote_count DESC""",
                venue.id,
                category)
            venue['things'] = things

            venue['top_vote_count'] = 0
            if len(things) > 0:
                venue['top_vote_count'] = things[0]['vote_count']


        ordered_venues = sorted(venues, key=lambda venue: venue['top_vote_count'], reverse=True)

        # for venue in ordered_venues:
        #     print venue['top_vote_count']
        print len(ordered_venues)
        limit_ordered_venues = ordered_venues[0:10]
        print len(limit_ordered_venues)



        self.write({'Status' : 'OK', 'venues' : limit_ordered_venues})




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

