import tornado.web
import tornado.escape

import utils.validationmixin

class BaseHandler(tornado.web.RequestHandler, utils.validationmixin.ValidationMixin):
    @property
    def mysqldb(self):
        return self.application.db



    @property
    def s3(self):
        return self.application.s3

    @property
    def s3_bucket(self):
        return self.application.s3_bucket

    @property
    def redis(self):
        return self.application.redis



    def write_error(self, status_code, **kwargs):

        if 'chunk' in kwargs:
            self.write(kwargs['chunk'])

    def render_json(self, chunk):
        if isinstance(chunk, dict):
            dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None
            chunk = json.dumps(chunk, default=dthandler)
            self.set_header("Content-Type", "application/json; charset=UTF-8")
        chunk = tornado.escape.utf8(chunk)
        self._write_buffer.append(chunk)

    def render(self, template_name, **kwargs):
        if (self.request.headers.get("Mime-Type") == "json"):
            self.render_json(kwargs)
        else:
            super(BaseHandler, self).render(template_name, **kwargs)

    # # authorization
    # def get_current_user(self):
    #     # normal web request
    #     user_json = self.get_secure_cookie("user")
    #     if not user_json:
    #         return None
    #     user = tornado.escape.json_decode(user_json)
    #     return self.db.get("""SELECT id, email, mixpanel_distinct_id FROM user WHERE id = %s""", user['id'])




