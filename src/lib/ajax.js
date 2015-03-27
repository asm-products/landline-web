'use strict';

const onload = (request, success, error) => {
  return () => {
    if (request.status >= 200 && request.status < 400) {
      try {
        success(JSON.parse(request.responseText));
      } catch (e) {
        error('JSON parsing error', e);
      }
    } else {
      error(request.statusText, new Error(request.responseText));
    }
  };
};

const xhr = {
  delete(path, headers) {
    return this.request('DELETE', path, headers);
  },

  get(path, headers) {
    return this.request('GET', path, headers);
  },

  post(path, headers) {
    return this.request('POST', path, headers);
  },

  put(path, headers) {
    return this.request('PUT', path, headers);
  },

  request(method, path, headers) {
    let request = new XMLHttpRequest();

    request.open(method, path, true);

    for (let header in headers) {
      request.setRequestHeader(header, headers[header]);
    }

    return request;
  }
};

module.exports = (options) => {
  if (!options.error) {
    options.error = () => {};
  }

  if (!options.success) {
    options.success = () => {};
  }

  let request = xhr[options.method.toLowerCase()](options.url, options.headers);

  request.onload = onload(request, options.success, options.error);
  request.send(options.data);
};
