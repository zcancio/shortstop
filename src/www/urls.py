from handlers.home import HomeHandler
from handlers.venues import VenuesSearchHandler, VenueThingsHandler
from handlers.things import ThingVotesHandler, ThingReviewsHandler


handlers = [
      # landing pages
      (r"/", HomeHandler),
      (r"/venues/search", VenuesSearchHandler),
      (r"/venues/([0-9]+)/things", VenueThingsHandler),

      (r"/things/([0-9]+)/votes", ThingVotesHandler),
      (r"/things/([0-9]+)/reviews", ThingReviewsHandler),

]

