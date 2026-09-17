var process={env:{}};
var SfereCAPI = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../tmp/capi-entry.mjs
  var capi_entry_exports = {};
  __export(capi_entry_exports, {
    destinations: () => destinations
  });

  // ../../software/jitsu-capi-destination/dist/functions/meta-capi.js
  var LocalNoRetryError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "NoRetryError";
    }
  };
  var LocalRetryError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "RetryError";
    }
  };
  var NoRetryErrorCtor = typeof NoRetryError !== "undefined" ? NoRetryError : LocalNoRetryError;
  var RetryErrorCtor = typeof RetryError !== "undefined" ? RetryError : LocalRetryError;
  var API_VERSION = "v24.0";
  var CURRENCY_ISO_CODES = /* @__PURE__ */ new Set([
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BOV",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHE",
    "CHF",
    "CHW",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "COU",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MXV",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "USN",
    "UYI",
    "UYU",
    "UYW",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XBA",
    "XBB",
    "XBC",
    "XBD",
    "XCD",
    "XDR",
    "XOF",
    "XPD",
    "XPF",
    "XPT",
    "XSU",
    "XTS",
    "XUA",
    "XXX",
    "YER",
    "ZAR",
    "ZMW",
    "ZWC"
  ]);
  var US_STATE_CODES = /* @__PURE__ */ new Map([
    ["arizona", "az"],
    ["alabama", "al"],
    ["alaska", "ak"],
    ["arkansas", "ar"],
    ["california", "ca"],
    ["colorado", "co"],
    ["connecticut", "ct"],
    ["delaware", "de"],
    ["florida", "fl"],
    ["georgia", "ga"],
    ["hawaii", "hi"],
    ["idaho", "id"],
    ["illinois", "il"],
    ["indiana", "in"],
    ["iowa", "ia"],
    ["kansas", "ks"],
    ["kentucky", "ky"],
    ["louisiana", "la"],
    ["maine", "me"],
    ["maryland", "md"],
    ["massachusetts", "ma"],
    ["michigan", "mi"],
    ["minnesota", "mn"],
    ["mississippi", "ms"],
    ["missouri", "mo"],
    ["montana", "mt"],
    ["nebraska", "ne"],
    ["nevada", "nv"],
    ["newhampshire", "nh"],
    ["newjersey", "nj"],
    ["newmexico", "nm"],
    ["newyork", "ny"],
    ["northcarolina", "nc"],
    ["northdakota", "nd"],
    ["ohio", "oh"],
    ["oklahoma", "ok"],
    ["oregon", "or"],
    ["pennsylvania", "pa"],
    ["rhodeisland", "ri"],
    ["southcarolina", "sc"],
    ["southdakota", "sd"],
    ["tennessee", "tn"],
    ["texas", "tx"],
    ["utah", "ut"],
    ["vermont", "vt"],
    ["virginia", "va"],
    ["washington", "wa"],
    ["westvirginia", "wv"],
    ["wisconsin", "wi"],
    ["wyoming", "wy"]
  ]);
  var COUNTRY_CODES = /* @__PURE__ */ new Map([
    ["afghanistan", "af"],
    ["alandislands", "ax"],
    ["albania", "al"],
    ["algeria", "dz"],
    ["americansamoa", "as"],
    ["andorra", "ad"],
    ["angola", "ao"],
    ["anguilla", "ai"],
    ["antarctica", "aq"],
    ["antiguaandbarbuda", "ag"],
    ["argentina", "ar"],
    ["armenia", "am"],
    ["aruba", "aw"],
    ["australia", "au"],
    ["austria", "at"],
    ["azerbaijan", "az"],
    ["bahamas", "bs"],
    ["bahrain", "bh"],
    ["bangladesh", "bd"],
    ["barbados", "bb"],
    ["belarus", "by"],
    ["belgium", "be"],
    ["belize", "bz"],
    ["benin", "bj"],
    ["bermuda", "bm"],
    ["bhutan", "bt"],
    ["bolivia", "bo"],
    ["bosniaandherzegovina", "ba"],
    ["botswana", "bw"],
    ["bouvetisland", "bv"],
    ["brazil", "br"],
    ["britishindianoceanterritory", "io"],
    ["bruneidarussalam", "bn"],
    ["bulgaria", "bg"],
    ["burkinafaso", "bf"],
    ["burundi", "bi"],
    ["cambodia", "kh"],
    ["cameroon", "cm"],
    ["canada", "ca"],
    ["capeverde", "cv"],
    ["caymanislands", "ky"],
    ["centralafricanrepublic", "cf"],
    ["chad", "td"],
    ["chile", "cl"],
    ["china", "cn"],
    ["christmasisland", "cx"],
    ["cocos(keeling)islands", "cc"],
    ["colombia", "co"],
    ["comoros", "km"],
    ["congo", "cg"],
    ["congo,democraticrepublic", "cd"],
    ["cookislands", "ck"],
    ["costarica", "cr"],
    ["coted'ivoire", "ci"],
    ["croatia", "hr"],
    ["cuba", "cu"],
    ["cyprus", "cy"],
    ["czechrepublic", "cz"],
    ["denmark", "dk"],
    ["djibouti", "dj"],
    ["dominica", "dm"],
    ["dominicanrepublic", "do"],
    ["ecuador", "ec"],
    ["egypt", "eg"],
    ["elsalvador", "sv"],
    ["equatorialguinea", "gq"],
    ["eritrea", "er"],
    ["estonia", "ee"],
    ["ethiopia", "et"],
    ["falklandislands(malvinas)", "fk"],
    ["faroeislands", "fo"],
    ["fiji", "fj"],
    ["finland", "fi"],
    ["france", "fr"],
    ["frenchguiana", "gf"],
    ["frenchpolynesia", "pf"],
    ["frenchsouthernterritories", "tf"],
    ["gabon", "ga"],
    ["gambia", "gm"],
    ["georgia", "ge"],
    ["germany", "de"],
    ["ghana", "gh"],
    ["gibraltar", "gi"],
    ["greece", "gr"],
    ["greenland", "gl"],
    ["grenada", "gd"],
    ["guadeloupe", "gp"],
    ["guam", "gu"],
    ["guatemala", "gt"],
    ["guernsey", "gg"],
    ["guinea", "gn"],
    ["guinea-bissau", "gw"],
    ["guyana", "gy"],
    ["haiti", "ht"],
    ["heardisland&mcdonaldislands", "hm"],
    ["holysee(vaticancitystate)", "va"],
    ["honduras", "hn"],
    ["hongkong", "hk"],
    ["hungary", "hu"],
    ["iceland", "is"],
    ["india", "in"],
    ["indonesia", "id"],
    ["iran,islamicrepublicof", "ir"],
    ["iraq", "iq"],
    ["ireland", "ie"],
    ["isleofman", "im"],
    ["israel", "il"],
    ["italy", "it"],
    ["jamaica", "jm"],
    ["japan", "jp"],
    ["jersey", "je"],
    ["jordan", "jo"],
    ["kazakhstan", "kz"],
    ["kenya", "ke"],
    ["kiribati", "ki"],
    ["korea", "kr"],
    ["kuwait", "kw"],
    ["kyrgyzstan", "kg"],
    ["laopeople'sdemocraticrepublic", "la"],
    ["latvia", "lv"],
    ["lebanon", "lb"],
    ["lesotho", "ls"],
    ["liberia", "lr"],
    ["libyanarabjamahiriya", "ly"],
    ["liechtenstein", "li"],
    ["lithuania", "lt"],
    ["luxembourg", "lu"],
    ["macao", "mo"],
    ["macedonia", "mk"],
    ["madagascar", "mg"],
    ["malawi", "mw"],
    ["malaysia", "my"],
    ["maldives", "mv"],
    ["mali", "ml"],
    ["malta", "mt"],
    ["marshallislands", "mh"],
    ["martinique", "mq"],
    ["mauritania", "mr"],
    ["mauritius", "mu"],
    ["mayotte", "yt"],
    ["mexico", "mx"],
    ["micronesia,federatedstatesof", "fm"],
    ["moldova", "md"],
    ["monaco", "mc"],
    ["mongolia", "mn"],
    ["montenegro", "me"],
    ["montserrat", "ms"],
    ["morocco", "ma"],
    ["mozambique", "mz"],
    ["myanmar", "mm"],
    ["namibia", "na"],
    ["nauru", "nr"],
    ["nepal", "np"],
    ["netherlands", "nl"],
    ["netherlandsantilles", "an"],
    ["newcaledonia", "nc"],
    ["newzealand", "nz"],
    ["nicaragua", "ni"],
    ["niger", "ne"],
    ["nigeria", "ng"],
    ["niue", "nu"],
    ["norfolkisland", "nf"],
    ["northernmarianaislands", "mp"],
    ["norway", "no"],
    ["oman", "om"],
    ["pakistan", "pk"],
    ["palau", "pw"],
    ["palestinianterritory,occupied", "ps"],
    ["palestine", "ps"],
    ["panama", "pa"],
    ["papuanewguinea", "pg"],
    ["paraguay", "py"],
    ["peru", "pe"],
    ["philippines", "ph"],
    ["pitcairn", "pn"],
    ["poland", "pl"],
    ["portugal", "pt"],
    ["puertorico", "pr"],
    ["qatar", "qa"],
    ["reunion", "re"],
    ["romania", "ro"],
    ["russianfederation", "ru"],
    ["rwanda", "rw"],
    ["saintbarthelemy", "bl"],
    ["sainthelena", "sh"],
    ["saintkittsandnevis", "kn"],
    ["saintlucia", "lc"],
    ["saintmartin", "mf"],
    ["saintpierreandmiquelon", "pm"],
    ["saintvincentandgrenadines", "vc"],
    ["samoa", "ws"],
    ["sanmarino", "sm"],
    ["saotomeandprincipe", "st"],
    ["saudiarabia", "sa"],
    ["senegal", "sn"],
    ["serbia", "rs"],
    ["seychelles", "sc"],
    ["sierraleone", "sl"],
    ["singapore", "sg"],
    ["slovakia", "sk"],
    ["slovenia", "si"],
    ["solomonislands", "sb"],
    ["somalia", "so"],
    ["southafrica", "za"],
    ["southgeorgiaandsandwichisl.", "gs"],
    ["spain", "es"],
    ["srilanka", "lk"],
    ["sudan", "sd"],
    ["suriname", "sr"],
    ["svalbardandjanmayen", "sj"],
    ["swaziland", "sz"],
    ["sweden", "se"],
    ["switzerland", "ch"],
    ["syrianarabrepublic", "sy"],
    ["taiwan", "tw"],
    ["tajikistan", "tj"],
    ["tanzania", "tz"],
    ["thailand", "th"],
    ["timor-leste", "tl"],
    ["togo", "tg"],
    ["tokelau", "tk"],
    ["tonga", "to"],
    ["trinidadandtobago", "tt"],
    ["tunisia", "tn"],
    ["turkey", "tr"],
    ["turkmenistan", "tm"],
    ["turksandcaicosislands", "tc"],
    ["tuvalu", "tv"],
    ["uganda", "ug"],
    ["ukraine", "ua"],
    ["unitedarabemirates", "ae"],
    ["unitedkingdom", "gb"],
    ["unitedstates", "us"],
    ["unitedstatesoutlyingislands", "um"],
    ["uruguay", "uy"],
    ["uzbekistan", "uz"],
    ["vanuatu", "vu"],
    ["venezuela", "ve"],
    ["vietnam", "vn"],
    ["virginislands,british", "vg"],
    ["virginislands,u.s.", "vi"],
    ["wallisandfutuna", "wf"],
    ["westernsahara", "eh"],
    ["yemen", "ye"],
    ["zambia", "zm"],
    ["zimbabwe", "zw"]
  ]);
  var ValidationError = class extends Error {
  };
  function createEventsFilter(filter) {
    if (filter === "*") {
      return () => true;
    } else if (filter === "") {
      return (eventType) => eventType !== "page" && eventType !== "screen";
    } else {
      const events = filter.split(",").map((e) => e.trim());
      return (eventType, eventName) => events.includes(eventType) || !!eventName && events.includes(eventName);
    }
  }
  function eventTimeSafeMs(event) {
    const now = Date.now();
    const ts = event.timestamp ? new Date(event.timestamp).getTime() : NaN;
    const receivedAt = event.receivedAt ? new Date(event.receivedAt).getTime() : NaN;
    return Math.min(!isNaN(ts) ? ts : now, !isNaN(receivedAt) ? receivedAt : now, now);
  }
  function asNumber(value) {
    if (typeof value === "number" && !isNaN(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !isNaN(Number(value))) {
      return Number(value);
    }
    return void 0;
  }
  function omitUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== void 0));
  }
  var PAGE_NOISE_KEYS = [
    "path",
    "referrer",
    "host",
    "referring_domain",
    "search",
    "title",
    "url",
    "hash",
    "height",
    "width"
  ];
  var K = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function utf8Bytes(str) {
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(str);
    }
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.codePointAt(i);
      if (code > 65535) {
        i++;
      }
      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push(192 | code >> 6, 128 | code & 63);
      } else if (code < 65536) {
        bytes.push(224 | code >> 12, 128 | code >> 6 & 63, 128 | code & 63);
      } else {
        bytes.push(
          240 | code >> 18,
          128 | code >> 12 & 63,
          128 | code >> 6 & 63,
          128 | code & 63
        );
      }
    }
    return Uint8Array.from(bytes);
  }
  function rotr(x, n) {
    return x >>> n | x << 32 - n;
  }
  function sha256(input) {
    const msg = utf8Bytes(input);
    const bitLen = msg.length * 8;
    const padded = new Uint8Array((msg.length + 8 >> 6) + 1 << 6);
    padded.set(msg);
    padded[msg.length] = 128;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 4294967296));
    dv.setUint32(padded.length - 4, bitLen >>> 0);
    const h = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    const w = new Uint32Array(64);
    for (let offset = 0; offset < padded.length; offset += 64) {
      for (let i = 0; i < 16; i++) {
        w[i] = dv.getUint32(offset + i * 4);
      }
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3;
        const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10;
        w[i] = w[i - 16] + s0 + w[i - 7] + s1 >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = h;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        const ch = e & f ^ ~e & g;
        const temp1 = hh + S1 + ch + K[i] + w[i] >>> 0;
        const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        const maj = a & b ^ a & c ^ b & c;
        const temp2 = S0 + maj >>> 0;
        hh = g;
        g = f;
        f = e;
        e = d + temp1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2 >>> 0;
      }
      h[0] = h[0] + a >>> 0;
      h[1] = h[1] + b >>> 0;
      h[2] = h[2] + c >>> 0;
      h[3] = h[3] + d >>> 0;
      h[4] = h[4] + e >>> 0;
      h[5] = h[5] + f >>> 0;
      h[6] = h[6] + g >>> 0;
      h[7] = h[7] + hh >>> 0;
    }
    return Array.from(h, (x) => x.toString(16).padStart(8, "0")).join("");
  }
  function isAlreadyHashed(value) {
    return /^[0-9a-f]{64}$/i.test(value.trim());
  }
  function clean(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const cleaned = String(value).replace(/\s/g, "").toLowerCase();
    return cleaned || void 0;
  }
  function hash(value) {
    if (!value) {
      return void 0;
    }
    return sha256(value);
  }
  function cleanAndHash(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const raw = String(value);
    if (raw.trim() && isAlreadyHashed(raw)) {
      return raw.trim().toLowerCase();
    }
    return hash(clean(raw));
  }
  function hashArray(values) {
    const hashed = values.map((v) => cleanAndHash(v)).filter((v) => !!v);
    return hashed.length ? hashed : void 0;
  }
  function sanitizePhone(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const raw = String(value);
    if (isAlreadyHashed(raw)) {
      return raw.trim().toLowerCase();
    }
    const digits = raw.replace(/\D/g, "");
    return digits || void 0;
  }
  function asString(value) {
    return typeof value === "string" || typeof value === "number" ? String(value) : void 0;
  }
  function hashPhone(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed(value)) {
      return value.trim().toLowerCase();
    }
    return hash(sanitizePhone(value));
  }
  function hashGender(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed(value)) {
      return value.trim().toLowerCase();
    }
    switch (clean(value)) {
      case "male":
      case "m":
        return hash("m");
      case "female":
      case "f":
        return hash("f");
      default:
        return void 0;
    }
  }
  function normalizeBirthday(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed(value)) {
      return value;
    }
    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      return `${isoMatch[1]}${isoMatch[2]}${isoMatch[3]}`;
    }
    return value;
  }
  function hashState(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed(value)) {
      return value.trim().toLowerCase();
    }
    const cleaned = clean(value);
    return hash(US_STATE_CODES.get(cleaned ?? "") ?? cleaned);
  }
  function hashCountry(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed(value)) {
      return value.trim().toLowerCase();
    }
    const cleaned = clean(value);
    return hash(COUNTRY_CODES.get(cleaned ?? "") ?? cleaned);
  }
  function buildUserData(event, geo, props) {
    const context = event.context ?? {};
    const traits = { ...event.traits, ...context.traits };
    const address = typeof traits.address === "object" && traits.address ? traits.address : {};
    const phoneField = props.phoneFieldName || "phone";
    let firstName = asString(traits.firstName ?? traits.first_name);
    let lastName = asString(traits.lastName ?? traits.last_name);
    const fullName = asString(traits.name);
    if (!firstName && !lastName && fullName && fullName.includes(" ")) {
      const idx = fullName.indexOf(" ");
      firstName = fullName.slice(0, idx);
      lastName = fullName.slice(idx + 1);
    }
    const userData = {
      em: cleanAndHash(asString(traits.email)),
      ph: hashPhone(asString(traits[phoneField])),
      fn: cleanAndHash(firstName),
      ln: cleanAndHash(lastName),
      ge: hashGender(asString(traits.gender)),
      db: cleanAndHash(normalizeBirthday(asString(traits.birthday ?? traits.dateOfBirth ?? traits.dob))),
      ct: cleanAndHash(asString(address.city) ?? geo?.city?.name),
      st: hashState(asString(address.state) ?? geo?.region?.code),
      zp: cleanAndHash(asString(address.postalCode ?? address.zip) ?? geo?.postalCode?.code),
      country: hashCountry(asString(address.country) ?? geo?.country?.code),
      external_id: hashArray([asString(event.userId), asString(event.anonymousId)]),
      client_ip_address: asString(context.ip),
      client_user_agent: asString(context.userAgent),
      fbc: asString(context.clientIds?.fbc),
      fbp: asString(context.clientIds?.fbp)
    };
    return Object.fromEntries(Object.entries(userData).filter(([, v]) => v !== void 0));
  }
  function capiEventsUrl(props) {
    return `https://graph.facebook.com/${API_VERSION}/${props.pixelId}/events?access_token=${props.accessToken}`;
  }
  function toContents(products) {
    if (!Array.isArray(products) || products.length === 0) {
      return void 0;
    }
    const contents = products.filter((p) => typeof p === "object" && p).map((p) => ({
      id: p.product_id ?? p.sku ?? p.id,
      quantity: asNumber(p.quantity),
      item_price: asNumber(p.price)
    })).filter((c) => c.id !== void 0).map((c) => omitUndefined(c));
    return contents.length ? contents : void 0;
  }
  function contentIds(properties, contents) {
    const ids = (contents ?? []).map((c) => String(c.id));
    const single = properties.product_id ?? properties.sku;
    if (!ids.length && single !== void 0) {
      ids.push(String(single));
    }
    return ids.length ? ids : void 0;
  }
  function validateCurrency(currency, required) {
    if (required && !currency) {
      throw new ValidationError("Must include a currency for Purchase events");
    }
    if (currency && !CURRENCY_ISO_CODES.has(currency.toUpperCase())) {
      throw new ValidationError(`${currency} is not a valid ISO 4217 currency code`);
    }
  }
  function buildTrackEvent(event) {
    const properties = event.properties ?? {};
    const currency = typeof properties.currency === "string" ? properties.currency.toUpperCase() : void 0;
    const value = asNumber(properties.value ?? properties.revenue ?? properties.total ?? properties.price);
    const contents = toContents(properties.products);
    const ids = contentIds(properties, contents);
    const numItems = asNumber(properties.num_items ?? properties.quantity) ?? contents?.length;
    switch ((event.event ?? "").toLowerCase()) {
      case "order completed":
        validateCurrency(currency, true);
        return {
          event_name: "Purchase",
          custom_data: omitUndefined({
            currency,
            value: value ?? 0,
            contents,
            content_ids: ids,
            num_items: numItems
          })
        };
      case "product added":
        validateCurrency(currency, false);
        return {
          event_name: "AddToCart",
          custom_data: omitUndefined({
            currency,
            value,
            contents,
            content_ids: ids,
            content_name: properties.name,
            content_type: properties.category ? "product" : void 0
          })
        };
      case "checkout started":
        validateCurrency(currency, false);
        return {
          event_name: "InitiateCheckout",
          custom_data: omitUndefined({
            currency,
            value,
            contents,
            content_ids: ids,
            num_items: numItems
          })
        };
      case "product viewed":
        validateCurrency(currency, false);
        return {
          event_name: "ViewContent",
          custom_data: omitUndefined({
            currency,
            value,
            contents,
            content_ids: ids,
            content_name: properties.name,
            content_category: properties.category
          })
        };
      case "products searched":
        validateCurrency(currency, false);
        return {
          event_name: "Search",
          custom_data: omitUndefined({
            currency,
            value,
            search_string: properties.query
          })
        };
      case "signed up":
      case "registration completed":
      case "complete registration":
        return {
          event_name: "CompleteRegistration",
          custom_data: omitUndefined({
            currency,
            value,
            status: properties.status,
            content_name: properties.content_name ?? properties.name
          })
        };
      case "generate lead":
      case "lead generated":
      case "form submitted":
        return {
          event_name: "Lead",
          custom_data: omitUndefined({
            currency,
            value,
            content_name: properties.content_name ?? properties.name,
            content_category: properties.category
          })
        };
      default: {
        const custom_data = Object.fromEntries(
          Object.entries(properties).filter(([k]) => !PAGE_NOISE_KEYS.includes(k))
        );
        return { event_name: event.event || "track", custom_data };
      }
    }
  }
  function buildAppData(event) {
    const context = event.context ?? {};
    const device = context.device ?? {};
    const app = context.app ?? {};
    const screen = context.screen ?? {};
    const os = (context.os?.name ?? "").toLowerCase();
    return {
      advertiser_tracking_enabled: 0,
      application_tracking_enabled: 0,
      extinfo: [
        os === "ios" || os === "macos" ? "i2" : "a2",
        app.namespace ?? "",
        app.version ?? "",
        app.version ?? "",
        context.os?.version ?? "1.0",
        device.model ?? "",
        context.locale ?? "",
        "",
        "",
        screen.width ? String(screen.width) : "",
        screen.height ? String(screen.height) : "",
        screen.density ? String(screen.density) : "",
        "",
        "",
        "",
        context.timezone ?? ""
      ]
    };
  }
  function mapEvent(event, geo, props) {
    const actionSource = props.actionSource || "website";
    const userData = buildUserData(event, geo, props);
    if (Object.keys(userData).length === 0) {
      throw new ValidationError("Must include at least one user_data property");
    }
    if (actionSource === "website" && !userData.client_user_agent) {
      throw new ValidationError('action_source is "website" but the event has no client user agent');
    }
    const { event_name, custom_data } = event.type === "track" ? buildTrackEvent(event) : { event_name: "PageView", custom_data: void 0 };
    return omitUndefined({
      event_name,
      event_time: Math.floor(eventTimeSafeMs(event) / 1e3),
      event_id: event.messageId,
      action_source: actionSource,
      event_source_url: event.context?.page?.url,
      user_data: userData,
      custom_data,
      app_data: actionSource === "app" ? buildAppData(event) : void 0,
      ...props.enableLDU ? { data_processing_options: ["LDU"], data_processing_options_country: 0, data_processing_options_state: 0 } : {}
    });
  }
  var config = {
    slug: "meta-conversions-api",
    name: "Meta Conversions API",
    description: "Sends track/page/screen events to the Meta Conversions API with Segment-parity standard-event mapping and full hashed user_data matching."
  };
  var MetaConversionsApi = async (event, ctx) => {
    const { log, fetch, geo } = ctx;
    if (!["track", "page", "screen"].includes(event.type)) {
      return;
    }
    const pixelId = ctx.props?.pixelId || process.env.META_PIXEL_ID;
    const accessToken = ctx.props?.accessToken || process.env.META_ACCESS_TOKEN;
    if (!pixelId || !accessToken) {
      throw new NoRetryErrorCtor(
        "pixelId and accessToken must be set \u2014 as function variables if supported, or as META_PIXEL_ID/META_ACCESS_TOKEN on the connection"
      );
    }
    const props = {
      ...ctx.props,
      pixelId,
      accessToken,
      actionSource: ctx.props?.actionSource || process.env.META_ACTION_SOURCE,
      events: ctx.props?.events ?? process.env.META_EVENTS,
      testEventCode: ctx.props?.testEventCode || process.env.META_TEST_EVENT_CODE,
      phoneFieldName: ctx.props?.phoneFieldName || process.env.META_PHONE_FIELD_NAME,
      enableLDU: ctx.props?.enableLDU ?? process.env.META_ENABLE_LDU === "true"
    };
    const filter = createEventsFilter(props.events || "");
    if (!filter(event.type, event.event)) {
      return;
    }
    let capiEvent;
    try {
      capiEvent = mapEvent(event, geo, props);
    } catch (e) {
      if (e instanceof ValidationError) {
        log.error(`Event ${event.messageId} (${event.event || event.type}) dropped: ${e.message}`);
        return;
      }
      throw e;
    }
    const body = {
      data: [capiEvent],
      ...props.testEventCode ? { test_event_code: props.testEventCode } : {}
    };
    const url = capiEventsUrl(props);
    const safeUrl = url.replace(props.accessToken, "****");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const responseText = await response.text();
    if (response.ok) {
      log.debug(`Meta CAPI ${capiEvent.event_name} -> ${safeUrl}: ${response.status} ${responseText}`);
      return;
    }
    const message = `Meta CAPI error. Called ${safeUrl}, got ${response.status} ${response.statusText}: ${responseText}`;
    if (response.status === 429 || response.status >= 500) {
      throw new RetryErrorCtor(message);
    }
    throw new NoRetryErrorCtor(message);
  };
  MetaConversionsApi.displayName = "meta-conversions-api";
  MetaConversionsApi.description = config.description;
  var meta_capi_default = MetaConversionsApi;

  // ../../software/jitsu-capi-destination/dist/functions/tiktok-capi.js
  var LocalNoRetryError2 = class extends Error {
    constructor(message) {
      super(message);
      this.name = "NoRetryError";
    }
  };
  var LocalRetryError2 = class extends Error {
    constructor(message) {
      super(message);
      this.name = "RetryError";
    }
  };
  var NoRetryErrorCtor2 = typeof NoRetryError !== "undefined" ? NoRetryError : LocalNoRetryError2;
  var RetryErrorCtor2 = typeof RetryError !== "undefined" ? RetryError : LocalRetryError2;
  var ValidationError2 = class extends Error {
  };
  function createEventsFilter2(filter) {
    if (filter === "*") {
      return () => true;
    } else if (filter === "") {
      return (eventType) => eventType !== "page" && eventType !== "screen";
    } else {
      const events = filter.split(",").map((e) => e.trim());
      return (eventType, eventName) => events.includes(eventType) || !!eventName && events.includes(eventName);
    }
  }
  function eventTimeSafeMs2(event) {
    const now = Date.now();
    const ts = event.timestamp ? new Date(event.timestamp).getTime() : NaN;
    const receivedAt = event.receivedAt ? new Date(event.receivedAt).getTime() : NaN;
    return Math.min(!isNaN(ts) ? ts : now, !isNaN(receivedAt) ? receivedAt : now, now);
  }
  function asNumber2(value) {
    if (typeof value === "number" && !isNaN(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !isNaN(Number(value))) {
      return Number(value);
    }
    return void 0;
  }
  function asString2(value) {
    return typeof value === "string" || typeof value === "number" ? String(value) : void 0;
  }
  function omitUndefined2(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== void 0));
  }
  async function handleHttpResponse(response, safeUrl, destinationName) {
    const responseText = await response.text();
    if (response.ok) {
      return responseText;
    }
    const message = `${destinationName} error. Called ${safeUrl}, got ${response.status} ${response.statusText}: ${responseText}`;
    if (response.status === 429 || response.status >= 500) {
      throw new RetryErrorCtor2(message);
    }
    throw new NoRetryErrorCtor2(message);
  }
  var K2 = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function utf8Bytes2(str) {
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(str);
    }
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.codePointAt(i);
      if (code > 65535) {
        i++;
      }
      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push(192 | code >> 6, 128 | code & 63);
      } else if (code < 65536) {
        bytes.push(224 | code >> 12, 128 | code >> 6 & 63, 128 | code & 63);
      } else {
        bytes.push(
          240 | code >> 18,
          128 | code >> 12 & 63,
          128 | code >> 6 & 63,
          128 | code & 63
        );
      }
    }
    return Uint8Array.from(bytes);
  }
  function rotr2(x, n) {
    return x >>> n | x << 32 - n;
  }
  function sha2562(input) {
    const msg = utf8Bytes2(input);
    const bitLen = msg.length * 8;
    const padded = new Uint8Array((msg.length + 8 >> 6) + 1 << 6);
    padded.set(msg);
    padded[msg.length] = 128;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 4294967296));
    dv.setUint32(padded.length - 4, bitLen >>> 0);
    const h = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    const w = new Uint32Array(64);
    for (let offset = 0; offset < padded.length; offset += 64) {
      for (let i = 0; i < 16; i++) {
        w[i] = dv.getUint32(offset + i * 4);
      }
      for (let i = 16; i < 64; i++) {
        const s0 = rotr2(w[i - 15], 7) ^ rotr2(w[i - 15], 18) ^ w[i - 15] >>> 3;
        const s1 = rotr2(w[i - 2], 17) ^ rotr2(w[i - 2], 19) ^ w[i - 2] >>> 10;
        w[i] = w[i - 16] + s0 + w[i - 7] + s1 >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = h;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr2(e, 6) ^ rotr2(e, 11) ^ rotr2(e, 25);
        const ch = e & f ^ ~e & g;
        const temp1 = hh + S1 + ch + K2[i] + w[i] >>> 0;
        const S0 = rotr2(a, 2) ^ rotr2(a, 13) ^ rotr2(a, 22);
        const maj = a & b ^ a & c ^ b & c;
        const temp2 = S0 + maj >>> 0;
        hh = g;
        g = f;
        f = e;
        e = d + temp1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2 >>> 0;
      }
      h[0] = h[0] + a >>> 0;
      h[1] = h[1] + b >>> 0;
      h[2] = h[2] + c >>> 0;
      h[3] = h[3] + d >>> 0;
      h[4] = h[4] + e >>> 0;
      h[5] = h[5] + f >>> 0;
      h[6] = h[6] + g >>> 0;
      h[7] = h[7] + hh >>> 0;
    }
    return Array.from(h, (x) => x.toString(16).padStart(8, "0")).join("");
  }
  function isAlreadyHashed2(value) {
    return /^[0-9a-f]{64}$/i.test(value.trim());
  }
  function clean2(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const cleaned = String(value).replace(/\s/g, "").toLowerCase();
    return cleaned || void 0;
  }
  function hash2(value) {
    if (!value) {
      return void 0;
    }
    return sha2562(value);
  }
  function cleanAndHash2(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const raw = String(value);
    if (raw.trim() && isAlreadyHashed2(raw)) {
      return raw.trim().toLowerCase();
    }
    return hash2(clean2(raw));
  }
  var TIKTOK_API_VERSION = "v1.3";
  var TIKTOK_EVENTS_URL = `https://business-api.tiktok.com/open_api/${TIKTOK_API_VERSION}/event/track/`;
  var STANDARD_EVENTS = {
    "order completed": "CompletePayment",
    "order placed": "PlaceAnOrder",
    "product added": "AddToCart",
    "checkout started": "InitiateCheckout",
    "product viewed": "ViewContent",
    "product clicked": "ClickButton",
    "products searched": "Search",
    "product added to wishlist": "AddToWishlist",
    "payment info entered": "AddPaymentInfo",
    "signed up": "CompleteRegistration",
    "form submitted": "SubmitForm",
    "subscription created": "Subscribe",
    "callback started": "Contact",
    "download link clicked": "Download"
  };
  function hashTikTokPhone(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed2(value)) {
      return value.trim().toLowerCase();
    }
    const digits = value.replace(/[^0-9]/g, "");
    return digits ? hash2(`+${digits}`.substring(0, 15)) : void 0;
  }
  function plainAddress(value) {
    if (!value) {
      return void 0;
    }
    const normalized = value.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    return normalized || void 0;
  }
  function buildTikTokUser(event, geo, props) {
    const context = event.context ?? {};
    const traits = { ...event.traits, ...context.traits };
    const address = typeof traits.address === "object" && traits.address ? traits.address : {};
    const clientIds = context.clientIds ?? {};
    const externalIds = [asString2(event.userId), asString2(event.anonymousId)].filter((v) => !!v).map((v) => cleanAndHash2(v)).filter(Boolean);
    const email = cleanAndHash2(asString2(traits.email));
    const phone = hashTikTokPhone(asString2(traits[props.phoneFieldName || "phone"]));
    return omitUndefined2({
      external_id: externalIds.length ? externalIds : void 0,
      email: email ? [email] : void 0,
      phone: phone ? [phone] : void 0,
      first_name: cleanAndHash2(asString2(traits.firstName ?? traits.first_name)),
      last_name: cleanAndHash2(asString2(traits.lastName ?? traits.last_name)),
      city: plainAddress(asString2(address.city) ?? geo?.city?.name),
      state: plainAddress(asString2(address.state) ?? geo?.region?.code),
      country: plainAddress(asString2(address.country) ?? geo?.country?.code),
      zip_code: cleanAndHash2(asString2(address.postalCode ?? address.zip) ?? geo?.postalCode?.code),
      ttclid: asString2(clientIds.ttclid) ?? clickIdFromUrl(context.page?.url),
      ttp: asString2(clientIds.ttp),
      ip: asString2(context.ip),
      user_agent: asString2(context.userAgent),
      locale: asString2(context.locale)
    });
  }
  function clickIdFromUrl(url) {
    if (typeof url !== "string") {
      return void 0;
    }
    const match = url.match(/[?&]ttclid=([^&#]*)/);
    return match ? decodeURIComponent(match[1]) : void 0;
  }
  function toContents2(products) {
    if (!Array.isArray(products)) {
      return [];
    }
    return products.filter((p) => typeof p === "object" && p).map(
      (p) => omitUndefined2({
        content_id: asString2(p.product_id ?? p.sku ?? p.id),
        content_name: asString2(p.name),
        content_category: asString2(p.category),
        brand: asString2(p.brand),
        price: asNumber2(p.price),
        quantity: asNumber2(p.quantity)
      })
    ).filter((c) => Object.keys(c).length > 0);
  }
  function buildProperties(event) {
    const properties = event.properties ?? {};
    let contents = toContents2(properties.products);
    if (!contents.length && (properties.product_id ?? properties.sku)) {
      contents = [
        omitUndefined2({
          content_id: String(properties.product_id ?? properties.sku),
          content_name: asString2(properties.name),
          content_category: asString2(properties.category),
          brand: asString2(properties.brand),
          price: asNumber2(properties.price),
          quantity: asNumber2(properties.quantity)
        })
      ];
    }
    const result = omitUndefined2({
      contents: contents.length ? contents : void 0,
      content_type: contents.length ? "product" : void 0,
      currency: asString2(properties.currency)?.toUpperCase(),
      value: asNumber2(properties.value ?? properties.revenue ?? properties.total ?? properties.price),
      query: asString2(properties.query),
      description: asString2(properties.description),
      order_id: asString2(properties.order_id ?? properties.orderId),
      num_items: asNumber2(properties.num_items ?? properties.quantity) ?? (contents.length || void 0)
    });
    return Object.keys(result).length ? result : void 0;
  }
  function mapTikTokEvent(event, geo, props) {
    const user = buildTikTokUser(event, geo, props);
    if (Object.keys(user).length === 0) {
      throw new ValidationError2("Must include at least one user matching property");
    }
    const eventName = event.type === "track" ? STANDARD_EVENTS[(event.event ?? "").toLowerCase()] ?? (event.event || "track") : "Pageview";
    const context = event.context ?? {};
    const pageUrl = asString2(context.page?.url);
    const pageReferrer = asString2(context.page?.referrer);
    return omitUndefined2({
      event: eventName,
      event_time: Math.floor(eventTimeSafeMs2(event) / 1e3),
      event_id: event.messageId,
      user,
      properties: event.type === "track" ? buildProperties(event) : void 0,
      page: pageUrl || pageReferrer ? omitUndefined2({ url: pageUrl, referrer: pageReferrer }) : void 0,
      limited_data_use: props.limitedDataUse ? true : void 0
    });
  }
  var config2 = {
    slug: "tiktok-events-api",
    name: "TikTok Events API",
    description: "Sends track/page/screen events to the TikTok Events API 2.0 with standard-event mapping and hashed user matching."
  };
  var TikTokEventsApi = async (event, ctx) => {
    const { log, fetch, geo } = ctx;
    if (!["track", "page", "screen"].includes(event.type)) {
      return;
    }
    const pixelCode = ctx.props?.pixelCode || process.env.TIKTOK_PIXEL_CODE;
    const accessToken = ctx.props?.accessToken || process.env.TIKTOK_ACCESS_TOKEN;
    if (!pixelCode || !accessToken) {
      throw new NoRetryErrorCtor2(
        "pixelCode and accessToken must be set \u2014 as function variables if supported, or as TIKTOK_PIXEL_CODE/TIKTOK_ACCESS_TOKEN on the connection"
      );
    }
    const props = {
      ...ctx.props,
      pixelCode,
      accessToken,
      events: ctx.props?.events ?? process.env.TIKTOK_EVENTS,
      testEventCode: ctx.props?.testEventCode || process.env.TIKTOK_TEST_EVENT_CODE,
      phoneFieldName: ctx.props?.phoneFieldName || process.env.TIKTOK_PHONE_FIELD_NAME,
      limitedDataUse: ctx.props?.limitedDataUse ?? process.env.TIKTOK_LIMITED_DATA_USE === "true"
    };
    const filter = createEventsFilter2(props.events || "");
    if (!filter(event.type, event.event)) {
      return;
    }
    let tikTokEvent;
    try {
      tikTokEvent = mapTikTokEvent(event, geo, props);
    } catch (e) {
      if (e instanceof ValidationError2) {
        log.error(`Event ${event.messageId} (${event.event || event.type}) dropped: ${e.message}`);
        return;
      }
      throw e;
    }
    const body = {
      event_source: "web",
      event_source_id: props.pixelCode,
      partner_name: "jitsu",
      ...props.testEventCode ? { test_event_code: props.testEventCode } : {},
      data: [tikTokEvent]
    };
    const response = await fetch(TIKTOK_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Token": props.accessToken },
      body: JSON.stringify(body)
    });
    const responseText = await handleHttpResponse(response, TIKTOK_EVENTS_URL, "TikTok Events API");
    let code;
    try {
      code = JSON.parse(responseText)?.code;
    } catch {
    }
    if (typeof code === "number" && code !== 0) {
      const message = `TikTok Events API business error (code ${code}): ${responseText}`;
      if (code >= 5e4) {
        throw new RetryErrorCtor2(message);
      }
      throw new NoRetryErrorCtor2(message);
    }
    log.debug(`TikTok Events API ${tikTokEvent.event} -> ${response.status}: ${responseText}`);
  };
  TikTokEventsApi.displayName = "tiktok-events-api";
  TikTokEventsApi.description = config2.description;
  var tiktok_capi_default = TikTokEventsApi;

  // ../../software/jitsu-capi-destination/dist/functions/snap-capi.js
  var LocalNoRetryError3 = class extends Error {
    constructor(message) {
      super(message);
      this.name = "NoRetryError";
    }
  };
  var LocalRetryError3 = class extends Error {
    constructor(message) {
      super(message);
      this.name = "RetryError";
    }
  };
  var NoRetryErrorCtor3 = typeof NoRetryError !== "undefined" ? NoRetryError : LocalNoRetryError3;
  var RetryErrorCtor3 = typeof RetryError !== "undefined" ? RetryError : LocalRetryError3;
  var ValidationError3 = class extends Error {
  };
  function createEventsFilter3(filter) {
    if (filter === "*") {
      return () => true;
    } else if (filter === "") {
      return (eventType) => eventType !== "page" && eventType !== "screen";
    } else {
      const events = filter.split(",").map((e) => e.trim());
      return (eventType, eventName) => events.includes(eventType) || !!eventName && events.includes(eventName);
    }
  }
  function eventTimeSafeMs3(event) {
    const now = Date.now();
    const ts = event.timestamp ? new Date(event.timestamp).getTime() : NaN;
    const receivedAt = event.receivedAt ? new Date(event.receivedAt).getTime() : NaN;
    return Math.min(!isNaN(ts) ? ts : now, !isNaN(receivedAt) ? receivedAt : now, now);
  }
  function asNumber3(value) {
    if (typeof value === "number" && !isNaN(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !isNaN(Number(value))) {
      return Number(value);
    }
    return void 0;
  }
  function asString3(value) {
    return typeof value === "string" || typeof value === "number" ? String(value) : void 0;
  }
  function omitUndefined3(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== void 0));
  }
  async function handleHttpResponse2(response, safeUrl, destinationName) {
    const responseText = await response.text();
    if (response.ok) {
      return responseText;
    }
    const message = `${destinationName} error. Called ${safeUrl}, got ${response.status} ${response.statusText}: ${responseText}`;
    if (response.status === 429 || response.status >= 500) {
      throw new RetryErrorCtor3(message);
    }
    throw new NoRetryErrorCtor3(message);
  }
  var K3 = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function utf8Bytes3(str) {
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(str);
    }
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.codePointAt(i);
      if (code > 65535) {
        i++;
      }
      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push(192 | code >> 6, 128 | code & 63);
      } else if (code < 65536) {
        bytes.push(224 | code >> 12, 128 | code >> 6 & 63, 128 | code & 63);
      } else {
        bytes.push(
          240 | code >> 18,
          128 | code >> 12 & 63,
          128 | code >> 6 & 63,
          128 | code & 63
        );
      }
    }
    return Uint8Array.from(bytes);
  }
  function rotr3(x, n) {
    return x >>> n | x << 32 - n;
  }
  function sha2563(input) {
    const msg = utf8Bytes3(input);
    const bitLen = msg.length * 8;
    const padded = new Uint8Array((msg.length + 8 >> 6) + 1 << 6);
    padded.set(msg);
    padded[msg.length] = 128;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 4294967296));
    dv.setUint32(padded.length - 4, bitLen >>> 0);
    const h = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    const w = new Uint32Array(64);
    for (let offset = 0; offset < padded.length; offset += 64) {
      for (let i = 0; i < 16; i++) {
        w[i] = dv.getUint32(offset + i * 4);
      }
      for (let i = 16; i < 64; i++) {
        const s0 = rotr3(w[i - 15], 7) ^ rotr3(w[i - 15], 18) ^ w[i - 15] >>> 3;
        const s1 = rotr3(w[i - 2], 17) ^ rotr3(w[i - 2], 19) ^ w[i - 2] >>> 10;
        w[i] = w[i - 16] + s0 + w[i - 7] + s1 >>> 0;
      }
      let [a, b, c, d, e, f, g, hh] = h;
      for (let i = 0; i < 64; i++) {
        const S1 = rotr3(e, 6) ^ rotr3(e, 11) ^ rotr3(e, 25);
        const ch = e & f ^ ~e & g;
        const temp1 = hh + S1 + ch + K3[i] + w[i] >>> 0;
        const S0 = rotr3(a, 2) ^ rotr3(a, 13) ^ rotr3(a, 22);
        const maj = a & b ^ a & c ^ b & c;
        const temp2 = S0 + maj >>> 0;
        hh = g;
        g = f;
        f = e;
        e = d + temp1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2 >>> 0;
      }
      h[0] = h[0] + a >>> 0;
      h[1] = h[1] + b >>> 0;
      h[2] = h[2] + c >>> 0;
      h[3] = h[3] + d >>> 0;
      h[4] = h[4] + e >>> 0;
      h[5] = h[5] + f >>> 0;
      h[6] = h[6] + g >>> 0;
      h[7] = h[7] + hh >>> 0;
    }
    return Array.from(h, (x) => x.toString(16).padStart(8, "0")).join("");
  }
  function isAlreadyHashed3(value) {
    return /^[0-9a-f]{64}$/i.test(value.trim());
  }
  function clean3(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const cleaned = String(value).replace(/\s/g, "").toLowerCase();
    return cleaned || void 0;
  }
  function hash3(value) {
    if (!value) {
      return void 0;
    }
    return sha2563(value);
  }
  function cleanAndHash3(value) {
    if (value === void 0 || value === null) {
      return void 0;
    }
    const raw = String(value);
    if (raw.trim() && isAlreadyHashed3(raw)) {
      return raw.trim().toLowerCase();
    }
    return hash3(clean3(raw));
  }
  var US_STATE_CODES2 = /* @__PURE__ */ new Map([
    ["arizona", "az"],
    ["alabama", "al"],
    ["alaska", "ak"],
    ["arkansas", "ar"],
    ["california", "ca"],
    ["colorado", "co"],
    ["connecticut", "ct"],
    ["delaware", "de"],
    ["florida", "fl"],
    ["georgia", "ga"],
    ["hawaii", "hi"],
    ["idaho", "id"],
    ["illinois", "il"],
    ["indiana", "in"],
    ["iowa", "ia"],
    ["kansas", "ks"],
    ["kentucky", "ky"],
    ["louisiana", "la"],
    ["maine", "me"],
    ["maryland", "md"],
    ["massachusetts", "ma"],
    ["michigan", "mi"],
    ["minnesota", "mn"],
    ["mississippi", "ms"],
    ["missouri", "mo"],
    ["montana", "mt"],
    ["nebraska", "ne"],
    ["nevada", "nv"],
    ["newhampshire", "nh"],
    ["newjersey", "nj"],
    ["newmexico", "nm"],
    ["newyork", "ny"],
    ["northcarolina", "nc"],
    ["northdakota", "nd"],
    ["ohio", "oh"],
    ["oklahoma", "ok"],
    ["oregon", "or"],
    ["pennsylvania", "pa"],
    ["rhodeisland", "ri"],
    ["southcarolina", "sc"],
    ["southdakota", "sd"],
    ["tennessee", "tn"],
    ["texas", "tx"],
    ["utah", "ut"],
    ["vermont", "vt"],
    ["virginia", "va"],
    ["washington", "wa"],
    ["westvirginia", "wv"],
    ["wisconsin", "wi"],
    ["wyoming", "wy"]
  ]);
  var COUNTRY_CODES2 = /* @__PURE__ */ new Map([
    ["afghanistan", "af"],
    ["alandislands", "ax"],
    ["albania", "al"],
    ["algeria", "dz"],
    ["americansamoa", "as"],
    ["andorra", "ad"],
    ["angola", "ao"],
    ["anguilla", "ai"],
    ["antarctica", "aq"],
    ["antiguaandbarbuda", "ag"],
    ["argentina", "ar"],
    ["armenia", "am"],
    ["aruba", "aw"],
    ["australia", "au"],
    ["austria", "at"],
    ["azerbaijan", "az"],
    ["bahamas", "bs"],
    ["bahrain", "bh"],
    ["bangladesh", "bd"],
    ["barbados", "bb"],
    ["belarus", "by"],
    ["belgium", "be"],
    ["belize", "bz"],
    ["benin", "bj"],
    ["bermuda", "bm"],
    ["bhutan", "bt"],
    ["bolivia", "bo"],
    ["bosniaandherzegovina", "ba"],
    ["botswana", "bw"],
    ["bouvetisland", "bv"],
    ["brazil", "br"],
    ["britishindianoceanterritory", "io"],
    ["bruneidarussalam", "bn"],
    ["bulgaria", "bg"],
    ["burkinafaso", "bf"],
    ["burundi", "bi"],
    ["cambodia", "kh"],
    ["cameroon", "cm"],
    ["canada", "ca"],
    ["capeverde", "cv"],
    ["caymanislands", "ky"],
    ["centralafricanrepublic", "cf"],
    ["chad", "td"],
    ["chile", "cl"],
    ["china", "cn"],
    ["christmasisland", "cx"],
    ["cocos(keeling)islands", "cc"],
    ["colombia", "co"],
    ["comoros", "km"],
    ["congo", "cg"],
    ["congo,democraticrepublic", "cd"],
    ["cookislands", "ck"],
    ["costarica", "cr"],
    ["coted'ivoire", "ci"],
    ["croatia", "hr"],
    ["cuba", "cu"],
    ["cyprus", "cy"],
    ["czechrepublic", "cz"],
    ["denmark", "dk"],
    ["djibouti", "dj"],
    ["dominica", "dm"],
    ["dominicanrepublic", "do"],
    ["ecuador", "ec"],
    ["egypt", "eg"],
    ["elsalvador", "sv"],
    ["equatorialguinea", "gq"],
    ["eritrea", "er"],
    ["estonia", "ee"],
    ["ethiopia", "et"],
    ["falklandislands(malvinas)", "fk"],
    ["faroeislands", "fo"],
    ["fiji", "fj"],
    ["finland", "fi"],
    ["france", "fr"],
    ["frenchguiana", "gf"],
    ["frenchpolynesia", "pf"],
    ["frenchsouthernterritories", "tf"],
    ["gabon", "ga"],
    ["gambia", "gm"],
    ["georgia", "ge"],
    ["germany", "de"],
    ["ghana", "gh"],
    ["gibraltar", "gi"],
    ["greece", "gr"],
    ["greenland", "gl"],
    ["grenada", "gd"],
    ["guadeloupe", "gp"],
    ["guam", "gu"],
    ["guatemala", "gt"],
    ["guernsey", "gg"],
    ["guinea", "gn"],
    ["guinea-bissau", "gw"],
    ["guyana", "gy"],
    ["haiti", "ht"],
    ["heardisland&mcdonaldislands", "hm"],
    ["holysee(vaticancitystate)", "va"],
    ["honduras", "hn"],
    ["hongkong", "hk"],
    ["hungary", "hu"],
    ["iceland", "is"],
    ["india", "in"],
    ["indonesia", "id"],
    ["iran,islamicrepublicof", "ir"],
    ["iraq", "iq"],
    ["ireland", "ie"],
    ["isleofman", "im"],
    ["israel", "il"],
    ["italy", "it"],
    ["jamaica", "jm"],
    ["japan", "jp"],
    ["jersey", "je"],
    ["jordan", "jo"],
    ["kazakhstan", "kz"],
    ["kenya", "ke"],
    ["kiribati", "ki"],
    ["korea", "kr"],
    ["kuwait", "kw"],
    ["kyrgyzstan", "kg"],
    ["laopeople'sdemocraticrepublic", "la"],
    ["latvia", "lv"],
    ["lebanon", "lb"],
    ["lesotho", "ls"],
    ["liberia", "lr"],
    ["libyanarabjamahiriya", "ly"],
    ["liechtenstein", "li"],
    ["lithuania", "lt"],
    ["luxembourg", "lu"],
    ["macao", "mo"],
    ["macedonia", "mk"],
    ["madagascar", "mg"],
    ["malawi", "mw"],
    ["malaysia", "my"],
    ["maldives", "mv"],
    ["mali", "ml"],
    ["malta", "mt"],
    ["marshallislands", "mh"],
    ["martinique", "mq"],
    ["mauritania", "mr"],
    ["mauritius", "mu"],
    ["mayotte", "yt"],
    ["mexico", "mx"],
    ["micronesia,federatedstatesof", "fm"],
    ["moldova", "md"],
    ["monaco", "mc"],
    ["mongolia", "mn"],
    ["montenegro", "me"],
    ["montserrat", "ms"],
    ["morocco", "ma"],
    ["mozambique", "mz"],
    ["myanmar", "mm"],
    ["namibia", "na"],
    ["nauru", "nr"],
    ["nepal", "np"],
    ["netherlands", "nl"],
    ["netherlandsantilles", "an"],
    ["newcaledonia", "nc"],
    ["newzealand", "nz"],
    ["nicaragua", "ni"],
    ["niger", "ne"],
    ["nigeria", "ng"],
    ["niue", "nu"],
    ["norfolkisland", "nf"],
    ["northernmarianaislands", "mp"],
    ["norway", "no"],
    ["oman", "om"],
    ["pakistan", "pk"],
    ["palau", "pw"],
    ["palestinianterritory,occupied", "ps"],
    ["palestine", "ps"],
    ["panama", "pa"],
    ["papuanewguinea", "pg"],
    ["paraguay", "py"],
    ["peru", "pe"],
    ["philippines", "ph"],
    ["pitcairn", "pn"],
    ["poland", "pl"],
    ["portugal", "pt"],
    ["puertorico", "pr"],
    ["qatar", "qa"],
    ["reunion", "re"],
    ["romania", "ro"],
    ["russianfederation", "ru"],
    ["rwanda", "rw"],
    ["saintbarthelemy", "bl"],
    ["sainthelena", "sh"],
    ["saintkittsandnevis", "kn"],
    ["saintlucia", "lc"],
    ["saintmartin", "mf"],
    ["saintpierreandmiquelon", "pm"],
    ["saintvincentandgrenadines", "vc"],
    ["samoa", "ws"],
    ["sanmarino", "sm"],
    ["saotomeandprincipe", "st"],
    ["saudiarabia", "sa"],
    ["senegal", "sn"],
    ["serbia", "rs"],
    ["seychelles", "sc"],
    ["sierraleone", "sl"],
    ["singapore", "sg"],
    ["slovakia", "sk"],
    ["slovenia", "si"],
    ["solomonislands", "sb"],
    ["somalia", "so"],
    ["southafrica", "za"],
    ["southgeorgiaandsandwichisl.", "gs"],
    ["spain", "es"],
    ["srilanka", "lk"],
    ["sudan", "sd"],
    ["suriname", "sr"],
    ["svalbardandjanmayen", "sj"],
    ["swaziland", "sz"],
    ["sweden", "se"],
    ["switzerland", "ch"],
    ["syrianarabrepublic", "sy"],
    ["taiwan", "tw"],
    ["tajikistan", "tj"],
    ["tanzania", "tz"],
    ["thailand", "th"],
    ["timor-leste", "tl"],
    ["togo", "tg"],
    ["tokelau", "tk"],
    ["tonga", "to"],
    ["trinidadandtobago", "tt"],
    ["tunisia", "tn"],
    ["turkey", "tr"],
    ["turkmenistan", "tm"],
    ["turksandcaicosislands", "tc"],
    ["tuvalu", "tv"],
    ["uganda", "ug"],
    ["ukraine", "ua"],
    ["unitedarabemirates", "ae"],
    ["unitedkingdom", "gb"],
    ["unitedstates", "us"],
    ["unitedstatesoutlyingislands", "um"],
    ["uruguay", "uy"],
    ["uzbekistan", "uz"],
    ["vanuatu", "vu"],
    ["venezuela", "ve"],
    ["vietnam", "vn"],
    ["virginislands,british", "vg"],
    ["virginislands,u.s.", "vi"],
    ["wallisandfutuna", "wf"],
    ["westernsahara", "eh"],
    ["yemen", "ye"],
    ["zambia", "zm"],
    ["zimbabwe", "zw"]
  ]);
  var SNAP_API_VERSION = "v3";
  var SNAP_CURRENCY_CODES = /* @__PURE__ */ new Set([
    "USD",
    "AED",
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "EGP",
    "EUR",
    "GBP",
    "GIP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "JPY",
    "KRW",
    "KWD",
    "KZT",
    "LBP",
    "MXN",
    "MYR",
    "NGN",
    "NOK",
    "NZD",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "QAR",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "TZS",
    "UAH",
    "VND",
    "ZAR",
    "ALL",
    "BHD",
    "DZD",
    "GHS",
    "IQD",
    "ISK",
    "JOD",
    "KES",
    "MAD",
    "OMR",
    "XOF"
  ]);
  var STANDARD_EVENTS2 = {
    "order completed": "PURCHASE",
    "product added": "ADD_CART",
    "checkout started": "START_CHECKOUT",
    "product viewed": "VIEW_CONTENT",
    "products searched": "SEARCH",
    "product added to wishlist": "SAVE",
    "payment info entered": "ADD_BILLING",
    "signed up": "SIGN_UP",
    "signed in": "LOGIN",
    "subscription created": "SUBSCRIBE",
    "product list viewed": "LIST_VIEW",
    "application opened": "APP_OPEN",
    "application installed": "APP_INSTALL"
  };
  function snapEventsUrl(props, actionSource) {
    const id = actionSource === "MOBILE_APP" ? props.appId : props.pixelId;
    return `https://tr.snapchat.com/${SNAP_API_VERSION}/${id}/events?access_token=${props.accessToken}`;
  }
  function hashSnapPhone(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed3(value)) {
      return value.trim().toLowerCase();
    }
    const digits = value.replace(/\D/g, "").replace(/^0+/, "");
    return digits ? hash3(digits) : void 0;
  }
  function hashGender2(value) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed3(value)) {
      return value.trim().toLowerCase();
    }
    const cleaned = clean3(value);
    return hash3(cleaned === "male" ? "m" : cleaned === "female" ? "f" : cleaned);
  }
  function hashWithTable(value, table) {
    if (!value) {
      return void 0;
    }
    if (isAlreadyHashed3(value)) {
      return value.trim().toLowerCase();
    }
    const cleaned = clean3(value);
    return hash3(table.get(cleaned ?? "") ?? cleaned);
  }
  function box(value) {
    return value ? [value] : void 0;
  }
  function buildSnapUserData(event, geo, props) {
    const context = event.context ?? {};
    const traits = { ...event.traits, ...context.traits };
    const address = typeof traits.address === "object" && traits.address ? traits.address : {};
    const clientIds = context.clientIds ?? {};
    let firstName = asString3(traits.firstName ?? traits.first_name);
    let lastName = asString3(traits.lastName ?? traits.last_name);
    const fullName = asString3(traits.name);
    if (!firstName && !lastName && fullName && fullName.includes(" ")) {
      const idx = fullName.indexOf(" ");
      firstName = fullName.slice(0, idx);
      lastName = fullName.slice(idx + 1);
    }
    return omitUndefined3({
      em: box(cleanAndHash3(asString3(traits.email))),
      ph: box(hashSnapPhone(asString3(traits[props.phoneFieldName || "phone"]))),
      fn: cleanAndHash3(firstName),
      ln: cleanAndHash3(lastName),
      ge: hashGender2(asString3(traits.gender)),
      ct: cleanAndHash3(asString3(address.city) ?? geo?.city?.name),
      st: hashWithTable(asString3(address.state) ?? geo?.region?.code, US_STATE_CODES2),
      zp: cleanAndHash3(asString3(address.postalCode ?? address.zip) ?? geo?.postalCode?.code),
      country: hashWithTable(asString3(address.country) ?? geo?.country?.code, COUNTRY_CODES2),
      // Snap's real API documents external_id as a single string, not an array like em/ph/fn/ln —
      // sending 2 values (userId + anonymousId) in an array causes a hard "Request parsing failed"
      // from the real API (confirmed 2026-09-08 by replaying a real failing request directly
      // against tr.snapchat.com). Prefer userId (stable) over anonymousId (device/session-scoped).
      external_id: cleanAndHash3(asString3(event.userId) ?? asString3(event.anonymousId)),
      client_ip_address: asString3(context.ip),
      client_user_agent: asString3(context.userAgent),
      madid: asString3(context.device?.advertisingId)?.toLowerCase(),
      sc_click_id: asString3(clientIds.scclid ?? clientIds.sc_click_id) ?? clickIdFromUrl2(context.page?.url),
      sc_cookie1: asString3(clientIds.scid ?? clientIds.sc_cookie1)
    });
  }
  function clickIdFromUrl2(url) {
    if (typeof url !== "string") {
      return void 0;
    }
    const match = url.match(/[?&]ScCid=([^&#]*)/);
    if (!match) {
      return void 0;
    }
    try {
      return decodeURIComponent(match[1]);
    } catch {
      return match[1];
    }
  }
  function buildCustomData(event) {
    const properties = event.properties ?? {};
    const products = Array.isArray(properties.products) ? properties.products.filter((p) => typeof p === "object" && p) : [];
    const withIds = products.filter((p) => (p.product_id ?? p.sku ?? p.id) != null);
    const currency = asString3(properties.currency)?.toUpperCase();
    if (currency && !SNAP_CURRENCY_CODES.has(currency)) {
      throw new ValidationError3(`${currency} is not a currency code supported by Snap`);
    }
    const contentIds2 = withIds.length ? withIds.map((p) => String(p.product_id ?? p.sku ?? p.id)) : properties.product_id ?? properties.sku ? [String(properties.product_id ?? properties.sku)] : void 0;
    const contentCategory = withIds.length ? withIds.every((p) => p.category != null) ? withIds.map((p) => String(p.category)) : void 0 : properties.category ? [String(properties.category)] : void 0;
    const brands = withIds.length && withIds.every((p) => p.brand != null) ? withIds.map((p) => String(p.brand)) : void 0;
    const contentType = contentIds2 ? "product" : void 0;
    const isPurchase = (event.event ?? "").toLowerCase() === "order completed";
    const contents = isPurchase && withIds.length ? withIds.map(
      (p) => omitUndefined3({
        id: String(p.product_id ?? p.sku ?? p.id),
        quantity: asNumber3(p.quantity),
        item_price: asNumber3(p.price)
      })
    ) : void 0;
    const customData = omitUndefined3({
      currency,
      value: asNumber3(properties.value ?? properties.revenue ?? properties.total ?? properties.price),
      content_ids: contentIds2,
      content_type: contentType,
      content_category: contentCategory,
      contents,
      brands,
      num_items: asNumber3(properties.num_items ?? properties.quantity) ?? (withIds.length || void 0),
      order_id: asString3(properties.order_id ?? properties.orderId),
      search_string: asString3(properties.query),
      sign_up_method: asString3(properties.sign_up_method ?? properties.method)
    });
    return Object.keys(customData).length ? customData : void 0;
  }
  function buildAppData2(event, props) {
    const context = event.context ?? {};
    const app = context.app ?? {};
    const device = context.device ?? {};
    const screen = context.screen ?? {};
    return {
      app_id: props.appId,
      advertiser_tracking_enabled: 0,
      application_tracking_enabled: 0,
      extinfo: [
        /^[0-9]+$/.test(props.appId ?? "") ? "i2" : "a2",
        app.namespace ?? "",
        app.version ?? "",
        app.version ?? "",
        context.os?.version ?? "",
        device.model ?? "",
        context.locale ?? "",
        context.timezone ?? "",
        "",
        screen.width ? String(screen.width) : "",
        screen.height ? String(screen.height) : "",
        screen.density ? String(screen.density) : "",
        "",
        "",
        "",
        ""
      ]
    };
  }
  function mapSnapEvent(event, geo, props) {
    const actionSource = props.actionSource || "WEB";
    if (actionSource === "MOBILE_APP" && !props.appId) {
      throw new ValidationError3('appId must be set when actionSource is "MOBILE_APP"');
    }
    if (actionSource !== "MOBILE_APP" && !props.pixelId) {
      throw new ValidationError3(`pixelId must be set when actionSource is "${actionSource}"`);
    }
    const userData = buildSnapUserData(event, geo, props);
    const hasMatchKey = userData.em || userData.ph || userData.madid || userData.client_ip_address && userData.client_user_agent;
    if (!hasMatchKey) {
      throw new ValidationError3(
        "Payload must contain Email, Phone Number, Mobile Ad Identifier, or both IP Address and User Agent"
      );
    }
    const eventName = event.type === "track" ? STANDARD_EVENTS2[(event.event ?? "").toLowerCase()] : "PAGE_VIEW";
    if (event.type === "track" && !eventName) {
      throw new ValidationError3(
        `"${event.event}" has no Snap standard-event mapping \u2014 Snap's event_name is a closed enum and rejects custom values`
      );
    }
    return omitUndefined3({
      integration: "jitsu",
      event_name: eventName,
      event_time: eventTimeSafeMs3(event),
      event_id: event.messageId,
      action_source: actionSource,
      event_source_url: event.context?.page?.url,
      user_data: userData,
      custom_data: event.type === "track" ? buildCustomData(event) : void 0,
      app_data: actionSource === "MOBILE_APP" ? buildAppData2(event, props) : void 0,
      ...props.enableLDU ? { data_processing_options: ["LDU"], data_processing_options_country: 0, data_processing_options_state: 0 } : {}
    });
  }
  var config3 = {
    slug: "snap-conversions-api",
    name: "Snapchat Conversions API",
    description: "Sends track/page/screen events to the Snapchat Conversions API (v3) with standard-event mapping and hashed user_data matching."
  };
  var SnapConversionsApi = async (event, ctx) => {
    const { log, fetch, geo } = ctx;
    if (!["track", "page", "screen"].includes(event.type)) {
      return;
    }
    const pixelId = ctx.props?.pixelId || process.env.SNAP_PIXEL_ID;
    const accessToken = ctx.props?.accessToken || process.env.SNAP_CAPI_TOKEN;
    if (!pixelId || !accessToken) {
      throw new NoRetryErrorCtor3(
        "pixelId and accessToken must be set \u2014 as function variables if supported, or as SNAP_PIXEL_ID/SNAP_CAPI_TOKEN on the connection"
      );
    }
    const props = {
      ...ctx.props,
      pixelId,
      accessToken,
      appId: ctx.props?.appId || process.env.SNAP_APP_ID,
      actionSource: ctx.props?.actionSource || process.env.SNAP_ACTION_SOURCE,
      events: ctx.props?.events ?? process.env.SNAP_EVENTS,
      phoneFieldName: ctx.props?.phoneFieldName || process.env.SNAP_PHONE_FIELD_NAME,
      enableLDU: ctx.props?.enableLDU ?? process.env.SNAP_ENABLE_LDU === "true"
    };
    const filter = createEventsFilter3(props.events || "");
    if (!filter(event.type, event.event)) {
      log.warn(
        `Event ${event.messageId} (${event.event || event.type}) skipped: excluded by the events filter (${JSON.stringify(props.events || "")})`
      );
      return;
    }
    let snapEvent;
    try {
      snapEvent = mapSnapEvent(event, geo, props);
    } catch (e) {
      if (e instanceof ValidationError3) {
        log.error(`Event ${event.messageId} (${event.event || event.type}) dropped: ${e.message}`);
        return;
      }
      throw e;
    }
    const url = snapEventsUrl(props, snapEvent.action_source);
    const safeUrl = url.replace(props.accessToken, "****");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [snapEvent] })
    });
    const responseText = await handleHttpResponse2(response, safeUrl, "Snap CAPI");
    log.debug(`Snap CAPI ${snapEvent.event_name} -> ${safeUrl}: ${response.status} ${responseText}`);
  };
  SnapConversionsApi.displayName = "snap-conversions-api";
  SnapConversionsApi.description = config3.description;
  var snap_capi_default = SnapConversionsApi;

  // ../../../../../../tmp/capi-entry.mjs
  var destinations = { meta: meta_capi_default, tiktok: tiktok_capi_default, snap: snap_capi_default };
  return __toCommonJS(capi_entry_exports);
})();
