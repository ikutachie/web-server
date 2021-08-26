'use strict';

const https = require('https');
const querystring = require('querystring');
const { URL } = require('url');

class LocalSearch {

  constructor(appid) {
    this.appid = appid;
  }

  get(url, headers, callback) {

    const urlObj = new URL(url);
    const options = {
      protocol: urlObj.protocol,
      port: urlObj.port,
      host: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: headers,
      timeout: 3 * 1000
    };

    const req = https.get(options, (res) => {

      if (res.statusCode != 200) {
        let error = new Error(res.statusCode + ': ' + res.statusMessage);
        error.code = 'ERR_HTTP_INVALID_STATUS_CODE';
        callback(error, null);
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        callback(null, rawData);
      });

      res.on('error', (e) => {
        callback(e, null);
      });
    });

    let errorOrigin = null;

    req.on('timeout', () => {
      errorOrigin = new Error('TIMEOUT');
      errorOrigin.code = 'ECONNRESET';
      req.abort();
    });

    req.on('error', (e) => {
      if (errorOrigin != null) {
        callback(errorOrigin, null);
      } else {
        callback(e, null);
      }
    });

    req.end();
  }

  json2pois(json) {
    const result = [];
    const data = JSON.parse(json);
    for (let i=0; i<data.Feature.length; i++) {
      const f = data.Feature[i];
      if (f.Geometry.Type == 'point') {
        const ll = f.Geometry.Coordinates.split(',');
        result.push({ name: f.Name, lat: ll[1], lon: ll[0] });
      }
    }
    return result;
  }

  search(query, callback) {

    const baseURL = 'https://map.yahooapis.jp/search/local/V1/localSearch';

    const qs = querystring.stringify({
      query: query,
      output: 'json',
      results: '3',
      sort: 'score'
    });

    const url = baseURL + '?' + qs;

    const headers = {
      'User-Agent': 'chie_safuran' + this.appid
    };

    const self = this;
    this.get(url, headers, function(error, json) {
      if (error == null) {
        const pois = self.json2pois(json);
        callback(null, pois);
      } else {
        callback(error, null);
      }
    });
  }
}

const appid = 'dj00aiZpPXBWaXBPSnNJek11ViZzPWNvbnN1bWVyc2VjcmV0Jng9YWU-';
const query = '東京タワー';
new LocalSearch(appid).search(query, function(error, pois) {
  if (error == null) {
    for (let i=0; i<pois.length; i++) {
      const p = pois[i];
      console.log(p.name);
      console.log(' ' + p.lat + ', ' + p.lon);
      console.log();
    }
  } else {
    console.log(error.code + ': ' + error.message);
  }
});