import tornado.web
import tornado.escape

import utils.validationmixin

import uuid

class BaseHandler(tornado.web.RequestHandler, utils.validationmixin.ValidationMixin):
    @property
    def mysqldb(self):
        return self.application.mysqldb

    @property
    def s3(self):
        return self.application.s3

    @property
    def s3_bucket(self):
        return self.application.s3_bucket

    @property
    def redis(self):
        return self.application.redis

    @property
    def global_message_buffer(self):
        return self.application.global_message_buffer

    def check_xsrf_cookie(self):
        pass



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


    def prepare(self):

        # get user cookie, if None, set user cookie via UUID
        user_uuid = self.get_cookie('user_uuid')
        if not user_uuid:
            new_user_uuid = str(uuid.uuid4())
            self.set_cookie('user_uuid', tornado.escape.url_escape(new_user_uuid))
        


    def get_current_user(self):
        # normal web request
        user_uuid_encoded = self.get_cookie("user_uuid")
        user_uuid = None
        if user_uuid_encoded:
            user_uuid = tornado.escape.url_unescape(user_uuid_encoded)

        if user_uuid is None:
            user_uuid = str(uuid.uuid4())
            self.set_cookie('user_uuid', tornado.escape.url_escape(user_uuid))

        return user_uuid


