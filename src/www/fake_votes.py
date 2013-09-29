import torndb
import csv, codecs
from time import strftime
import uuid

from utils.settings import *


def get_db_connection():
    return torndb.Connection(
        host=MYSQL_DB_HOST, 
        database=MYSQL_DB_NAME,
        user=MYSQL_DB_USER, 
        password=MYSQL_DB_PASSWORD
    )

def create_votes():
    db = get_db_connection()

    class Latin1Recoder:
        """
        Iterator that reads an encoded stream and reencodes the input to latin1
        """
        def __init__(self, f, encoding):
            self.reader = codecs.getreader(encoding)(f)

        def __iter__(self):
            return self

        def next(self):
            return self.reader.next().encode("latin1")
    
    class UnicodeReader:
        """
        A CSV reader which will iterate over lines in the CSV file "f",
        which is encoded in the given encoding.
        """
        def __init__(self, f, dialect=csv.excel, encoding="latin1", **kwds):
            f = Latin1Recoder(f, encoding)
            self.reader = csv.reader(f, dialect=dialect, **kwds)

        def next(self):
            row = self.reader.next()
            return [unicode(s, "latin1") for s in row]

        def __iter__(self):
            return self

    with open('thing.csv','rb') as csvfile:
        csvreader = UnicodeReader(csvfile, delimiter=",", quotechar='"')

        line_count = 0
        for values in csvreader:
            if values[0] == 'id':
                continue

            thing_id = values[0]
            desired_vote_count = int(values[4])
            print thing_id

            current_votes = db.query("SELECT * FROM vote WHERE thing_id=%s", thing_id)
            current_votes_count = len(current_votes)
            vote_difference = desired_vote_count - current_votes_count
            print " %s - %s = %s" % (desired_vote_count, current_votes_count, vote_difference)

            for x in range(0, vote_difference):
                random_user_uuid = str(uuid.uuid4())

                vote_id = db.execute("""INSERT INTO vote (thing_id, user_uuid) VALUES 
                       (%s, %s) ON DUPLICATE KEY UPDATE id=id""",
                       thing_id,
                       random_user_uuid
                )






if __name__ == '__main__':
    create_votes()