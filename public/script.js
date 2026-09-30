(function () {
  var script = document.currentScript;
  var website = script && script.getAttribute('data-website');
  if (!website) return;

  var endpoint = new URL('/api/event', script.src).href;
  var view = null;

  function post(body) {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: JSON.stringify(body),
      keepalive: true,
    });
  }

  function page() {
    return location.pathname + location.search;
  }

  function track() {
    var next = page();
    if (view && view.page === next) return;
    view = { id: crypto.randomUUID(), page: next };
    post({
      id: view.id,
      website: website,
      path: next,
      referrer: document.referrer,
    });
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
  track();
})();
