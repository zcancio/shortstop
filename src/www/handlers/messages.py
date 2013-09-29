
import tornado.web

from handlers.base import BaseHandler

import requests

import utils.settings
import uuid


class MessageNewHandler(BaseHandler):
    @tornado.web.authenticated
    def post(self):
        message = {
            "id": str(uuid.uuid4()),
            "from": self.get_current_user(),
            "thing_id": self.get_argument("thing_id"), # will be 3
        }
        # to_basestring is necessary for Python 3's json encoder,
        # which doesn't accept byte strings.
        # message["html"] = tornado.escape.to_basestring(
        #     self.render_string("message.html", message=message))
        # if self.get_argument("next", None):
        #     self.redirect(self.get_argument("next"))
        # else:
        #     self.write(message)


        self.global_message_buffer.new_messages([message])





class MessageUpdatesHandler(BaseHandler):

    @tornado.web.asynchronous
    def post(self):
        cursor = self.get_argument("cursor", None)
        self.global_message_buffer.wait_for_messages(self.on_new_messages,
                                                cursor=cursor)

    def on_new_messages(self, messages):
        # Closed client connection
        if self.request.connection.stream.closed():
            return
        self.finish(dict(messages=messages))

    def on_connection_close(self):
        self.global_message_buffer.cancel_wait(self.on_new_messages)


