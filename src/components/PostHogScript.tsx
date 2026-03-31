import Script from "next/script";

const posthogScript = `
!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          });
      }
      ((p = t.createElement("script")).type = "text/javascript"),
        (p.crossOrigin = "anonymous"),
        (p.async = true),
        (p.src = s.api_host + "/static/array.js"),
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
      var u = e;
      void 0 !== a ? (u = e[a] = []) : (a = "posthog");
      u.people = u.people || [];
      u.toString = function (t) {
        var e = "posthog";
        return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
      };
      u.people.toString = function () {
        return u.toString(1) + ".people (stub)";
      };
      o =
        "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(
          " ",
        );
      for (n = 0; n < o.length; n++) g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);
posthog.init("phc_Qlyul71IpsCeS4IHoakygf3qckEZd21S32rNT3Lv0D4", {
  api_host: "https://us.i.posthog.com",
  defaults: "2025-05-24",
});
`;

const calScript = `
(function (C, A, L) {
  let p = function (a, ar) {
    a.q.push(ar);
  };
  let d = C.document;
  C.Cal =
    C.Cal ||
    function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
})(window, "https://app.cal.com/embed/embed.js", "init");
window.Cal?.("init");
`;

export function PostHogScript() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: posthogScript }}
        id="posthog-js"
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{ __html: calScript }}
        id="cal-js"
        strategy="afterInteractive"
      />
    </>
  );
}
