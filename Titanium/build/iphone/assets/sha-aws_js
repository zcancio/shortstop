function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}

function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}

function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}

function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}

function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}

function sha1_vm_test() {
    return "a9993e364706816aba3e25717850c26c9cd0d89d" == hex_sha1("abc");
}

function core_sha1(x, len) {
    x[len >> 5] |= 128 << 24 - len % 32;
    x[(len + 64 >> 9 << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; x.length > i; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; 80 > j; j++) {
            w[j] = 16 > j ? x[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}

function sha1_ft(t, b, c, d) {
    if (20 > t) return b & c | ~b & d;
    if (40 > t) return b ^ c ^ d;
    if (60 > t) return b & c | b & d | c & d;
    return b ^ c ^ d;
}

function sha1_kt(t) {
    return 20 > t ? 1518500249 : 40 > t ? 1859775393 : 60 > t ? -1894007588 : -899497514;
}

function core_hmac_sha1(key, data) {
    var bkey = str2binb(key);
    bkey.length > 16 && (bkey = core_sha1(bkey, key.length * chrsz));
    var ipad = Array(16), opad = Array(16);
    for (var i = 0; 16 > i; i++) {
        ipad[i] = 909522486 ^ bkey[i];
        opad[i] = 1549556828 ^ bkey[i];
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 672);
}

function safe_add(x, y) {
    var lsw = (65535 & x) + (65535 & y);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | 65535 & lsw;
}

function rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}

function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; str.length * chrsz > i; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 32 - chrsz - i % 32;
    return bin;
}

function binb2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; 32 * bin.length > i; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> 32 - chrsz - i % 32 & mask);
    return str;
}

function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; 4 * binarray.length > i; i++) str += hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4) + 4) + hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4));
    return str;
}

function binb2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; 4 * binarray.length > i; i += 3) {
        var triplet = (255 & binarray[i >> 2] >> 8 * (3 - i % 4)) << 16 | (255 & binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) << 8 | 255 & binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4);
        for (var j = 0; 4 > j; j++) str += 8 * i + 6 * j > 32 * binarray.length ? b64pad : tab.charAt(63 & triplet >> 6 * (3 - j));
    }
    return str;
}

var hexcase = 0;

var b64pad = "=";

var chrsz = 8;