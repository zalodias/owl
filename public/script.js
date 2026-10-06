(function () {
  var script = document.currentScript;
  var website = script && script.getAttribute('data-website');
  if (!website) return;

  var endpoint = new URL('/api/event', script.src).href;
  var view = null;

  function post(body, notify) {
    var payload = JSON.stringify(body);
    if (!notify && navigator.sendBeacon) {
      var blob = new Blob([payload], { type: 'text/plain' });
      if (navigator.sendBeacon(endpoint, blob)) return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: payload,
      keepalive: true,
    }).then(
      function (response) {
        if (notify && response.ok) {
          window.dispatchEvent(new Event('owl:pageview'));
        }
      },
      function () {},
    );
  }

  function page() {
    return location.pathname + location.search;
  }

  function leave() {
    if (!view) return;
    post({
      id: view.id,
      website: website,
      path: view.page,
      duration: Date.now() - view.time,
    });
  }

  function track() {
    var next = page();
    if (view && view.page === next) return;
    leave();
    view = { id: crypto.randomUUID(), page: next, time: Date.now() };
    post(
      {
        id: view.id,
        website: website,
        path: next,
        referrer: document.referrer,
      },
      true,
    );
  }

  var pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(this, arguments);
    track();
  };

  var replaceState = history.replaceState;
  history.replaceState = function () {
    replaceState.apply(this, arguments);
    track();
  };

  window.addEventListener('popstate', track);
  window.addEventListener('pagehide', leave);
  track();
})();
