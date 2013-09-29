from handlers.home import HomeHandler
from handlers.venues import VenuesSearchHandler


handlers = [
      # landing pages
      (r"/", HomeHandler),
      (r"/venues/search", VenuesSearchHandler)
]

