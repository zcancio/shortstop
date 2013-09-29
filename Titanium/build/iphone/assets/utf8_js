var Utf8 = {
    encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; string.length > n; n++) {
            var c = string.charCodeAt(n);
            if (128 > c) utftext += String.fromCharCode(c); else if (c > 127 && 2048 > c) {
                utftext += String.fromCharCode(192 | c >> 6);
                utftext += String.fromCharCode(128 | 63 & c);
            } else {
                utftext += String.fromCharCode(224 | c >> 12);
                utftext += String.fromCharCode(128 | 63 & c >> 6);
                utftext += String.fromCharCode(128 | 63 & c);
            }
        }
        return utftext;
    },
    decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (utftext.length > i) {
            c = utftext.charCodeAt(i);
            if (128 > c) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && 224 > c) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode((31 & c) << 6 | 63 & c2);
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3);
                i += 3;
            }
        }
        return string;
    }
};