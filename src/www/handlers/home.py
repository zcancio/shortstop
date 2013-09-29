import tornado.web

from handlers.base import BaseHandler



class HomeHandler(BaseHandler):

    def get(self):
  		# ip_location = self.getRequestIPLocation()
	    #     geo_name = None
	    #     if (ip_location.city != "" and ip_location.region != ""):
	    #         geo_name = ip_location.city + ", " + ip_location.region

	    #     current_user = self.get_current_user()
	    #     current_user_id = None
	    #     if current_user is not None:
	    #         current_user_id = current_user.id

	    #     enrolled_theaters = getEnrolledTheaters(self.application, ip_location.latitude, ip_location.longitude)
	    #     all_theaters = models.theatermodel.get_nearby_theaters(self.application, ip_location.latitude, ip_location.longitude, limit=4, user_id=current_user_id, referral_url_hostname=self.request.host)

        self.render("app.html")

