from handlers.home import HomeHandler
from handlers.venues import VenuesSearchHandler, VenueThingsHandler, VenuesSearchByThingsHandler
from handlers.things import ThingVotesHandler, ThingReviewsHandler, ThingHandler
from handlers.messages import MessageUpdatesHandler, MessageNewHandler


handlers = [
      # landing pages
      (r"/", HomeHandler),

      (r"/venues/search-by-things", VenuesSearchByThingsHandler),

      (r"/venues/search", VenuesSearchHandler),
      (r"/venues/([0-9]+)/things", VenueThingsHandler),

      (r"/things/([0-9]+)/votes", ThingVotesHandler),
      (r"/things/([0-9]+)/reviews", ThingReviewsHandler),

      (r"/a/messages/updates", MessageUpdatesHandler),
      (r"/a/messages/new", MessageNewHandler),

      (r"/things/([0-9]+)", ThingHandler)

]

