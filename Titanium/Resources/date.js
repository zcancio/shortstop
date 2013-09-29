function LZ(x) {
    return (0 > x || x > 9 ? "" : "0") + x;
}

function isDate(val, format) {
    var date = getDateFromFormat(val, format);
    if (0 == date) return false;
    return true;
}

function compareDates(date1, dateformat1, date2, dateformat2) {
    var d1 = getDateFromFormat(date1, dateformat1);
    var d2 = getDateFromFormat(date2, dateformat2);
    if (0 == d1 || 0 == d2) return -1;
    if (d1 > d2) return 1;
    return 0;
}

function formatDate(date, format) {
    format += "";
    var result = "";
    var i_format = 0;
    var c = "";
    var token = "";
    var y = date.getYear() + "";
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var E = date.getDay();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var H;
    var value = new Object();
    4 > y.length && (y = "" + (y - 0 + 1900));
    value["y"] = "" + y;
    value["yyyy"] = y;
    value["yy"] = y.substring(2, 4);
    value["M"] = M;
    value["MM"] = LZ(M);
    value["MMM"] = MONTH_NAMES[M - 1];
    value["NNN"] = MONTH_NAMES[M + 11];
    value["d"] = d;
    value["dd"] = LZ(d);
    value["E"] = DAY_NAMES[E + 7];
    value["EE"] = DAY_NAMES[E];
    value["H"] = H;
    value["HH"] = LZ(H);
    value["h"] = 0 == H ? 12 : H > 12 ? H - 12 : H;
    value["hh"] = LZ(value["h"]);
    value["K"] = H > 11 ? H - 12 : H;
    value["k"] = H + 1;
    value["KK"] = LZ(value["K"]);
    value["kk"] = LZ(value["k"]);
    value["a"] = H > 11 ? "PM" : "AM";
    value["m"] = m;
    value["mm"] = LZ(m);
    value["s"] = s;
    value["ss"] = LZ(s);
    while (format.length > i_format) {
        c = format.charAt(i_format);
        token = "";
        while (format.charAt(i_format) == c && format.length > i_format) token += format.charAt(i_format++);
        result += null != value[token] ? value[token] : token;
    }
    return result;
}

function _isInteger(val) {
    var digits = "1234567890";
    for (var i = 0; val.length > i; i++) if (-1 == digits.indexOf(val.charAt(i))) return false;
    return true;
}

function _getInt(str, i, minlength, maxlength) {
    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (minlength > token.length) return null;
        if (_isInteger(token)) return token;
    }
    return null;
}

function getDateFromFormat(val, format) {
    val += "";
    format += "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var x, y;
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = 1;
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var ampm = "";
    while (format.length > i_format) {
        c = format.charAt(i_format);
        token = "";
        while (format.charAt(i_format) == c && format.length > i_format) token += format.charAt(i_format++);
        if ("yyyy" == token || "yy" == token || "y" == token) {
            if ("yyyy" == token) {
                x = 4;
                y = 4;
            }
            if ("yy" == token) {
                x = 2;
                y = 2;
            }
            if ("y" == token) {
                x = 2;
                y = 4;
            }
            year = _getInt(val, i_val, x, y);
            if (null == year) return 0;
            i_val += year.length;
            2 == year.length && (year = year > 70 ? 1900 + (year - 0) : 2e3 + (year - 0));
        } else if ("MMM" == token || "NNN" == token) {
            month = 0;
            for (var i = 0; MONTH_NAMES.length > i; i++) {
                var month_name = MONTH_NAMES[i];
                if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase() && ("MMM" == token || "NNN" == token && i > 11)) {
                    month = i + 1;
                    month > 12 && (month -= 12);
                    i_val += month_name.length;
                    break;
                }
            }
            if (1 > month || month > 12) return 0;
        } else if ("EE" == token || "E" == token) for (var i = 0; DAY_NAMES.length > i; i++) {
            var day_name = DAY_NAMES[i];
            if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                i_val += day_name.length;
                break;
            }
        } else if ("MM" == token || "M" == token) {
            month = _getInt(val, i_val, token.length, 2);
            if (null == month || 1 > month || month > 12) return 0;
            i_val += month.length;
        } else if ("dd" == token || "d" == token) {
            date = _getInt(val, i_val, token.length, 2);
            if (null == date || 1 > date || date > 31) return 0;
            i_val += date.length;
        } else if ("hh" == token || "h" == token) {
            hh = _getInt(val, i_val, token.length, 2);
            if (null == hh || 1 > hh || hh > 12) return 0;
            i_val += hh.length;
        } else if ("HH" == token || "H" == token) {
            hh = _getInt(val, i_val, token.length, 2);
            if (null == hh || 0 > hh || hh > 23) return 0;
            i_val += hh.length;
        } else if ("KK" == token || "K" == token) {
            hh = _getInt(val, i_val, token.length, 2);
            if (null == hh || 0 > hh || hh > 11) return 0;
            i_val += hh.length;
        } else if ("kk" == token || "k" == token) {
            hh = _getInt(val, i_val, token.length, 2);
            if (null == hh || 1 > hh || hh > 24) return 0;
            i_val += hh.length;
            hh--;
        } else if ("mm" == token || "m" == token) {
            mm = _getInt(val, i_val, token.length, 2);
            if (null == mm || 0 > mm || mm > 59) return 0;
            i_val += mm.length;
        } else if ("ss" == token || "s" == token) {
            ss = _getInt(val, i_val, token.length, 2);
            if (null == ss || 0 > ss || ss > 59) return 0;
            i_val += ss.length;
        } else if ("a" == token) {
            if ("am" == val.substring(i_val, i_val + 2).toLowerCase()) ampm = "AM"; else {
                if ("pm" != val.substring(i_val, i_val + 2).toLowerCase()) return 0;
                ampm = "PM";
            }
            i_val += 2;
        } else {
            if (val.substring(i_val, i_val + token.length) != token) return 0;
            i_val += token.length;
        }
    }
    if (i_val != val.length) return 0;
    if (2 == month) if (0 == year % 4 && 0 != year % 100 || 0 == year % 400) {
        if (date > 29) return 0;
    } else if (date > 28) return 0;
    if ((4 == month || 6 == month || 9 == month || 11 == month) && date > 30) return 0;
    12 > hh && "PM" == ampm ? hh = hh - 0 + 12 : hh > 11 && "AM" == ampm && (hh -= 12);
    var newdate = new Date(year, month - 1, date, hh, mm, ss);
    return newdate.getTime();
}

function parseDate(val) {
    var preferEuro = 2 == arguments.length ? arguments[1] : false;
    generalFormats = new Array("y-M-d", "MMM d, y", "MMM d,y", "y-MMM-d", "d-MMM-y", "MMM d");
    monthFirst = new Array("M/d/y", "M-d-y", "M.d.y", "MMM-d", "M/d", "M-d");
    dateFirst = new Array("d/M/y", "d-M-y", "d.M.y", "d-MMM", "d/M", "d-M");
    var checkList = new Array("generalFormats", preferEuro ? "dateFirst" : "monthFirst", preferEuro ? "monthFirst" : "dateFirst");
    var d = null;
    for (var i = 0; checkList.length > i; i++) {
        var l = window[checkList[i]];
        for (var j = 0; l.length > j; j++) {
            d = getDateFromFormat(val, l[j]);
            if (0 != d) return new Date(d);
        }
    }
    return null;
}

var MONTH_NAMES = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

var DAY_NAMES = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");