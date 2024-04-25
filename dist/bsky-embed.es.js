function wf(t) {
  return Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = Object.assign({}, s), jl(s.value) && !kf(s.value) && !Array.isArray(s.value) && (r[n].value = Object.assign({}, s.value)), Array.isArray(s.value) && (r[n].value = s.value.slice(0)), r;
  }, {});
}
function Tf(t) {
  return t ? Object.keys(t).reduce((r, n) => {
    const s = t[n];
    return r[n] = jl(s) && "value" in s ? s : {
      value: s
    }, r[n].attribute || (r[n].attribute = Sf(n)), r[n].parse = "parse" in r[n] ? r[n].parse : typeof r[n].value != "string", r;
  }, {}) : {};
}
function Cf(t) {
  return Object.keys(t).reduce((r, n) => (r[n] = t[n].value, r), {});
}
function Lf(t, e) {
  const r = wf(e);
  return Object.keys(e).forEach((s) => {
    const u = r[s], l = t.getAttribute(u.attribute), o = t[s];
    l && (u.value = u.parse ? Ol(l) : l), o != null && (u.value = Array.isArray(o) ? o.slice(0) : o), u.reflect && Bo(t, u.attribute, u.value), Object.defineProperty(t, s, {
      get() {
        return u.value;
      },
      set(d) {
        const f = u.value;
        u.value = d, u.reflect && Bo(this, u.attribute, u.value);
        for (let m = 0, E = this.__propertyChangedCallbacks.length; m < E; m++)
          this.__propertyChangedCallbacks[m](s, d, f);
      },
      enumerable: !0,
      configurable: !0
    });
  }), r;
}
function Ol(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Bo(t, e, r) {
  if (r == null || r === !1)
    return t.removeAttribute(e);
  let n = JSON.stringify(r);
  t.__updating[e] = !0, n === "true" && (n = ""), t.setAttribute(e, n), Promise.resolve().then(() => delete t.__updating[e]);
}
function Sf(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, r) => "-" + r.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function jl(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function kf(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function Bf(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let Ua;
function Df(t, e) {
  const r = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return r.map((s) => e[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Lf(this, e);
      const s = Cf(this.props), u = this.Component, l = Ua;
      try {
        Ua = this, this.__initialized = !0, Bf(u) ? new u(s, {
          element: this
        }) : u(s, {
          element: this
        });
      } finally {
        Ua = l;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); )
        s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, u, l) {
      if (this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in e)) {
        if (l == null && !this[s])
          return;
        this[s] = e[s].parse ? Ol(l) : l;
      }
    }
    lookupProp(s) {
      if (e)
        return r.find((u) => s === u || s === e[u].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(s) {
      this.__releaseCallbacks.push(s);
    }
    addPropertyChangedCallback(s) {
      this.__propertyChangedCallbacks.push(s);
    }
  };
}
function Pf(t, e = {}, r = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: s
  } = r;
  return (u) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let l = customElements.get(t);
    return l ? (l.prototype.Component = u, l) : (l = Df(n, Tf(e)), l.prototype.Component = u, l.prototype.registeredTag = t, customElements.define(t, l, s), l);
  };
}
const Kf = (t, e) => t === e, Fa = Symbol("solid-proxy"), Fs = {
  equals: Kf
};
let Nl = ql;
const er = 1, Zs = 2, $l = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var Ce = null;
let Va = null, Uf = null, ue = null, Te = null, Tt = null, la = 0;
function Vf(t, e) {
  const r = ue, n = Ce, s = t.length === 0, u = e === void 0 ? n : e, l = s ? $l : {
    owned: null,
    cleanups: null,
    context: u ? u.context : null,
    owner: u
  }, o = s ? t : () => t(() => Di(() => ua(l)));
  Ce = l, ue = null;
  try {
    return Ki(o, !0);
  } finally {
    ue = r, Ce = n;
  }
}
function Li(t, e) {
  e = e ? Object.assign({}, Fs, e) : Fs;
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, n = (s) => (typeof s == "function" && (s = s(r.value)), Gl(r, s));
  return [Ml.bind(r), n];
}
function Fe(t, e, r) {
  const n = eo(t, e, !1, er);
  Pi(n);
}
function If(t, e, r) {
  Nl = Nf;
  const n = eo(t, e, !1, er);
  (!r || !r.render) && (n.user = !0), Tt ? Tt.push(n) : Pi(n);
}
function ur(t, e, r) {
  r = r ? Object.assign({}, Fs, r) : Fs;
  const n = eo(t, e, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = r.equals || void 0, Pi(n), Ml.bind(n);
}
function Di(t) {
  if (ue === null)
    return t();
  const e = ue;
  ue = null;
  try {
    return t();
  } finally {
    ue = e;
  }
}
function Ml() {
  if (this.sources && this.state)
    if (this.state === er)
      Pi(this);
    else {
      const t = Te;
      Te = null, Ki(() => Ws(this), !1), Te = t;
    }
  if (ue) {
    const t = this.observers ? this.observers.length : 0;
    ue.sources ? (ue.sources.push(this), ue.sourceSlots.push(t)) : (ue.sources = [this], ue.sourceSlots = [t]), this.observers ? (this.observers.push(ue), this.observerSlots.push(ue.sources.length - 1)) : (this.observers = [ue], this.observerSlots = [ue.sources.length - 1]);
  }
  return this.value;
}
function Gl(t, e, r) {
  let n = t.value;
  return (!t.comparator || !t.comparator(n, e)) && (t.value = e, t.observers && t.observers.length && Ki(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const u = t.observers[s], l = Va && Va.running;
      l && Va.disposed.has(u), (l ? !u.tState : !u.state) && (u.pure ? Te.push(u) : Tt.push(u), u.observers && Xl(u)), l || (u.state = er);
    }
    if (Te.length > 1e6)
      throw Te = [], new Error();
  }, !1)), e;
}
function Pi(t) {
  if (!t.fn)
    return;
  ua(t);
  const e = la;
  Of(
    t,
    t.value,
    e
  );
}
function Of(t, e, r) {
  let n;
  const s = Ce, u = ue;
  ue = Ce = t;
  try {
    n = t.fn(e);
  } catch (l) {
    return t.pure && (t.state = er, t.owned && t.owned.forEach(ua), t.owned = null), t.updatedAt = r + 1, zl(l);
  } finally {
    ue = u, Ce = s;
  }
  (!t.updatedAt || t.updatedAt <= r) && (t.updatedAt != null && "observers" in t ? Gl(t, n) : t.value = n, t.updatedAt = r);
}
function eo(t, e, r, n = er, s) {
  const u = {
    fn: t,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: Ce,
    context: Ce ? Ce.context : null,
    pure: r
  };
  return Ce === null || Ce !== $l && (Ce.owned ? Ce.owned.push(u) : Ce.owned = [u]), u;
}
function Hs(t) {
  if (t.state === 0)
    return;
  if (t.state === Zs)
    return Ws(t);
  if (t.suspense && Di(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < la); )
    t.state && e.push(t);
  for (let r = e.length - 1; r >= 0; r--)
    if (t = e[r], t.state === er)
      Pi(t);
    else if (t.state === Zs) {
      const n = Te;
      Te = null, Ki(() => Ws(t, e[0]), !1), Te = n;
    }
}
function Ki(t, e) {
  if (Te)
    return t();
  let r = !1;
  e || (Te = []), Tt ? r = !0 : Tt = [], la++;
  try {
    const n = t();
    return jf(r), n;
  } catch (n) {
    r || (Tt = null), Te = null, zl(n);
  }
}
function jf(t) {
  if (Te && (ql(Te), Te = null), t)
    return;
  const e = Tt;
  Tt = null, e.length && Ki(() => Nl(e), !1);
}
function ql(t) {
  for (let e = 0; e < t.length; e++)
    Hs(t[e]);
}
function Nf(t) {
  let e, r = 0;
  for (e = 0; e < t.length; e++) {
    const n = t[e];
    n.user ? t[r++] = n : Hs(n);
  }
  for (e = 0; e < r; e++)
    Hs(t[e]);
}
function Ws(t, e) {
  t.state = 0;
  for (let r = 0; r < t.sources.length; r += 1) {
    const n = t.sources[r];
    if (n.sources) {
      const s = n.state;
      s === er ? n !== e && (!n.updatedAt || n.updatedAt < la) && Hs(n) : s === Zs && Ws(n, e);
    }
  }
}
function Xl(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const r = t.observers[e];
    r.state || (r.state = Zs, r.pure ? Te.push(r) : Tt.push(r), r.observers && Xl(r));
  }
}
function ua(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const r = t.sources.pop(), n = t.sourceSlots.pop(), s = r.observers;
      if (s && s.length) {
        const u = s.pop(), l = r.observerSlots.pop();
        n < s.length && (u.sourceSlots[l] = n, s[n] = u, r.observerSlots[n] = l);
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--)
      ua(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function $f(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function zl(t, e = Ce) {
  throw $f(t);
}
function Fl(t, e) {
  return Di(() => t(e || {}));
}
function js() {
  return !0;
}
const Mf = {
  get(t, e, r) {
    return e === Fa ? r : t.get(e);
  },
  has(t, e) {
    return e === Fa ? !0 : t.has(e);
  },
  set: js,
  deleteProperty: js,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: js,
      deleteProperty: js
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function Ia(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function Gf() {
  for (let t = 0, e = this.length; t < e; ++t) {
    const r = this[t]();
    if (r !== void 0)
      return r;
  }
}
function qf(...t) {
  let e = !1;
  for (let l = 0; l < t.length; l++) {
    const o = t[l];
    e = e || !!o && Fa in o, t[l] = typeof o == "function" ? (e = !0, ur(o)) : o;
  }
  if (e)
    return new Proxy(
      {
        get(l) {
          for (let o = t.length - 1; o >= 0; o--) {
            const d = Ia(t[o])[l];
            if (d !== void 0)
              return d;
          }
        },
        has(l) {
          for (let o = t.length - 1; o >= 0; o--)
            if (l in Ia(t[o]))
              return !0;
          return !1;
        },
        keys() {
          const l = [];
          for (let o = 0; o < t.length; o++)
            l.push(...Object.keys(Ia(t[o])));
          return [...new Set(l)];
        }
      },
      Mf
    );
  const r = {}, n = /* @__PURE__ */ Object.create(null);
  for (let l = t.length - 1; l >= 0; l--) {
    const o = t[l];
    if (!o)
      continue;
    const d = Object.getOwnPropertyNames(o);
    for (let f = d.length - 1; f >= 0; f--) {
      const m = d[f];
      if (m === "__proto__" || m === "constructor")
        continue;
      const E = Object.getOwnPropertyDescriptor(o, m);
      if (!n[m])
        n[m] = E.get ? {
          enumerable: !0,
          configurable: !0,
          get: Gf.bind(r[m] = [E.get.bind(o)])
        } : E.value !== void 0 ? E : void 0;
      else {
        const h = r[m];
        h && (E.get ? h.push(E.get.bind(o)) : E.value !== void 0 && h.push(() => E.value));
      }
    }
  }
  const s = {}, u = Object.keys(n);
  for (let l = u.length - 1; l >= 0; l--) {
    const o = u[l], d = n[o];
    d && d.get ? Object.defineProperty(s, o, d) : s[o] = d ? d.value : void 0;
  }
  return s;
}
function Xf(t, e, r) {
  let n = r.length, s = e.length, u = n, l = 0, o = 0, d = e[s - 1].nextSibling, f = null;
  for (; l < s || o < u; ) {
    if (e[l] === r[o]) {
      l++, o++;
      continue;
    }
    for (; e[s - 1] === r[u - 1]; )
      s--, u--;
    if (s === l) {
      const m = u < n ? o ? r[o - 1].nextSibling : r[u - o] : d;
      for (; o < u; )
        t.insertBefore(r[o++], m);
    } else if (u === o)
      for (; l < s; )
        (!f || !f.has(e[l])) && e[l].remove(), l++;
    else if (e[l] === r[u - 1] && r[o] === e[s - 1]) {
      const m = e[--s].nextSibling;
      t.insertBefore(r[o++], e[l++].nextSibling), t.insertBefore(r[--u], m), e[s] = r[u];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let E = o;
        for (; E < u; )
          f.set(r[E], E++);
      }
      const m = f.get(e[l]);
      if (m != null)
        if (o < m && m < u) {
          let E = l, h = 1, v;
          for (; ++E < s && E < u && !((v = f.get(e[E])) == null || v !== m + h); )
            h++;
          if (h > m - o) {
            const T = e[l];
            for (; o < m; )
              t.insertBefore(r[o++], T);
          } else
            t.replaceChild(r[o++], e[l++]);
        } else
          l++;
      else
        e[l++].remove();
    }
  }
}
const Do = "_$DX_DELEGATE";
function Ne(t, e, r) {
  let n;
  const s = () => {
    const l = document.createElement("template");
    return l.innerHTML = t, r ? l.content.firstChild.firstChild : l.content.firstChild;
  }, u = e ? () => Di(() => document.importNode(n || (n = s()), !0)) : () => (n || (n = s())).cloneNode(!0);
  return u.cloneNode = u, u;
}
function Zl(t, e = window.document) {
  const r = e[Do] || (e[Do] = /* @__PURE__ */ new Set());
  for (let n = 0, s = t.length; n < s; n++) {
    const u = t[n];
    r.has(u) || (r.add(u), e.addEventListener(u, zf));
  }
}
function xe(t, e, r) {
  r == null ? t.removeAttribute(e) : t.setAttribute(e, r);
}
function Hl(t, e) {
  e == null ? t.removeAttribute("class") : t.className = e;
}
function Po(t, e, r) {
  return Di(() => t(e, r));
}
function ie(t, e, r, n) {
  if (r !== void 0 && !n && (n = []), typeof e != "function")
    return Js(t, e, n, r);
  Fe((s) => Js(t, e(), s, r), n);
}
function zf(t) {
  const e = `$$${t.type}`;
  let r = t.composedPath && t.composedPath()[0] || t.target;
  for (t.target !== r && Object.defineProperty(t, "target", {
    configurable: !0,
    value: r
  }), Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return r || document;
    }
  }); r; ) {
    const n = r[e];
    if (n && !r.disabled) {
      const s = r[`${e}Data`];
      if (s !== void 0 ? n.call(r, s, t) : n.call(r, t), t.cancelBubble)
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function Js(t, e, r, n, s) {
  for (; typeof r == "function"; )
    r = r();
  if (e === r)
    return r;
  const u = typeof e, l = n !== void 0;
  if (t = l && r[0] && r[0].parentNode || t, u === "string" || u === "number")
    if (u === "number" && (e = e.toString()), l) {
      let o = r[0];
      o && o.nodeType === 3 ? o.data !== e && (o.data = e) : o = document.createTextNode(e), r = Ir(t, r, n, o);
    } else
      r !== "" && typeof r == "string" ? r = t.firstChild.data = e : r = t.textContent = e;
  else if (e == null || u === "boolean")
    r = Ir(t, r, n);
  else {
    if (u === "function")
      return Fe(() => {
        let o = e();
        for (; typeof o == "function"; )
          o = o();
        r = Js(t, o, r, n);
      }), () => r;
    if (Array.isArray(e)) {
      const o = [], d = r && Array.isArray(r);
      if (Za(o, e, r, s))
        return Fe(() => r = Js(t, o, r, n, !0)), () => r;
      if (o.length === 0) {
        if (r = Ir(t, r, n), l)
          return r;
      } else
        d ? r.length === 0 ? Ko(t, o, n) : Xf(t, r, o) : (r && Ir(t), Ko(t, o));
      r = o;
    } else if (e.nodeType) {
      if (Array.isArray(r)) {
        if (l)
          return r = Ir(t, r, n, e);
        Ir(t, r, null, e);
      } else
        r == null || r === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      r = e;
    }
  }
  return r;
}
function Za(t, e, r, n) {
  let s = !1;
  for (let u = 0, l = e.length; u < l; u++) {
    let o = e[u], d = r && r[t.length], f;
    if (!(o == null || o === !0 || o === !1))
      if ((f = typeof o) == "object" && o.nodeType)
        t.push(o);
      else if (Array.isArray(o))
        s = Za(t, o, d) || s;
      else if (f === "function")
        if (n) {
          for (; typeof o == "function"; )
            o = o();
          s = Za(
            t,
            Array.isArray(o) ? o : [o],
            Array.isArray(d) ? d : [d]
          ) || s;
        } else
          t.push(o), s = !0;
      else {
        const m = String(o);
        d && d.nodeType === 3 && d.data === m ? t.push(d) : t.push(document.createTextNode(m));
      }
  }
  return s;
}
function Ko(t, e, r = null) {
  for (let n = 0, s = e.length; n < s; n++)
    t.insertBefore(e[n], r);
}
function Ir(t, e, r, n) {
  if (r === void 0)
    return t.textContent = "";
  const s = n || document.createTextNode("");
  if (e.length) {
    let u = !1;
    for (let l = e.length - 1; l >= 0; l--) {
      const o = e[l];
      if (s !== o) {
        const d = o.parentNode === t;
        !u && !l ? d ? t.replaceChild(s, o) : t.insertBefore(s, r) : d && o.remove();
      } else
        u = !0;
    }
  } else
    t.insertBefore(s, r);
  return [s];
}
function Ff(t) {
  const e = Object.keys(t), r = {};
  for (let n = 0; n < e.length; n++) {
    const [s, u] = Li(t[e[n]]);
    Object.defineProperty(r, e[n], {
      get: s,
      set(l) {
        u(() => l);
      }
    });
  }
  return r;
}
function Zf(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function Hf(t) {
  return (e, r) => {
    const { element: n } = r;
    return Vf((s) => {
      const u = Ff(e);
      n.addPropertyChangedCallback((o, d) => u[o] = d), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", s();
      });
      const l = t(u, r);
      return ie(n.renderRoot, l);
    }, Zf(n));
  };
}
function Wf(t, e, r) {
  return arguments.length === 2 && (r = e, e = {}), Pf(t, e)(Hf(r));
}
const Jf = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.fixed{position:fixed}.right-5{right:1.25rem}.top-5{top:1.25rem}.col-span-2{grid-column:span 2 / span 2}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-auto{margin-left:auto;margin-right:auto}.mb-1{margin-bottom:.25rem}.mb-16{margin-bottom:4rem}.ml-10{margin-left:2.5rem}.mr-1{margin-right:.25rem}.mt-4{margin-top:1rem}.mt-8{margin-top:2rem}.block{display:block}.inline{display:inline}.flex{display:flex}.grid{display:grid}.h-10{height:2.5rem}.h-14{height:3.5rem}.h-2{height:.5rem}.h-4{height:1rem}.max-h-\\[90vh\\]{max-height:90vh}.w-10{width:2.5rem}.w-14{width:3.5rem}.w-4{width:1rem}.max-w-\\[calc\\(100vw-96px\\)\\]{max-width:calc(100vw - 96px)}.max-w-screen-sm{max-width:640px}.flex-1{flex:1 1 0%}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-4{gap:1rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-md{border-radius:.375rem}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity))}.bg-blue-500{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop\\:bg-gray-800::backdrop{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.backdrop\\:opacity-90::backdrop{opacity:.9}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))}.hover\\:underline:hover{text-decoration-line:underline}.dark\\:border-slate-800:where(.dark,.dark *){--tw-border-opacity: 1;border-color:rgb(30 41 59 / var(--tw-border-opacity))}.dark\\:bg-slate-800:where(.dark,.dark *){--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity))}.dark\\:text-slate-400:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity))}.dark\\:text-white:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}';
var B = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wl(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var to = {}, ai = {}, ro = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.DisallowedDomainError = t.UnsupportedDomainError = t.ReservedHandleError = t.InvalidHandleError = t.isValidTld = t.isValidHandle = t.normalizeAndEnsureValidHandle = t.normalizeHandle = t.ensureValidHandleRegex = t.ensureValidHandle = t.DISALLOWED_TLDS = t.INVALID_HANDLE = void 0, t.INVALID_HANDLE = "handle.invalid", t.DISALLOWED_TLDS = [
    ".local",
    ".arpa",
    ".invalid",
    ".localhost",
    ".internal",
    ".example",
    ".alt",
    // policy could concievably change on ".onion" some day
    ".onion"
    // NOTE: .test is allowed in testing and devopment. In practical terms
    // "should" "never" actually resolve and get registered in production
  ];
  const e = (E) => {
    if (!/^[a-zA-Z0-9.-]*$/.test(E))
      throw new o("Disallowed characters in handle (ASCII letters, digits, dashes, periods only)");
    if (E.length > 253)
      throw new o("Handle is too long (253 chars max)");
    const h = E.split(".");
    if (h.length < 2)
      throw new o("Handle domain needs at least two parts");
    for (let v = 0; v < h.length; v++) {
      const T = h[v];
      if (T.length < 1)
        throw new o("Handle parts can not be empty");
      if (T.length > 63)
        throw new o("Handle part too long (max 63 chars)");
      if (T.endsWith("-") || T.startsWith("-"))
        throw new o("Handle parts can not start or end with hyphens");
      if (v + 1 == h.length && !/^[a-zA-Z]/.test(T))
        throw new o("Handle final component (TLD) must start with ASCII letter");
    }
  };
  t.ensureValidHandle = e;
  const r = (E) => {
    if (!/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(E))
      throw new o("Handle didn't validate via regex");
    if (E.length > 253)
      throw new o("Handle is too long (253 chars max)");
  };
  t.ensureValidHandleRegex = r;
  const n = (E) => E.toLowerCase();
  t.normalizeHandle = n;
  const s = (E) => {
    const h = (0, t.normalizeHandle)(E);
    return (0, t.ensureValidHandle)(h), h;
  };
  t.normalizeAndEnsureValidHandle = s;
  const u = (E) => {
    try {
      (0, t.ensureValidHandle)(E);
    } catch (h) {
      if (h instanceof o)
        return !1;
      throw h;
    }
    return !0;
  };
  t.isValidHandle = u;
  const l = (E) => !t.DISALLOWED_TLDS.some((h) => E.endsWith(h));
  t.isValidTld = l;
  class o extends Error {
  }
  t.InvalidHandleError = o;
  class d extends Error {
  }
  t.ReservedHandleError = d;
  class f extends Error {
  }
  t.UnsupportedDomainError = f;
  class m extends Error {
  }
  t.DisallowedDomainError = m;
})(ro);
var Ct = {};
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.InvalidDidError = Ct.ensureValidDidRegex = Ct.ensureValidDid = void 0;
const Qf = (t) => {
  if (!/^[a-zA-Z0-9._:%-]*$/.test(t))
    throw new vt("Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)");
  const e = t.split(":");
  if (e.length < 3)
    throw new vt("DID requires prefix, method, and method-specific content");
  if (e[0] != "did")
    throw new vt('DID requires "did:" prefix');
  if (!/^[a-z]+$/.test(e[1]))
    throw new vt("DID method must be lower-case letters");
  if (t.endsWith(":") || t.endsWith("%"))
    throw new vt('DID can not end with ":" or "%"');
  if (t.length > 2 * 1024)
    throw new vt("DID is too long (2048 chars max)");
};
Ct.ensureValidDid = Qf;
const Yf = (t) => {
  if (!/^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/.test(t))
    throw new vt("DID didn't validate via regex");
  if (t.length > 2 * 1024)
    throw new vt("DID is too long (2048 chars max)");
};
Ct.ensureValidDidRegex = Yf;
class vt extends Error {
}
Ct.InvalidDidError = vt;
var io = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.InvalidNsidError = t.ensureValidNsidRegex = t.ensureValidNsid = t.NSID = void 0;
  class e {
    static parse(l) {
      return new e(l);
    }
    static create(l, o) {
      const d = [...l.split(".").reverse(), o].join(".");
      return new e(d);
    }
    static isValid(l) {
      try {
        return e.parse(l), !0;
      } catch {
        return !1;
      }
    }
    constructor(l) {
      Object.defineProperty(this, "segments", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), (0, t.ensureValidNsid)(l), this.segments = l.split(".");
    }
    get authority() {
      return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
    }
    get name() {
      return this.segments.at(this.segments.length - 1);
    }
    toString() {
      return this.segments.join(".");
    }
  }
  t.NSID = e;
  const r = (u) => {
    const l = u;
    if (!/^[a-zA-Z0-9.-]*$/.test(l))
      throw new s("Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)");
    if (l.length > 317)
      throw new s("NSID is too long (317 chars max)");
    const o = l.split(".");
    if (o.length < 3)
      throw new s("NSID needs at least three parts");
    for (let d = 0; d < o.length; d++) {
      const f = o[d];
      if (f.length < 1)
        throw new s("NSID parts can not be empty");
      if (f.length > 63)
        throw new s("NSID part too long (max 63 chars)");
      if (f.endsWith("-") || f.startsWith("-"))
        throw new s("NSID parts can not start or end with hyphen");
      if (/^[0-9]/.test(f) && d == 0)
        throw new s("NSID first part may not start with a digit");
      if (!/^[a-zA-Z]+$/.test(f) && d + 1 == o.length)
        throw new s("NSID name part must be only letters");
    }
  };
  t.ensureValidNsid = r;
  const n = (u) => {
    if (!/^[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(\.[a-zA-Z]([a-zA-Z]{0,61}[a-zA-Z])?)$/.test(u))
      throw new s("NSID didn't validate via regex");
    if (u.length > 317)
      throw new s("NSID is too long (317 chars max)");
  };
  t.ensureValidNsidRegex = n;
  class s extends Error {
  }
  t.InvalidNsidError = s;
})(io);
var Jl = {}, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.ensureValidAtUriRegex = $r.ensureValidAtUri = void 0;
const Ql = ro, Yl = Ct, eu = io, ed = (t) => {
  const e = t.split("#");
  if (e.length > 2)
    throw new Error('ATURI can have at most one "#", separating fragment out');
  const r = e[1] || null;
  if (t = e[0], !/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(t))
    throw new Error("Disallowed characters in ATURI (ASCII)");
  const n = t.split("/");
  if (n.length >= 3 && (n[0] != "at:" || n[1].length != 0))
    throw new Error('ATURI must start with "at://"');
  if (n.length < 3)
    throw new Error("ATURI requires at least method and authority sections");
  try {
    n[2].startsWith("did:") ? (0, Yl.ensureValidDid)(n[2]) : (0, Ql.ensureValidHandle)(n[2]);
  } catch {
    throw new Error("ATURI authority must be a valid handle or DID");
  }
  if (n.length >= 4) {
    if (n[3].length == 0)
      throw new Error("ATURI can not have a slash after authority without a path segment");
    try {
      (0, eu.ensureValidNsid)(n[3]);
    } catch {
      throw new Error("ATURI requires first path segment (if supplied) to be valid NSID");
    }
  }
  if (n.length >= 5 && n[4].length == 0)
    throw new Error("ATURI can not have a slash after collection, unless record key is provided");
  if (n.length >= 6)
    throw new Error("ATURI path can have at most two parts, and no trailing slash");
  if (e.length >= 2 && r == null)
    throw new Error("ATURI fragment must be non-empty and start with slash");
  if (r != null) {
    if (r.length == 0 || r[0] != "/")
      throw new Error("ATURI fragment must be non-empty and start with slash");
    if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(r))
      throw new Error("Disallowed characters in ATURI fragment (ASCII)");
  }
  if (t.length > 8 * 1024)
    throw new Error("ATURI is far too long");
};
$r.ensureValidAtUri = ed;
const td = (t) => {
  const e = /^at:\/\/(?<authority>[a-zA-Z0-9._:%-]+)(\/(?<collection>[a-zA-Z0-9-.]+)(\/(?<rkey>[a-zA-Z0-9._~:@!$&%')(*+,;=-]+))?)?(#(?<fragment>\/[a-zA-Z0-9._~:@!$&%')(*+,;=\-[\]/\\]*))?$/, r = t.match(e);
  if (!r || !r.groups)
    throw new Error("ATURI didn't validate via regex");
  const n = r.groups;
  try {
    (0, Ql.ensureValidHandleRegex)(n.authority);
  } catch {
    try {
      (0, Yl.ensureValidDidRegex)(n.authority);
    } catch {
      throw new Error("ATURI authority must be a valid handle or DID");
    }
  }
  if (n.collection)
    try {
      (0, eu.ensureValidNsidRegex)(n.collection);
    } catch {
      throw new Error("ATURI collection path segment must be a valid NSID");
    }
  if (t.length > 8 * 1024)
    throw new Error("ATURI is far too long");
};
$r.ensureValidAtUriRegex = td;
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(o, d, f, m) {
    m === void 0 && (m = f);
    var E = Object.getOwnPropertyDescriptor(d, f);
    (!E || ("get" in E ? !d.__esModule : E.writable || E.configurable)) && (E = { enumerable: !0, get: function() {
      return d[f];
    } }), Object.defineProperty(o, m, E);
  } : function(o, d, f, m) {
    m === void 0 && (m = f), o[m] = d[f];
  }), r = B && B.__exportStar || function(o, d) {
    for (var f in o)
      f !== "default" && !Object.prototype.hasOwnProperty.call(d, f) && e(d, o, f);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.AtUri = t.ATP_URI_REGEX = void 0, r($r, t), t.ATP_URI_REGEX = // proto-    --did--------------   --name----------------   --path----   --query--   --hash--
  /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
  const n = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
  class s {
    constructor(d, f) {
      Object.defineProperty(this, "hash", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "host", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "pathname", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "searchParams", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      });
      let m;
      if (f) {
        if (m = u(f), !m)
          throw new Error(`Invalid at uri: ${f}`);
        const E = l(d);
        if (!E)
          throw new Error(`Invalid path: ${d}`);
        Object.assign(m, E);
      } else if (m = u(d), !m)
        throw new Error(`Invalid at uri: ${d}`);
      this.hash = m.hash, this.host = m.host, this.pathname = m.pathname, this.searchParams = m.searchParams;
    }
    static make(d, f, m) {
      let E = d;
      return f && (E += "/" + f), m && (E += "/" + m), new s(E);
    }
    get protocol() {
      return "at:";
    }
    get origin() {
      return `at://${this.host}`;
    }
    get hostname() {
      return this.host;
    }
    set hostname(d) {
      this.host = d;
    }
    get search() {
      return this.searchParams.toString();
    }
    set search(d) {
      this.searchParams = new URLSearchParams(d);
    }
    get collection() {
      return this.pathname.split("/").filter(Boolean)[0] || "";
    }
    set collection(d) {
      const f = this.pathname.split("/").filter(Boolean);
      f[0] = d, this.pathname = f.join("/");
    }
    get rkey() {
      return this.pathname.split("/").filter(Boolean)[1] || "";
    }
    set rkey(d) {
      const f = this.pathname.split("/").filter(Boolean);
      f[0] || (f[0] = "undefined"), f[1] = d, this.pathname = f.join("/");
    }
    get href() {
      return this.toString();
    }
    toString() {
      let d = this.pathname || "/";
      d.startsWith("/") || (d = `/${d}`);
      let f = this.searchParams.toString();
      f && !f.startsWith("?") && (f = `?${f}`);
      let m = this.hash;
      return m && !m.startsWith("#") && (m = `#${m}`), `at://${this.host}${d}${f}${m}`;
    }
  }
  t.AtUri = s;
  function u(o) {
    const d = t.ATP_URI_REGEX.exec(o);
    if (d)
      return {
        hash: d[5] || "",
        host: d[2] || "",
        pathname: d[3] || "",
        searchParams: new URLSearchParams(d[4] || "")
      };
  }
  function l(o) {
    const d = n.exec(o);
    if (d)
      return {
        hash: d[3] || "",
        pathname: d[1] || "",
        searchParams: new URLSearchParams(d[2] || "")
      };
  }
})(Jl);
var tu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.InvalidTidError = t.isValidTid = t.ensureValidTid = void 0;
  const e = (s) => {
    if (s.length != 13)
      throw new n("TID must be 13 characters");
    if (!/^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(s))
      throw new n("TID syntax not valid (regex)");
  };
  t.ensureValidTid = e;
  const r = (s) => {
    try {
      (0, t.ensureValidTid)(s);
    } catch (u) {
      if (u instanceof n)
        return !1;
      throw u;
    }
    return !0;
  };
  t.isValidTid = r;
  class n extends Error {
  }
  t.InvalidTidError = n;
})(tu);
var ru = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.InvalidRecordKeyError = t.isValidRecordKey = t.ensureValidRecordKey = void 0;
  const e = (s) => {
    if (s.length > 512 || s.length < 1)
      throw new n("record key must be 1 to 512 characters");
    if (!/^[a-zA-Z0-9_~.:-]{1,512}$/.test(s))
      throw new n("record key syntax not valid (regex)");
    if (s == "." || s == "..")
      throw new n('record key can not be "." or ".."');
  };
  t.ensureValidRecordKey = e;
  const r = (s) => {
    try {
      (0, t.ensureValidRecordKey)(s);
    } catch (u) {
      if (u instanceof n)
        return !1;
      throw u;
    }
    return !0;
  };
  t.isValidRecordKey = r;
  class n extends Error {
  }
  t.InvalidRecordKeyError = n;
})(ru);
var iu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.InvalidDatetimeError = t.normalizeDatetimeAlways = t.normalizeDatetime = t.isValidDatetime = t.ensureValidDatetime = void 0;
  const e = (l) => {
    const o = new Date(l);
    if (isNaN(o.getTime()))
      throw new u("datetime did not parse as ISO 8601");
    if (o.toISOString().startsWith("-"))
      throw new u("datetime normalized to a negative time");
    if (!/^[0-9]{4}-[01][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9](.[0-9]{1,20})?(Z|([+-][0-2][0-9]:[0-5][0-9]))$/.test(l))
      throw new u("datetime didn't validate via regex");
    if (l.length > 64)
      throw new u("datetime is too long (64 chars max)");
    if (l.endsWith("-00:00"))
      throw new u('datetime can not use "-00:00" for UTC timezone');
    if (l.startsWith("000"))
      throw new u("datetime so close to year zero not allowed");
  };
  t.ensureValidDatetime = e;
  const r = (l) => {
    try {
      (0, t.ensureValidDatetime)(l);
    } catch (o) {
      if (o instanceof u)
        return !1;
      throw o;
    }
    return !0;
  };
  t.isValidDatetime = r;
  const n = (l) => {
    if ((0, t.isValidDatetime)(l)) {
      const f = new Date(l).toISOString();
      if ((0, t.isValidDatetime)(f))
        return f;
    }
    if (!/.*(([+-]\d\d:?\d\d)|[a-zA-Z])$/.test(l)) {
      const f = /* @__PURE__ */ new Date(l + "Z");
      if (!isNaN(f.getTime())) {
        const m = f.toISOString();
        if ((0, t.isValidDatetime)(m))
          return m;
      }
    }
    const o = new Date(l);
    if (isNaN(o.getTime()))
      throw new u("datetime did not parse as any timestamp format");
    const d = o.toISOString();
    if ((0, t.isValidDatetime)(d))
      return d;
    throw new u("datetime normalized to invalid timestamp string");
  };
  t.normalizeDatetime = n;
  const s = (l) => {
    try {
      return (0, t.normalizeDatetime)(l);
    } catch (o) {
      if (o instanceof u)
        return (/* @__PURE__ */ new Date(0)).toISOString();
      throw o;
    }
  };
  t.normalizeDatetimeAlways = s;
  class u extends Error {
  }
  t.InvalidDatetimeError = u;
})(iu);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(n, s, u, l) {
    l === void 0 && (l = u);
    var o = Object.getOwnPropertyDescriptor(s, u);
    (!o || ("get" in o ? !s.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return s[u];
    } }), Object.defineProperty(n, l, o);
  } : function(n, s, u, l) {
    l === void 0 && (l = u), n[l] = s[u];
  }), r = B && B.__exportStar || function(n, s) {
    for (var u in n)
      u !== "default" && !Object.prototype.hasOwnProperty.call(s, u) && e(s, n, u);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), r(ro, t), r(Ct, t), r(io, t), r(Jl, t), r(tu, t), r(ru, t), r(iu, t);
})(ai);
var Ui = {}, Oa = {}, Sr = {}, Ha = {}, ut = {}, ca = {}, Vi = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.getParsedType = t.ZodParsedType = t.objectUtil = t.util = void 0;
  var e;
  (function(n) {
    n.assertEqual = (o) => o;
    function s(o) {
    }
    n.assertIs = s;
    function u(o) {
      throw new Error();
    }
    n.assertNever = u, n.arrayToEnum = (o) => {
      const d = {};
      for (const f of o)
        d[f] = f;
      return d;
    }, n.getValidEnumValues = (o) => {
      const d = n.objectKeys(o).filter((m) => typeof o[o[m]] != "number"), f = {};
      for (const m of d)
        f[m] = o[m];
      return n.objectValues(f);
    }, n.objectValues = (o) => n.objectKeys(o).map(function(d) {
      return o[d];
    }), n.objectKeys = typeof Object.keys == "function" ? (o) => Object.keys(o) : (o) => {
      const d = [];
      for (const f in o)
        Object.prototype.hasOwnProperty.call(o, f) && d.push(f);
      return d;
    }, n.find = (o, d) => {
      for (const f of o)
        if (d(f))
          return f;
    }, n.isInteger = typeof Number.isInteger == "function" ? (o) => Number.isInteger(o) : (o) => typeof o == "number" && isFinite(o) && Math.floor(o) === o;
    function l(o, d = " | ") {
      return o.map((f) => typeof f == "string" ? `'${f}'` : f).join(d);
    }
    n.joinValues = l, n.jsonStringifyReplacer = (o, d) => typeof d == "bigint" ? d.toString() : d;
  })(e = t.util || (t.util = {})), function(n) {
    n.mergeShapes = (s, u) => ({
      ...s,
      ...u
      // second overwrites first
    });
  }(t.objectUtil || (t.objectUtil = {})), t.ZodParsedType = e.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  const r = (n) => {
    switch (typeof n) {
      case "undefined":
        return t.ZodParsedType.undefined;
      case "string":
        return t.ZodParsedType.string;
      case "number":
        return isNaN(n) ? t.ZodParsedType.nan : t.ZodParsedType.number;
      case "boolean":
        return t.ZodParsedType.boolean;
      case "function":
        return t.ZodParsedType.function;
      case "bigint":
        return t.ZodParsedType.bigint;
      case "symbol":
        return t.ZodParsedType.symbol;
      case "object":
        return Array.isArray(n) ? t.ZodParsedType.array : n === null ? t.ZodParsedType.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? t.ZodParsedType.promise : typeof Map < "u" && n instanceof Map ? t.ZodParsedType.map : typeof Set < "u" && n instanceof Set ? t.ZodParsedType.set : typeof Date < "u" && n instanceof Date ? t.ZodParsedType.date : t.ZodParsedType.object;
      default:
        return t.ZodParsedType.unknown;
    }
  };
  t.getParsedType = r;
})(Vi);
var ct = {};
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.ZodError = ct.quotelessJson = ct.ZodIssueCode = void 0;
const nu = Vi;
ct.ZodIssueCode = nu.util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
const rd = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
ct.quotelessJson = rd;
class ki extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const r = e || function(u) {
      return u.message;
    }, n = { _errors: [] }, s = (u) => {
      for (const l of u.issues)
        if (l.code === "invalid_union")
          l.unionErrors.map(s);
        else if (l.code === "invalid_return_type")
          s(l.returnTypeError);
        else if (l.code === "invalid_arguments")
          s(l.argumentsError);
        else if (l.path.length === 0)
          n._errors.push(r(l));
        else {
          let o = n, d = 0;
          for (; d < l.path.length; ) {
            const f = l.path[d];
            d === l.path.length - 1 ? (o[f] = o[f] || { _errors: [] }, o[f]._errors.push(r(l))) : o[f] = o[f] || { _errors: [] }, o = o[f], d++;
          }
        }
    };
    return s(this), n;
  }
  static assert(e) {
    if (!(e instanceof ki))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, nu.util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, n = [];
    for (const s of this.issues)
      s.path.length > 0 ? (r[s.path[0]] = r[s.path[0]] || [], r[s.path[0]].push(e(s))) : n.push(e(s));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
ct.ZodError = ki;
ki.create = (t) => new ki(t);
Object.defineProperty(ca, "__esModule", { value: !0 });
const or = Vi, Ae = ct, id = (t, e) => {
  let r;
  switch (t.code) {
    case Ae.ZodIssueCode.invalid_type:
      t.received === or.ZodParsedType.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case Ae.ZodIssueCode.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, or.util.jsonStringifyReplacer)}`;
      break;
    case Ae.ZodIssueCode.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${or.util.joinValues(t.keys, ", ")}`;
      break;
    case Ae.ZodIssueCode.invalid_union:
      r = "Invalid input";
      break;
    case Ae.ZodIssueCode.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${or.util.joinValues(t.options)}`;
      break;
    case Ae.ZodIssueCode.invalid_enum_value:
      r = `Invalid enum value. Expected ${or.util.joinValues(t.options)}, received '${t.received}'`;
      break;
    case Ae.ZodIssueCode.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case Ae.ZodIssueCode.invalid_return_type:
      r = "Invalid function return type";
      break;
    case Ae.ZodIssueCode.invalid_date:
      r = "Invalid date";
      break;
    case Ae.ZodIssueCode.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : or.util.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case Ae.ZodIssueCode.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case Ae.ZodIssueCode.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case Ae.ZodIssueCode.custom:
      r = "Invalid input";
      break;
    case Ae.ZodIssueCode.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case Ae.ZodIssueCode.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case Ae.ZodIssueCode.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, or.util.assertNever(t);
  }
  return { message: r };
};
ca.default = id;
var nd = B && B.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.getErrorMap = ut.setErrorMap = ut.defaultErrorMap = void 0;
const su = nd(ca);
ut.defaultErrorMap = su.default;
let au = su.default;
function sd(t) {
  au = t;
}
ut.setErrorMap = sd;
function ad() {
  return au;
}
ut.getErrorMap = ad;
var no = {};
(function(t) {
  var e = B && B.__importDefault || function(v) {
    return v && v.__esModule ? v : { default: v };
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.isAsync = t.isValid = t.isDirty = t.isAborted = t.OK = t.DIRTY = t.INVALID = t.ParseStatus = t.addIssueToContext = t.EMPTY_PATH = t.makeIssue = void 0;
  const r = ut, n = e(ca), s = (v) => {
    const { data: T, path: _, errorMaps: w, issueData: A } = v, L = [..._, ...A.path || []], K = {
      ...A,
      path: L
    };
    if (A.message !== void 0)
      return {
        ...A,
        path: L,
        message: A.message
      };
    let V = "";
    const N = w.filter((q) => !!q).slice().reverse();
    for (const q of N)
      V = q(K, { data: T, defaultError: V }).message;
    return {
      ...A,
      path: L,
      message: V
    };
  };
  t.makeIssue = s, t.EMPTY_PATH = [];
  function u(v, T) {
    const _ = (0, r.getErrorMap)(), w = (0, t.makeIssue)({
      issueData: T,
      data: v.data,
      path: v.path,
      errorMaps: [
        v.common.contextualErrorMap,
        v.schemaErrorMap,
        _,
        _ === n.default ? void 0 : n.default
        // then global default map
      ].filter((A) => !!A)
    });
    v.common.issues.push(w);
  }
  t.addIssueToContext = u;
  class l {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(T, _) {
      const w = [];
      for (const A of _) {
        if (A.status === "aborted")
          return t.INVALID;
        A.status === "dirty" && T.dirty(), w.push(A.value);
      }
      return { status: T.value, value: w };
    }
    static async mergeObjectAsync(T, _) {
      const w = [];
      for (const A of _) {
        const L = await A.key, K = await A.value;
        w.push({
          key: L,
          value: K
        });
      }
      return l.mergeObjectSync(T, w);
    }
    static mergeObjectSync(T, _) {
      const w = {};
      for (const A of _) {
        const { key: L, value: K } = A;
        if (L.status === "aborted" || K.status === "aborted")
          return t.INVALID;
        L.status === "dirty" && T.dirty(), K.status === "dirty" && T.dirty(), L.value !== "__proto__" && (typeof K.value < "u" || A.alwaysSet) && (w[L.value] = K.value);
      }
      return { status: T.value, value: w };
    }
  }
  t.ParseStatus = l, t.INVALID = Object.freeze({
    status: "aborted"
  });
  const o = (v) => ({ status: "dirty", value: v });
  t.DIRTY = o;
  const d = (v) => ({ status: "valid", value: v });
  t.OK = d;
  const f = (v) => v.status === "aborted";
  t.isAborted = f;
  const m = (v) => v.status === "dirty";
  t.isDirty = m;
  const E = (v) => v.status === "valid";
  t.isValid = E;
  const h = (v) => typeof Promise < "u" && v instanceof Promise;
  t.isAsync = h;
})(no);
var ou = {};
Object.defineProperty(ou, "__esModule", { value: !0 });
var lu = {}, uu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.errorUtil = void 0, function(e) {
    e.errToObj = (r) => typeof r == "string" ? { message: r } : r || {}, e.toString = (r) => typeof r == "string" ? r : r?.message;
  }(t.errorUtil || (t.errorUtil = {}));
})(uu);
(function(t) {
  var e = B && B.__classPrivateFieldGet || function(x, a, p, b) {
    if (p === "a" && !b)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof a == "function" ? x !== a || !b : !a.has(x))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return p === "m" ? b : p === "a" ? b.call(x) : b ? b.value : a.get(x);
  }, r = B && B.__classPrivateFieldSet || function(x, a, p, b, R) {
    if (b === "m")
      throw new TypeError("Private method is not writable");
    if (b === "a" && !R)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof a == "function" ? x !== a || !R : !a.has(x))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return b === "a" ? R.call(x, p) : R ? R.value = p : a.set(x, p), p;
  }, n, s;
  Object.defineProperty(t, "__esModule", { value: !0 }), t.boolean = t.bigint = t.array = t.any = t.coerce = t.ZodFirstPartyTypeKind = t.late = t.ZodSchema = t.Schema = t.custom = t.ZodReadonly = t.ZodPipeline = t.ZodBranded = t.BRAND = t.ZodNaN = t.ZodCatch = t.ZodDefault = t.ZodNullable = t.ZodOptional = t.ZodTransformer = t.ZodEffects = t.ZodPromise = t.ZodNativeEnum = t.ZodEnum = t.ZodLiteral = t.ZodLazy = t.ZodFunction = t.ZodSet = t.ZodMap = t.ZodRecord = t.ZodTuple = t.ZodIntersection = t.ZodDiscriminatedUnion = t.ZodUnion = t.ZodObject = t.ZodArray = t.ZodVoid = t.ZodNever = t.ZodUnknown = t.ZodAny = t.ZodNull = t.ZodUndefined = t.ZodSymbol = t.ZodDate = t.ZodBoolean = t.ZodBigInt = t.ZodNumber = t.ZodString = t.datetimeRegex = t.ZodType = void 0, t.NEVER = t.void = t.unknown = t.union = t.undefined = t.tuple = t.transformer = t.symbol = t.string = t.strictObject = t.set = t.record = t.promise = t.preprocess = t.pipeline = t.ostring = t.optional = t.onumber = t.oboolean = t.object = t.number = t.nullable = t.null = t.never = t.nativeEnum = t.nan = t.map = t.literal = t.lazy = t.intersection = t.instanceof = t.function = t.enum = t.effect = t.discriminatedUnion = t.date = void 0;
  const u = ut, l = uu, o = no, d = Vi, f = ct;
  class m {
    constructor(a, p, b, R) {
      this._cachedPath = [], this.parent = a, this.data = p, this._path = b, this._key = R;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }
  const E = (x, a) => {
    if ((0, o.isValid)(a))
      return { success: !0, data: a.value };
    if (!x.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error)
          return this._error;
        const p = new f.ZodError(x.common.issues);
        return this._error = p, this._error;
      }
    };
  };
  function h(x) {
    if (!x)
      return {};
    const { errorMap: a, invalid_type_error: p, required_error: b, description: R } = x;
    if (a && (p || b))
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return a ? { errorMap: a, description: R } : { errorMap: (D, k) => {
      var O, j;
      const { message: X } = x;
      return D.code === "invalid_enum_value" ? { message: X ?? k.defaultError } : typeof k.data > "u" ? { message: (O = X ?? b) !== null && O !== void 0 ? O : k.defaultError } : D.code !== "invalid_type" ? { message: k.defaultError } : { message: (j = X ?? p) !== null && j !== void 0 ? j : k.defaultError };
    }, description: R };
  }
  class v {
    constructor(a) {
      this.spa = this.safeParseAsync, this._def = a, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(a) {
      return (0, d.getParsedType)(a.data);
    }
    _getOrReturnCtx(a, p) {
      return p || {
        common: a.parent.common,
        data: a.data,
        parsedType: (0, d.getParsedType)(a.data),
        schemaErrorMap: this._def.errorMap,
        path: a.path,
        parent: a.parent
      };
    }
    _processInputParams(a) {
      return {
        status: new o.ParseStatus(),
        ctx: {
          common: a.parent.common,
          data: a.data,
          parsedType: (0, d.getParsedType)(a.data),
          schemaErrorMap: this._def.errorMap,
          path: a.path,
          parent: a.parent
        }
      };
    }
    _parseSync(a) {
      const p = this._parse(a);
      if ((0, o.isAsync)(p))
        throw new Error("Synchronous parse encountered promise.");
      return p;
    }
    _parseAsync(a) {
      const p = this._parse(a);
      return Promise.resolve(p);
    }
    parse(a, p) {
      const b = this.safeParse(a, p);
      if (b.success)
        return b.data;
      throw b.error;
    }
    safeParse(a, p) {
      var b;
      const R = {
        common: {
          issues: [],
          async: (b = p?.async) !== null && b !== void 0 ? b : !1,
          contextualErrorMap: p?.errorMap
        },
        path: p?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: a,
        parsedType: (0, d.getParsedType)(a)
      }, g = this._parseSync({ data: a, path: R.path, parent: R });
      return E(R, g);
    }
    async parseAsync(a, p) {
      const b = await this.safeParseAsync(a, p);
      if (b.success)
        return b.data;
      throw b.error;
    }
    async safeParseAsync(a, p) {
      const b = {
        common: {
          issues: [],
          contextualErrorMap: p?.errorMap,
          async: !0
        },
        path: p?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: a,
        parsedType: (0, d.getParsedType)(a)
      }, R = this._parse({ data: a, path: b.path, parent: b }), g = await ((0, o.isAsync)(R) ? R : Promise.resolve(R));
      return E(b, g);
    }
    refine(a, p) {
      const b = (R) => typeof p == "string" || typeof p > "u" ? { message: p } : typeof p == "function" ? p(R) : p;
      return this._refinement((R, g) => {
        const D = a(R), k = () => g.addIssue({
          code: f.ZodIssueCode.custom,
          ...b(R)
        });
        return typeof Promise < "u" && D instanceof Promise ? D.then((O) => O ? !0 : (k(), !1)) : D ? !0 : (k(), !1);
      });
    }
    refinement(a, p) {
      return this._refinement((b, R) => a(b) ? !0 : (R.addIssue(typeof p == "function" ? p(b, R) : p), !1));
    }
    _refinement(a) {
      return new ze({
        schema: this,
        typeName: M.ZodEffects,
        effect: { type: "refinement", refinement: a }
      });
    }
    superRefine(a) {
      return this._refinement(a);
    }
    optional() {
      return et.create(this, this._def);
    }
    nullable() {
      return qt.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return Xe.create(this, this._def);
    }
    promise() {
      return Vr.create(this, this._def);
    }
    or(a) {
      return di.create([this, a], this._def);
    }
    and(a) {
      return bi.create(this, a, this._def);
    }
    transform(a) {
      return new ze({
        ...h(this._def),
        schema: this,
        typeName: M.ZodEffects,
        effect: { type: "transform", transform: a }
      });
    }
    default(a) {
      const p = typeof a == "function" ? a : () => a;
      return new xi({
        ...h(this._def),
        innerType: this,
        defaultValue: p,
        typeName: M.ZodDefault
      });
    }
    brand() {
      return new Pa({
        typeName: M.ZodBranded,
        type: this,
        ...h(this._def)
      });
    }
    catch(a) {
      const p = typeof a == "function" ? a : () => a;
      return new gi({
        ...h(this._def),
        innerType: this,
        catchValue: p,
        typeName: M.ZodCatch
      });
    }
    describe(a) {
      const p = this.constructor;
      return new p({
        ...this._def,
        description: a
      });
    }
    pipe(a) {
      return Ri.create(this, a);
    }
    readonly() {
      return Ai.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  t.ZodType = v, t.Schema = v, t.ZodSchema = v;
  const T = /^c[^\s-]{8,}$/i, _ = /^[0-9a-z]+$/, w = /^[0-9A-HJKMNP-TV-Z]{26}$/, A = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, L = /^[a-z0-9_-]{21}$/i, K = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, V = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, N = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
  let q;
  const Z = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ee = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Pe = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Br = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", ht = new RegExp(`^${Br}$`);
  function Ps(x) {
    let a = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return x.precision ? a = `${a}\\.\\d{${x.precision}}` : x.precision == null && (a = `${a}(\\.\\d+)?`), a;
  }
  function Ba(x) {
    return new RegExp(`^${Ps(x)}$`);
  }
  function Dr(x) {
    let a = `${Br}T${Ps(x)}`;
    const p = [];
    return p.push(x.local ? "Z?" : "Z"), x.offset && p.push("([+-]\\d{2}:?\\d{2})"), a = `${a}(${p.join("|")})`, new RegExp(`^${a}$`);
  }
  t.datetimeRegex = Dr;
  function Mp(x, a) {
    return !!((a === "v4" || !a) && Z.test(x) || (a === "v6" || !a) && ee.test(x));
  }
  class qe extends v {
    _parse(a) {
      if (this._def.coerce && (a.data = String(a.data)), this._getType(a) !== d.ZodParsedType.string) {
        const g = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(g, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.string,
          received: g.parsedType
        }), o.INVALID;
      }
      const b = new o.ParseStatus();
      let R;
      for (const g of this._def.checks)
        if (g.kind === "min")
          a.data.length < g.value && (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.too_small,
            minimum: g.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: g.message
          }), b.dirty());
        else if (g.kind === "max")
          a.data.length > g.value && (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.too_big,
            maximum: g.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: g.message
          }), b.dirty());
        else if (g.kind === "length") {
          const D = a.data.length > g.value, k = a.data.length < g.value;
          (D || k) && (R = this._getOrReturnCtx(a, R), D ? (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.too_big,
            maximum: g.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: g.message
          }) : k && (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.too_small,
            minimum: g.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: g.message
          }), b.dirty());
        } else if (g.kind === "email")
          V.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "email",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "emoji")
          q || (q = new RegExp(N, "u")), q.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "emoji",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "uuid")
          A.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "uuid",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "nanoid")
          L.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "nanoid",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "cuid")
          T.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "cuid",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "cuid2")
          _.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "cuid2",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "ulid")
          w.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "ulid",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty());
        else if (g.kind === "url")
          try {
            new URL(a.data);
          } catch {
            R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
              validation: "url",
              code: f.ZodIssueCode.invalid_string,
              message: g.message
            }), b.dirty();
          }
        else
          g.kind === "regex" ? (g.regex.lastIndex = 0, g.regex.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "regex",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty())) : g.kind === "trim" ? a.data = a.data.trim() : g.kind === "includes" ? a.data.includes(g.value, g.position) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: { includes: g.value, position: g.position },
            message: g.message
          }), b.dirty()) : g.kind === "toLowerCase" ? a.data = a.data.toLowerCase() : g.kind === "toUpperCase" ? a.data = a.data.toUpperCase() : g.kind === "startsWith" ? a.data.startsWith(g.value) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: { startsWith: g.value },
            message: g.message
          }), b.dirty()) : g.kind === "endsWith" ? a.data.endsWith(g.value) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: { endsWith: g.value },
            message: g.message
          }), b.dirty()) : g.kind === "datetime" ? Dr(g).test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: "datetime",
            message: g.message
          }), b.dirty()) : g.kind === "date" ? ht.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: "date",
            message: g.message
          }), b.dirty()) : g.kind === "time" ? Ba(g).test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.invalid_string,
            validation: "time",
            message: g.message
          }), b.dirty()) : g.kind === "duration" ? K.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "duration",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty()) : g.kind === "ip" ? Mp(a.data, g.version) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "ip",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty()) : g.kind === "base64" ? Pe.test(a.data) || (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
            validation: "base64",
            code: f.ZodIssueCode.invalid_string,
            message: g.message
          }), b.dirty()) : d.util.assertNever(g);
      return { status: b.value, value: a.data };
    }
    _regex(a, p, b) {
      return this.refinement((R) => a.test(R), {
        validation: p,
        code: f.ZodIssueCode.invalid_string,
        ...l.errorUtil.errToObj(b)
      });
    }
    _addCheck(a) {
      return new qe({
        ...this._def,
        checks: [...this._def.checks, a]
      });
    }
    email(a) {
      return this._addCheck({ kind: "email", ...l.errorUtil.errToObj(a) });
    }
    url(a) {
      return this._addCheck({ kind: "url", ...l.errorUtil.errToObj(a) });
    }
    emoji(a) {
      return this._addCheck({ kind: "emoji", ...l.errorUtil.errToObj(a) });
    }
    uuid(a) {
      return this._addCheck({ kind: "uuid", ...l.errorUtil.errToObj(a) });
    }
    nanoid(a) {
      return this._addCheck({ kind: "nanoid", ...l.errorUtil.errToObj(a) });
    }
    cuid(a) {
      return this._addCheck({ kind: "cuid", ...l.errorUtil.errToObj(a) });
    }
    cuid2(a) {
      return this._addCheck({ kind: "cuid2", ...l.errorUtil.errToObj(a) });
    }
    ulid(a) {
      return this._addCheck({ kind: "ulid", ...l.errorUtil.errToObj(a) });
    }
    base64(a) {
      return this._addCheck({ kind: "base64", ...l.errorUtil.errToObj(a) });
    }
    ip(a) {
      return this._addCheck({ kind: "ip", ...l.errorUtil.errToObj(a) });
    }
    datetime(a) {
      var p, b;
      return typeof a == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        local: !1,
        message: a
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof a?.precision > "u" ? null : a?.precision,
        offset: (p = a?.offset) !== null && p !== void 0 ? p : !1,
        local: (b = a?.local) !== null && b !== void 0 ? b : !1,
        ...l.errorUtil.errToObj(a?.message)
      });
    }
    date(a) {
      return this._addCheck({ kind: "date", message: a });
    }
    time(a) {
      return typeof a == "string" ? this._addCheck({
        kind: "time",
        precision: null,
        message: a
      }) : this._addCheck({
        kind: "time",
        precision: typeof a?.precision > "u" ? null : a?.precision,
        ...l.errorUtil.errToObj(a?.message)
      });
    }
    duration(a) {
      return this._addCheck({ kind: "duration", ...l.errorUtil.errToObj(a) });
    }
    regex(a, p) {
      return this._addCheck({
        kind: "regex",
        regex: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    includes(a, p) {
      return this._addCheck({
        kind: "includes",
        value: a,
        position: p?.position,
        ...l.errorUtil.errToObj(p?.message)
      });
    }
    startsWith(a, p) {
      return this._addCheck({
        kind: "startsWith",
        value: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    endsWith(a, p) {
      return this._addCheck({
        kind: "endsWith",
        value: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    min(a, p) {
      return this._addCheck({
        kind: "min",
        value: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    max(a, p) {
      return this._addCheck({
        kind: "max",
        value: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    length(a, p) {
      return this._addCheck({
        kind: "length",
        value: a,
        ...l.errorUtil.errToObj(p)
      });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(a) {
      return this.min(1, l.errorUtil.errToObj(a));
    }
    trim() {
      return new qe({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new qe({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new qe({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((a) => a.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((a) => a.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((a) => a.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((a) => a.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((a) => a.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((a) => a.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((a) => a.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((a) => a.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((a) => a.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((a) => a.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((a) => a.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((a) => a.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((a) => a.kind === "ip");
    }
    get isBase64() {
      return !!this._def.checks.find((a) => a.kind === "base64");
    }
    get minLength() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "min" && (a === null || p.value > a) && (a = p.value);
      return a;
    }
    get maxLength() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "max" && (a === null || p.value < a) && (a = p.value);
      return a;
    }
  }
  t.ZodString = qe, qe.create = (x) => {
    var a;
    return new qe({
      checks: [],
      typeName: M.ZodString,
      coerce: (a = x?.coerce) !== null && a !== void 0 ? a : !1,
      ...h(x)
    });
  };
  function Gp(x, a) {
    const p = (x.toString().split(".")[1] || "").length, b = (a.toString().split(".")[1] || "").length, R = p > b ? p : b, g = parseInt(x.toFixed(R).replace(".", "")), D = parseInt(a.toFixed(R).replace(".", ""));
    return g % D / Math.pow(10, R);
  }
  class $t extends v {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(a) {
      if (this._def.coerce && (a.data = Number(a.data)), this._getType(a) !== d.ZodParsedType.number) {
        const g = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(g, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.number,
          received: g.parsedType
        }), o.INVALID;
      }
      let b;
      const R = new o.ParseStatus();
      for (const g of this._def.checks)
        g.kind === "int" ? d.util.isInteger(a.data) || (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: "integer",
          received: "float",
          message: g.message
        }), R.dirty()) : g.kind === "min" ? (g.inclusive ? a.data < g.value : a.data <= g.value) && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.too_small,
          minimum: g.value,
          type: "number",
          inclusive: g.inclusive,
          exact: !1,
          message: g.message
        }), R.dirty()) : g.kind === "max" ? (g.inclusive ? a.data > g.value : a.data >= g.value) && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.too_big,
          maximum: g.value,
          type: "number",
          inclusive: g.inclusive,
          exact: !1,
          message: g.message
        }), R.dirty()) : g.kind === "multipleOf" ? Gp(a.data, g.value) !== 0 && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.not_multiple_of,
          multipleOf: g.value,
          message: g.message
        }), R.dirty()) : g.kind === "finite" ? Number.isFinite(a.data) || (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.not_finite,
          message: g.message
        }), R.dirty()) : d.util.assertNever(g);
      return { status: R.value, value: a.data };
    }
    gte(a, p) {
      return this.setLimit("min", a, !0, l.errorUtil.toString(p));
    }
    gt(a, p) {
      return this.setLimit("min", a, !1, l.errorUtil.toString(p));
    }
    lte(a, p) {
      return this.setLimit("max", a, !0, l.errorUtil.toString(p));
    }
    lt(a, p) {
      return this.setLimit("max", a, !1, l.errorUtil.toString(p));
    }
    setLimit(a, p, b, R) {
      return new $t({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: a,
            value: p,
            inclusive: b,
            message: l.errorUtil.toString(R)
          }
        ]
      });
    }
    _addCheck(a) {
      return new $t({
        ...this._def,
        checks: [...this._def.checks, a]
      });
    }
    int(a) {
      return this._addCheck({
        kind: "int",
        message: l.errorUtil.toString(a)
      });
    }
    positive(a) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: l.errorUtil.toString(a)
      });
    }
    negative(a) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: l.errorUtil.toString(a)
      });
    }
    nonpositive(a) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: l.errorUtil.toString(a)
      });
    }
    nonnegative(a) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: l.errorUtil.toString(a)
      });
    }
    multipleOf(a, p) {
      return this._addCheck({
        kind: "multipleOf",
        value: a,
        message: l.errorUtil.toString(p)
      });
    }
    finite(a) {
      return this._addCheck({
        kind: "finite",
        message: l.errorUtil.toString(a)
      });
    }
    safe(a) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: l.errorUtil.toString(a)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: l.errorUtil.toString(a)
      });
    }
    get minValue() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "min" && (a === null || p.value > a) && (a = p.value);
      return a;
    }
    get maxValue() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "max" && (a === null || p.value < a) && (a = p.value);
      return a;
    }
    get isInt() {
      return !!this._def.checks.find((a) => a.kind === "int" || a.kind === "multipleOf" && d.util.isInteger(a.value));
    }
    get isFinite() {
      let a = null, p = null;
      for (const b of this._def.checks) {
        if (b.kind === "finite" || b.kind === "int" || b.kind === "multipleOf")
          return !0;
        b.kind === "min" ? (p === null || b.value > p) && (p = b.value) : b.kind === "max" && (a === null || b.value < a) && (a = b.value);
      }
      return Number.isFinite(p) && Number.isFinite(a);
    }
  }
  t.ZodNumber = $t, $t.create = (x) => new $t({
    checks: [],
    typeName: M.ZodNumber,
    coerce: x?.coerce || !1,
    ...h(x)
  });
  class Mt extends v {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(a) {
      if (this._def.coerce && (a.data = BigInt(a.data)), this._getType(a) !== d.ZodParsedType.bigint) {
        const g = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(g, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.bigint,
          received: g.parsedType
        }), o.INVALID;
      }
      let b;
      const R = new o.ParseStatus();
      for (const g of this._def.checks)
        g.kind === "min" ? (g.inclusive ? a.data < g.value : a.data <= g.value) && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.too_small,
          type: "bigint",
          minimum: g.value,
          inclusive: g.inclusive,
          message: g.message
        }), R.dirty()) : g.kind === "max" ? (g.inclusive ? a.data > g.value : a.data >= g.value) && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.too_big,
          type: "bigint",
          maximum: g.value,
          inclusive: g.inclusive,
          message: g.message
        }), R.dirty()) : g.kind === "multipleOf" ? a.data % g.value !== BigInt(0) && (b = this._getOrReturnCtx(a, b), (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.not_multiple_of,
          multipleOf: g.value,
          message: g.message
        }), R.dirty()) : d.util.assertNever(g);
      return { status: R.value, value: a.data };
    }
    gte(a, p) {
      return this.setLimit("min", a, !0, l.errorUtil.toString(p));
    }
    gt(a, p) {
      return this.setLimit("min", a, !1, l.errorUtil.toString(p));
    }
    lte(a, p) {
      return this.setLimit("max", a, !0, l.errorUtil.toString(p));
    }
    lt(a, p) {
      return this.setLimit("max", a, !1, l.errorUtil.toString(p));
    }
    setLimit(a, p, b, R) {
      return new Mt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: a,
            value: p,
            inclusive: b,
            message: l.errorUtil.toString(R)
          }
        ]
      });
    }
    _addCheck(a) {
      return new Mt({
        ...this._def,
        checks: [...this._def.checks, a]
      });
    }
    positive(a) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: l.errorUtil.toString(a)
      });
    }
    negative(a) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: l.errorUtil.toString(a)
      });
    }
    nonpositive(a) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: l.errorUtil.toString(a)
      });
    }
    nonnegative(a) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: l.errorUtil.toString(a)
      });
    }
    multipleOf(a, p) {
      return this._addCheck({
        kind: "multipleOf",
        value: a,
        message: l.errorUtil.toString(p)
      });
    }
    get minValue() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "min" && (a === null || p.value > a) && (a = p.value);
      return a;
    }
    get maxValue() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "max" && (a === null || p.value < a) && (a = p.value);
      return a;
    }
  }
  t.ZodBigInt = Mt, Mt.create = (x) => {
    var a;
    return new Mt({
      checks: [],
      typeName: M.ZodBigInt,
      coerce: (a = x?.coerce) !== null && a !== void 0 ? a : !1,
      ...h(x)
    });
  };
  class ci extends v {
    _parse(a) {
      if (this._def.coerce && (a.data = !!a.data), this._getType(a) !== d.ZodParsedType.boolean) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.boolean,
          received: b.parsedType
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
  }
  t.ZodBoolean = ci, ci.create = (x) => new ci({
    typeName: M.ZodBoolean,
    coerce: x?.coerce || !1,
    ...h(x)
  });
  class nr extends v {
    _parse(a) {
      if (this._def.coerce && (a.data = new Date(a.data)), this._getType(a) !== d.ZodParsedType.date) {
        const g = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(g, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.date,
          received: g.parsedType
        }), o.INVALID;
      }
      if (isNaN(a.data.getTime())) {
        const g = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(g, {
          code: f.ZodIssueCode.invalid_date
        }), o.INVALID;
      }
      const b = new o.ParseStatus();
      let R;
      for (const g of this._def.checks)
        g.kind === "min" ? a.data.getTime() < g.value && (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
          code: f.ZodIssueCode.too_small,
          message: g.message,
          inclusive: !0,
          exact: !1,
          minimum: g.value,
          type: "date"
        }), b.dirty()) : g.kind === "max" ? a.data.getTime() > g.value && (R = this._getOrReturnCtx(a, R), (0, o.addIssueToContext)(R, {
          code: f.ZodIssueCode.too_big,
          message: g.message,
          inclusive: !0,
          exact: !1,
          maximum: g.value,
          type: "date"
        }), b.dirty()) : d.util.assertNever(g);
      return {
        status: b.value,
        value: new Date(a.data.getTime())
      };
    }
    _addCheck(a) {
      return new nr({
        ...this._def,
        checks: [...this._def.checks, a]
      });
    }
    min(a, p) {
      return this._addCheck({
        kind: "min",
        value: a.getTime(),
        message: l.errorUtil.toString(p)
      });
    }
    max(a, p) {
      return this._addCheck({
        kind: "max",
        value: a.getTime(),
        message: l.errorUtil.toString(p)
      });
    }
    get minDate() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "min" && (a === null || p.value > a) && (a = p.value);
      return a != null ? new Date(a) : null;
    }
    get maxDate() {
      let a = null;
      for (const p of this._def.checks)
        p.kind === "max" && (a === null || p.value < a) && (a = p.value);
      return a != null ? new Date(a) : null;
    }
  }
  t.ZodDate = nr, nr.create = (x) => new nr({
    checks: [],
    coerce: x?.coerce || !1,
    typeName: M.ZodDate,
    ...h(x)
  });
  class Ks extends v {
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.symbol) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.symbol,
          received: b.parsedType
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
  }
  t.ZodSymbol = Ks, Ks.create = (x) => new Ks({
    typeName: M.ZodSymbol,
    ...h(x)
  });
  class pi extends v {
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.undefined) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.undefined,
          received: b.parsedType
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
  }
  t.ZodUndefined = pi, pi.create = (x) => new pi({
    typeName: M.ZodUndefined,
    ...h(x)
  });
  class fi extends v {
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.null) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.null,
          received: b.parsedType
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
  }
  t.ZodNull = fi, fi.create = (x) => new fi({
    typeName: M.ZodNull,
    ...h(x)
  });
  class Pr extends v {
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(a) {
      return (0, o.OK)(a.data);
    }
  }
  t.ZodAny = Pr, Pr.create = (x) => new Pr({
    typeName: M.ZodAny,
    ...h(x)
  });
  class sr extends v {
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(a) {
      return (0, o.OK)(a.data);
    }
  }
  t.ZodUnknown = sr, sr.create = (x) => new sr({
    typeName: M.ZodUnknown,
    ...h(x)
  });
  class Et extends v {
    _parse(a) {
      const p = this._getOrReturnCtx(a);
      return (0, o.addIssueToContext)(p, {
        code: f.ZodIssueCode.invalid_type,
        expected: d.ZodParsedType.never,
        received: p.parsedType
      }), o.INVALID;
    }
  }
  t.ZodNever = Et, Et.create = (x) => new Et({
    typeName: M.ZodNever,
    ...h(x)
  });
  class Us extends v {
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.undefined) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.void,
          received: b.parsedType
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
  }
  t.ZodVoid = Us, Us.create = (x) => new Us({
    typeName: M.ZodVoid,
    ...h(x)
  });
  class Xe extends v {
    _parse(a) {
      const { ctx: p, status: b } = this._processInputParams(a), R = this._def;
      if (p.parsedType !== d.ZodParsedType.array)
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.array,
          received: p.parsedType
        }), o.INVALID;
      if (R.exactLength !== null) {
        const D = p.data.length > R.exactLength.value, k = p.data.length < R.exactLength.value;
        (D || k) && ((0, o.addIssueToContext)(p, {
          code: D ? f.ZodIssueCode.too_big : f.ZodIssueCode.too_small,
          minimum: k ? R.exactLength.value : void 0,
          maximum: D ? R.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: R.exactLength.message
        }), b.dirty());
      }
      if (R.minLength !== null && p.data.length < R.minLength.value && ((0, o.addIssueToContext)(p, {
        code: f.ZodIssueCode.too_small,
        minimum: R.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: R.minLength.message
      }), b.dirty()), R.maxLength !== null && p.data.length > R.maxLength.value && ((0, o.addIssueToContext)(p, {
        code: f.ZodIssueCode.too_big,
        maximum: R.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: R.maxLength.message
      }), b.dirty()), p.common.async)
        return Promise.all([...p.data].map((D, k) => R.type._parseAsync(new m(p, D, p.path, k)))).then((D) => o.ParseStatus.mergeArray(b, D));
      const g = [...p.data].map((D, k) => R.type._parseSync(new m(p, D, p.path, k)));
      return o.ParseStatus.mergeArray(b, g);
    }
    get element() {
      return this._def.type;
    }
    min(a, p) {
      return new Xe({
        ...this._def,
        minLength: { value: a, message: l.errorUtil.toString(p) }
      });
    }
    max(a, p) {
      return new Xe({
        ...this._def,
        maxLength: { value: a, message: l.errorUtil.toString(p) }
      });
    }
    length(a, p) {
      return new Xe({
        ...this._def,
        exactLength: { value: a, message: l.errorUtil.toString(p) }
      });
    }
    nonempty(a) {
      return this.min(1, a);
    }
  }
  t.ZodArray = Xe, Xe.create = (x, a) => new Xe({
    type: x,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: M.ZodArray,
    ...h(a)
  });
  function Kr(x) {
    if (x instanceof re) {
      const a = {};
      for (const p in x.shape) {
        const b = x.shape[p];
        a[p] = et.create(Kr(b));
      }
      return new re({
        ...x._def,
        shape: () => a
      });
    } else
      return x instanceof Xe ? new Xe({
        ...x._def,
        type: Kr(x.element)
      }) : x instanceof et ? et.create(Kr(x.unwrap())) : x instanceof qt ? qt.create(Kr(x.unwrap())) : x instanceof Ye ? Ye.create(x.items.map((a) => Kr(a))) : x;
  }
  class re extends v {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const a = this._def.shape(), p = d.util.objectKeys(a);
      return this._cached = { shape: a, keys: p };
    }
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.object) {
        const j = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(j, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.object,
          received: j.parsedType
        }), o.INVALID;
      }
      const { status: b, ctx: R } = this._processInputParams(a), { shape: g, keys: D } = this._getCached(), k = [];
      if (!(this._def.catchall instanceof Et && this._def.unknownKeys === "strip"))
        for (const j in R.data)
          D.includes(j) || k.push(j);
      const O = [];
      for (const j of D) {
        const X = g[j], $e = R.data[j];
        O.push({
          key: { status: "valid", value: j },
          value: X._parse(new m(R, $e, R.path, j)),
          alwaysSet: j in R.data
        });
      }
      if (this._def.catchall instanceof Et) {
        const j = this._def.unknownKeys;
        if (j === "passthrough")
          for (const X of k)
            O.push({
              key: { status: "valid", value: X },
              value: { status: "valid", value: R.data[X] }
            });
        else if (j === "strict")
          k.length > 0 && ((0, o.addIssueToContext)(R, {
            code: f.ZodIssueCode.unrecognized_keys,
            keys: k
          }), b.dirty());
        else if (j !== "strip")
          throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const j = this._def.catchall;
        for (const X of k) {
          const $e = R.data[X];
          O.push({
            key: { status: "valid", value: X },
            value: j._parse(
              new m(R, $e, R.path, X)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: X in R.data
          });
        }
      }
      return R.common.async ? Promise.resolve().then(async () => {
        const j = [];
        for (const X of O) {
          const $e = await X.key, ko = await X.value;
          j.push({
            key: $e,
            value: ko,
            alwaysSet: X.alwaysSet
          });
        }
        return j;
      }).then((j) => o.ParseStatus.mergeObjectSync(b, j)) : o.ParseStatus.mergeObjectSync(b, O);
    }
    get shape() {
      return this._def.shape();
    }
    strict(a) {
      return l.errorUtil.errToObj, new re({
        ...this._def,
        unknownKeys: "strict",
        ...a !== void 0 ? {
          errorMap: (p, b) => {
            var R, g, D, k;
            const O = (D = (g = (R = this._def).errorMap) === null || g === void 0 ? void 0 : g.call(R, p, b).message) !== null && D !== void 0 ? D : b.defaultError;
            return p.code === "unrecognized_keys" ? {
              message: (k = l.errorUtil.errToObj(a).message) !== null && k !== void 0 ? k : O
            } : {
              message: O
            };
          }
        } : {}
      });
    }
    strip() {
      return new re({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new re({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(a) {
      return new re({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...a
        })
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(a) {
      return new re({
        unknownKeys: a._def.unknownKeys,
        catchall: a._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...a._def.shape()
        }),
        typeName: M.ZodObject
      });
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(a, p) {
      return this.augment({ [a]: p });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(a) {
      return new re({
        ...this._def,
        catchall: a
      });
    }
    pick(a) {
      const p = {};
      return d.util.objectKeys(a).forEach((b) => {
        a[b] && this.shape[b] && (p[b] = this.shape[b]);
      }), new re({
        ...this._def,
        shape: () => p
      });
    }
    omit(a) {
      const p = {};
      return d.util.objectKeys(this.shape).forEach((b) => {
        a[b] || (p[b] = this.shape[b]);
      }), new re({
        ...this._def,
        shape: () => p
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return Kr(this);
    }
    partial(a) {
      const p = {};
      return d.util.objectKeys(this.shape).forEach((b) => {
        const R = this.shape[b];
        a && !a[b] ? p[b] = R : p[b] = R.optional();
      }), new re({
        ...this._def,
        shape: () => p
      });
    }
    required(a) {
      const p = {};
      return d.util.objectKeys(this.shape).forEach((b) => {
        if (a && !a[b])
          p[b] = this.shape[b];
        else {
          let g = this.shape[b];
          for (; g instanceof et; )
            g = g._def.innerType;
          p[b] = g;
        }
      }), new re({
        ...this._def,
        shape: () => p
      });
    }
    keyof() {
      return _o(d.util.objectKeys(this.shape));
    }
  }
  t.ZodObject = re, re.create = (x, a) => new re({
    shape: () => x,
    unknownKeys: "strip",
    catchall: Et.create(),
    typeName: M.ZodObject,
    ...h(a)
  }), re.strictCreate = (x, a) => new re({
    shape: () => x,
    unknownKeys: "strict",
    catchall: Et.create(),
    typeName: M.ZodObject,
    ...h(a)
  }), re.lazycreate = (x, a) => new re({
    shape: x,
    unknownKeys: "strip",
    catchall: Et.create(),
    typeName: M.ZodObject,
    ...h(a)
  });
  class di extends v {
    _parse(a) {
      const { ctx: p } = this._processInputParams(a), b = this._def.options;
      function R(g) {
        for (const k of g)
          if (k.result.status === "valid")
            return k.result;
        for (const k of g)
          if (k.result.status === "dirty")
            return p.common.issues.push(...k.ctx.common.issues), k.result;
        const D = g.map((k) => new f.ZodError(k.ctx.common.issues));
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_union,
          unionErrors: D
        }), o.INVALID;
      }
      if (p.common.async)
        return Promise.all(b.map(async (g) => {
          const D = {
            ...p,
            common: {
              ...p.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await g._parseAsync({
              data: p.data,
              path: p.path,
              parent: D
            }),
            ctx: D
          };
        })).then(R);
      {
        let g;
        const D = [];
        for (const O of b) {
          const j = {
            ...p,
            common: {
              ...p.common,
              issues: []
            },
            parent: null
          }, X = O._parseSync({
            data: p.data,
            path: p.path,
            parent: j
          });
          if (X.status === "valid")
            return X;
          X.status === "dirty" && !g && (g = { result: X, ctx: j }), j.common.issues.length && D.push(j.common.issues);
        }
        if (g)
          return p.common.issues.push(...g.ctx.common.issues), g.result;
        const k = D.map((O) => new f.ZodError(O));
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_union,
          unionErrors: k
        }), o.INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  t.ZodUnion = di, di.create = (x, a) => new di({
    options: x,
    typeName: M.ZodUnion,
    ...h(a)
  });
  const xt = (x) => x instanceof yi ? xt(x.schema) : x instanceof ze ? xt(x.innerType()) : x instanceof hi ? [x.value] : x instanceof Gt ? x.options : x instanceof Ei ? d.util.objectValues(x.enum) : x instanceof xi ? xt(x._def.innerType) : x instanceof pi ? [void 0] : x instanceof fi ? [null] : x instanceof et ? [void 0, ...xt(x.unwrap())] : x instanceof qt ? [null, ...xt(x.unwrap())] : x instanceof Pa || x instanceof Ai ? xt(x.unwrap()) : x instanceof gi ? xt(x._def.innerType) : [];
  class Vs extends v {
    _parse(a) {
      const { ctx: p } = this._processInputParams(a);
      if (p.parsedType !== d.ZodParsedType.object)
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.object,
          received: p.parsedType
        }), o.INVALID;
      const b = this.discriminator, R = p.data[b], g = this.optionsMap.get(R);
      return g ? p.common.async ? g._parseAsync({
        data: p.data,
        path: p.path,
        parent: p
      }) : g._parseSync({
        data: p.data,
        path: p.path,
        parent: p
      }) : ((0, o.addIssueToContext)(p, {
        code: f.ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [b]
      }), o.INVALID);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(a, p, b) {
      const R = /* @__PURE__ */ new Map();
      for (const g of p) {
        const D = xt(g.shape[a]);
        if (!D.length)
          throw new Error(`A discriminator value for key \`${a}\` could not be extracted from all schema options`);
        for (const k of D) {
          if (R.has(k))
            throw new Error(`Discriminator property ${String(a)} has duplicate value ${String(k)}`);
          R.set(k, g);
        }
      }
      return new Vs({
        typeName: M.ZodDiscriminatedUnion,
        discriminator: a,
        options: p,
        optionsMap: R,
        ...h(b)
      });
    }
  }
  t.ZodDiscriminatedUnion = Vs;
  function Da(x, a) {
    const p = (0, d.getParsedType)(x), b = (0, d.getParsedType)(a);
    if (x === a)
      return { valid: !0, data: x };
    if (p === d.ZodParsedType.object && b === d.ZodParsedType.object) {
      const R = d.util.objectKeys(a), g = d.util.objectKeys(x).filter((k) => R.indexOf(k) !== -1), D = { ...x, ...a };
      for (const k of g) {
        const O = Da(x[k], a[k]);
        if (!O.valid)
          return { valid: !1 };
        D[k] = O.data;
      }
      return { valid: !0, data: D };
    } else if (p === d.ZodParsedType.array && b === d.ZodParsedType.array) {
      if (x.length !== a.length)
        return { valid: !1 };
      const R = [];
      for (let g = 0; g < x.length; g++) {
        const D = x[g], k = a[g], O = Da(D, k);
        if (!O.valid)
          return { valid: !1 };
        R.push(O.data);
      }
      return { valid: !0, data: R };
    } else
      return p === d.ZodParsedType.date && b === d.ZodParsedType.date && +x == +a ? { valid: !0, data: x } : { valid: !1 };
  }
  class bi extends v {
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a), R = (g, D) => {
        if ((0, o.isAborted)(g) || (0, o.isAborted)(D))
          return o.INVALID;
        const k = Da(g.value, D.value);
        return k.valid ? (((0, o.isDirty)(g) || (0, o.isDirty)(D)) && p.dirty(), { status: p.value, value: k.data }) : ((0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_intersection_types
        }), o.INVALID);
      };
      return b.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: b.data,
          path: b.path,
          parent: b
        }),
        this._def.right._parseAsync({
          data: b.data,
          path: b.path,
          parent: b
        })
      ]).then(([g, D]) => R(g, D)) : R(this._def.left._parseSync({
        data: b.data,
        path: b.path,
        parent: b
      }), this._def.right._parseSync({
        data: b.data,
        path: b.path,
        parent: b
      }));
    }
  }
  t.ZodIntersection = bi, bi.create = (x, a, p) => new bi({
    left: x,
    right: a,
    typeName: M.ZodIntersection,
    ...h(p)
  });
  class Ye extends v {
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a);
      if (b.parsedType !== d.ZodParsedType.array)
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.array,
          received: b.parsedType
        }), o.INVALID;
      if (b.data.length < this._def.items.length)
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
        }), o.INVALID;
      !this._def.rest && b.data.length > this._def.items.length && ((0, o.addIssueToContext)(b, {
        code: f.ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), p.dirty());
      const g = [...b.data].map((D, k) => {
        const O = this._def.items[k] || this._def.rest;
        return O ? O._parse(new m(b, D, b.path, k)) : null;
      }).filter((D) => !!D);
      return b.common.async ? Promise.all(g).then((D) => o.ParseStatus.mergeArray(p, D)) : o.ParseStatus.mergeArray(p, g);
    }
    get items() {
      return this._def.items;
    }
    rest(a) {
      return new Ye({
        ...this._def,
        rest: a
      });
    }
  }
  t.ZodTuple = Ye, Ye.create = (x, a) => {
    if (!Array.isArray(x))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new Ye({
      items: x,
      typeName: M.ZodTuple,
      rest: null,
      ...h(a)
    });
  };
  class mi extends v {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a);
      if (b.parsedType !== d.ZodParsedType.object)
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.object,
          received: b.parsedType
        }), o.INVALID;
      const R = [], g = this._def.keyType, D = this._def.valueType;
      for (const k in b.data)
        R.push({
          key: g._parse(new m(b, k, b.path, k)),
          value: D._parse(new m(b, b.data[k], b.path, k)),
          alwaysSet: k in b.data
        });
      return b.common.async ? o.ParseStatus.mergeObjectAsync(p, R) : o.ParseStatus.mergeObjectSync(p, R);
    }
    get element() {
      return this._def.valueType;
    }
    static create(a, p, b) {
      return p instanceof v ? new mi({
        keyType: a,
        valueType: p,
        typeName: M.ZodRecord,
        ...h(b)
      }) : new mi({
        keyType: qe.create(),
        valueType: a,
        typeName: M.ZodRecord,
        ...h(p)
      });
    }
  }
  t.ZodRecord = mi;
  class Is extends v {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a);
      if (b.parsedType !== d.ZodParsedType.map)
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.map,
          received: b.parsedType
        }), o.INVALID;
      const R = this._def.keyType, g = this._def.valueType, D = [...b.data.entries()].map(([k, O], j) => ({
        key: R._parse(new m(b, k, b.path, [j, "key"])),
        value: g._parse(new m(b, O, b.path, [j, "value"]))
      }));
      if (b.common.async) {
        const k = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const O of D) {
            const j = await O.key, X = await O.value;
            if (j.status === "aborted" || X.status === "aborted")
              return o.INVALID;
            (j.status === "dirty" || X.status === "dirty") && p.dirty(), k.set(j.value, X.value);
          }
          return { status: p.value, value: k };
        });
      } else {
        const k = /* @__PURE__ */ new Map();
        for (const O of D) {
          const j = O.key, X = O.value;
          if (j.status === "aborted" || X.status === "aborted")
            return o.INVALID;
          (j.status === "dirty" || X.status === "dirty") && p.dirty(), k.set(j.value, X.value);
        }
        return { status: p.value, value: k };
      }
    }
  }
  t.ZodMap = Is, Is.create = (x, a, p) => new Is({
    valueType: a,
    keyType: x,
    typeName: M.ZodMap,
    ...h(p)
  });
  class ar extends v {
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a);
      if (b.parsedType !== d.ZodParsedType.set)
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.set,
          received: b.parsedType
        }), o.INVALID;
      const R = this._def;
      R.minSize !== null && b.data.size < R.minSize.value && ((0, o.addIssueToContext)(b, {
        code: f.ZodIssueCode.too_small,
        minimum: R.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: R.minSize.message
      }), p.dirty()), R.maxSize !== null && b.data.size > R.maxSize.value && ((0, o.addIssueToContext)(b, {
        code: f.ZodIssueCode.too_big,
        maximum: R.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: R.maxSize.message
      }), p.dirty());
      const g = this._def.valueType;
      function D(O) {
        const j = /* @__PURE__ */ new Set();
        for (const X of O) {
          if (X.status === "aborted")
            return o.INVALID;
          X.status === "dirty" && p.dirty(), j.add(X.value);
        }
        return { status: p.value, value: j };
      }
      const k = [...b.data.values()].map((O, j) => g._parse(new m(b, O, b.path, j)));
      return b.common.async ? Promise.all(k).then((O) => D(O)) : D(k);
    }
    min(a, p) {
      return new ar({
        ...this._def,
        minSize: { value: a, message: l.errorUtil.toString(p) }
      });
    }
    max(a, p) {
      return new ar({
        ...this._def,
        maxSize: { value: a, message: l.errorUtil.toString(p) }
      });
    }
    size(a, p) {
      return this.min(a, p).max(a, p);
    }
    nonempty(a) {
      return this.min(1, a);
    }
  }
  t.ZodSet = ar, ar.create = (x, a) => new ar({
    valueType: x,
    minSize: null,
    maxSize: null,
    typeName: M.ZodSet,
    ...h(a)
  });
  class Ur extends v {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(a) {
      const { ctx: p } = this._processInputParams(a);
      if (p.parsedType !== d.ZodParsedType.function)
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.function,
          received: p.parsedType
        }), o.INVALID;
      function b(k, O) {
        return (0, o.makeIssue)({
          data: k,
          path: p.path,
          errorMaps: [
            p.common.contextualErrorMap,
            p.schemaErrorMap,
            (0, u.getErrorMap)(),
            u.defaultErrorMap
          ].filter((j) => !!j),
          issueData: {
            code: f.ZodIssueCode.invalid_arguments,
            argumentsError: O
          }
        });
      }
      function R(k, O) {
        return (0, o.makeIssue)({
          data: k,
          path: p.path,
          errorMaps: [
            p.common.contextualErrorMap,
            p.schemaErrorMap,
            (0, u.getErrorMap)(),
            u.defaultErrorMap
          ].filter((j) => !!j),
          issueData: {
            code: f.ZodIssueCode.invalid_return_type,
            returnTypeError: O
          }
        });
      }
      const g = { errorMap: p.common.contextualErrorMap }, D = p.data;
      if (this._def.returns instanceof Vr) {
        const k = this;
        return (0, o.OK)(async function(...O) {
          const j = new f.ZodError([]), X = await k._def.args.parseAsync(O, g).catch((Ka) => {
            throw j.addIssue(b(O, Ka)), j;
          }), $e = await Reflect.apply(D, this, X);
          return await k._def.returns._def.type.parseAsync($e, g).catch((Ka) => {
            throw j.addIssue(R($e, Ka)), j;
          });
        });
      } else {
        const k = this;
        return (0, o.OK)(function(...O) {
          const j = k._def.args.safeParse(O, g);
          if (!j.success)
            throw new f.ZodError([b(O, j.error)]);
          const X = Reflect.apply(D, this, j.data), $e = k._def.returns.safeParse(X, g);
          if (!$e.success)
            throw new f.ZodError([R(X, $e.error)]);
          return $e.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...a) {
      return new Ur({
        ...this._def,
        args: Ye.create(a).rest(sr.create())
      });
    }
    returns(a) {
      return new Ur({
        ...this._def,
        returns: a
      });
    }
    implement(a) {
      return this.parse(a);
    }
    strictImplement(a) {
      return this.parse(a);
    }
    static create(a, p, b) {
      return new Ur({
        args: a || Ye.create([]).rest(sr.create()),
        returns: p || sr.create(),
        typeName: M.ZodFunction,
        ...h(b)
      });
    }
  }
  t.ZodFunction = Ur;
  class yi extends v {
    get schema() {
      return this._def.getter();
    }
    _parse(a) {
      const { ctx: p } = this._processInputParams(a);
      return this._def.getter()._parse({ data: p.data, path: p.path, parent: p });
    }
  }
  t.ZodLazy = yi, yi.create = (x, a) => new yi({
    getter: x,
    typeName: M.ZodLazy,
    ...h(a)
  });
  class hi extends v {
    _parse(a) {
      if (a.data !== this._def.value) {
        const p = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(p, {
          received: p.data,
          code: f.ZodIssueCode.invalid_literal,
          expected: this._def.value
        }), o.INVALID;
      }
      return { status: "valid", value: a.data };
    }
    get value() {
      return this._def.value;
    }
  }
  t.ZodLiteral = hi, hi.create = (x, a) => new hi({
    value: x,
    typeName: M.ZodLiteral,
    ...h(a)
  });
  function _o(x, a) {
    return new Gt({
      values: x,
      typeName: M.ZodEnum,
      ...h(a)
    });
  }
  class Gt extends v {
    constructor() {
      super(...arguments), n.set(this, void 0);
    }
    _parse(a) {
      if (typeof a.data != "string") {
        const p = this._getOrReturnCtx(a), b = this._def.values;
        return (0, o.addIssueToContext)(p, {
          expected: d.util.joinValues(b),
          received: p.parsedType,
          code: f.ZodIssueCode.invalid_type
        }), o.INVALID;
      }
      if (e(this, n, "f") || r(this, n, new Set(this._def.values), "f"), !e(this, n, "f").has(a.data)) {
        const p = this._getOrReturnCtx(a), b = this._def.values;
        return (0, o.addIssueToContext)(p, {
          received: p.data,
          code: f.ZodIssueCode.invalid_enum_value,
          options: b
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const a = {};
      for (const p of this._def.values)
        a[p] = p;
      return a;
    }
    get Values() {
      const a = {};
      for (const p of this._def.values)
        a[p] = p;
      return a;
    }
    get Enum() {
      const a = {};
      for (const p of this._def.values)
        a[p] = p;
      return a;
    }
    extract(a, p = this._def) {
      return Gt.create(a, {
        ...this._def,
        ...p
      });
    }
    exclude(a, p = this._def) {
      return Gt.create(this.options.filter((b) => !a.includes(b)), {
        ...this._def,
        ...p
      });
    }
  }
  t.ZodEnum = Gt, n = /* @__PURE__ */ new WeakMap(), Gt.create = _o;
  class Ei extends v {
    constructor() {
      super(...arguments), s.set(this, void 0);
    }
    _parse(a) {
      const p = d.util.getValidEnumValues(this._def.values), b = this._getOrReturnCtx(a);
      if (b.parsedType !== d.ZodParsedType.string && b.parsedType !== d.ZodParsedType.number) {
        const R = d.util.objectValues(p);
        return (0, o.addIssueToContext)(b, {
          expected: d.util.joinValues(R),
          received: b.parsedType,
          code: f.ZodIssueCode.invalid_type
        }), o.INVALID;
      }
      if (e(this, s, "f") || r(this, s, new Set(d.util.getValidEnumValues(this._def.values)), "f"), !e(this, s, "f").has(a.data)) {
        const R = d.util.objectValues(p);
        return (0, o.addIssueToContext)(b, {
          received: b.data,
          code: f.ZodIssueCode.invalid_enum_value,
          options: R
        }), o.INVALID;
      }
      return (0, o.OK)(a.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  t.ZodNativeEnum = Ei, s = /* @__PURE__ */ new WeakMap(), Ei.create = (x, a) => new Ei({
    values: x,
    typeName: M.ZodNativeEnum,
    ...h(a)
  });
  class Vr extends v {
    unwrap() {
      return this._def.type;
    }
    _parse(a) {
      const { ctx: p } = this._processInputParams(a);
      if (p.parsedType !== d.ZodParsedType.promise && p.common.async === !1)
        return (0, o.addIssueToContext)(p, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.promise,
          received: p.parsedType
        }), o.INVALID;
      const b = p.parsedType === d.ZodParsedType.promise ? p.data : Promise.resolve(p.data);
      return (0, o.OK)(b.then((R) => this._def.type.parseAsync(R, {
        path: p.path,
        errorMap: p.common.contextualErrorMap
      })));
    }
  }
  t.ZodPromise = Vr, Vr.create = (x, a) => new Vr({
    type: x,
    typeName: M.ZodPromise,
    ...h(a)
  });
  class ze extends v {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === M.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a), R = this._def.effect || null, g = {
        addIssue: (D) => {
          (0, o.addIssueToContext)(b, D), D.fatal ? p.abort() : p.dirty();
        },
        get path() {
          return b.path;
        }
      };
      if (g.addIssue = g.addIssue.bind(g), R.type === "preprocess") {
        const D = R.transform(b.data, g);
        if (b.common.async)
          return Promise.resolve(D).then(async (k) => {
            if (p.value === "aborted")
              return o.INVALID;
            const O = await this._def.schema._parseAsync({
              data: k,
              path: b.path,
              parent: b
            });
            return O.status === "aborted" ? o.INVALID : O.status === "dirty" || p.value === "dirty" ? (0, o.DIRTY)(O.value) : O;
          });
        {
          if (p.value === "aborted")
            return o.INVALID;
          const k = this._def.schema._parseSync({
            data: D,
            path: b.path,
            parent: b
          });
          return k.status === "aborted" ? o.INVALID : k.status === "dirty" || p.value === "dirty" ? (0, o.DIRTY)(k.value) : k;
        }
      }
      if (R.type === "refinement") {
        const D = (k) => {
          const O = R.refinement(k, g);
          if (b.common.async)
            return Promise.resolve(O);
          if (O instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return k;
        };
        if (b.common.async === !1) {
          const k = this._def.schema._parseSync({
            data: b.data,
            path: b.path,
            parent: b
          });
          return k.status === "aborted" ? o.INVALID : (k.status === "dirty" && p.dirty(), D(k.value), { status: p.value, value: k.value });
        } else
          return this._def.schema._parseAsync({ data: b.data, path: b.path, parent: b }).then((k) => k.status === "aborted" ? o.INVALID : (k.status === "dirty" && p.dirty(), D(k.value).then(() => ({ status: p.value, value: k.value }))));
      }
      if (R.type === "transform")
        if (b.common.async === !1) {
          const D = this._def.schema._parseSync({
            data: b.data,
            path: b.path,
            parent: b
          });
          if (!(0, o.isValid)(D))
            return D;
          const k = R.transform(D.value, g);
          if (k instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: p.value, value: k };
        } else
          return this._def.schema._parseAsync({ data: b.data, path: b.path, parent: b }).then((D) => (0, o.isValid)(D) ? Promise.resolve(R.transform(D.value, g)).then((k) => ({ status: p.value, value: k })) : D);
      d.util.assertNever(R);
    }
  }
  t.ZodEffects = ze, t.ZodTransformer = ze, ze.create = (x, a, p) => new ze({
    schema: x,
    typeName: M.ZodEffects,
    effect: a,
    ...h(p)
  }), ze.createWithPreprocess = (x, a, p) => new ze({
    schema: a,
    effect: { type: "preprocess", transform: x },
    typeName: M.ZodEffects,
    ...h(p)
  });
  class et extends v {
    _parse(a) {
      return this._getType(a) === d.ZodParsedType.undefined ? (0, o.OK)(void 0) : this._def.innerType._parse(a);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  t.ZodOptional = et, et.create = (x, a) => new et({
    innerType: x,
    typeName: M.ZodOptional,
    ...h(a)
  });
  class qt extends v {
    _parse(a) {
      return this._getType(a) === d.ZodParsedType.null ? (0, o.OK)(null) : this._def.innerType._parse(a);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  t.ZodNullable = qt, qt.create = (x, a) => new qt({
    innerType: x,
    typeName: M.ZodNullable,
    ...h(a)
  });
  class xi extends v {
    _parse(a) {
      const { ctx: p } = this._processInputParams(a);
      let b = p.data;
      return p.parsedType === d.ZodParsedType.undefined && (b = this._def.defaultValue()), this._def.innerType._parse({
        data: b,
        path: p.path,
        parent: p
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  t.ZodDefault = xi, xi.create = (x, a) => new xi({
    innerType: x,
    typeName: M.ZodDefault,
    defaultValue: typeof a.default == "function" ? a.default : () => a.default,
    ...h(a)
  });
  class gi extends v {
    _parse(a) {
      const { ctx: p } = this._processInputParams(a), b = {
        ...p,
        common: {
          ...p.common,
          issues: []
        }
      }, R = this._def.innerType._parse({
        data: b.data,
        path: b.path,
        parent: {
          ...b
        }
      });
      return (0, o.isAsync)(R) ? R.then((g) => ({
        status: "valid",
        value: g.status === "valid" ? g.value : this._def.catchValue({
          get error() {
            return new f.ZodError(b.common.issues);
          },
          input: b.data
        })
      })) : {
        status: "valid",
        value: R.status === "valid" ? R.value : this._def.catchValue({
          get error() {
            return new f.ZodError(b.common.issues);
          },
          input: b.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  t.ZodCatch = gi, gi.create = (x, a) => new gi({
    innerType: x,
    typeName: M.ZodCatch,
    catchValue: typeof a.catch == "function" ? a.catch : () => a.catch,
    ...h(a)
  });
  class Os extends v {
    _parse(a) {
      if (this._getType(a) !== d.ZodParsedType.nan) {
        const b = this._getOrReturnCtx(a);
        return (0, o.addIssueToContext)(b, {
          code: f.ZodIssueCode.invalid_type,
          expected: d.ZodParsedType.nan,
          received: b.parsedType
        }), o.INVALID;
      }
      return { status: "valid", value: a.data };
    }
  }
  t.ZodNaN = Os, Os.create = (x) => new Os({
    typeName: M.ZodNaN,
    ...h(x)
  }), t.BRAND = Symbol("zod_brand");
  class Pa extends v {
    _parse(a) {
      const { ctx: p } = this._processInputParams(a), b = p.data;
      return this._def.type._parse({
        data: b,
        path: p.path,
        parent: p
      });
    }
    unwrap() {
      return this._def.type;
    }
  }
  t.ZodBranded = Pa;
  class Ri extends v {
    _parse(a) {
      const { status: p, ctx: b } = this._processInputParams(a);
      if (b.common.async)
        return (async () => {
          const g = await this._def.in._parseAsync({
            data: b.data,
            path: b.path,
            parent: b
          });
          return g.status === "aborted" ? o.INVALID : g.status === "dirty" ? (p.dirty(), (0, o.DIRTY)(g.value)) : this._def.out._parseAsync({
            data: g.value,
            path: b.path,
            parent: b
          });
        })();
      {
        const R = this._def.in._parseSync({
          data: b.data,
          path: b.path,
          parent: b
        });
        return R.status === "aborted" ? o.INVALID : R.status === "dirty" ? (p.dirty(), {
          status: "dirty",
          value: R.value
        }) : this._def.out._parseSync({
          data: R.value,
          path: b.path,
          parent: b
        });
      }
    }
    static create(a, p) {
      return new Ri({
        in: a,
        out: p,
        typeName: M.ZodPipeline
      });
    }
  }
  t.ZodPipeline = Ri;
  class Ai extends v {
    _parse(a) {
      const p = this._def.innerType._parse(a);
      return (0, o.isValid)(p) && (p.value = Object.freeze(p.value)), p;
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  t.ZodReadonly = Ai, Ai.create = (x, a) => new Ai({
    innerType: x,
    typeName: M.ZodReadonly,
    ...h(a)
  });
  function wo(x, a = {}, p) {
    return x ? Pr.create().superRefine((b, R) => {
      var g, D;
      if (!x(b)) {
        const k = typeof a == "function" ? a(b) : typeof a == "string" ? { message: a } : a, O = (D = (g = k.fatal) !== null && g !== void 0 ? g : p) !== null && D !== void 0 ? D : !0, j = typeof k == "string" ? { message: k } : k;
        R.addIssue({ code: "custom", ...j, fatal: O });
      }
    }) : Pr.create();
  }
  t.custom = wo, t.late = {
    object: re.lazycreate
  };
  var M;
  (function(x) {
    x.ZodString = "ZodString", x.ZodNumber = "ZodNumber", x.ZodNaN = "ZodNaN", x.ZodBigInt = "ZodBigInt", x.ZodBoolean = "ZodBoolean", x.ZodDate = "ZodDate", x.ZodSymbol = "ZodSymbol", x.ZodUndefined = "ZodUndefined", x.ZodNull = "ZodNull", x.ZodAny = "ZodAny", x.ZodUnknown = "ZodUnknown", x.ZodNever = "ZodNever", x.ZodVoid = "ZodVoid", x.ZodArray = "ZodArray", x.ZodObject = "ZodObject", x.ZodUnion = "ZodUnion", x.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", x.ZodIntersection = "ZodIntersection", x.ZodTuple = "ZodTuple", x.ZodRecord = "ZodRecord", x.ZodMap = "ZodMap", x.ZodSet = "ZodSet", x.ZodFunction = "ZodFunction", x.ZodLazy = "ZodLazy", x.ZodLiteral = "ZodLiteral", x.ZodEnum = "ZodEnum", x.ZodEffects = "ZodEffects", x.ZodNativeEnum = "ZodNativeEnum", x.ZodOptional = "ZodOptional", x.ZodNullable = "ZodNullable", x.ZodDefault = "ZodDefault", x.ZodCatch = "ZodCatch", x.ZodPromise = "ZodPromise", x.ZodBranded = "ZodBranded", x.ZodPipeline = "ZodPipeline", x.ZodReadonly = "ZodReadonly";
  })(M = t.ZodFirstPartyTypeKind || (t.ZodFirstPartyTypeKind = {}));
  const qp = (x, a = {
    message: `Input not instance of ${x.name}`
  }) => wo((p) => p instanceof x, a);
  t.instanceof = qp;
  const To = qe.create;
  t.string = To;
  const Co = $t.create;
  t.number = Co;
  const Xp = Os.create;
  t.nan = Xp;
  const zp = Mt.create;
  t.bigint = zp;
  const Lo = ci.create;
  t.boolean = Lo;
  const Fp = nr.create;
  t.date = Fp;
  const Zp = Ks.create;
  t.symbol = Zp;
  const Hp = pi.create;
  t.undefined = Hp;
  const Wp = fi.create;
  t.null = Wp;
  const Jp = Pr.create;
  t.any = Jp;
  const Qp = sr.create;
  t.unknown = Qp;
  const Yp = Et.create;
  t.never = Yp;
  const ef = Us.create;
  t.void = ef;
  const tf = Xe.create;
  t.array = tf;
  const rf = re.create;
  t.object = rf;
  const nf = re.strictCreate;
  t.strictObject = nf;
  const sf = di.create;
  t.union = sf;
  const af = Vs.create;
  t.discriminatedUnion = af;
  const of = bi.create;
  t.intersection = of;
  const lf = Ye.create;
  t.tuple = lf;
  const uf = mi.create;
  t.record = uf;
  const cf = Is.create;
  t.map = cf;
  const pf = ar.create;
  t.set = pf;
  const ff = Ur.create;
  t.function = ff;
  const df = yi.create;
  t.lazy = df;
  const bf = hi.create;
  t.literal = bf;
  const mf = Gt.create;
  t.enum = mf;
  const yf = Ei.create;
  t.nativeEnum = yf;
  const hf = Vr.create;
  t.promise = hf;
  const So = ze.create;
  t.effect = So, t.transformer = So;
  const Ef = et.create;
  t.optional = Ef;
  const xf = qt.create;
  t.nullable = xf;
  const gf = ze.createWithPreprocess;
  t.preprocess = gf;
  const Rf = Ri.create;
  t.pipeline = Rf;
  const Af = () => To().optional();
  t.ostring = Af;
  const vf = () => Co().optional();
  t.onumber = vf;
  const _f = () => Lo().optional();
  t.oboolean = _f, t.coerce = {
    string: (x) => qe.create({ ...x, coerce: !0 }),
    number: (x) => $t.create({ ...x, coerce: !0 }),
    boolean: (x) => ci.create({
      ...x,
      coerce: !0
    }),
    bigint: (x) => Mt.create({ ...x, coerce: !0 }),
    date: (x) => nr.create({ ...x, coerce: !0 })
  }, t.NEVER = o.INVALID;
})(lu);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(n, s, u, l) {
    l === void 0 && (l = u), Object.defineProperty(n, l, { enumerable: !0, get: function() {
      return s[u];
    } });
  } : function(n, s, u, l) {
    l === void 0 && (l = u), n[l] = s[u];
  }), r = B && B.__exportStar || function(n, s) {
    for (var u in n)
      u !== "default" && !Object.prototype.hasOwnProperty.call(s, u) && e(s, n, u);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), r(ut, t), r(no, t), r(ou, t), r(Vi, t), r(lu, t), r(ct, t);
})(Ha);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(l, o, d, f) {
    f === void 0 && (f = d), Object.defineProperty(l, f, { enumerable: !0, get: function() {
      return o[d];
    } });
  } : function(l, o, d, f) {
    f === void 0 && (f = d), l[f] = o[d];
  }), r = B && B.__setModuleDefault || (Object.create ? function(l, o) {
    Object.defineProperty(l, "default", { enumerable: !0, value: o });
  } : function(l, o) {
    l.default = o;
  }), n = B && B.__importStar || function(l) {
    if (l && l.__esModule)
      return l;
    var o = {};
    if (l != null)
      for (var d in l)
        d !== "default" && Object.prototype.hasOwnProperty.call(l, d) && e(o, l, d);
    return r(o, l), o;
  }, s = B && B.__exportStar || function(l, o) {
    for (var d in l)
      d !== "default" && !Object.prototype.hasOwnProperty.call(o, d) && e(o, l, d);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.z = void 0;
  const u = n(Ha);
  t.z = u, s(Ha, t), t.default = u;
})(Sr);
var Ke = {}, gt = {}, Ee = {}, tr = {}, Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.isObject = Ft.assure = Ft.is = void 0;
const od = (t, e) => e.safeParse(t).success;
Ft.is = od;
const ld = (t, e) => t.parse(e);
Ft.assure = ld;
const ud = (t) => typeof t == "object" && t !== null;
Ft.isObject = ud;
var Mr = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.parseIntWithFallback = t.dedupeStrs = t.range = t.chunkArray = t.errHasMsg = t.isErrnoException = t.asyncFilter = t.s32decode = t.s32encode = t.streamToBuffer = t.flattenUint8Arrays = t.bailableWait = t.wait = t.jitter = t.noUndefinedVals = void 0;
  const e = (A) => (Object.keys(A).forEach((L) => {
    A[L] === void 0 && delete A[L];
  }), A);
  t.noUndefinedVals = e;
  const r = (A) => Math.round((Math.random() - 0.5) * A * 2);
  t.jitter = r;
  const n = (A) => new Promise((L) => setTimeout(L, A));
  t.wait = n;
  const s = (A) => {
    let L;
    const K = new Promise((V) => {
      const N = setTimeout(V, A);
      L = () => {
        clearTimeout(N), V();
      };
    });
    return { bail: L, wait: () => K };
  };
  t.bailableWait = s;
  const u = (A) => {
    const L = A.reduce((N, q) => N + q.length, 0), K = new Uint8Array(L);
    let V = 0;
    return A.forEach((N) => {
      K.set(N, V), V += N.length;
    }), K;
  };
  t.flattenUint8Arrays = u;
  const l = async (A) => {
    const L = [];
    for await (const K of A)
      L.push(K);
    return (0, t.flattenUint8Arrays)(L);
  };
  t.streamToBuffer = l;
  const o = "234567abcdefghijklmnopqrstuvwxyz", d = (A) => {
    let L = "";
    for (; A; ) {
      const K = A % 32;
      A = Math.floor(A / 32), L = o.charAt(K) + L;
    }
    return L;
  };
  t.s32encode = d;
  const f = (A) => {
    let L = 0;
    for (const K of A)
      L = L * 32 + o.indexOf(K);
    return L;
  };
  t.s32decode = f;
  const m = async (A, L) => {
    const K = await Promise.all(A.map((V) => L(V)));
    return A.filter((V, N) => K[N]);
  };
  t.asyncFilter = m;
  const E = (A) => !!A && A.code;
  t.isErrnoException = E;
  const h = (A, L) => !!A && typeof A == "object" && A.message === L;
  t.errHasMsg = h;
  const v = (A, L) => A.reduce((K, V, N) => {
    const q = Math.floor(N / L);
    return K[q] || (K[q] = []), K[q].push(V), K;
  }, []);
  t.chunkArray = v;
  const T = (A) => {
    const L = [];
    for (let K = 0; K < A; K++)
      L.push(K);
    return L;
  };
  t.range = T;
  const _ = (A) => [...new Set(A)];
  t.dedupeStrs = _;
  const w = (A, L) => {
    const K = parseInt(A || "", 10);
    return isNaN(K) ? L : K;
  };
  t.parseIntWithFallback = w;
})(Mr);
var Gr = {};
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.mapDefined = Gr.keyBy = void 0;
const cd = (t, e) => t.reduce((r, n) => (r[n[e]] = n, r), {});
Gr.keyBy = cd;
const pd = (t, e) => {
  const r = [];
  for (const n of t) {
    const s = e(n);
    s !== void 0 && r.push(s);
  }
  return r;
};
Gr.mapDefined = pd;
var cu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.handleAllSettledErrors = t.AsyncBufferFullError = t.AsyncBuffer = t.allComplete = t.createDeferrables = t.createDeferrable = t.readFromGenerator = void 0;
  const e = Mr, r = async (m, E, h = Promise.resolve(), v = Number.MAX_SAFE_INTEGER) => {
    const T = [];
    let _, w = !1;
    const A = async () => {
      if (await E(T.at(-1)))
        return !0;
      const K = (0, e.bailableWait)(20);
      return await K.wait(), _ = K.bail, w ? !1 : await A();
    }, L = new Promise((K) => {
      h.then(() => {
        A().then(() => K());
      });
    });
    try {
      for (; T.length < v; ) {
        const K = await Promise.race([m.next(), L]);
        if (!K)
          break;
        const V = K;
        if (V.done)
          break;
        T.push(V.value);
      }
    } finally {
      w = !0, _ && _();
    }
    return T;
  };
  t.readFromGenerator = r;
  const n = () => {
    let m;
    const E = new Promise((h) => {
      m = () => h();
    });
    return { resolve: m, complete: E };
  };
  t.createDeferrable = n;
  const s = (m) => {
    const E = [];
    for (let h = 0; h < m; h++)
      E.push((0, t.createDeferrable)());
    return E;
  };
  t.createDeferrables = s;
  const u = async (m) => {
    await Promise.all(m.map((E) => E.complete));
  };
  t.allComplete = u;
  class l {
    constructor(E) {
      Object.defineProperty(this, "maxSize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: E
      }), Object.defineProperty(this, "buffer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "promise", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "resolve", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "closed", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "toThrow", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.promise = Promise.resolve(), this.resolve = () => null, this.resetPromise();
    }
    get curr() {
      return this.buffer;
    }
    get size() {
      return this.buffer.length;
    }
    get isClosed() {
      return this.closed;
    }
    resetPromise() {
      this.promise = new Promise((E) => this.resolve = E);
    }
    push(E) {
      this.buffer.push(E), this.resolve();
    }
    pushMany(E) {
      E.forEach((h) => this.buffer.push(h)), this.resolve();
    }
    async *events() {
      for (; ; ) {
        if (this.closed && this.buffer.length === 0) {
          if (this.toThrow)
            throw this.toThrow;
          return;
        }
        if (await this.promise, this.toThrow)
          throw this.toThrow;
        if (this.maxSize && this.size > this.maxSize)
          throw new o(this.maxSize);
        const [E, ...h] = this.buffer;
        E ? (this.buffer = h, yield E) : this.resetPromise();
      }
    }
    throw(E) {
      this.toThrow = E, this.closed = !0, this.resolve();
    }
    close() {
      this.closed = !0, this.resolve();
    }
  }
  t.AsyncBuffer = l;
  class o extends Error {
    constructor(E) {
      super(`ReachedMaxBufferSize: ${E}`);
    }
  }
  t.AsyncBufferFullError = o;
  const d = (m) => {
    const E = m.filter(f).map((h) => h.reason);
    if (E.length !== 0)
      throw E.length === 1 ? E[0] : new AggregateError(E, "Multiple errors: " + E.map((h) => h?.message).join(`
`));
  };
  t.handleAllSettledErrors = d;
  const f = (m) => m.status === "rejected";
})(cu);
var Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.TID = void 0;
const Ns = Mr, Uo = 13;
let ja = 0, Vo = 0, $s = null;
function Io(t) {
  return t.replaceAll("-", "");
}
class _t {
  constructor(e) {
    Object.defineProperty(this, "str", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    });
    const r = Io(e);
    if (r.length !== Uo)
      throw new Error(`Poorly formatted TID: ${r.length} length`);
    this.str = r;
  }
  static next(e) {
    const r = Math.max(Date.now(), ja);
    r === ja && Vo++, ja = r;
    const n = r * 1e3 + Vo;
    $s === null && ($s = Math.floor(Math.random() * 32));
    const s = _t.fromTime(n, $s);
    return !e || s.newerThan(e) ? s : _t.fromTime(e.timestamp() + 1, $s);
  }
  static nextStr(e) {
    return _t.next(e ? new _t(e) : void 0).toString();
  }
  static fromTime(e, r) {
    const n = `${(0, Ns.s32encode)(e)}${(0, Ns.s32encode)(r).padStart(2, "2")}`;
    return new _t(n);
  }
  static fromStr(e) {
    return new _t(e);
  }
  static oldestFirst(e, r) {
    return e.compareTo(r);
  }
  static newestFirst(e, r) {
    return r.compareTo(e);
  }
  static is(e) {
    return Io(e).length === Uo;
  }
  timestamp() {
    return (0, Ns.s32decode)(this.str.slice(0, 11));
  }
  clockid() {
    return (0, Ns.s32decode)(this.str.slice(11, 13));
  }
  formatted() {
    const e = this.toString();
    return `${e.slice(0, 4)}-${e.slice(4, 7)}-${e.slice(7, 11)}-${e.slice(11, 13)}`;
  }
  toString() {
    return this.str;
  }
  // newer > older
  compareTo(e) {
    return this.str > e.str ? 1 : this.str < e.str ? -1 : 0;
  }
  equals(e) {
    return this.str === e.str;
  }
  newerThan(e) {
    return this.compareTo(e) > 0;
  }
  olderThan(e) {
    return this.compareTo(e) < 0;
  }
}
Ii.TID = _t;
Ii.default = _t;
var pu = {}, fd = fu, Oo = 128, dd = 127, bd = ~dd, md = Math.pow(2, 31);
function fu(t, e, r) {
  e = e || [], r = r || 0;
  for (var n = r; t >= md; )
    e[r++] = t & 255 | Oo, t /= 128;
  for (; t & bd; )
    e[r++] = t & 255 | Oo, t >>>= 7;
  return e[r] = t | 0, fu.bytes = r - n + 1, e;
}
var yd = Wa, hd = 128, jo = 127;
function Wa(t, n) {
  var r = 0, n = n || 0, s = 0, u = n, l, o = t.length;
  do {
    if (u >= o)
      throw Wa.bytes = 0, new RangeError("Could not decode varint");
    l = t[u++], r += s < 28 ? (l & jo) << s : (l & jo) * Math.pow(2, s), s += 7;
  } while (l >= hd);
  return Wa.bytes = u - n, r;
}
var Ed = Math.pow(2, 7), xd = Math.pow(2, 14), gd = Math.pow(2, 21), Rd = Math.pow(2, 28), Ad = Math.pow(2, 35), vd = Math.pow(2, 42), _d = Math.pow(2, 49), wd = Math.pow(2, 56), Td = Math.pow(2, 63), Cd = function(t) {
  return t < Ed ? 1 : t < xd ? 2 : t < gd ? 3 : t < Rd ? 4 : t < Ad ? 5 : t < vd ? 6 : t < _d ? 7 : t < wd ? 8 : t < Td ? 9 : 10;
}, Ld = {
  encode: fd,
  decode: yd,
  encodingLength: Cd
}, Qs = Ld;
const Ja = (t, e = 0) => [
  Qs.decode(t, e),
  Qs.decode.bytes
], Ys = (t, e, r = 0) => (Qs.encode(t, e, r), e), ea = (t) => Qs.encodingLength(t), Sd = (t, e) => {
  if (t === e)
    return !0;
  if (t.byteLength !== e.byteLength)
    return !1;
  for (let r = 0; r < t.byteLength; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}, so = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
    return t;
  if (t instanceof ArrayBuffer)
    return new Uint8Array(t);
  if (ArrayBuffer.isView(t))
    return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, kd = (t) => new TextEncoder().encode(t), Bd = (t) => new TextDecoder().decode(t), Dd = (t, e) => {
  const r = e.byteLength, n = ea(t), s = n + ea(r), u = new Uint8Array(s + r);
  return Ys(t, u, 0), Ys(r, u, n), u.set(e, s), new ao(t, r, e, u);
}, Pd = (t) => {
  const e = so(t), [r, n] = Ja(e), [s, u] = Ja(e.subarray(n)), l = e.subarray(n + u);
  if (l.byteLength !== s)
    throw new Error("Incorrect length");
  return new ao(r, s, l, e);
}, Kd = (t, e) => t === e ? !0 : t.code === e.code && t.size === e.size && Sd(t.bytes, e.bytes);
class ao {
  constructor(e, r, n, s) {
    this.code = e, this.size = r, this.digest = n, this.bytes = s;
  }
}
function Ud(t, e) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
    r[n] = 255;
  for (var s = 0; s < t.length; s++) {
    var u = t.charAt(s), l = u.charCodeAt(0);
    if (r[l] !== 255)
      throw new TypeError(u + " is ambiguous");
    r[l] = s;
  }
  var o = t.length, d = t.charAt(0), f = Math.log(o) / Math.log(256), m = Math.log(256) / Math.log(o);
  function E(T) {
    if (T instanceof Uint8Array || (ArrayBuffer.isView(T) ? T = new Uint8Array(T.buffer, T.byteOffset, T.byteLength) : Array.isArray(T) && (T = Uint8Array.from(T))), !(T instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (T.length === 0)
      return "";
    for (var _ = 0, w = 0, A = 0, L = T.length; A !== L && T[A] === 0; )
      A++, _++;
    for (var K = (L - A) * m + 1 >>> 0, V = new Uint8Array(K); A !== L; ) {
      for (var N = T[A], q = 0, Z = K - 1; (N !== 0 || q < w) && Z !== -1; Z--, q++)
        N += 256 * V[Z] >>> 0, V[Z] = N % o >>> 0, N = N / o >>> 0;
      if (N !== 0)
        throw new Error("Non-zero carry");
      w = q, A++;
    }
    for (var ee = K - w; ee !== K && V[ee] === 0; )
      ee++;
    for (var Pe = d.repeat(_); ee < K; ++ee)
      Pe += t.charAt(V[ee]);
    return Pe;
  }
  function h(T) {
    if (typeof T != "string")
      throw new TypeError("Expected String");
    if (T.length === 0)
      return new Uint8Array();
    var _ = 0;
    if (T[_] !== " ") {
      for (var w = 0, A = 0; T[_] === d; )
        w++, _++;
      for (var L = (T.length - _) * f + 1 >>> 0, K = new Uint8Array(L); T[_]; ) {
        var V = r[T.charCodeAt(_)];
        if (V === 255)
          return;
        for (var N = 0, q = L - 1; (V !== 0 || N < A) && q !== -1; q--, N++)
          V += o * K[q] >>> 0, K[q] = V % 256 >>> 0, V = V / 256 >>> 0;
        if (V !== 0)
          throw new Error("Non-zero carry");
        A = N, _++;
      }
      if (T[_] !== " ") {
        for (var Z = L - A; Z !== L && K[Z] === 0; )
          Z++;
        for (var ee = new Uint8Array(w + (L - Z)), Pe = w; Z !== L; )
          ee[Pe++] = K[Z++];
        return ee;
      }
    }
  }
  function v(T) {
    var _ = h(T);
    if (_)
      return _;
    throw new Error(`Non-${e} character`);
  }
  return {
    encode: E,
    decodeUnsafe: h,
    decode: v
  };
}
var Vd = Ud, Id = Vd;
class Od {
  constructor(e, r, n) {
    this.name = e, this.prefix = r, this.baseEncode = n;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class jd {
  constructor(e, r, n) {
    if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = r.codePointAt(0), this.baseDecode = n;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return du(this, e);
  }
}
class Nd {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return du(this, e);
  }
  decode(e) {
    const r = e[0], n = this.decoders[r];
    if (n)
      return n.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const du = (t, e) => new Nd({
  ...t.decoders || { [t.prefix]: t },
  ...e.decoders || { [e.prefix]: e }
});
class $d {
  constructor(e, r, n, s) {
    this.name = e, this.prefix = r, this.baseEncode = n, this.baseDecode = s, this.encoder = new Od(e, r, n), this.decoder = new jd(e, r, s);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const pa = ({ name: t, prefix: e, encode: r, decode: n }) => new $d(t, e, r, n), Oi = ({ prefix: t, name: e, alphabet: r }) => {
  const { encode: n, decode: s } = Id(r, e);
  return pa({
    prefix: t,
    name: e,
    encode: n,
    decode: (u) => so(s(u))
  });
}, Md = (t, e, r, n) => {
  const s = {};
  for (let m = 0; m < e.length; ++m)
    s[e[m]] = m;
  let u = t.length;
  for (; t[u - 1] === "="; )
    --u;
  const l = new Uint8Array(u * r / 8 | 0);
  let o = 0, d = 0, f = 0;
  for (let m = 0; m < u; ++m) {
    const E = s[t[m]];
    if (E === void 0)
      throw new SyntaxError(`Non-${n} character`);
    d = d << r | E, o += r, o >= 8 && (o -= 8, l[f++] = 255 & d >> o);
  }
  if (o >= r || 255 & d << 8 - o)
    throw new SyntaxError("Unexpected end of data");
  return l;
}, Gd = (t, e, r) => {
  const n = e[e.length - 1] === "=", s = (1 << r) - 1;
  let u = "", l = 0, o = 0;
  for (let d = 0; d < t.length; ++d)
    for (o = o << 8 | t[d], l += 8; l > r; )
      l -= r, u += e[s & o >> l];
  if (l && (u += e[s & o << r - l]), n)
    for (; u.length * r & 7; )
      u += "=";
  return u;
}, ge = ({ name: t, prefix: e, bitsPerChar: r, alphabet: n }) => pa({
  prefix: e,
  name: t,
  encode(s) {
    return Gd(s, n, r);
  },
  decode(s) {
    return Md(s, n, r, t);
  }
}), wt = Oi({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), qd = Oi({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), Xd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: wt,
  base58flickr: qd
}, Symbol.toStringTag, { value: "Module" })), Si = ge({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), zd = ge({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), Fd = ge({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), Zd = ge({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), Hd = ge({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), Wd = ge({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), Jd = ge({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), Qd = ge({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), Yd = ge({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), eb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: Si,
  base32hex: Hd,
  base32hexpad: Jd,
  base32hexpadupper: Qd,
  base32hexupper: Wd,
  base32pad: Fd,
  base32padupper: Zd,
  base32upper: zd,
  base32z: Yd
}, Symbol.toStringTag, { value: "Module" }));
class ve {
  constructor(e, r, n, s) {
    this.code = r, this.version = e, this.multihash = n, this.bytes = s, this.byteOffset = s.byteOffset, this.byteLength = s.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, {
      byteOffset: Gs,
      byteLength: Gs,
      code: Ms,
      version: Ms,
      multihash: Ms,
      bytes: Ms,
      _baseCache: Gs,
      asCID: Gs
    });
  }
  toV0() {
    switch (this.version) {
      case 0:
        return this;
      default: {
        const { code: e, multihash: r } = this;
        if (e !== vi)
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        if (r.code !== nb)
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        return ve.createV0(r);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: e, digest: r } = this.multihash, n = Dd(e, r);
        return ve.createV1(this.code, n);
      }
      case 1:
        return this;
      default:
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
    }
  }
  equals(e) {
    return e && this.code === e.code && this.version === e.version && Kd(this.multihash, e.multihash);
  }
  toString(e) {
    const { bytes: r, version: n, _baseCache: s } = this;
    switch (n) {
      case 0:
        return rb(r, s, e || wt.encoder);
      default:
        return ib(r, s, e || Si.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(e) {
    return ab(/^0\.0/, ob), !!(e && (e[$o] || e.asCID === e));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(e) {
    if (e instanceof ve)
      return e;
    if (e != null && e.asCID === e) {
      const { version: r, code: n, multihash: s, bytes: u } = e;
      return new ve(r, n, s, u || No(r, n, s.bytes));
    } else if (e != null && e[$o] === !0) {
      const { version: r, multihash: n, code: s } = e, u = Pd(n);
      return ve.create(r, s, u);
    } else
      return null;
  }
  static create(e, r, n) {
    if (typeof r != "number")
      throw new Error("String codecs are no longer supported");
    switch (e) {
      case 0: {
        if (r !== vi)
          throw new Error(`Version 0 CID must use dag-pb (code: ${vi}) block encoding`);
        return new ve(e, r, n, n.bytes);
      }
      case 1: {
        const s = No(e, r, n.bytes);
        return new ve(e, r, n, s);
      }
      default:
        throw new Error("Invalid version");
    }
  }
  static createV0(e) {
    return ve.create(0, vi, e);
  }
  static createV1(e, r) {
    return ve.create(1, e, r);
  }
  static decode(e) {
    const [r, n] = ve.decodeFirst(e);
    if (n.length)
      throw new Error("Incorrect length");
    return r;
  }
  static decodeFirst(e) {
    const r = ve.inspectBytes(e), n = r.size - r.multihashSize, s = so(e.subarray(n, n + r.multihashSize));
    if (s.byteLength !== r.multihashSize)
      throw new Error("Incorrect length");
    const u = s.subarray(r.multihashSize - r.digestSize), l = new ao(r.multihashCode, r.digestSize, u, s);
    return [
      r.version === 0 ? ve.createV0(l) : ve.createV1(r.codec, l),
      e.subarray(r.size)
    ];
  }
  static inspectBytes(e) {
    let r = 0;
    const n = () => {
      const [E, h] = Ja(e.subarray(r));
      return r += h, E;
    };
    let s = n(), u = vi;
    if (s === 18 ? (s = 0, r = 0) : s === 1 && (u = n()), s !== 0 && s !== 1)
      throw new RangeError(`Invalid CID version ${s}`);
    const l = r, o = n(), d = n(), f = r + d, m = f - l;
    return {
      version: s,
      codec: u,
      multihashCode: o,
      digestSize: d,
      multihashSize: m,
      size: f
    };
  }
  static parse(e, r) {
    const [n, s] = tb(e, r), u = ve.decode(s);
    return u._baseCache.set(n, e), u;
  }
}
const tb = (t, e) => {
  switch (t[0]) {
    case "Q": {
      const r = e || wt;
      return [
        wt.prefix,
        r.decode(`${wt.prefix}${t}`)
      ];
    }
    case wt.prefix: {
      const r = e || wt;
      return [
        wt.prefix,
        r.decode(t)
      ];
    }
    case Si.prefix: {
      const r = e || Si;
      return [
        Si.prefix,
        r.decode(t)
      ];
    }
    default: {
      if (e == null)
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      return [
        t[0],
        e.decode(t)
      ];
    }
  }
}, rb = (t, e, r) => {
  const { prefix: n } = r;
  if (n !== wt.prefix)
    throw Error(`Cannot string encode V0 in ${r.name} encoding`);
  const s = e.get(n);
  if (s == null) {
    const u = r.encode(t).slice(1);
    return e.set(n, u), u;
  } else
    return s;
}, ib = (t, e, r) => {
  const { prefix: n } = r, s = e.get(n);
  if (s == null) {
    const u = r.encode(t);
    return e.set(n, u), u;
  } else
    return s;
}, vi = 112, nb = 18, No = (t, e, r) => {
  const n = ea(t), s = n + ea(e), u = new Uint8Array(s + r.byteLength);
  return Ys(t, u, 0), Ys(e, u, n), u.set(r, s), u;
}, $o = Symbol.for("@ipld/js-cid/CID"), Ms = {
  writable: !1,
  configurable: !1,
  enumerable: !0
}, Gs = {
  writable: !1,
  enumerable: !1,
  configurable: !1
}, sb = "0.0.0-dev", ab = (t, e) => {
  if (t.test(sb))
    console.warn(e);
  else
    throw new Error(e);
}, ob = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`, lb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CID: ve
}, Symbol.toStringTag, { value: "Module" })), oi = /* @__PURE__ */ Wl(lb);
function ub(t, e) {
  for (let r = 0; r < t.byteLength; r++) {
    if (t[r] < e[r])
      return -1;
    if (t[r] > e[r])
      return 1;
  }
  return t.byteLength > e.byteLength ? 1 : t.byteLength < e.byteLength ? -1 : 0;
}
function cb(t, e) {
  e || (e = t.reduce((s, u) => s + u.length, 0));
  const r = new Uint8Array(e);
  let n = 0;
  for (const s of t)
    r.set(s, n), n += s.length;
  return r;
}
function pb(t, e) {
  if (t === e)
    return !0;
  if (t.byteLength !== e.byteLength)
    return !1;
  for (let r = 0; r < t.byteLength; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}
const fb = pa({
  prefix: "\0",
  name: "identity",
  encode: (t) => Bd(t),
  decode: (t) => kd(t)
}), db = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: fb
}, Symbol.toStringTag, { value: "Module" })), bb = ge({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), mb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: bb
}, Symbol.toStringTag, { value: "Module" })), yb = ge({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), hb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: yb
}, Symbol.toStringTag, { value: "Module" })), Eb = Oi({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), xb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: Eb
}, Symbol.toStringTag, { value: "Module" })), gb = ge({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), Rb = ge({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), Ab = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: gb,
  base16upper: Rb
}, Symbol.toStringTag, { value: "Module" })), vb = Oi({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), _b = Oi({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), wb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: vb,
  base36upper: _b
}, Symbol.toStringTag, { value: "Module" })), Tb = ge({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), Cb = ge({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), Lb = ge({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), Sb = ge({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), kb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: Tb,
  base64pad: Cb,
  base64url: Lb,
  base64urlpad: Sb
}, Symbol.toStringTag, { value: "Module" })), bu = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Bb = bu.reduce((t, e, r) => (t[r] = e, t), []), Db = bu.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
function Pb(t) {
  return t.reduce((e, r) => (e += Bb[r], e), "");
}
function Kb(t) {
  const e = [];
  for (const r of t) {
    const n = Db[r.codePointAt(0)];
    if (n === void 0)
      throw new Error(`Non-base256emoji character: ${r}`);
    e.push(n);
  }
  return new Uint8Array(e);
}
const Ub = pa({
  prefix: "🚀",
  name: "base256emoji",
  encode: Pb,
  decode: Kb
}), Vb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: Ub
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const Mo = {
  ...db,
  ...mb,
  ...hb,
  ...xb,
  ...Ab,
  ...eb,
  ...wb,
  ...Xd,
  ...kb,
  ...Vb
};
function mu(t, e, r, n) {
  return {
    name: t,
    prefix: e,
    encoder: {
      name: t,
      prefix: e,
      encode: r
    },
    decoder: { decode: n }
  };
}
const Go = mu("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), Na = mu("ascii", "a", (t) => {
  let e = "a";
  for (let r = 0; r < t.length; r++)
    e += String.fromCharCode(t[r]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++)
    e[r] = t.charCodeAt(r);
  return e;
}), yu = {
  utf8: Go,
  "utf-8": Go,
  hex: Mo.base16,
  latin1: Na,
  ascii: Na,
  binary: Na,
  ...Mo
};
function Ib(t, e = "utf8") {
  const r = yu[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return r.decoder.decode(`${r.prefix}${t}`);
}
function Ob(t, e = "utf8") {
  const r = yu[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return r.encoder.encode(t).substring(1);
}
function jb(t, e) {
  if (t.length !== e.length)
    throw new Error("Inputs should have the same length");
  const r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t[n] ^ e[n];
  return r;
}
const Nb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compare: ub,
  concat: cb,
  equals: pb,
  fromString: Ib,
  toString: Ob,
  xor: jb
}, Symbol.toStringTag, { value: "Module" })), hu = /* @__PURE__ */ Wl(Nb);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(f, m, E, h) {
    h === void 0 && (h = E);
    var v = Object.getOwnPropertyDescriptor(m, E);
    (!v || ("get" in v ? !m.__esModule : v.writable || v.configurable)) && (v = { enumerable: !0, get: function() {
      return m[E];
    } }), Object.defineProperty(f, h, v);
  } : function(f, m, E, h) {
    h === void 0 && (h = E), f[h] = m[E];
  }), r = B && B.__setModuleDefault || (Object.create ? function(f, m) {
    Object.defineProperty(f, "default", { enumerable: !0, value: m });
  } : function(f, m) {
    f.default = m;
  }), n = B && B.__importStar || function(f) {
    if (f && f.__esModule)
      return f;
    var m = {};
    if (f != null)
      for (var E in f)
        E !== "default" && Object.prototype.hasOwnProperty.call(f, E) && e(m, f, E);
    return r(m, f), m;
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ipldEquals = t.ipldToJson = t.jsonToIpld = void 0;
  const s = oi, u = n(hu), l = (f) => {
    if (Array.isArray(f))
      return f.map((m) => (0, t.jsonToIpld)(m));
    if (f && typeof f == "object") {
      if (typeof f.$link == "string" && Object.keys(f).length === 1)
        return s.CID.parse(f.$link);
      if (typeof f.$bytes == "string" && Object.keys(f).length === 1)
        return u.fromString(f.$bytes, "base64");
      const m = {};
      for (const E of Object.keys(f))
        m[E] = (0, t.jsonToIpld)(f[E]);
      return m;
    }
    return f;
  };
  t.jsonToIpld = l;
  const o = (f) => {
    if (Array.isArray(f))
      return f.map((m) => (0, t.ipldToJson)(m));
    if (f && typeof f == "object") {
      if (f instanceof Uint8Array)
        return {
          $bytes: u.toString(f, "base64")
        };
      if (s.CID.asCID(f))
        return {
          $link: f.toString()
        };
      const m = {};
      for (const E of Object.keys(f))
        m[E] = (0, t.ipldToJson)(f[E]);
      return m;
    }
    return f;
  };
  t.ipldToJson = o;
  const d = (f, m) => {
    if (Array.isArray(f) && Array.isArray(m)) {
      if (f.length !== m.length)
        return !1;
      for (let E = 0; E < f.length; E++)
        if (!(0, t.ipldEquals)(f[E], m[E]))
          return !1;
      return !0;
    }
    if (f && m && typeof f == "object" && typeof m == "object") {
      if (f instanceof Uint8Array && m instanceof Uint8Array)
        return u.equals(f, m);
      if (s.CID.asCID(f) && s.CID.asCID(m))
        return s.CID.asCID(f)?.equals(s.CID.asCID(m));
      if (Object.keys(f).length !== Object.keys(m).length)
        return !1;
      for (const E of Object.keys(f))
        if (!(0, t.ipldEquals)(f[E], m[E]))
          return !1;
      return !0;
    }
    return f === m;
  };
  t.ipldEquals = d;
})(pu);
var qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.backoffMs = qr.retry = void 0;
const $b = Mr;
async function Mb(t, e = {}) {
  const { maxRetries: r = 3, retryable: n = () => !0, getWaitMs: s = Eu } = e;
  let u = 0, l;
  for (; !l; )
    try {
      return await t();
    } catch (o) {
      const d = s(u);
      u < r && d !== null && n(o) ? (u += 1, d !== 0 && await (0, $b.wait)(d)) : l = o;
    }
  throw l;
}
qr.retry = Mb;
function Eu(t, e = 100, r = 1e3) {
  const n = Math.pow(2, t) * e, s = Math.min(n, r);
  return Gb(s);
}
qr.backoffMs = Eu;
function Gb(t) {
  const e = t * 0.15;
  return t + qb(-e, e);
}
function qb(t, e) {
  return Math.random() * (e - t) + t;
}
var xu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.def = t.schema = void 0;
  const e = oi, r = Sr, n = r.z.any().refine((s) => e.CID.asCID(s) !== null, {
    message: "Not a CID"
  }).transform((s) => e.CID.asCID(s));
  t.schema = {
    cid: n,
    bytes: r.z.instanceof(Uint8Array),
    string: r.z.string(),
    array: r.z.array(r.z.unknown()),
    map: r.z.record(r.z.string(), r.z.unknown()),
    unknown: r.z.unknown()
  }, t.def = {
    cid: {
      name: "cid",
      schema: t.schema.cid
    },
    bytes: {
      name: "bytes",
      schema: t.schema.bytes
    },
    string: {
      name: "string",
      schema: t.schema.string
    },
    map: {
      name: "map",
      schema: t.schema.map
    },
    unknown: {
      name: "unknown",
      schema: t.schema.unknown
    }
  };
})(xu);
var gu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.addHoursToDate = t.lessThanAgoMs = t.DAY = t.HOUR = t.MINUTE = t.SECOND = void 0, t.SECOND = 1e3, t.MINUTE = t.SECOND * 60, t.HOUR = t.MINUTE * 60, t.DAY = t.HOUR * 24;
  const e = (n, s) => Date.now() < n.getTime() + s;
  t.lessThanAgoMs = e;
  const r = (n, s) => {
    const u = s ? new Date(s) : /* @__PURE__ */ new Date();
    return u.setHours(u.getHours() + n), u;
  };
  t.addHoursToDate = r;
})(gu);
var Be = {}, oo = {}, lo = {}, uo = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.EXTENDED_PICTOGRAPHIC = t.CLUSTER_BREAK = void 0, function(e) {
    e[e.CR = 0] = "CR", e[e.LF = 1] = "LF", e[e.CONTROL = 2] = "CONTROL", e[e.EXTEND = 3] = "EXTEND", e[e.REGIONAL_INDICATOR = 4] = "REGIONAL_INDICATOR", e[e.SPACINGMARK = 5] = "SPACINGMARK", e[e.L = 6] = "L", e[e.V = 7] = "V", e[e.T = 8] = "T", e[e.LV = 9] = "LV", e[e.LVT = 10] = "LVT", e[e.OTHER = 11] = "OTHER", e[e.PREPEND = 12] = "PREPEND", e[e.E_BASE = 13] = "E_BASE", e[e.E_MODIFIER = 14] = "E_MODIFIER", e[e.ZWJ = 15] = "ZWJ", e[e.GLUE_AFTER_ZWJ = 16] = "GLUE_AFTER_ZWJ", e[e.E_BASE_GAZ = 17] = "E_BASE_GAZ";
  }(t.CLUSTER_BREAK || (t.CLUSTER_BREAK = {})), t.EXTENDED_PICTOGRAPHIC = 101;
})(uo);
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const F = uo, Rt = 0, $a = 1, Xb = 2, zb = 3, Fb = 4;
class Zb {
  /**
   * Check if the the character at the position {pos} of the string is surrogate
   * @param str {string}
   * @param pos {number}
   * @returns {boolean}
   */
  static isSurrogate(e, r) {
    return 55296 <= e.charCodeAt(r) && e.charCodeAt(r) <= 56319 && 56320 <= e.charCodeAt(r + 1) && e.charCodeAt(r + 1) <= 57343;
  }
  /**
   * The String.prototype.codePointAt polyfill
   * Private function, gets a Unicode code point from a JavaScript UTF-16 string
   * handling surrogate pairs appropriately
   * @param str {string}
   * @param idx {number}
   * @returns {number}
   */
  static codePointAt(e, r) {
    r === void 0 && (r = 0);
    const n = e.charCodeAt(r);
    if (55296 <= n && n <= 56319 && r < e.length - 1) {
      const s = n, u = e.charCodeAt(r + 1);
      return 56320 <= u && u <= 57343 ? (s - 55296) * 1024 + (u - 56320) + 65536 : s;
    }
    if (56320 <= n && n <= 57343 && r >= 1) {
      const s = e.charCodeAt(r - 1), u = n;
      return 55296 <= s && s <= 56319 ? (s - 55296) * 1024 + (u - 56320) + 65536 : u;
    }
    return n;
  }
  //
  /**
   * Private function, returns whether a break is allowed between the two given grapheme breaking classes
   * Implemented the UAX #29 3.1.1 Grapheme Cluster Boundary Rules on extended grapheme clusters
   * @param start {number}
   * @param mid {Array<number>}
   * @param end {number}
   * @param startEmoji {number}
   * @param midEmoji {Array<number>}
   * @param endEmoji {number}
   * @returns {number}
   */
  static shouldBreak(e, r, n, s, u, l) {
    const o = [e].concat(r).concat([n]), d = [s].concat(u).concat([l]), f = o[o.length - 2], m = n, E = l, h = o.lastIndexOf(F.CLUSTER_BREAK.REGIONAL_INDICATOR);
    if (h > 0 && o.slice(1, h).every(function(T) {
      return T === F.CLUSTER_BREAK.REGIONAL_INDICATOR;
    }) && [F.CLUSTER_BREAK.PREPEND, F.CLUSTER_BREAK.REGIONAL_INDICATOR].indexOf(f) === -1)
      return o.filter(function(T) {
        return T === F.CLUSTER_BREAK.REGIONAL_INDICATOR;
      }).length % 2 === 1 ? zb : Fb;
    if (f === F.CLUSTER_BREAK.CR && m === F.CLUSTER_BREAK.LF)
      return Rt;
    if (f === F.CLUSTER_BREAK.CONTROL || f === F.CLUSTER_BREAK.CR || f === F.CLUSTER_BREAK.LF)
      return $a;
    if (m === F.CLUSTER_BREAK.CONTROL || m === F.CLUSTER_BREAK.CR || m === F.CLUSTER_BREAK.LF)
      return $a;
    if (f === F.CLUSTER_BREAK.L && (m === F.CLUSTER_BREAK.L || m === F.CLUSTER_BREAK.V || m === F.CLUSTER_BREAK.LV || m === F.CLUSTER_BREAK.LVT))
      return Rt;
    if ((f === F.CLUSTER_BREAK.LV || f === F.CLUSTER_BREAK.V) && (m === F.CLUSTER_BREAK.V || m === F.CLUSTER_BREAK.T))
      return Rt;
    if ((f === F.CLUSTER_BREAK.LVT || f === F.CLUSTER_BREAK.T) && m === F.CLUSTER_BREAK.T)
      return Rt;
    if (m === F.CLUSTER_BREAK.EXTEND || m === F.CLUSTER_BREAK.ZWJ)
      return Rt;
    if (m === F.CLUSTER_BREAK.SPACINGMARK)
      return Rt;
    if (f === F.CLUSTER_BREAK.PREPEND)
      return Rt;
    const v = d.slice(0, -1).lastIndexOf(F.EXTENDED_PICTOGRAPHIC);
    return v !== -1 && d[v] === F.EXTENDED_PICTOGRAPHIC && o.slice(v + 1, -2).every(function(T) {
      return T === F.CLUSTER_BREAK.EXTEND;
    }) && f === F.CLUSTER_BREAK.ZWJ && E === F.EXTENDED_PICTOGRAPHIC ? Rt : r.indexOf(F.CLUSTER_BREAK.REGIONAL_INDICATOR) !== -1 ? Xb : f === F.CLUSTER_BREAK.REGIONAL_INDICATOR && m === F.CLUSTER_BREAK.REGIONAL_INDICATOR ? Rt : $a;
  }
}
co.default = Zb;
var po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
class Hb {
  constructor(e, r) {
    this._index = 0, this._str = e, this._nextBreak = r;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let e;
    if ((e = this._nextBreak(this._str, this._index)) < this._str.length) {
      const r = this._str.slice(this._index, e);
      return this._index = e, { value: r, done: !1 };
    }
    if (this._index < this._str.length) {
      const r = this._str.slice(this._index);
      return this._index = this._str.length, { value: r, done: !1 };
    }
    return { value: void 0, done: !0 };
  }
}
po.default = Hb;
var Ru = B && B.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(lo, "__esModule", { value: !0 });
const i = uo, qs = Ru(co), Wb = Ru(po);
class At {
  /**
   * Returns the next grapheme break in the string after the given index
   * @param string {string}
   * @param index {number}
   * @returns {number}
   */
  static nextBreak(e, r) {
    if (r === void 0 && (r = 0), r < 0)
      return 0;
    if (r >= e.length - 1)
      return e.length;
    const n = qs.default.codePointAt(e, r), s = At.getGraphemeBreakProperty(n), u = At.getEmojiProperty(n), l = [], o = [];
    for (let d = r + 1; d < e.length; d++) {
      if (qs.default.isSurrogate(e, d - 1))
        continue;
      const f = qs.default.codePointAt(e, d), m = At.getGraphemeBreakProperty(f), E = At.getEmojiProperty(f);
      if (qs.default.shouldBreak(s, l, m, u, o, E))
        return d;
      l.push(m), o.push(E);
    }
    return e.length;
  }
  /**
   * Breaks the given string into an array of grapheme clusters
   * @param str {string}
   * @returns {string[]}
   */
  splitGraphemes(e) {
    const r = [];
    let n = 0, s;
    for (; (s = At.nextBreak(e, n)) < e.length; )
      r.push(e.slice(n, s)), n = s;
    return n < e.length && r.push(e.slice(n)), r;
  }
  /**
   * Returns an iterator of grapheme clusters in the given string
   * @param str {string}
   * @returns {GraphemerIterator}
   */
  iterateGraphemes(e) {
    return new Wb.default(e, At.nextBreak);
  }
  /**
   * Returns the number of grapheme clusters in the given string
   * @param str {string}
   * @returns {number}
   */
  countGraphemes(e) {
    let r = 0, n = 0, s;
    for (; (s = At.nextBreak(e, n)) < e.length; )
      n = s, r++;
    return n < e.length && r++, r;
  }
  /**
   * Given a Unicode code point, determines this symbol's grapheme break property
   * @param code {number} Unicode code point
   * @returns {number}
   */
  static getGraphemeBreakProperty(e) {
    if (e < 48905) {
      if (e < 44116) {
        if (e < 4141) {
          if (e < 2818) {
            if (e < 2363)
              if (e < 1759) {
                if (e < 1471) {
                  if (e < 127) {
                    if (e < 11) {
                      if (e < 10) {
                        if (0 <= e && e <= 9)
                          return i.CLUSTER_BREAK.CONTROL;
                      } else if (e === 10)
                        return i.CLUSTER_BREAK.LF;
                    } else if (e < 13) {
                      if (11 <= e && e <= 12)
                        return i.CLUSTER_BREAK.CONTROL;
                    } else if (e < 14) {
                      if (e === 13)
                        return i.CLUSTER_BREAK.CR;
                    } else if (14 <= e && e <= 31)
                      return i.CLUSTER_BREAK.CONTROL;
                  } else if (e < 768) {
                    if (e < 173) {
                      if (127 <= e && e <= 159)
                        return i.CLUSTER_BREAK.CONTROL;
                    } else if (e === 173)
                      return i.CLUSTER_BREAK.CONTROL;
                  } else if (e < 1155) {
                    if (768 <= e && e <= 879)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 1425) {
                    if (1155 <= e && e <= 1161)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (1425 <= e && e <= 1469)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 1552) {
                  if (e < 1476) {
                    if (e < 1473) {
                      if (e === 1471)
                        return i.CLUSTER_BREAK.EXTEND;
                    } else if (1473 <= e && e <= 1474)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 1479) {
                    if (1476 <= e && e <= 1477)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 1536) {
                    if (e === 1479)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (1536 <= e && e <= 1541)
                    return i.CLUSTER_BREAK.PREPEND;
                } else if (e < 1648) {
                  if (e < 1564) {
                    if (1552 <= e && e <= 1562)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 1611) {
                    if (e === 1564)
                      return i.CLUSTER_BREAK.CONTROL;
                  } else if (1611 <= e && e <= 1631)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 1750) {
                  if (e === 1648)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 1757) {
                  if (1750 <= e && e <= 1756)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 1757)
                  return i.CLUSTER_BREAK.PREPEND;
              } else if (e < 2075) {
                if (e < 1840)
                  if (e < 1770) {
                    if (e < 1767) {
                      if (1759 <= e && e <= 1764)
                        return i.CLUSTER_BREAK.EXTEND;
                    } else if (1767 <= e && e <= 1768)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 1807) {
                    if (1770 <= e && e <= 1773)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else {
                    if (e === 1807)
                      return i.CLUSTER_BREAK.PREPEND;
                    if (e === 1809)
                      return i.CLUSTER_BREAK.EXTEND;
                  }
                else if (e < 2027) {
                  if (e < 1958) {
                    if (1840 <= e && e <= 1866)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (1958 <= e && e <= 1968)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2045) {
                  if (2027 <= e && e <= 2035)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2070) {
                  if (e === 2045)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (2070 <= e && e <= 2073)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2200) {
                if (e < 2089) {
                  if (e < 2085) {
                    if (2075 <= e && e <= 2083)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (2085 <= e && e <= 2087)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2137) {
                  if (2089 <= e && e <= 2093)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2192) {
                  if (2137 <= e && e <= 2139)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (2192 <= e && e <= 2193)
                  return i.CLUSTER_BREAK.PREPEND;
              } else if (e < 2275) {
                if (e < 2250) {
                  if (2200 <= e && e <= 2207)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2274) {
                  if (2250 <= e && e <= 2273)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 2274)
                  return i.CLUSTER_BREAK.PREPEND;
              } else if (e < 2307) {
                if (2275 <= e && e <= 2306)
                  return i.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 2307)
                  return i.CLUSTER_BREAK.SPACINGMARK;
                if (e === 2362)
                  return i.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 2561) {
              if (e < 2434) {
                if (e < 2381) {
                  if (e < 2366) {
                    if (e === 2363)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                    if (e === 2364)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2369) {
                    if (2366 <= e && e <= 2368)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 2377) {
                    if (2369 <= e && e <= 2376)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (2377 <= e && e <= 2380)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 2385) {
                  if (e < 2382) {
                    if (e === 2381)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (2382 <= e && e <= 2383)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 2402) {
                  if (2385 <= e && e <= 2391)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2433) {
                  if (2402 <= e && e <= 2403)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 2433)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2503) {
                if (e < 2494) {
                  if (e < 2492) {
                    if (2434 <= e && e <= 2435)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 2492)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2495) {
                  if (e === 2494)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2497) {
                  if (2495 <= e && e <= 2496)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (2497 <= e && e <= 2500)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2519) {
                if (e < 2507) {
                  if (2503 <= e && e <= 2504)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 2509) {
                  if (2507 <= e && e <= 2508)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 2509)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2530) {
                if (e === 2519)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2558) {
                if (2530 <= e && e <= 2531)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e === 2558)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 2691) {
              if (e < 2631) {
                if (e < 2620) {
                  if (e < 2563) {
                    if (2561 <= e && e <= 2562)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e === 2563)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 2622) {
                  if (e === 2620)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2625) {
                  if (2622 <= e && e <= 2624)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (2625 <= e && e <= 2626)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2672) {
                if (e < 2635) {
                  if (2631 <= e && e <= 2632)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2641) {
                  if (2635 <= e && e <= 2637)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 2641)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2677) {
                if (2672 <= e && e <= 2673)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2689) {
                if (e === 2677)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (2689 <= e && e <= 2690)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 2761) {
              if (e < 2750) {
                if (e === 2691)
                  return i.CLUSTER_BREAK.SPACINGMARK;
                if (e === 2748)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 2753) {
                if (2750 <= e && e <= 2752)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 2759) {
                if (2753 <= e && e <= 2757)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (2759 <= e && e <= 2760)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 2786) {
              if (e < 2763) {
                if (e === 2761)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 2765) {
                if (2763 <= e && e <= 2764)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e === 2765)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 2810) {
              if (2786 <= e && e <= 2787)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 2817) {
              if (2810 <= e && e <= 2815)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e === 2817)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 3315) {
            if (e < 3076) {
              if (e < 2946) {
                if (e < 2887) {
                  if (e < 2878) {
                    if (e < 2876) {
                      if (2818 <= e && e <= 2819)
                        return i.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 2876)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2880) {
                    if (2878 <= e && e <= 2879)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2881) {
                    if (e === 2880)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (2881 <= e && e <= 2884)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2893) {
                  if (e < 2891) {
                    if (2887 <= e && e <= 2888)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (2891 <= e && e <= 2892)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 2901) {
                  if (e === 2893)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 2914) {
                  if (2901 <= e && e <= 2903)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (2914 <= e && e <= 2915)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3014) {
                if (e < 3007) {
                  if (e === 2946 || e === 3006)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 3008) {
                  if (e === 3007)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 3009) {
                  if (e === 3008)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (3009 <= e && e <= 3010)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 3031) {
                if (e < 3018) {
                  if (3014 <= e && e <= 3016)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 3021) {
                  if (3018 <= e && e <= 3020)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 3021)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3072) {
                if (e === 3031)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3073) {
                if (e === 3072)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (3073 <= e && e <= 3075)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3262) {
              if (e < 3146) {
                if (e < 3134) {
                  if (e === 3076 || e === 3132)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 3137) {
                  if (3134 <= e && e <= 3136)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 3142) {
                  if (3137 <= e && e <= 3140)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (3142 <= e && e <= 3144)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3201) {
                if (e < 3157) {
                  if (3146 <= e && e <= 3149)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 3170) {
                  if (3157 <= e && e <= 3158)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (3170 <= e && e <= 3171)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3202) {
                if (e === 3201)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3260) {
                if (3202 <= e && e <= 3203)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e === 3260)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3270) {
              if (e < 3264) {
                if (e === 3262)
                  return i.CLUSTER_BREAK.SPACINGMARK;
                if (e === 3263)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3266) {
                if (3264 <= e && e <= 3265)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 3267) {
                if (e === 3266)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (3267 <= e && e <= 3268)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3276) {
              if (e < 3271) {
                if (e === 3270)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3274) {
                if (3271 <= e && e <= 3272)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (3274 <= e && e <= 3275)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3285) {
              if (3276 <= e && e <= 3277)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3298) {
              if (3285 <= e && e <= 3286)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (3298 <= e && e <= 3299)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 3551) {
            if (e < 3406) {
              if (e < 3391) {
                if (e < 3330) {
                  if (e < 3328) {
                    if (e === 3315)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (3328 <= e && e <= 3329)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 3387) {
                  if (3330 <= e && e <= 3331)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 3390) {
                  if (3387 <= e && e <= 3388)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 3390)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3398) {
                if (e < 3393) {
                  if (3391 <= e && e <= 3392)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (3393 <= e && e <= 3396)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3402) {
                if (3398 <= e && e <= 3400)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 3405) {
                if (3402 <= e && e <= 3404)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e === 3405)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3530) {
              if (e < 3426) {
                if (e === 3406)
                  return i.CLUSTER_BREAK.PREPEND;
                if (e === 3415)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3457) {
                if (3426 <= e && e <= 3427)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3458) {
                if (e === 3457)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (3458 <= e && e <= 3459)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3538) {
              if (e < 3535) {
                if (e === 3530)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3536) {
                if (e === 3535)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (3536 <= e && e <= 3537)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3542) {
              if (3538 <= e && e <= 3540)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3544) {
              if (e === 3542)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (3544 <= e && e <= 3550)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 3893) {
            if (e < 3655) {
              if (e < 3633) {
                if (e < 3570) {
                  if (e === 3551)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (3570 <= e && e <= 3571)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 3635) {
                if (e === 3633)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 3636) {
                if (e === 3635)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (3636 <= e && e <= 3642)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3764)
              if (e < 3761) {
                if (3655 <= e && e <= 3662)
                  return i.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 3761)
                  return i.CLUSTER_BREAK.EXTEND;
                if (e === 3763)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 3784) {
              if (3764 <= e && e <= 3772)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3864) {
              if (3784 <= e && e <= 3790)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (3864 <= e && e <= 3865)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 3967) {
            if (e < 3897) {
              if (e === 3893 || e === 3895)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3902) {
              if (e === 3897)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 3953) {
              if (3902 <= e && e <= 3903)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (3953 <= e && e <= 3966)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 3981) {
            if (e < 3968) {
              if (e === 3967)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 3974) {
              if (3968 <= e && e <= 3972)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (3974 <= e && e <= 3975)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 3993) {
            if (3981 <= e && e <= 3991)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 4038) {
            if (3993 <= e && e <= 4028)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 4038)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 7204) {
          if (e < 6448) {
            if (e < 5938) {
              if (e < 4226) {
                if (e < 4157) {
                  if (e < 4146) {
                    if (e < 4145) {
                      if (4141 <= e && e <= 4144)
                        return i.CLUSTER_BREAK.EXTEND;
                    } else if (e === 4145)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 4153) {
                    if (4146 <= e && e <= 4151)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e < 4155) {
                    if (4153 <= e && e <= 4154)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (4155 <= e && e <= 4156)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 4184) {
                  if (e < 4182) {
                    if (4157 <= e && e <= 4158)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (4182 <= e && e <= 4183)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 4190) {
                  if (4184 <= e && e <= 4185)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 4209) {
                  if (4190 <= e && e <= 4192)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (4209 <= e && e <= 4212)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 4352) {
                if (e < 4229) {
                  if (e === 4226)
                    return i.CLUSTER_BREAK.EXTEND;
                  if (e === 4228)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 4237) {
                  if (4229 <= e && e <= 4230)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 4237 || e === 4253)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 4957) {
                if (e < 4448) {
                  if (4352 <= e && e <= 4447)
                    return i.CLUSTER_BREAK.L;
                } else if (e < 4520) {
                  if (4448 <= e && e <= 4519)
                    return i.CLUSTER_BREAK.V;
                } else if (4520 <= e && e <= 4607)
                  return i.CLUSTER_BREAK.T;
              } else if (e < 5906) {
                if (4957 <= e && e <= 4959)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 5909) {
                if (5906 <= e && e <= 5908)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e === 5909)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 6089) {
              if (e < 6070) {
                if (e < 5970) {
                  if (e < 5940) {
                    if (5938 <= e && e <= 5939)
                      return i.CLUSTER_BREAK.EXTEND;
                  } else if (e === 5940)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 6002) {
                  if (5970 <= e && e <= 5971)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 6068) {
                  if (6002 <= e && e <= 6003)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (6068 <= e && e <= 6069)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6078) {
                if (e < 6071) {
                  if (e === 6070)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (6071 <= e && e <= 6077)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6086) {
                if (6078 <= e && e <= 6085)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 6087) {
                if (e === 6086)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (6087 <= e && e <= 6088)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 6277)
              if (e < 6155) {
                if (e < 6109) {
                  if (6089 <= e && e <= 6099)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 6109)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6158) {
                if (6155 <= e && e <= 6157)
                  return i.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 6158)
                  return i.CLUSTER_BREAK.CONTROL;
                if (e === 6159)
                  return i.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 6435) {
              if (e < 6313) {
                if (6277 <= e && e <= 6278)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6432) {
                if (e === 6313)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (6432 <= e && e <= 6434)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 6439) {
              if (6435 <= e && e <= 6438)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 6441) {
              if (6439 <= e && e <= 6440)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (6441 <= e && e <= 6443)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 6971) {
            if (e < 6744)
              if (e < 6681) {
                if (e < 6451) {
                  if (e < 6450) {
                    if (6448 <= e && e <= 6449)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 6450)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 6457) {
                  if (6451 <= e && e <= 6456)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 6679) {
                  if (6457 <= e && e <= 6459)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (6679 <= e && e <= 6680)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6741) {
                if (e < 6683) {
                  if (6681 <= e && e <= 6682)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 6683)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6742) {
                if (e === 6741)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else {
                if (e === 6742)
                  return i.CLUSTER_BREAK.EXTEND;
                if (e === 6743)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 6771) {
              if (e < 6754) {
                if (e < 6752) {
                  if (6744 <= e && e <= 6750)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 6752)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6757) {
                if (e === 6754)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6765) {
                if (6757 <= e && e <= 6764)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (6765 <= e && e <= 6770)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 6912) {
              if (e < 6783) {
                if (6771 <= e && e <= 6780)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6832) {
                if (e === 6783)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (6832 <= e && e <= 6862)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 6916) {
              if (6912 <= e && e <= 6915)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 6964) {
              if (e === 6916)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (6964 <= e && e <= 6970)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 7080) {
            if (e < 7019) {
              if (e < 6973) {
                if (e === 6971)
                  return i.CLUSTER_BREAK.SPACINGMARK;
                if (e === 6972)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 6978) {
                if (6973 <= e && e <= 6977)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 6979) {
                if (e === 6978)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (6979 <= e && e <= 6980)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 7073) {
              if (e < 7040) {
                if (7019 <= e && e <= 7027)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 7042) {
                if (7040 <= e && e <= 7041)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e === 7042)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 7074) {
              if (e === 7073)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 7078) {
              if (7074 <= e && e <= 7077)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (7078 <= e && e <= 7079)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 7144)
            if (e < 7083) {
              if (e < 7082) {
                if (7080 <= e && e <= 7081)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e === 7082)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 7142) {
              if (7083 <= e && e <= 7085)
                return i.CLUSTER_BREAK.EXTEND;
            } else {
              if (e === 7142)
                return i.CLUSTER_BREAK.EXTEND;
              if (e === 7143)
                return i.CLUSTER_BREAK.SPACINGMARK;
            }
          else if (e < 7150) {
            if (e < 7146) {
              if (7144 <= e && e <= 7145)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 7149) {
              if (7146 <= e && e <= 7148)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e === 7149)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 7151) {
            if (e === 7150)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 7154) {
            if (7151 <= e && e <= 7153)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (7154 <= e && e <= 7155)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 43346) {
          if (e < 11647) {
            if (e < 7415) {
              if (e < 7380) {
                if (e < 7220) {
                  if (e < 7212) {
                    if (7204 <= e && e <= 7211)
                      return i.CLUSTER_BREAK.SPACINGMARK;
                  } else if (7212 <= e && e <= 7219)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e < 7222) {
                  if (7220 <= e && e <= 7221)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 7376) {
                  if (7222 <= e && e <= 7223)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (7376 <= e && e <= 7378)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 7394) {
                if (e < 7393) {
                  if (7380 <= e && e <= 7392)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 7393)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 7405) {
                if (7394 <= e && e <= 7400)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e === 7405 || e === 7412)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 8205)
              if (e < 7616) {
                if (e < 7416) {
                  if (e === 7415)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (7416 <= e && e <= 7417)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 8203) {
                if (7616 <= e && e <= 7679)
                  return i.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 8203)
                  return i.CLUSTER_BREAK.CONTROL;
                if (e === 8204)
                  return i.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 8288) {
              if (e < 8206) {
                if (e === 8205)
                  return i.CLUSTER_BREAK.ZWJ;
              } else if (e < 8232) {
                if (8206 <= e && e <= 8207)
                  return i.CLUSTER_BREAK.CONTROL;
              } else if (8232 <= e && e <= 8238)
                return i.CLUSTER_BREAK.CONTROL;
            } else if (e < 8400) {
              if (8288 <= e && e <= 8303)
                return i.CLUSTER_BREAK.CONTROL;
            } else if (e < 11503) {
              if (8400 <= e && e <= 8432)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (11503 <= e && e <= 11505)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 43043) {
            if (e < 42612) {
              if (e < 12330) {
                if (e < 11744) {
                  if (e === 11647)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (11744 <= e && e <= 11775)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 12441) {
                if (12330 <= e && e <= 12335)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 42607) {
                if (12441 <= e && e <= 12442)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (42607 <= e && e <= 42610)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43010) {
              if (e < 42654) {
                if (42612 <= e && e <= 42621)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 42736) {
                if (42654 <= e && e <= 42655)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (42736 <= e && e <= 42737)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43014) {
              if (e === 43010)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e === 43014 || e === 43019)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 43188) {
            if (e < 43047) {
              if (e < 43045) {
                if (43043 <= e && e <= 43044)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (43045 <= e && e <= 43046)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43052) {
              if (e === 43047)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 43136) {
              if (e === 43052)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (43136 <= e && e <= 43137)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 43263) {
            if (e < 43204) {
              if (43188 <= e && e <= 43203)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 43232) {
              if (43204 <= e && e <= 43205)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (43232 <= e && e <= 43249)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 43302) {
            if (e === 43263)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 43335) {
            if (43302 <= e && e <= 43309)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (43335 <= e && e <= 43345)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 43698) {
          if (e < 43493) {
            if (e < 43444)
              if (e < 43392) {
                if (e < 43360) {
                  if (43346 <= e && e <= 43347)
                    return i.CLUSTER_BREAK.SPACINGMARK;
                } else if (43360 <= e && e <= 43388)
                  return i.CLUSTER_BREAK.L;
              } else if (e < 43395) {
                if (43392 <= e && e <= 43394)
                  return i.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 43395)
                  return i.CLUSTER_BREAK.SPACINGMARK;
                if (e === 43443)
                  return i.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 43450) {
              if (e < 43446) {
                if (43444 <= e && e <= 43445)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (43446 <= e && e <= 43449)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43452) {
              if (43450 <= e && e <= 43451)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 43454) {
              if (43452 <= e && e <= 43453)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (43454 <= e && e <= 43456)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 43573) {
            if (e < 43567) {
              if (e < 43561) {
                if (e === 43493)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (43561 <= e && e <= 43566)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43569) {
              if (43567 <= e && e <= 43568)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 43571) {
              if (43569 <= e && e <= 43570)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (43571 <= e && e <= 43572)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 43597) {
            if (e < 43587) {
              if (43573 <= e && e <= 43574)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e === 43587 || e === 43596)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 43644) {
            if (e === 43597)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e === 43644 || e === 43696)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 44006) {
          if (e < 43756)
            if (e < 43710) {
              if (e < 43703) {
                if (43698 <= e && e <= 43700)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (43703 <= e && e <= 43704)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43713) {
              if (43710 <= e && e <= 43711)
                return i.CLUSTER_BREAK.EXTEND;
            } else {
              if (e === 43713)
                return i.CLUSTER_BREAK.EXTEND;
              if (e === 43755)
                return i.CLUSTER_BREAK.SPACINGMARK;
            }
          else if (e < 43766) {
            if (e < 43758) {
              if (43756 <= e && e <= 43757)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 43765) {
              if (43758 <= e && e <= 43759)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e === 43765)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 44003) {
            if (e === 43766)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 44005) {
            if (44003 <= e && e <= 44004)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e === 44005)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 44032)
          if (e < 44009) {
            if (e < 44008) {
              if (44006 <= e && e <= 44007)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e === 44008)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 44012) {
            if (44009 <= e && e <= 44010)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else {
            if (e === 44012)
              return i.CLUSTER_BREAK.SPACINGMARK;
            if (e === 44013)
              return i.CLUSTER_BREAK.EXTEND;
          }
        else if (e < 44061) {
          if (e < 44033) {
            if (e === 44032)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 44060) {
            if (44033 <= e && e <= 44059)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 44060)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 44088) {
          if (44061 <= e && e <= 44087)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 44089) {
          if (e === 44088)
            return i.CLUSTER_BREAK.LV;
        } else if (44089 <= e && e <= 44115)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 46497) {
        if (e < 45293) {
          if (e < 44704) {
            if (e < 44397) {
              if (e < 44256) {
                if (e < 44173) {
                  if (e < 44144) {
                    if (e < 44117) {
                      if (e === 44116)
                        return i.CLUSTER_BREAK.LV;
                    } else if (44117 <= e && e <= 44143)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e < 44145) {
                    if (e === 44144)
                      return i.CLUSTER_BREAK.LV;
                  } else if (e < 44172) {
                    if (44145 <= e && e <= 44171)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 44172)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 44201) {
                  if (e < 44200) {
                    if (44173 <= e && e <= 44199)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 44200)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 44228) {
                  if (44201 <= e && e <= 44227)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 44229) {
                  if (e === 44228)
                    return i.CLUSTER_BREAK.LV;
                } else if (44229 <= e && e <= 44255)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44313) {
                if (e < 44284) {
                  if (e < 44257) {
                    if (e === 44256)
                      return i.CLUSTER_BREAK.LV;
                  } else if (44257 <= e && e <= 44283)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 44285) {
                  if (e === 44284)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 44312) {
                  if (44285 <= e && e <= 44311)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 44312)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44368) {
                if (e < 44340) {
                  if (44313 <= e && e <= 44339)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 44341) {
                  if (e === 44340)
                    return i.CLUSTER_BREAK.LV;
                } else if (44341 <= e && e <= 44367)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44369) {
                if (e === 44368)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44396) {
                if (44369 <= e && e <= 44395)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 44396)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 44537) {
              if (e < 44480) {
                if (e < 44425) {
                  if (e < 44424) {
                    if (44397 <= e && e <= 44423)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 44424)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 44452) {
                  if (44425 <= e && e <= 44451)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 44453) {
                  if (e === 44452)
                    return i.CLUSTER_BREAK.LV;
                } else if (44453 <= e && e <= 44479)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44508) {
                if (e < 44481) {
                  if (e === 44480)
                    return i.CLUSTER_BREAK.LV;
                } else if (44481 <= e && e <= 44507)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44509) {
                if (e === 44508)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44536) {
                if (44509 <= e && e <= 44535)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 44536)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 44620) {
              if (e < 44565) {
                if (e < 44564) {
                  if (44537 <= e && e <= 44563)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 44564)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44592) {
                if (44565 <= e && e <= 44591)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44593) {
                if (e === 44592)
                  return i.CLUSTER_BREAK.LV;
              } else if (44593 <= e && e <= 44619)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 44649) {
              if (e < 44621) {
                if (e === 44620)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44648) {
                if (44621 <= e && e <= 44647)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 44648)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 44676) {
              if (44649 <= e && e <= 44675)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 44677) {
              if (e === 44676)
                return i.CLUSTER_BREAK.LV;
            } else if (44677 <= e && e <= 44703)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 44985) {
            if (e < 44844) {
              if (e < 44761) {
                if (e < 44732) {
                  if (e < 44705) {
                    if (e === 44704)
                      return i.CLUSTER_BREAK.LV;
                  } else if (44705 <= e && e <= 44731)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 44733) {
                  if (e === 44732)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 44760) {
                  if (44733 <= e && e <= 44759)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 44760)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44789) {
                if (e < 44788) {
                  if (44761 <= e && e <= 44787)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 44788)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44816) {
                if (44789 <= e && e <= 44815)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44817) {
                if (e === 44816)
                  return i.CLUSTER_BREAK.LV;
              } else if (44817 <= e && e <= 44843)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 44901) {
              if (e < 44872) {
                if (e < 44845) {
                  if (e === 44844)
                    return i.CLUSTER_BREAK.LV;
                } else if (44845 <= e && e <= 44871)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44873) {
                if (e === 44872)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 44900) {
                if (44873 <= e && e <= 44899)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 44900)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 44956) {
              if (e < 44928) {
                if (44901 <= e && e <= 44927)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 44929) {
                if (e === 44928)
                  return i.CLUSTER_BREAK.LV;
              } else if (44929 <= e && e <= 44955)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 44957) {
              if (e === 44956)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 44984) {
              if (44957 <= e && e <= 44983)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 44984)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 45152) {
            if (e < 45068) {
              if (e < 45013) {
                if (e < 45012) {
                  if (44985 <= e && e <= 45011)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 45012)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45040) {
                if (45013 <= e && e <= 45039)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45041) {
                if (e === 45040)
                  return i.CLUSTER_BREAK.LV;
              } else if (45041 <= e && e <= 45067)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45097) {
              if (e < 45069) {
                if (e === 45068)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45096) {
                if (45069 <= e && e <= 45095)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45096)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45124) {
              if (45097 <= e && e <= 45123)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45125) {
              if (e === 45124)
                return i.CLUSTER_BREAK.LV;
            } else if (45125 <= e && e <= 45151)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 45209) {
            if (e < 45180) {
              if (e < 45153) {
                if (e === 45152)
                  return i.CLUSTER_BREAK.LV;
              } else if (45153 <= e && e <= 45179)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45181) {
              if (e === 45180)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45208) {
              if (45181 <= e && e <= 45207)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 45208)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 45264) {
            if (e < 45236) {
              if (45209 <= e && e <= 45235)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45237) {
              if (e === 45236)
                return i.CLUSTER_BREAK.LV;
            } else if (45237 <= e && e <= 45263)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 45265) {
            if (e === 45264)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 45292) {
            if (45265 <= e && e <= 45291)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 45292)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 45908) {
          if (e < 45600) {
            if (e < 45433) {
              if (e < 45376) {
                if (e < 45321) {
                  if (e < 45320) {
                    if (45293 <= e && e <= 45319)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 45320)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 45348) {
                  if (45321 <= e && e <= 45347)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 45349) {
                  if (e === 45348)
                    return i.CLUSTER_BREAK.LV;
                } else if (45349 <= e && e <= 45375)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45404) {
                if (e < 45377) {
                  if (e === 45376)
                    return i.CLUSTER_BREAK.LV;
                } else if (45377 <= e && e <= 45403)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45405) {
                if (e === 45404)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45432) {
                if (45405 <= e && e <= 45431)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45432)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45516) {
              if (e < 45461) {
                if (e < 45460) {
                  if (45433 <= e && e <= 45459)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 45460)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45488) {
                if (45461 <= e && e <= 45487)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45489) {
                if (e === 45488)
                  return i.CLUSTER_BREAK.LV;
              } else if (45489 <= e && e <= 45515)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45545) {
              if (e < 45517) {
                if (e === 45516)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45544) {
                if (45517 <= e && e <= 45543)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45544)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45572) {
              if (45545 <= e && e <= 45571)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45573) {
              if (e === 45572)
                return i.CLUSTER_BREAK.LV;
            } else if (45573 <= e && e <= 45599)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 45741) {
            if (e < 45657) {
              if (e < 45628) {
                if (e < 45601) {
                  if (e === 45600)
                    return i.CLUSTER_BREAK.LV;
                } else if (45601 <= e && e <= 45627)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45629) {
                if (e === 45628)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45656) {
                if (45629 <= e && e <= 45655)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45656)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45712) {
              if (e < 45684) {
                if (45657 <= e && e <= 45683)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45685) {
                if (e === 45684)
                  return i.CLUSTER_BREAK.LV;
              } else if (45685 <= e && e <= 45711)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45713) {
              if (e === 45712)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45740) {
              if (45713 <= e && e <= 45739)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 45740)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 45824) {
            if (e < 45769) {
              if (e < 45768) {
                if (45741 <= e && e <= 45767)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45768)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45796) {
              if (45769 <= e && e <= 45795)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 45797) {
              if (e === 45796)
                return i.CLUSTER_BREAK.LV;
            } else if (45797 <= e && e <= 45823)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 45853) {
            if (e < 45825) {
              if (e === 45824)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45852) {
              if (45825 <= e && e <= 45851)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 45852)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 45880) {
            if (45853 <= e && e <= 45879)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 45881) {
            if (e === 45880)
              return i.CLUSTER_BREAK.LV;
          } else if (45881 <= e && e <= 45907)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 46189) {
          if (e < 46048) {
            if (e < 45965) {
              if (e < 45936) {
                if (e < 45909) {
                  if (e === 45908)
                    return i.CLUSTER_BREAK.LV;
                } else if (45909 <= e && e <= 45935)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 45937) {
                if (e === 45936)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 45964) {
                if (45937 <= e && e <= 45963)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45964)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 45993) {
              if (e < 45992) {
                if (45965 <= e && e <= 45991)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 45992)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46020) {
              if (45993 <= e && e <= 46019)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46021) {
              if (e === 46020)
                return i.CLUSTER_BREAK.LV;
            } else if (46021 <= e && e <= 46047)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46105) {
            if (e < 46076) {
              if (e < 46049) {
                if (e === 46048)
                  return i.CLUSTER_BREAK.LV;
              } else if (46049 <= e && e <= 46075)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46077) {
              if (e === 46076)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46104) {
              if (46077 <= e && e <= 46103)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 46104)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 46160) {
            if (e < 46132) {
              if (46105 <= e && e <= 46131)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46133) {
              if (e === 46132)
                return i.CLUSTER_BREAK.LV;
            } else if (46133 <= e && e <= 46159)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46161) {
            if (e === 46160)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 46188) {
            if (46161 <= e && e <= 46187)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 46188)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 46356) {
          if (e < 46272) {
            if (e < 46217) {
              if (e < 46216) {
                if (46189 <= e && e <= 46215)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 46216)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46244) {
              if (46217 <= e && e <= 46243)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46245) {
              if (e === 46244)
                return i.CLUSTER_BREAK.LV;
            } else if (46245 <= e && e <= 46271)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46301) {
            if (e < 46273) {
              if (e === 46272)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46300) {
              if (46273 <= e && e <= 46299)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 46300)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 46328) {
            if (46301 <= e && e <= 46327)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46329) {
            if (e === 46328)
              return i.CLUSTER_BREAK.LV;
          } else if (46329 <= e && e <= 46355)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 46413) {
          if (e < 46384) {
            if (e < 46357) {
              if (e === 46356)
                return i.CLUSTER_BREAK.LV;
            } else if (46357 <= e && e <= 46383)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46385) {
            if (e === 46384)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 46412) {
            if (46385 <= e && e <= 46411)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 46412)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 46468) {
          if (e < 46440) {
            if (46413 <= e && e <= 46439)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46441) {
            if (e === 46440)
              return i.CLUSTER_BREAK.LV;
          } else if (46441 <= e && e <= 46467)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 46469) {
          if (e === 46468)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 46496) {
          if (46469 <= e && e <= 46495)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 46496)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 47701) {
        if (e < 47112) {
          if (e < 46804) {
            if (e < 46637) {
              if (e < 46580) {
                if (e < 46525) {
                  if (e < 46524) {
                    if (46497 <= e && e <= 46523)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 46524)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 46552) {
                  if (46525 <= e && e <= 46551)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 46553) {
                  if (e === 46552)
                    return i.CLUSTER_BREAK.LV;
                } else if (46553 <= e && e <= 46579)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 46608) {
                if (e < 46581) {
                  if (e === 46580)
                    return i.CLUSTER_BREAK.LV;
                } else if (46581 <= e && e <= 46607)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 46609) {
                if (e === 46608)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 46636) {
                if (46609 <= e && e <= 46635)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 46636)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46720) {
              if (e < 46665) {
                if (e < 46664) {
                  if (46637 <= e && e <= 46663)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 46664)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 46692) {
                if (46665 <= e && e <= 46691)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 46693) {
                if (e === 46692)
                  return i.CLUSTER_BREAK.LV;
              } else if (46693 <= e && e <= 46719)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46749) {
              if (e < 46721) {
                if (e === 46720)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 46748) {
                if (46721 <= e && e <= 46747)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 46748)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46776) {
              if (46749 <= e && e <= 46775)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46777) {
              if (e === 46776)
                return i.CLUSTER_BREAK.LV;
            } else if (46777 <= e && e <= 46803)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 46945) {
            if (e < 46861) {
              if (e < 46832) {
                if (e < 46805) {
                  if (e === 46804)
                    return i.CLUSTER_BREAK.LV;
                } else if (46805 <= e && e <= 46831)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 46833) {
                if (e === 46832)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 46860) {
                if (46833 <= e && e <= 46859)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 46860)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46916) {
              if (e < 46888) {
                if (46861 <= e && e <= 46887)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 46889) {
                if (e === 46888)
                  return i.CLUSTER_BREAK.LV;
              } else if (46889 <= e && e <= 46915)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 46917) {
              if (e === 46916)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 46944) {
              if (46917 <= e && e <= 46943)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 46944)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47028) {
            if (e < 46973) {
              if (e < 46972) {
                if (46945 <= e && e <= 46971)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 46972)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47e3) {
              if (46973 <= e && e <= 46999)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47001) {
              if (e === 47e3)
                return i.CLUSTER_BREAK.LV;
            } else if (47001 <= e && e <= 47027)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47057) {
            if (e < 47029) {
              if (e === 47028)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47056) {
              if (47029 <= e && e <= 47055)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 47056)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47084) {
            if (47057 <= e && e <= 47083)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47085) {
            if (e === 47084)
              return i.CLUSTER_BREAK.LV;
          } else if (47085 <= e && e <= 47111)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 47393) {
          if (e < 47252) {
            if (e < 47169) {
              if (e < 47140) {
                if (e < 47113) {
                  if (e === 47112)
                    return i.CLUSTER_BREAK.LV;
                } else if (47113 <= e && e <= 47139)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 47141) {
                if (e === 47140)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 47168) {
                if (47141 <= e && e <= 47167)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 47168)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47197) {
              if (e < 47196) {
                if (47169 <= e && e <= 47195)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 47196)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47224) {
              if (47197 <= e && e <= 47223)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47225) {
              if (e === 47224)
                return i.CLUSTER_BREAK.LV;
            } else if (47225 <= e && e <= 47251)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47309) {
            if (e < 47280) {
              if (e < 47253) {
                if (e === 47252)
                  return i.CLUSTER_BREAK.LV;
              } else if (47253 <= e && e <= 47279)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47281) {
              if (e === 47280)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47308) {
              if (47281 <= e && e <= 47307)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 47308)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47364) {
            if (e < 47336) {
              if (47309 <= e && e <= 47335)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47337) {
              if (e === 47336)
                return i.CLUSTER_BREAK.LV;
            } else if (47337 <= e && e <= 47363)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47365) {
            if (e === 47364)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47392) {
            if (47365 <= e && e <= 47391)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 47392)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 47560) {
          if (e < 47476) {
            if (e < 47421) {
              if (e < 47420) {
                if (47393 <= e && e <= 47419)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 47420)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47448) {
              if (47421 <= e && e <= 47447)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47449) {
              if (e === 47448)
                return i.CLUSTER_BREAK.LV;
            } else if (47449 <= e && e <= 47475)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47505) {
            if (e < 47477) {
              if (e === 47476)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47504) {
              if (47477 <= e && e <= 47503)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 47504)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47532) {
            if (47505 <= e && e <= 47531)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47533) {
            if (e === 47532)
              return i.CLUSTER_BREAK.LV;
          } else if (47533 <= e && e <= 47559)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 47617) {
          if (e < 47588) {
            if (e < 47561) {
              if (e === 47560)
                return i.CLUSTER_BREAK.LV;
            } else if (47561 <= e && e <= 47587)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47589) {
            if (e === 47588)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47616) {
            if (47589 <= e && e <= 47615)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 47616)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 47672) {
          if (e < 47644) {
            if (47617 <= e && e <= 47643)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47645) {
            if (e === 47644)
              return i.CLUSTER_BREAK.LV;
          } else if (47645 <= e && e <= 47671)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 47673) {
          if (e === 47672)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 47700) {
          if (47673 <= e && e <= 47699)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 47700)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 48316) {
        if (e < 48008) {
          if (e < 47841) {
            if (e < 47784) {
              if (e < 47729) {
                if (e < 47728) {
                  if (47701 <= e && e <= 47727)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 47728)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 47756) {
                if (47729 <= e && e <= 47755)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 47757) {
                if (e === 47756)
                  return i.CLUSTER_BREAK.LV;
              } else if (47757 <= e && e <= 47783)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47812) {
              if (e < 47785) {
                if (e === 47784)
                  return i.CLUSTER_BREAK.LV;
              } else if (47785 <= e && e <= 47811)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47813) {
              if (e === 47812)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47840) {
              if (47813 <= e && e <= 47839)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 47840)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47924) {
            if (e < 47869) {
              if (e < 47868) {
                if (47841 <= e && e <= 47867)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 47868)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47896) {
              if (47869 <= e && e <= 47895)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 47897) {
              if (e === 47896)
                return i.CLUSTER_BREAK.LV;
            } else if (47897 <= e && e <= 47923)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47953) {
            if (e < 47925) {
              if (e === 47924)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 47952) {
              if (47925 <= e && e <= 47951)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 47952)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 47980) {
            if (47953 <= e && e <= 47979)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 47981) {
            if (e === 47980)
              return i.CLUSTER_BREAK.LV;
          } else if (47981 <= e && e <= 48007)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48149) {
          if (e < 48065) {
            if (e < 48036) {
              if (e < 48009) {
                if (e === 48008)
                  return i.CLUSTER_BREAK.LV;
              } else if (48009 <= e && e <= 48035)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 48037) {
              if (e === 48036)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 48064) {
              if (48037 <= e && e <= 48063)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 48064)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48120) {
            if (e < 48092) {
              if (48065 <= e && e <= 48091)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 48093) {
              if (e === 48092)
                return i.CLUSTER_BREAK.LV;
            } else if (48093 <= e && e <= 48119)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48121) {
            if (e === 48120)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48148) {
            if (48121 <= e && e <= 48147)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 48148)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48232) {
          if (e < 48177) {
            if (e < 48176) {
              if (48149 <= e && e <= 48175)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 48176)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48204) {
            if (48177 <= e && e <= 48203)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48205) {
            if (e === 48204)
              return i.CLUSTER_BREAK.LV;
          } else if (48205 <= e && e <= 48231)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48261) {
          if (e < 48233) {
            if (e === 48232)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48260) {
            if (48233 <= e && e <= 48259)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 48260)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48288) {
          if (48261 <= e && e <= 48287)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48289) {
          if (e === 48288)
            return i.CLUSTER_BREAK.LV;
        } else if (48289 <= e && e <= 48315)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 48597) {
        if (e < 48456) {
          if (e < 48373) {
            if (e < 48344) {
              if (e < 48317) {
                if (e === 48316)
                  return i.CLUSTER_BREAK.LV;
              } else if (48317 <= e && e <= 48343)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 48345) {
              if (e === 48344)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 48372) {
              if (48345 <= e && e <= 48371)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 48372)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48401) {
            if (e < 48400) {
              if (48373 <= e && e <= 48399)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 48400)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48428) {
            if (48401 <= e && e <= 48427)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48429) {
            if (e === 48428)
              return i.CLUSTER_BREAK.LV;
          } else if (48429 <= e && e <= 48455)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48513) {
          if (e < 48484) {
            if (e < 48457) {
              if (e === 48456)
                return i.CLUSTER_BREAK.LV;
            } else if (48457 <= e && e <= 48483)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48485) {
            if (e === 48484)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48512) {
            if (48485 <= e && e <= 48511)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 48512)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48568) {
          if (e < 48540) {
            if (48513 <= e && e <= 48539)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48541) {
            if (e === 48540)
              return i.CLUSTER_BREAK.LV;
          } else if (48541 <= e && e <= 48567)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48569) {
          if (e === 48568)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48596) {
          if (48569 <= e && e <= 48595)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 48596)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 48764) {
        if (e < 48680) {
          if (e < 48625) {
            if (e < 48624) {
              if (48597 <= e && e <= 48623)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 48624)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48652) {
            if (48625 <= e && e <= 48651)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 48653) {
            if (e === 48652)
              return i.CLUSTER_BREAK.LV;
          } else if (48653 <= e && e <= 48679)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48709) {
          if (e < 48681) {
            if (e === 48680)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 48708) {
            if (48681 <= e && e <= 48707)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 48708)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48736) {
          if (48709 <= e && e <= 48735)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48737) {
          if (e === 48736)
            return i.CLUSTER_BREAK.LV;
        } else if (48737 <= e && e <= 48763)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 48821) {
        if (e < 48792) {
          if (e < 48765) {
            if (e === 48764)
              return i.CLUSTER_BREAK.LV;
          } else if (48765 <= e && e <= 48791)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48793) {
          if (e === 48792)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 48820) {
          if (48793 <= e && e <= 48819)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 48820)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 48876) {
        if (e < 48848) {
          if (48821 <= e && e <= 48847)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 48849) {
          if (e === 48848)
            return i.CLUSTER_BREAK.LV;
        } else if (48849 <= e && e <= 48875)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 48877) {
        if (e === 48876)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 48904) {
        if (48877 <= e && e <= 48903)
          return i.CLUSTER_BREAK.LVT;
      } else if (e === 48904)
        return i.CLUSTER_BREAK.LV;
    } else if (e < 53720) {
      if (e < 51312) {
        if (e < 50108) {
          if (e < 49493) {
            if (e < 49212) {
              if (e < 49045) {
                if (e < 48988) {
                  if (e < 48933) {
                    if (e < 48932) {
                      if (48905 <= e && e <= 48931)
                        return i.CLUSTER_BREAK.LVT;
                    } else if (e === 48932)
                      return i.CLUSTER_BREAK.LV;
                  } else if (e < 48960) {
                    if (48933 <= e && e <= 48959)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e < 48961) {
                    if (e === 48960)
                      return i.CLUSTER_BREAK.LV;
                  } else if (48961 <= e && e <= 48987)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 49016) {
                  if (e < 48989) {
                    if (e === 48988)
                      return i.CLUSTER_BREAK.LV;
                  } else if (48989 <= e && e <= 49015)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 49017) {
                  if (e === 49016)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 49044) {
                  if (49017 <= e && e <= 49043)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 49044)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49128) {
                if (e < 49073) {
                  if (e < 49072) {
                    if (49045 <= e && e <= 49071)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 49072)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 49100) {
                  if (49073 <= e && e <= 49099)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 49101) {
                  if (e === 49100)
                    return i.CLUSTER_BREAK.LV;
                } else if (49101 <= e && e <= 49127)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49157) {
                if (e < 49129) {
                  if (e === 49128)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 49156) {
                  if (49129 <= e && e <= 49155)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 49156)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49184) {
                if (49157 <= e && e <= 49183)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49185) {
                if (e === 49184)
                  return i.CLUSTER_BREAK.LV;
              } else if (49185 <= e && e <= 49211)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49352) {
              if (e < 49269) {
                if (e < 49240) {
                  if (e < 49213) {
                    if (e === 49212)
                      return i.CLUSTER_BREAK.LV;
                  } else if (49213 <= e && e <= 49239)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 49241) {
                  if (e === 49240)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 49268) {
                  if (49241 <= e && e <= 49267)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 49268)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49297) {
                if (e < 49296) {
                  if (49269 <= e && e <= 49295)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 49296)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49324) {
                if (49297 <= e && e <= 49323)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49325) {
                if (e === 49324)
                  return i.CLUSTER_BREAK.LV;
              } else if (49325 <= e && e <= 49351)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49409) {
              if (e < 49380) {
                if (e < 49353) {
                  if (e === 49352)
                    return i.CLUSTER_BREAK.LV;
                } else if (49353 <= e && e <= 49379)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49381) {
                if (e === 49380)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49408) {
                if (49381 <= e && e <= 49407)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 49408)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49464) {
              if (e < 49436) {
                if (49409 <= e && e <= 49435)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49437) {
                if (e === 49436)
                  return i.CLUSTER_BREAK.LV;
              } else if (49437 <= e && e <= 49463)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49465) {
              if (e === 49464)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49492) {
              if (49465 <= e && e <= 49491)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 49492)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 49800) {
            if (e < 49633) {
              if (e < 49576) {
                if (e < 49521) {
                  if (e < 49520) {
                    if (49493 <= e && e <= 49519)
                      return i.CLUSTER_BREAK.LVT;
                  } else if (e === 49520)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 49548) {
                  if (49521 <= e && e <= 49547)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 49549) {
                  if (e === 49548)
                    return i.CLUSTER_BREAK.LV;
                } else if (49549 <= e && e <= 49575)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49604) {
                if (e < 49577) {
                  if (e === 49576)
                    return i.CLUSTER_BREAK.LV;
                } else if (49577 <= e && e <= 49603)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49605) {
                if (e === 49604)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49632) {
                if (49605 <= e && e <= 49631)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 49632)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49716) {
              if (e < 49661) {
                if (e < 49660) {
                  if (49633 <= e && e <= 49659)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 49660)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49688) {
                if (49661 <= e && e <= 49687)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49689) {
                if (e === 49688)
                  return i.CLUSTER_BREAK.LV;
              } else if (49689 <= e && e <= 49715)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49745) {
              if (e < 49717) {
                if (e === 49716)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49744) {
                if (49717 <= e && e <= 49743)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 49744)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49772) {
              if (49745 <= e && e <= 49771)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49773) {
              if (e === 49772)
                return i.CLUSTER_BREAK.LV;
            } else if (49773 <= e && e <= 49799)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 49941) {
            if (e < 49857) {
              if (e < 49828) {
                if (e < 49801) {
                  if (e === 49800)
                    return i.CLUSTER_BREAK.LV;
                } else if (49801 <= e && e <= 49827)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49829) {
                if (e === 49828)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 49856) {
                if (49829 <= e && e <= 49855)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 49856)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49912) {
              if (e < 49884) {
                if (49857 <= e && e <= 49883)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 49885) {
                if (e === 49884)
                  return i.CLUSTER_BREAK.LV;
              } else if (49885 <= e && e <= 49911)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49913) {
              if (e === 49912)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49940) {
              if (49913 <= e && e <= 49939)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 49940)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50024) {
            if (e < 49969) {
              if (e < 49968) {
                if (49941 <= e && e <= 49967)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 49968)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 49996) {
              if (49969 <= e && e <= 49995)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 49997) {
              if (e === 49996)
                return i.CLUSTER_BREAK.LV;
            } else if (49997 <= e && e <= 50023)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50053) {
            if (e < 50025) {
              if (e === 50024)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50052) {
              if (50025 <= e && e <= 50051)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 50052)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50080) {
            if (50053 <= e && e <= 50079)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50081) {
            if (e === 50080)
              return i.CLUSTER_BREAK.LV;
          } else if (50081 <= e && e <= 50107)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 50697) {
          if (e < 50389) {
            if (e < 50248) {
              if (e < 50165) {
                if (e < 50136) {
                  if (e < 50109) {
                    if (e === 50108)
                      return i.CLUSTER_BREAK.LV;
                  } else if (50109 <= e && e <= 50135)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 50137) {
                  if (e === 50136)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 50164) {
                  if (50137 <= e && e <= 50163)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 50164)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50193) {
                if (e < 50192) {
                  if (50165 <= e && e <= 50191)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 50192)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50220) {
                if (50193 <= e && e <= 50219)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 50221) {
                if (e === 50220)
                  return i.CLUSTER_BREAK.LV;
              } else if (50221 <= e && e <= 50247)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50305) {
              if (e < 50276) {
                if (e < 50249) {
                  if (e === 50248)
                    return i.CLUSTER_BREAK.LV;
                } else if (50249 <= e && e <= 50275)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 50277) {
                if (e === 50276)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50304) {
                if (50277 <= e && e <= 50303)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 50304)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50360) {
              if (e < 50332) {
                if (50305 <= e && e <= 50331)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 50333) {
                if (e === 50332)
                  return i.CLUSTER_BREAK.LV;
              } else if (50333 <= e && e <= 50359)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50361) {
              if (e === 50360)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50388) {
              if (50361 <= e && e <= 50387)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 50388)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50556) {
            if (e < 50472) {
              if (e < 50417) {
                if (e < 50416) {
                  if (50389 <= e && e <= 50415)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 50416)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50444) {
                if (50417 <= e && e <= 50443)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 50445) {
                if (e === 50444)
                  return i.CLUSTER_BREAK.LV;
              } else if (50445 <= e && e <= 50471)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50501) {
              if (e < 50473) {
                if (e === 50472)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50500) {
                if (50473 <= e && e <= 50499)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 50500)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50528) {
              if (50501 <= e && e <= 50527)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50529) {
              if (e === 50528)
                return i.CLUSTER_BREAK.LV;
            } else if (50529 <= e && e <= 50555)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50613) {
            if (e < 50584) {
              if (e < 50557) {
                if (e === 50556)
                  return i.CLUSTER_BREAK.LV;
              } else if (50557 <= e && e <= 50583)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50585) {
              if (e === 50584)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50612) {
              if (50585 <= e && e <= 50611)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 50612)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50668) {
            if (e < 50640) {
              if (50613 <= e && e <= 50639)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50641) {
              if (e === 50640)
                return i.CLUSTER_BREAK.LV;
            } else if (50641 <= e && e <= 50667)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50669) {
            if (e === 50668)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50696) {
            if (50669 <= e && e <= 50695)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 50696)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 51004) {
          if (e < 50837) {
            if (e < 50780) {
              if (e < 50725) {
                if (e < 50724) {
                  if (50697 <= e && e <= 50723)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 50724)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 50752) {
                if (50725 <= e && e <= 50751)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 50753) {
                if (e === 50752)
                  return i.CLUSTER_BREAK.LV;
              } else if (50753 <= e && e <= 50779)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50808) {
              if (e < 50781) {
                if (e === 50780)
                  return i.CLUSTER_BREAK.LV;
              } else if (50781 <= e && e <= 50807)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50809) {
              if (e === 50808)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50836) {
              if (50809 <= e && e <= 50835)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 50836)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50920) {
            if (e < 50865) {
              if (e < 50864) {
                if (50837 <= e && e <= 50863)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 50864)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50892) {
              if (50865 <= e && e <= 50891)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 50893) {
              if (e === 50892)
                return i.CLUSTER_BREAK.LV;
            } else if (50893 <= e && e <= 50919)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50949) {
            if (e < 50921) {
              if (e === 50920)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 50948) {
              if (50921 <= e && e <= 50947)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 50948)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 50976) {
            if (50949 <= e && e <= 50975)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 50977) {
            if (e === 50976)
              return i.CLUSTER_BREAK.LV;
          } else if (50977 <= e && e <= 51003)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 51145) {
          if (e < 51061) {
            if (e < 51032) {
              if (e < 51005) {
                if (e === 51004)
                  return i.CLUSTER_BREAK.LV;
              } else if (51005 <= e && e <= 51031)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51033) {
              if (e === 51032)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 51060) {
              if (51033 <= e && e <= 51059)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 51060)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51116) {
            if (e < 51088) {
              if (51061 <= e && e <= 51087)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51089) {
              if (e === 51088)
                return i.CLUSTER_BREAK.LV;
            } else if (51089 <= e && e <= 51115)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 51117) {
            if (e === 51116)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51144) {
            if (51117 <= e && e <= 51143)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 51144)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 51228) {
          if (e < 51173) {
            if (e < 51172) {
              if (51145 <= e && e <= 51171)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 51172)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51200) {
            if (51173 <= e && e <= 51199)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 51201) {
            if (e === 51200)
              return i.CLUSTER_BREAK.LV;
          } else if (51201 <= e && e <= 51227)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 51257) {
          if (e < 51229) {
            if (e === 51228)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51256) {
            if (51229 <= e && e <= 51255)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 51256)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 51284) {
          if (51257 <= e && e <= 51283)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 51285) {
          if (e === 51284)
            return i.CLUSTER_BREAK.LV;
        } else if (51285 <= e && e <= 51311)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 52516) {
        if (e < 51901) {
          if (e < 51593) {
            if (e < 51452) {
              if (e < 51369) {
                if (e < 51340) {
                  if (e < 51313) {
                    if (e === 51312)
                      return i.CLUSTER_BREAK.LV;
                  } else if (51313 <= e && e <= 51339)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 51341) {
                  if (e === 51340)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 51368) {
                  if (51341 <= e && e <= 51367)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 51368)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51397) {
                if (e < 51396) {
                  if (51369 <= e && e <= 51395)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 51396)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51424) {
                if (51397 <= e && e <= 51423)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 51425) {
                if (e === 51424)
                  return i.CLUSTER_BREAK.LV;
              } else if (51425 <= e && e <= 51451)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51509) {
              if (e < 51480) {
                if (e < 51453) {
                  if (e === 51452)
                    return i.CLUSTER_BREAK.LV;
                } else if (51453 <= e && e <= 51479)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 51481) {
                if (e === 51480)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51508) {
                if (51481 <= e && e <= 51507)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 51508)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 51564) {
              if (e < 51536) {
                if (51509 <= e && e <= 51535)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 51537) {
                if (e === 51536)
                  return i.CLUSTER_BREAK.LV;
              } else if (51537 <= e && e <= 51563)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51565) {
              if (e === 51564)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 51592) {
              if (51565 <= e && e <= 51591)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 51592)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51760) {
            if (e < 51676) {
              if (e < 51621) {
                if (e < 51620) {
                  if (51593 <= e && e <= 51619)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 51620)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51648) {
                if (51621 <= e && e <= 51647)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 51649) {
                if (e === 51648)
                  return i.CLUSTER_BREAK.LV;
              } else if (51649 <= e && e <= 51675)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51705) {
              if (e < 51677) {
                if (e === 51676)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51704) {
                if (51677 <= e && e <= 51703)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 51704)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 51732) {
              if (51705 <= e && e <= 51731)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51733) {
              if (e === 51732)
                return i.CLUSTER_BREAK.LV;
            } else if (51733 <= e && e <= 51759)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 51817) {
            if (e < 51788) {
              if (e < 51761) {
                if (e === 51760)
                  return i.CLUSTER_BREAK.LV;
              } else if (51761 <= e && e <= 51787)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51789) {
              if (e === 51788)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 51816) {
              if (51789 <= e && e <= 51815)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 51816)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51872) {
            if (e < 51844) {
              if (51817 <= e && e <= 51843)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 51845) {
              if (e === 51844)
                return i.CLUSTER_BREAK.LV;
            } else if (51845 <= e && e <= 51871)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 51873) {
            if (e === 51872)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 51900) {
            if (51873 <= e && e <= 51899)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 51900)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 52208) {
          if (e < 52041) {
            if (e < 51984) {
              if (e < 51929) {
                if (e < 51928) {
                  if (51901 <= e && e <= 51927)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 51928)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 51956) {
                if (51929 <= e && e <= 51955)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 51957) {
                if (e === 51956)
                  return i.CLUSTER_BREAK.LV;
              } else if (51957 <= e && e <= 51983)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52012) {
              if (e < 51985) {
                if (e === 51984)
                  return i.CLUSTER_BREAK.LV;
              } else if (51985 <= e && e <= 52011)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52013) {
              if (e === 52012)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52040) {
              if (52013 <= e && e <= 52039)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52040)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52124) {
            if (e < 52069) {
              if (e < 52068) {
                if (52041 <= e && e <= 52067)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 52068)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52096) {
              if (52069 <= e && e <= 52095)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52097) {
              if (e === 52096)
                return i.CLUSTER_BREAK.LV;
            } else if (52097 <= e && e <= 52123)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52153) {
            if (e < 52125) {
              if (e === 52124)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52152) {
              if (52125 <= e && e <= 52151)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52152)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52180) {
            if (52153 <= e && e <= 52179)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52181) {
            if (e === 52180)
              return i.CLUSTER_BREAK.LV;
          } else if (52181 <= e && e <= 52207)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 52349) {
          if (e < 52265) {
            if (e < 52236) {
              if (e < 52209) {
                if (e === 52208)
                  return i.CLUSTER_BREAK.LV;
              } else if (52209 <= e && e <= 52235)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52237) {
              if (e === 52236)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52264) {
              if (52237 <= e && e <= 52263)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52264)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52320) {
            if (e < 52292) {
              if (52265 <= e && e <= 52291)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52293) {
              if (e === 52292)
                return i.CLUSTER_BREAK.LV;
            } else if (52293 <= e && e <= 52319)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52321) {
            if (e === 52320)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52348) {
            if (52321 <= e && e <= 52347)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 52348)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 52432) {
          if (e < 52377) {
            if (e < 52376) {
              if (52349 <= e && e <= 52375)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52376)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52404) {
            if (52377 <= e && e <= 52403)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52405) {
            if (e === 52404)
              return i.CLUSTER_BREAK.LV;
          } else if (52405 <= e && e <= 52431)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 52461) {
          if (e < 52433) {
            if (e === 52432)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52460) {
            if (52433 <= e && e <= 52459)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 52460)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 52488) {
          if (52461 <= e && e <= 52487)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 52489) {
          if (e === 52488)
            return i.CLUSTER_BREAK.LV;
        } else if (52489 <= e && e <= 52515)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 53105) {
        if (e < 52797) {
          if (e < 52656) {
            if (e < 52573) {
              if (e < 52544) {
                if (e < 52517) {
                  if (e === 52516)
                    return i.CLUSTER_BREAK.LV;
                } else if (52517 <= e && e <= 52543)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 52545) {
                if (e === 52544)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 52572) {
                if (52545 <= e && e <= 52571)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 52572)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52601) {
              if (e < 52600) {
                if (52573 <= e && e <= 52599)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 52600)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52628) {
              if (52601 <= e && e <= 52627)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52629) {
              if (e === 52628)
                return i.CLUSTER_BREAK.LV;
            } else if (52629 <= e && e <= 52655)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52713) {
            if (e < 52684) {
              if (e < 52657) {
                if (e === 52656)
                  return i.CLUSTER_BREAK.LV;
              } else if (52657 <= e && e <= 52683)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52685) {
              if (e === 52684)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52712) {
              if (52685 <= e && e <= 52711)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52712)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52768) {
            if (e < 52740) {
              if (52713 <= e && e <= 52739)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52741) {
              if (e === 52740)
                return i.CLUSTER_BREAK.LV;
            } else if (52741 <= e && e <= 52767)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52769) {
            if (e === 52768)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52796) {
            if (52769 <= e && e <= 52795)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 52796)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 52964) {
          if (e < 52880) {
            if (e < 52825) {
              if (e < 52824) {
                if (52797 <= e && e <= 52823)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 52824)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52852) {
              if (52825 <= e && e <= 52851)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 52853) {
              if (e === 52852)
                return i.CLUSTER_BREAK.LV;
            } else if (52853 <= e && e <= 52879)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52909) {
            if (e < 52881) {
              if (e === 52880)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 52908) {
              if (52881 <= e && e <= 52907)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 52908)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 52936) {
            if (52909 <= e && e <= 52935)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52937) {
            if (e === 52936)
              return i.CLUSTER_BREAK.LV;
          } else if (52937 <= e && e <= 52963)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53021) {
          if (e < 52992) {
            if (e < 52965) {
              if (e === 52964)
                return i.CLUSTER_BREAK.LV;
            } else if (52965 <= e && e <= 52991)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 52993) {
            if (e === 52992)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 53020) {
            if (52993 <= e && e <= 53019)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 53020)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53076) {
          if (e < 53048) {
            if (53021 <= e && e <= 53047)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53049) {
            if (e === 53048)
              return i.CLUSTER_BREAK.LV;
          } else if (53049 <= e && e <= 53075)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53077) {
          if (e === 53076)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53104) {
          if (53077 <= e && e <= 53103)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 53104)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 53412) {
        if (e < 53245) {
          if (e < 53188) {
            if (e < 53133) {
              if (e < 53132) {
                if (53105 <= e && e <= 53131)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 53132)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 53160) {
              if (53133 <= e && e <= 53159)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 53161) {
              if (e === 53160)
                return i.CLUSTER_BREAK.LV;
            } else if (53161 <= e && e <= 53187)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53216) {
            if (e < 53189) {
              if (e === 53188)
                return i.CLUSTER_BREAK.LV;
            } else if (53189 <= e && e <= 53215)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53217) {
            if (e === 53216)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 53244) {
            if (53217 <= e && e <= 53243)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 53244)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53328) {
          if (e < 53273) {
            if (e < 53272) {
              if (53245 <= e && e <= 53271)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 53272)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 53300) {
            if (53273 <= e && e <= 53299)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53301) {
            if (e === 53300)
              return i.CLUSTER_BREAK.LV;
          } else if (53301 <= e && e <= 53327)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53357) {
          if (e < 53329) {
            if (e === 53328)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 53356) {
            if (53329 <= e && e <= 53355)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 53356)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53384) {
          if (53357 <= e && e <= 53383)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53385) {
          if (e === 53384)
            return i.CLUSTER_BREAK.LV;
        } else if (53385 <= e && e <= 53411)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 53553) {
        if (e < 53469) {
          if (e < 53440) {
            if (e < 53413) {
              if (e === 53412)
                return i.CLUSTER_BREAK.LV;
            } else if (53413 <= e && e <= 53439)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53441) {
            if (e === 53440)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 53468) {
            if (53441 <= e && e <= 53467)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 53468)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53524) {
          if (e < 53496) {
            if (53469 <= e && e <= 53495)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 53497) {
            if (e === 53496)
              return i.CLUSTER_BREAK.LV;
          } else if (53497 <= e && e <= 53523)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53525) {
          if (e === 53524)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53552) {
          if (53525 <= e && e <= 53551)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 53552)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 53636) {
        if (e < 53581) {
          if (e < 53580) {
            if (53553 <= e && e <= 53579)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 53580)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53608) {
          if (53581 <= e && e <= 53607)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 53609) {
          if (e === 53608)
            return i.CLUSTER_BREAK.LV;
        } else if (53609 <= e && e <= 53635)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 53665) {
        if (e < 53637) {
          if (e === 53636)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 53664) {
          if (53637 <= e && e <= 53663)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 53664)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 53692) {
        if (53665 <= e && e <= 53691)
          return i.CLUSTER_BREAK.LVT;
      } else if (e < 53693) {
        if (e === 53692)
          return i.CLUSTER_BREAK.LV;
      } else if (53693 <= e && e <= 53719)
        return i.CLUSTER_BREAK.LVT;
    } else if (e < 70459) {
      if (e < 54897) {
        if (e < 54308) {
          if (e < 54001) {
            if (e < 53860) {
              if (e < 53777) {
                if (e < 53748) {
                  if (e < 53721) {
                    if (e === 53720)
                      return i.CLUSTER_BREAK.LV;
                  } else if (53721 <= e && e <= 53747)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e < 53749) {
                  if (e === 53748)
                    return i.CLUSTER_BREAK.LV;
                } else if (e < 53776) {
                  if (53749 <= e && e <= 53775)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 53776)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 53805) {
                if (e < 53804) {
                  if (53777 <= e && e <= 53803)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 53804)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 53832) {
                if (53805 <= e && e <= 53831)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 53833) {
                if (e === 53832)
                  return i.CLUSTER_BREAK.LV;
              } else if (53833 <= e && e <= 53859)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 53917) {
              if (e < 53888) {
                if (e < 53861) {
                  if (e === 53860)
                    return i.CLUSTER_BREAK.LV;
                } else if (53861 <= e && e <= 53887)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 53889) {
                if (e === 53888)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 53916) {
                if (53889 <= e && e <= 53915)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 53916)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 53972) {
              if (e < 53944) {
                if (53917 <= e && e <= 53943)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 53945) {
                if (e === 53944)
                  return i.CLUSTER_BREAK.LV;
              } else if (53945 <= e && e <= 53971)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 53973) {
              if (e === 53972)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54e3) {
              if (53973 <= e && e <= 53999)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 54e3)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54141) {
            if (e < 54084) {
              if (e < 54029) {
                if (e < 54028) {
                  if (54001 <= e && e <= 54027)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 54028)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 54056) {
                if (54029 <= e && e <= 54055)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 54057) {
                if (e === 54056)
                  return i.CLUSTER_BREAK.LV;
              } else if (54057 <= e && e <= 54083)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54112) {
              if (e < 54085) {
                if (e === 54084)
                  return i.CLUSTER_BREAK.LV;
              } else if (54085 <= e && e <= 54111)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54113) {
              if (e === 54112)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54140) {
              if (54113 <= e && e <= 54139)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 54140)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54224) {
            if (e < 54169) {
              if (e < 54168) {
                if (54141 <= e && e <= 54167)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 54168)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54196) {
              if (54169 <= e && e <= 54195)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54197) {
              if (e === 54196)
                return i.CLUSTER_BREAK.LV;
            } else if (54197 <= e && e <= 54223)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54253) {
            if (e < 54225) {
              if (e === 54224)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54252) {
              if (54225 <= e && e <= 54251)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 54252)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54280) {
            if (54253 <= e && e <= 54279)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54281) {
            if (e === 54280)
              return i.CLUSTER_BREAK.LV;
          } else if (54281 <= e && e <= 54307)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 54589) {
          if (e < 54448) {
            if (e < 54365) {
              if (e < 54336) {
                if (e < 54309) {
                  if (e === 54308)
                    return i.CLUSTER_BREAK.LV;
                } else if (54309 <= e && e <= 54335)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 54337) {
                if (e === 54336)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 54364) {
                if (54337 <= e && e <= 54363)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 54364)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54393) {
              if (e < 54392) {
                if (54365 <= e && e <= 54391)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 54392)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54420) {
              if (54393 <= e && e <= 54419)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54421) {
              if (e === 54420)
                return i.CLUSTER_BREAK.LV;
            } else if (54421 <= e && e <= 54447)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54505) {
            if (e < 54476) {
              if (e < 54449) {
                if (e === 54448)
                  return i.CLUSTER_BREAK.LV;
              } else if (54449 <= e && e <= 54475)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54477) {
              if (e === 54476)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54504) {
              if (54477 <= e && e <= 54503)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 54504)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54560) {
            if (e < 54532) {
              if (54505 <= e && e <= 54531)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54533) {
              if (e === 54532)
                return i.CLUSTER_BREAK.LV;
            } else if (54533 <= e && e <= 54559)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54561) {
            if (e === 54560)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54588) {
            if (54561 <= e && e <= 54587)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 54588)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 54756) {
          if (e < 54672) {
            if (e < 54617) {
              if (e < 54616) {
                if (54589 <= e && e <= 54615)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 54616)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54644) {
              if (54617 <= e && e <= 54643)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 54645) {
              if (e === 54644)
                return i.CLUSTER_BREAK.LV;
            } else if (54645 <= e && e <= 54671)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54701) {
            if (e < 54673) {
              if (e === 54672)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 54700) {
              if (54673 <= e && e <= 54699)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 54700)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54728) {
            if (54701 <= e && e <= 54727)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54729) {
            if (e === 54728)
              return i.CLUSTER_BREAK.LV;
          } else if (54729 <= e && e <= 54755)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 54813) {
          if (e < 54784) {
            if (e < 54757) {
              if (e === 54756)
                return i.CLUSTER_BREAK.LV;
            } else if (54757 <= e && e <= 54783)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54785) {
            if (e === 54784)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 54812) {
            if (54785 <= e && e <= 54811)
              return i.CLUSTER_BREAK.LVT;
          } else if (e === 54812)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 54868) {
          if (e < 54840) {
            if (54813 <= e && e <= 54839)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 54841) {
            if (e === 54840)
              return i.CLUSTER_BREAK.LV;
          } else if (54841 <= e && e <= 54867)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 54869) {
          if (e === 54868)
            return i.CLUSTER_BREAK.LV;
        } else if (e < 54896) {
          if (54869 <= e && e <= 54895)
            return i.CLUSTER_BREAK.LVT;
        } else if (e === 54896)
          return i.CLUSTER_BREAK.LV;
      } else if (e < 69632) {
        if (e < 55216) {
          if (e < 55037) {
            if (e < 54980) {
              if (e < 54925) {
                if (e < 54924) {
                  if (54897 <= e && e <= 54923)
                    return i.CLUSTER_BREAK.LVT;
                } else if (e === 54924)
                  return i.CLUSTER_BREAK.LV;
              } else if (e < 54952) {
                if (54925 <= e && e <= 54951)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e < 54953) {
                if (e === 54952)
                  return i.CLUSTER_BREAK.LV;
              } else if (54953 <= e && e <= 54979)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 55008) {
              if (e < 54981) {
                if (e === 54980)
                  return i.CLUSTER_BREAK.LV;
              } else if (54981 <= e && e <= 55007)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 55009) {
              if (e === 55008)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 55036) {
              if (55009 <= e && e <= 55035)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 55036)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 55120) {
            if (e < 55065) {
              if (e < 55064) {
                if (55037 <= e && e <= 55063)
                  return i.CLUSTER_BREAK.LVT;
              } else if (e === 55064)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 55092) {
              if (55065 <= e && e <= 55091)
                return i.CLUSTER_BREAK.LVT;
            } else if (e < 55093) {
              if (e === 55092)
                return i.CLUSTER_BREAK.LV;
            } else if (55093 <= e && e <= 55119)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 55149) {
            if (e < 55121) {
              if (e === 55120)
                return i.CLUSTER_BREAK.LV;
            } else if (e < 55148) {
              if (55121 <= e && e <= 55147)
                return i.CLUSTER_BREAK.LVT;
            } else if (e === 55148)
              return i.CLUSTER_BREAK.LV;
          } else if (e < 55176) {
            if (55149 <= e && e <= 55175)
              return i.CLUSTER_BREAK.LVT;
          } else if (e < 55177) {
            if (e === 55176)
              return i.CLUSTER_BREAK.LV;
          } else if (55177 <= e && e <= 55203)
            return i.CLUSTER_BREAK.LVT;
        } else if (e < 68097) {
          if (e < 65279) {
            if (e < 64286) {
              if (e < 55243) {
                if (55216 <= e && e <= 55238)
                  return i.CLUSTER_BREAK.V;
              } else if (55243 <= e && e <= 55291)
                return i.CLUSTER_BREAK.T;
            } else if (e < 65024) {
              if (e === 64286)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 65056) {
              if (65024 <= e && e <= 65039)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (65056 <= e && e <= 65071)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 66045) {
            if (e < 65438) {
              if (e === 65279)
                return i.CLUSTER_BREAK.CONTROL;
            } else if (e < 65520) {
              if (65438 <= e && e <= 65439)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (65520 <= e && e <= 65531)
              return i.CLUSTER_BREAK.CONTROL;
          } else if (e < 66272) {
            if (e === 66045)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 66422) {
            if (e === 66272)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (66422 <= e && e <= 66426)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 68325) {
          if (e < 68108) {
            if (e < 68101) {
              if (68097 <= e && e <= 68099)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (68101 <= e && e <= 68102)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 68152) {
            if (68108 <= e && e <= 68111)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 68159) {
            if (68152 <= e && e <= 68154)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 68159)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 69373) {
          if (e < 68900) {
            if (68325 <= e && e <= 68326)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 69291) {
            if (68900 <= e && e <= 68903)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (69291 <= e && e <= 69292)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 69446) {
          if (69373 <= e && e <= 69375)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 69506) {
          if (69446 <= e && e <= 69456)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (69506 <= e && e <= 69509)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 70016) {
        if (e < 69815) {
          if (e < 69747) {
            if (e < 69634) {
              if (e === 69632)
                return i.CLUSTER_BREAK.SPACINGMARK;
              if (e === 69633)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 69688) {
              if (e === 69634)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 69744) {
              if (69688 <= e && e <= 69702)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e === 69744)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 69762) {
            if (e < 69759) {
              if (69747 <= e && e <= 69748)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (69759 <= e && e <= 69761)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 69808) {
            if (e === 69762)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 69811) {
            if (69808 <= e && e <= 69810)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (69811 <= e && e <= 69814)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 69888)
          if (e < 69821) {
            if (e < 69817) {
              if (69815 <= e && e <= 69816)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (69817 <= e && e <= 69818)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 69826) {
            if (e === 69821)
              return i.CLUSTER_BREAK.PREPEND;
          } else {
            if (e === 69826)
              return i.CLUSTER_BREAK.EXTEND;
            if (e === 69837)
              return i.CLUSTER_BREAK.PREPEND;
          }
        else if (e < 69933) {
          if (e < 69927) {
            if (69888 <= e && e <= 69890)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 69932) {
            if (69927 <= e && e <= 69931)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 69932)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 69957) {
          if (69933 <= e && e <= 69940)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 70003) {
          if (69957 <= e && e <= 69958)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e === 70003)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 70194) {
        if (e < 70082) {
          if (e < 70067) {
            if (e < 70018) {
              if (70016 <= e && e <= 70017)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e === 70018)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 70070) {
            if (70067 <= e && e <= 70069)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 70079) {
            if (70070 <= e && e <= 70078)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (70079 <= e && e <= 70080)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 70095) {
          if (e < 70089) {
            if (70082 <= e && e <= 70083)
              return i.CLUSTER_BREAK.PREPEND;
          } else if (e < 70094) {
            if (70089 <= e && e <= 70092)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 70094)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 70188) {
          if (e === 70095)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 70191) {
          if (70188 <= e && e <= 70190)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (70191 <= e && e <= 70193)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 70209) {
        if (e < 70197) {
          if (e < 70196) {
            if (70194 <= e && e <= 70195)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e === 70196)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 70198) {
          if (e === 70197)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 70206) {
          if (70198 <= e && e <= 70199)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e === 70206)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 70371) {
        if (e < 70367) {
          if (e === 70209)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 70368) {
          if (e === 70367)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (70368 <= e && e <= 70370)
          return i.CLUSTER_BREAK.SPACINGMARK;
      } else if (e < 70400) {
        if (70371 <= e && e <= 70378)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 70402) {
        if (70400 <= e && e <= 70401)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (70402 <= e && e <= 70403)
        return i.CLUSTER_BREAK.SPACINGMARK;
    } else if (e < 72343) {
      if (e < 71339) {
        if (e < 70841) {
          if (e < 70512) {
            if (e < 70471) {
              if (e < 70463) {
                if (e < 70462) {
                  if (70459 <= e && e <= 70460)
                    return i.CLUSTER_BREAK.EXTEND;
                } else if (e === 70462)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (e < 70464) {
                if (e === 70463)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70465) {
                if (e === 70464)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (70465 <= e && e <= 70468)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 70487) {
              if (e < 70475) {
                if (70471 <= e && e <= 70472)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (70475 <= e && e <= 70477)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 70498) {
              if (e === 70487)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 70502) {
              if (70498 <= e && e <= 70499)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (70502 <= e && e <= 70508)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 70725) {
            if (e < 70712) {
              if (e < 70709) {
                if (70512 <= e && e <= 70516)
                  return i.CLUSTER_BREAK.EXTEND;
              } else if (70709 <= e && e <= 70711)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 70720) {
              if (70712 <= e && e <= 70719)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 70722) {
              if (70720 <= e && e <= 70721)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (70722 <= e && e <= 70724)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 70832) {
            if (e < 70726) {
              if (e === 70725)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e === 70726 || e === 70750)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 70833) {
            if (e === 70832)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 70835) {
            if (70833 <= e && e <= 70834)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (70835 <= e && e <= 70840)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 71096) {
          if (e < 70847)
            if (e < 70843) {
              if (e === 70841)
                return i.CLUSTER_BREAK.SPACINGMARK;
              if (e === 70842)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 70845) {
              if (70843 <= e && e <= 70844)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else {
              if (e === 70845)
                return i.CLUSTER_BREAK.EXTEND;
              if (e === 70846)
                return i.CLUSTER_BREAK.SPACINGMARK;
            }
          else if (e < 71087) {
            if (e < 70849) {
              if (70847 <= e && e <= 70848)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 70850) {
              if (e === 70849)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (70850 <= e && e <= 70851)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71088) {
            if (e === 71087)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71090) {
            if (71088 <= e && e <= 71089)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (71090 <= e && e <= 71093)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 71216) {
          if (e < 71102) {
            if (e < 71100) {
              if (71096 <= e && e <= 71099)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (71100 <= e && e <= 71101)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71103) {
            if (e === 71102)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 71132) {
            if (71103 <= e && e <= 71104)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (71132 <= e && e <= 71133)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 71229) {
          if (e < 71219) {
            if (71216 <= e && e <= 71218)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 71227) {
            if (71219 <= e && e <= 71226)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (71227 <= e && e <= 71228)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 71230) {
          if (e === 71229)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 71231) {
          if (e === 71230)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (71231 <= e && e <= 71232)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 71999)
        if (e < 71463) {
          if (e < 71350) {
            if (e < 71341) {
              if (e === 71339)
                return i.CLUSTER_BREAK.EXTEND;
              if (e === 71340)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 71342) {
              if (e === 71341)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 71344) {
              if (71342 <= e && e <= 71343)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (71344 <= e && e <= 71349)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71453) {
            if (e === 71350)
              return i.CLUSTER_BREAK.SPACINGMARK;
            if (e === 71351)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71458) {
            if (71453 <= e && e <= 71455)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71462) {
            if (71458 <= e && e <= 71461)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 71462)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 71984) {
          if (e < 71727) {
            if (e < 71724) {
              if (71463 <= e && e <= 71467)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (71724 <= e && e <= 71726)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 71736) {
            if (71727 <= e && e <= 71735)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71737) {
            if (e === 71736)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (71737 <= e && e <= 71738)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 71995) {
          if (e < 71985) {
            if (e === 71984)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 71991) {
            if (71985 <= e && e <= 71989)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (71991 <= e && e <= 71992)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 71997) {
          if (71995 <= e && e <= 71996)
            return i.CLUSTER_BREAK.EXTEND;
        } else {
          if (e === 71997)
            return i.CLUSTER_BREAK.SPACINGMARK;
          if (e === 71998)
            return i.CLUSTER_BREAK.EXTEND;
        }
      else if (e < 72193)
        if (e < 72145)
          if (e < 72001) {
            if (e === 71999)
              return i.CLUSTER_BREAK.PREPEND;
            if (e === 72e3)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 72002) {
            if (e === 72001)
              return i.CLUSTER_BREAK.PREPEND;
          } else {
            if (e === 72002)
              return i.CLUSTER_BREAK.SPACINGMARK;
            if (e === 72003)
              return i.CLUSTER_BREAK.EXTEND;
          }
        else if (e < 72156) {
          if (e < 72148) {
            if (72145 <= e && e <= 72147)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 72154) {
            if (72148 <= e && e <= 72151)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (72154 <= e && e <= 72155)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 72160) {
          if (72156 <= e && e <= 72159)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else {
          if (e === 72160)
            return i.CLUSTER_BREAK.EXTEND;
          if (e === 72164)
            return i.CLUSTER_BREAK.SPACINGMARK;
        }
      else if (e < 72263) {
        if (e < 72249) {
          if (e < 72243) {
            if (72193 <= e && e <= 72202)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (72243 <= e && e <= 72248)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 72250) {
          if (e === 72249)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 72251) {
          if (e === 72250)
            return i.CLUSTER_BREAK.PREPEND;
        } else if (72251 <= e && e <= 72254)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 72281) {
        if (e < 72273) {
          if (e === 72263)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 72279) {
          if (72273 <= e && e <= 72278)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (72279 <= e && e <= 72280)
          return i.CLUSTER_BREAK.SPACINGMARK;
      } else if (e < 72324) {
        if (72281 <= e && e <= 72283)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 72330) {
        if (72324 <= e && e <= 72329)
          return i.CLUSTER_BREAK.PREPEND;
      } else if (72330 <= e && e <= 72342)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (e < 94033) {
      if (e < 73104) {
        if (e < 72881) {
          if (e < 72766) {
            if (e < 72751) {
              if (e < 72344) {
                if (e === 72343)
                  return i.CLUSTER_BREAK.SPACINGMARK;
              } else if (72344 <= e && e <= 72345)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (e < 72752) {
              if (e === 72751)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 72760) {
              if (72752 <= e && e <= 72758)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (72760 <= e && e <= 72765)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 72850) {
            if (e === 72766)
              return i.CLUSTER_BREAK.SPACINGMARK;
            if (e === 72767)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 72873) {
            if (72850 <= e && e <= 72871)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 72874) {
            if (e === 72873)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (72874 <= e && e <= 72880)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 73018) {
          if (e < 72884) {
            if (e < 72882) {
              if (e === 72881)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (72882 <= e && e <= 72883)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 72885) {
            if (e === 72884)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 73009) {
            if (72885 <= e && e <= 72886)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (73009 <= e && e <= 73014)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 73030) {
          if (e < 73020) {
            if (e === 73018)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 73023) {
            if (73020 <= e && e <= 73021)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (73023 <= e && e <= 73029)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 73031) {
          if (e === 73030)
            return i.CLUSTER_BREAK.PREPEND;
        } else if (e < 73098) {
          if (e === 73031)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (73098 <= e && e <= 73102)
          return i.CLUSTER_BREAK.SPACINGMARK;
      } else if (e < 73526) {
        if (e < 73459)
          if (e < 73109) {
            if (e < 73107) {
              if (73104 <= e && e <= 73105)
                return i.CLUSTER_BREAK.EXTEND;
            } else if (73107 <= e && e <= 73108)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 73110) {
            if (e === 73109)
              return i.CLUSTER_BREAK.EXTEND;
          } else {
            if (e === 73110)
              return i.CLUSTER_BREAK.SPACINGMARK;
            if (e === 73111)
              return i.CLUSTER_BREAK.EXTEND;
          }
        else if (e < 73474) {
          if (e < 73461) {
            if (73459 <= e && e <= 73460)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 73472) {
            if (73461 <= e && e <= 73462)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (73472 <= e && e <= 73473)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 73475) {
          if (e === 73474)
            return i.CLUSTER_BREAK.PREPEND;
        } else if (e < 73524) {
          if (e === 73475)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (73524 <= e && e <= 73525)
          return i.CLUSTER_BREAK.SPACINGMARK;
      } else if (e < 78896)
        if (e < 73536) {
          if (e < 73534) {
            if (73526 <= e && e <= 73530)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (73534 <= e && e <= 73535)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 73537) {
          if (e === 73536)
            return i.CLUSTER_BREAK.EXTEND;
        } else {
          if (e === 73537)
            return i.CLUSTER_BREAK.SPACINGMARK;
          if (e === 73538)
            return i.CLUSTER_BREAK.EXTEND;
        }
      else if (e < 92912) {
        if (e < 78912) {
          if (78896 <= e && e <= 78911)
            return i.CLUSTER_BREAK.CONTROL;
        } else if (e < 78919) {
          if (e === 78912)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (78919 <= e && e <= 78933)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 92976) {
        if (92912 <= e && e <= 92916)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 94031) {
        if (92976 <= e && e <= 92982)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e === 94031)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (e < 121476) {
      if (e < 119143)
        if (e < 113824) {
          if (e < 94180) {
            if (e < 94095) {
              if (94033 <= e && e <= 94087)
                return i.CLUSTER_BREAK.SPACINGMARK;
            } else if (94095 <= e && e <= 94098)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 94192) {
            if (e === 94180)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e < 113821) {
            if (94192 <= e && e <= 94193)
              return i.CLUSTER_BREAK.SPACINGMARK;
          } else if (113821 <= e && e <= 113822)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 118576) {
          if (e < 118528) {
            if (113824 <= e && e <= 113827)
              return i.CLUSTER_BREAK.CONTROL;
          } else if (118528 <= e && e <= 118573)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 119141) {
          if (118576 <= e && e <= 118598)
            return i.CLUSTER_BREAK.EXTEND;
        } else {
          if (e === 119141)
            return i.CLUSTER_BREAK.EXTEND;
          if (e === 119142)
            return i.CLUSTER_BREAK.SPACINGMARK;
        }
      else if (e < 119173) {
        if (e < 119150) {
          if (e < 119149) {
            if (119143 <= e && e <= 119145)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (e === 119149)
            return i.CLUSTER_BREAK.SPACINGMARK;
        } else if (e < 119155) {
          if (119150 <= e && e <= 119154)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 119163) {
          if (119155 <= e && e <= 119162)
            return i.CLUSTER_BREAK.CONTROL;
        } else if (119163 <= e && e <= 119170)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 121344) {
        if (e < 119210) {
          if (119173 <= e && e <= 119179)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 119362) {
          if (119210 <= e && e <= 119213)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (119362 <= e && e <= 119364)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 121403) {
        if (121344 <= e && e <= 121398)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 121461) {
        if (121403 <= e && e <= 121452)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e === 121461)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (e < 123628) {
      if (e < 122907) {
        if (e < 121505) {
          if (e < 121499) {
            if (e === 121476)
              return i.CLUSTER_BREAK.EXTEND;
          } else if (121499 <= e && e <= 121503)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 122880) {
          if (121505 <= e && e <= 121519)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 122888) {
          if (122880 <= e && e <= 122886)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (122888 <= e && e <= 122904)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 123023) {
        if (e < 122915) {
          if (122907 <= e && e <= 122913)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (e < 122918) {
          if (122915 <= e && e <= 122916)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (122918 <= e && e <= 122922)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 123184) {
        if (e === 123023)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 123566) {
        if (123184 <= e && e <= 123190)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e === 123566)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (e < 127995) {
      if (e < 125136) {
        if (e < 124140) {
          if (123628 <= e && e <= 123631)
            return i.CLUSTER_BREAK.EXTEND;
        } else if (124140 <= e && e <= 124143)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 125252) {
        if (125136 <= e && e <= 125142)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 127462) {
        if (125252 <= e && e <= 125258)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (127462 <= e && e <= 127487)
        return i.CLUSTER_BREAK.REGIONAL_INDICATOR;
    } else if (e < 917632) {
      if (e < 917504) {
        if (127995 <= e && e <= 127999)
          return i.CLUSTER_BREAK.EXTEND;
      } else if (e < 917536) {
        if (917504 <= e && e <= 917535)
          return i.CLUSTER_BREAK.CONTROL;
      } else if (917536 <= e && e <= 917631)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (e < 917760) {
      if (917632 <= e && e <= 917759)
        return i.CLUSTER_BREAK.CONTROL;
    } else if (e < 918e3) {
      if (917760 <= e && e <= 917999)
        return i.CLUSTER_BREAK.EXTEND;
    } else if (918e3 <= e && e <= 921599)
      return i.CLUSTER_BREAK.CONTROL;
    return i.CLUSTER_BREAK.OTHER;
  }
  /**
   * Given a Unicode code point, returns if symbol is an extended pictographic or some other break
   * @param code {number} Unicode code point
   * @returns {number}
   */
  static getEmojiProperty(e) {
    if (e < 10160) {
      if (e < 9728) {
        if (e < 9e3) {
          if (e < 8482) {
            if (e < 8252) {
              if (e === 169 || e === 174)
                return i.EXTENDED_PICTOGRAPHIC;
            } else if (e === 8252 || e === 8265)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 8596) {
            if (e === 8482 || e === 8505)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 8617) {
            if (8596 <= e && e <= 8601)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 8986) {
            if (8617 <= e && e <= 8618)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (8986 <= e && e <= 8987)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 9410) {
          if (e < 9167) {
            if (e === 9e3 || e === 9096)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 9193) {
            if (e === 9167)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 9208) {
            if (9193 <= e && e <= 9203)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (9208 <= e && e <= 9210)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 9654) {
          if (e < 9642) {
            if (e === 9410)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (9642 <= e && e <= 9643)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 9664) {
          if (e === 9654)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 9723) {
          if (e === 9664)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (9723 <= e && e <= 9726)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 10035) {
        if (e < 10004) {
          if (e < 9748) {
            if (e < 9735) {
              if (9728 <= e && e <= 9733)
                return i.EXTENDED_PICTOGRAPHIC;
            } else if (9735 <= e && e <= 9746)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 9872) {
            if (9748 <= e && e <= 9861)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 9992) {
            if (9872 <= e && e <= 9989)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (9992 <= e && e <= 10002)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 10013) {
          if (e === 10004 || e === 10006)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 10017) {
          if (e === 10013)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e === 10017 || e === 10024)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 10067) {
        if (e < 10055) {
          if (e < 10052) {
            if (10035 <= e && e <= 10036)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e === 10052)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 10060) {
          if (e === 10055)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e === 10060 || e === 10062)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 10083) {
        if (e < 10071) {
          if (10067 <= e && e <= 10069)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e === 10071)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 10133) {
        if (10083 <= e && e <= 10087)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 10145) {
        if (10133 <= e && e <= 10135)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e === 10145)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 127489) {
      if (e < 12951) {
        if (e < 11035) {
          if (e < 10548) {
            if (e === 10160 || e === 10175)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e < 11013) {
            if (10548 <= e && e <= 10549)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (11013 <= e && e <= 11015)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 11093) {
          if (e < 11088) {
            if (11035 <= e && e <= 11036)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e === 11088)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 12336) {
          if (e === 11093)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e === 12336 || e === 12349)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 127340) {
        if (e < 126976) {
          if (e === 12951 || e === 12953)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 127245) {
          if (126976 <= e && e <= 127231)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 127279) {
          if (127245 <= e && e <= 127247)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e === 127279)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 127374) {
        if (e < 127358) {
          if (127340 <= e && e <= 127345)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (127358 <= e && e <= 127359)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 127377) {
        if (e === 127374)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 127405) {
        if (127377 <= e && e <= 127386)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (127405 <= e && e <= 127461)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 128981) {
      if (e < 127561) {
        if (e < 127535) {
          if (e < 127514) {
            if (127489 <= e && e <= 127503)
              return i.EXTENDED_PICTOGRAPHIC;
          } else if (e === 127514)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 127538) {
          if (e === 127535)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (e < 127548) {
          if (127538 <= e && e <= 127546)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (127548 <= e && e <= 127551)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 128326) {
        if (e < 128e3) {
          if (127561 <= e && e <= 127994)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (128e3 <= e && e <= 128317)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 128640) {
        if (128326 <= e && e <= 128591)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 128884) {
        if (128640 <= e && e <= 128767)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (128884 <= e && e <= 128895)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 129198) {
      if (e < 129096) {
        if (e < 129036) {
          if (128981 <= e && e <= 129023)
            return i.EXTENDED_PICTOGRAPHIC;
        } else if (129036 <= e && e <= 129039)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 129114) {
        if (129096 <= e && e <= 129103)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (e < 129160) {
        if (129114 <= e && e <= 129119)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (129160 <= e && e <= 129167)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 129340) {
      if (e < 129292) {
        if (129198 <= e && e <= 129279)
          return i.EXTENDED_PICTOGRAPHIC;
      } else if (129292 <= e && e <= 129338)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 129351) {
      if (129340 <= e && e <= 129349)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (e < 130048) {
      if (129351 <= e && e <= 129791)
        return i.EXTENDED_PICTOGRAPHIC;
    } else if (130048 <= e && e <= 131069)
      return i.EXTENDED_PICTOGRAPHIC;
    return i.CLUSTER_BREAK.OTHER;
  }
}
lo.default = At;
var Jb = B && B.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(oo, "__esModule", { value: !0 });
const Qb = Jb(lo);
oo.default = Qb.default;
var Yb = B && B.__createBinding || (Object.create ? function(t, e, r, n) {
  n === void 0 && (n = r);
  var s = Object.getOwnPropertyDescriptor(e, r);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[r];
  } }), Object.defineProperty(t, n, s);
} : function(t, e, r, n) {
  n === void 0 && (n = r), t[n] = e[r];
}), em = B && B.__setModuleDefault || (Object.create ? function(t, e) {
  Object.defineProperty(t, "default", { enumerable: !0, value: e });
} : function(t, e) {
  t.default = e;
}), tm = B && B.__importStar || function(t) {
  if (t && t.__esModule)
    return t;
  var e = {};
  if (t != null)
    for (var r in t)
      r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Yb(e, t, r);
  return em(e, t), e;
}, rm = B && B.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.validateLanguage = Be.parseLanguage = Be.b64UrlToUtf8 = Be.utf8ToB64Url = Be.graphemeLen = Be.utf8Len = void 0;
const im = rm(oo), ta = tm(hu), nm = (t) => new TextEncoder().encode(t).byteLength;
Be.utf8Len = nm;
const sm = (t) => new im.default().countGraphemes(t);
Be.graphemeLen = sm;
const am = (t) => ta.toString(ta.fromString(t, "utf8"), "base64url");
Be.utf8ToB64Url = am;
const om = (t) => ta.toString(ta.fromString(t, "base64url"), "utf8");
Be.b64UrlToUtf8 = om;
const lm = (t) => {
  const e = t.match(Au);
  if (!e?.groups)
    return null;
  const r = e.groups;
  return {
    grandfathered: r.grandfathered,
    language: r.language,
    extlang: r.extlang,
    script: r.script,
    region: r.region,
    variant: r.variant,
    extension: r.extension,
    privateUse: r.privateUseA || r.privateUseB
  };
};
Be.parseLanguage = lm;
const um = (t) => Au.test(t);
Be.validateLanguage = um;
const Au = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUseA>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUseB>x(-[A-Za-z0-9]{1,8})+))$/;
var vu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.didDocument = t.getServiceEndpoint = t.getNotifEndpoint = t.getFeedGenEndpoint = t.getPdsEndpoint = t.getSigningDidKey = t.getVerificationMaterial = t.getSigningKey = t.getHandle = t.getDid = t.isValidDidDoc = void 0;
  const e = Sr, r = (_) => t.didDocument.safeParse(_).success;
  t.isValidDidDoc = r;
  const n = (_) => {
    const w = _.id;
    if (typeof w != "string")
      throw new Error("No `id` on document");
    return w;
  };
  t.getDid = n;
  const s = (_) => {
    const w = _.alsoKnownAs;
    if (!w)
      return;
    const A = w.find((L) => L.startsWith("at://"));
    if (A)
      return A.slice(5);
  };
  t.getHandle = s;
  const u = (_) => (0, t.getVerificationMaterial)(_, "atproto");
  t.getSigningKey = u;
  const l = (_, w) => {
    const A = (0, t.getDid)(_);
    let L = _.verificationMethod;
    if (!L || typeof L != "object")
      return;
    Array.isArray(L) || (L = [L]);
    const K = L.find((V) => V.id === `#${w}` || V.id === `${A}#${w}`);
    if (K?.publicKeyMultibase)
      return {
        type: K.type,
        publicKeyMultibase: K.publicKeyMultibase
      };
  };
  t.getVerificationMaterial = l;
  const o = (_) => {
    const w = (0, t.getSigningKey)(_);
    if (w)
      return `did:key:${w.publicKeyMultibase}`;
  };
  t.getSigningDidKey = o;
  const d = (_) => (0, t.getServiceEndpoint)(_, {
    id: "#atproto_pds",
    type: "AtprotoPersonalDataServer"
  });
  t.getPdsEndpoint = d;
  const f = (_) => (0, t.getServiceEndpoint)(_, {
    id: "#bsky_fg",
    type: "BskyFeedGenerator"
  });
  t.getFeedGenEndpoint = f;
  const m = (_) => (0, t.getServiceEndpoint)(_, {
    id: "#bsky_notif",
    type: "BskyNotificationService"
  });
  t.getNotifEndpoint = m;
  const E = (_, w) => {
    const A = (0, t.getDid)(_);
    let L = _.service;
    if (!L || typeof L != "object")
      return;
    Array.isArray(L) || (L = [L]);
    const K = L.find((V) => V.id === w.id || V.id === `${A}${w.id}`);
    if (K && !(w.type && K.type !== w.type) && typeof K.serviceEndpoint == "string")
      return h(K.serviceEndpoint);
  };
  t.getServiceEndpoint = E;
  const h = (_) => {
    let w;
    try {
      w = new URL(_);
    } catch {
      return;
    }
    if (["http:", "https:"].includes(w.protocol))
      return w.hostname ? _ : void 0;
  }, v = e.z.object({
    id: e.z.string(),
    type: e.z.string(),
    controller: e.z.string(),
    publicKeyMultibase: e.z.string().optional()
  }), T = e.z.object({
    id: e.z.string(),
    type: e.z.string(),
    serviceEndpoint: e.z.union([e.z.string(), e.z.record(e.z.unknown())])
  });
  t.didDocument = e.z.object({
    id: e.z.string(),
    alsoKnownAs: e.z.array(e.z.string()).optional(),
    verificationMethod: e.z.array(v).optional(),
    service: e.z.array(T).optional()
  });
})(vu);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(u, l, o, d) {
    d === void 0 && (d = o);
    var f = Object.getOwnPropertyDescriptor(l, o);
    (!f || ("get" in f ? !l.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
      return l[o];
    } }), Object.defineProperty(u, d, f);
  } : function(u, l, o, d) {
    d === void 0 && (d = o), u[d] = l[o];
  }), r = B && B.__setModuleDefault || (Object.create ? function(u, l) {
    Object.defineProperty(u, "default", { enumerable: !0, value: l });
  } : function(u, l) {
    u.default = l;
  }), n = B && B.__importStar || function(u) {
    if (u && u.__esModule)
      return u;
    var l = {};
    if (u != null)
      for (var o in u)
        o !== "default" && Object.prototype.hasOwnProperty.call(u, o) && e(l, u, o);
    return r(l, u), l;
  }, s = B && B.__exportStar || function(u, l) {
    for (var o in u)
      o !== "default" && !Object.prototype.hasOwnProperty.call(l, o) && e(l, u, o);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.util = t.check = void 0, t.check = n(Ft), t.util = n(Mr), s(Gr, t), s(cu, t), s(Mr, t), s(Ii, t), s(pu, t), s(qr, t), s(xu, t), s(gu, t), s(Be, t), s(vu, t);
})(tr);
var le = {}, _u = {};
(function(t) {
  (() => {
    var e = { d: (m, E) => {
      for (var h in E)
        e.o(E, h) && !e.o(m, h) && Object.defineProperty(m, h, { enumerable: !0, get: E[h] });
    }, o: (m, E) => Object.prototype.hasOwnProperty.call(m, E), r: (m) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(m, "__esModule", { value: !0 });
    } }, r = {};
    function n(m, E) {
      return E === void 0 && (E = "-"), new RegExp("^(?!0{4}" + E + "0{2}" + E + "0{2})((?=[0-9]{4}" + E + "(((0[^2])|1[0-2])|02(?=" + E + "(([0-1][0-9])|2[0-8])))" + E + "[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))" + E + "02" + E + "29))([0-9]{4})" + E + "(?!((0[469])|11)" + E + "31)((0[1,3-9]|1[0-2])|(02(?!" + E + "3)))" + E + "(0[1-9]|[1-2][0-9]|3[0-1])$").test(m);
    }
    function s(m) {
      var E = /\D/.exec(m);
      return E ? E[0] : "";
    }
    function u(m, E, h) {
      E === void 0 && (E = ":"), h === void 0 && (h = !1);
      var v = new RegExp("^([0-1]|2(?=([0-3])|4" + E + "00))[0-9]" + E + "[0-5][0-9](" + E + "([0-5]|6(?=0))[0-9])?(.[0-9]{1,9})?$");
      if (!h || !/[Z+\-]/.test(m))
        return v.test(m);
      if (/Z$/.test(m))
        return v.test(m.replace("Z", ""));
      var T = m.includes("+"), _ = m.split(/[+-]/), w = _[0], A = _[1];
      return v.test(w) && function(L, K, V) {
        return V === void 0 && (V = ":"), new RegExp(K ? "^(0(?!(2" + V + "4)|0" + V + "3)|1(?=([0-1]|2(?=" + V + "[04])|[34](?=" + V + "0))))([03469](?=" + V + "[03])|[17](?=" + V + "0)|2(?=" + V + "[04])|5(?=" + V + "[034])|8(?=" + V + "[04]))" + V + "([03](?=0)|4(?=5))[05]$" : "^(0(?=[^0])|1(?=[0-2]))([39](?=" + V + "[03])|[0-24-8](?=" + V + "00))" + V + "[03]0$").test(L);
      }(A, T, s(A));
    }
    function l(m) {
      var E = m.split("T"), h = E[0], v = E[1], T = n(h, s(h));
      if (!v)
        return !1;
      var _, w = (_ = v.match(/([^Z+\-\d])(?=\d+\1)/), Array.isArray(_) ? _[0] : "");
      return T && u(v, w, !0);
    }
    function o(m, E) {
      return E === void 0 && (E = "-"), new RegExp("^[0-9]{4}" + E + "(0(?=[^0])|1(?=[0-2]))[0-9]$").test(m);
    }
    e.r(r), e.d(r, { isValidDate: () => n, isValidISODateString: () => l, isValidTime: () => u, isValidYearMonth: () => o });
    var d = t;
    for (var f in r)
      d[f] = r[f];
    r.__esModule && Object.defineProperty(d, "__esModule", { value: !0 });
  })();
})(_u);
var qo;
function cm() {
  if (qo)
    return le;
  qo = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.language = le.cid = le.nsid = le.atIdentifier = le.handle = le.did = le.atUri = le.uri = le.datetime = void 0;
  const t = _u, e = oi, r = rr(), n = ai, s = tr;
  function u(T, _) {
    try {
      if (!(0, t.isValidISODateString)(_))
        throw new Error();
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be an valid atproto datetime (both RFC-3339 and ISO-8601)`)
      };
    }
    return { success: !0, value: _ };
  }
  le.datetime = u;
  function l(T, _) {
    return _.match(/^\w+:(?:\/\/)?[^\s/][^\s]*$/) !== null ? { success: !0, value: _ } : {
      success: !1,
      error: new r.ValidationError(`${T} must be a uri`)
    };
  }
  le.uri = l;
  function o(T, _) {
    try {
      (0, n.ensureValidAtUri)(_);
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be a valid at-uri`)
      };
    }
    return { success: !0, value: _ };
  }
  le.atUri = o;
  function d(T, _) {
    try {
      (0, n.ensureValidDid)(_);
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be a valid did`)
      };
    }
    return { success: !0, value: _ };
  }
  le.did = d;
  function f(T, _) {
    try {
      (0, n.ensureValidHandle)(_);
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be a valid handle`)
      };
    }
    return { success: !0, value: _ };
  }
  le.handle = f;
  function m(T, _) {
    return !d(T, _).success && !f(T, _).success ? {
      success: !1,
      error: new r.ValidationError(`${T} must be a valid did or a handle`)
    } : { success: !0, value: _ };
  }
  le.atIdentifier = m;
  function E(T, _) {
    try {
      (0, n.ensureValidNsid)(_);
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be a valid nsid`)
      };
    }
    return { success: !0, value: _ };
  }
  le.nsid = E;
  function h(T, _) {
    try {
      e.CID.parse(_);
    } catch {
      return {
        success: !1,
        error: new r.ValidationError(`${T} must be a cid string`)
      };
    }
    return { success: !0, value: _ };
  }
  le.cid = h;
  function v(T, _) {
    return (0, s.validateLanguage)(_) ? { success: !0, value: _ } : {
      success: !1,
      error: new r.ValidationError(`${T} must be a well-formed BCP 47 language tag`)
    };
  }
  return le.language = v, le;
}
var Xo;
function wu() {
  if (Xo)
    return Ee;
  Xo = 1;
  var t = B && B.__createBinding || (Object.create ? function(T, _, w, A) {
    A === void 0 && (A = w);
    var L = Object.getOwnPropertyDescriptor(_, w);
    (!L || ("get" in L ? !_.__esModule : L.writable || L.configurable)) && (L = { enumerable: !0, get: function() {
      return _[w];
    } }), Object.defineProperty(T, A, L);
  } : function(T, _, w, A) {
    A === void 0 && (A = w), T[A] = _[w];
  }), e = B && B.__setModuleDefault || (Object.create ? function(T, _) {
    Object.defineProperty(T, "default", { enumerable: !0, value: _ });
  } : function(T, _) {
    T.default = _;
  }), r = B && B.__importStar || function(T) {
    if (T && T.__esModule)
      return T;
    var _ = {};
    if (T != null)
      for (var w in T)
        w !== "default" && Object.prototype.hasOwnProperty.call(T, w) && t(_, T, w);
    return e(_, T), _;
  };
  Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.unknown = Ee.cidLink = Ee.bytes = Ee.string = Ee.integer = Ee.boolean = Ee.validate = void 0;
  const n = tr, s = oi, u = r(cm()), l = rr();
  function o(T, _, w, A) {
    switch (w.type) {
      case "boolean":
        return d(T, _, w, A);
      case "integer":
        return f(T, _, w, A);
      case "string":
        return m(T, _, w, A);
      case "bytes":
        return E(T, _, w, A);
      case "cid-link":
        return h(T, _, w, A);
      case "unknown":
        return v(T, _, w, A);
      default:
        return {
          success: !1,
          error: new l.ValidationError(`Unexpected lexicon type: ${w.type}`)
        };
    }
  }
  Ee.validate = o;
  function d(T, _, w, A) {
    w = w;
    const L = typeof A;
    return L === "undefined" ? typeof w.default == "boolean" ? { success: !0, value: w.default } : {
      success: !1,
      error: new l.ValidationError(`${_} must be a boolean`)
    } : L !== "boolean" ? {
      success: !1,
      error: new l.ValidationError(`${_} must be a boolean`)
    } : typeof w.const == "boolean" && A !== w.const ? {
      success: !1,
      error: new l.ValidationError(`${_} must be ${w.const}`)
    } : { success: !0, value: A };
  }
  Ee.boolean = d;
  function f(T, _, w, A) {
    return w = w, typeof A === "undefined" ? typeof w.default == "number" ? { success: !0, value: w.default } : {
      success: !1,
      error: new l.ValidationError(`${_} must be an integer`)
    } : Number.isInteger(A) ? typeof w.const == "number" && A !== w.const ? {
      success: !1,
      error: new l.ValidationError(`${_} must be ${w.const}`)
    } : Array.isArray(w.enum) && !w.enum.includes(A) ? {
      success: !1,
      error: new l.ValidationError(`${_} must be one of (${w.enum.join("|")})`)
    } : typeof w.maximum == "number" && A > w.maximum ? {
      success: !1,
      error: new l.ValidationError(`${_} can not be greater than ${w.maximum}`)
    } : typeof w.minimum == "number" && A < w.minimum ? {
      success: !1,
      error: new l.ValidationError(`${_} can not be less than ${w.minimum}`)
    } : { success: !0, value: A } : {
      success: !1,
      error: new l.ValidationError(`${_} must be an integer`)
    };
  }
  Ee.integer = f;
  function m(T, _, w, A) {
    if (w = w, typeof A > "u")
      return typeof w.default == "string" ? { success: !0, value: w.default } : {
        success: !1,
        error: new l.ValidationError(`${_} must be a string`)
      };
    if (typeof A != "string")
      return {
        success: !1,
        error: new l.ValidationError(`${_} must be a string`)
      };
    if (typeof w.const == "string" && A !== w.const)
      return {
        success: !1,
        error: new l.ValidationError(`${_} must be ${w.const}`)
      };
    if (Array.isArray(w.enum) && !w.enum.includes(A))
      return {
        success: !1,
        error: new l.ValidationError(`${_} must be one of (${w.enum.join("|")})`)
      };
    if (typeof w.maxLength == "number" && (0, n.utf8Len)(A) > w.maxLength)
      return {
        success: !1,
        error: new l.ValidationError(`${_} must not be longer than ${w.maxLength} characters`)
      };
    if (typeof w.minLength == "number" && (0, n.utf8Len)(A) < w.minLength)
      return {
        success: !1,
        error: new l.ValidationError(`${_} must not be shorter than ${w.minLength} characters`)
      };
    if (typeof w.maxGraphemes == "number" && (0, n.graphemeLen)(A) > w.maxGraphemes)
      return {
        success: !1,
        error: new l.ValidationError(`${_} must not be longer than ${w.maxGraphemes} graphemes`)
      };
    if (typeof w.minGraphemes == "number" && (0, n.graphemeLen)(A) < w.minGraphemes)
      return {
        success: !1,
        error: new l.ValidationError(`${_} must not be shorter than ${w.minGraphemes} graphemes`)
      };
    if (typeof w.format == "string")
      switch (w.format) {
        case "datetime":
          return u.datetime(_, A);
        case "uri":
          return u.uri(_, A);
        case "at-uri":
          return u.atUri(_, A);
        case "did":
          return u.did(_, A);
        case "handle":
          return u.handle(_, A);
        case "at-identifier":
          return u.atIdentifier(_, A);
        case "nsid":
          return u.nsid(_, A);
        case "cid":
          return u.cid(_, A);
        case "language":
          return u.language(_, A);
      }
    return { success: !0, value: A };
  }
  Ee.string = m;
  function E(T, _, w, A) {
    return w = w, !A || !(A instanceof Uint8Array) ? {
      success: !1,
      error: new l.ValidationError(`${_} must be a byte array`)
    } : typeof w.maxLength == "number" && A.byteLength > w.maxLength ? {
      success: !1,
      error: new l.ValidationError(`${_} must not be larger than ${w.maxLength} bytes`)
    } : typeof w.minLength == "number" && A.byteLength < w.minLength ? {
      success: !1,
      error: new l.ValidationError(`${_} must not be smaller than ${w.minLength} bytes`)
    } : { success: !0, value: A };
  }
  Ee.bytes = E;
  function h(T, _, w, A) {
    return s.CID.asCID(A) === null ? {
      success: !1,
      error: new l.ValidationError(`${_} must be a CID`)
    } : { success: !0, value: A };
  }
  Ee.cidLink = h;
  function v(T, _, w, A) {
    return !A || typeof A != "object" ? {
      success: !1,
      error: new l.ValidationError(`${_} must be an object`)
    } : { success: !0, value: A };
  }
  return Ee.unknown = v, Ee;
}
var _i = {}, fa = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.BlobRef = t.jsonBlobRef = t.untypedJsonBlobRef = t.typedJsonBlobRef = void 0;
  const e = tr, r = oi, n = Sr;
  t.typedJsonBlobRef = n.z.object({
    $type: n.z.literal("blob"),
    ref: e.schema.cid,
    mimeType: n.z.string(),
    size: n.z.number()
  }).strict(), t.untypedJsonBlobRef = n.z.object({
    cid: n.z.string(),
    mimeType: n.z.string()
  }).strict(), t.jsonBlobRef = n.z.union([t.typedJsonBlobRef, t.untypedJsonBlobRef]);
  class s {
    constructor(l, o, d, f) {
      Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: l
      }), Object.defineProperty(this, "mimeType", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
      }), Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: d
      }), Object.defineProperty(this, "original", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.original = f ?? {
        $type: "blob",
        ref: l,
        mimeType: o,
        size: d
      };
    }
    static asBlobRef(l) {
      return e.check.is(l, t.jsonBlobRef) ? s.fromJsonRef(l) : null;
    }
    static fromJsonRef(l) {
      return e.check.is(l, t.typedJsonBlobRef) ? new s(l.ref, l.mimeType, l.size) : new s(r.CID.parse(l.cid), l.mimeType, -1, l);
    }
    ipld() {
      return {
        $type: "blob",
        ref: this.ref,
        mimeType: this.mimeType,
        size: this.size
      };
    }
    toJSON() {
      return (0, e.ipldToJson)(this.ipld());
    }
  }
  t.BlobRef = s;
})(fa);
var zo;
function pm() {
  if (zo)
    return _i;
  zo = 1, Object.defineProperty(_i, "__esModule", { value: !0 }), _i.blob = void 0;
  const t = fa, e = rr();
  function r(n, s, u, l) {
    return !l || !(l instanceof t.BlobRef) ? {
      success: !1,
      error: new e.ValidationError(`${s} should be a blob ref`)
    } : { success: !0, value: l };
  }
  return _i.blob = r, _i;
}
var Fo;
function da() {
  if (Fo)
    return gt;
  Fo = 1;
  var t = B && B.__createBinding || (Object.create ? function(m, E, h, v) {
    v === void 0 && (v = h);
    var T = Object.getOwnPropertyDescriptor(E, h);
    (!T || ("get" in T ? !E.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return E[h];
    } }), Object.defineProperty(m, v, T);
  } : function(m, E, h, v) {
    v === void 0 && (v = h), m[v] = E[h];
  }), e = B && B.__setModuleDefault || (Object.create ? function(m, E) {
    Object.defineProperty(m, "default", { enumerable: !0, value: E });
  } : function(m, E) {
    m.default = E;
  }), r = B && B.__importStar || function(m) {
    if (m && m.__esModule)
      return m;
    var E = {};
    if (m != null)
      for (var h in m)
        h !== "default" && Object.prototype.hasOwnProperty.call(m, h) && t(E, m, h);
    return e(E, m), E;
  };
  Object.defineProperty(gt, "__esModule", { value: !0 }), gt.object = gt.array = gt.validate = void 0;
  const n = rr(), s = ba(), u = r(wu()), l = r(pm());
  function o(m, E, h, v) {
    switch (h.type) {
      case "boolean":
        return u.boolean(m, E, h, v);
      case "integer":
        return u.integer(m, E, h, v);
      case "string":
        return u.string(m, E, h, v);
      case "bytes":
        return u.bytes(m, E, h, v);
      case "cid-link":
        return u.cidLink(m, E, h, v);
      case "unknown":
        return u.unknown(m, E, h, v);
      case "object":
        return f(m, E, h, v);
      case "array":
        return d(m, E, h, v);
      case "blob":
        return l.blob(m, E, h, v);
      default:
        return {
          success: !1,
          error: new n.ValidationError(`Unexpected lexicon type: ${h.type}`)
        };
    }
  }
  gt.validate = o;
  function d(m, E, h, v) {
    if (!Array.isArray(v))
      return {
        success: !1,
        error: new n.ValidationError(`${E} must be an array`)
      };
    if (typeof h.maxLength == "number" && v.length > h.maxLength)
      return {
        success: !1,
        error: new n.ValidationError(`${E} must not have more than ${h.maxLength} elements`)
      };
    if (typeof h.minLength == "number" && v.length < h.minLength)
      return {
        success: !1,
        error: new n.ValidationError(`${E} must not have fewer than ${h.minLength} elements`)
      };
    const T = h.items;
    for (let _ = 0; _ < v.length; _++) {
      const w = v[_], A = `${E}/${_}`, L = (0, s.validateOneOf)(m, A, T, w);
      if (!L.success)
        return L;
    }
    return { success: !0, value: v };
  }
  gt.array = d;
  function f(m, E, h, v) {
    if (h = h, !v || typeof v != "object")
      return {
        success: !1,
        error: new n.ValidationError(`${E} must be an object`)
      };
    const T = new Set(h.required), _ = new Set(h.nullable);
    let w = v;
    if (typeof h.properties == "object")
      for (const A in h.properties) {
        if (v[A] === null && _.has(A))
          continue;
        const L = h.properties[A], K = `${E}/${A}`, V = (0, s.validateOneOf)(m, K, L, v[A]), N = V.success ? V.value : v[A], q = typeof N > "u";
        if (q && T.has(A))
          return {
            success: !1,
            error: new n.ValidationError(`${E} must have the property "${A}"`)
          };
        if (!q && !V.success)
          return V;
        N !== v[A] && (w === v && (w = { ...v }), w[A] = N);
      }
    return { success: !0, value: w };
  }
  return gt.object = f, gt;
}
var Zo;
function ba() {
  if (Zo)
    return Ke;
  Zo = 1;
  var t = B && B.__createBinding || (Object.create ? function(h, v, T, _) {
    _ === void 0 && (_ = T);
    var w = Object.getOwnPropertyDescriptor(v, T);
    (!w || ("get" in w ? !v.__esModule : w.writable || w.configurable)) && (w = { enumerable: !0, get: function() {
      return v[T];
    } }), Object.defineProperty(h, _, w);
  } : function(h, v, T, _) {
    _ === void 0 && (_ = T), h[_] = v[T];
  }), e = B && B.__setModuleDefault || (Object.create ? function(h, v) {
    Object.defineProperty(h, "default", { enumerable: !0, value: v });
  } : function(h, v) {
    h.default = v;
  }), r = B && B.__importStar || function(h) {
    if (h && h.__esModule)
      return h;
    var v = {};
    if (h != null)
      for (var T in h)
        T !== "default" && Object.prototype.hasOwnProperty.call(h, T) && t(v, h, T);
    return e(v, h), v;
  };
  Object.defineProperty(Ke, "__esModule", { value: !0 }), Ke.requiredPropertiesRefinement = Ke.toConcreteTypes = Ke.assertValidOneOf = Ke.validateOneOf = Ke.toLexUri = void 0;
  const n = r(da()), s = rr(), u = Sr;
  function l(h, v) {
    if (h.split("#").length > 2)
      throw new Error("Uri can only have one hash segment");
    if (h.startsWith("lex:"))
      return h;
    if (h.startsWith("#")) {
      if (!v)
        throw new Error(`Unable to resolve uri without anchor: ${h}`);
      return `${v}${h}`;
    }
    return `lex:${h}`;
  }
  Ke.toLexUri = l;
  function o(h, v, T, _, w = !1) {
    let A, L;
    if (T.type === "union") {
      if (!(0, s.isDiscriminatedObject)(_))
        return {
          success: !1,
          error: new s.ValidationError(`${v} must be an object which includes the "$type" property`)
        };
      if (E(T.refs, _.$type))
        L = f(h, {
          type: "ref",
          ref: _.$type
        });
      else
        return T.closed ? {
          success: !1,
          error: new s.ValidationError(`${v} $type must be one of ${T.refs.join(", ")}`)
        } : { success: !0, value: _ };
    } else
      L = f(h, T);
    for (const K of L) {
      const V = w ? n.object(h, v, K, _) : n.validate(h, v, K, _);
      if (V.success)
        return V;
      A ?? (A = V.error);
    }
    return L.length > 1 ? {
      success: !1,
      error: new s.ValidationError(`${v} did not match any of the expected definitions`)
    } : { success: !1, error: A };
  }
  Ke.validateOneOf = o;
  function d(h, v, T, _, w = !1) {
    const A = o(h, v, T, _, w);
    if (!A.success)
      throw A.error;
    return A.value;
  }
  Ke.assertValidOneOf = d;
  function f(h, v) {
    return v.type === "ref" ? [h.getDefOrThrow(v.ref)] : v.type === "union" ? v.refs.map((T) => h.getDefOrThrow(T)).flat() : [v];
  }
  Ke.toConcreteTypes = f;
  function m(h, v) {
    if (h.required !== void 0) {
      if (!Array.isArray(h.required)) {
        v.addIssue({
          code: u.z.ZodIssueCode.invalid_type,
          received: typeof h.required,
          expected: "array"
        });
        return;
      }
      if (h.properties === void 0) {
        h.required.length > 0 && v.addIssue({
          code: u.z.ZodIssueCode.custom,
          message: "Required fields defined but no properties defined"
        });
        return;
      }
      for (const T of h.required)
        h.properties[T] === void 0 && v.addIssue({
          code: u.z.ZodIssueCode.custom,
          message: `Required field "${T}" not defined`
        });
    }
  }
  Ke.requiredPropertiesRefinement = m;
  const E = (h, v) => {
    const T = l(v);
    return h.includes(T) ? !0 : T.endsWith("#main") ? h.includes(T.replace("#main", "")) : h.includes(T + "#main");
  };
  return Ke;
}
var Ho;
function rr() {
  return Ho || (Ho = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.LexiconDefNotFoundError = t.InvalidLexiconError = t.ValidationError = t.parseLexiconDoc = t.isDiscriminatedObject = t.discriminatedObject = t.hasProp = t.isObj = t.isValidLexiconDoc = t.lexiconDoc = t.lexUserType = t.lexRecord = t.lexXrpcSubscription = t.lexXrpcProcedure = t.lexXrpcQuery = t.lexXrpcError = t.lexXrpcSubscriptionMessage = t.lexXrpcBody = t.lexXrpcParameters = t.lexObject = t.lexToken = t.lexPrimitiveArray = t.lexArray = t.lexBlob = t.lexRefVariant = t.lexRefUnion = t.lexRef = t.lexIpldType = t.lexCidLink = t.lexBytes = t.lexPrimitive = t.lexUnknown = t.lexString = t.lexStringFormat = t.lexInteger = t.lexBoolean = void 0;
    const e = Sr, r = ai, n = ba();
    t.lexBoolean = e.z.object({
      type: e.z.literal("boolean"),
      description: e.z.string().optional(),
      default: e.z.boolean().optional(),
      const: e.z.boolean().optional()
    }).strict(), t.lexInteger = e.z.object({
      type: e.z.literal("integer"),
      description: e.z.string().optional(),
      default: e.z.number().int().optional(),
      minimum: e.z.number().int().optional(),
      maximum: e.z.number().int().optional(),
      enum: e.z.number().int().array().optional(),
      const: e.z.number().int().optional()
    }).strict(), t.lexStringFormat = e.z.enum([
      "datetime",
      "uri",
      "at-uri",
      "did",
      "handle",
      "at-identifier",
      "nsid",
      "cid",
      "language"
    ]), t.lexString = e.z.object({
      type: e.z.literal("string"),
      format: t.lexStringFormat.optional(),
      description: e.z.string().optional(),
      default: e.z.string().optional(),
      minLength: e.z.number().int().optional(),
      maxLength: e.z.number().int().optional(),
      minGraphemes: e.z.number().int().optional(),
      maxGraphemes: e.z.number().int().optional(),
      enum: e.z.string().array().optional(),
      const: e.z.string().optional(),
      knownValues: e.z.string().array().optional()
    }).strict(), t.lexUnknown = e.z.object({
      type: e.z.literal("unknown"),
      description: e.z.string().optional()
    }).strict(), t.lexPrimitive = e.z.discriminatedUnion("type", [
      t.lexBoolean,
      t.lexInteger,
      t.lexString,
      t.lexUnknown
    ]), t.lexBytes = e.z.object({
      type: e.z.literal("bytes"),
      description: e.z.string().optional(),
      maxLength: e.z.number().optional(),
      minLength: e.z.number().optional()
    }).strict(), t.lexCidLink = e.z.object({
      type: e.z.literal("cid-link"),
      description: e.z.string().optional()
    }).strict(), t.lexIpldType = e.z.discriminatedUnion("type", [t.lexBytes, t.lexCidLink]), t.lexRef = e.z.object({
      type: e.z.literal("ref"),
      description: e.z.string().optional(),
      ref: e.z.string()
    }).strict(), t.lexRefUnion = e.z.object({
      type: e.z.literal("union"),
      description: e.z.string().optional(),
      refs: e.z.string().array(),
      closed: e.z.boolean().optional()
    }).strict(), t.lexRefVariant = e.z.discriminatedUnion("type", [t.lexRef, t.lexRefUnion]), t.lexBlob = e.z.object({
      type: e.z.literal("blob"),
      description: e.z.string().optional(),
      accept: e.z.string().array().optional(),
      maxSize: e.z.number().optional()
    }).strict(), t.lexArray = e.z.object({
      type: e.z.literal("array"),
      description: e.z.string().optional(),
      items: e.z.union([t.lexPrimitive, t.lexIpldType, t.lexBlob, t.lexRefVariant]),
      minLength: e.z.number().int().optional(),
      maxLength: e.z.number().int().optional()
    }).strict(), t.lexPrimitiveArray = t.lexArray.merge(e.z.object({
      items: t.lexPrimitive
    }).strict()), t.lexToken = e.z.object({
      type: e.z.literal("token"),
      description: e.z.string().optional()
    }).strict(), t.lexObject = e.z.object({
      type: e.z.literal("object"),
      description: e.z.string().optional(),
      required: e.z.string().array().optional(),
      nullable: e.z.string().array().optional(),
      properties: e.z.record(e.z.union([t.lexRefVariant, t.lexIpldType, t.lexArray, t.lexBlob, t.lexPrimitive]))
    }).strict().superRefine(n.requiredPropertiesRefinement), t.lexXrpcParameters = e.z.object({
      type: e.z.literal("params"),
      description: e.z.string().optional(),
      required: e.z.string().array().optional(),
      properties: e.z.record(e.z.union([t.lexPrimitive, t.lexPrimitiveArray]))
    }).strict().superRefine(n.requiredPropertiesRefinement), t.lexXrpcBody = e.z.object({
      description: e.z.string().optional(),
      encoding: e.z.string(),
      schema: e.z.union([t.lexRefVariant, t.lexObject]).optional()
    }).strict(), t.lexXrpcSubscriptionMessage = e.z.object({
      description: e.z.string().optional(),
      schema: e.z.union([t.lexRefVariant, t.lexObject]).optional()
    }).strict(), t.lexXrpcError = e.z.object({
      name: e.z.string(),
      description: e.z.string().optional()
    }).strict(), t.lexXrpcQuery = e.z.object({
      type: e.z.literal("query"),
      description: e.z.string().optional(),
      parameters: t.lexXrpcParameters.optional(),
      output: t.lexXrpcBody.optional(),
      errors: t.lexXrpcError.array().optional()
    }).strict(), t.lexXrpcProcedure = e.z.object({
      type: e.z.literal("procedure"),
      description: e.z.string().optional(),
      parameters: t.lexXrpcParameters.optional(),
      input: t.lexXrpcBody.optional(),
      output: t.lexXrpcBody.optional(),
      errors: t.lexXrpcError.array().optional()
    }).strict(), t.lexXrpcSubscription = e.z.object({
      type: e.z.literal("subscription"),
      description: e.z.string().optional(),
      parameters: t.lexXrpcParameters.optional(),
      message: t.lexXrpcSubscriptionMessage.optional(),
      errors: t.lexXrpcError.array().optional()
    }).strict(), t.lexRecord = e.z.object({
      type: e.z.literal("record"),
      description: e.z.string().optional(),
      key: e.z.string().optional(),
      record: t.lexObject
    }).strict(), t.lexUserType = e.z.custom((h) => {
      if (!(!h || typeof h != "object") && h.type !== void 0)
        switch (h.type) {
          case "record":
            return t.lexRecord.parse(h);
          case "query":
            return t.lexXrpcQuery.parse(h);
          case "procedure":
            return t.lexXrpcProcedure.parse(h);
          case "subscription":
            return t.lexXrpcSubscription.parse(h);
          case "blob":
            return t.lexBlob.parse(h);
          case "array":
            return t.lexArray.parse(h);
          case "token":
            return t.lexToken.parse(h);
          case "object":
            return t.lexObject.parse(h);
          case "boolean":
            return t.lexBoolean.parse(h);
          case "integer":
            return t.lexInteger.parse(h);
          case "string":
            return t.lexString.parse(h);
          case "bytes":
            return t.lexBytes.parse(h);
          case "cid-link":
            return t.lexCidLink.parse(h);
          case "unknown":
            return t.lexUnknown.parse(h);
        }
    }, (h) => !h || typeof h != "object" ? {
      message: "Must be an object",
      fatal: !0
    } : h.type === void 0 ? {
      message: "Must have a type",
      fatal: !0
    } : {
      message: `Invalid type: ${h.type} must be one of: record, query, procedure, subscription, blob, array, token, object, boolean, integer, string, bytes, cid-link, unknown`,
      fatal: !0
    }), t.lexiconDoc = e.z.object({
      lexicon: e.z.literal(1),
      id: e.z.string().refine((h) => r.NSID.isValid(h), {
        message: "Must be a valid NSID"
      }),
      revision: e.z.number().optional(),
      description: e.z.string().optional(),
      defs: e.z.record(t.lexUserType)
    }).strict().superRefine((h, v) => {
      for (const T in h.defs) {
        const _ = h.defs[T];
        T !== "main" && (_.type === "record" || _.type === "procedure" || _.type === "query" || _.type === "subscription") && v.addIssue({
          code: e.z.ZodIssueCode.custom,
          message: "Records, procedures, queries, and subscriptions must be the main definition."
        });
      }
    });
    function s(h) {
      return t.lexiconDoc.safeParse(h).success;
    }
    t.isValidLexiconDoc = s;
    function u(h) {
      return h !== null && typeof h == "object";
    }
    t.isObj = u;
    function l(h, v) {
      return v in h;
    }
    t.hasProp = l, t.discriminatedObject = e.z.object({ $type: e.z.string() });
    function o(h) {
      return t.discriminatedObject.safeParse(h).success;
    }
    t.isDiscriminatedObject = o;
    function d(h) {
      return t.lexiconDoc.parse(h), h;
    }
    t.parseLexiconDoc = d;
    class f extends Error {
    }
    t.ValidationError = f;
    class m extends Error {
    }
    t.InvalidLexiconError = m;
    class E extends Error {
    }
    t.LexiconDefNotFoundError = E;
  }(Oa)), Oa;
}
var ma = {}, Me = {}, ya = {}, fm = B && B.__createBinding || (Object.create ? function(t, e, r, n) {
  n === void 0 && (n = r);
  var s = Object.getOwnPropertyDescriptor(e, r);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[r];
  } }), Object.defineProperty(t, n, s);
} : function(t, e, r, n) {
  n === void 0 && (n = r), t[n] = e[r];
}), dm = B && B.__setModuleDefault || (Object.create ? function(t, e) {
  Object.defineProperty(t, "default", { enumerable: !0, value: e });
} : function(t, e) {
  t.default = e;
}), bm = B && B.__importStar || function(t) {
  if (t && t.__esModule)
    return t;
  var e = {};
  if (t != null)
    for (var r in t)
      r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && fm(e, t, r);
  return dm(e, t), e;
};
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.params = void 0;
const mm = rr(), ym = bm(wu()), hm = da();
function Em(t, e, r, n) {
  const s = n && typeof n == "object" ? n : {}, u = new Set(r.required ?? []);
  let l = s;
  if (typeof r.properties == "object")
    for (const o in r.properties) {
      const d = r.properties[o], f = d.type === "array" ? (0, hm.array)(t, o, d, s[o]) : ym.validate(t, o, d, s[o]), m = f.success ? f.value : s[o], E = typeof m > "u";
      if (E && u.has(o))
        return {
          success: !1,
          error: new mm.ValidationError(`${e} must have the property "${o}"`)
        };
      if (!E && !f.success)
        return f;
      m !== s[o] && (l === s && (l = { ...s }), l[o] = m);
    }
  return { success: !0, value: l };
}
ya.params = Em;
var xm = B && B.__createBinding || (Object.create ? function(t, e, r, n) {
  n === void 0 && (n = r);
  var s = Object.getOwnPropertyDescriptor(e, r);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[r];
  } }), Object.defineProperty(t, n, s);
} : function(t, e, r, n) {
  n === void 0 && (n = r), t[n] = e[r];
}), gm = B && B.__setModuleDefault || (Object.create ? function(t, e) {
  Object.defineProperty(t, "default", { enumerable: !0, value: e });
} : function(t, e) {
  t.default = e;
}), Tu = B && B.__importStar || function(t) {
  if (t && t.__esModule)
    return t;
  var e = {};
  if (t != null)
    for (var r in t)
      r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && xm(e, t, r);
  return gm(e, t), e;
};
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.assertValidXrpcMessage = Me.assertValidXrpcOutput = Me.assertValidXrpcInput = Me.assertValidXrpcParams = Me.assertValidRecord = void 0;
const fo = ba(), Rm = Tu(da()), Am = Tu(ya);
function vm(t, e, r) {
  const n = Rm.object(t, "Record", e.record, r);
  if (!n.success)
    throw n.error;
  return n.value;
}
Me.assertValidRecord = vm;
function _m(t, e, r) {
  if (e.parameters) {
    const n = Am.params(t, "Params", e.parameters, r);
    if (!n.success)
      throw n.error;
    return n.value;
  }
}
Me.assertValidXrpcParams = _m;
function wm(t, e, r) {
  if (e.input?.schema)
    return (0, fo.assertValidOneOf)(t, "Input", e.input.schema, r, !0);
}
Me.assertValidXrpcInput = wm;
function Tm(t, e, r) {
  if (e.output?.schema)
    return (0, fo.assertValidOneOf)(t, "Output", e.output.schema, r, !0);
}
Me.assertValidXrpcOutput = Tm;
function Cm(t, e, r) {
  if (e.message?.schema)
    return (0, fo.assertValidOneOf)(t, "Message", e.message.schema, r, !0);
}
Me.assertValidXrpcMessage = Cm;
var Lm = B && B.__createBinding || (Object.create ? function(t, e, r, n) {
  n === void 0 && (n = r);
  var s = Object.getOwnPropertyDescriptor(e, r);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[r];
  } }), Object.defineProperty(t, n, s);
} : function(t, e, r, n) {
  n === void 0 && (n = r), t[n] = e[r];
}), Sm = B && B.__setModuleDefault || (Object.create ? function(t, e) {
  Object.defineProperty(t, "default", { enumerable: !0, value: e });
} : function(t, e) {
  t.default = e;
}), km = B && B.__importStar || function(t) {
  if (t && t.__esModule)
    return t;
  var e = {};
  if (t != null)
    for (var r in t)
      r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Lm(e, t, r);
  return Sm(e, t), e;
};
Object.defineProperty(ma, "__esModule", { value: !0 });
ma.Lexicons = void 0;
const tt = rr(), wi = Me, _e = ba(), Wo = km(da());
class Bm {
  constructor(e) {
    if (Object.defineProperty(this, "docs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Map()
    }), Object.defineProperty(this, "defs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Map()
    }), e?.length)
      for (const r of e)
        this.add(r);
  }
  /**
   * Add a lexicon doc.
   */
  add(e) {
    const r = (0, _e.toLexUri)(e.id);
    if (this.docs.has(r))
      throw new Error(`${r} has already been registered`);
    Qa(e, r), this.docs.set(r, e);
    for (const [n, s] of Jo(e))
      this.defs.set(n, s);
  }
  /**
   * Remove a lexicon doc.
   */
  remove(e) {
    e = (0, _e.toLexUri)(e);
    const r = this.docs.get(e);
    if (!r)
      throw new Error(`Unable to remove "${e}": does not exist`);
    for (const [n, s] of Jo(r))
      this.defs.delete(n);
    this.docs.delete(e);
  }
  /**
   * Get a lexicon doc.
   */
  get(e) {
    return e = (0, _e.toLexUri)(e), this.docs.get(e);
  }
  /**
   * Get a definition.
   */
  getDef(e) {
    return e = (0, _e.toLexUri)(e), this.defs.get(e);
  }
  getDefOrThrow(e, r) {
    const n = this.getDef(e);
    if (!n)
      throw new tt.LexiconDefNotFoundError(`Lexicon not found: ${e}`);
    if (r && !r.includes(n.type))
      throw new tt.InvalidLexiconError(`Not a ${r.join(" or ")} lexicon: ${e}`);
    return n;
  }
  /**
   * Validate a record or object.
   */
  validate(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, ["record", "object"]);
    if (!(0, tt.isObj)(r))
      throw new tt.ValidationError("Value must be an object");
    if (n.type === "record")
      return Wo.object(this, "Record", n.record, r);
    if (n.type === "object")
      return Wo.object(this, "Object", n, r);
    throw new tt.InvalidLexiconError("Definition must be a record or object");
  }
  /**
   * Validate a record and throw on any error.
   */
  assertValidRecord(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, ["record"]);
    if (!(0, tt.isObj)(r))
      throw new tt.ValidationError("Record must be an object");
    if (!(0, tt.hasProp)(r, "$type") || typeof r.$type != "string")
      throw new tt.ValidationError("Record/$type must be a string");
    const s = r.$type || "";
    if ((0, _e.toLexUri)(s) !== e)
      throw new tt.ValidationError(`Invalid $type: must be ${e}, got ${s}`);
    return (0, wi.assertValidRecord)(this, n, r);
  }
  /**
   * Validate xrpc query params and throw on any error.
   */
  assertValidXrpcParams(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, [
      "query",
      "procedure",
      "subscription"
    ]);
    return (0, wi.assertValidXrpcParams)(this, n, r);
  }
  /**
   * Validate xrpc input body and throw on any error.
   */
  assertValidXrpcInput(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, ["procedure"]);
    return (0, wi.assertValidXrpcInput)(this, n, r);
  }
  /**
   * Validate xrpc output body and throw on any error.
   */
  assertValidXrpcOutput(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, ["query", "procedure"]);
    return (0, wi.assertValidXrpcOutput)(this, n, r);
  }
  /**
   * Validate xrpc subscription message and throw on any error.
   */
  assertValidXrpcMessage(e, r) {
    e = (0, _e.toLexUri)(e);
    const n = this.getDefOrThrow(e, ["subscription"]);
    return (0, wi.assertValidXrpcMessage)(this, n, r);
  }
  /**
   * Resolve a lex uri given a ref
   */
  resolveLexUri(e, r) {
    return e = (0, _e.toLexUri)(e), (0, _e.toLexUri)(r, e);
  }
}
ma.Lexicons = Bm;
function* Jo(t) {
  for (const e in t.defs)
    yield [`lex:${t.id}#${e}`, t.defs[e]], e === "main" && (yield [`lex:${t.id}`, t.defs[e]]);
}
function Qa(t, e) {
  for (const r in t)
    t.type === "ref" ? t.ref = (0, _e.toLexUri)(t.ref, e) : t.type === "union" ? t.refs = t.refs.map((n) => (0, _e.toLexUri)(n, e)) : Array.isArray(t[r]) ? t[r] = t[r].map((n) => typeof n == "string" ? n.startsWith("#") ? (0, _e.toLexUri)(n, e) : n : n && typeof n == "object" ? Qa(n, e) : n) : t[r] && typeof t[r] == "object" && (t[r] = Qa(t[r], e));
  return t;
}
var Cu = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.jsonStringToLex = t.jsonToLex = t.stringifyLex = t.lexToJson = t.ipldToLex = t.lexToIpld = void 0;
  const e = tr, r = oi, n = fa, s = (m) => {
    if (Array.isArray(m))
      return m.map((E) => (0, t.lexToIpld)(E));
    if (m && typeof m == "object") {
      if (m instanceof n.BlobRef)
        return m.original;
      if (r.CID.asCID(m) || m instanceof Uint8Array)
        return m;
      const E = {};
      for (const h of Object.keys(m))
        E[h] = (0, t.lexToIpld)(m[h]);
      return E;
    }
    return m;
  };
  t.lexToIpld = s;
  const u = (m) => {
    if (Array.isArray(m))
      return m.map((E) => (0, t.ipldToLex)(E));
    if (m && typeof m == "object") {
      if ((m.$type === "blob" || typeof m.cid == "string" && typeof m.mimeType == "string") && e.check.is(m, n.jsonBlobRef))
        return n.BlobRef.fromJsonRef(m);
      if (r.CID.asCID(m) || m instanceof Uint8Array)
        return m;
      const E = {};
      for (const h of Object.keys(m))
        E[h] = (0, t.ipldToLex)(m[h]);
      return E;
    }
    return m;
  };
  t.ipldToLex = u;
  const l = (m) => (0, e.ipldToJson)((0, t.lexToIpld)(m));
  t.lexToJson = l;
  const o = (m) => JSON.stringify((0, t.lexToJson)(m));
  t.stringifyLex = o;
  const d = (m) => (0, t.ipldToLex)((0, e.jsonToIpld)(m));
  t.jsonToLex = d;
  const f = (m) => (0, t.jsonToLex)(JSON.parse(m));
  t.jsonStringToLex = f;
})(Cu);
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(n, s, u, l) {
    l === void 0 && (l = u);
    var o = Object.getOwnPropertyDescriptor(s, u);
    (!o || ("get" in o ? !s.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return s[u];
    } }), Object.defineProperty(n, l, o);
  } : function(n, s, u, l) {
    l === void 0 && (l = u), n[l] = s[u];
  }), r = B && B.__exportStar || function(n, s) {
    for (var u in n)
      u !== "default" && !Object.prototype.hasOwnProperty.call(s, u) && e(s, n, u);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), r(rr(), t), r(ma, t), r(fa, t), r(Cu, t);
})(Ui);
var Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
var ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.BSKY_LABELER_DID = void 0;
ji.BSKY_LABELER_DID = "did:plc:ar7c4by46qjdydhdevvrndac";
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
Ni.sanitizeMutedWordValue = void 0;
function Dm(t) {
  return t.trim().replace(/^#(?!\ufe0f)/, "").replace(/[\r\n\u00AD\u2060\u200D\u200C\u200B]+/, "");
}
Ni.sanitizeMutedWordValue = Dm;
var c = {}, C = {}, ha = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.XRPCInvalidResponseError = t.XRPCError = t.XRPCResponse = t.ResponseTypeStrings = t.ResponseTypeNames = t.ResponseType = t.errorResponseBody = void 0;
  const e = Sr;
  t.errorResponseBody = e.z.object({
    error: e.z.string().optional(),
    message: e.z.string().optional()
  });
  var r;
  (function(l) {
    l[l.Unknown = 1] = "Unknown", l[l.InvalidResponse = 2] = "InvalidResponse", l[l.Success = 200] = "Success", l[l.InvalidRequest = 400] = "InvalidRequest", l[l.AuthRequired = 401] = "AuthRequired", l[l.Forbidden = 403] = "Forbidden", l[l.XRPCNotSupported = 404] = "XRPCNotSupported", l[l.PayloadTooLarge = 413] = "PayloadTooLarge", l[l.RateLimitExceeded = 429] = "RateLimitExceeded", l[l.InternalServerError = 500] = "InternalServerError", l[l.MethodNotImplemented = 501] = "MethodNotImplemented", l[l.UpstreamFailure = 502] = "UpstreamFailure", l[l.NotEnoughResources = 503] = "NotEnoughResources", l[l.UpstreamTimeout = 504] = "UpstreamTimeout";
  })(r || (t.ResponseType = r = {})), t.ResponseTypeNames = {
    [r.InvalidResponse]: "InvalidResponse",
    [r.Success]: "Success",
    [r.InvalidRequest]: "InvalidRequest",
    [r.AuthRequired]: "AuthenticationRequired",
    [r.Forbidden]: "Forbidden",
    [r.XRPCNotSupported]: "XRPCNotSupported",
    [r.PayloadTooLarge]: "PayloadTooLarge",
    [r.RateLimitExceeded]: "RateLimitExceeded",
    [r.InternalServerError]: "InternalServerError",
    [r.MethodNotImplemented]: "MethodNotImplemented",
    [r.UpstreamFailure]: "UpstreamFailure",
    [r.NotEnoughResources]: "NotEnoughResources",
    [r.UpstreamTimeout]: "UpstreamTimeout"
  }, t.ResponseTypeStrings = {
    [r.InvalidResponse]: "Invalid Response",
    [r.Success]: "Success",
    [r.InvalidRequest]: "Invalid Request",
    [r.AuthRequired]: "Authentication Required",
    [r.Forbidden]: "Forbidden",
    [r.XRPCNotSupported]: "XRPC Not Supported",
    [r.PayloadTooLarge]: "Payload Too Large",
    [r.RateLimitExceeded]: "Rate Limit Exceeded",
    [r.InternalServerError]: "Internal Server Error",
    [r.MethodNotImplemented]: "Method Not Implemented",
    [r.UpstreamFailure]: "Upstream Failure",
    [r.NotEnoughResources]: "Not Enough Resources",
    [r.UpstreamTimeout]: "Upstream Timeout"
  };
  class n {
    constructor(o, d) {
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
      }), Object.defineProperty(this, "headers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: d
      }), Object.defineProperty(this, "success", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !0
      });
    }
  }
  t.XRPCResponse = n;
  class s extends Error {
    constructor(o, d, f, m) {
      super(f || d || t.ResponseTypeStrings[o]), Object.defineProperty(this, "status", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
      }), Object.defineProperty(this, "error", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: d
      }), Object.defineProperty(this, "success", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "headers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.error || (this.error = t.ResponseTypeNames[o]), this.headers = m;
    }
  }
  t.XRPCError = s;
  class u extends s {
    constructor(o, d, f) {
      super(r.InvalidResponse, t.ResponseTypeStrings[r.InvalidResponse], "The server gave an invalid response and may be out of date."), Object.defineProperty(this, "lexiconNsid", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
      }), Object.defineProperty(this, "validationError", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: d
      }), Object.defineProperty(this, "responseBody", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: f
      });
    }
  }
  t.XRPCInvalidResponseError = u;
})(ha);
var Lt = {}, fe = {};
Object.defineProperty(fe, "__esModule", { value: !0 });
fe.httpResponseBodyParse = fe.httpResponseCodeToEnum = fe.encodeMethodCallBody = fe.constructMethodCallHeaders = fe.normalizeHeaders = fe.encodeQueryParam = fe.constructMethodCallUri = fe.getMethodSchemaHTTPMethod = void 0;
const Su = Ui, it = ha;
function Pm(t) {
  return t.type === "procedure" ? "post" : "get";
}
fe.getMethodSchemaHTTPMethod = Pm;
function Km(t, e, r, n) {
  const s = new URL(r);
  if (s.pathname = `/xrpc/${t}`, n)
    for (const [u, l] of Object.entries(n)) {
      const o = e.parameters?.properties?.[u];
      if (!o)
        throw new Error(`Invalid query parameter: ${u}`);
      l !== void 0 && (o.type === "array" ? [].concat(l).forEach((f) => {
        s.searchParams.append(u, Ya(o.items.type, f));
      }) : s.searchParams.set(u, Ya(o.type, l)));
    }
  return s.toString();
}
fe.constructMethodCallUri = Km;
function Ya(t, e) {
  if (t === "string" || t === "unknown")
    return String(e);
  if (t === "float")
    return String(Number(e));
  if (t === "integer")
    return String(Number(e) | 0);
  if (t === "boolean")
    return e ? "true" : "false";
  if (t === "datetime")
    return e instanceof Date ? e.toISOString() : String(e);
  throw new Error(`Unsupported query param type: ${t}`);
}
fe.encodeQueryParam = Ya;
function Um(t) {
  const e = {};
  for (const [r, n] of Object.entries(t))
    e[r.toLowerCase()] = n;
  return e;
}
fe.normalizeHeaders = Um;
function Vm(t, e, r) {
  const n = r?.headers || {};
  return t.type === "procedure" && (r?.encoding && (n["Content-Type"] = r.encoding), e && typeof e == "object" && (n["Content-Type"] || (n["Content-Type"] = "application/json"))), n;
}
fe.constructMethodCallHeaders = Vm;
function Im(t, e) {
  if (!(!t["content-type"] || typeof e > "u"))
    return e instanceof ArrayBuffer ? e : t["content-type"].startsWith("text/") ? new TextEncoder().encode(e.toString()) : t["content-type"].startsWith("application/json") ? new TextEncoder().encode((0, Su.stringifyLex)(e)) : e;
}
fe.encodeMethodCallBody = Im;
function Om(t) {
  let e;
  return t in it.ResponseType ? e = t : t >= 100 && t < 200 ? e = it.ResponseType.XRPCNotSupported : t >= 200 && t < 300 ? e = it.ResponseType.Success : t >= 300 && t < 400 ? e = it.ResponseType.XRPCNotSupported : t >= 400 && t < 500 ? e = it.ResponseType.InvalidRequest : e = it.ResponseType.InternalServerError, e;
}
fe.httpResponseCodeToEnum = Om;
function jm(t, e) {
  if (t) {
    if (t.includes("application/json") && e?.byteLength)
      try {
        const r = new TextDecoder().decode(e);
        return (0, Su.jsonStringToLex)(r);
      } catch (r) {
        throw new it.XRPCError(it.ResponseType.InvalidResponse, `Failed to parse response body: ${String(r)}`);
      }
    if (t.startsWith("text/") && e?.byteLength)
      try {
        return new TextDecoder().decode(e);
      } catch (r) {
        throw new it.XRPCError(it.ResponseType.InvalidResponse, `Failed to parse response body: ${String(r)}`);
      }
  }
  return e instanceof ArrayBuffer ? new Uint8Array(e) : e;
}
fe.httpResponseBodyParse = jm;
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.defaultFetchHandler = Lt.ServiceClient = Lt.Client = void 0;
const ku = Ui, cr = fe, Xt = ha;
class Nm {
  constructor() {
    Object.defineProperty(this, "fetch", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Du
    }), Object.defineProperty(this, "lex", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new ku.Lexicons()
    });
  }
  // method calls
  //
  async call(e, r, n, s, u) {
    return this.service(e).call(r, n, s, u);
  }
  service(e) {
    return new Bu(this, e);
  }
  // schemas
  // =
  addLexicon(e) {
    this.lex.add(e);
  }
  addLexicons(e) {
    for (const r of e)
      this.addLexicon(r);
  }
  removeLexicon(e) {
    this.lex.remove(e);
  }
}
Lt.Client = Nm;
class Bu {
  constructor(e, r) {
    Object.defineProperty(this, "baseClient", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "uri", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "headers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), this.baseClient = e, this.uri = typeof r == "string" ? new URL(r) : r;
  }
  setHeader(e, r) {
    this.headers[e] = r;
  }
  unsetHeader(e) {
    delete this.headers[e];
  }
  async call(e, r, n, s) {
    const u = this.baseClient.lex.getDefOrThrow(e);
    if (!u || u.type !== "query" && u.type !== "procedure")
      throw new Error(`Invalid lexicon: ${e}. Must be a query or procedure.`);
    const l = (0, cr.getMethodSchemaHTTPMethod)(u), o = (0, cr.constructMethodCallUri)(e, u, this.uri, r), d = (0, cr.constructMethodCallHeaders)(u, n, {
      headers: {
        ...this.headers,
        ...s?.headers
      },
      encoding: s?.encoding
    }), f = await this.baseClient.fetch(o, l, d, n), m = (0, cr.httpResponseCodeToEnum)(f.status);
    if (m === Xt.ResponseType.Success) {
      try {
        this.baseClient.lex.assertValidXrpcOutput(e, f.body);
      } catch (E) {
        throw E instanceof ku.ValidationError ? new Xt.XRPCInvalidResponseError(e, E, f.body) : E;
      }
      return new Xt.XRPCResponse(f.body, f.headers);
    } else
      throw f.body && $m(f.body) ? new Xt.XRPCError(m, f.body.error, f.body.message, f.headers) : new Xt.XRPCError(m);
  }
}
Lt.ServiceClient = Bu;
async function Du(t, e, r, n) {
  try {
    const s = (0, cr.normalizeHeaders)(r), u = {
      method: e,
      headers: s,
      body: (0, cr.encodeMethodCallBody)(s, n),
      duplex: "half"
    }, l = await fetch(t, u), o = await l.arrayBuffer();
    return {
      status: l.status,
      headers: Object.fromEntries(l.headers.entries()),
      body: (0, cr.httpResponseBodyParse)(l.headers.get("content-type"), o)
    };
  } catch (s) {
    throw new Xt.XRPCError(Xt.ResponseType.Unknown, String(s));
  }
}
Lt.defaultFetchHandler = Du;
function $m(t) {
  return Xt.errorResponseBody.safeParse(t).success;
}
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(u, l, o, d) {
    d === void 0 && (d = o);
    var f = Object.getOwnPropertyDescriptor(l, o);
    (!f || ("get" in f ? !l.__esModule : f.writable || f.configurable)) && (f = { enumerable: !0, get: function() {
      return l[o];
    } }), Object.defineProperty(u, d, f);
  } : function(u, l, o, d) {
    d === void 0 && (d = o), u[d] = l[o];
  }), r = B && B.__exportStar || function(u, l) {
    for (var o in u)
      o !== "default" && !Object.prototype.hasOwnProperty.call(l, o) && e(l, u, o);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), r(ha, t), r(Lt, t);
  const n = Lt, s = new n.Client();
  t.default = s;
})(C);
var z = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ids = t.lexicons = t.schemas = t.schemaDict = void 0;
  const e = Ui;
  t.schemaDict = {
    ComAtprotoAdminDefs: {
      lexicon: 1,
      id: "com.atproto.admin.defs",
      defs: {
        statusAttr: {
          type: "object",
          required: ["applied"],
          properties: {
            applied: {
              type: "boolean"
            },
            ref: {
              type: "string"
            }
          }
        },
        accountView: {
          type: "object",
          required: ["did", "handle", "indexedAt"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoRef: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        repoBlobRef: {
          type: "object",
          required: ["did", "cid"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    ComAtprotoAdminDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.admin.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.disableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Disable an account from receiving new invite codes, but does not invalidate existing codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for disabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.disableInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Disable some set of codes and/or all codes associated with a set of users.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                accounts: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminEnableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.enableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Re-enable an account's ability to receive invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for enabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfo: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfo",
      defs: {
        main: {
          type: "query",
          description: "Get details about an account.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#accountView"
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfos: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfos",
      defs: {
        main: {
          type: "query",
          description: "Get details about some accounts.",
          parameters: {
            type: "params",
            required: ["dids"],
            properties: {
              dids: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["infos"],
              properties: {
                infos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#accountView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.getInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get an admin view of invite codes.",
          parameters: {
            type: "params",
            properties: {
              sort: {
                type: "string",
                knownValues: ["recent", "usage"],
                default: "recent"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 500,
                default: 100
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                cursor: {
                  type: "string"
                },
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.getSubjectStatus",
      defs: {
        main: {
          type: "query",
          description: "Get the service-specific admin status of a subject (account, record, or blob).",
          parameters: {
            type: "params",
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              uri: {
                type: "string",
                format: "at-uri"
              },
              blob: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminSendEmail: {
      lexicon: 1,
      id: "com.atproto.admin.sendEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Send email to a user's account email address.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["recipientDid", "content", "senderDid"],
              properties: {
                recipientDid: {
                  type: "string",
                  format: "did"
                },
                content: {
                  type: "string"
                },
                subject: {
                  type: "string"
                },
                senderDid: {
                  type: "string",
                  format: "did"
                },
                comment: {
                  type: "string",
                  description: "Additional comment by the sender that won't be used in the email itself but helpful to provide more context for moderators/reviewers"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["sent"],
              properties: {
                sent: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountEmail: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account", "email"],
              properties: {
                account: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo."
                },
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountHandle: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's handle.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "handle"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                handle: {
                  type: "string",
                  format: "handle"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountPassword: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Update the password for a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.updateSubjectStatus",
      defs: {
        main: {
          type: "procedure",
          description: "Update the service-specific admin status of a subject (account, record, or blob).",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityGetRecommendedDidCredentials: {
      lexicon: 1,
      id: "com.atproto.identity.getRecommendedDidCredentials",
      defs: {
        main: {
          type: "query",
          description: "Describe the credentials that should be included in the DID doc of an account that is migrating to this service.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                rotationKeys: {
                  description: "Recommended rotation keys for PLC dids. Should be undefined (or ignored) for did:webs.",
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityRequestPlcOperationSignature: {
      lexicon: 1,
      id: "com.atproto.identity.requestPlcOperationSignature",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to in order to request a signed PLC operation. Requires Auth."
        }
      }
    },
    ComAtprotoIdentityResolveHandle: {
      lexicon: 1,
      id: "com.atproto.identity.resolveHandle",
      defs: {
        main: {
          type: "query",
          description: "Resolves a handle (domain name) to a DID.",
          parameters: {
            type: "params",
            required: ["handle"],
            properties: {
              handle: {
                type: "string",
                format: "handle",
                description: "The handle to resolve."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySignPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.signPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Signs a PLC operation to update some value(s) in the requesting DID's document.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                token: {
                  description: "A token received through com.atproto.identity.requestPlcOperationSignature",
                  type: "string"
                },
                rotationKeys: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown",
                  description: "A signed DID PLC operation."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySubmitPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.submitPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Validates a PLC operation to ensure that it doesn't violate a service's constraints or get the identity into a bad state, then submits it to the PLC registry",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityUpdateHandle: {
      lexicon: 1,
      id: "com.atproto.identity.updateHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Updates the current account's handle. Verifies handle validity, and updates did:plc document if necessary. Implemented by PDS, and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle",
                  description: "The new handle."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelDefs: {
      lexicon: 1,
      id: "com.atproto.label.defs",
      defs: {
        label: {
          type: "object",
          description: "Metadata tag on an atproto resource (eg, repo or record).",
          required: ["src", "uri", "val", "cts"],
          properties: {
            ver: {
              type: "integer",
              description: "The AT Protocol version of the label object."
            },
            src: {
              type: "string",
              format: "did",
              description: "DID of the actor who created this label."
            },
            uri: {
              type: "string",
              format: "uri",
              description: "AT URI of the record, repository (account), or other resource that this label applies to."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "Optionally, CID specifying the specific version of 'uri' resource this label applies to."
            },
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            },
            neg: {
              type: "boolean",
              description: "If true, this is a negation label, overwriting a previous label."
            },
            cts: {
              type: "string",
              format: "datetime",
              description: "Timestamp when this label was created."
            },
            exp: {
              type: "string",
              format: "datetime",
              description: "Timestamp at which this label expires (no longer applies)."
            },
            sig: {
              type: "bytes",
              description: "Signature of dag-cbor encoded label."
            }
          }
        },
        selfLabels: {
          type: "object",
          description: "Metadata tags on an atproto record, published by the author within the record.",
          required: ["values"],
          properties: {
            values: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#selfLabel"
              },
              maxLength: 10
            }
          }
        },
        selfLabel: {
          type: "object",
          description: "Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel.",
          required: ["val"],
          properties: {
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            }
          }
        },
        labelValueDefinition: {
          type: "object",
          description: "Declares a label value and its expected interpertations and behaviors.",
          required: ["identifier", "severity", "blurs", "locales"],
          properties: {
            identifier: {
              type: "string",
              description: "The value of the label being defined. Must only include lowercase ascii and the '-' character ([a-z-]+).",
              maxLength: 100,
              maxGraphemes: 100
            },
            severity: {
              type: "string",
              description: "How should a client visually convey this label? 'inform' means neutral and informational; 'alert' means negative and warning; 'none' means show nothing.",
              knownValues: ["inform", "alert", "none"]
            },
            blurs: {
              type: "string",
              description: "What should this label hide in the UI, if applied? 'content' hides all of the target; 'media' hides the images/video/audio; 'none' hides nothing.",
              knownValues: ["content", "media", "none"]
            },
            defaultSetting: {
              type: "string",
              description: "The default setting for this label.",
              knownValues: ["ignore", "warn", "hide"],
              default: "warn"
            },
            adultOnly: {
              type: "boolean",
              description: "Does the user need to have adult content enabled in order to configure this label?"
            },
            locales: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#labelValueDefinitionStrings"
              }
            }
          }
        },
        labelValueDefinitionStrings: {
          type: "object",
          description: "Strings which describe the label in the UI, localized into a specific language.",
          required: ["lang", "name", "description"],
          properties: {
            lang: {
              type: "string",
              description: "The code of the language these strings are written in.",
              format: "language"
            },
            name: {
              type: "string",
              description: "A short human-readable name for the label.",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              description: "A longer description of what the label means and why it might be applied.",
              maxGraphemes: 1e4,
              maxLength: 1e5
            }
          }
        },
        labelValue: {
          type: "string",
          knownValues: [
            "!hide",
            "!no-promote",
            "!warn",
            "!no-unauthenticated",
            "dmca-violation",
            "doxxing",
            "porn",
            "sexual",
            "nudity",
            "nsfl",
            "gore"
          ]
        }
      }
    },
    ComAtprotoLabelQueryLabels: {
      lexicon: 1,
      id: "com.atproto.label.queryLabels",
      defs: {
        main: {
          type: "query",
          description: "Find labels relevant to the provided AT-URI patterns. Public endpoint for moderation services, though may return different or additional results with auth.",
          parameters: {
            type: "params",
            required: ["uriPatterns"],
            properties: {
              uriPatterns: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI."
              },
              sources: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                },
                description: "Optional list of label sources (DIDs) to filter on."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                cursor: {
                  type: "string"
                },
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelSubscribeLabels: {
      lexicon: 1,
      id: "com.atproto.label.subscribeLabels",
      defs: {
        main: {
          type: "subscription",
          description: "Subscribe to stream of labels (and negations). Public endpoint implemented by mod services. Uses same sequencing scheme as repo event stream.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.label.subscribeLabels#labels",
                "lex:com.atproto.label.subscribeLabels#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            }
          ]
        },
        labels: {
          type: "object",
          required: ["seq", "labels"],
          properties: {
            seq: {
              type: "integer"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoModerationCreateReport: {
      lexicon: 1,
      id: "com.atproto.moderation.createReport",
      defs: {
        main: {
          type: "procedure",
          description: "Submit a moderation report regarding an atproto account or record. Implemented by moderation services (with PDS proxying), and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["reasonType", "subject"],
              properties: {
                reasonType: {
                  type: "ref",
                  description: "Indicates the broad category of violation the report is for.",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  maxGraphemes: 2e3,
                  maxLength: 2e4,
                  description: "Additional context about the content and violation."
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "id",
                "reasonType",
                "subject",
                "reportedBy",
                "createdAt"
              ],
              properties: {
                id: {
                  type: "integer"
                },
                reasonType: {
                  type: "ref",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  maxGraphemes: 2e3,
                  maxLength: 2e4
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                reportedBy: {
                  type: "string",
                  format: "did"
                },
                createdAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoModerationDefs: {
      lexicon: 1,
      id: "com.atproto.moderation.defs",
      defs: {
        reasonType: {
          type: "string",
          knownValues: [
            "com.atproto.moderation.defs#reasonSpam",
            "com.atproto.moderation.defs#reasonViolation",
            "com.atproto.moderation.defs#reasonMisleading",
            "com.atproto.moderation.defs#reasonSexual",
            "com.atproto.moderation.defs#reasonRude",
            "com.atproto.moderation.defs#reasonOther",
            "com.atproto.moderation.defs#reasonAppeal"
          ]
        },
        reasonSpam: {
          type: "token",
          description: "Spam: frequent unwanted promotion, replies, mentions"
        },
        reasonViolation: {
          type: "token",
          description: "Direct violation of server rules, laws, terms of service"
        },
        reasonMisleading: {
          type: "token",
          description: "Misleading identity, affiliation, or content"
        },
        reasonSexual: {
          type: "token",
          description: "Unwanted or mislabeled sexual content"
        },
        reasonRude: {
          type: "token",
          description: "Rude, harassing, explicit, or otherwise unwelcoming behavior"
        },
        reasonOther: {
          type: "token",
          description: "Other: reports not falling under another report category"
        },
        reasonAppeal: {
          type: "token",
          description: "Appeal: appeal a previously taken moderation action"
        }
      }
    },
    ComAtprotoRepoApplyWrites: {
      lexicon: 1,
      id: "com.atproto.repo.applyWrites",
      defs: {
        main: {
          type: "procedure",
          description: "Apply a batch transaction of repository creates, updates, and deletes. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "writes"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data, for all operations."
                },
                writes: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:com.atproto.repo.applyWrites#create",
                      "lex:com.atproto.repo.applyWrites#update",
                      "lex:com.atproto.repo.applyWrites#delete"
                    ],
                    closed: !0
                  }
                },
                swapCommit: {
                  type: "string",
                  description: "If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations.",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that the 'swapCommit' parameter did not match current commit."
            }
          ]
        },
        create: {
          type: "object",
          description: "Operation which creates a new record.",
          required: ["collection", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string",
              maxLength: 15
            },
            value: {
              type: "unknown"
            }
          }
        },
        update: {
          type: "object",
          description: "Operation which updates an existing record.",
          required: ["collection", "rkey", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            },
            value: {
              type: "unknown"
            }
          }
        },
        delete: {
          type: "object",
          description: "Operation which deletes an existing record.",
          required: ["collection", "rkey"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoRepoCreateRecord: {
      lexicon: 1,
      id: "com.atproto.repo.createRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Create a single new repository record. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "record"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record itself. Must contain a $type field."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that 'swapCommit' didn't match current repo commit."
            }
          ]
        }
      }
    },
    ComAtprotoRepoDeleteRecord: {
      lexicon: 1,
      id: "com.atproto.repo.deleteRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoDescribeRepo: {
      lexicon: 1,
      id: "com.atproto.repo.describeRepo",
      defs: {
        main: {
          type: "query",
          description: "Get information about an account and repository, including the list of collections. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "handle",
                "did",
                "didDoc",
                "collections",
                "handleIsCorrect"
              ],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown",
                  description: "The complete DID document for this account."
                },
                collections: {
                  type: "array",
                  description: "List of all the collections (NSIDs) for which this repo contains at least one record.",
                  items: {
                    type: "string",
                    format: "nsid"
                  }
                },
                handleIsCorrect: {
                  type: "boolean",
                  description: "Indicates if handle is currently valid (resolves bi-directionally)"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoGetRecord: {
      lexicon: 1,
      id: "com.atproto.repo.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get a single record from a repository. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection", "rkey"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The Record Key."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the version of the record. If not specified, then return the most recent version."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "value"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                value: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoImportRepo: {
      lexicon: 1,
      id: "com.atproto.repo.importRepo",
      defs: {
        main: {
          type: "procedure",
          description: "Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set.",
          input: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoRepoListMissingBlobs: {
      lexicon: 1,
      id: "com.atproto.repo.listMissingBlobs",
      defs: {
        main: {
          type: "query",
          description: "Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blobs"],
              properties: {
                cursor: {
                  type: "string"
                },
                blobs: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listMissingBlobs#recordBlob"
                  }
                }
              }
            }
          }
        },
        recordBlob: {
          type: "object",
          required: ["cid", "recordUri"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    ComAtprotoRepoListRecords: {
      lexicon: 1,
      id: "com.atproto.repo.listRecords",
      defs: {
        main: {
          type: "query",
          description: "List a range of records in a repository, matching a specific collection. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record type."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50,
                description: "The number of records to return."
              },
              cursor: {
                type: "string"
              },
              rkeyStart: {
                type: "string",
                description: "DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)"
              },
              rkeyEnd: {
                type: "string",
                description: "DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)"
              },
              reverse: {
                type: "boolean",
                description: "Flag to reverse the order of the returned records."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["records"],
              properties: {
                cursor: {
                  type: "string"
                },
                records: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listRecords#record"
                  }
                }
              }
            }
          }
        },
        record: {
          type: "object",
          required: ["uri", "cid", "value"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            }
          }
        }
      }
    },
    ComAtprotoRepoPutRecord: {
      lexicon: 1,
      id: "com.atproto.repo.putRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Write a repository record, creating or updating it as needed. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey", "record"],
              nullable: ["swapRecord"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record to write."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID. WARNING: nullable and optional field; may cause problems with golang implementation"
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoStrongRef: {
      lexicon: 1,
      id: "com.atproto.repo.strongRef",
      description: "A URI with a content-hash fingerprint.",
      defs: {
        main: {
          type: "object",
          required: ["uri", "cid"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            }
          }
        }
      }
    },
    ComAtprotoRepoUploadBlob: {
      lexicon: 1,
      id: "com.atproto.repo.uploadBlob",
      defs: {
        main: {
          type: "procedure",
          description: "Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS.",
          input: {
            encoding: "*/*"
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blob"],
              properties: {
                blob: {
                  type: "blob"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerActivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.activateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Activates a currently deactivated account. Used to finalize account migration after the account's repo is imported and identity is setup."
        }
      }
    },
    ComAtprotoServerCheckAccountStatus: {
      lexicon: 1,
      id: "com.atproto.server.checkAccountStatus",
      defs: {
        main: {
          type: "query",
          description: "Returns the status of an account, especially as pertaining to import or recovery. Can be called many times over the course of an account migration. Requires auth and can only be called pertaining to oneself.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "activated",
                "validDid",
                "repoCommit",
                "repoRev",
                "repoBlocks",
                "indexedRecords",
                "privateStateValues",
                "expectedBlobs",
                "importedBlobs"
              ],
              properties: {
                activated: {
                  type: "boolean"
                },
                validDid: {
                  type: "boolean"
                },
                repoCommit: {
                  type: "string",
                  format: "cid"
                },
                repoRev: {
                  type: "string"
                },
                repoBlocks: {
                  type: "integer"
                },
                indexedRecords: {
                  type: "integer"
                },
                privateStateValues: {
                  type: "integer"
                },
                expectedBlobs: {
                  type: "integer"
                },
                importedBlobs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerConfirmEmail: {
      lexicon: 1,
      id: "com.atproto.server.confirmEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Confirm an email using a token from com.atproto.server.requestEmailConfirmation.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email", "token"],
              properties: {
                email: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountNotFound"
            },
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "InvalidEmail"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAccount: {
      lexicon: 1,
      id: "com.atproto.server.createAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Create an account. Implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                email: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle",
                  description: "Requested handle for the account."
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "Pre-existing atproto DID, being imported to a new account."
                },
                inviteCode: {
                  type: "string"
                },
                verificationCode: {
                  type: "string"
                },
                verificationPhone: {
                  type: "string"
                },
                password: {
                  type: "string",
                  description: "Initial account password. May need to meet instance-specific password strength requirements."
                },
                recoveryKey: {
                  type: "string",
                  description: "DID PLC rotation key (aka, recovery key) to be included in PLC creation operation."
                },
                plcOp: {
                  type: "unknown",
                  description: "A signed DID PLC operation to be submitted as part of importing an existing account to this instance. NOTE: this optional field may be updated when full account migration is implemented."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              description: "Account login session returned on successful account creation.",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID of the new account."
                },
                didDoc: {
                  type: "unknown",
                  description: "Complete DID document."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidHandle"
            },
            {
              name: "InvalidPassword"
            },
            {
              name: "InvalidInviteCode"
            },
            {
              name: "HandleNotAvailable"
            },
            {
              name: "UnsupportedDomain"
            },
            {
              name: "UnresolvableDid"
            },
            {
              name: "IncompatibleDidDoc"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.createAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Create an App Password.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "A short name for the App Password, to help distinguish them."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.server.createAppPassword#appPassword"
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "password", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            password: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCode: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCode",
      defs: {
        main: {
          type: "procedure",
          description: "Create an invite code.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["useCount"],
              properties: {
                useCount: {
                  type: "integer"
                },
                forAccount: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["code"],
              properties: {
                code: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Create invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codeCount", "useCount"],
              properties: {
                codeCount: {
                  type: "integer",
                  default: 1
                },
                useCount: {
                  type: "integer"
                },
                forAccounts: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "did"
                  }
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.createInviteCodes#accountCodes"
                  }
                }
              }
            }
          }
        },
        accountCodes: {
          type: "object",
          required: ["account", "codes"],
          properties: {
            account: {
              type: "string"
            },
            codes: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateSession: {
      lexicon: 1,
      id: "com.atproto.server.createSession",
      defs: {
        main: {
          type: "procedure",
          description: "Create an authentication session.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["identifier", "password"],
              properties: {
                identifier: {
                  type: "string",
                  description: "Handle or other identifier supported by the server for the authenticating user."
                },
                password: {
                  type: "string"
                },
                authFactorToken: {
                  type: "string"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                },
                emailAuthFactor: {
                  type: "boolean"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            },
            {
              name: "AuthFactorTokenRequired"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeactivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.deactivateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Deactivates a currently active account. Stops serving of repo, and future writes to repo until reactivated. Used to finalize account migration with the old host after the account has been activated on the new host.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                deleteAfter: {
                  type: "string",
                  format: "datetime",
                  description: "A recommendation to server as to how long they should hold onto the deactivated account before deleting."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerDefs: {
      lexicon: 1,
      id: "com.atproto.server.defs",
      defs: {
        inviteCode: {
          type: "object",
          required: [
            "code",
            "available",
            "disabled",
            "forAccount",
            "createdBy",
            "createdAt",
            "uses"
          ],
          properties: {
            code: {
              type: "string"
            },
            available: {
              type: "integer"
            },
            disabled: {
              type: "boolean"
            },
            forAccount: {
              type: "string"
            },
            createdBy: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            uses: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCodeUse"
              }
            }
          }
        },
        inviteCodeUse: {
          type: "object",
          required: ["usedBy", "usedAt"],
          properties: {
            usedBy: {
              type: "string",
              format: "did"
            },
            usedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.server.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete an actor's account with a token and password. Can only be called after requesting a deletion token. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password", "token"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeleteSession: {
      lexicon: 1,
      id: "com.atproto.server.deleteSession",
      defs: {
        main: {
          type: "procedure",
          description: "Delete the current session. Requires auth."
        }
      }
    },
    ComAtprotoServerDescribeServer: {
      lexicon: 1,
      id: "com.atproto.server.describeServer",
      defs: {
        main: {
          type: "query",
          description: "Describes the server's account creation requirements and capabilities. Implemented by PDS.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "availableUserDomains"],
              properties: {
                inviteCodeRequired: {
                  type: "boolean",
                  description: "If true, an invite code must be supplied to create an account on this instance."
                },
                phoneVerificationRequired: {
                  type: "boolean",
                  description: "If true, a phone verification token must be supplied to create an account on this instance."
                },
                availableUserDomains: {
                  type: "array",
                  description: "List of domain suffixes that can be used in account handles.",
                  items: {
                    type: "string"
                  }
                },
                links: {
                  type: "ref",
                  description: "URLs of service policy documents.",
                  ref: "lex:com.atproto.server.describeServer#links"
                },
                contact: {
                  type: "ref",
                  description: "Contact information",
                  ref: "lex:com.atproto.server.describeServer#contact"
                },
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string",
              format: "uri"
            },
            termsOfService: {
              type: "string",
              format: "uri"
            }
          }
        },
        contact: {
          type: "object",
          properties: {
            email: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoServerGetAccountInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.getAccountInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get all invite codes for the current account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              includeUsed: {
                type: "boolean",
                default: !0
              },
              createAvailable: {
                type: "boolean",
                default: !0,
                description: "Controls whether any new 'earned' but not 'created' invites should be created."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "DuplicateCreate"
            }
          ]
        }
      }
    },
    ComAtprotoServerGetServiceAuth: {
      lexicon: 1,
      id: "com.atproto.server.getServiceAuth",
      defs: {
        main: {
          type: "query",
          description: "Get a signed token on behalf of the requesting DID for the requested service.",
          parameters: {
            type: "params",
            required: ["aud"],
            properties: {
              aud: {
                type: "string",
                format: "did",
                description: "The DID of the service that the token will be used to authenticate with"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token"],
              properties: {
                token: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerGetSession: {
      lexicon: 1,
      id: "com.atproto.server.getSession",
      defs: {
        main: {
          type: "query",
          description: "Get information about the current auth session. Requires auth.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle", "did"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                },
                emailAuthFactor: {
                  type: "boolean"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerListAppPasswords: {
      lexicon: 1,
      id: "com.atproto.server.listAppPasswords",
      defs: {
        main: {
          type: "query",
          description: "List all App Passwords.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["passwords"],
              properties: {
                passwords: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.listAppPasswords#appPassword"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerRefreshSession: {
      lexicon: 1,
      id: "com.atproto.server.refreshSession",
      defs: {
        main: {
          type: "procedure",
          description: "Refresh an authentication session. Requires auth using the 'refreshJwt' (not the 'accessJwt').",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        }
      }
    },
    ComAtprotoServerRequestAccountDelete: {
      lexicon: 1,
      id: "com.atproto.server.requestAccountDelete",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account deletion via email."
        }
      }
    },
    ComAtprotoServerRequestEmailConfirmation: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailConfirmation",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to confirm ownership of email."
        }
      }
    },
    ComAtprotoServerRequestEmailUpdate: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Request a token in order to update email.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["tokenRequired"],
              properties: {
                tokenRequired: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerRequestPasswordReset: {
      lexicon: 1,
      id: "com.atproto.server.requestPasswordReset",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account password reset via email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerReserveSigningKey: {
      lexicon: 1,
      id: "com.atproto.server.reserveSigningKey",
      defs: {
        main: {
          type: "procedure",
          description: "Reserve a repo signing key, for use with account creation. Necessary so that a DID PLC update operation can be constructed during an account migraiton. Public and does not require auth; implemented by PDS. NOTE: this endpoint may change when full account migration is implemented.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID to reserve a key for."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["signingKey"],
              properties: {
                signingKey: {
                  type: "string",
                  description: "The public key for the reserved signing key, in did:key serialization."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerResetPassword: {
      lexicon: 1,
      id: "com.atproto.server.resetPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Reset a user account password using a token.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token", "password"],
              properties: {
                token: {
                  type: "string"
                },
                password: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerRevokeAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.revokeAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Revoke an App Password by name.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerUpdateEmail: {
      lexicon: 1,
      id: "com.atproto.server.updateEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                },
                emailAuthFactor: {
                  type: "boolean"
                },
                token: {
                  type: "string",
                  description: "Requires a token from com.atproto.sever.requestEmailUpdate if the account's email has been confirmed."
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "TokenRequired"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetBlob: {
      lexicon: 1,
      id: "com.atproto.sync.getBlob",
      defs: {
        main: {
          type: "query",
          description: "Get a blob associated with a given account. Returns the full blob as originally uploaded. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cid"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the account."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the blob to fetch"
              }
            }
          },
          output: {
            encoding: "*/*"
          }
        }
      }
    },
    ComAtprotoSyncGetBlocks: {
      lexicon: 1,
      id: "com.atproto.sync.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks from a given repo, by CID. For example, intermediate MST nodes, or records. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cids"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              cids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetCheckout: {
      lexicon: 1,
      id: "com.atproto.sync.getCheckout",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getRepo instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetHead: {
      lexicon: 1,
      id: "com.atproto.sync.getHead",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getLatestCommit instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["root"],
              properties: {
                root: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "HeadNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetLatestCommit: {
      lexicon: 1,
      id: "com.atproto.sync.getLatestCommit",
      defs: {
        main: {
          type: "query",
          description: "Get the current commit CID & revision of the specified repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cid", "rev"],
              properties: {
                cid: {
                  type: "string",
                  format: "cid"
                },
                rev: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetRecord: {
      lexicon: 1,
      id: "com.atproto.sync.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did", "collection", "rkey"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid"
              },
              rkey: {
                type: "string",
                description: "Record Key"
              },
              commit: {
                type: "string",
                format: "cid",
                description: "DEPRECATED: referenced a repo commit by CID, and retrieved record as of that commit"
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetRepo: {
      lexicon: 1,
      id: "com.atproto.sync.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Download a repository export as CAR file. Optionally only a 'diff' since a previous revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "The revision ('rev') of the repo to create a diff from."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncListBlobs: {
      lexicon: 1,
      id: "com.atproto.sync.listBlobs",
      defs: {
        main: {
          type: "query",
          description: "List blob CIDso for an account, since some repo revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "Optional revision of the repo to list blobs since."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cids"],
              properties: {
                cursor: {
                  type: "string"
                },
                cids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncListRepos: {
      lexicon: 1,
      id: "com.atproto.sync.listRepos",
      defs: {
        main: {
          type: "query",
          description: "Enumerates all the DID, rev, and commit CID for all repos hosted by this service. Does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.sync.listRepos#repo"
                  }
                }
              }
            }
          }
        },
        repo: {
          type: "object",
          required: ["did", "head", "rev"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            head: {
              type: "string",
              format: "cid",
              description: "Current repo commit CID"
            },
            rev: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoSyncNotifyOfUpdate: {
      lexicon: 1,
      id: "com.atproto.sync.notifyOfUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Notify a crawling service of a recent update, and that crawling should resume. Intended use is after a gap between repo stream events caused the crawling service to disconnect. Does not require auth; implemented by Relay.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (usually a PDS) that is notifying of update."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncRequestCrawl: {
      lexicon: 1,
      id: "com.atproto.sync.requestCrawl",
      defs: {
        main: {
          type: "procedure",
          description: "Request a service to persistently crawl hosted repos. Expected use is new PDS instances declaring their existence to Relays. Does not require auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (eg, PDS) that is requesting to be crawled."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncSubscribeRepos: {
      lexicon: 1,
      id: "com.atproto.sync.subscribeRepos",
      defs: {
        main: {
          type: "subscription",
          description: "Repository event stream, aka Firehose endpoint. Outputs repo commits with diff data, and identity update events, for all repositories on the current server. See the atproto specifications for details around stream sequencing, repo versioning, CAR diff format, and more. Public and does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.sync.subscribeRepos#commit",
                "lex:com.atproto.sync.subscribeRepos#identity",
                "lex:com.atproto.sync.subscribeRepos#handle",
                "lex:com.atproto.sync.subscribeRepos#migrate",
                "lex:com.atproto.sync.subscribeRepos#tombstone",
                "lex:com.atproto.sync.subscribeRepos#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            },
            {
              name: "ConsumerTooSlow",
              description: "If the consumer of the stream can not keep up with events, and a backlog gets too large, the server will drop the connection."
            }
          ]
        },
        commit: {
          type: "object",
          description: "Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature.",
          required: [
            "seq",
            "rebase",
            "tooBig",
            "repo",
            "commit",
            "rev",
            "since",
            "blocks",
            "ops",
            "blobs",
            "time"
          ],
          nullable: ["prev", "since"],
          properties: {
            seq: {
              type: "integer",
              description: "The stream sequence number of this message."
            },
            rebase: {
              type: "boolean",
              description: "DEPRECATED -- unused"
            },
            tooBig: {
              type: "boolean",
              description: "Indicates that this commit contained too many ops, or data size was too large. Consumers will need to make a separate request to get missing data."
            },
            repo: {
              type: "string",
              format: "did",
              description: "The repo this event comes from."
            },
            commit: {
              type: "cid-link",
              description: "Repo commit object CID."
            },
            prev: {
              type: "cid-link",
              description: "DEPRECATED -- unused. WARNING -- nullable and optional; stick with optional to ensure golang interoperability."
            },
            rev: {
              type: "string",
              description: "The rev of the emitted commit. Note that this information is also in the commit object included in blocks, unless this is a tooBig event."
            },
            since: {
              type: "string",
              description: "The rev of the last emitted commit from this repo (if any)."
            },
            blocks: {
              type: "bytes",
              description: "CAR file containing relevant blocks, as a diff since the previous repo state.",
              maxLength: 1e6
            },
            ops: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.sync.subscribeRepos#repoOp",
                description: "List of repo mutation operations in this commit (eg, records created, updated, or deleted)."
              },
              maxLength: 200
            },
            blobs: {
              type: "array",
              items: {
                type: "cid-link",
                description: "List of new blobs (by CID) referenced by records in this commit."
              }
            },
            time: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this message was originally broadcast."
            }
          }
        },
        identity: {
          type: "object",
          description: "Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache.",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        handle: {
          type: "object",
          description: "Represents an update of the account's handle, or transition to/from invalid state. NOTE: Will be deprecated in favor of #identity.",
          required: ["seq", "did", "handle", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        migrate: {
          type: "object",
          description: "Represents an account moving from one PDS instance to another. NOTE: not implemented; account migration uses #identity instead",
          required: ["seq", "did", "migrateTo", "time"],
          nullable: ["migrateTo"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            migrateTo: {
              type: "string"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        tombstone: {
          type: "object",
          description: "Indicates that an account has been deleted. NOTE: may be deprecated in favor of #identity or a future #account event",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        },
        repoOp: {
          type: "object",
          description: "A repo operation, ie a mutation of a single record.",
          required: ["action", "path", "cid"],
          nullable: ["cid"],
          properties: {
            action: {
              type: "string",
              knownValues: ["create", "update", "delete"]
            },
            path: {
              type: "string"
            },
            cid: {
              type: "cid-link",
              description: "For creates and updates, the new record CID. For deletions, null."
            }
          }
        }
      }
    },
    ComAtprotoTempCheckSignupQueue: {
      lexicon: 1,
      id: "com.atproto.temp.checkSignupQueue",
      defs: {
        main: {
          type: "query",
          description: "Check accounts location in signup queue.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["activated"],
              properties: {
                activated: {
                  type: "boolean"
                },
                placeInQueue: {
                  type: "integer"
                },
                estimatedTimeMs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempFetchLabels: {
      lexicon: 1,
      id: "com.atproto.temp.fetchLabels",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED: use queryLabels or subscribeLabels instead -- Fetch all labels from a labeler created after a certain date.",
          parameters: {
            type: "params",
            properties: {
              since: {
                type: "integer"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempRequestPhoneVerification: {
      lexicon: 1,
      id: "com.atproto.temp.requestPhoneVerification",
      defs: {
        main: {
          type: "procedure",
          description: "Request a verification code to be sent to the supplied phone number",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["phoneNumber"],
              properties: {
                phoneNumber: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorDefs: {
      lexicon: 1,
      id: "app.bsky.actor.defs",
      defs: {
        profileViewBasic: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            associated: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileAssociated"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileView: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            associated: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileAssociated"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileViewDetailed: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            banner: {
              type: "string",
              format: "uri"
            },
            followersCount: {
              type: "integer"
            },
            followsCount: {
              type: "integer"
            },
            postsCount: {
              type: "integer"
            },
            associated: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileAssociated"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileAssociated: {
          type: "object",
          properties: {
            lists: {
              type: "integer"
            },
            feedgens: {
              type: "integer"
            },
            labeler: {
              type: "boolean"
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests.",
          properties: {
            muted: {
              type: "boolean"
            },
            mutedByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            blockedBy: {
              type: "boolean"
            },
            blocking: {
              type: "string",
              format: "at-uri"
            },
            blockingByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            following: {
              type: "string",
              format: "at-uri"
            },
            followedBy: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        preferences: {
          type: "array",
          items: {
            type: "union",
            refs: [
              "lex:app.bsky.actor.defs#adultContentPref",
              "lex:app.bsky.actor.defs#contentLabelPref",
              "lex:app.bsky.actor.defs#savedFeedsPref",
              "lex:app.bsky.actor.defs#personalDetailsPref",
              "lex:app.bsky.actor.defs#feedViewPref",
              "lex:app.bsky.actor.defs#threadViewPref",
              "lex:app.bsky.actor.defs#interestsPref",
              "lex:app.bsky.actor.defs#mutedWordsPref",
              "lex:app.bsky.actor.defs#hiddenPostsPref"
            ]
          }
        },
        adultContentPref: {
          type: "object",
          required: ["enabled"],
          properties: {
            enabled: {
              type: "boolean",
              default: !1
            }
          }
        },
        contentLabelPref: {
          type: "object",
          required: ["label", "visibility"],
          properties: {
            labelerDid: {
              type: "string",
              description: "Which labeler does this preference apply to? If undefined, applies globally.",
              format: "did"
            },
            label: {
              type: "string"
            },
            visibility: {
              type: "string",
              knownValues: ["ignore", "show", "warn", "hide"]
            }
          }
        },
        savedFeedsPref: {
          type: "object",
          required: ["pinned", "saved"],
          properties: {
            pinned: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            saved: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            timelineIndex: {
              type: "integer"
            }
          }
        },
        personalDetailsPref: {
          type: "object",
          properties: {
            birthDate: {
              type: "string",
              format: "datetime",
              description: "The birth date of account owner."
            }
          }
        },
        feedViewPref: {
          type: "object",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              description: "The URI of the feed, or an identifier which describes the feed."
            },
            hideReplies: {
              type: "boolean",
              description: "Hide replies in the feed."
            },
            hideRepliesByUnfollowed: {
              type: "boolean",
              description: "Hide replies in the feed if they are not by followed users.",
              default: !0
            },
            hideRepliesByLikeCount: {
              type: "integer",
              description: "Hide replies in the feed if they do not have this number of likes."
            },
            hideReposts: {
              type: "boolean",
              description: "Hide reposts in the feed."
            },
            hideQuotePosts: {
              type: "boolean",
              description: "Hide quote posts in the feed."
            }
          }
        },
        threadViewPref: {
          type: "object",
          properties: {
            sort: {
              type: "string",
              description: "Sorting mode for threads.",
              knownValues: ["oldest", "newest", "most-likes", "random"]
            },
            prioritizeFollowedUsers: {
              type: "boolean",
              description: "Show followed users at the top of all replies."
            }
          }
        },
        interestsPref: {
          type: "object",
          required: ["tags"],
          properties: {
            tags: {
              type: "array",
              maxLength: 100,
              items: {
                type: "string",
                maxLength: 640,
                maxGraphemes: 64
              },
              description: "A list of tags which describe the account owner's interests gathered during onboarding."
            }
          }
        },
        mutedWordTarget: {
          type: "string",
          knownValues: ["content", "tag"],
          maxLength: 640,
          maxGraphemes: 64
        },
        mutedWord: {
          type: "object",
          description: "A word that the account owner has muted.",
          required: ["value", "targets"],
          properties: {
            value: {
              type: "string",
              description: "The muted word itself.",
              maxLength: 1e4,
              maxGraphemes: 1e3
            },
            targets: {
              type: "array",
              description: "The intended targets of the muted word.",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWordTarget"
              }
            }
          }
        },
        mutedWordsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWord"
              },
              description: "A list of words the account owner has muted."
            }
          }
        },
        hiddenPostsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              },
              description: "A list of URIs of posts the account owner has hidden."
            }
          }
        },
        labelersPref: {
          type: "object",
          required: ["labelers"],
          properties: {
            labelers: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#labelerPrefItem"
              }
            }
          }
        },
        labelerPrefItem: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        }
      }
    },
    AppBskyActorGetPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.getPreferences",
      defs: {
        main: {
          type: "query",
          description: "Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth.",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetProfile: {
      lexicon: 1,
      id: "app.bsky.actor.getProfile",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Handle or DID of account to fetch profile of."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewDetailed"
            }
          }
        }
      }
    },
    AppBskyActorGetProfiles: {
      lexicon: 1,
      id: "app.bsky.actor.getProfiles",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile views of multiple actors.",
          parameters: {
            type: "params",
            required: ["actors"],
            properties: {
              actors: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-identifier"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["profiles"],
              properties: {
                profiles: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewDetailed"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetSuggestions: {
      lexicon: 1,
      id: "app.bsky.actor.getSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested actors. Expected use is discovery of accounts to follow during new account onboarding.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorProfile: {
      lexicon: 1,
      id: "app.bsky.actor.profile",
      defs: {
        main: {
          type: "record",
          description: "A declaration of a Bluesky account profile.",
          key: "literal:self",
          record: {
            type: "object",
            properties: {
              displayName: {
                type: "string",
                maxGraphemes: 64,
                maxLength: 640
              },
              description: {
                type: "string",
                description: "Free-form profile description text.",
                maxGraphemes: 256,
                maxLength: 2560
              },
              avatar: {
                type: "blob",
                description: "Small image to be displayed next to posts from account. AKA, 'profile picture'",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              banner: {
                type: "blob",
                description: "Larger horizontal image to display behind profile view.",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                description: "Self-label values, specific to the Bluesky application, on the overall account.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              }
            }
          }
        }
      }
    },
    AppBskyActorPutPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.putPreferences",
      defs: {
        main: {
          type: "procedure",
          description: "Set the private preferences attached to the account.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActors: {
      lexicon: 1,
      id: "app.bsky.actor.searchActors",
      defs: {
        main: {
          type: "query",
          description: "Find actors (profiles) matching search criteria. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActorsTypeahead: {
      lexicon: 1,
      id: "app.bsky.actor.searchActorsTypeahead",
      defs: {
        main: {
          type: "query",
          description: "Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query prefix; not a full query string."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 10
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewBasic"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyEmbedExternal: {
      lexicon: 1,
      id: "app.bsky.embed.external",
      defs: {
        main: {
          type: "object",
          description: "A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post).",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#external"
            }
          }
        },
        external: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            }
          }
        },
        view: {
          type: "object",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#viewExternal"
            }
          }
        },
        viewExternal: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "string",
              format: "uri"
            }
          }
        }
      }
    },
    AppBskyEmbedImages: {
      lexicon: 1,
      id: "app.bsky.embed.images",
      description: "A set of images embedded in a Bluesky record (eg, a post).",
      defs: {
        main: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#image"
              },
              maxLength: 4
            }
          }
        },
        image: {
          type: "object",
          required: ["image", "alt"],
          properties: {
            image: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        },
        aspectRatio: {
          type: "object",
          description: "width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer",
              minimum: 1
            },
            height: {
              type: "integer",
              minimum: 1
            }
          }
        },
        view: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#viewImage"
              },
              maxLength: 4
            }
          }
        },
        viewImage: {
          type: "object",
          required: ["thumb", "fullsize", "alt"],
          properties: {
            thumb: {
              type: "string",
              format: "uri",
              description: "Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View."
            },
            fullsize: {
              type: "string",
              format: "uri",
              description: "Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View."
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        }
      }
    },
    AppBskyEmbedRecord: {
      lexicon: 1,
      id: "app.bsky.embed.record",
      description: "A representation of a record embedded in a Bluesky record (eg, a post). For example, a quote-post, or sharing a feed generator record.",
      defs: {
        main: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        view: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.record#viewRecord",
                "lex:app.bsky.embed.record#viewNotFound",
                "lex:app.bsky.embed.record#viewBlocked",
                "lex:app.bsky.feed.defs#generatorView",
                "lex:app.bsky.graph.defs#listView",
                "lex:app.bsky.labeler.defs#labelerView"
              ]
            }
          }
        },
        viewRecord: {
          type: "object",
          required: ["uri", "cid", "author", "value", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            value: {
              type: "unknown",
              description: "The record data itself."
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            replyCount: {
              type: "integer"
            },
            repostCount: {
              type: "integer"
            },
            likeCount: {
              type: "integer"
            },
            embeds: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images#view",
                  "lex:app.bsky.embed.external#view",
                  "lex:app.bsky.embed.record#view",
                  "lex:app.bsky.embed.recordWithMedia#view"
                ]
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        viewNotFound: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        viewBlocked: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        }
      }
    },
    AppBskyEmbedRecordWithMedia: {
      lexicon: 1,
      id: "app.bsky.embed.recordWithMedia",
      description: "A representation of a record embedded in a Bluesky record (eg, a post), alongside other compatible embeds. For example, a quote post and image, or a quote post and external URL card.",
      defs: {
        main: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record"
            },
            media: {
              type: "union",
              refs: ["lex:app.bsky.embed.images", "lex:app.bsky.embed.external"]
            }
          }
        },
        view: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record#view"
            },
            media: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view"
              ]
            }
          }
        }
      }
    },
    AppBskyFeedDefs: {
      lexicon: 1,
      id: "app.bsky.feed.defs",
      defs: {
        postView: {
          type: "object",
          required: ["uri", "cid", "author", "record", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            record: {
              type: "unknown"
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view",
                "lex:app.bsky.embed.record#view",
                "lex:app.bsky.embed.recordWithMedia#view"
              ]
            },
            replyCount: {
              type: "integer"
            },
            repostCount: {
              type: "integer"
            },
            likeCount: {
              type: "integer"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            threadgate: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#threadgateView"
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests.",
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            },
            like: {
              type: "string",
              format: "at-uri"
            },
            replyDisabled: {
              type: "boolean"
            }
          }
        },
        feedViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            reply: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#replyRef"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#reasonRepost"]
            },
            feedContext: {
              type: "string",
              description: "Context provided by feed generator that may be passed back alongside interactions.",
              maxLength: 2e3
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            }
          }
        },
        reasonRepost: {
          type: "object",
          required: ["by", "indexedAt"],
          properties: {
            by: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        threadViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#threadViewPost",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            replies: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.feed.defs#threadViewPost",
                  "lex:app.bsky.feed.defs#notFoundPost",
                  "lex:app.bsky.feed.defs#blockedPost"
                ]
              }
            }
          }
        },
        notFoundPost: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        blockedPost: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        },
        blockedAuthor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            }
          }
        },
        generatorView: {
          type: "object",
          required: ["uri", "cid", "did", "creator", "displayName", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            did: {
              type: "string",
              format: "did"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            displayName: {
              type: "string"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            likeCount: {
              type: "integer",
              minimum: 0
            },
            acceptsInteractions: {
              type: "boolean"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#generatorViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        generatorViewerState: {
          type: "object",
          properties: {
            like: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonFeedPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "string",
              format: "at-uri"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#skeletonReasonRepost"]
            },
            feedContext: {
              type: "string",
              description: "Context that will be passed through to client and may be passed to feed generator back alongside interactions.",
              maxLength: 2e3
            }
          }
        },
        skeletonReasonRepost: {
          type: "object",
          required: ["repost"],
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        threadgateView: {
          type: "object",
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            record: {
              type: "unknown"
            },
            lists: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.graph.defs#listViewBasic"
              }
            }
          }
        },
        interaction: {
          type: "object",
          properties: {
            item: {
              type: "string",
              format: "at-uri"
            },
            event: {
              type: "string",
              knownValues: [
                "app.bsky.feed.defs#requestLess",
                "app.bsky.feed.defs#requestMore",
                "app.bsky.feed.defs#clickthroughItem",
                "app.bsky.feed.defs#clickthroughAuthor",
                "app.bsky.feed.defs#clickthroughReposter",
                "app.bsky.feed.defs#clickthroughEmbed",
                "app.bsky.feed.defs#interactionSeen",
                "app.bsky.feed.defs#interactionLike",
                "app.bsky.feed.defs#interactionRepost",
                "app.bsky.feed.defs#interactionReply",
                "app.bsky.feed.defs#interactionQuote",
                "app.bsky.feed.defs#interactionShare"
              ]
            },
            feedContext: {
              type: "string",
              description: "Context on a feed item that was orginally supplied by the feed generator on getFeedSkeleton.",
              maxLength: 2e3
            }
          }
        },
        requestLess: {
          type: "token",
          description: "Request that less content like the given feed item be shown in the feed"
        },
        requestMore: {
          type: "token",
          description: "Request that more content like the given feed item be shown in the feed"
        },
        clickthroughItem: {
          type: "token",
          description: "User clicked through to the feed item"
        },
        clickthroughAuthor: {
          type: "token",
          description: "User clicked through to the author of the feed item"
        },
        clickthroughReposter: {
          type: "token",
          description: "User clicked through to the reposter of the feed item"
        },
        clickthroughEmbed: {
          type: "token",
          description: "User clicked through to the embedded content of the feed item"
        },
        interactionSeen: {
          type: "token",
          description: "Feed item was seen by user"
        },
        interactionLike: {
          type: "token",
          description: "User liked the feed item"
        },
        interactionRepost: {
          type: "token",
          description: "User reposted the feed item"
        },
        interactionReply: {
          type: "token",
          description: "User replied to the feed item"
        },
        interactionQuote: {
          type: "token",
          description: "User quoted the feed item"
        },
        interactionShare: {
          type: "token",
          description: "User shared the feed item"
        }
      }
    },
    AppBskyFeedDescribeFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.describeFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View).",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "feeds"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.describeFeedGenerator#feed"
                  }
                },
                links: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.describeFeedGenerator#links"
                }
              }
            }
          }
        },
        feed: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string"
            },
            termsOfService: {
              type: "string"
            }
          }
        }
      }
    },
    AppBskyFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.generator",
      defs: {
        main: {
          type: "record",
          description: "Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository.",
          key: "any",
          record: {
            type: "object",
            required: ["did", "displayName", "createdAt"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              displayName: {
                type: "string",
                maxGraphemes: 24,
                maxLength: 240
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              acceptsInteractions: {
                type: "boolean",
                description: "Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions"
              },
              labels: {
                type: "union",
                description: "Self-label values",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getActorFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of feeds (feed generator records) created by the actor (in the actor's repo).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getActorLikes",
      defs: {
        main: {
          type: "query",
          description: "Get a list of posts liked by an actor. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetAuthorFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getAuthorFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              filter: {
                type: "string",
                description: "Combinations of post/repost types to include in response.",
                knownValues: [
                  "posts_with_replies",
                  "posts_no_replies",
                  "posts_with_media",
                  "posts_and_author_threads"
                ],
                default: "posts_with_replies"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a hydrated feed from an actor's selected feed generator. Implemented by App View.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator. Implemented by AppView.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the feed generator record."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["view", "isOnline", "isValid"],
              properties: {
                view: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                },
                isOnline: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service has been online recently, or else seems to be inactive."
                },
                isValid: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service is compatible with the record declaration."
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "Get information about a list of feed generators.",
          parameters: {
            type: "params",
            required: ["feeds"],
            properties: {
              feeds: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedSkeleton: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "Reference to feed generator record describing the specific feed being requested."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#skeletonFeedPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getLikes",
      defs: {
        main: {
          type: "query",
          description: "Get like records which reference a subject (by AT-URI and CID).",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the subject (eg, a post record)."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "CID of the subject record (aka, specific version of record), to filter likes."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "likes"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                likes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.getLikes#like"
                  }
                }
              }
            }
          }
        },
        like: {
          type: "object",
          required: ["indexedAt", "createdAt", "actor"],
          properties: {
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            actor: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        }
      }
    },
    AppBskyFeedGetListFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getListFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownList"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPostThread: {
      lexicon: 1,
      id: "app.bsky.feed.getPostThread",
      defs: {
        main: {
          type: "query",
          description: "Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to post record."
              },
              depth: {
                type: "integer",
                description: "How many levels of reply depth should be included in response.",
                default: 6,
                minimum: 0,
                maximum: 1e3
              },
              parentHeight: {
                type: "integer",
                description: "How many levels of parent (and grandparent, etc) post to include.",
                default: 80,
                minimum: 0,
                maximum: 1e3
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["thread"],
              properties: {
                thread: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.defs#threadViewPost",
                    "lex:app.bsky.feed.defs#notFoundPost",
                    "lex:app.bsky.feed.defs#blockedPost"
                  ]
                }
              }
            }
          },
          errors: [
            {
              name: "NotFound"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPosts: {
      lexicon: 1,
      id: "app.bsky.feed.getPosts",
      defs: {
        main: {
          type: "query",
          description: "Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'.",
          parameters: {
            type: "params",
            required: ["uris"],
            properties: {
              uris: {
                type: "array",
                description: "List of post AT-URIs to return hydrated views for.",
                items: {
                  type: "string",
                  format: "at-uri"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetRepostedBy: {
      lexicon: 1,
      id: "app.bsky.feed.getRepostedBy",
      defs: {
        main: {
          type: "query",
          description: "Get a list of reposts for a given post.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of post record"
              },
              cid: {
                type: "string",
                format: "cid",
                description: "If supplied, filters to reposts of specific version (by CID) of the post record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "repostedBy"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                repostedBy: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetSuggestedFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getSuggestedFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested feeds (feed generators) for the requesting account.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetTimeline: {
      lexicon: 1,
      id: "app.bsky.feed.getTimeline",
      defs: {
        main: {
          type: "query",
          description: "Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.",
          parameters: {
            type: "params",
            properties: {
              algorithm: {
                type: "string",
                description: "Variant 'algorithm' for timeline. Implementation-specific. NOTE: most feed flexibility has been moved to feed generator mechanism."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedLike: {
      lexicon: 1,
      id: "app.bsky.feed.like",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'like' of a piece of subject content.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedPost: {
      lexicon: 1,
      id: "app.bsky.feed.post",
      defs: {
        main: {
          type: "record",
          description: "Record containing a Bluesky post.",
          key: "tid",
          record: {
            type: "object",
            required: ["text", "createdAt"],
            properties: {
              text: {
                type: "string",
                maxLength: 3e3,
                maxGraphemes: 300,
                description: "The primary post content. May be an empty string, if there are embeds."
              },
              entities: {
                type: "array",
                description: "DEPRECATED: replaced by app.bsky.richtext.facet.",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.post#entity"
                }
              },
              facets: {
                type: "array",
                description: "Annotations of text (mentions, URLs, hashtags, etc)",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              reply: {
                type: "ref",
                ref: "lex:app.bsky.feed.post#replyRef"
              },
              embed: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images",
                  "lex:app.bsky.embed.external",
                  "lex:app.bsky.embed.record",
                  "lex:app.bsky.embed.recordWithMedia"
                ]
              },
              langs: {
                type: "array",
                description: "Indicates human language of post primary text content.",
                maxLength: 3,
                items: {
                  type: "string",
                  format: "language"
                }
              },
              labels: {
                type: "union",
                description: "Self-label values for this post. Effectively content warnings.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              tags: {
                type: "array",
                description: "Additional hashtags, in addition to any included in post text and facets.",
                maxLength: 8,
                items: {
                  type: "string",
                  maxLength: 640,
                  maxGraphemes: 64
                }
              },
              createdAt: {
                type: "string",
                format: "datetime",
                description: "Client-declared timestamp when this post was originally created."
              }
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            parent: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        entity: {
          type: "object",
          description: "Deprecated: use facets instead.",
          required: ["index", "type", "value"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.feed.post#textSlice"
            },
            type: {
              type: "string",
              description: "Expected values are 'mention' and 'link'."
            },
            value: {
              type: "string"
            }
          }
        },
        textSlice: {
          type: "object",
          description: "Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.",
          required: ["start", "end"],
          properties: {
            start: {
              type: "integer",
              minimum: 0
            },
            end: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyFeedRepost: {
      lexicon: 1,
      id: "app.bsky.feed.repost",
      defs: {
        main: {
          description: "Record representing a 'repost' of an existing Bluesky post.",
          type: "record",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedSearchPosts: {
      lexicon: 1,
      id: "app.bsky.feed.searchPosts",
      defs: {
        main: {
          type: "query",
          description: "Find posts matching search criteria, returning views of those posts.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              sort: {
                type: "string",
                knownValues: ["top", "latest"],
                default: "latest",
                description: "Specifies the ranking order of results."
              },
              since: {
                type: "string",
                description: "Filter results for posts after the indicated datetime (inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYYY-MM-DD)."
              },
              until: {
                type: "string",
                description: "Filter results for posts before the indicated datetime (not inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYY-MM-DD)."
              },
              mentions: {
                type: "string",
                format: "at-identifier",
                description: "Filter to posts which mention the given account. Handles are resolved to DID before query-time. Only matches rich-text facet mentions."
              },
              author: {
                type: "string",
                format: "at-identifier",
                description: "Filter to posts by the given account. Handles are resolved to DID before query-time."
              },
              lang: {
                type: "string",
                format: "language",
                description: "Filter to posts in the given language. Expected to be based on post language field, though server may override language detection."
              },
              domain: {
                type: "string",
                description: "Filter to posts with URLs (facet links or embeds) linking to the given domain (hostname). Server may apply hostname normalization."
              },
              url: {
                type: "string",
                format: "uri",
                description: "Filter to posts with links (facet links or embeds) pointing to this URL. Server may apply URL normalization or fuzzy matching."
              },
              tag: {
                type: "array",
                items: {
                  type: "string",
                  maxLength: 640,
                  maxGraphemes: 64
                },
                description: "Filter to posts with the given tag (hashtag), based on rich-text facet or tag field. Do not include the hash (#) prefix. Multiple tags can be specified, with 'AND' matching."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyFeedSendInteractions: {
      lexicon: 1,
      id: "app.bsky.feed.sendInteractions",
      defs: {
        main: {
          type: "procedure",
          description: "Send information about interactions with feed items back to the feed generator that served them.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["interactions"],
              properties: {
                interactions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#interaction"
                  }
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {}
            }
          }
        }
      }
    },
    AppBskyFeedThreadgate: {
      lexicon: 1,
      id: "app.bsky.feed.threadgate",
      defs: {
        main: {
          type: "record",
          key: "tid",
          description: "Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository..",
          record: {
            type: "object",
            required: ["post", "createdAt"],
            properties: {
              post: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the post record."
              },
              allow: {
                type: "array",
                maxLength: 5,
                items: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.threadgate#mentionRule",
                    "lex:app.bsky.feed.threadgate#followingRule",
                    "lex:app.bsky.feed.threadgate#listRule"
                  ]
                }
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        },
        mentionRule: {
          type: "object",
          description: "Allow replies from actors mentioned in your post.",
          properties: {}
        },
        followingRule: {
          type: "object",
          description: "Allow replies from actors you follow.",
          properties: {}
        },
        listRule: {
          type: "object",
          description: "Allow replies from actors on a list.",
          required: ["list"],
          properties: {
            list: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    AppBskyGraphBlock: {
      lexicon: 1,
      id: "app.bsky.graph.block",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "DID of the account to be blocked."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphDefs: {
      lexicon: 1,
      id: "app.bsky.graph.defs",
      defs: {
        listViewBasic: {
          type: "object",
          required: ["uri", "cid", "name", "purpose"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listView: {
          type: "object",
          required: ["uri", "cid", "creator", "name", "purpose", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string",
              format: "uri"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listItemView: {
          type: "object",
          required: ["uri", "subject"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            subject: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        },
        listPurpose: {
          type: "string",
          knownValues: [
            "app.bsky.graph.defs#modlist",
            "app.bsky.graph.defs#curatelist"
          ]
        },
        modlist: {
          type: "token",
          description: "A list of actors to apply an aggregate moderation action (mute/block) on."
        },
        curatelist: {
          type: "token",
          description: "A list of actors used for curation purposes such as list feeds or interaction gating."
        },
        listViewerState: {
          type: "object",
          properties: {
            muted: {
              type: "boolean"
            },
            blocked: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        notFoundActor: {
          type: "object",
          description: "indicates that a handle or DID could not be resolved",
          required: ["actor", "notFound"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        relationship: {
          type: "object",
          description: "lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object)",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            following: {
              type: "string",
              format: "at-uri",
              description: "if the actor follows this DID, this is the AT-URI of the follow record"
            },
            followedBy: {
              type: "string",
              format: "at-uri",
              description: "if the actor is followed by this DID, contains the AT-URI of the follow record"
            }
          }
        }
      }
    },
    AppBskyGraphFollow: {
      lexicon: 1,
      id: "app.bsky.graph.follow",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Enumerates which accounts the requesting account is currently blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blocks"],
              properties: {
                cursor: {
                  type: "string"
                },
                blocks: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollowers: {
      lexicon: 1,
      id: "app.bsky.graph.getFollowers",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which follow a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "followers"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                followers: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollows: {
      lexicon: 1,
      id: "app.bsky.graph.getFollows",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which a specified account (actor) follows.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "follows"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                follows: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetList: {
      lexicon: 1,
      id: "app.bsky.graph.getList",
      defs: {
        main: {
          type: "query",
          description: "Gets a 'view' (with additional context) of a specified list.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of the list record to hydrate."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list", "items"],
              properties: {
                cursor: {
                  type: "string"
                },
                list: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listView"
                },
                items: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listItemView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getListBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get mod lists that the requesting account (actor) is blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getListMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetLists: {
      lexicon: 1,
      id: "app.bsky.graph.getLists",
      defs: {
        main: {
          type: "query",
          description: "Enumerates the lists created by a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "The account (actor) to enumerate lists from."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["mutes"],
              properties: {
                cursor: {
                  type: "string"
                },
                mutes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetRelationships: {
      lexicon: 1,
      id: "app.bsky.graph.getRelationships",
      defs: {
        main: {
          type: "query",
          description: "Enumerates public relationships between one account, and a list of other accounts. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Primary account requesting relationships for."
              },
              others: {
                type: "array",
                description: "List of 'other' accounts to be related back to the primary.",
                maxLength: 30,
                items: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["relationships"],
              properties: {
                actor: {
                  type: "string",
                  format: "did"
                },
                relationships: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:app.bsky.graph.defs#relationship",
                      "lex:app.bsky.graph.defs#notFoundActor"
                    ]
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "ActorNotFound",
              description: "the primary actor at-identifier could not be resolved"
            }
          ]
        }
      }
    },
    AppBskyGraphGetSuggestedFollowsByActor: {
      lexicon: 1,
      id: "app.bsky.graph.getSuggestedFollowsByActor",
      defs: {
        main: {
          type: "query",
          description: "Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphList: {
      lexicon: 1,
      id: "app.bsky.graph.list",
      defs: {
        main: {
          type: "record",
          description: "Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists.",
          key: "tid",
          record: {
            type: "object",
            required: ["name", "purpose", "createdAt"],
            properties: {
              purpose: {
                type: "ref",
                description: "Defines the purpose of the list (aka, moderation-oriented or curration-oriented)",
                ref: "lex:app.bsky.graph.defs#listPurpose"
              },
              name: {
                type: "string",
                maxLength: 64,
                minLength: 1,
                description: "Display name for list; can not be empty."
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListblock: {
      lexicon: 1,
      id: "app.bsky.graph.listblock",
      defs: {
        main: {
          type: "record",
          description: "Record representing a block relationship against an entire an entire list of accounts (actors).",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the mod list record."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListitem: {
      lexicon: 1,
      id: "app.bsky.graph.listitem",
      defs: {
        main: {
          type: "record",
          description: "Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "list", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "The account which is included on the list."
              },
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record (app.bsky.graph.list)."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.muteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified account. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.muteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified list of accounts. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified list of accounts. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyLabelerDefs: {
      lexicon: 1,
      id: "app.bsky.labeler.defs",
      defs: {
        labelerView: {
          type: "object",
          required: ["uri", "cid", "creator", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            likeCount: {
              type: "integer",
              minimum: 0
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.labeler.defs#labelerViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        labelerViewDetailed: {
          type: "object",
          required: ["uri", "cid", "creator", "policies", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            policies: {
              type: "ref",
              ref: "lex:app.bsky.labeler.defs#labelerPolicies"
            },
            likeCount: {
              type: "integer",
              minimum: 0
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.labeler.defs#labelerViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        labelerViewerState: {
          type: "object",
          properties: {
            like: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        labelerPolicies: {
          type: "object",
          required: ["labelValues"],
          properties: {
            labelValues: {
              type: "array",
              description: "The label values which this labeler publishes. May include global or custom labels.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#labelValue"
              }
            },
            labelValueDefinitions: {
              type: "array",
              description: "Label values created by this labeler and scoped exclusively to it. Labels defined here will override global label definitions for this labeler.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#labelValueDefinition"
              }
            }
          }
        }
      }
    },
    AppBskyLabelerGetServices: {
      lexicon: 1,
      id: "app.bsky.labeler.getServices",
      defs: {
        main: {
          type: "query",
          description: "Get information about a list of labeler services.",
          parameters: {
            type: "params",
            required: ["dids"],
            properties: {
              dids: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                }
              },
              detailed: {
                type: "boolean",
                default: !1
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["views"],
              properties: {
                views: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:app.bsky.labeler.defs#labelerView",
                      "lex:app.bsky.labeler.defs#labelerViewDetailed"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyLabelerService: {
      lexicon: 1,
      id: "app.bsky.labeler.service",
      defs: {
        main: {
          type: "record",
          description: "A declaration of the existence of labeler service.",
          key: "literal:self",
          record: {
            type: "object",
            required: ["policies", "createdAt"],
            properties: {
              policies: {
                type: "ref",
                ref: "lex:app.bsky.labeler.defs#labelerPolicies"
              },
              labels: {
                type: "union",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyNotificationGetUnreadCount: {
      lexicon: 1,
      id: "app.bsky.notification.getUnreadCount",
      defs: {
        main: {
          type: "query",
          description: "Count the number of unread notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["count"],
              properties: {
                count: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationListNotifications: {
      lexicon: 1,
      id: "app.bsky.notification.listNotifications",
      defs: {
        main: {
          type: "query",
          description: "Enumerate notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["notifications"],
              properties: {
                cursor: {
                  type: "string"
                },
                notifications: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.notification.listNotifications#notification"
                  }
                },
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        },
        notification: {
          type: "object",
          required: [
            "uri",
            "cid",
            "author",
            "reason",
            "record",
            "isRead",
            "indexedAt"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            reason: {
              type: "string",
              description: "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', and 'quote'.",
              knownValues: [
                "like",
                "repost",
                "follow",
                "mention",
                "reply",
                "quote"
              ]
            },
            reasonSubject: {
              type: "string",
              format: "at-uri"
            },
            record: {
              type: "unknown"
            },
            isRead: {
              type: "boolean"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        }
      }
    },
    AppBskyNotificationRegisterPush: {
      lexicon: 1,
      id: "app.bsky.notification.registerPush",
      defs: {
        main: {
          type: "procedure",
          description: "Register to receive push notifications, via a specified service, for the requesting account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["serviceDid", "token", "platform", "appId"],
              properties: {
                serviceDid: {
                  type: "string",
                  format: "did"
                },
                token: {
                  type: "string"
                },
                platform: {
                  type: "string",
                  knownValues: ["ios", "android", "web"]
                },
                appId: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationUpdateSeen: {
      lexicon: 1,
      id: "app.bsky.notification.updateSeen",
      defs: {
        main: {
          type: "procedure",
          description: "Notify server that the requesting account has seen notifications. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["seenAt"],
              properties: {
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    AppBskyRichtextFacet: {
      lexicon: 1,
      id: "app.bsky.richtext.facet",
      defs: {
        main: {
          type: "object",
          description: "Annotation of a sub-string within rich text.",
          required: ["index", "features"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.richtext.facet#byteSlice"
            },
            features: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.richtext.facet#mention",
                  "lex:app.bsky.richtext.facet#link",
                  "lex:app.bsky.richtext.facet#tag"
                ]
              }
            }
          }
        },
        mention: {
          type: "object",
          description: "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        link: {
          type: "object",
          description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            }
          }
        },
        tag: {
          type: "object",
          description: "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
          required: ["tag"],
          properties: {
            tag: {
              type: "string",
              maxLength: 640,
              maxGraphemes: 64
            }
          }
        },
        byteSlice: {
          type: "object",
          description: "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
          required: ["byteStart", "byteEnd"],
          properties: {
            byteStart: {
              type: "integer",
              minimum: 0
            },
            byteEnd: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyUnspeccedDefs: {
      lexicon: 1,
      id: "app.bsky.unspecced.defs",
      defs: {
        skeletonSearchPost: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonSearchActor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetPopularFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.unspecced.getPopularFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "An unspecced view of globally popular feed generators.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              query: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetSuggestionsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.getSuggestionsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Get a skeleton of suggested actors. Intended to be called and then hydrated through app.bsky.actor.getSuggestions",
          parameters: {
            type: "params",
            properties: {
              viewer: {
                type: "string",
                format: "did",
                description: "DID of the account making the request (not included for public/unauthenticated queries). Used to boost followed accounts in ranking."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchActor"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetTaggedSuggestions: {
      lexicon: 1,
      id: "app.bsky.unspecced.getTaggedSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggestions (feeds and users) tagged with categories",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.getTaggedSuggestions#suggestion"
                  }
                }
              }
            }
          }
        },
        suggestion: {
          type: "object",
          required: ["tag", "subjectType", "subject"],
          properties: {
            tag: {
              type: "string"
            },
            subjectType: {
              type: "string",
              knownValues: ["actor", "feed"]
            },
            subject: {
              type: "string",
              format: "uri"
            }
          }
        }
      }
    },
    AppBskyUnspeccedSearchActorsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchActorsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Actors (profile) search, returns only skeleton.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended. For typeahead search, only simple term match is supported, not full syntax."
              },
              viewer: {
                type: "string",
                format: "did",
                description: "DID of the account making the request (not included for public/unauthenticated queries). Used to boost followed accounts in ranking."
              },
              typeahead: {
                type: "boolean",
                description: "If true, acts as fast/simple 'typeahead' query."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchActor"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyUnspeccedSearchPostsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchPostsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Posts search, returns only skeleton",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              sort: {
                type: "string",
                knownValues: ["top", "latest"],
                default: "latest",
                description: "Specifies the ranking order of results."
              },
              since: {
                type: "string",
                description: "Filter results for posts after the indicated datetime (inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYYY-MM-DD)."
              },
              until: {
                type: "string",
                description: "Filter results for posts before the indicated datetime (not inclusive). Expected to use 'sortAt' timestamp, which may not match 'createdAt'. Can be a datetime, or just an ISO date (YYY-MM-DD)."
              },
              mentions: {
                type: "string",
                format: "at-identifier",
                description: "Filter to posts which mention the given account. Handles are resolved to DID before query-time. Only matches rich-text facet mentions."
              },
              author: {
                type: "string",
                format: "at-identifier",
                description: "Filter to posts by the given account. Handles are resolved to DID before query-time."
              },
              lang: {
                type: "string",
                format: "language",
                description: "Filter to posts in the given language. Expected to be based on post language field, though server may override language detection."
              },
              domain: {
                type: "string",
                description: "Filter to posts with URLs (facet links or embeds) linking to the given domain (hostname). Server may apply hostname normalization."
              },
              url: {
                type: "string",
                format: "uri",
                description: "Filter to posts with links (facet links or embeds) pointing to this URL. Server may apply URL normalization or fuzzy matching."
              },
              tag: {
                type: "array",
                items: {
                  type: "string",
                  maxLength: 640,
                  maxGraphemes: 64
                },
                description: "Filter to posts with the given tag (hashtag), based on rich-text facet or tag field. Do not include the hash (#) prefix. Multiple tags can be specified, with 'AND' matching."
              },
              viewer: {
                type: "string",
                format: "did",
                description: "DID of the account making the request (not included for public/unauthenticated queries). Used for 'from:me' queries."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    ToolsOzoneCommunicationCreateTemplate: {
      lexicon: 1,
      id: "tools.ozone.communication.createTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to create a new, re-usable communication (email for now) template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "contentMarkdown", "name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                createdBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is creating the template."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.communication.defs#templateView"
            }
          }
        }
      }
    },
    ToolsOzoneCommunicationDefs: {
      lexicon: 1,
      id: "tools.ozone.communication.defs",
      defs: {
        templateView: {
          type: "object",
          required: [
            "id",
            "name",
            "contentMarkdown",
            "disabled",
            "lastUpdatedBy",
            "createdAt",
            "updatedAt"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string",
              description: "Name of the template."
            },
            subject: {
              type: "string",
              description: "Content of the template, can contain markdown and variable placeholders."
            },
            contentMarkdown: {
              type: "string",
              description: "Subject of the message, used in emails."
            },
            disabled: {
              type: "boolean"
            },
            lastUpdatedBy: {
              type: "string",
              format: "did",
              description: "DID of the user who last updated the template."
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            updatedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ToolsOzoneCommunicationDeleteTemplate: {
      lexicon: 1,
      id: "tools.ozone.communication.deleteTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a communication template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ToolsOzoneCommunicationListTemplates: {
      lexicon: 1,
      id: "tools.ozone.communication.listTemplates",
      defs: {
        main: {
          type: "query",
          description: "Get list of all communication templates.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["communicationTemplates"],
              properties: {
                communicationTemplates: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:tools.ozone.communication.defs#templateView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ToolsOzoneCommunicationUpdateTemplate: {
      lexicon: 1,
      id: "tools.ozone.communication.updateTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string",
                  description: "ID of the template to be updated."
                },
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                updatedBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is updating the template."
                },
                disabled: {
                  type: "boolean"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.communication.defs#templateView"
            }
          }
        }
      }
    },
    ToolsOzoneModerationDefs: {
      lexicon: 1,
      id: "tools.ozone.moderation.defs",
      defs: {
        modEventView: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobCids",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:tools.ozone.moderation.defs#modEventTakedown",
                "lex:tools.ozone.moderation.defs#modEventReverseTakedown",
                "lex:tools.ozone.moderation.defs#modEventComment",
                "lex:tools.ozone.moderation.defs#modEventReport",
                "lex:tools.ozone.moderation.defs#modEventLabel",
                "lex:tools.ozone.moderation.defs#modEventAcknowledge",
                "lex:tools.ozone.moderation.defs#modEventEscalate",
                "lex:tools.ozone.moderation.defs#modEventMute",
                "lex:tools.ozone.moderation.defs#modEventEmail",
                "lex:tools.ozone.moderation.defs#modEventResolveAppeal",
                "lex:tools.ozone.moderation.defs#modEventDivert"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            creatorHandle: {
              type: "string"
            },
            subjectHandle: {
              type: "string"
            }
          }
        },
        modEventViewDetail: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobs",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:tools.ozone.moderation.defs#modEventTakedown",
                "lex:tools.ozone.moderation.defs#modEventReverseTakedown",
                "lex:tools.ozone.moderation.defs#modEventComment",
                "lex:tools.ozone.moderation.defs#modEventReport",
                "lex:tools.ozone.moderation.defs#modEventLabel",
                "lex:tools.ozone.moderation.defs#modEventAcknowledge",
                "lex:tools.ozone.moderation.defs#modEventEscalate",
                "lex:tools.ozone.moderation.defs#modEventMute",
                "lex:tools.ozone.moderation.defs#modEventEmail",
                "lex:tools.ozone.moderation.defs#modEventResolveAppeal",
                "lex:tools.ozone.moderation.defs#modEventDivert"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:tools.ozone.moderation.defs#repoView",
                "lex:tools.ozone.moderation.defs#repoViewNotFound",
                "lex:tools.ozone.moderation.defs#recordView",
                "lex:tools.ozone.moderation.defs#recordViewNotFound"
              ]
            },
            subjectBlobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:tools.ozone.moderation.defs#blobView"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        subjectStatusView: {
          type: "object",
          required: ["id", "subject", "createdAt", "updatedAt", "reviewState"],
          properties: {
            id: {
              type: "integer"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            subjectRepoHandle: {
              type: "string"
            },
            updatedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the last update was made to the moderation status of the subject"
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing the first moderation status impacting event was emitted on the subject"
            },
            reviewState: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#subjectReviewState"
            },
            comment: {
              type: "string",
              description: "Sticky comment on the subject."
            },
            muteUntil: {
              type: "string",
              format: "datetime"
            },
            lastReviewedBy: {
              type: "string",
              format: "did"
            },
            lastReviewedAt: {
              type: "string",
              format: "datetime"
            },
            lastReportedAt: {
              type: "string",
              format: "datetime"
            },
            lastAppealedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the author of the subject appealed a moderation action"
            },
            takendown: {
              type: "boolean"
            },
            appealed: {
              type: "boolean",
              description: "True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators."
            },
            suspendUntil: {
              type: "string",
              format: "datetime"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        subjectReviewState: {
          type: "string",
          knownValues: [
            "lex:tools.ozone.moderation.defs#reviewOpen",
            "lex:tools.ozone.moderation.defs#reviewEscalated",
            "lex:tools.ozone.moderation.defs#reviewClosed",
            "lex:tools.ozone.moderation.defs#reviewNone"
          ]
        },
        reviewOpen: {
          type: "token",
          description: "Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator"
        },
        reviewEscalated: {
          type: "token",
          description: "Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator"
        },
        reviewClosed: {
          type: "token",
          description: "Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator"
        },
        reviewNone: {
          type: "token",
          description: "Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it"
        },
        modEventTakedown: {
          type: "object",
          description: "Take down a subject permanently or temporarily",
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the takedown should be in effect before automatically expiring."
            }
          }
        },
        modEventReverseTakedown: {
          type: "object",
          description: "Revert take down action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventResolveAppeal: {
          type: "object",
          description: "Resolve appeal on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe resolution."
            }
          }
        },
        modEventComment: {
          type: "object",
          description: "Add a comment to a subject",
          required: ["comment"],
          properties: {
            comment: {
              type: "string"
            },
            sticky: {
              type: "boolean",
              description: "Make the comment persistent on the subject"
            }
          }
        },
        modEventReport: {
          type: "object",
          description: "Report a subject",
          required: ["reportType"],
          properties: {
            comment: {
              type: "string"
            },
            reportType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            }
          }
        },
        modEventLabel: {
          type: "object",
          description: "Apply/Negate labels on a subject",
          required: ["createLabelVals", "negateLabelVals"],
          properties: {
            comment: {
              type: "string"
            },
            createLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            },
            negateLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        modEventAcknowledge: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventEscalate: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventMute: {
          type: "object",
          description: "Mute incoming reports on a subject",
          required: ["durationInHours"],
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the subject should remain muted."
            }
          }
        },
        modEventUnmute: {
          type: "object",
          description: "Unmute action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventEmail: {
          type: "object",
          description: "Keep a log of outgoing email to a user",
          required: ["subjectLine"],
          properties: {
            subjectLine: {
              type: "string",
              description: "The subject line of the email sent to the user."
            },
            content: {
              type: "string",
              description: "The content of the email sent to the user."
            },
            comment: {
              type: "string",
              description: "Additional comment about the outgoing comm."
            }
          }
        },
        modEventDivert: {
          type: "object",
          description: "Divert a record's blobs to a 3rd party service for further scanning/tagging",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventTag: {
          type: "object",
          description: "Add/Remove a tag on a subject",
          required: ["add", "remove"],
          properties: {
            add: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be added to the subject. If already exists, won't be duplicated."
            },
            remove: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated."
            },
            comment: {
              type: "string",
              description: "Additional comment about added/removed tags."
            }
          }
        },
        repoView: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#moderation"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoViewDetail: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#moderationDetail"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        repoViewNotFound: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        recordView: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobCids",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#moderation"
            },
            repo: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#repoView"
            }
          }
        },
        recordViewDetail: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobs",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:tools.ozone.moderation.defs#blobView"
              }
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#moderationDetail"
            },
            repo: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#repoView"
            }
          }
        },
        recordViewNotFound: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        moderation: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#subjectStatusView"
            }
          }
        },
        moderationDetail: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#subjectStatusView"
            }
          }
        },
        blobView: {
          type: "object",
          required: ["cid", "mimeType", "size", "createdAt"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            mimeType: {
              type: "string"
            },
            size: {
              type: "integer"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            details: {
              type: "union",
              refs: [
                "lex:tools.ozone.moderation.defs#imageDetails",
                "lex:tools.ozone.moderation.defs#videoDetails"
              ]
            },
            moderation: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#moderation"
            }
          }
        },
        imageDetails: {
          type: "object",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            }
          }
        },
        videoDetails: {
          type: "object",
          required: ["width", "height", "length"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            },
            length: {
              type: "integer"
            }
          }
        }
      }
    },
    ToolsOzoneModerationEmitEvent: {
      lexicon: 1,
      id: "tools.ozone.moderation.emitEvent",
      defs: {
        main: {
          type: "procedure",
          description: "Take a moderation action on an actor.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["event", "subject", "createdBy"],
              properties: {
                event: {
                  type: "union",
                  refs: [
                    "lex:tools.ozone.moderation.defs#modEventTakedown",
                    "lex:tools.ozone.moderation.defs#modEventAcknowledge",
                    "lex:tools.ozone.moderation.defs#modEventEscalate",
                    "lex:tools.ozone.moderation.defs#modEventComment",
                    "lex:tools.ozone.moderation.defs#modEventLabel",
                    "lex:tools.ozone.moderation.defs#modEventReport",
                    "lex:tools.ozone.moderation.defs#modEventMute",
                    "lex:tools.ozone.moderation.defs#modEventReverseTakedown",
                    "lex:tools.ozone.moderation.defs#modEventUnmute",
                    "lex:tools.ozone.moderation.defs#modEventEmail",
                    "lex:tools.ozone.moderation.defs#modEventTag"
                  ]
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                subjectBlobCids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                },
                createdBy: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#modEventView"
            }
          },
          errors: [
            {
              name: "SubjectHasAction"
            }
          ]
        }
      }
    },
    ToolsOzoneModerationGetEvent: {
      lexicon: 1,
      id: "tools.ozone.moderation.getEvent",
      defs: {
        main: {
          type: "query",
          description: "Get details about a moderation event.",
          parameters: {
            type: "params",
            required: ["id"],
            properties: {
              id: {
                type: "integer"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#modEventViewDetail"
            }
          }
        }
      }
    },
    ToolsOzoneModerationGetRecord: {
      lexicon: 1,
      id: "tools.ozone.moderation.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get details about a record.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#recordViewDetail"
            }
          },
          errors: [
            {
              name: "RecordNotFound"
            }
          ]
        }
      }
    },
    ToolsOzoneModerationGetRepo: {
      lexicon: 1,
      id: "tools.ozone.moderation.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Get details about a repository.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:tools.ozone.moderation.defs#repoViewDetail"
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ToolsOzoneModerationQueryEvents: {
      lexicon: 1,
      id: "tools.ozone.moderation.queryEvents",
      defs: {
        main: {
          type: "query",
          description: "List moderation events related to a subject.",
          parameters: {
            type: "params",
            properties: {
              types: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "The types of events (fully qualified string in the format of tools.ozone.moderation.defs#modEvent<name>) to filter by. If not specified, all events are returned."
              },
              createdBy: {
                type: "string",
                format: "did"
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"],
                description: "Sort direction for the events. Defaults to descending order of created at timestamp."
              },
              createdAfter: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created after a given timestamp"
              },
              createdBefore: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created before a given timestamp"
              },
              subject: {
                type: "string",
                format: "uri"
              },
              includeAllUserRecords: {
                type: "boolean",
                default: !1,
                description: "If true, events on all record types (posts, lists, profile etc.) owned by the did are returned"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              hasComment: {
                type: "boolean",
                description: "If true, only events with comments are returned"
              },
              comment: {
                type: "string",
                description: "If specified, only events with comments containing the keyword are returned"
              },
              addedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were added are returned"
              },
              removedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were removed are returned"
              },
              addedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were added are returned"
              },
              removedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were removed are returned"
              },
              reportTypes: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["events"],
              properties: {
                cursor: {
                  type: "string"
                },
                events: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:tools.ozone.moderation.defs#modEventView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ToolsOzoneModerationQueryStatuses: {
      lexicon: 1,
      id: "tools.ozone.moderation.queryStatuses",
      defs: {
        main: {
          type: "query",
          description: "View moderation statuses of subjects (record or repo).",
          parameters: {
            type: "params",
            properties: {
              subject: {
                type: "string",
                format: "uri"
              },
              comment: {
                type: "string",
                description: "Search subjects by keyword from comments"
              },
              reportedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported after a given timestamp"
              },
              reportedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported before a given timestamp"
              },
              reviewedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed after a given timestamp"
              },
              reviewedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed before a given timestamp"
              },
              includeMuted: {
                type: "boolean",
                description: "By default, we don't include muted subjects in the results. Set this to true to include them."
              },
              reviewState: {
                type: "string",
                description: "Specify when fetching subjects in a certain state"
              },
              ignoreSubjects: {
                type: "array",
                items: {
                  type: "string",
                  format: "uri"
                }
              },
              lastReviewedBy: {
                type: "string",
                format: "did",
                description: "Get all subject statuses that were reviewed by a specific moderator"
              },
              sortField: {
                type: "string",
                default: "lastReportedAt",
                enum: ["lastReviewedAt", "lastReportedAt"]
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"]
              },
              takendown: {
                type: "boolean",
                description: "Get subjects that were taken down"
              },
              appealed: {
                type: "boolean",
                description: "Get subjects in unresolved appealed status"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              tags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              excludeTags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subjectStatuses"],
              properties: {
                cursor: {
                  type: "string"
                },
                subjectStatuses: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:tools.ozone.moderation.defs#subjectStatusView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ToolsOzoneModerationSearchRepos: {
      lexicon: 1,
      id: "tools.ozone.moderation.searchRepos",
      defs: {
        main: {
          type: "query",
          description: "Find repositories based on a search term.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead"
              },
              q: {
                type: "string"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:tools.ozone.moderation.defs#repoView"
                  }
                }
              }
            }
          }
        }
      }
    }
  }, t.schemas = Object.values(t.schemaDict), t.lexicons = new e.Lexicons(t.schemas), t.ids = {
    ComAtprotoAdminDefs: "com.atproto.admin.defs",
    ComAtprotoAdminDeleteAccount: "com.atproto.admin.deleteAccount",
    ComAtprotoAdminDisableAccountInvites: "com.atproto.admin.disableAccountInvites",
    ComAtprotoAdminDisableInviteCodes: "com.atproto.admin.disableInviteCodes",
    ComAtprotoAdminEnableAccountInvites: "com.atproto.admin.enableAccountInvites",
    ComAtprotoAdminGetAccountInfo: "com.atproto.admin.getAccountInfo",
    ComAtprotoAdminGetAccountInfos: "com.atproto.admin.getAccountInfos",
    ComAtprotoAdminGetInviteCodes: "com.atproto.admin.getInviteCodes",
    ComAtprotoAdminGetSubjectStatus: "com.atproto.admin.getSubjectStatus",
    ComAtprotoAdminSendEmail: "com.atproto.admin.sendEmail",
    ComAtprotoAdminUpdateAccountEmail: "com.atproto.admin.updateAccountEmail",
    ComAtprotoAdminUpdateAccountHandle: "com.atproto.admin.updateAccountHandle",
    ComAtprotoAdminUpdateAccountPassword: "com.atproto.admin.updateAccountPassword",
    ComAtprotoAdminUpdateSubjectStatus: "com.atproto.admin.updateSubjectStatus",
    ComAtprotoIdentityGetRecommendedDidCredentials: "com.atproto.identity.getRecommendedDidCredentials",
    ComAtprotoIdentityRequestPlcOperationSignature: "com.atproto.identity.requestPlcOperationSignature",
    ComAtprotoIdentityResolveHandle: "com.atproto.identity.resolveHandle",
    ComAtprotoIdentitySignPlcOperation: "com.atproto.identity.signPlcOperation",
    ComAtprotoIdentitySubmitPlcOperation: "com.atproto.identity.submitPlcOperation",
    ComAtprotoIdentityUpdateHandle: "com.atproto.identity.updateHandle",
    ComAtprotoLabelDefs: "com.atproto.label.defs",
    ComAtprotoLabelQueryLabels: "com.atproto.label.queryLabels",
    ComAtprotoLabelSubscribeLabels: "com.atproto.label.subscribeLabels",
    ComAtprotoModerationCreateReport: "com.atproto.moderation.createReport",
    ComAtprotoModerationDefs: "com.atproto.moderation.defs",
    ComAtprotoRepoApplyWrites: "com.atproto.repo.applyWrites",
    ComAtprotoRepoCreateRecord: "com.atproto.repo.createRecord",
    ComAtprotoRepoDeleteRecord: "com.atproto.repo.deleteRecord",
    ComAtprotoRepoDescribeRepo: "com.atproto.repo.describeRepo",
    ComAtprotoRepoGetRecord: "com.atproto.repo.getRecord",
    ComAtprotoRepoImportRepo: "com.atproto.repo.importRepo",
    ComAtprotoRepoListMissingBlobs: "com.atproto.repo.listMissingBlobs",
    ComAtprotoRepoListRecords: "com.atproto.repo.listRecords",
    ComAtprotoRepoPutRecord: "com.atproto.repo.putRecord",
    ComAtprotoRepoStrongRef: "com.atproto.repo.strongRef",
    ComAtprotoRepoUploadBlob: "com.atproto.repo.uploadBlob",
    ComAtprotoServerActivateAccount: "com.atproto.server.activateAccount",
    ComAtprotoServerCheckAccountStatus: "com.atproto.server.checkAccountStatus",
    ComAtprotoServerConfirmEmail: "com.atproto.server.confirmEmail",
    ComAtprotoServerCreateAccount: "com.atproto.server.createAccount",
    ComAtprotoServerCreateAppPassword: "com.atproto.server.createAppPassword",
    ComAtprotoServerCreateInviteCode: "com.atproto.server.createInviteCode",
    ComAtprotoServerCreateInviteCodes: "com.atproto.server.createInviteCodes",
    ComAtprotoServerCreateSession: "com.atproto.server.createSession",
    ComAtprotoServerDeactivateAccount: "com.atproto.server.deactivateAccount",
    ComAtprotoServerDefs: "com.atproto.server.defs",
    ComAtprotoServerDeleteAccount: "com.atproto.server.deleteAccount",
    ComAtprotoServerDeleteSession: "com.atproto.server.deleteSession",
    ComAtprotoServerDescribeServer: "com.atproto.server.describeServer",
    ComAtprotoServerGetAccountInviteCodes: "com.atproto.server.getAccountInviteCodes",
    ComAtprotoServerGetServiceAuth: "com.atproto.server.getServiceAuth",
    ComAtprotoServerGetSession: "com.atproto.server.getSession",
    ComAtprotoServerListAppPasswords: "com.atproto.server.listAppPasswords",
    ComAtprotoServerRefreshSession: "com.atproto.server.refreshSession",
    ComAtprotoServerRequestAccountDelete: "com.atproto.server.requestAccountDelete",
    ComAtprotoServerRequestEmailConfirmation: "com.atproto.server.requestEmailConfirmation",
    ComAtprotoServerRequestEmailUpdate: "com.atproto.server.requestEmailUpdate",
    ComAtprotoServerRequestPasswordReset: "com.atproto.server.requestPasswordReset",
    ComAtprotoServerReserveSigningKey: "com.atproto.server.reserveSigningKey",
    ComAtprotoServerResetPassword: "com.atproto.server.resetPassword",
    ComAtprotoServerRevokeAppPassword: "com.atproto.server.revokeAppPassword",
    ComAtprotoServerUpdateEmail: "com.atproto.server.updateEmail",
    ComAtprotoSyncGetBlob: "com.atproto.sync.getBlob",
    ComAtprotoSyncGetBlocks: "com.atproto.sync.getBlocks",
    ComAtprotoSyncGetCheckout: "com.atproto.sync.getCheckout",
    ComAtprotoSyncGetHead: "com.atproto.sync.getHead",
    ComAtprotoSyncGetLatestCommit: "com.atproto.sync.getLatestCommit",
    ComAtprotoSyncGetRecord: "com.atproto.sync.getRecord",
    ComAtprotoSyncGetRepo: "com.atproto.sync.getRepo",
    ComAtprotoSyncListBlobs: "com.atproto.sync.listBlobs",
    ComAtprotoSyncListRepos: "com.atproto.sync.listRepos",
    ComAtprotoSyncNotifyOfUpdate: "com.atproto.sync.notifyOfUpdate",
    ComAtprotoSyncRequestCrawl: "com.atproto.sync.requestCrawl",
    ComAtprotoSyncSubscribeRepos: "com.atproto.sync.subscribeRepos",
    ComAtprotoTempCheckSignupQueue: "com.atproto.temp.checkSignupQueue",
    ComAtprotoTempFetchLabels: "com.atproto.temp.fetchLabels",
    ComAtprotoTempRequestPhoneVerification: "com.atproto.temp.requestPhoneVerification",
    AppBskyActorDefs: "app.bsky.actor.defs",
    AppBskyActorGetPreferences: "app.bsky.actor.getPreferences",
    AppBskyActorGetProfile: "app.bsky.actor.getProfile",
    AppBskyActorGetProfiles: "app.bsky.actor.getProfiles",
    AppBskyActorGetSuggestions: "app.bsky.actor.getSuggestions",
    AppBskyActorProfile: "app.bsky.actor.profile",
    AppBskyActorPutPreferences: "app.bsky.actor.putPreferences",
    AppBskyActorSearchActors: "app.bsky.actor.searchActors",
    AppBskyActorSearchActorsTypeahead: "app.bsky.actor.searchActorsTypeahead",
    AppBskyEmbedExternal: "app.bsky.embed.external",
    AppBskyEmbedImages: "app.bsky.embed.images",
    AppBskyEmbedRecord: "app.bsky.embed.record",
    AppBskyEmbedRecordWithMedia: "app.bsky.embed.recordWithMedia",
    AppBskyFeedDefs: "app.bsky.feed.defs",
    AppBskyFeedDescribeFeedGenerator: "app.bsky.feed.describeFeedGenerator",
    AppBskyFeedGenerator: "app.bsky.feed.generator",
    AppBskyFeedGetActorFeeds: "app.bsky.feed.getActorFeeds",
    AppBskyFeedGetActorLikes: "app.bsky.feed.getActorLikes",
    AppBskyFeedGetAuthorFeed: "app.bsky.feed.getAuthorFeed",
    AppBskyFeedGetFeed: "app.bsky.feed.getFeed",
    AppBskyFeedGetFeedGenerator: "app.bsky.feed.getFeedGenerator",
    AppBskyFeedGetFeedGenerators: "app.bsky.feed.getFeedGenerators",
    AppBskyFeedGetFeedSkeleton: "app.bsky.feed.getFeedSkeleton",
    AppBskyFeedGetLikes: "app.bsky.feed.getLikes",
    AppBskyFeedGetListFeed: "app.bsky.feed.getListFeed",
    AppBskyFeedGetPostThread: "app.bsky.feed.getPostThread",
    AppBskyFeedGetPosts: "app.bsky.feed.getPosts",
    AppBskyFeedGetRepostedBy: "app.bsky.feed.getRepostedBy",
    AppBskyFeedGetSuggestedFeeds: "app.bsky.feed.getSuggestedFeeds",
    AppBskyFeedGetTimeline: "app.bsky.feed.getTimeline",
    AppBskyFeedLike: "app.bsky.feed.like",
    AppBskyFeedPost: "app.bsky.feed.post",
    AppBskyFeedRepost: "app.bsky.feed.repost",
    AppBskyFeedSearchPosts: "app.bsky.feed.searchPosts",
    AppBskyFeedSendInteractions: "app.bsky.feed.sendInteractions",
    AppBskyFeedThreadgate: "app.bsky.feed.threadgate",
    AppBskyGraphBlock: "app.bsky.graph.block",
    AppBskyGraphDefs: "app.bsky.graph.defs",
    AppBskyGraphFollow: "app.bsky.graph.follow",
    AppBskyGraphGetBlocks: "app.bsky.graph.getBlocks",
    AppBskyGraphGetFollowers: "app.bsky.graph.getFollowers",
    AppBskyGraphGetFollows: "app.bsky.graph.getFollows",
    AppBskyGraphGetList: "app.bsky.graph.getList",
    AppBskyGraphGetListBlocks: "app.bsky.graph.getListBlocks",
    AppBskyGraphGetListMutes: "app.bsky.graph.getListMutes",
    AppBskyGraphGetLists: "app.bsky.graph.getLists",
    AppBskyGraphGetMutes: "app.bsky.graph.getMutes",
    AppBskyGraphGetRelationships: "app.bsky.graph.getRelationships",
    AppBskyGraphGetSuggestedFollowsByActor: "app.bsky.graph.getSuggestedFollowsByActor",
    AppBskyGraphList: "app.bsky.graph.list",
    AppBskyGraphListblock: "app.bsky.graph.listblock",
    AppBskyGraphListitem: "app.bsky.graph.listitem",
    AppBskyGraphMuteActor: "app.bsky.graph.muteActor",
    AppBskyGraphMuteActorList: "app.bsky.graph.muteActorList",
    AppBskyGraphUnmuteActor: "app.bsky.graph.unmuteActor",
    AppBskyGraphUnmuteActorList: "app.bsky.graph.unmuteActorList",
    AppBskyLabelerDefs: "app.bsky.labeler.defs",
    AppBskyLabelerGetServices: "app.bsky.labeler.getServices",
    AppBskyLabelerService: "app.bsky.labeler.service",
    AppBskyNotificationGetUnreadCount: "app.bsky.notification.getUnreadCount",
    AppBskyNotificationListNotifications: "app.bsky.notification.listNotifications",
    AppBskyNotificationRegisterPush: "app.bsky.notification.registerPush",
    AppBskyNotificationUpdateSeen: "app.bsky.notification.updateSeen",
    AppBskyRichtextFacet: "app.bsky.richtext.facet",
    AppBskyUnspeccedDefs: "app.bsky.unspecced.defs",
    AppBskyUnspeccedGetPopularFeedGenerators: "app.bsky.unspecced.getPopularFeedGenerators",
    AppBskyUnspeccedGetSuggestionsSkeleton: "app.bsky.unspecced.getSuggestionsSkeleton",
    AppBskyUnspeccedGetTaggedSuggestions: "app.bsky.unspecced.getTaggedSuggestions",
    AppBskyUnspeccedSearchActorsSkeleton: "app.bsky.unspecced.searchActorsSkeleton",
    AppBskyUnspeccedSearchPostsSkeleton: "app.bsky.unspecced.searchPostsSkeleton",
    ToolsOzoneCommunicationCreateTemplate: "tools.ozone.communication.createTemplate",
    ToolsOzoneCommunicationDefs: "tools.ozone.communication.defs",
    ToolsOzoneCommunicationDeleteTemplate: "tools.ozone.communication.deleteTemplate",
    ToolsOzoneCommunicationListTemplates: "tools.ozone.communication.listTemplates",
    ToolsOzoneCommunicationUpdateTemplate: "tools.ozone.communication.updateTemplate",
    ToolsOzoneModerationDefs: "tools.ozone.moderation.defs",
    ToolsOzoneModerationEmitEvent: "tools.ozone.moderation.emitEvent",
    ToolsOzoneModerationGetEvent: "tools.ozone.moderation.getEvent",
    ToolsOzoneModerationGetRecord: "tools.ozone.moderation.getRecord",
    ToolsOzoneModerationGetRepo: "tools.ozone.moderation.getRepo",
    ToolsOzoneModerationQueryEvents: "tools.ozone.moderation.queryEvents",
    ToolsOzoneModerationQueryStatuses: "tools.ozone.moderation.queryStatuses",
    ToolsOzoneModerationSearchRepos: "tools.ozone.moderation.searchRepos"
  };
})(z);
var $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
$i.toKnownErr = void 0;
const Mm = C;
function Gm(t) {
  return t instanceof Mm.XRPCError, t;
}
$i.toKnownErr = Gm;
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.toKnownErr = void 0;
const qm = C;
function Xm(t) {
  return t instanceof qm.XRPCError, t;
}
Mi.toKnownErr = Xm;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.toKnownErr = void 0;
const zm = C;
function Fm(t) {
  return t instanceof zm.XRPCError, t;
}
Gi.toKnownErr = Fm;
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.toKnownErr = void 0;
const Zm = C;
function Hm(t) {
  return t instanceof Zm.XRPCError, t;
}
qi.toKnownErr = Hm;
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.toKnownErr = void 0;
const Wm = C;
function Jm(t) {
  return t instanceof Wm.XRPCError, t;
}
Xi.toKnownErr = Jm;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.toKnownErr = void 0;
const Qm = C;
function Ym(t) {
  return t instanceof Qm.XRPCError, t;
}
zi.toKnownErr = Ym;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
Fi.toKnownErr = void 0;
const ey = C;
function ty(t) {
  return t instanceof ey.XRPCError, t;
}
Fi.toKnownErr = ty;
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.toKnownErr = void 0;
const ry = C;
function iy(t) {
  return t instanceof ry.XRPCError, t;
}
Zi.toKnownErr = iy;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.toKnownErr = void 0;
const ny = C;
function sy(t) {
  return t instanceof ny.XRPCError, t;
}
Hi.toKnownErr = sy;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.toKnownErr = void 0;
const ay = C;
function oy(t) {
  return t instanceof ay.XRPCError, t;
}
Wi.toKnownErr = oy;
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.toKnownErr = void 0;
const ly = C;
function uy(t) {
  return t instanceof ly.XRPCError, t;
}
Ji.toKnownErr = uy;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
Qi.toKnownErr = void 0;
const cy = C;
function py(t) {
  return t instanceof cy.XRPCError, t;
}
Qi.toKnownErr = py;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.toKnownErr = void 0;
const fy = C;
function dy(t) {
  return t instanceof fy.XRPCError, t;
}
Yi.toKnownErr = dy;
var en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.toKnownErr = void 0;
const by = C;
function my(t) {
  return t instanceof by.XRPCError, t;
}
en.toKnownErr = my;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.toKnownErr = void 0;
const yy = C;
function hy(t) {
  return t instanceof yy.XRPCError, t;
}
tn.toKnownErr = hy;
var rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.toKnownErr = void 0;
const Ey = C;
function xy(t) {
  return t instanceof Ey.XRPCError, t;
}
rn.toKnownErr = xy;
var nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.toKnownErr = void 0;
const gy = C;
function Ry(t) {
  return t instanceof gy.XRPCError, t;
}
nn.toKnownErr = Ry;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.toKnownErr = void 0;
const Ay = C;
function vy(t) {
  return t instanceof Ay.XRPCError, t;
}
sn.toKnownErr = vy;
var an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
an.toKnownErr = void 0;
const _y = C;
function wy(t) {
  return t instanceof _y.XRPCError, t;
}
an.toKnownErr = wy;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.toKnownErr = void 0;
const Ty = C;
function Cy(t) {
  return t instanceof Ty.XRPCError, t;
}
on.toKnownErr = Cy;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.toKnownErr = void 0;
const Ly = C;
function Sy(t) {
  return t instanceof Ly.XRPCError, t;
}
ln.toKnownErr = Sy;
var ce = {}, G = {};
Object.defineProperty(G, "__esModule", { value: !0 });
G.hasProp = G.isObj = void 0;
function ky(t) {
  return typeof t == "object" && t !== null;
}
G.isObj = ky;
function By(t, e) {
  return e in t;
}
G.hasProp = By;
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.validateDelete = ce.isDelete = ce.validateUpdate = ce.isUpdate = ce.validateCreate = ce.isCreate = ce.toKnownErr = ce.InvalidSwapError = void 0;
const Pu = C, Xr = G, bo = z;
let Ku = class extends Pu.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
ce.InvalidSwapError = Ku;
function Dy(t) {
  return t instanceof Pu.XRPCError && t.error === "InvalidSwap" ? new Ku(t) : t;
}
ce.toKnownErr = Dy;
function Py(t) {
  return (0, Xr.isObj)(t) && (0, Xr.hasProp)(t, "$type") && t.$type === "com.atproto.repo.applyWrites#create";
}
ce.isCreate = Py;
function Ky(t) {
  return bo.lexicons.validate("com.atproto.repo.applyWrites#create", t);
}
ce.validateCreate = Ky;
function Uy(t) {
  return (0, Xr.isObj)(t) && (0, Xr.hasProp)(t, "$type") && t.$type === "com.atproto.repo.applyWrites#update";
}
ce.isUpdate = Uy;
function Vy(t) {
  return bo.lexicons.validate("com.atproto.repo.applyWrites#update", t);
}
ce.validateUpdate = Vy;
function Iy(t) {
  return (0, Xr.isObj)(t) && (0, Xr.hasProp)(t, "$type") && t.$type === "com.atproto.repo.applyWrites#delete";
}
ce.isDelete = Iy;
function Oy(t) {
  return bo.lexicons.validate("com.atproto.repo.applyWrites#delete", t);
}
ce.validateDelete = Oy;
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.toKnownErr = pr.InvalidSwapError = void 0;
const Uu = C;
let Vu = class extends Uu.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
pr.InvalidSwapError = Vu;
function jy(t) {
  return t instanceof Uu.XRPCError && t.error === "InvalidSwap" ? new Vu(t) : t;
}
pr.toKnownErr = jy;
var fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.toKnownErr = fr.InvalidSwapError = void 0;
const Iu = C;
let Ou = class extends Iu.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
fr.InvalidSwapError = Ou;
function Ny(t) {
  return t instanceof Iu.XRPCError && t.error === "InvalidSwap" ? new Ou(t) : t;
}
fr.toKnownErr = Ny;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
un.toKnownErr = void 0;
const $y = C;
function My(t) {
  return t instanceof $y.XRPCError, t;
}
un.toKnownErr = My;
var cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
cn.toKnownErr = void 0;
const Gy = C;
function qy(t) {
  return t instanceof Gy.XRPCError, t;
}
cn.toKnownErr = qy;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.toKnownErr = void 0;
const Xy = C;
function zy(t) {
  return t instanceof Xy.XRPCError, t;
}
pn.toKnownErr = zy;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.validateRecordBlob = St.isRecordBlob = St.toKnownErr = void 0;
const Fy = C, Qo = G, Zy = z;
function Hy(t) {
  return t instanceof Fy.XRPCError, t;
}
St.toKnownErr = Hy;
function Wy(t) {
  return (0, Qo.isObj)(t) && (0, Qo.hasProp)(t, "$type") && t.$type === "com.atproto.repo.listMissingBlobs#recordBlob";
}
St.isRecordBlob = Wy;
function Jy(t) {
  return Zy.lexicons.validate("com.atproto.repo.listMissingBlobs#recordBlob", t);
}
St.validateRecordBlob = Jy;
var kt = {};
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.validateRecord = kt.isRecord = kt.toKnownErr = void 0;
const Qy = C, Yo = G, Yy = z;
function e0(t) {
  return t instanceof Qy.XRPCError, t;
}
kt.toKnownErr = e0;
function t0(t) {
  return (0, Yo.isObj)(t) && (0, Yo.hasProp)(t, "$type") && t.$type === "com.atproto.repo.listRecords#record";
}
kt.isRecord = t0;
function r0(t) {
  return Yy.lexicons.validate("com.atproto.repo.listRecords#record", t);
}
kt.validateRecord = r0;
var dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.toKnownErr = dr.InvalidSwapError = void 0;
const ju = C;
class Nu extends ju.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
dr.InvalidSwapError = Nu;
function i0(t) {
  return t instanceof ju.XRPCError && t.error === "InvalidSwap" ? new Nu(t) : t;
}
dr.toKnownErr = i0;
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.toKnownErr = void 0;
const n0 = C;
function s0(t) {
  return t instanceof n0.XRPCError, t;
}
fn.toKnownErr = s0;
var dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.toKnownErr = void 0;
const a0 = C;
function o0(t) {
  return t instanceof a0.XRPCError, t;
}
dn.toKnownErr = o0;
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.toKnownErr = void 0;
const l0 = C;
function u0(t) {
  return t instanceof l0.XRPCError, t;
}
bn.toKnownErr = u0;
var Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.toKnownErr = Ie.InvalidEmailError = Ie.InvalidTokenError = Ie.ExpiredTokenError = Ie.AccountNotFoundError = void 0;
const mn = C;
class $u extends mn.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Ie.AccountNotFoundError = $u;
let Mu = class extends mn.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Ie.ExpiredTokenError = Mu;
let Gu = class extends mn.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Ie.InvalidTokenError = Gu;
class qu extends mn.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Ie.InvalidEmailError = qu;
function c0(t) {
  if (t instanceof mn.XRPCError) {
    if (t.error === "AccountNotFound")
      return new $u(t);
    if (t.error === "ExpiredToken")
      return new Mu(t);
    if (t.error === "InvalidToken")
      return new Gu(t);
    if (t.error === "InvalidEmail")
      return new qu(t);
  }
  return t;
}
Ie.toKnownErr = c0;
var pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.toKnownErr = pe.IncompatibleDidDocError = pe.UnresolvableDidError = pe.UnsupportedDomainError = pe.HandleNotAvailableError = pe.InvalidInviteCodeError = pe.InvalidPasswordError = pe.InvalidHandleError = void 0;
const ir = C;
class Xu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.InvalidHandleError = Xu;
class zu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.InvalidPasswordError = zu;
class Fu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.InvalidInviteCodeError = Fu;
class Zu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.HandleNotAvailableError = Zu;
class Hu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.UnsupportedDomainError = Hu;
class Wu extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.UnresolvableDidError = Wu;
class Ju extends ir.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
pe.IncompatibleDidDocError = Ju;
function p0(t) {
  if (t instanceof ir.XRPCError) {
    if (t.error === "InvalidHandle")
      return new Xu(t);
    if (t.error === "InvalidPassword")
      return new zu(t);
    if (t.error === "InvalidInviteCode")
      return new Fu(t);
    if (t.error === "HandleNotAvailable")
      return new Zu(t);
    if (t.error === "UnsupportedDomain")
      return new Hu(t);
    if (t.error === "UnresolvableDid")
      return new Wu(t);
    if (t.error === "IncompatibleDidDoc")
      return new Ju(t);
  }
  return t;
}
pe.toKnownErr = p0;
var Ze = {};
Object.defineProperty(Ze, "__esModule", { value: !0 });
Ze.validateAppPassword = Ze.isAppPassword = Ze.toKnownErr = Ze.AccountTakedownError = void 0;
const Qu = C, el = G, f0 = z;
let Yu = class extends Qu.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Ze.AccountTakedownError = Yu;
function d0(t) {
  return t instanceof Qu.XRPCError && t.error === "AccountTakedown" ? new Yu(t) : t;
}
Ze.toKnownErr = d0;
function b0(t) {
  return (0, el.isObj)(t) && (0, el.hasProp)(t, "$type") && t.$type === "com.atproto.server.createAppPassword#appPassword";
}
Ze.isAppPassword = b0;
function m0(t) {
  return f0.lexicons.validate("com.atproto.server.createAppPassword#appPassword", t);
}
Ze.validateAppPassword = m0;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.toKnownErr = void 0;
const y0 = C;
function h0(t) {
  return t instanceof y0.XRPCError, t;
}
yn.toKnownErr = h0;
var Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.validateAccountCodes = Bt.isAccountCodes = Bt.toKnownErr = void 0;
const E0 = C, tl = G, x0 = z;
function g0(t) {
  return t instanceof E0.XRPCError, t;
}
Bt.toKnownErr = g0;
function R0(t) {
  return (0, tl.isObj)(t) && (0, tl.hasProp)(t, "$type") && t.$type === "com.atproto.server.createInviteCodes#accountCodes";
}
Bt.isAccountCodes = R0;
function A0(t) {
  return x0.lexicons.validate("com.atproto.server.createInviteCodes#accountCodes", t);
}
Bt.validateAccountCodes = A0;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.toKnownErr = Dt.AuthFactorTokenRequiredError = Dt.AccountTakedownError = void 0;
const mo = C;
let ec = class extends mo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Dt.AccountTakedownError = ec;
class tc extends mo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Dt.AuthFactorTokenRequiredError = tc;
function v0(t) {
  if (t instanceof mo.XRPCError) {
    if (t.error === "AccountTakedown")
      return new ec(t);
    if (t.error === "AuthFactorTokenRequired")
      return new tc(t);
  }
  return t;
}
Dt.toKnownErr = v0;
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.toKnownErr = void 0;
const _0 = C;
function w0(t) {
  return t instanceof _0.XRPCError, t;
}
hn.toKnownErr = w0;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.toKnownErr = Pt.InvalidTokenError = Pt.ExpiredTokenError = void 0;
const yo = C;
let rc = class extends yo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Pt.ExpiredTokenError = rc;
let ic = class extends yo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Pt.InvalidTokenError = ic;
function T0(t) {
  if (t instanceof yo.XRPCError) {
    if (t.error === "ExpiredToken")
      return new rc(t);
    if (t.error === "InvalidToken")
      return new ic(t);
  }
  return t;
}
Pt.toKnownErr = T0;
var En = {};
Object.defineProperty(En, "__esModule", { value: !0 });
En.toKnownErr = void 0;
const C0 = C;
function L0(t) {
  return t instanceof C0.XRPCError, t;
}
En.toKnownErr = L0;
var Oe = {};
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.validateContact = Oe.isContact = Oe.validateLinks = Oe.isLinks = Oe.toKnownErr = void 0;
const S0 = C, ra = G, nc = z;
function k0(t) {
  return t instanceof S0.XRPCError, t;
}
Oe.toKnownErr = k0;
function B0(t) {
  return (0, ra.isObj)(t) && (0, ra.hasProp)(t, "$type") && t.$type === "com.atproto.server.describeServer#links";
}
Oe.isLinks = B0;
function D0(t) {
  return nc.lexicons.validate("com.atproto.server.describeServer#links", t);
}
Oe.validateLinks = D0;
function P0(t) {
  return (0, ra.isObj)(t) && (0, ra.hasProp)(t, "$type") && t.$type === "com.atproto.server.describeServer#contact";
}
Oe.isContact = P0;
function K0(t) {
  return nc.lexicons.validate("com.atproto.server.describeServer#contact", t);
}
Oe.validateContact = K0;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.toKnownErr = br.DuplicateCreateError = void 0;
const sc = C;
class ac extends sc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
br.DuplicateCreateError = ac;
function U0(t) {
  return t instanceof sc.XRPCError && t.error === "DuplicateCreate" ? new ac(t) : t;
}
br.toKnownErr = U0;
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.toKnownErr = void 0;
const V0 = C;
function I0(t) {
  return t instanceof V0.XRPCError, t;
}
xn.toKnownErr = I0;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.toKnownErr = void 0;
const O0 = C;
function j0(t) {
  return t instanceof O0.XRPCError, t;
}
gn.toKnownErr = j0;
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.validateAppPassword = He.isAppPassword = He.toKnownErr = He.AccountTakedownError = void 0;
const oc = C, rl = G, N0 = z;
let lc = class extends oc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
He.AccountTakedownError = lc;
function $0(t) {
  return t instanceof oc.XRPCError && t.error === "AccountTakedown" ? new lc(t) : t;
}
He.toKnownErr = $0;
function M0(t) {
  return (0, rl.isObj)(t) && (0, rl.hasProp)(t, "$type") && t.$type === "com.atproto.server.listAppPasswords#appPassword";
}
He.isAppPassword = M0;
function G0(t) {
  return N0.lexicons.validate("com.atproto.server.listAppPasswords#appPassword", t);
}
He.validateAppPassword = G0;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.toKnownErr = mr.AccountTakedownError = void 0;
const uc = C;
class cc extends uc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
mr.AccountTakedownError = cc;
function q0(t) {
  return t instanceof uc.XRPCError && t.error === "AccountTakedown" ? new cc(t) : t;
}
mr.toKnownErr = q0;
var Rn = {};
Object.defineProperty(Rn, "__esModule", { value: !0 });
Rn.toKnownErr = void 0;
const X0 = C;
function z0(t) {
  return t instanceof X0.XRPCError, t;
}
Rn.toKnownErr = z0;
var An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.toKnownErr = void 0;
const F0 = C;
function Z0(t) {
  return t instanceof F0.XRPCError, t;
}
An.toKnownErr = Z0;
var vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.toKnownErr = void 0;
const H0 = C;
function W0(t) {
  return t instanceof H0.XRPCError, t;
}
vn.toKnownErr = W0;
var _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.toKnownErr = void 0;
const J0 = C;
function Q0(t) {
  return t instanceof J0.XRPCError, t;
}
_n.toKnownErr = Q0;
var wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
wn.toKnownErr = void 0;
const Y0 = C;
function eh(t) {
  return t instanceof Y0.XRPCError, t;
}
wn.toKnownErr = eh;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.toKnownErr = Kt.InvalidTokenError = Kt.ExpiredTokenError = void 0;
const ho = C;
let pc = class extends ho.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Kt.ExpiredTokenError = pc;
let fc = class extends ho.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Kt.InvalidTokenError = fc;
function th(t) {
  if (t instanceof ho.XRPCError) {
    if (t.error === "ExpiredToken")
      return new pc(t);
    if (t.error === "InvalidToken")
      return new fc(t);
  }
  return t;
}
Kt.toKnownErr = th;
var Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
Tn.toKnownErr = void 0;
const rh = C;
function ih(t) {
  return t instanceof rh.XRPCError, t;
}
Tn.toKnownErr = ih;
var We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
We.toKnownErr = We.TokenRequiredError = We.InvalidTokenError = We.ExpiredTokenError = void 0;
const Ea = C;
class dc extends Ea.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
We.ExpiredTokenError = dc;
class bc extends Ea.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
We.InvalidTokenError = bc;
class mc extends Ea.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
We.TokenRequiredError = mc;
function nh(t) {
  if (t instanceof Ea.XRPCError) {
    if (t.error === "ExpiredToken")
      return new dc(t);
    if (t.error === "InvalidToken")
      return new bc(t);
    if (t.error === "TokenRequired")
      return new mc(t);
  }
  return t;
}
We.toKnownErr = nh;
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.toKnownErr = void 0;
const sh = C;
function ah(t) {
  return t instanceof sh.XRPCError, t;
}
Cn.toKnownErr = ah;
var Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.toKnownErr = void 0;
const oh = C;
function lh(t) {
  return t instanceof oh.XRPCError, t;
}
Ln.toKnownErr = lh;
var Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.toKnownErr = void 0;
const uh = C;
function ch(t) {
  return t instanceof uh.XRPCError, t;
}
Sn.toKnownErr = ch;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
yr.toKnownErr = yr.HeadNotFoundError = void 0;
const yc = C;
class hc extends yc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
yr.HeadNotFoundError = hc;
function ph(t) {
  return t instanceof yc.XRPCError && t.error === "HeadNotFound" ? new hc(t) : t;
}
yr.toKnownErr = ph;
var hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.toKnownErr = hr.RepoNotFoundError = void 0;
const Ec = C;
let xc = class extends Ec.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
hr.RepoNotFoundError = xc;
function fh(t) {
  return t instanceof Ec.XRPCError && t.error === "RepoNotFound" ? new xc(t) : t;
}
hr.toKnownErr = fh;
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.toKnownErr = void 0;
const dh = C;
function bh(t) {
  return t instanceof dh.XRPCError, t;
}
kn.toKnownErr = bh;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.toKnownErr = void 0;
const mh = C;
function yh(t) {
  return t instanceof mh.XRPCError, t;
}
Bn.toKnownErr = yh;
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: !0 });
Dn.toKnownErr = void 0;
const hh = C;
function Eh(t) {
  return t instanceof hh.XRPCError, t;
}
Dn.toKnownErr = Eh;
var Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.validateRepo = Ut.isRepo = Ut.toKnownErr = void 0;
const xh = C, il = G, gh = z;
function Rh(t) {
  return t instanceof xh.XRPCError, t;
}
Ut.toKnownErr = Rh;
function Ah(t) {
  return (0, il.isObj)(t) && (0, il.hasProp)(t, "$type") && t.$type === "com.atproto.sync.listRepos#repo";
}
Ut.isRepo = Ah;
function vh(t) {
  return gh.lexicons.validate("com.atproto.sync.listRepos#repo", t);
}
Ut.validateRepo = vh;
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
Pn.toKnownErr = void 0;
const _h = C;
function wh(t) {
  return t instanceof _h.XRPCError, t;
}
Pn.toKnownErr = wh;
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.toKnownErr = void 0;
const Th = C;
function Ch(t) {
  return t instanceof Th.XRPCError, t;
}
Kn.toKnownErr = Ch;
var Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.toKnownErr = void 0;
const Lh = C;
function Sh(t) {
  return t instanceof Lh.XRPCError, t;
}
Un.toKnownErr = Sh;
var Vn = {};
Object.defineProperty(Vn, "__esModule", { value: !0 });
Vn.toKnownErr = void 0;
const kh = C;
function Bh(t) {
  return t instanceof kh.XRPCError, t;
}
Vn.toKnownErr = Bh;
var In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.toKnownErr = void 0;
const Dh = C;
function Ph(t) {
  return t instanceof Dh.XRPCError, t;
}
In.toKnownErr = Ph;
var On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
On.toKnownErr = void 0;
const Kh = C;
function Uh(t) {
  return t instanceof Kh.XRPCError, t;
}
On.toKnownErr = Uh;
var jn = {};
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.toKnownErr = void 0;
const Vh = C;
function Ih(t) {
  return t instanceof Vh.XRPCError, t;
}
jn.toKnownErr = Ih;
var Nn = {};
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.toKnownErr = void 0;
const Oh = C;
function jh(t) {
  return t instanceof Oh.XRPCError, t;
}
Nn.toKnownErr = jh;
var $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.toKnownErr = void 0;
const Nh = C;
function $h(t) {
  return t instanceof Nh.XRPCError, t;
}
$n.toKnownErr = $h;
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.toKnownErr = void 0;
const Mh = C;
function Gh(t) {
  return t instanceof Mh.XRPCError, t;
}
Mn.toKnownErr = Gh;
var Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.toKnownErr = void 0;
const qh = C;
function Xh(t) {
  return t instanceof qh.XRPCError, t;
}
Gn.toKnownErr = Xh;
var qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.toKnownErr = void 0;
const zh = C;
function Fh(t) {
  return t instanceof zh.XRPCError, t;
}
qn.toKnownErr = Fh;
var je = {};
Object.defineProperty(je, "__esModule", { value: !0 });
je.validateLinks = je.isLinks = je.validateFeed = je.isFeed = je.toKnownErr = void 0;
const Zh = C, ia = G, gc = z;
function Hh(t) {
  return t instanceof Zh.XRPCError, t;
}
je.toKnownErr = Hh;
function Wh(t) {
  return (0, ia.isObj)(t) && (0, ia.hasProp)(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#feed";
}
je.isFeed = Wh;
function Jh(t) {
  return gc.lexicons.validate("app.bsky.feed.describeFeedGenerator#feed", t);
}
je.validateFeed = Jh;
function Qh(t) {
  return (0, ia.isObj)(t) && (0, ia.hasProp)(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#links";
}
je.isLinks = Qh;
function Yh(t) {
  return gc.lexicons.validate("app.bsky.feed.describeFeedGenerator#links", t);
}
je.validateLinks = Yh;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.toKnownErr = void 0;
const eE = C;
function tE(t) {
  return t instanceof eE.XRPCError, t;
}
Xn.toKnownErr = tE;
var Vt = {};
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.toKnownErr = Vt.BlockedByActorError = Vt.BlockedActorError = void 0;
const Eo = C;
let Rc = class extends Eo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Vt.BlockedActorError = Rc;
let Ac = class extends Eo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Vt.BlockedByActorError = Ac;
function rE(t) {
  if (t instanceof Eo.XRPCError) {
    if (t.error === "BlockedActor")
      return new Rc(t);
    if (t.error === "BlockedByActor")
      return new Ac(t);
  }
  return t;
}
Vt.toKnownErr = rE;
var It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.toKnownErr = It.BlockedByActorError = It.BlockedActorError = void 0;
const xo = C;
class vc extends xo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
It.BlockedActorError = vc;
class _c extends xo.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
It.BlockedByActorError = _c;
function iE(t) {
  if (t instanceof xo.XRPCError) {
    if (t.error === "BlockedActor")
      return new vc(t);
    if (t.error === "BlockedByActor")
      return new _c(t);
  }
  return t;
}
It.toKnownErr = iE;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.toKnownErr = Er.UnknownFeedError = void 0;
const wc = C;
let Tc = class extends wc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Er.UnknownFeedError = Tc;
function nE(t) {
  return t instanceof wc.XRPCError && t.error === "UnknownFeed" ? new Tc(t) : t;
}
Er.toKnownErr = nE;
var zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.toKnownErr = void 0;
const sE = C;
function aE(t) {
  return t instanceof sE.XRPCError, t;
}
zn.toKnownErr = aE;
var Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.toKnownErr = void 0;
const oE = C;
function lE(t) {
  return t instanceof oE.XRPCError, t;
}
Fn.toKnownErr = lE;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.toKnownErr = xr.UnknownFeedError = void 0;
const Cc = C;
class Lc extends Cc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
xr.UnknownFeedError = Lc;
function uE(t) {
  return t instanceof Cc.XRPCError && t.error === "UnknownFeed" ? new Lc(t) : t;
}
xr.toKnownErr = uE;
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.validateLike = Ot.isLike = Ot.toKnownErr = void 0;
const cE = C, nl = G, pE = z;
function fE(t) {
  return t instanceof cE.XRPCError, t;
}
Ot.toKnownErr = fE;
function dE(t) {
  return (0, nl.isObj)(t) && (0, nl.hasProp)(t, "$type") && t.$type === "app.bsky.feed.getLikes#like";
}
Ot.isLike = dE;
function bE(t) {
  return pE.lexicons.validate("app.bsky.feed.getLikes#like", t);
}
Ot.validateLike = bE;
var gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.toKnownErr = gr.UnknownListError = void 0;
const Sc = C;
class kc extends Sc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
gr.UnknownListError = kc;
function mE(t) {
  return t instanceof Sc.XRPCError && t.error === "UnknownList" ? new kc(t) : t;
}
gr.toKnownErr = mE;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.toKnownErr = Rr.NotFoundError = void 0;
const Bc = C;
class Dc extends Bc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Rr.NotFoundError = Dc;
function yE(t) {
  return t instanceof Bc.XRPCError && t.error === "NotFound" ? new Dc(t) : t;
}
Rr.toKnownErr = yE;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.toKnownErr = void 0;
const hE = C;
function EE(t) {
  return t instanceof hE.XRPCError, t;
}
Zn.toKnownErr = EE;
var Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.toKnownErr = void 0;
const xE = C;
function gE(t) {
  return t instanceof xE.XRPCError, t;
}
Hn.toKnownErr = gE;
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.toKnownErr = void 0;
const RE = C;
function AE(t) {
  return t instanceof RE.XRPCError, t;
}
Wn.toKnownErr = AE;
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.toKnownErr = void 0;
const vE = C;
function _E(t) {
  return t instanceof vE.XRPCError, t;
}
Jn.toKnownErr = _E;
var Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.toKnownErr = Ar.BadQueryStringError = void 0;
const Pc = C;
let Kc = class extends Pc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
Ar.BadQueryStringError = Kc;
function wE(t) {
  return t instanceof Pc.XRPCError && t.error === "BadQueryString" ? new Kc(t) : t;
}
Ar.toKnownErr = wE;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.toKnownErr = void 0;
const TE = C;
function CE(t) {
  return t instanceof TE.XRPCError, t;
}
Qn.toKnownErr = CE;
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.toKnownErr = void 0;
const LE = C;
function SE(t) {
  return t instanceof LE.XRPCError, t;
}
Yn.toKnownErr = SE;
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.toKnownErr = void 0;
const kE = C;
function BE(t) {
  return t instanceof kE.XRPCError, t;
}
es.toKnownErr = BE;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.toKnownErr = void 0;
const DE = C;
function PE(t) {
  return t instanceof DE.XRPCError, t;
}
ts.toKnownErr = PE;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.toKnownErr = void 0;
const KE = C;
function UE(t) {
  return t instanceof KE.XRPCError, t;
}
rs.toKnownErr = UE;
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.toKnownErr = void 0;
const VE = C;
function IE(t) {
  return t instanceof VE.XRPCError, t;
}
is.toKnownErr = IE;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.toKnownErr = void 0;
const OE = C;
function jE(t) {
  return t instanceof OE.XRPCError, t;
}
ns.toKnownErr = jE;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.toKnownErr = void 0;
const NE = C;
function $E(t) {
  return t instanceof NE.XRPCError, t;
}
ss.toKnownErr = $E;
var as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.toKnownErr = void 0;
const ME = C;
function GE(t) {
  return t instanceof ME.XRPCError, t;
}
as.toKnownErr = GE;
var vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.toKnownErr = vr.ActorNotFoundError = void 0;
const Uc = C;
class Vc extends Uc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
vr.ActorNotFoundError = Vc;
function qE(t) {
  return t instanceof Uc.XRPCError && t.error === "ActorNotFound" ? new Vc(t) : t;
}
vr.toKnownErr = qE;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.toKnownErr = void 0;
const XE = C;
function zE(t) {
  return t instanceof XE.XRPCError, t;
}
os.toKnownErr = zE;
var ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.toKnownErr = void 0;
const FE = C;
function ZE(t) {
  return t instanceof FE.XRPCError, t;
}
ls.toKnownErr = ZE;
var us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
us.toKnownErr = void 0;
const HE = C;
function WE(t) {
  return t instanceof HE.XRPCError, t;
}
us.toKnownErr = WE;
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.toKnownErr = void 0;
const JE = C;
function QE(t) {
  return t instanceof JE.XRPCError, t;
}
cs.toKnownErr = QE;
var ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.toKnownErr = void 0;
const YE = C;
function ex(t) {
  return t instanceof YE.XRPCError, t;
}
ps.toKnownErr = ex;
var fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.toKnownErr = void 0;
const tx = C;
function rx(t) {
  return t instanceof tx.XRPCError, t;
}
fs.toKnownErr = rx;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.toKnownErr = void 0;
const ix = C;
function nx(t) {
  return t instanceof ix.XRPCError, t;
}
ds.toKnownErr = nx;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.validateNotification = jt.isNotification = jt.toKnownErr = void 0;
const sx = C, sl = G, ax = z;
function ox(t) {
  return t instanceof sx.XRPCError, t;
}
jt.toKnownErr = ox;
function lx(t) {
  return (0, sl.isObj)(t) && (0, sl.hasProp)(t, "$type") && t.$type === "app.bsky.notification.listNotifications#notification";
}
jt.isNotification = lx;
function ux(t) {
  return ax.lexicons.validate("app.bsky.notification.listNotifications#notification", t);
}
jt.validateNotification = ux;
var bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
bs.toKnownErr = void 0;
const cx = C;
function px(t) {
  return t instanceof cx.XRPCError, t;
}
bs.toKnownErr = px;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
ms.toKnownErr = void 0;
const fx = C;
function dx(t) {
  return t instanceof fx.XRPCError, t;
}
ms.toKnownErr = dx;
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
ys.toKnownErr = void 0;
const bx = C;
function mx(t) {
  return t instanceof bx.XRPCError, t;
}
ys.toKnownErr = mx;
var hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
hs.toKnownErr = void 0;
const yx = C;
function hx(t) {
  return t instanceof yx.XRPCError, t;
}
hs.toKnownErr = hx;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.validateSuggestion = Nt.isSuggestion = Nt.toKnownErr = void 0;
const Ex = C, al = G, xx = z;
function gx(t) {
  return t instanceof Ex.XRPCError, t;
}
Nt.toKnownErr = gx;
function Rx(t) {
  return (0, al.isObj)(t) && (0, al.hasProp)(t, "$type") && t.$type === "app.bsky.unspecced.getTaggedSuggestions#suggestion";
}
Nt.isSuggestion = Rx;
function Ax(t) {
  return xx.lexicons.validate("app.bsky.unspecced.getTaggedSuggestions#suggestion", t);
}
Nt.validateSuggestion = Ax;
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.toKnownErr = _r.BadQueryStringError = void 0;
const Ic = C;
let Oc = class extends Ic.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
};
_r.BadQueryStringError = Oc;
function vx(t) {
  return t instanceof Ic.XRPCError && t.error === "BadQueryString" ? new Oc(t) : t;
}
_r.toKnownErr = vx;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.toKnownErr = wr.BadQueryStringError = void 0;
const jc = C;
class Nc extends jc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
wr.BadQueryStringError = Nc;
function _x(t) {
  return t instanceof jc.XRPCError && t.error === "BadQueryString" ? new Nc(t) : t;
}
wr.toKnownErr = _x;
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.toKnownErr = void 0;
const wx = C;
function Tx(t) {
  return t instanceof wx.XRPCError, t;
}
Es.toKnownErr = Tx;
var xs = {};
Object.defineProperty(xs, "__esModule", { value: !0 });
xs.toKnownErr = void 0;
const Cx = C;
function Lx(t) {
  return t instanceof Cx.XRPCError, t;
}
xs.toKnownErr = Lx;
var gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
gs.toKnownErr = void 0;
const Sx = C;
function kx(t) {
  return t instanceof Sx.XRPCError, t;
}
gs.toKnownErr = kx;
var Rs = {};
Object.defineProperty(Rs, "__esModule", { value: !0 });
Rs.toKnownErr = void 0;
const Bx = C;
function Dx(t) {
  return t instanceof Bx.XRPCError, t;
}
Rs.toKnownErr = Dx;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.toKnownErr = Tr.SubjectHasActionError = void 0;
const $c = C;
class Mc extends $c.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Tr.SubjectHasActionError = Mc;
function Px(t) {
  return t instanceof $c.XRPCError && t.error === "SubjectHasAction" ? new Mc(t) : t;
}
Tr.toKnownErr = Px;
var As = {};
Object.defineProperty(As, "__esModule", { value: !0 });
As.toKnownErr = void 0;
const Kx = C;
function Ux(t) {
  return t instanceof Kx.XRPCError, t;
}
As.toKnownErr = Ux;
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.toKnownErr = Cr.RecordNotFoundError = void 0;
const Gc = C;
class qc extends Gc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Cr.RecordNotFoundError = qc;
function Vx(t) {
  return t instanceof Gc.XRPCError && t.error === "RecordNotFound" ? new qc(t) : t;
}
Cr.toKnownErr = Vx;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.toKnownErr = Lr.RepoNotFoundError = void 0;
const Xc = C;
class zc extends Xc.XRPCError {
  constructor(e) {
    super(e.status, e.error, e.message, e.headers);
  }
}
Lr.RepoNotFoundError = zc;
function Ix(t) {
  return t instanceof Xc.XRPCError && t.error === "RepoNotFound" ? new zc(t) : t;
}
Lr.toKnownErr = Ix;
var vs = {};
Object.defineProperty(vs, "__esModule", { value: !0 });
vs.toKnownErr = void 0;
const Ox = C;
function jx(t) {
  return t instanceof Ox.XRPCError, t;
}
vs.toKnownErr = jx;
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
_s.toKnownErr = void 0;
const Nx = C;
function $x(t) {
  return t instanceof Nx.XRPCError, t;
}
_s.toKnownErr = $x;
var ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
ws.toKnownErr = void 0;
const Mx = C;
function Gx(t) {
  return t instanceof Mx.XRPCError, t;
}
ws.toKnownErr = Gx;
var de = {};
Object.defineProperty(de, "__esModule", { value: !0 });
de.validateRepoBlobRef = de.isRepoBlobRef = de.validateRepoRef = de.isRepoRef = de.validateAccountView = de.isAccountView = de.validateStatusAttr = de.isStatusAttr = void 0;
const Zt = G, xa = z;
function qx(t) {
  return (0, Zt.isObj)(t) && (0, Zt.hasProp)(t, "$type") && t.$type === "com.atproto.admin.defs#statusAttr";
}
de.isStatusAttr = qx;
function Xx(t) {
  return xa.lexicons.validate("com.atproto.admin.defs#statusAttr", t);
}
de.validateStatusAttr = Xx;
function zx(t) {
  return (0, Zt.isObj)(t) && (0, Zt.hasProp)(t, "$type") && t.$type === "com.atproto.admin.defs#accountView";
}
de.isAccountView = zx;
function Fx(t) {
  return xa.lexicons.validate("com.atproto.admin.defs#accountView", t);
}
de.validateAccountView = Fx;
function Zx(t) {
  return (0, Zt.isObj)(t) && (0, Zt.hasProp)(t, "$type") && t.$type === "com.atproto.admin.defs#repoRef";
}
de.isRepoRef = Zx;
function Hx(t) {
  return xa.lexicons.validate("com.atproto.admin.defs#repoRef", t);
}
de.validateRepoRef = Hx;
function Wx(t) {
  return (0, Zt.isObj)(t) && (0, Zt.hasProp)(t, "$type") && t.$type === "com.atproto.admin.defs#repoBlobRef";
}
de.isRepoBlobRef = Wx;
function Jx(t) {
  return xa.lexicons.validate("com.atproto.admin.defs#repoBlobRef", t);
}
de.validateRepoBlobRef = Jx;
var ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.validateLabelValueDefinitionStrings = ne.isLabelValueDefinitionStrings = ne.validateLabelValueDefinition = ne.isLabelValueDefinition = ne.validateSelfLabel = ne.isSelfLabel = ne.validateSelfLabels = ne.isSelfLabels = ne.validateLabel = ne.isLabel = void 0;
const pt = G, Ts = z;
function Qx(t) {
  return (0, pt.isObj)(t) && (0, pt.hasProp)(t, "$type") && t.$type === "com.atproto.label.defs#label";
}
ne.isLabel = Qx;
function Yx(t) {
  return Ts.lexicons.validate("com.atproto.label.defs#label", t);
}
ne.validateLabel = Yx;
function eg(t) {
  return (0, pt.isObj)(t) && (0, pt.hasProp)(t, "$type") && t.$type === "com.atproto.label.defs#selfLabels";
}
ne.isSelfLabels = eg;
function tg(t) {
  return Ts.lexicons.validate("com.atproto.label.defs#selfLabels", t);
}
ne.validateSelfLabels = tg;
function rg(t) {
  return (0, pt.isObj)(t) && (0, pt.hasProp)(t, "$type") && t.$type === "com.atproto.label.defs#selfLabel";
}
ne.isSelfLabel = rg;
function ig(t) {
  return Ts.lexicons.validate("com.atproto.label.defs#selfLabel", t);
}
ne.validateSelfLabel = ig;
function ng(t) {
  return (0, pt.isObj)(t) && (0, pt.hasProp)(t, "$type") && t.$type === "com.atproto.label.defs#labelValueDefinition";
}
ne.isLabelValueDefinition = ng;
function sg(t) {
  return Ts.lexicons.validate("com.atproto.label.defs#labelValueDefinition", t);
}
ne.validateLabelValueDefinition = sg;
function ag(t) {
  return (0, pt.isObj)(t) && (0, pt.hasProp)(t, "$type") && t.$type === "com.atproto.label.defs#labelValueDefinitionStrings";
}
ne.isLabelValueDefinitionStrings = ag;
function og(t) {
  return Ts.lexicons.validate("com.atproto.label.defs#labelValueDefinitionStrings", t);
}
ne.validateLabelValueDefinitionStrings = og;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.validateInfo = nt.isInfo = nt.validateLabels = nt.isLabels = void 0;
const na = G, Fc = z;
function lg(t) {
  return (0, na.isObj)(t) && (0, na.hasProp)(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#labels";
}
nt.isLabels = lg;
function ug(t) {
  return Fc.lexicons.validate("com.atproto.label.subscribeLabels#labels", t);
}
nt.validateLabels = ug;
function cg(t) {
  return (0, na.isObj)(t) && (0, na.hasProp)(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#info";
}
nt.isInfo = cg;
function pg(t) {
  return Fc.lexicons.validate("com.atproto.label.subscribeLabels#info", t);
}
nt.validateInfo = pg;
var we = {};
Object.defineProperty(we, "__esModule", { value: !0 });
we.REASONAPPEAL = we.REASONOTHER = we.REASONRUDE = we.REASONSEXUAL = we.REASONMISLEADING = we.REASONVIOLATION = we.REASONSPAM = void 0;
we.REASONSPAM = "com.atproto.moderation.defs#reasonSpam";
we.REASONVIOLATION = "com.atproto.moderation.defs#reasonViolation";
we.REASONMISLEADING = "com.atproto.moderation.defs#reasonMisleading";
we.REASONSEXUAL = "com.atproto.moderation.defs#reasonSexual";
we.REASONRUDE = "com.atproto.moderation.defs#reasonRude";
we.REASONOTHER = "com.atproto.moderation.defs#reasonOther";
we.REASONAPPEAL = "com.atproto.moderation.defs#reasonAppeal";
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.validateMain = zr.isMain = void 0;
const ol = G, fg = z;
function dg(t) {
  return (0, ol.isObj)(t) && (0, ol.hasProp)(t, "$type") && (t.$type === "com.atproto.repo.strongRef#main" || t.$type === "com.atproto.repo.strongRef");
}
zr.isMain = dg;
function bg(t) {
  return fg.lexicons.validate("com.atproto.repo.strongRef#main", t);
}
zr.validateMain = bg;
var st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.validateInviteCodeUse = st.isInviteCodeUse = st.validateInviteCode = st.isInviteCode = void 0;
const sa = G, Zc = z;
function mg(t) {
  return (0, sa.isObj)(t) && (0, sa.hasProp)(t, "$type") && t.$type === "com.atproto.server.defs#inviteCode";
}
st.isInviteCode = mg;
function yg(t) {
  return Zc.lexicons.validate("com.atproto.server.defs#inviteCode", t);
}
st.validateInviteCode = yg;
function hg(t) {
  return (0, sa.isObj)(t) && (0, sa.hasProp)(t, "$type") && t.$type === "com.atproto.server.defs#inviteCodeUse";
}
st.isInviteCodeUse = hg;
function Eg(t) {
  return Zc.lexicons.validate("com.atproto.server.defs#inviteCodeUse", t);
}
st.validateInviteCodeUse = Eg;
var W = {};
Object.defineProperty(W, "__esModule", { value: !0 });
W.validateRepoOp = W.isRepoOp = W.validateInfo = W.isInfo = W.validateTombstone = W.isTombstone = W.validateMigrate = W.isMigrate = W.validateHandle = W.isHandle = W.validateIdentity = W.isIdentity = W.validateCommit = W.isCommit = void 0;
const De = G, kr = z;
function xg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#commit";
}
W.isCommit = xg;
function gg(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#commit", t);
}
W.validateCommit = gg;
function Rg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#identity";
}
W.isIdentity = Rg;
function Ag(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#identity", t);
}
W.validateIdentity = Ag;
function vg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#handle";
}
W.isHandle = vg;
function _g(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#handle", t);
}
W.validateHandle = _g;
function wg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#migrate";
}
W.isMigrate = wg;
function Tg(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#migrate", t);
}
W.validateMigrate = Tg;
function Cg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#tombstone";
}
W.isTombstone = Cg;
function Lg(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#tombstone", t);
}
W.validateTombstone = Lg;
function Sg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#info";
}
W.isInfo = Sg;
function kg(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#info", t);
}
W.validateInfo = kg;
function Bg(t) {
  return (0, De.isObj)(t) && (0, De.hasProp)(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#repoOp";
}
W.isRepoOp = Bg;
function Dg(t) {
  return kr.lexicons.validate("com.atproto.sync.subscribeRepos#repoOp", t);
}
W.validateRepoOp = Dg;
var I = {};
Object.defineProperty(I, "__esModule", { value: !0 });
I.validateLabelerPrefItem = I.isLabelerPrefItem = I.validateLabelersPref = I.isLabelersPref = I.validateHiddenPostsPref = I.isHiddenPostsPref = I.validateMutedWordsPref = I.isMutedWordsPref = I.validateMutedWord = I.isMutedWord = I.validateInterestsPref = I.isInterestsPref = I.validateThreadViewPref = I.isThreadViewPref = I.validateFeedViewPref = I.isFeedViewPref = I.validatePersonalDetailsPref = I.isPersonalDetailsPref = I.validateSavedFeedsPref = I.isSavedFeedsPref = I.validateContentLabelPref = I.isContentLabelPref = I.validateAdultContentPref = I.isAdultContentPref = I.validateViewerState = I.isViewerState = I.validateProfileAssociated = I.isProfileAssociated = I.validateProfileViewDetailed = I.isProfileViewDetailed = I.validateProfileView = I.isProfileView = I.validateProfileViewBasic = I.isProfileViewBasic = void 0;
const H = G, Re = z;
function Pg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewBasic";
}
I.isProfileViewBasic = Pg;
function Kg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#profileViewBasic", t);
}
I.validateProfileViewBasic = Kg;
function Ug(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#profileView";
}
I.isProfileView = Ug;
function Vg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#profileView", t);
}
I.validateProfileView = Vg;
function Ig(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewDetailed";
}
I.isProfileViewDetailed = Ig;
function Og(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#profileViewDetailed", t);
}
I.validateProfileViewDetailed = Og;
function jg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#profileAssociated";
}
I.isProfileAssociated = jg;
function Ng(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#profileAssociated", t);
}
I.validateProfileAssociated = Ng;
function $g(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#viewerState";
}
I.isViewerState = $g;
function Mg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#viewerState", t);
}
I.validateViewerState = Mg;
function Gg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#adultContentPref";
}
I.isAdultContentPref = Gg;
function qg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#adultContentPref", t);
}
I.validateAdultContentPref = qg;
function Xg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#contentLabelPref";
}
I.isContentLabelPref = Xg;
function zg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#contentLabelPref", t);
}
I.validateContentLabelPref = zg;
function Fg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#savedFeedsPref";
}
I.isSavedFeedsPref = Fg;
function Zg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#savedFeedsPref", t);
}
I.validateSavedFeedsPref = Zg;
function Hg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#personalDetailsPref";
}
I.isPersonalDetailsPref = Hg;
function Wg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#personalDetailsPref", t);
}
I.validatePersonalDetailsPref = Wg;
function Jg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#feedViewPref";
}
I.isFeedViewPref = Jg;
function Qg(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#feedViewPref", t);
}
I.validateFeedViewPref = Qg;
function Yg(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#threadViewPref";
}
I.isThreadViewPref = Yg;
function eR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#threadViewPref", t);
}
I.validateThreadViewPref = eR;
function tR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#interestsPref";
}
I.isInterestsPref = tR;
function rR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#interestsPref", t);
}
I.validateInterestsPref = rR;
function iR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWord";
}
I.isMutedWord = iR;
function nR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#mutedWord", t);
}
I.validateMutedWord = nR;
function sR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWordsPref";
}
I.isMutedWordsPref = sR;
function aR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#mutedWordsPref", t);
}
I.validateMutedWordsPref = aR;
function oR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#hiddenPostsPref";
}
I.isHiddenPostsPref = oR;
function lR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#hiddenPostsPref", t);
}
I.validateHiddenPostsPref = lR;
function uR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#labelersPref";
}
I.isLabelersPref = uR;
function cR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#labelersPref", t);
}
I.validateLabelersPref = cR;
function pR(t) {
  return (0, H.isObj)(t) && (0, H.hasProp)(t, "$type") && t.$type === "app.bsky.actor.defs#labelerPrefItem";
}
I.isLabelerPrefItem = pR;
function fR(t) {
  return Re.lexicons.validate("app.bsky.actor.defs#labelerPrefItem", t);
}
I.validateLabelerPrefItem = fR;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.validateRecord = Fr.isRecord = void 0;
const ll = G, dR = z;
function bR(t) {
  return (0, ll.isObj)(t) && (0, ll.hasProp)(t, "$type") && (t.$type === "app.bsky.actor.profile#main" || t.$type === "app.bsky.actor.profile");
}
Fr.isRecord = bR;
function mR(t) {
  return dR.lexicons.validate("app.bsky.actor.profile#main", t);
}
Fr.validateRecord = mR;
var be = {};
Object.defineProperty(be, "__esModule", { value: !0 });
be.validateViewExternal = be.isViewExternal = be.validateView = be.isView = be.validateExternal = be.isExternal = be.validateMain = be.isMain = void 0;
const Ht = G, ga = z;
function yR(t) {
  return (0, Ht.isObj)(t) && (0, Ht.hasProp)(t, "$type") && (t.$type === "app.bsky.embed.external#main" || t.$type === "app.bsky.embed.external");
}
be.isMain = yR;
function hR(t) {
  return ga.lexicons.validate("app.bsky.embed.external#main", t);
}
be.validateMain = hR;
function ER(t) {
  return (0, Ht.isObj)(t) && (0, Ht.hasProp)(t, "$type") && t.$type === "app.bsky.embed.external#external";
}
be.isExternal = ER;
function xR(t) {
  return ga.lexicons.validate("app.bsky.embed.external#external", t);
}
be.validateExternal = xR;
function gR(t) {
  return (0, Ht.isObj)(t) && (0, Ht.hasProp)(t, "$type") && t.$type === "app.bsky.embed.external#view";
}
be.isView = gR;
function RR(t) {
  return ga.lexicons.validate("app.bsky.embed.external#view", t);
}
be.validateView = RR;
function AR(t) {
  return (0, Ht.isObj)(t) && (0, Ht.hasProp)(t, "$type") && t.$type === "app.bsky.embed.external#viewExternal";
}
be.isViewExternal = AR;
function vR(t) {
  return ga.lexicons.validate("app.bsky.embed.external#viewExternal", t);
}
be.validateViewExternal = vR;
var se = {};
Object.defineProperty(se, "__esModule", { value: !0 });
se.validateViewImage = se.isViewImage = se.validateView = se.isView = se.validateAspectRatio = se.isAspectRatio = se.validateImage = se.isImage = se.validateMain = se.isMain = void 0;
const ft = G, Cs = z;
function _R(t) {
  return (0, ft.isObj)(t) && (0, ft.hasProp)(t, "$type") && (t.$type === "app.bsky.embed.images#main" || t.$type === "app.bsky.embed.images");
}
se.isMain = _R;
function wR(t) {
  return Cs.lexicons.validate("app.bsky.embed.images#main", t);
}
se.validateMain = wR;
function TR(t) {
  return (0, ft.isObj)(t) && (0, ft.hasProp)(t, "$type") && t.$type === "app.bsky.embed.images#image";
}
se.isImage = TR;
function CR(t) {
  return Cs.lexicons.validate("app.bsky.embed.images#image", t);
}
se.validateImage = CR;
function LR(t) {
  return (0, ft.isObj)(t) && (0, ft.hasProp)(t, "$type") && t.$type === "app.bsky.embed.images#aspectRatio";
}
se.isAspectRatio = LR;
function SR(t) {
  return Cs.lexicons.validate("app.bsky.embed.images#aspectRatio", t);
}
se.validateAspectRatio = SR;
function kR(t) {
  return (0, ft.isObj)(t) && (0, ft.hasProp)(t, "$type") && t.$type === "app.bsky.embed.images#view";
}
se.isView = kR;
function BR(t) {
  return Cs.lexicons.validate("app.bsky.embed.images#view", t);
}
se.validateView = BR;
function DR(t) {
  return (0, ft.isObj)(t) && (0, ft.hasProp)(t, "$type") && t.$type === "app.bsky.embed.images#viewImage";
}
se.isViewImage = DR;
function PR(t) {
  return Cs.lexicons.validate("app.bsky.embed.images#viewImage", t);
}
se.validateViewImage = PR;
var ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.validateViewBlocked = ae.isViewBlocked = ae.validateViewNotFound = ae.isViewNotFound = ae.validateViewRecord = ae.isViewRecord = ae.validateView = ae.isView = ae.validateMain = ae.isMain = void 0;
const dt = G, Ls = z;
function KR(t) {
  return (0, dt.isObj)(t) && (0, dt.hasProp)(t, "$type") && (t.$type === "app.bsky.embed.record#main" || t.$type === "app.bsky.embed.record");
}
ae.isMain = KR;
function UR(t) {
  return Ls.lexicons.validate("app.bsky.embed.record#main", t);
}
ae.validateMain = UR;
function VR(t) {
  return (0, dt.isObj)(t) && (0, dt.hasProp)(t, "$type") && t.$type === "app.bsky.embed.record#view";
}
ae.isView = VR;
function IR(t) {
  return Ls.lexicons.validate("app.bsky.embed.record#view", t);
}
ae.validateView = IR;
function OR(t) {
  return (0, dt.isObj)(t) && (0, dt.hasProp)(t, "$type") && t.$type === "app.bsky.embed.record#viewRecord";
}
ae.isViewRecord = OR;
function jR(t) {
  return Ls.lexicons.validate("app.bsky.embed.record#viewRecord", t);
}
ae.validateViewRecord = jR;
function NR(t) {
  return (0, dt.isObj)(t) && (0, dt.hasProp)(t, "$type") && t.$type === "app.bsky.embed.record#viewNotFound";
}
ae.isViewNotFound = NR;
function $R(t) {
  return Ls.lexicons.validate("app.bsky.embed.record#viewNotFound", t);
}
ae.validateViewNotFound = $R;
function MR(t) {
  return (0, dt.isObj)(t) && (0, dt.hasProp)(t, "$type") && t.$type === "app.bsky.embed.record#viewBlocked";
}
ae.isViewBlocked = MR;
function GR(t) {
  return Ls.lexicons.validate("app.bsky.embed.record#viewBlocked", t);
}
ae.validateViewBlocked = GR;
var at = {};
Object.defineProperty(at, "__esModule", { value: !0 });
at.validateView = at.isView = at.validateMain = at.isMain = void 0;
const aa = G, Hc = z;
function qR(t) {
  return (0, aa.isObj)(t) && (0, aa.hasProp)(t, "$type") && (t.$type === "app.bsky.embed.recordWithMedia#main" || t.$type === "app.bsky.embed.recordWithMedia");
}
at.isMain = qR;
function XR(t) {
  return Hc.lexicons.validate("app.bsky.embed.recordWithMedia#main", t);
}
at.validateMain = XR;
function zR(t) {
  return (0, aa.isObj)(t) && (0, aa.hasProp)(t, "$type") && t.$type === "app.bsky.embed.recordWithMedia#view";
}
at.isView = zR;
function FR(t) {
  return Hc.lexicons.validate("app.bsky.embed.recordWithMedia#view", t);
}
at.validateView = FR;
var P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.INTERACTIONSHARE = P.INTERACTIONQUOTE = P.INTERACTIONREPLY = P.INTERACTIONREPOST = P.INTERACTIONLIKE = P.INTERACTIONSEEN = P.CLICKTHROUGHEMBED = P.CLICKTHROUGHREPOSTER = P.CLICKTHROUGHAUTHOR = P.CLICKTHROUGHITEM = P.REQUESTMORE = P.REQUESTLESS = P.validateInteraction = P.isInteraction = P.validateThreadgateView = P.isThreadgateView = P.validateSkeletonReasonRepost = P.isSkeletonReasonRepost = P.validateSkeletonFeedPost = P.isSkeletonFeedPost = P.validateGeneratorViewerState = P.isGeneratorViewerState = P.validateGeneratorView = P.isGeneratorView = P.validateBlockedAuthor = P.isBlockedAuthor = P.validateBlockedPost = P.isBlockedPost = P.validateNotFoundPost = P.isNotFoundPost = P.validateThreadViewPost = P.isThreadViewPost = P.validateReasonRepost = P.isReasonRepost = P.validateReplyRef = P.isReplyRef = P.validateFeedViewPost = P.isFeedViewPost = P.validateViewerState = P.isViewerState = P.validatePostView = P.isPostView = void 0;
const Q = G, Se = z;
function ZR(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#postView";
}
P.isPostView = ZR;
function HR(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#postView", t);
}
P.validatePostView = HR;
function WR(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#viewerState";
}
P.isViewerState = WR;
function JR(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#viewerState", t);
}
P.validateViewerState = JR;
function QR(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#feedViewPost";
}
P.isFeedViewPost = QR;
function YR(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#feedViewPost", t);
}
P.validateFeedViewPost = YR;
function eA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#replyRef";
}
P.isReplyRef = eA;
function tA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#replyRef", t);
}
P.validateReplyRef = tA;
function rA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#reasonRepost";
}
P.isReasonRepost = rA;
function iA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#reasonRepost", t);
}
P.validateReasonRepost = iA;
function nA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#threadViewPost";
}
P.isThreadViewPost = nA;
function sA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#threadViewPost", t);
}
P.validateThreadViewPost = sA;
function aA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#notFoundPost";
}
P.isNotFoundPost = aA;
function oA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#notFoundPost", t);
}
P.validateNotFoundPost = oA;
function lA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#blockedPost";
}
P.isBlockedPost = lA;
function uA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#blockedPost", t);
}
P.validateBlockedPost = uA;
function cA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#blockedAuthor";
}
P.isBlockedAuthor = cA;
function pA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#blockedAuthor", t);
}
P.validateBlockedAuthor = pA;
function fA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#generatorView";
}
P.isGeneratorView = fA;
function dA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#generatorView", t);
}
P.validateGeneratorView = dA;
function bA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#generatorViewerState";
}
P.isGeneratorViewerState = bA;
function mA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#generatorViewerState", t);
}
P.validateGeneratorViewerState = mA;
function yA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonFeedPost";
}
P.isSkeletonFeedPost = yA;
function hA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#skeletonFeedPost", t);
}
P.validateSkeletonFeedPost = hA;
function EA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonReasonRepost";
}
P.isSkeletonReasonRepost = EA;
function xA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#skeletonReasonRepost", t);
}
P.validateSkeletonReasonRepost = xA;
function gA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#threadgateView";
}
P.isThreadgateView = gA;
function RA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#threadgateView", t);
}
P.validateThreadgateView = RA;
function AA(t) {
  return (0, Q.isObj)(t) && (0, Q.hasProp)(t, "$type") && t.$type === "app.bsky.feed.defs#interaction";
}
P.isInteraction = AA;
function vA(t) {
  return Se.lexicons.validate("app.bsky.feed.defs#interaction", t);
}
P.validateInteraction = vA;
P.REQUESTLESS = "app.bsky.feed.defs#requestLess";
P.REQUESTMORE = "app.bsky.feed.defs#requestMore";
P.CLICKTHROUGHITEM = "app.bsky.feed.defs#clickthroughItem";
P.CLICKTHROUGHAUTHOR = "app.bsky.feed.defs#clickthroughAuthor";
P.CLICKTHROUGHREPOSTER = "app.bsky.feed.defs#clickthroughReposter";
P.CLICKTHROUGHEMBED = "app.bsky.feed.defs#clickthroughEmbed";
P.INTERACTIONSEEN = "app.bsky.feed.defs#interactionSeen";
P.INTERACTIONLIKE = "app.bsky.feed.defs#interactionLike";
P.INTERACTIONREPOST = "app.bsky.feed.defs#interactionRepost";
P.INTERACTIONREPLY = "app.bsky.feed.defs#interactionReply";
P.INTERACTIONQUOTE = "app.bsky.feed.defs#interactionQuote";
P.INTERACTIONSHARE = "app.bsky.feed.defs#interactionShare";
var Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.validateRecord = Zr.isRecord = void 0;
const ul = G, _A = z;
function wA(t) {
  return (0, ul.isObj)(t) && (0, ul.hasProp)(t, "$type") && (t.$type === "app.bsky.feed.generator#main" || t.$type === "app.bsky.feed.generator");
}
Zr.isRecord = wA;
function TA(t) {
  return _A.lexicons.validate("app.bsky.feed.generator#main", t);
}
Zr.validateRecord = TA;
var Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.validateRecord = Hr.isRecord = void 0;
const cl = G, CA = z;
function LA(t) {
  return (0, cl.isObj)(t) && (0, cl.hasProp)(t, "$type") && (t.$type === "app.bsky.feed.like#main" || t.$type === "app.bsky.feed.like");
}
Hr.isRecord = LA;
function SA(t) {
  return CA.lexicons.validate("app.bsky.feed.like#main", t);
}
Hr.validateRecord = SA;
var me = {};
Object.defineProperty(me, "__esModule", { value: !0 });
me.validateTextSlice = me.isTextSlice = me.validateEntity = me.isEntity = me.validateReplyRef = me.isReplyRef = me.validateRecord = me.isRecord = void 0;
const Wt = G, Ra = z;
function kA(t) {
  return (0, Wt.isObj)(t) && (0, Wt.hasProp)(t, "$type") && (t.$type === "app.bsky.feed.post#main" || t.$type === "app.bsky.feed.post");
}
me.isRecord = kA;
function BA(t) {
  return Ra.lexicons.validate("app.bsky.feed.post#main", t);
}
me.validateRecord = BA;
function DA(t) {
  return (0, Wt.isObj)(t) && (0, Wt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.post#replyRef";
}
me.isReplyRef = DA;
function PA(t) {
  return Ra.lexicons.validate("app.bsky.feed.post#replyRef", t);
}
me.validateReplyRef = PA;
function KA(t) {
  return (0, Wt.isObj)(t) && (0, Wt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.post#entity";
}
me.isEntity = KA;
function UA(t) {
  return Ra.lexicons.validate("app.bsky.feed.post#entity", t);
}
me.validateEntity = UA;
function VA(t) {
  return (0, Wt.isObj)(t) && (0, Wt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.post#textSlice";
}
me.isTextSlice = VA;
function IA(t) {
  return Ra.lexicons.validate("app.bsky.feed.post#textSlice", t);
}
me.validateTextSlice = IA;
var Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.validateRecord = Wr.isRecord = void 0;
const pl = G, OA = z;
function jA(t) {
  return (0, pl.isObj)(t) && (0, pl.hasProp)(t, "$type") && (t.$type === "app.bsky.feed.repost#main" || t.$type === "app.bsky.feed.repost");
}
Wr.isRecord = jA;
function NA(t) {
  return OA.lexicons.validate("app.bsky.feed.repost#main", t);
}
Wr.validateRecord = NA;
var ye = {};
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.validateListRule = ye.isListRule = ye.validateFollowingRule = ye.isFollowingRule = ye.validateMentionRule = ye.isMentionRule = ye.validateRecord = ye.isRecord = void 0;
const Jt = G, Aa = z;
function $A(t) {
  return (0, Jt.isObj)(t) && (0, Jt.hasProp)(t, "$type") && (t.$type === "app.bsky.feed.threadgate#main" || t.$type === "app.bsky.feed.threadgate");
}
ye.isRecord = $A;
function MA(t) {
  return Aa.lexicons.validate("app.bsky.feed.threadgate#main", t);
}
ye.validateRecord = MA;
function GA(t) {
  return (0, Jt.isObj)(t) && (0, Jt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.threadgate#mentionRule";
}
ye.isMentionRule = GA;
function qA(t) {
  return Aa.lexicons.validate("app.bsky.feed.threadgate#mentionRule", t);
}
ye.validateMentionRule = qA;
function XA(t) {
  return (0, Jt.isObj)(t) && (0, Jt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.threadgate#followingRule";
}
ye.isFollowingRule = XA;
function zA(t) {
  return Aa.lexicons.validate("app.bsky.feed.threadgate#followingRule", t);
}
ye.validateFollowingRule = zA;
function FA(t) {
  return (0, Jt.isObj)(t) && (0, Jt.hasProp)(t, "$type") && t.$type === "app.bsky.feed.threadgate#listRule";
}
ye.isListRule = FA;
function ZA(t) {
  return Aa.lexicons.validate("app.bsky.feed.threadgate#listRule", t);
}
ye.validateListRule = ZA;
var Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
Jr.validateRecord = Jr.isRecord = void 0;
const fl = G, HA = z;
function WA(t) {
  return (0, fl.isObj)(t) && (0, fl.hasProp)(t, "$type") && (t.$type === "app.bsky.graph.block#main" || t.$type === "app.bsky.graph.block");
}
Jr.isRecord = WA;
function JA(t) {
  return HA.lexicons.validate("app.bsky.graph.block#main", t);
}
Jr.validateRecord = JA;
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.validateRelationship = J.isRelationship = J.validateNotFoundActor = J.isNotFoundActor = J.validateListViewerState = J.isListViewerState = J.CURATELIST = J.MODLIST = J.validateListItemView = J.isListItemView = J.validateListView = J.isListView = J.validateListViewBasic = J.isListViewBasic = void 0;
const Ge = G, li = z;
function QA(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#listViewBasic";
}
J.isListViewBasic = QA;
function YA(t) {
  return li.lexicons.validate("app.bsky.graph.defs#listViewBasic", t);
}
J.validateListViewBasic = YA;
function ev(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#listView";
}
J.isListView = ev;
function tv(t) {
  return li.lexicons.validate("app.bsky.graph.defs#listView", t);
}
J.validateListView = tv;
function rv(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#listItemView";
}
J.isListItemView = rv;
function iv(t) {
  return li.lexicons.validate("app.bsky.graph.defs#listItemView", t);
}
J.validateListItemView = iv;
J.MODLIST = "app.bsky.graph.defs#modlist";
J.CURATELIST = "app.bsky.graph.defs#curatelist";
function nv(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#listViewerState";
}
J.isListViewerState = nv;
function sv(t) {
  return li.lexicons.validate("app.bsky.graph.defs#listViewerState", t);
}
J.validateListViewerState = sv;
function av(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#notFoundActor";
}
J.isNotFoundActor = av;
function ov(t) {
  return li.lexicons.validate("app.bsky.graph.defs#notFoundActor", t);
}
J.validateNotFoundActor = ov;
function lv(t) {
  return (0, Ge.isObj)(t) && (0, Ge.hasProp)(t, "$type") && t.$type === "app.bsky.graph.defs#relationship";
}
J.isRelationship = lv;
function uv(t) {
  return li.lexicons.validate("app.bsky.graph.defs#relationship", t);
}
J.validateRelationship = uv;
var Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.validateRecord = Qr.isRecord = void 0;
const dl = G, cv = z;
function pv(t) {
  return (0, dl.isObj)(t) && (0, dl.hasProp)(t, "$type") && (t.$type === "app.bsky.graph.follow#main" || t.$type === "app.bsky.graph.follow");
}
Qr.isRecord = pv;
function fv(t) {
  return cv.lexicons.validate("app.bsky.graph.follow#main", t);
}
Qr.validateRecord = fv;
var Yr = {};
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.validateRecord = Yr.isRecord = void 0;
const bl = G, dv = z;
function bv(t) {
  return (0, bl.isObj)(t) && (0, bl.hasProp)(t, "$type") && (t.$type === "app.bsky.graph.list#main" || t.$type === "app.bsky.graph.list");
}
Yr.isRecord = bv;
function mv(t) {
  return dv.lexicons.validate("app.bsky.graph.list#main", t);
}
Yr.validateRecord = mv;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.validateRecord = ei.isRecord = void 0;
const ml = G, yv = z;
function hv(t) {
  return (0, ml.isObj)(t) && (0, ml.hasProp)(t, "$type") && (t.$type === "app.bsky.graph.listblock#main" || t.$type === "app.bsky.graph.listblock");
}
ei.isRecord = hv;
function Ev(t) {
  return yv.lexicons.validate("app.bsky.graph.listblock#main", t);
}
ei.validateRecord = Ev;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.validateRecord = ti.isRecord = void 0;
const yl = G, xv = z;
function gv(t) {
  return (0, yl.isObj)(t) && (0, yl.hasProp)(t, "$type") && (t.$type === "app.bsky.graph.listitem#main" || t.$type === "app.bsky.graph.listitem");
}
ti.isRecord = gv;
function Rv(t) {
  return xv.lexicons.validate("app.bsky.graph.listitem#main", t);
}
ti.validateRecord = Rv;
var he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.validateLabelerPolicies = he.isLabelerPolicies = he.validateLabelerViewerState = he.isLabelerViewerState = he.validateLabelerViewDetailed = he.isLabelerViewDetailed = he.validateLabelerView = he.isLabelerView = void 0;
const Qt = G, va = z;
function Av(t) {
  return (0, Qt.isObj)(t) && (0, Qt.hasProp)(t, "$type") && t.$type === "app.bsky.labeler.defs#labelerView";
}
he.isLabelerView = Av;
function vv(t) {
  return va.lexicons.validate("app.bsky.labeler.defs#labelerView", t);
}
he.validateLabelerView = vv;
function _v(t) {
  return (0, Qt.isObj)(t) && (0, Qt.hasProp)(t, "$type") && t.$type === "app.bsky.labeler.defs#labelerViewDetailed";
}
he.isLabelerViewDetailed = _v;
function wv(t) {
  return va.lexicons.validate("app.bsky.labeler.defs#labelerViewDetailed", t);
}
he.validateLabelerViewDetailed = wv;
function Tv(t) {
  return (0, Qt.isObj)(t) && (0, Qt.hasProp)(t, "$type") && t.$type === "app.bsky.labeler.defs#labelerViewerState";
}
he.isLabelerViewerState = Tv;
function Cv(t) {
  return va.lexicons.validate("app.bsky.labeler.defs#labelerViewerState", t);
}
he.validateLabelerViewerState = Cv;
function Lv(t) {
  return (0, Qt.isObj)(t) && (0, Qt.hasProp)(t, "$type") && t.$type === "app.bsky.labeler.defs#labelerPolicies";
}
he.isLabelerPolicies = Lv;
function Sv(t) {
  return va.lexicons.validate("app.bsky.labeler.defs#labelerPolicies", t);
}
he.validateLabelerPolicies = Sv;
var ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.validateRecord = ri.isRecord = void 0;
const hl = G, kv = z;
function Bv(t) {
  return (0, hl.isObj)(t) && (0, hl.hasProp)(t, "$type") && (t.$type === "app.bsky.labeler.service#main" || t.$type === "app.bsky.labeler.service");
}
ri.isRecord = Bv;
function Dv(t) {
  return kv.lexicons.validate("app.bsky.labeler.service#main", t);
}
ri.validateRecord = Dv;
var oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.validateByteSlice = oe.isByteSlice = oe.validateTag = oe.isTag = oe.validateLink = oe.isLink = oe.validateMention = oe.isMention = oe.validateMain = oe.isMain = void 0;
const bt = G, Ss = z;
function Pv(t) {
  return (0, bt.isObj)(t) && (0, bt.hasProp)(t, "$type") && (t.$type === "app.bsky.richtext.facet#main" || t.$type === "app.bsky.richtext.facet");
}
oe.isMain = Pv;
function Kv(t) {
  return Ss.lexicons.validate("app.bsky.richtext.facet#main", t);
}
oe.validateMain = Kv;
function Uv(t) {
  return (0, bt.isObj)(t) && (0, bt.hasProp)(t, "$type") && t.$type === "app.bsky.richtext.facet#mention";
}
oe.isMention = Uv;
function Vv(t) {
  return Ss.lexicons.validate("app.bsky.richtext.facet#mention", t);
}
oe.validateMention = Vv;
function Iv(t) {
  return (0, bt.isObj)(t) && (0, bt.hasProp)(t, "$type") && t.$type === "app.bsky.richtext.facet#link";
}
oe.isLink = Iv;
function Ov(t) {
  return Ss.lexicons.validate("app.bsky.richtext.facet#link", t);
}
oe.validateLink = Ov;
function jv(t) {
  return (0, bt.isObj)(t) && (0, bt.hasProp)(t, "$type") && t.$type === "app.bsky.richtext.facet#tag";
}
oe.isTag = jv;
function Nv(t) {
  return Ss.lexicons.validate("app.bsky.richtext.facet#tag", t);
}
oe.validateTag = Nv;
function $v(t) {
  return (0, bt.isObj)(t) && (0, bt.hasProp)(t, "$type") && t.$type === "app.bsky.richtext.facet#byteSlice";
}
oe.isByteSlice = $v;
function Mv(t) {
  return Ss.lexicons.validate("app.bsky.richtext.facet#byteSlice", t);
}
oe.validateByteSlice = Mv;
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.validateSkeletonSearchActor = ot.isSkeletonSearchActor = ot.validateSkeletonSearchPost = ot.isSkeletonSearchPost = void 0;
const oa = G, Wc = z;
function Gv(t) {
  return (0, oa.isObj)(t) && (0, oa.hasProp)(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchPost";
}
ot.isSkeletonSearchPost = Gv;
function qv(t) {
  return Wc.lexicons.validate("app.bsky.unspecced.defs#skeletonSearchPost", t);
}
ot.validateSkeletonSearchPost = qv;
function Xv(t) {
  return (0, oa.isObj)(t) && (0, oa.hasProp)(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchActor";
}
ot.isSkeletonSearchActor = Xv;
function zv(t) {
  return Wc.lexicons.validate("app.bsky.unspecced.defs#skeletonSearchActor", t);
}
ot.validateSkeletonSearchActor = zv;
var ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.validateTemplateView = ii.isTemplateView = void 0;
const El = G, Fv = z;
function Zv(t) {
  return (0, El.isObj)(t) && (0, El.hasProp)(t, "$type") && t.$type === "tools.ozone.communication.defs#templateView";
}
ii.isTemplateView = Zv;
function Hv(t) {
  return Fv.lexicons.validate("tools.ozone.communication.defs#templateView", t);
}
ii.validateTemplateView = Hv;
var S = {};
Object.defineProperty(S, "__esModule", { value: !0 });
S.validateModeration = S.isModeration = S.validateRecordViewNotFound = S.isRecordViewNotFound = S.validateRecordViewDetail = S.isRecordViewDetail = S.validateRecordView = S.isRecordView = S.validateRepoViewNotFound = S.isRepoViewNotFound = S.validateRepoViewDetail = S.isRepoViewDetail = S.validateRepoView = S.isRepoView = S.validateModEventTag = S.isModEventTag = S.validateModEventDivert = S.isModEventDivert = S.validateModEventEmail = S.isModEventEmail = S.validateModEventUnmute = S.isModEventUnmute = S.validateModEventMute = S.isModEventMute = S.validateModEventEscalate = S.isModEventEscalate = S.validateModEventAcknowledge = S.isModEventAcknowledge = S.validateModEventLabel = S.isModEventLabel = S.validateModEventReport = S.isModEventReport = S.validateModEventComment = S.isModEventComment = S.validateModEventResolveAppeal = S.isModEventResolveAppeal = S.validateModEventReverseTakedown = S.isModEventReverseTakedown = S.validateModEventTakedown = S.isModEventTakedown = S.REVIEWNONE = S.REVIEWCLOSED = S.REVIEWESCALATED = S.REVIEWOPEN = S.validateSubjectStatusView = S.isSubjectStatusView = S.validateModEventViewDetail = S.isModEventViewDetail = S.validateModEventView = S.isModEventView = void 0;
S.validateVideoDetails = S.isVideoDetails = S.validateImageDetails = S.isImageDetails = S.validateBlobView = S.isBlobView = S.validateModerationDetail = S.isModerationDetail = void 0;
const $ = G, Y = z;
function Wv(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventView";
}
S.isModEventView = Wv;
function Jv(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventView", t);
}
S.validateModEventView = Jv;
function Qv(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventViewDetail";
}
S.isModEventViewDetail = Qv;
function Yv(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventViewDetail", t);
}
S.validateModEventViewDetail = Yv;
function e_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#subjectStatusView";
}
S.isSubjectStatusView = e_;
function t_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#subjectStatusView", t);
}
S.validateSubjectStatusView = t_;
S.REVIEWOPEN = "tools.ozone.moderation.defs#reviewOpen";
S.REVIEWESCALATED = "tools.ozone.moderation.defs#reviewEscalated";
S.REVIEWCLOSED = "tools.ozone.moderation.defs#reviewClosed";
S.REVIEWNONE = "tools.ozone.moderation.defs#reviewNone";
function r_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventTakedown";
}
S.isModEventTakedown = r_;
function i_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventTakedown", t);
}
S.validateModEventTakedown = i_;
function n_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventReverseTakedown";
}
S.isModEventReverseTakedown = n_;
function s_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventReverseTakedown", t);
}
S.validateModEventReverseTakedown = s_;
function a_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventResolveAppeal";
}
S.isModEventResolveAppeal = a_;
function o_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventResolveAppeal", t);
}
S.validateModEventResolveAppeal = o_;
function l_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventComment";
}
S.isModEventComment = l_;
function u_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventComment", t);
}
S.validateModEventComment = u_;
function c_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventReport";
}
S.isModEventReport = c_;
function p_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventReport", t);
}
S.validateModEventReport = p_;
function f_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventLabel";
}
S.isModEventLabel = f_;
function d_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventLabel", t);
}
S.validateModEventLabel = d_;
function b_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventAcknowledge";
}
S.isModEventAcknowledge = b_;
function m_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventAcknowledge", t);
}
S.validateModEventAcknowledge = m_;
function y_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventEscalate";
}
S.isModEventEscalate = y_;
function h_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventEscalate", t);
}
S.validateModEventEscalate = h_;
function E_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventMute";
}
S.isModEventMute = E_;
function x_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventMute", t);
}
S.validateModEventMute = x_;
function g_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventUnmute";
}
S.isModEventUnmute = g_;
function R_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventUnmute", t);
}
S.validateModEventUnmute = R_;
function A_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventEmail";
}
S.isModEventEmail = A_;
function v_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventEmail", t);
}
S.validateModEventEmail = v_;
function __(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventDivert";
}
S.isModEventDivert = __;
function w_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventDivert", t);
}
S.validateModEventDivert = w_;
function T_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#modEventTag";
}
S.isModEventTag = T_;
function C_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#modEventTag", t);
}
S.validateModEventTag = C_;
function L_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#repoView";
}
S.isRepoView = L_;
function S_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#repoView", t);
}
S.validateRepoView = S_;
function k_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#repoViewDetail";
}
S.isRepoViewDetail = k_;
function B_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#repoViewDetail", t);
}
S.validateRepoViewDetail = B_;
function D_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#repoViewNotFound";
}
S.isRepoViewNotFound = D_;
function P_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#repoViewNotFound", t);
}
S.validateRepoViewNotFound = P_;
function K_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#recordView";
}
S.isRecordView = K_;
function U_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#recordView", t);
}
S.validateRecordView = U_;
function V_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#recordViewDetail";
}
S.isRecordViewDetail = V_;
function I_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#recordViewDetail", t);
}
S.validateRecordViewDetail = I_;
function O_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#recordViewNotFound";
}
S.isRecordViewNotFound = O_;
function j_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#recordViewNotFound", t);
}
S.validateRecordViewNotFound = j_;
function N_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#moderation";
}
S.isModeration = N_;
function $_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#moderation", t);
}
S.validateModeration = $_;
function M_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#moderationDetail";
}
S.isModerationDetail = M_;
function G_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#moderationDetail", t);
}
S.validateModerationDetail = G_;
function q_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#blobView";
}
S.isBlobView = q_;
function X_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#blobView", t);
}
S.validateBlobView = X_;
function z_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#imageDetails";
}
S.isImageDetails = z_;
function F_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#imageDetails", t);
}
S.validateImageDetails = F_;
function Z_(t) {
  return (0, $.isObj)(t) && (0, $.hasProp)(t, "$type") && t.$type === "tools.ozone.moderation.defs#videoDetails";
}
S.isVideoDetails = Z_;
function H_(t) {
  return Y.lexicons.validate("tools.ozone.moderation.defs#videoDetails", t);
}
S.validateVideoDetails = H_;
var W_ = B && B.__createBinding || (Object.create ? function(t, e, r, n) {
  n === void 0 && (n = r);
  var s = Object.getOwnPropertyDescriptor(e, r);
  (!s || ("get" in s ? !e.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
    return e[r];
  } }), Object.defineProperty(t, n, s);
} : function(t, e, r, n) {
  n === void 0 && (n = r), t[n] = e[r];
}), J_ = B && B.__setModuleDefault || (Object.create ? function(t, e) {
  Object.defineProperty(t, "default", { enumerable: !0, value: e });
} : function(t, e) {
  t.default = e;
}), y = B && B.__importStar || function(t) {
  if (t && t.__esModule)
    return t;
  var e = {};
  if (t != null)
    for (var r in t)
      r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && W_(e, t, r);
  return J_(e, t), e;
};
Object.defineProperty(c, "__esModule", { value: !0 });
c.ComAtprotoServerGetAccountInviteCodes = c.ComAtprotoServerDescribeServer = c.ComAtprotoServerDeleteSession = c.ComAtprotoServerDeleteAccount = c.ComAtprotoServerDefs = c.ComAtprotoServerDeactivateAccount = c.ComAtprotoServerCreateSession = c.ComAtprotoServerCreateInviteCodes = c.ComAtprotoServerCreateInviteCode = c.ComAtprotoServerCreateAppPassword = c.ComAtprotoServerCreateAccount = c.ComAtprotoServerConfirmEmail = c.ComAtprotoServerCheckAccountStatus = c.ComAtprotoServerActivateAccount = c.ComAtprotoRepoUploadBlob = c.ComAtprotoRepoStrongRef = c.ComAtprotoRepoPutRecord = c.ComAtprotoRepoListRecords = c.ComAtprotoRepoListMissingBlobs = c.ComAtprotoRepoImportRepo = c.ComAtprotoRepoGetRecord = c.ComAtprotoRepoDescribeRepo = c.ComAtprotoRepoDeleteRecord = c.ComAtprotoRepoCreateRecord = c.ComAtprotoRepoApplyWrites = c.ComAtprotoModerationDefs = c.ComAtprotoModerationCreateReport = c.ComAtprotoLabelSubscribeLabels = c.ComAtprotoLabelQueryLabels = c.ComAtprotoLabelDefs = c.ComAtprotoIdentityUpdateHandle = c.ComAtprotoIdentitySubmitPlcOperation = c.ComAtprotoIdentitySignPlcOperation = c.ComAtprotoIdentityResolveHandle = c.ComAtprotoIdentityRequestPlcOperationSignature = c.ComAtprotoIdentityGetRecommendedDidCredentials = c.ComAtprotoAdminUpdateSubjectStatus = c.ComAtprotoAdminUpdateAccountPassword = c.ComAtprotoAdminUpdateAccountHandle = c.ComAtprotoAdminUpdateAccountEmail = c.ComAtprotoAdminSendEmail = c.ComAtprotoAdminGetSubjectStatus = c.ComAtprotoAdminGetInviteCodes = c.ComAtprotoAdminGetAccountInfos = c.ComAtprotoAdminGetAccountInfo = c.ComAtprotoAdminEnableAccountInvites = c.ComAtprotoAdminDisableInviteCodes = c.ComAtprotoAdminDisableAccountInvites = c.ComAtprotoAdminDeleteAccount = c.ComAtprotoAdminDefs = void 0;
c.AppBskyFeedGetFeedSkeleton = c.AppBskyFeedGetFeedGenerators = c.AppBskyFeedGetFeedGenerator = c.AppBskyFeedGetFeed = c.AppBskyFeedGetAuthorFeed = c.AppBskyFeedGetActorLikes = c.AppBskyFeedGetActorFeeds = c.AppBskyFeedGenerator = c.AppBskyFeedDescribeFeedGenerator = c.AppBskyFeedDefs = c.AppBskyEmbedRecordWithMedia = c.AppBskyEmbedRecord = c.AppBskyEmbedImages = c.AppBskyEmbedExternal = c.AppBskyActorSearchActorsTypeahead = c.AppBskyActorSearchActors = c.AppBskyActorPutPreferences = c.AppBskyActorProfile = c.AppBskyActorGetSuggestions = c.AppBskyActorGetProfiles = c.AppBskyActorGetProfile = c.AppBskyActorGetPreferences = c.AppBskyActorDefs = c.ComAtprotoTempRequestPhoneVerification = c.ComAtprotoTempFetchLabels = c.ComAtprotoTempCheckSignupQueue = c.ComAtprotoSyncSubscribeRepos = c.ComAtprotoSyncRequestCrawl = c.ComAtprotoSyncNotifyOfUpdate = c.ComAtprotoSyncListRepos = c.ComAtprotoSyncListBlobs = c.ComAtprotoSyncGetRepo = c.ComAtprotoSyncGetRecord = c.ComAtprotoSyncGetLatestCommit = c.ComAtprotoSyncGetHead = c.ComAtprotoSyncGetCheckout = c.ComAtprotoSyncGetBlocks = c.ComAtprotoSyncGetBlob = c.ComAtprotoServerUpdateEmail = c.ComAtprotoServerRevokeAppPassword = c.ComAtprotoServerResetPassword = c.ComAtprotoServerReserveSigningKey = c.ComAtprotoServerRequestPasswordReset = c.ComAtprotoServerRequestEmailUpdate = c.ComAtprotoServerRequestEmailConfirmation = c.ComAtprotoServerRequestAccountDelete = c.ComAtprotoServerRefreshSession = c.ComAtprotoServerListAppPasswords = c.ComAtprotoServerGetSession = c.ComAtprotoServerGetServiceAuth = void 0;
c.ToolsOzoneCommunicationDeleteTemplate = c.ToolsOzoneCommunicationDefs = c.ToolsOzoneCommunicationCreateTemplate = c.AppBskyUnspeccedSearchPostsSkeleton = c.AppBskyUnspeccedSearchActorsSkeleton = c.AppBskyUnspeccedGetTaggedSuggestions = c.AppBskyUnspeccedGetSuggestionsSkeleton = c.AppBskyUnspeccedGetPopularFeedGenerators = c.AppBskyUnspeccedDefs = c.AppBskyRichtextFacet = c.AppBskyNotificationUpdateSeen = c.AppBskyNotificationRegisterPush = c.AppBskyNotificationListNotifications = c.AppBskyNotificationGetUnreadCount = c.AppBskyLabelerService = c.AppBskyLabelerGetServices = c.AppBskyLabelerDefs = c.AppBskyGraphUnmuteActorList = c.AppBskyGraphUnmuteActor = c.AppBskyGraphMuteActorList = c.AppBskyGraphMuteActor = c.AppBskyGraphListitem = c.AppBskyGraphListblock = c.AppBskyGraphList = c.AppBskyGraphGetSuggestedFollowsByActor = c.AppBskyGraphGetRelationships = c.AppBskyGraphGetMutes = c.AppBskyGraphGetLists = c.AppBskyGraphGetListMutes = c.AppBskyGraphGetListBlocks = c.AppBskyGraphGetList = c.AppBskyGraphGetFollows = c.AppBskyGraphGetFollowers = c.AppBskyGraphGetBlocks = c.AppBskyGraphFollow = c.AppBskyGraphDefs = c.AppBskyGraphBlock = c.AppBskyFeedThreadgate = c.AppBskyFeedSendInteractions = c.AppBskyFeedSearchPosts = c.AppBskyFeedRepost = c.AppBskyFeedPost = c.AppBskyFeedLike = c.AppBskyFeedGetTimeline = c.AppBskyFeedGetSuggestedFeeds = c.AppBskyFeedGetRepostedBy = c.AppBskyFeedGetPosts = c.AppBskyFeedGetPostThread = c.AppBskyFeedGetListFeed = c.AppBskyFeedGetLikes = void 0;
c.ToolsOzoneNS = c.ToolsNS = c.AppBskyUnspeccedNS = c.AppBskyRichtextNS = c.AppBskyNotificationNS = c.ServiceRecord = c.AppBskyLabelerNS = c.ListitemRecord = c.ListblockRecord = c.ListRecord = c.FollowRecord = c.BlockRecord = c.AppBskyGraphNS = c.ThreadgateRecord = c.RepostRecord = c.PostRecord = c.LikeRecord = c.GeneratorRecord = c.AppBskyFeedNS = c.AppBskyEmbedNS = c.ProfileRecord = c.AppBskyActorNS = c.AppBskyNS = c.AppNS = c.ComAtprotoTempNS = c.ComAtprotoSyncNS = c.ComAtprotoServerNS = c.ComAtprotoRepoNS = c.ComAtprotoModerationNS = c.ComAtprotoLabelNS = c.ComAtprotoIdentityNS = c.ComAtprotoAdminNS = c.ComAtprotoNS = c.ComNS = c.AtpServiceClient = c.AtpBaseClient = c.TOOLS_OZONE_MODERATION = c.APP_BSKY_GRAPH = c.APP_BSKY_FEED = c.COM_ATPROTO_MODERATION = c.ToolsOzoneModerationSearchRepos = c.ToolsOzoneModerationQueryStatuses = c.ToolsOzoneModerationQueryEvents = c.ToolsOzoneModerationGetRepo = c.ToolsOzoneModerationGetRecord = c.ToolsOzoneModerationGetEvent = c.ToolsOzoneModerationEmitEvent = c.ToolsOzoneModerationDefs = c.ToolsOzoneCommunicationUpdateTemplate = c.ToolsOzoneCommunicationListTemplates = void 0;
c.ToolsOzoneModerationNS = c.ToolsOzoneCommunicationNS = void 0;
const Q_ = C, Y_ = z, ew = y($i), tw = y(Mi), rw = y(Gi), iw = y(qi), nw = y(Xi), sw = y(zi), aw = y(Fi), ow = y(Zi), lw = y(Hi), uw = y(Wi), cw = y(Ji), pw = y(Qi), fw = y(Yi), dw = y(en), bw = y(tn), mw = y(rn), yw = y(nn), hw = y(sn), Ew = y(an), xw = y(on), gw = y(ln), Rw = y(ce), Aw = y(pr), vw = y(fr), _w = y(un), ww = y(cn), Tw = y(pn), Cw = y(St), Lw = y(kt), Sw = y(dr), kw = y(fn), Bw = y(dn), Dw = y(bn), Pw = y(Ie), Kw = y(pe), Uw = y(Ze), Vw = y(yn), Iw = y(Bt), Ow = y(Dt), jw = y(hn), Nw = y(Pt), $w = y(En), Mw = y(Oe), Gw = y(br), qw = y(xn), Xw = y(gn), zw = y(He), Fw = y(mr), Zw = y(Rn), Hw = y(An), Ww = y(vn), Jw = y(_n), Qw = y(wn), Yw = y(Kt), eT = y(Tn), tT = y(We), rT = y(Cn), iT = y(Ln), nT = y(Sn), sT = y(yr), aT = y(hr), oT = y(kn), lT = y(Bn), uT = y(Dn), cT = y(Ut), pT = y(Pn), fT = y(Kn), dT = y(Un), bT = y(Vn), mT = y(In), yT = y(On), hT = y(jn), ET = y(Nn), xT = y($n), gT = y(Mn), RT = y(Gn), AT = y(qn), vT = y(je), _T = y(Xn), wT = y(Vt), TT = y(It), CT = y(Er), LT = y(zn), ST = y(Fn), kT = y(xr), BT = y(Ot), DT = y(gr), PT = y(Rr), KT = y(Zn), UT = y(Hn), VT = y(Wn), IT = y(Jn), OT = y(Ar), jT = y(Qn), NT = y(Yn), $T = y(es), MT = y(ts), GT = y(rs), qT = y(is), XT = y(ns), zT = y(ss), FT = y(as), ZT = y(vr), HT = y(os), WT = y(ls), JT = y(us), QT = y(cs), YT = y(ps), eC = y(fs), tC = y(ds), rC = y(jt), iC = y(bs), nC = y(ms), sC = y(ys), aC = y(hs), oC = y(Nt), lC = y(_r), uC = y(wr), cC = y(Es), pC = y(xs), fC = y(gs), dC = y(Rs), bC = y(Tr), mC = y(As), yC = y(Cr), hC = y(Lr), EC = y(vs), xC = y(_s), gC = y(ws);
c.ComAtprotoAdminDefs = y(de);
c.ComAtprotoAdminDeleteAccount = y($i);
c.ComAtprotoAdminDisableAccountInvites = y(Mi);
c.ComAtprotoAdminDisableInviteCodes = y(Gi);
c.ComAtprotoAdminEnableAccountInvites = y(qi);
c.ComAtprotoAdminGetAccountInfo = y(Xi);
c.ComAtprotoAdminGetAccountInfos = y(zi);
c.ComAtprotoAdminGetInviteCodes = y(Fi);
c.ComAtprotoAdminGetSubjectStatus = y(Zi);
c.ComAtprotoAdminSendEmail = y(Hi);
c.ComAtprotoAdminUpdateAccountEmail = y(Wi);
c.ComAtprotoAdminUpdateAccountHandle = y(Ji);
c.ComAtprotoAdminUpdateAccountPassword = y(Qi);
c.ComAtprotoAdminUpdateSubjectStatus = y(Yi);
c.ComAtprotoIdentityGetRecommendedDidCredentials = y(en);
c.ComAtprotoIdentityRequestPlcOperationSignature = y(tn);
c.ComAtprotoIdentityResolveHandle = y(rn);
c.ComAtprotoIdentitySignPlcOperation = y(nn);
c.ComAtprotoIdentitySubmitPlcOperation = y(sn);
c.ComAtprotoIdentityUpdateHandle = y(an);
c.ComAtprotoLabelDefs = y(ne);
c.ComAtprotoLabelQueryLabels = y(on);
c.ComAtprotoLabelSubscribeLabels = y(nt);
c.ComAtprotoModerationCreateReport = y(ln);
c.ComAtprotoModerationDefs = y(we);
c.ComAtprotoRepoApplyWrites = y(ce);
c.ComAtprotoRepoCreateRecord = y(pr);
c.ComAtprotoRepoDeleteRecord = y(fr);
c.ComAtprotoRepoDescribeRepo = y(un);
c.ComAtprotoRepoGetRecord = y(cn);
c.ComAtprotoRepoImportRepo = y(pn);
c.ComAtprotoRepoListMissingBlobs = y(St);
c.ComAtprotoRepoListRecords = y(kt);
c.ComAtprotoRepoPutRecord = y(dr);
c.ComAtprotoRepoStrongRef = y(zr);
c.ComAtprotoRepoUploadBlob = y(fn);
c.ComAtprotoServerActivateAccount = y(dn);
c.ComAtprotoServerCheckAccountStatus = y(bn);
c.ComAtprotoServerConfirmEmail = y(Ie);
c.ComAtprotoServerCreateAccount = y(pe);
c.ComAtprotoServerCreateAppPassword = y(Ze);
c.ComAtprotoServerCreateInviteCode = y(yn);
c.ComAtprotoServerCreateInviteCodes = y(Bt);
c.ComAtprotoServerCreateSession = y(Dt);
c.ComAtprotoServerDeactivateAccount = y(hn);
c.ComAtprotoServerDefs = y(st);
c.ComAtprotoServerDeleteAccount = y(Pt);
c.ComAtprotoServerDeleteSession = y(En);
c.ComAtprotoServerDescribeServer = y(Oe);
c.ComAtprotoServerGetAccountInviteCodes = y(br);
c.ComAtprotoServerGetServiceAuth = y(xn);
c.ComAtprotoServerGetSession = y(gn);
c.ComAtprotoServerListAppPasswords = y(He);
c.ComAtprotoServerRefreshSession = y(mr);
c.ComAtprotoServerRequestAccountDelete = y(Rn);
c.ComAtprotoServerRequestEmailConfirmation = y(An);
c.ComAtprotoServerRequestEmailUpdate = y(vn);
c.ComAtprotoServerRequestPasswordReset = y(_n);
c.ComAtprotoServerReserveSigningKey = y(wn);
c.ComAtprotoServerResetPassword = y(Kt);
c.ComAtprotoServerRevokeAppPassword = y(Tn);
c.ComAtprotoServerUpdateEmail = y(We);
c.ComAtprotoSyncGetBlob = y(Cn);
c.ComAtprotoSyncGetBlocks = y(Ln);
c.ComAtprotoSyncGetCheckout = y(Sn);
c.ComAtprotoSyncGetHead = y(yr);
c.ComAtprotoSyncGetLatestCommit = y(hr);
c.ComAtprotoSyncGetRecord = y(kn);
c.ComAtprotoSyncGetRepo = y(Bn);
c.ComAtprotoSyncListBlobs = y(Dn);
c.ComAtprotoSyncListRepos = y(Ut);
c.ComAtprotoSyncNotifyOfUpdate = y(Pn);
c.ComAtprotoSyncRequestCrawl = y(Kn);
c.ComAtprotoSyncSubscribeRepos = y(W);
c.ComAtprotoTempCheckSignupQueue = y(Un);
c.ComAtprotoTempFetchLabels = y(Vn);
c.ComAtprotoTempRequestPhoneVerification = y(In);
c.AppBskyActorDefs = y(I);
c.AppBskyActorGetPreferences = y(On);
c.AppBskyActorGetProfile = y(jn);
c.AppBskyActorGetProfiles = y(Nn);
c.AppBskyActorGetSuggestions = y($n);
c.AppBskyActorProfile = y(Fr);
c.AppBskyActorPutPreferences = y(Mn);
c.AppBskyActorSearchActors = y(Gn);
c.AppBskyActorSearchActorsTypeahead = y(qn);
c.AppBskyEmbedExternal = y(be);
c.AppBskyEmbedImages = y(se);
c.AppBskyEmbedRecord = y(ae);
c.AppBskyEmbedRecordWithMedia = y(at);
c.AppBskyFeedDefs = y(P);
c.AppBskyFeedDescribeFeedGenerator = y(je);
c.AppBskyFeedGenerator = y(Zr);
c.AppBskyFeedGetActorFeeds = y(Xn);
c.AppBskyFeedGetActorLikes = y(Vt);
c.AppBskyFeedGetAuthorFeed = y(It);
c.AppBskyFeedGetFeed = y(Er);
c.AppBskyFeedGetFeedGenerator = y(zn);
c.AppBskyFeedGetFeedGenerators = y(Fn);
c.AppBskyFeedGetFeedSkeleton = y(xr);
c.AppBskyFeedGetLikes = y(Ot);
c.AppBskyFeedGetListFeed = y(gr);
c.AppBskyFeedGetPostThread = y(Rr);
c.AppBskyFeedGetPosts = y(Zn);
c.AppBskyFeedGetRepostedBy = y(Hn);
c.AppBskyFeedGetSuggestedFeeds = y(Wn);
c.AppBskyFeedGetTimeline = y(Jn);
c.AppBskyFeedLike = y(Hr);
c.AppBskyFeedPost = y(me);
c.AppBskyFeedRepost = y(Wr);
c.AppBskyFeedSearchPosts = y(Ar);
c.AppBskyFeedSendInteractions = y(Qn);
c.AppBskyFeedThreadgate = y(ye);
c.AppBskyGraphBlock = y(Jr);
c.AppBskyGraphDefs = y(J);
c.AppBskyGraphFollow = y(Qr);
c.AppBskyGraphGetBlocks = y(Yn);
c.AppBskyGraphGetFollowers = y(es);
c.AppBskyGraphGetFollows = y(ts);
c.AppBskyGraphGetList = y(rs);
c.AppBskyGraphGetListBlocks = y(is);
c.AppBskyGraphGetListMutes = y(ns);
c.AppBskyGraphGetLists = y(ss);
c.AppBskyGraphGetMutes = y(as);
c.AppBskyGraphGetRelationships = y(vr);
c.AppBskyGraphGetSuggestedFollowsByActor = y(os);
c.AppBskyGraphList = y(Yr);
c.AppBskyGraphListblock = y(ei);
c.AppBskyGraphListitem = y(ti);
c.AppBskyGraphMuteActor = y(ls);
c.AppBskyGraphMuteActorList = y(us);
c.AppBskyGraphUnmuteActor = y(cs);
c.AppBskyGraphUnmuteActorList = y(ps);
c.AppBskyLabelerDefs = y(he);
c.AppBskyLabelerGetServices = y(fs);
c.AppBskyLabelerService = y(ri);
c.AppBskyNotificationGetUnreadCount = y(ds);
c.AppBskyNotificationListNotifications = y(jt);
c.AppBskyNotificationRegisterPush = y(bs);
c.AppBskyNotificationUpdateSeen = y(ms);
c.AppBskyRichtextFacet = y(oe);
c.AppBskyUnspeccedDefs = y(ot);
c.AppBskyUnspeccedGetPopularFeedGenerators = y(ys);
c.AppBskyUnspeccedGetSuggestionsSkeleton = y(hs);
c.AppBskyUnspeccedGetTaggedSuggestions = y(Nt);
c.AppBskyUnspeccedSearchActorsSkeleton = y(_r);
c.AppBskyUnspeccedSearchPostsSkeleton = y(wr);
c.ToolsOzoneCommunicationCreateTemplate = y(Es);
c.ToolsOzoneCommunicationDefs = y(ii);
c.ToolsOzoneCommunicationDeleteTemplate = y(xs);
c.ToolsOzoneCommunicationListTemplates = y(gs);
c.ToolsOzoneCommunicationUpdateTemplate = y(Rs);
c.ToolsOzoneModerationDefs = y(S);
c.ToolsOzoneModerationEmitEvent = y(Tr);
c.ToolsOzoneModerationGetEvent = y(As);
c.ToolsOzoneModerationGetRecord = y(Cr);
c.ToolsOzoneModerationGetRepo = y(Lr);
c.ToolsOzoneModerationQueryEvents = y(vs);
c.ToolsOzoneModerationQueryStatuses = y(_s);
c.ToolsOzoneModerationSearchRepos = y(ws);
c.COM_ATPROTO_MODERATION = {
  DefsReasonSpam: "com.atproto.moderation.defs#reasonSpam",
  DefsReasonViolation: "com.atproto.moderation.defs#reasonViolation",
  DefsReasonMisleading: "com.atproto.moderation.defs#reasonMisleading",
  DefsReasonSexual: "com.atproto.moderation.defs#reasonSexual",
  DefsReasonRude: "com.atproto.moderation.defs#reasonRude",
  DefsReasonOther: "com.atproto.moderation.defs#reasonOther",
  DefsReasonAppeal: "com.atproto.moderation.defs#reasonAppeal"
};
c.APP_BSKY_FEED = {
  DefsRequestLess: "app.bsky.feed.defs#requestLess",
  DefsRequestMore: "app.bsky.feed.defs#requestMore",
  DefsClickthroughItem: "app.bsky.feed.defs#clickthroughItem",
  DefsClickthroughAuthor: "app.bsky.feed.defs#clickthroughAuthor",
  DefsClickthroughReposter: "app.bsky.feed.defs#clickthroughReposter",
  DefsClickthroughEmbed: "app.bsky.feed.defs#clickthroughEmbed",
  DefsInteractionSeen: "app.bsky.feed.defs#interactionSeen",
  DefsInteractionLike: "app.bsky.feed.defs#interactionLike",
  DefsInteractionRepost: "app.bsky.feed.defs#interactionRepost",
  DefsInteractionReply: "app.bsky.feed.defs#interactionReply",
  DefsInteractionQuote: "app.bsky.feed.defs#interactionQuote",
  DefsInteractionShare: "app.bsky.feed.defs#interactionShare"
};
c.APP_BSKY_GRAPH = {
  DefsModlist: "app.bsky.graph.defs#modlist",
  DefsCuratelist: "app.bsky.graph.defs#curatelist"
};
c.TOOLS_OZONE_MODERATION = {
  DefsReviewOpen: "tools.ozone.moderation.defs#reviewOpen",
  DefsReviewEscalated: "tools.ozone.moderation.defs#reviewEscalated",
  DefsReviewClosed: "tools.ozone.moderation.defs#reviewClosed",
  DefsReviewNone: "tools.ozone.moderation.defs#reviewNone"
};
class RC {
  constructor() {
    Object.defineProperty(this, "xrpc", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Q_.Client()
    }), this.xrpc.addLexicons(Y_.schemas);
  }
  service(e) {
    return new Jc(this, this.xrpc.service(e));
  }
}
c.AtpBaseClient = RC;
class Jc {
  constructor(e, r) {
    Object.defineProperty(this, "_baseClient", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "xrpc", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "com", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "app", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tools", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._baseClient = e, this.xrpc = r, this.com = new Qc(this), this.app = new lp(this), this.tools = new kp(this);
  }
  setHeader(e, r) {
    this.xrpc.setHeader(e, r);
  }
}
c.AtpServiceClient = Jc;
class Qc {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "atproto", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.atproto = new Yc(e);
  }
}
c.ComNS = Qc;
class Yc {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "admin", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "identity", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "label", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "moderation", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "repo", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "server", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "sync", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "temp", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.admin = new ep(e), this.identity = new tp(e), this.label = new rp(e), this.moderation = new ip(e), this.repo = new np(e), this.server = new sp(e), this.sync = new ap(e), this.temp = new op(e);
  }
}
c.ComAtprotoNS = Yc;
class ep {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  deleteAccount(e, r) {
    return this._service.xrpc.call("com.atproto.admin.deleteAccount", r?.qp, e, r).catch((n) => {
      throw ew.toKnownErr(n);
    });
  }
  disableAccountInvites(e, r) {
    return this._service.xrpc.call("com.atproto.admin.disableAccountInvites", r?.qp, e, r).catch((n) => {
      throw tw.toKnownErr(n);
    });
  }
  disableInviteCodes(e, r) {
    return this._service.xrpc.call("com.atproto.admin.disableInviteCodes", r?.qp, e, r).catch((n) => {
      throw rw.toKnownErr(n);
    });
  }
  enableAccountInvites(e, r) {
    return this._service.xrpc.call("com.atproto.admin.enableAccountInvites", r?.qp, e, r).catch((n) => {
      throw iw.toKnownErr(n);
    });
  }
  getAccountInfo(e, r) {
    return this._service.xrpc.call("com.atproto.admin.getAccountInfo", e, void 0, r).catch((n) => {
      throw nw.toKnownErr(n);
    });
  }
  getAccountInfos(e, r) {
    return this._service.xrpc.call("com.atproto.admin.getAccountInfos", e, void 0, r).catch((n) => {
      throw sw.toKnownErr(n);
    });
  }
  getInviteCodes(e, r) {
    return this._service.xrpc.call("com.atproto.admin.getInviteCodes", e, void 0, r).catch((n) => {
      throw aw.toKnownErr(n);
    });
  }
  getSubjectStatus(e, r) {
    return this._service.xrpc.call("com.atproto.admin.getSubjectStatus", e, void 0, r).catch((n) => {
      throw ow.toKnownErr(n);
    });
  }
  sendEmail(e, r) {
    return this._service.xrpc.call("com.atproto.admin.sendEmail", r?.qp, e, r).catch((n) => {
      throw lw.toKnownErr(n);
    });
  }
  updateAccountEmail(e, r) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountEmail", r?.qp, e, r).catch((n) => {
      throw uw.toKnownErr(n);
    });
  }
  updateAccountHandle(e, r) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountHandle", r?.qp, e, r).catch((n) => {
      throw cw.toKnownErr(n);
    });
  }
  updateAccountPassword(e, r) {
    return this._service.xrpc.call("com.atproto.admin.updateAccountPassword", r?.qp, e, r).catch((n) => {
      throw pw.toKnownErr(n);
    });
  }
  updateSubjectStatus(e, r) {
    return this._service.xrpc.call("com.atproto.admin.updateSubjectStatus", r?.qp, e, r).catch((n) => {
      throw fw.toKnownErr(n);
    });
  }
}
c.ComAtprotoAdminNS = ep;
class tp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  getRecommendedDidCredentials(e, r) {
    return this._service.xrpc.call("com.atproto.identity.getRecommendedDidCredentials", e, void 0, r).catch((n) => {
      throw dw.toKnownErr(n);
    });
  }
  requestPlcOperationSignature(e, r) {
    return this._service.xrpc.call("com.atproto.identity.requestPlcOperationSignature", r?.qp, e, r).catch((n) => {
      throw bw.toKnownErr(n);
    });
  }
  resolveHandle(e, r) {
    return this._service.xrpc.call("com.atproto.identity.resolveHandle", e, void 0, r).catch((n) => {
      throw mw.toKnownErr(n);
    });
  }
  signPlcOperation(e, r) {
    return this._service.xrpc.call("com.atproto.identity.signPlcOperation", r?.qp, e, r).catch((n) => {
      throw yw.toKnownErr(n);
    });
  }
  submitPlcOperation(e, r) {
    return this._service.xrpc.call("com.atproto.identity.submitPlcOperation", r?.qp, e, r).catch((n) => {
      throw hw.toKnownErr(n);
    });
  }
  updateHandle(e, r) {
    return this._service.xrpc.call("com.atproto.identity.updateHandle", r?.qp, e, r).catch((n) => {
      throw Ew.toKnownErr(n);
    });
  }
}
c.ComAtprotoIdentityNS = tp;
class rp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  queryLabels(e, r) {
    return this._service.xrpc.call("com.atproto.label.queryLabels", e, void 0, r).catch((n) => {
      throw xw.toKnownErr(n);
    });
  }
}
c.ComAtprotoLabelNS = rp;
class ip {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  createReport(e, r) {
    return this._service.xrpc.call("com.atproto.moderation.createReport", r?.qp, e, r).catch((n) => {
      throw gw.toKnownErr(n);
    });
  }
}
c.ComAtprotoModerationNS = ip;
class np {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  applyWrites(e, r) {
    return this._service.xrpc.call("com.atproto.repo.applyWrites", r?.qp, e, r).catch((n) => {
      throw Rw.toKnownErr(n);
    });
  }
  createRecord(e, r) {
    return this._service.xrpc.call("com.atproto.repo.createRecord", r?.qp, e, r).catch((n) => {
      throw Aw.toKnownErr(n);
    });
  }
  deleteRecord(e, r) {
    return this._service.xrpc.call("com.atproto.repo.deleteRecord", r?.qp, e, r).catch((n) => {
      throw vw.toKnownErr(n);
    });
  }
  describeRepo(e, r) {
    return this._service.xrpc.call("com.atproto.repo.describeRepo", e, void 0, r).catch((n) => {
      throw _w.toKnownErr(n);
    });
  }
  getRecord(e, r) {
    return this._service.xrpc.call("com.atproto.repo.getRecord", e, void 0, r).catch((n) => {
      throw ww.toKnownErr(n);
    });
  }
  importRepo(e, r) {
    return this._service.xrpc.call("com.atproto.repo.importRepo", r?.qp, e, r).catch((n) => {
      throw Tw.toKnownErr(n);
    });
  }
  listMissingBlobs(e, r) {
    return this._service.xrpc.call("com.atproto.repo.listMissingBlobs", e, void 0, r).catch((n) => {
      throw Cw.toKnownErr(n);
    });
  }
  listRecords(e, r) {
    return this._service.xrpc.call("com.atproto.repo.listRecords", e, void 0, r).catch((n) => {
      throw Lw.toKnownErr(n);
    });
  }
  putRecord(e, r) {
    return this._service.xrpc.call("com.atproto.repo.putRecord", r?.qp, e, r).catch((n) => {
      throw Sw.toKnownErr(n);
    });
  }
  uploadBlob(e, r) {
    return this._service.xrpc.call("com.atproto.repo.uploadBlob", r?.qp, e, r).catch((n) => {
      throw kw.toKnownErr(n);
    });
  }
}
c.ComAtprotoRepoNS = np;
class sp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  activateAccount(e, r) {
    return this._service.xrpc.call("com.atproto.server.activateAccount", r?.qp, e, r).catch((n) => {
      throw Bw.toKnownErr(n);
    });
  }
  checkAccountStatus(e, r) {
    return this._service.xrpc.call("com.atproto.server.checkAccountStatus", e, void 0, r).catch((n) => {
      throw Dw.toKnownErr(n);
    });
  }
  confirmEmail(e, r) {
    return this._service.xrpc.call("com.atproto.server.confirmEmail", r?.qp, e, r).catch((n) => {
      throw Pw.toKnownErr(n);
    });
  }
  createAccount(e, r) {
    return this._service.xrpc.call("com.atproto.server.createAccount", r?.qp, e, r).catch((n) => {
      throw Kw.toKnownErr(n);
    });
  }
  createAppPassword(e, r) {
    return this._service.xrpc.call("com.atproto.server.createAppPassword", r?.qp, e, r).catch((n) => {
      throw Uw.toKnownErr(n);
    });
  }
  createInviteCode(e, r) {
    return this._service.xrpc.call("com.atproto.server.createInviteCode", r?.qp, e, r).catch((n) => {
      throw Vw.toKnownErr(n);
    });
  }
  createInviteCodes(e, r) {
    return this._service.xrpc.call("com.atproto.server.createInviteCodes", r?.qp, e, r).catch((n) => {
      throw Iw.toKnownErr(n);
    });
  }
  createSession(e, r) {
    return this._service.xrpc.call("com.atproto.server.createSession", r?.qp, e, r).catch((n) => {
      throw Ow.toKnownErr(n);
    });
  }
  deactivateAccount(e, r) {
    return this._service.xrpc.call("com.atproto.server.deactivateAccount", r?.qp, e, r).catch((n) => {
      throw jw.toKnownErr(n);
    });
  }
  deleteAccount(e, r) {
    return this._service.xrpc.call("com.atproto.server.deleteAccount", r?.qp, e, r).catch((n) => {
      throw Nw.toKnownErr(n);
    });
  }
  deleteSession(e, r) {
    return this._service.xrpc.call("com.atproto.server.deleteSession", r?.qp, e, r).catch((n) => {
      throw $w.toKnownErr(n);
    });
  }
  describeServer(e, r) {
    return this._service.xrpc.call("com.atproto.server.describeServer", e, void 0, r).catch((n) => {
      throw Mw.toKnownErr(n);
    });
  }
  getAccountInviteCodes(e, r) {
    return this._service.xrpc.call("com.atproto.server.getAccountInviteCodes", e, void 0, r).catch((n) => {
      throw Gw.toKnownErr(n);
    });
  }
  getServiceAuth(e, r) {
    return this._service.xrpc.call("com.atproto.server.getServiceAuth", e, void 0, r).catch((n) => {
      throw qw.toKnownErr(n);
    });
  }
  getSession(e, r) {
    return this._service.xrpc.call("com.atproto.server.getSession", e, void 0, r).catch((n) => {
      throw Xw.toKnownErr(n);
    });
  }
  listAppPasswords(e, r) {
    return this._service.xrpc.call("com.atproto.server.listAppPasswords", e, void 0, r).catch((n) => {
      throw zw.toKnownErr(n);
    });
  }
  refreshSession(e, r) {
    return this._service.xrpc.call("com.atproto.server.refreshSession", r?.qp, e, r).catch((n) => {
      throw Fw.toKnownErr(n);
    });
  }
  requestAccountDelete(e, r) {
    return this._service.xrpc.call("com.atproto.server.requestAccountDelete", r?.qp, e, r).catch((n) => {
      throw Zw.toKnownErr(n);
    });
  }
  requestEmailConfirmation(e, r) {
    return this._service.xrpc.call("com.atproto.server.requestEmailConfirmation", r?.qp, e, r).catch((n) => {
      throw Hw.toKnownErr(n);
    });
  }
  requestEmailUpdate(e, r) {
    return this._service.xrpc.call("com.atproto.server.requestEmailUpdate", r?.qp, e, r).catch((n) => {
      throw Ww.toKnownErr(n);
    });
  }
  requestPasswordReset(e, r) {
    return this._service.xrpc.call("com.atproto.server.requestPasswordReset", r?.qp, e, r).catch((n) => {
      throw Jw.toKnownErr(n);
    });
  }
  reserveSigningKey(e, r) {
    return this._service.xrpc.call("com.atproto.server.reserveSigningKey", r?.qp, e, r).catch((n) => {
      throw Qw.toKnownErr(n);
    });
  }
  resetPassword(e, r) {
    return this._service.xrpc.call("com.atproto.server.resetPassword", r?.qp, e, r).catch((n) => {
      throw Yw.toKnownErr(n);
    });
  }
  revokeAppPassword(e, r) {
    return this._service.xrpc.call("com.atproto.server.revokeAppPassword", r?.qp, e, r).catch((n) => {
      throw eT.toKnownErr(n);
    });
  }
  updateEmail(e, r) {
    return this._service.xrpc.call("com.atproto.server.updateEmail", r?.qp, e, r).catch((n) => {
      throw tT.toKnownErr(n);
    });
  }
}
c.ComAtprotoServerNS = sp;
class ap {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  getBlob(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getBlob", e, void 0, r).catch((n) => {
      throw rT.toKnownErr(n);
    });
  }
  getBlocks(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getBlocks", e, void 0, r).catch((n) => {
      throw iT.toKnownErr(n);
    });
  }
  getCheckout(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getCheckout", e, void 0, r).catch((n) => {
      throw nT.toKnownErr(n);
    });
  }
  getHead(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getHead", e, void 0, r).catch((n) => {
      throw sT.toKnownErr(n);
    });
  }
  getLatestCommit(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getLatestCommit", e, void 0, r).catch((n) => {
      throw aT.toKnownErr(n);
    });
  }
  getRecord(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getRecord", e, void 0, r).catch((n) => {
      throw oT.toKnownErr(n);
    });
  }
  getRepo(e, r) {
    return this._service.xrpc.call("com.atproto.sync.getRepo", e, void 0, r).catch((n) => {
      throw lT.toKnownErr(n);
    });
  }
  listBlobs(e, r) {
    return this._service.xrpc.call("com.atproto.sync.listBlobs", e, void 0, r).catch((n) => {
      throw uT.toKnownErr(n);
    });
  }
  listRepos(e, r) {
    return this._service.xrpc.call("com.atproto.sync.listRepos", e, void 0, r).catch((n) => {
      throw cT.toKnownErr(n);
    });
  }
  notifyOfUpdate(e, r) {
    return this._service.xrpc.call("com.atproto.sync.notifyOfUpdate", r?.qp, e, r).catch((n) => {
      throw pT.toKnownErr(n);
    });
  }
  requestCrawl(e, r) {
    return this._service.xrpc.call("com.atproto.sync.requestCrawl", r?.qp, e, r).catch((n) => {
      throw fT.toKnownErr(n);
    });
  }
}
c.ComAtprotoSyncNS = ap;
class op {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  checkSignupQueue(e, r) {
    return this._service.xrpc.call("com.atproto.temp.checkSignupQueue", e, void 0, r).catch((n) => {
      throw dT.toKnownErr(n);
    });
  }
  fetchLabels(e, r) {
    return this._service.xrpc.call("com.atproto.temp.fetchLabels", e, void 0, r).catch((n) => {
      throw bT.toKnownErr(n);
    });
  }
  requestPhoneVerification(e, r) {
    return this._service.xrpc.call("com.atproto.temp.requestPhoneVerification", r?.qp, e, r).catch((n) => {
      throw mT.toKnownErr(n);
    });
  }
}
c.ComAtprotoTempNS = op;
class lp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "bsky", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.bsky = new up(e);
  }
}
c.AppNS = lp;
class up {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "actor", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "embed", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "feed", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "graph", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "labeler", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "notification", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "richtext", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "unspecced", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.actor = new cp(e), this.embed = new fp(e), this.feed = new dp(e), this.graph = new xp(e), this.labeler = new wp(e), this.notification = new Cp(e), this.richtext = new Lp(e), this.unspecced = new Sp(e);
  }
}
c.AppBskyNS = up;
class cp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "profile", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.profile = new pp(e);
  }
  getPreferences(e, r) {
    return this._service.xrpc.call("app.bsky.actor.getPreferences", e, void 0, r).catch((n) => {
      throw yT.toKnownErr(n);
    });
  }
  getProfile(e, r) {
    return this._service.xrpc.call("app.bsky.actor.getProfile", e, void 0, r).catch((n) => {
      throw hT.toKnownErr(n);
    });
  }
  getProfiles(e, r) {
    return this._service.xrpc.call("app.bsky.actor.getProfiles", e, void 0, r).catch((n) => {
      throw ET.toKnownErr(n);
    });
  }
  getSuggestions(e, r) {
    return this._service.xrpc.call("app.bsky.actor.getSuggestions", e, void 0, r).catch((n) => {
      throw xT.toKnownErr(n);
    });
  }
  putPreferences(e, r) {
    return this._service.xrpc.call("app.bsky.actor.putPreferences", r?.qp, e, r).catch((n) => {
      throw gT.toKnownErr(n);
    });
  }
  searchActors(e, r) {
    return this._service.xrpc.call("app.bsky.actor.searchActors", e, void 0, r).catch((n) => {
      throw RT.toKnownErr(n);
    });
  }
  searchActorsTypeahead(e, r) {
    return this._service.xrpc.call("app.bsky.actor.searchActorsTypeahead", e, void 0, r).catch((n) => {
      throw AT.toKnownErr(n);
    });
  }
}
c.AppBskyActorNS = cp;
class pp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.actor.profile",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.actor.profile",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.actor.profile", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.actor.profile", rkey: "self", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.actor.profile", ...e }, { headers: r });
  }
}
c.ProfileRecord = pp;
class fp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
}
c.AppBskyEmbedNS = fp;
class dp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "generator", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "like", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "post", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "repost", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "threadgate", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.generator = new bp(e), this.like = new mp(e), this.post = new yp(e), this.repost = new hp(e), this.threadgate = new Ep(e);
  }
  describeFeedGenerator(e, r) {
    return this._service.xrpc.call("app.bsky.feed.describeFeedGenerator", e, void 0, r).catch((n) => {
      throw vT.toKnownErr(n);
    });
  }
  getActorFeeds(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getActorFeeds", e, void 0, r).catch((n) => {
      throw _T.toKnownErr(n);
    });
  }
  getActorLikes(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getActorLikes", e, void 0, r).catch((n) => {
      throw wT.toKnownErr(n);
    });
  }
  getAuthorFeed(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getAuthorFeed", e, void 0, r).catch((n) => {
      throw TT.toKnownErr(n);
    });
  }
  getFeed(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getFeed", e, void 0, r).catch((n) => {
      throw CT.toKnownErr(n);
    });
  }
  getFeedGenerator(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getFeedGenerator", e, void 0, r).catch((n) => {
      throw LT.toKnownErr(n);
    });
  }
  getFeedGenerators(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getFeedGenerators", e, void 0, r).catch((n) => {
      throw ST.toKnownErr(n);
    });
  }
  getFeedSkeleton(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getFeedSkeleton", e, void 0, r).catch((n) => {
      throw kT.toKnownErr(n);
    });
  }
  getLikes(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getLikes", e, void 0, r).catch((n) => {
      throw BT.toKnownErr(n);
    });
  }
  getListFeed(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getListFeed", e, void 0, r).catch((n) => {
      throw DT.toKnownErr(n);
    });
  }
  getPostThread(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getPostThread", e, void 0, r).catch((n) => {
      throw PT.toKnownErr(n);
    });
  }
  getPosts(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getPosts", e, void 0, r).catch((n) => {
      throw KT.toKnownErr(n);
    });
  }
  getRepostedBy(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getRepostedBy", e, void 0, r).catch((n) => {
      throw UT.toKnownErr(n);
    });
  }
  getSuggestedFeeds(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getSuggestedFeeds", e, void 0, r).catch((n) => {
      throw VT.toKnownErr(n);
    });
  }
  getTimeline(e, r) {
    return this._service.xrpc.call("app.bsky.feed.getTimeline", e, void 0, r).catch((n) => {
      throw IT.toKnownErr(n);
    });
  }
  searchPosts(e, r) {
    return this._service.xrpc.call("app.bsky.feed.searchPosts", e, void 0, r).catch((n) => {
      throw OT.toKnownErr(n);
    });
  }
  sendInteractions(e, r) {
    return this._service.xrpc.call("app.bsky.feed.sendInteractions", r?.qp, e, r).catch((n) => {
      throw jT.toKnownErr(n);
    });
  }
}
c.AppBskyFeedNS = dp;
class bp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.generator",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.generator",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.feed.generator", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.generator", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.generator", ...e }, { headers: r });
  }
}
c.GeneratorRecord = bp;
class mp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.like",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.like",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.feed.like", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.like", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.like", ...e }, { headers: r });
  }
}
c.LikeRecord = mp;
class yp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.post",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.post",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.feed.post", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.post", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.post", ...e }, { headers: r });
  }
}
c.PostRecord = yp;
class hp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.repost",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.repost",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.feed.repost", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.repost", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.repost", ...e }, { headers: r });
  }
}
c.RepostRecord = hp;
class Ep {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.feed.threadgate",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.feed.threadgate",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.feed.threadgate", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.threadgate", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.threadgate", ...e }, { headers: r });
  }
}
c.ThreadgateRecord = Ep;
class xp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "block", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "follow", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "list", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "listblock", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "listitem", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.block = new gp(e), this.follow = new Rp(e), this.list = new Ap(e), this.listblock = new vp(e), this.listitem = new _p(e);
  }
  getBlocks(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getBlocks", e, void 0, r).catch((n) => {
      throw NT.toKnownErr(n);
    });
  }
  getFollowers(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getFollowers", e, void 0, r).catch((n) => {
      throw $T.toKnownErr(n);
    });
  }
  getFollows(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getFollows", e, void 0, r).catch((n) => {
      throw MT.toKnownErr(n);
    });
  }
  getList(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getList", e, void 0, r).catch((n) => {
      throw GT.toKnownErr(n);
    });
  }
  getListBlocks(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getListBlocks", e, void 0, r).catch((n) => {
      throw qT.toKnownErr(n);
    });
  }
  getListMutes(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getListMutes", e, void 0, r).catch((n) => {
      throw XT.toKnownErr(n);
    });
  }
  getLists(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getLists", e, void 0, r).catch((n) => {
      throw zT.toKnownErr(n);
    });
  }
  getMutes(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getMutes", e, void 0, r).catch((n) => {
      throw FT.toKnownErr(n);
    });
  }
  getRelationships(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getRelationships", e, void 0, r).catch((n) => {
      throw ZT.toKnownErr(n);
    });
  }
  getSuggestedFollowsByActor(e, r) {
    return this._service.xrpc.call("app.bsky.graph.getSuggestedFollowsByActor", e, void 0, r).catch((n) => {
      throw HT.toKnownErr(n);
    });
  }
  muteActor(e, r) {
    return this._service.xrpc.call("app.bsky.graph.muteActor", r?.qp, e, r).catch((n) => {
      throw WT.toKnownErr(n);
    });
  }
  muteActorList(e, r) {
    return this._service.xrpc.call("app.bsky.graph.muteActorList", r?.qp, e, r).catch((n) => {
      throw JT.toKnownErr(n);
    });
  }
  unmuteActor(e, r) {
    return this._service.xrpc.call("app.bsky.graph.unmuteActor", r?.qp, e, r).catch((n) => {
      throw QT.toKnownErr(n);
    });
  }
  unmuteActorList(e, r) {
    return this._service.xrpc.call("app.bsky.graph.unmuteActorList", r?.qp, e, r).catch((n) => {
      throw YT.toKnownErr(n);
    });
  }
}
c.AppBskyGraphNS = xp;
class gp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.block",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.block",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.graph.block", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.block", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.block", ...e }, { headers: r });
  }
}
c.BlockRecord = gp;
class Rp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.follow",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.follow",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.graph.follow", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.follow", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.follow", ...e }, { headers: r });
  }
}
c.FollowRecord = Rp;
class Ap {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.list",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.list",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.graph.list", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.list", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.list", ...e }, { headers: r });
  }
}
c.ListRecord = Ap;
class vp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.listblock",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.listblock",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.graph.listblock", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listblock", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listblock", ...e }, { headers: r });
  }
}
c.ListblockRecord = vp;
class _p {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.graph.listitem",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.graph.listitem",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.graph.listitem", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listitem", ...e, record: r }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listitem", ...e }, { headers: r });
  }
}
c.ListitemRecord = _p;
class wp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.service = new Tp(e);
  }
  getServices(e, r) {
    return this._service.xrpc.call("app.bsky.labeler.getServices", e, void 0, r).catch((n) => {
      throw eC.toKnownErr(n);
    });
  }
}
c.AppBskyLabelerNS = wp;
class Tp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  async list(e) {
    return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
      collection: "app.bsky.labeler.service",
      ...e
    })).data;
  }
  async get(e) {
    return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
      collection: "app.bsky.labeler.service",
      ...e
    })).data;
  }
  async create(e, r, n) {
    return r.$type = "app.bsky.labeler.service", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, {
      collection: "app.bsky.labeler.service",
      rkey: "self",
      ...e,
      record: r
    }, { encoding: "application/json", headers: n })).data;
  }
  async delete(e, r) {
    await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.labeler.service", ...e }, { headers: r });
  }
}
c.ServiceRecord = Tp;
class Cp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  getUnreadCount(e, r) {
    return this._service.xrpc.call("app.bsky.notification.getUnreadCount", e, void 0, r).catch((n) => {
      throw tC.toKnownErr(n);
    });
  }
  listNotifications(e, r) {
    return this._service.xrpc.call("app.bsky.notification.listNotifications", e, void 0, r).catch((n) => {
      throw rC.toKnownErr(n);
    });
  }
  registerPush(e, r) {
    return this._service.xrpc.call("app.bsky.notification.registerPush", r?.qp, e, r).catch((n) => {
      throw iC.toKnownErr(n);
    });
  }
  updateSeen(e, r) {
    return this._service.xrpc.call("app.bsky.notification.updateSeen", r?.qp, e, r).catch((n) => {
      throw nC.toKnownErr(n);
    });
  }
}
c.AppBskyNotificationNS = Cp;
class Lp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
}
c.AppBskyRichtextNS = Lp;
class Sp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  getPopularFeedGenerators(e, r) {
    return this._service.xrpc.call("app.bsky.unspecced.getPopularFeedGenerators", e, void 0, r).catch((n) => {
      throw sC.toKnownErr(n);
    });
  }
  getSuggestionsSkeleton(e, r) {
    return this._service.xrpc.call("app.bsky.unspecced.getSuggestionsSkeleton", e, void 0, r).catch((n) => {
      throw aC.toKnownErr(n);
    });
  }
  getTaggedSuggestions(e, r) {
    return this._service.xrpc.call("app.bsky.unspecced.getTaggedSuggestions", e, void 0, r).catch((n) => {
      throw oC.toKnownErr(n);
    });
  }
  searchActorsSkeleton(e, r) {
    return this._service.xrpc.call("app.bsky.unspecced.searchActorsSkeleton", e, void 0, r).catch((n) => {
      throw lC.toKnownErr(n);
    });
  }
  searchPostsSkeleton(e, r) {
    return this._service.xrpc.call("app.bsky.unspecced.searchPostsSkeleton", e, void 0, r).catch((n) => {
      throw uC.toKnownErr(n);
    });
  }
}
c.AppBskyUnspeccedNS = Sp;
class kp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "ozone", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.ozone = new Bp(e);
  }
}
c.ToolsNS = kp;
class Bp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "communication", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "moderation", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e, this.communication = new Dp(e), this.moderation = new Pp(e);
  }
}
c.ToolsOzoneNS = Bp;
class Dp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  createTemplate(e, r) {
    return this._service.xrpc.call("tools.ozone.communication.createTemplate", r?.qp, e, r).catch((n) => {
      throw cC.toKnownErr(n);
    });
  }
  deleteTemplate(e, r) {
    return this._service.xrpc.call("tools.ozone.communication.deleteTemplate", r?.qp, e, r).catch((n) => {
      throw pC.toKnownErr(n);
    });
  }
  listTemplates(e, r) {
    return this._service.xrpc.call("tools.ozone.communication.listTemplates", e, void 0, r).catch((n) => {
      throw fC.toKnownErr(n);
    });
  }
  updateTemplate(e, r) {
    return this._service.xrpc.call("tools.ozone.communication.updateTemplate", r?.qp, e, r).catch((n) => {
      throw dC.toKnownErr(n);
    });
  }
}
c.ToolsOzoneCommunicationNS = Dp;
class Pp {
  constructor(e) {
    Object.defineProperty(this, "_service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this._service = e;
  }
  emitEvent(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.emitEvent", r?.qp, e, r).catch((n) => {
      throw bC.toKnownErr(n);
    });
  }
  getEvent(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.getEvent", e, void 0, r).catch((n) => {
      throw mC.toKnownErr(n);
    });
  }
  getRecord(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.getRecord", e, void 0, r).catch((n) => {
      throw yC.toKnownErr(n);
    });
  }
  getRepo(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.getRepo", e, void 0, r).catch((n) => {
      throw hC.toKnownErr(n);
    });
  }
  queryEvents(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.queryEvents", e, void 0, r).catch((n) => {
      throw EC.toKnownErr(n);
    });
  }
  queryStatuses(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.queryStatuses", e, void 0, r).catch((n) => {
      throw xC.toKnownErr(n);
    });
  }
  searchRepos(e, r) {
    return this._service.xrpc.call("tools.ozone.moderation.searchRepos", e, void 0, r).catch((n) => {
      throw gC.toKnownErr(n);
    });
  }
}
c.ToolsOzoneModerationNS = Pp;
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.AtpAgent = void 0;
const AC = C, zs = C, xl = tr, vC = c, _C = ji, wC = 10, TC = "com.atproto.server.refreshSession";
class Ve {
  get com() {
    return this.api.com;
  }
  /**
   * Configures the API globally.
   */
  static configure(e) {
    e.fetch && (Ve.fetch = e.fetch), e.appLabelers && (Ve.appLabelers = e.appLabelers);
  }
  constructor(e) {
    Object.defineProperty(this, "service", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "api", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "session", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "labelersHeader", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "proxyHeader", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "pdsUrl", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_baseClient", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_persistSession", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_refreshSessionPromise", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "uploadBlob", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (r, n) => this.api.com.atproto.repo.uploadBlob(r, n)
    }), Object.defineProperty(this, "resolveHandle", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (r, n) => this.api.com.atproto.identity.resolveHandle(r, n)
    }), Object.defineProperty(this, "updateHandle", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (r, n) => this.api.com.atproto.identity.updateHandle(r, n)
    }), Object.defineProperty(this, "createModerationReport", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (r, n) => this.api.com.atproto.moderation.createReport(r, n)
    }), this.service = e.service instanceof URL ? e.service : new URL(e.service), this._persistSession = e.persistSession, this._baseClient = new vC.AtpBaseClient(), this._baseClient.xrpc.fetch = this._fetch.bind(this), this.api = this._baseClient.service(e.service);
  }
  clone() {
    const e = new Ve({
      service: this.service
    });
    return this.copyInto(e), e;
  }
  copyInto(e) {
    e.session = this.session, e.labelersHeader = this.labelersHeader, e.proxyHeader = this.proxyHeader, e.pdsUrl = this.pdsUrl, e.api.xrpc.uri = this.pdsUrl || this.service;
  }
  withProxy(e, r) {
    const n = this.clone();
    return n.configureProxyHeader(e, r), n;
  }
  /**
   * Is there any active session?
   */
  get hasSession() {
    return !!this.session;
  }
  /**
   * Sets the "Persist Session" method which can be used to store access tokens
   * as they change.
   */
  setPersistSessionHandler(e) {
    this._persistSession = e;
  }
  /**
   * Configures the moderation services to be applied on requests.
   * NOTE: this is called automatically by getPreferences() and the relevant moderation config
   * methods in BskyAgent instances.
   */
  configureLabelersHeader(e) {
    this.labelersHeader = e;
  }
  /**
   * Configures the atproto-proxy header to be applied on requests
   */
  configureProxyHeader(e, r) {
    r.startsWith("did:") && (this.proxyHeader = `${r}#${e}`);
  }
  /**
   * Create a new account and hydrate its session in this agent.
   */
  async createAccount(e) {
    try {
      const r = await this.api.com.atproto.server.createAccount(e);
      return this.session = {
        accessJwt: r.data.accessJwt,
        refreshJwt: r.data.refreshJwt,
        handle: r.data.handle,
        did: r.data.did,
        email: e.email,
        emailConfirmed: !1,
        emailAuthFactor: !1
      }, this._updateApiEndpoint(r.data.didDoc), r;
    } catch (r) {
      throw this.session = void 0, r;
    } finally {
      this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
    }
  }
  /**
   * Start a new session with this agent.
   */
  async login(e) {
    try {
      const r = await this.api.com.atproto.server.createSession({
        identifier: e.identifier,
        password: e.password,
        authFactorToken: e.authFactorToken
      });
      return this.session = {
        accessJwt: r.data.accessJwt,
        refreshJwt: r.data.refreshJwt,
        handle: r.data.handle,
        did: r.data.did,
        email: r.data.email,
        emailConfirmed: r.data.emailConfirmed,
        emailAuthFactor: r.data.emailAuthFactor
      }, this._updateApiEndpoint(r.data.didDoc), r;
    } catch (r) {
      throw this.session = void 0, r;
    } finally {
      this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
    }
  }
  /**
   * Resume a pre-existing session with this agent.
   */
  async resumeSession(e) {
    try {
      this.session = e;
      const r = await this.api.com.atproto.server.getSession();
      if (r.data.did !== this.session.did)
        throw new zs.XRPCError(zs.ResponseType.InvalidRequest, "Invalid session", "InvalidDID");
      return this.session.email = r.data.email, this.session.handle = r.data.handle, this.session.emailConfirmed = r.data.emailConfirmed, this.session.emailAuthFactor = r.data.emailAuthFactor, this._updateApiEndpoint(r.data.didDoc), this._persistSession?.("update", this.session), r;
    } catch (r) {
      throw this.session = void 0, r instanceof zs.XRPCError ? [1, 408, 425, 429, 500, 502, 503, 504, 522, 524].includes(r.status) ? this._persistSession?.("network-error", void 0) : this._persistSession?.("expired", void 0) : this._persistSession?.("network-error", void 0), r;
    }
  }
  /**
   * Internal helper to add authorization headers to requests.
   */
  _addHeaders(e) {
    return !e.authorization && this.session?.accessJwt && (e = {
      ...e,
      authorization: `Bearer ${this.session.accessJwt}`
    }), this.proxyHeader && (e = {
      ...e,
      "atproto-proxy": this.proxyHeader
    }), e = {
      ...e,
      "atproto-accept-labelers": Ve.appLabelers.map((r) => `${r};redact`).concat(this.labelersHeader.filter((r) => r.startsWith("did:"))).slice(0, wC).join(", ")
    }, e;
  }
  /**
   * Internal fetch handler which adds access-token management
   */
  async _fetch(e, r, n, s) {
    if (!Ve.fetch)
      throw new Error("AtpAgent fetch() method not configured");
    await this._refreshSessionPromise;
    let u = await Ve.fetch(e, r, this._addHeaders(n), s);
    return gl(u, ["ExpiredToken"]) && this.session?.refreshJwt && (await this.refreshSession(), u = await Ve.fetch(e, r, this._addHeaders(n), s)), u;
  }
  /**
   * Internal helper to refresh sessions
   * - Wraps the actual implementation in a promise-guard to ensure only
   *   one refresh is attempted at a time.
   */
  async refreshSession() {
    if (this._refreshSessionPromise)
      return this._refreshSessionPromise;
    this._refreshSessionPromise = this._refreshSessionInner();
    try {
      await this._refreshSessionPromise;
    } finally {
      this._refreshSessionPromise = void 0;
    }
  }
  /**
   * Internal helper to refresh sessions (actual behavior)
   */
  async _refreshSessionInner() {
    if (!Ve.fetch)
      throw new Error("AtpAgent fetch() method not configured");
    if (!this.session?.refreshJwt)
      return;
    const e = new URL((this.pdsUrl || this.service).origin);
    e.pathname = `/xrpc/${TC}`;
    const r = await Ve.fetch(e.toString(), "POST", {
      authorization: `Bearer ${this.session.refreshJwt}`
    }, void 0);
    gl(r, ["ExpiredToken", "InvalidToken"]) ? (this.session = void 0, this._persistSession?.("expired", void 0)) : LC(this._baseClient, r.body) && (this.session = {
      ...this.session || {},
      accessJwt: r.body.accessJwt,
      refreshJwt: r.body.refreshJwt,
      handle: r.body.handle,
      did: r.body.did
    }, this._updateApiEndpoint(r.body.didDoc), this._persistSession?.("update", this.session));
  }
  /**
   * Helper to update the pds endpoint dynamically.
   *
   * The session methods (create, resume, refresh) may respond with the user's
   * did document which contains the user's canonical PDS endpoint. That endpoint
   * may differ from the endpoint used to contact the server. We capture that
   * PDS endpoint and update the client to use that given endpoint for future
   * requests. (This helps ensure smooth migrations between PDSes, especially
   * when the PDSes are operated by a single org.)
   */
  _updateApiEndpoint(e) {
    if ((0, xl.isValidDidDoc)(e)) {
      const r = (0, xl.getPdsEndpoint)(e);
      this.pdsUrl = r ? new URL(r) : void 0;
    }
    this.api.xrpc.uri = this.pdsUrl || this.service;
  }
}
ni.AtpAgent = Ve;
Object.defineProperty(Ve, "fetch", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: zs.defaultFetchHandler
});
Object.defineProperty(Ve, "appLabelers", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: [_C.BSKY_LABELER_DID]
});
function CC(t) {
  return AC.errorResponseBody.safeParse(t).success;
}
function gl(t, e) {
  return t.status !== 400 || !CC(t.body) ? !1 : typeof t.body.error == "string" && e.includes(t.body.error);
}
function LC(t, e) {
  try {
    return t.xrpc.lex.assertValidXrpcOutput("com.atproto.server.refreshSession", e), !0;
  } catch {
    return !1;
  }
}
var si = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.UnicodeString = void 0;
const SC = tr, Rl = new TextEncoder(), kC = new TextDecoder();
class BC {
  constructor(e) {
    Object.defineProperty(this, "utf16", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "utf8", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_graphemeLen", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.utf16 = e, this.utf8 = Rl.encode(e);
  }
  get length() {
    return this.utf8.byteLength;
  }
  get graphemeLength() {
    return this._graphemeLen || (this._graphemeLen = (0, SC.graphemeLen)(this.utf16)), this._graphemeLen;
  }
  slice(e, r) {
    return kC.decode(this.utf8.slice(e, r));
  }
  utf16IndexToUtf8Index(e) {
    return Rl.encode(this.utf16.slice(0, e)).byteLength;
  }
  toString() {
    return this.utf16;
  }
}
ui.UnicodeString = BC;
var ks = {};
Object.defineProperty(ks, "__esModule", { value: !0 });
ks.sanitizeRichText = void 0;
const DC = ui, PC = /[\r\n]([\u00AD\u2060\u200D\u200C\u200B\s]*[\r\n]){2,}/, KC = `

`;
function UC(t, e) {
  return e.cleanNewlines && (t = VC(t, PC, KC)), t;
}
ks.sanitizeRichText = UC;
function VC(t, e, r) {
  t = t.clone();
  let n = t.unicodeText.utf16.match(e);
  for (; n && typeof n.index < "u"; ) {
    const s = t.unicodeText, u = t.unicodeText.utf16IndexToUtf8Index(n.index), l = u + new DC.UnicodeString(n[0]).length;
    if (t.delete(u, l), t.unicodeText.utf16 === s.utf16)
      break;
    t.insert(u, r), n = t.unicodeText.utf16.match(e);
  }
  return t;
}
var _a = {};
const IC = [
  "aaa",
  "aarp",
  "abb",
  "abbott",
  "abbvie",
  "abc",
  "able",
  "abogado",
  "abudhabi",
  "ac",
  "academy",
  "accenture",
  "accountant",
  "accountants",
  "aco",
  "actor",
  "ad",
  "ads",
  "adult",
  "ae",
  "aeg",
  "aero",
  "aetna",
  "af",
  "afl",
  "africa",
  "ag",
  "agakhan",
  "agency",
  "ai",
  "aig",
  "airbus",
  "airforce",
  "airtel",
  "akdn",
  "al",
  "alibaba",
  "alipay",
  "allfinanz",
  "allstate",
  "ally",
  "alsace",
  "alstom",
  "am",
  "amazon",
  "americanexpress",
  "americanfamily",
  "amex",
  "amfam",
  "amica",
  "amsterdam",
  "analytics",
  "android",
  "anquan",
  "anz",
  "ao",
  "aol",
  "apartments",
  "app",
  "apple",
  "aq",
  "aquarelle",
  "ar",
  "arab",
  "aramco",
  "archi",
  "army",
  "arpa",
  "art",
  "arte",
  "as",
  "asda",
  "asia",
  "associates",
  "at",
  "athleta",
  "attorney",
  "au",
  "auction",
  "audi",
  "audible",
  "audio",
  "auspost",
  "author",
  "auto",
  "autos",
  "aw",
  "aws",
  "ax",
  "axa",
  "az",
  "azure",
  "ba",
  "baby",
  "baidu",
  "banamex",
  "band",
  "bank",
  "bar",
  "barcelona",
  "barclaycard",
  "barclays",
  "barefoot",
  "bargains",
  "baseball",
  "basketball",
  "bauhaus",
  "bayern",
  "bb",
  "bbc",
  "bbt",
  "bbva",
  "bcg",
  "bcn",
  "bd",
  "be",
  "beats",
  "beauty",
  "beer",
  "bentley",
  "berlin",
  "best",
  "bestbuy",
  "bet",
  "bf",
  "bg",
  "bh",
  "bharti",
  "bi",
  "bible",
  "bid",
  "bike",
  "bing",
  "bingo",
  "bio",
  "biz",
  "bj",
  "black",
  "blackfriday",
  "blockbuster",
  "blog",
  "bloomberg",
  "blue",
  "bm",
  "bms",
  "bmw",
  "bn",
  "bnpparibas",
  "bo",
  "boats",
  "boehringer",
  "bofa",
  "bom",
  "bond",
  "boo",
  "book",
  "booking",
  "bosch",
  "bostik",
  "boston",
  "bot",
  "boutique",
  "box",
  "br",
  "bradesco",
  "bridgestone",
  "broadway",
  "broker",
  "brother",
  "brussels",
  "bs",
  "bt",
  "build",
  "builders",
  "business",
  "buy",
  "buzz",
  "bv",
  "bw",
  "by",
  "bz",
  "bzh",
  "ca",
  "cab",
  "cafe",
  "cal",
  "call",
  "calvinklein",
  "cam",
  "camera",
  "camp",
  "canon",
  "capetown",
  "capital",
  "capitalone",
  "car",
  "caravan",
  "cards",
  "care",
  "career",
  "careers",
  "cars",
  "casa",
  "case",
  "cash",
  "casino",
  "cat",
  "catering",
  "catholic",
  "cba",
  "cbn",
  "cbre",
  "cc",
  "cd",
  "center",
  "ceo",
  "cern",
  "cf",
  "cfa",
  "cfd",
  "cg",
  "ch",
  "chanel",
  "channel",
  "charity",
  "chase",
  "chat",
  "cheap",
  "chintai",
  "christmas",
  "chrome",
  "church",
  "ci",
  "cipriani",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citic",
  "city",
  "ck",
  "cl",
  "claims",
  "cleaning",
  "click",
  "clinic",
  "clinique",
  "clothing",
  "cloud",
  "club",
  "clubmed",
  "cm",
  "cn",
  "co",
  "coach",
  "codes",
  "coffee",
  "college",
  "cologne",
  "com",
  "commbank",
  "community",
  "company",
  "compare",
  "computer",
  "comsec",
  "condos",
  "construction",
  "consulting",
  "contact",
  "contractors",
  "cooking",
  "cool",
  "coop",
  "corsica",
  "country",
  "coupon",
  "coupons",
  "courses",
  "cpa",
  "cr",
  "credit",
  "creditcard",
  "creditunion",
  "cricket",
  "crown",
  "crs",
  "cruise",
  "cruises",
  "cu",
  "cuisinella",
  "cv",
  "cw",
  "cx",
  "cy",
  "cymru",
  "cyou",
  "cz",
  "dabur",
  "dad",
  "dance",
  "data",
  "date",
  "dating",
  "datsun",
  "day",
  "dclk",
  "dds",
  "de",
  "deal",
  "dealer",
  "deals",
  "degree",
  "delivery",
  "dell",
  "deloitte",
  "delta",
  "democrat",
  "dental",
  "dentist",
  "desi",
  "design",
  "dev",
  "dhl",
  "diamonds",
  "diet",
  "digital",
  "direct",
  "directory",
  "discount",
  "discover",
  "dish",
  "diy",
  "dj",
  "dk",
  "dm",
  "dnp",
  "do",
  "docs",
  "doctor",
  "dog",
  "domains",
  "dot",
  "download",
  "drive",
  "dtv",
  "dubai",
  "dunlop",
  "dupont",
  "durban",
  "dvag",
  "dvr",
  "dz",
  "earth",
  "eat",
  "ec",
  "eco",
  "edeka",
  "edu",
  "education",
  "ee",
  "eg",
  "email",
  "emerck",
  "energy",
  "engineer",
  "engineering",
  "enterprises",
  "epson",
  "equipment",
  "er",
  "ericsson",
  "erni",
  "es",
  "esq",
  "estate",
  "et",
  "eu",
  "eurovision",
  "eus",
  "events",
  "exchange",
  "expert",
  "exposed",
  "express",
  "extraspace",
  "fage",
  "fail",
  "fairwinds",
  "faith",
  "family",
  "fan",
  "fans",
  "farm",
  "farmers",
  "fashion",
  "fast",
  "fedex",
  "feedback",
  "ferrari",
  "ferrero",
  "fi",
  "fidelity",
  "fido",
  "film",
  "final",
  "finance",
  "financial",
  "fire",
  "firestone",
  "firmdale",
  "fish",
  "fishing",
  "fit",
  "fitness",
  "fj",
  "fk",
  "flickr",
  "flights",
  "flir",
  "florist",
  "flowers",
  "fly",
  "fm",
  "fo",
  "foo",
  "food",
  "football",
  "ford",
  "forex",
  "forsale",
  "forum",
  "foundation",
  "fox",
  "fr",
  "free",
  "fresenius",
  "frl",
  "frogans",
  "frontier",
  "ftr",
  "fujitsu",
  "fun",
  "fund",
  "furniture",
  "futbol",
  "fyi",
  "ga",
  "gal",
  "gallery",
  "gallo",
  "gallup",
  "game",
  "games",
  "gap",
  "garden",
  "gay",
  "gb",
  "gbiz",
  "gd",
  "gdn",
  "ge",
  "gea",
  "gent",
  "genting",
  "george",
  "gf",
  "gg",
  "ggee",
  "gh",
  "gi",
  "gift",
  "gifts",
  "gives",
  "giving",
  "gl",
  "glass",
  "gle",
  "global",
  "globo",
  "gm",
  "gmail",
  "gmbh",
  "gmo",
  "gmx",
  "gn",
  "godaddy",
  "gold",
  "goldpoint",
  "golf",
  "goo",
  "goodyear",
  "goog",
  "google",
  "gop",
  "got",
  "gov",
  "gp",
  "gq",
  "gr",
  "grainger",
  "graphics",
  "gratis",
  "green",
  "gripe",
  "grocery",
  "group",
  "gs",
  "gt",
  "gu",
  "gucci",
  "guge",
  "guide",
  "guitars",
  "guru",
  "gw",
  "gy",
  "hair",
  "hamburg",
  "hangout",
  "haus",
  "hbo",
  "hdfc",
  "hdfcbank",
  "health",
  "healthcare",
  "help",
  "helsinki",
  "here",
  "hermes",
  "hiphop",
  "hisamitsu",
  "hitachi",
  "hiv",
  "hk",
  "hkt",
  "hm",
  "hn",
  "hockey",
  "holdings",
  "holiday",
  "homedepot",
  "homegoods",
  "homes",
  "homesense",
  "honda",
  "horse",
  "hospital",
  "host",
  "hosting",
  "hot",
  "hotels",
  "hotmail",
  "house",
  "how",
  "hr",
  "hsbc",
  "ht",
  "hu",
  "hughes",
  "hyatt",
  "hyundai",
  "ibm",
  "icbc",
  "ice",
  "icu",
  "id",
  "ie",
  "ieee",
  "ifm",
  "ikano",
  "il",
  "im",
  "imamat",
  "imdb",
  "immo",
  "immobilien",
  "in",
  "inc",
  "industries",
  "infiniti",
  "info",
  "ing",
  "ink",
  "institute",
  "insurance",
  "insure",
  "int",
  "international",
  "intuit",
  "investments",
  "io",
  "ipiranga",
  "iq",
  "ir",
  "irish",
  "is",
  "ismaili",
  "ist",
  "istanbul",
  "it",
  "itau",
  "itv",
  "jaguar",
  "java",
  "jcb",
  "je",
  "jeep",
  "jetzt",
  "jewelry",
  "jio",
  "jll",
  "jm",
  "jmp",
  "jnj",
  "jo",
  "jobs",
  "joburg",
  "jot",
  "joy",
  "jp",
  "jpmorgan",
  "jprs",
  "juegos",
  "juniper",
  "kaufen",
  "kddi",
  "ke",
  "kerryhotels",
  "kerrylogistics",
  "kerryproperties",
  "kfh",
  "kg",
  "kh",
  "ki",
  "kia",
  "kids",
  "kim",
  "kindle",
  "kitchen",
  "kiwi",
  "km",
  "kn",
  "koeln",
  "komatsu",
  "kosher",
  "kp",
  "kpmg",
  "kpn",
  "kr",
  "krd",
  "kred",
  "kuokgroup",
  "kw",
  "ky",
  "kyoto",
  "kz",
  "la",
  "lacaixa",
  "lamborghini",
  "lamer",
  "lancaster",
  "land",
  "landrover",
  "lanxess",
  "lasalle",
  "lat",
  "latino",
  "latrobe",
  "law",
  "lawyer",
  "lb",
  "lc",
  "lds",
  "lease",
  "leclerc",
  "lefrak",
  "legal",
  "lego",
  "lexus",
  "lgbt",
  "li",
  "lidl",
  "life",
  "lifeinsurance",
  "lifestyle",
  "lighting",
  "like",
  "lilly",
  "limited",
  "limo",
  "lincoln",
  "link",
  "lipsy",
  "live",
  "living",
  "lk",
  "llc",
  "llp",
  "loan",
  "loans",
  "locker",
  "locus",
  "lol",
  "london",
  "lotte",
  "lotto",
  "love",
  "lpl",
  "lplfinancial",
  "lr",
  "ls",
  "lt",
  "ltd",
  "ltda",
  "lu",
  "lundbeck",
  "luxe",
  "luxury",
  "lv",
  "ly",
  "ma",
  "madrid",
  "maif",
  "maison",
  "makeup",
  "man",
  "management",
  "mango",
  "map",
  "market",
  "marketing",
  "markets",
  "marriott",
  "marshalls",
  "mattel",
  "mba",
  "mc",
  "mckinsey",
  "md",
  "me",
  "med",
  "media",
  "meet",
  "melbourne",
  "meme",
  "memorial",
  "men",
  "menu",
  "merckmsd",
  "mg",
  "mh",
  "miami",
  "microsoft",
  "mil",
  "mini",
  "mint",
  "mit",
  "mitsubishi",
  "mk",
  "ml",
  "mlb",
  "mls",
  "mm",
  "mma",
  "mn",
  "mo",
  "mobi",
  "mobile",
  "moda",
  "moe",
  "moi",
  "mom",
  "monash",
  "money",
  "monster",
  "mormon",
  "mortgage",
  "moscow",
  "moto",
  "motorcycles",
  "mov",
  "movie",
  "mp",
  "mq",
  "mr",
  "ms",
  "msd",
  "mt",
  "mtn",
  "mtr",
  "mu",
  "museum",
  "music",
  "mv",
  "mw",
  "mx",
  "my",
  "mz",
  "na",
  "nab",
  "nagoya",
  "name",
  "natura",
  "navy",
  "nba",
  "nc",
  "ne",
  "nec",
  "net",
  "netbank",
  "netflix",
  "network",
  "neustar",
  "new",
  "news",
  "next",
  "nextdirect",
  "nexus",
  "nf",
  "nfl",
  "ng",
  "ngo",
  "nhk",
  "ni",
  "nico",
  "nike",
  "nikon",
  "ninja",
  "nissan",
  "nissay",
  "nl",
  "no",
  "nokia",
  "norton",
  "now",
  "nowruz",
  "nowtv",
  "np",
  "nr",
  "nra",
  "nrw",
  "ntt",
  "nu",
  "nyc",
  "nz",
  "obi",
  "observer",
  "office",
  "okinawa",
  "olayan",
  "olayangroup",
  "ollo",
  "om",
  "omega",
  "one",
  "ong",
  "onl",
  "online",
  "ooo",
  "open",
  "oracle",
  "orange",
  "org",
  "organic",
  "origins",
  "osaka",
  "otsuka",
  "ott",
  "ovh",
  "pa",
  "page",
  "panasonic",
  "paris",
  "pars",
  "partners",
  "parts",
  "party",
  "pay",
  "pccw",
  "pe",
  "pet",
  "pf",
  "pfizer",
  "pg",
  "ph",
  "pharmacy",
  "phd",
  "philips",
  "phone",
  "photo",
  "photography",
  "photos",
  "physio",
  "pics",
  "pictet",
  "pictures",
  "pid",
  "pin",
  "ping",
  "pink",
  "pioneer",
  "pizza",
  "pk",
  "pl",
  "place",
  "play",
  "playstation",
  "plumbing",
  "plus",
  "pm",
  "pn",
  "pnc",
  "pohl",
  "poker",
  "politie",
  "porn",
  "post",
  "pr",
  "pramerica",
  "praxi",
  "press",
  "prime",
  "pro",
  "prod",
  "productions",
  "prof",
  "progressive",
  "promo",
  "properties",
  "property",
  "protection",
  "pru",
  "prudential",
  "ps",
  "pt",
  "pub",
  "pw",
  "pwc",
  "py",
  "qa",
  "qpon",
  "quebec",
  "quest",
  "racing",
  "radio",
  "re",
  "read",
  "realestate",
  "realtor",
  "realty",
  "recipes",
  "red",
  "redstone",
  "redumbrella",
  "rehab",
  "reise",
  "reisen",
  "reit",
  "reliance",
  "ren",
  "rent",
  "rentals",
  "repair",
  "report",
  "republican",
  "rest",
  "restaurant",
  "review",
  "reviews",
  "rexroth",
  "rich",
  "richardli",
  "ricoh",
  "ril",
  "rio",
  "rip",
  "ro",
  "rocks",
  "rodeo",
  "rogers",
  "room",
  "rs",
  "rsvp",
  "ru",
  "rugby",
  "ruhr",
  "run",
  "rw",
  "rwe",
  "ryukyu",
  "sa",
  "saarland",
  "safe",
  "safety",
  "sakura",
  "sale",
  "salon",
  "samsclub",
  "samsung",
  "sandvik",
  "sandvikcoromant",
  "sanofi",
  "sap",
  "sarl",
  "sas",
  "save",
  "saxo",
  "sb",
  "sbi",
  "sbs",
  "sc",
  "scb",
  "schaeffler",
  "schmidt",
  "scholarships",
  "school",
  "schule",
  "schwarz",
  "science",
  "scot",
  "sd",
  "se",
  "search",
  "seat",
  "secure",
  "security",
  "seek",
  "select",
  "sener",
  "services",
  "seven",
  "sew",
  "sex",
  "sexy",
  "sfr",
  "sg",
  "sh",
  "shangrila",
  "sharp",
  "shaw",
  "shell",
  "shia",
  "shiksha",
  "shoes",
  "shop",
  "shopping",
  "shouji",
  "show",
  "si",
  "silk",
  "sina",
  "singles",
  "site",
  "sj",
  "sk",
  "ski",
  "skin",
  "sky",
  "skype",
  "sl",
  "sling",
  "sm",
  "smart",
  "smile",
  "sn",
  "sncf",
  "so",
  "soccer",
  "social",
  "softbank",
  "software",
  "sohu",
  "solar",
  "solutions",
  "song",
  "sony",
  "soy",
  "spa",
  "space",
  "sport",
  "spot",
  "sr",
  "srl",
  "ss",
  "st",
  "stada",
  "staples",
  "star",
  "statebank",
  "statefarm",
  "stc",
  "stcgroup",
  "stockholm",
  "storage",
  "store",
  "stream",
  "studio",
  "study",
  "style",
  "su",
  "sucks",
  "supplies",
  "supply",
  "support",
  "surf",
  "surgery",
  "suzuki",
  "sv",
  "swatch",
  "swiss",
  "sx",
  "sy",
  "sydney",
  "systems",
  "sz",
  "tab",
  "taipei",
  "talk",
  "taobao",
  "target",
  "tatamotors",
  "tatar",
  "tattoo",
  "tax",
  "taxi",
  "tc",
  "tci",
  "td",
  "tdk",
  "team",
  "tech",
  "technology",
  "tel",
  "temasek",
  "tennis",
  "teva",
  "tf",
  "tg",
  "th",
  "thd",
  "theater",
  "theatre",
  "tiaa",
  "tickets",
  "tienda",
  "tips",
  "tires",
  "tirol",
  "tj",
  "tjmaxx",
  "tjx",
  "tk",
  "tkmaxx",
  "tl",
  "tm",
  "tmall",
  "tn",
  "to",
  "today",
  "tokyo",
  "tools",
  "top",
  "toray",
  "toshiba",
  "total",
  "tours",
  "town",
  "toyota",
  "toys",
  "tr",
  "trade",
  "trading",
  "training",
  "travel",
  "travelers",
  "travelersinsurance",
  "trust",
  "trv",
  "tt",
  "tube",
  "tui",
  "tunes",
  "tushu",
  "tv",
  "tvs",
  "tw",
  "tz",
  "ua",
  "ubank",
  "ubs",
  "ug",
  "uk",
  "unicom",
  "university",
  "uno",
  "uol",
  "ups",
  "us",
  "uy",
  "uz",
  "va",
  "vacations",
  "vana",
  "vanguard",
  "vc",
  "ve",
  "vegas",
  "ventures",
  "verisign",
  "vermögensberater",
  "vermögensberatung",
  "versicherung",
  "vet",
  "vg",
  "vi",
  "viajes",
  "video",
  "vig",
  "viking",
  "villas",
  "vin",
  "vip",
  "virgin",
  "visa",
  "vision",
  "viva",
  "vivo",
  "vlaanderen",
  "vn",
  "vodka",
  "volvo",
  "vote",
  "voting",
  "voto",
  "voyage",
  "vu",
  "wales",
  "walmart",
  "walter",
  "wang",
  "wanggou",
  "watch",
  "watches",
  "weather",
  "weatherchannel",
  "webcam",
  "weber",
  "website",
  "wed",
  "wedding",
  "weibo",
  "weir",
  "wf",
  "whoswho",
  "wien",
  "wiki",
  "williamhill",
  "win",
  "windows",
  "wine",
  "winners",
  "wme",
  "wolterskluwer",
  "woodside",
  "work",
  "works",
  "world",
  "wow",
  "ws",
  "wtc",
  "wtf",
  "xbox",
  "xerox",
  "xihuan",
  "xin",
  "xxx",
  "xyz",
  "yachts",
  "yahoo",
  "yamaxun",
  "yandex",
  "ye",
  "yodobashi",
  "yoga",
  "yokohama",
  "you",
  "youtube",
  "yt",
  "yun",
  "za",
  "zappos",
  "zara",
  "zero",
  "zip",
  "zm",
  "zone",
  "zuerich",
  "zw",
  "ελ",
  "ευ",
  "бг",
  "бел",
  "дети",
  "ею",
  "католик",
  "ком",
  "мкд",
  "мон",
  "москва",
  "онлайн",
  "орг",
  "рус",
  "рф",
  "сайт",
  "срб",
  "укр",
  "қаз",
  "հայ",
  "ישראל",
  "קום",
  "ابوظبي",
  "ارامكو",
  "الاردن",
  "البحرين",
  "الجزائر",
  "السعودية",
  "العليان",
  "المغرب",
  "امارات",
  "ایران",
  "بارت",
  "بازار",
  "بيتك",
  "بھارت",
  "تونس",
  "سودان",
  "سورية",
  "شبكة",
  "عراق",
  "عرب",
  "عمان",
  "فلسطين",
  "قطر",
  "كاثوليك",
  "كوم",
  "مصر",
  "مليسيا",
  "موريتانيا",
  "موقع",
  "همراه",
  "پاکستان",
  "ڀارت",
  "कॉम",
  "नेट",
  "भारत",
  "भारतम्",
  "भारोत",
  "संगठन",
  "বাংলা",
  "ভারত",
  "ভাৰত",
  "ਭਾਰਤ",
  "ભારત",
  "ଭାରତ",
  "இந்தியா",
  "இலங்கை",
  "சிங்கப்பூர்",
  "భారత్",
  "ಭಾರತ",
  "ഭാരതം",
  "ලංකා",
  "คอม",
  "ไทย",
  "ລາວ",
  "გე",
  "みんな",
  "アマゾン",
  "クラウド",
  "グーグル",
  "コム",
  "ストア",
  "セール",
  "ファッション",
  "ポイント",
  "世界",
  "中信",
  "中国",
  "中國",
  "中文网",
  "亚马逊",
  "企业",
  "佛山",
  "信息",
  "健康",
  "八卦",
  "公司",
  "公益",
  "台湾",
  "台灣",
  "商城",
  "商店",
  "商标",
  "嘉里",
  "嘉里大酒店",
  "在线",
  "大拿",
  "天主教",
  "娱乐",
  "家電",
  "广东",
  "微博",
  "慈善",
  "我爱你",
  "手机",
  "招聘",
  "政务",
  "政府",
  "新加坡",
  "新闻",
  "时尚",
  "書籍",
  "机构",
  "淡马锡",
  "游戏",
  "澳門",
  "点看",
  "移动",
  "组织机构",
  "网址",
  "网店",
  "网站",
  "网络",
  "联通",
  "谷歌",
  "购物",
  "通販",
  "集团",
  "電訊盈科",
  "飞利浦",
  "食品",
  "餐厅",
  "香格里拉",
  "香港",
  "닷넷",
  "닷컴",
  "삼성",
  "한국"
];
var Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.TAG_REGEX = Je.TRAILING_PUNCTUATION_REGEX = Je.URL_REGEX = Je.MENTION_REGEX = void 0;
Je.MENTION_REGEX = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g;
Je.URL_REGEX = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
Je.TRAILING_PUNCTUATION_REGEX = /\p{P}+$/gu;
Je.TAG_REGEX = /(^|\s)[#＃]((?!\ufe0f)[^\s\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]*[^\d\s\p{P}\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]+[^\s\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]*)?/gu;
var OC = B && B.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(_a, "__esModule", { value: !0 });
_a.detectFacets = void 0;
const jC = OC(IC), Xs = Je;
function NC(t) {
  let e;
  const r = [];
  {
    const n = Xs.MENTION_REGEX;
    for (; e = n.exec(t.utf16); ) {
      if (!Al(e[3]) && !e[3].endsWith(".test"))
        continue;
      const s = t.utf16.indexOf(e[3], e.index) - 1;
      r.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: t.utf16IndexToUtf8Index(s),
          byteEnd: t.utf16IndexToUtf8Index(s + e[3].length + 1)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#mention",
            did: e[3]
            // must be resolved afterwards
          }
        ]
      });
    }
  }
  {
    const n = Xs.URL_REGEX;
    for (; e = n.exec(t.utf16); ) {
      let s = e[2];
      if (!s.startsWith("http")) {
        const o = e.groups?.domain;
        if (!o || !Al(o))
          continue;
        s = `https://${s}`;
      }
      const u = t.utf16.indexOf(e[2], e.index), l = { start: u, end: u + e[2].length };
      /[.,;:!?]$/.test(s) && (s = s.slice(0, -1), l.end--), /[)]$/.test(s) && !s.includes("(") && (s = s.slice(0, -1), l.end--), r.push({
        index: {
          byteStart: t.utf16IndexToUtf8Index(l.start),
          byteEnd: t.utf16IndexToUtf8Index(l.end)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: s
          }
        ]
      });
    }
  }
  {
    const n = Xs.TAG_REGEX;
    for (; e = n.exec(t.utf16); ) {
      let [, s, u] = e;
      if (!u || (u = u.trim().replace(Xs.TRAILING_PUNCTUATION_REGEX, ""), u.length === 0 || u.length > 64))
        continue;
      const l = e.index + s.length;
      r.push({
        index: {
          byteStart: t.utf16IndexToUtf8Index(l),
          byteEnd: t.utf16IndexToUtf8Index(l + 1 + u.length)
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#tag",
            tag: u
          }
        ]
      });
    }
  }
  return r.length > 0 ? r : void 0;
}
_a.detectFacets = NC;
function Al(t) {
  return !!jC.default.find((e) => {
    const r = t.lastIndexOf(e);
    return r === -1 ? !1 : t.charAt(r - 1) === "." && r === t.length - e.length;
  });
}
Object.defineProperty(si, "__esModule", { value: !0 });
si.RichText = si.RichTextSegment = void 0;
const lr = c, Ma = ui, $C = ks, vl = _a;
class jr {
  constructor(e, r) {
    Object.defineProperty(this, "text", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e
    }), Object.defineProperty(this, "facet", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: r
    });
  }
  get link() {
    const e = this.facet?.features.find(lr.AppBskyRichtextFacet.isLink);
    if (lr.AppBskyRichtextFacet.isLink(e))
      return e;
  }
  isLink() {
    return !!this.link;
  }
  get mention() {
    const e = this.facet?.features.find(lr.AppBskyRichtextFacet.isMention);
    if (lr.AppBskyRichtextFacet.isMention(e))
      return e;
  }
  isMention() {
    return !!this.mention;
  }
  get tag() {
    const e = this.facet?.features.find(lr.AppBskyRichtextFacet.isTag);
    if (lr.AppBskyRichtextFacet.isTag(e))
      return e;
  }
  isTag() {
    return !!this.tag;
  }
}
si.RichTextSegment = jr;
class go {
  constructor(e, r) {
    Object.defineProperty(this, "unicodeText", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "facets", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.unicodeText = new Ma.UnicodeString(e.text), this.facets = e.facets, !this.facets?.length && e.entities?.length && (this.facets = MC(this.unicodeText, e.entities)), this.facets && this.facets.sort(Ga), r?.cleanNewlines && (0, $C.sanitizeRichText)(this, { cleanNewlines: !0 }).copyInto(this);
  }
  get text() {
    return this.unicodeText.toString();
  }
  get length() {
    return this.unicodeText.length;
  }
  get graphemeLength() {
    return this.unicodeText.graphemeLength;
  }
  clone() {
    return new go({
      text: this.unicodeText.utf16,
      facets: _l(this.facets)
    });
  }
  copyInto(e) {
    e.unicodeText = this.unicodeText, e.facets = _l(this.facets);
  }
  *segments() {
    const e = this.facets || [];
    if (!e.length) {
      yield new jr(this.unicodeText.utf16);
      return;
    }
    let r = 0, n = 0;
    do {
      const s = e[n];
      if (r < s.index.byteStart)
        yield new jr(this.unicodeText.slice(r, s.index.byteStart));
      else if (r > s.index.byteStart) {
        n++;
        continue;
      }
      if (s.index.byteStart < s.index.byteEnd) {
        const u = this.unicodeText.slice(s.index.byteStart, s.index.byteEnd);
        u.trim() ? yield new jr(u, s) : yield new jr(u);
      }
      r = s.index.byteEnd, n++;
    } while (n < e.length);
    r < this.unicodeText.length && (yield new jr(this.unicodeText.slice(r, this.unicodeText.length)));
  }
  insert(e, r) {
    if (this.unicodeText = new Ma.UnicodeString(this.unicodeText.slice(0, e) + r + this.unicodeText.slice(e)), !this.facets?.length)
      return this;
    const n = r.length;
    for (const s of this.facets)
      e <= s.index.byteStart ? (s.index.byteStart += n, s.index.byteEnd += n) : e >= s.index.byteStart && e < s.index.byteEnd && (s.index.byteEnd += n);
    return this;
  }
  delete(e, r) {
    if (this.unicodeText = new Ma.UnicodeString(this.unicodeText.slice(0, e) + this.unicodeText.slice(r)), !this.facets?.length)
      return this;
    const n = r - e;
    for (const s of this.facets)
      e <= s.index.byteStart && r >= s.index.byteEnd ? (s.index.byteStart = 0, s.index.byteEnd = 0) : e > s.index.byteEnd || (e > s.index.byteStart && e <= s.index.byteEnd && r > s.index.byteEnd ? s.index.byteEnd = e : e >= s.index.byteStart && r <= s.index.byteEnd ? s.index.byteEnd -= n : e < s.index.byteStart && r >= s.index.byteStart && r <= s.index.byteEnd ? (s.index.byteStart = e, s.index.byteEnd -= n) : r < s.index.byteStart && (s.index.byteStart -= n, s.index.byteEnd -= n));
    return this.facets = this.facets.filter((s) => s.index.byteStart < s.index.byteEnd), this;
  }
  /**
   * Detects facets such as links and mentions
   * Note: Overwrites the existing facets with auto-detected facets
   */
  async detectFacets(e) {
    if (this.facets = (0, vl.detectFacets)(this.unicodeText), this.facets) {
      for (const r of this.facets)
        for (const n of r.features)
          if (lr.AppBskyRichtextFacet.isMention(n)) {
            const s = await e.resolveHandle({ handle: n.did }).catch((u) => {
            }).then((u) => u?.data.did);
            n.did = s || "";
          }
      this.facets.sort(Ga);
    }
  }
  /**
   * Detects facets such as links and mentions but does not resolve them
   * Will produce invalid facets! For instance, mentions will not have their DIDs set.
   * Note: Overwrites the existing facets with auto-detected facets
   */
  detectFacetsWithoutResolution() {
    this.facets = (0, vl.detectFacets)(this.unicodeText), this.facets && this.facets.sort(Ga);
  }
}
si.RichText = go;
const Ga = (t, e) => t.index.byteStart - e.index.byteStart;
function MC(t, e) {
  const r = [];
  for (const n of e)
    n.type === "link" ? r.push({
      $type: "app.bsky.richtext.facet",
      index: {
        byteStart: t.utf16IndexToUtf8Index(n.index.start),
        byteEnd: t.utf16IndexToUtf8Index(n.index.end)
      },
      features: [{ $type: "app.bsky.richtext.facet#link", uri: n.value }]
    }) : n.type === "mention" && r.push({
      $type: "app.bsky.richtext.facet",
      index: {
        byteStart: t.utf16IndexToUtf8Index(n.index.start),
        byteEnd: t.utf16IndexToUtf8Index(n.index.end)
      },
      features: [
        { $type: "app.bsky.richtext.facet#mention", did: n.value }
      ]
    });
  return r;
}
function _l(t) {
  return typeof t > "u" ? t : JSON.parse(JSON.stringify(t));
}
var Ro = {}, mt = {}, Qe = {}, Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.NOOP_BEHAVIOR = Le.HIDE_BEHAVIOR = Le.MUTEWORD_BEHAVIOR = Le.MUTE_BEHAVIOR = Le.BLOCK_BEHAVIOR = Le.CUSTOM_LABEL_VALUE_RE = void 0;
Le.CUSTOM_LABEL_VALUE_RE = /^[a-z-]+$/;
Le.BLOCK_BEHAVIOR = {
  profileList: "blur",
  profileView: "alert",
  avatar: "blur",
  banner: "blur",
  contentList: "blur",
  contentView: "blur"
};
Le.MUTE_BEHAVIOR = {
  profileList: "inform",
  profileView: "alert",
  contentList: "blur",
  contentView: "inform"
};
Le.MUTEWORD_BEHAVIOR = {
  contentList: "blur",
  contentView: "blur"
};
Le.HIDE_BEHAVIOR = {
  contentList: "blur",
  contentView: "blur"
};
Le.NOOP_BEHAVIOR = {};
var Bs = {};
Object.defineProperty(Bs, "__esModule", { value: !0 });
Bs.ModerationUI = void 0;
class GC {
  constructor() {
    Object.defineProperty(this, "noOverride", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "filters", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "blurs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "alerts", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "informs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    });
  }
  get filter() {
    return this.filters.length !== 0;
  }
  get blur() {
    return this.blurs.length !== 0;
  }
  get alert() {
    return this.alerts.length !== 0;
  }
  get inform() {
    return this.informs.length !== 0;
  }
}
Bs.ModerationUI = GC;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.LABELS = Yt.DEFAULT_LABEL_SETTINGS = void 0;
Yt.DEFAULT_LABEL_SETTINGS = {
  porn: "hide",
  sexual: "warn",
  nudity: "ignore",
  "graphic-media": "warn"
};
Yt.LABELS = {
  "!hide": {
    identifier: "!hide",
    configurable: !1,
    defaultSetting: "hide",
    flags: ["no-override", "no-self"],
    severity: "alert",
    blurs: "content",
    behaviors: {
      account: {
        profileList: "blur",
        profileView: "blur",
        avatar: "blur",
        banner: "blur",
        displayName: "blur",
        contentList: "blur",
        contentView: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur",
        displayName: "blur"
      },
      content: {
        contentList: "blur",
        contentView: "blur"
      }
    },
    locales: []
  },
  "!warn": {
    identifier: "!warn",
    configurable: !1,
    defaultSetting: "warn",
    flags: ["no-self"],
    severity: "none",
    blurs: "content",
    behaviors: {
      account: {
        profileList: "blur",
        profileView: "blur",
        avatar: "blur",
        banner: "blur",
        contentList: "blur",
        contentView: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur",
        displayName: "blur"
      },
      content: {
        contentList: "blur",
        contentView: "blur"
      }
    },
    locales: []
  },
  "!no-unauthenticated": {
    identifier: "!no-unauthenticated",
    configurable: !1,
    defaultSetting: "hide",
    flags: ["no-override", "unauthed"],
    severity: "none",
    blurs: "content",
    behaviors: {
      account: {
        profileList: "blur",
        profileView: "blur",
        avatar: "blur",
        banner: "blur",
        displayName: "blur",
        contentList: "blur",
        contentView: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur",
        displayName: "blur"
      },
      content: {
        contentList: "blur",
        contentView: "blur"
      }
    },
    locales: []
  },
  porn: {
    identifier: "porn",
    configurable: !0,
    defaultSetting: "hide",
    flags: ["adult"],
    severity: "none",
    blurs: "media",
    behaviors: {
      account: {
        avatar: "blur",
        banner: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur"
      },
      content: {
        contentMedia: "blur"
      }
    },
    locales: []
  },
  sexual: {
    identifier: "sexual",
    configurable: !0,
    defaultSetting: "warn",
    flags: ["adult"],
    severity: "none",
    blurs: "media",
    behaviors: {
      account: {
        avatar: "blur",
        banner: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur"
      },
      content: {
        contentMedia: "blur"
      }
    },
    locales: []
  },
  nudity: {
    identifier: "nudity",
    configurable: !0,
    defaultSetting: "ignore",
    flags: [],
    severity: "none",
    blurs: "media",
    behaviors: {
      account: {
        avatar: "blur",
        banner: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur"
      },
      content: {
        contentMedia: "blur"
      }
    },
    locales: []
  },
  "graphic-media": {
    identifier: "graphic-media",
    flags: ["adult"],
    configurable: !0,
    defaultSetting: "warn",
    severity: "none",
    blurs: "media",
    behaviors: {
      account: {
        avatar: "blur",
        banner: "blur"
      },
      profile: {
        avatar: "blur",
        banner: "blur"
      },
      content: {
        contentMedia: "blur"
      }
    },
    locales: []
  }
};
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.ModerationDecision = void 0;
const ke = Le, qC = Bs, wl = Yt;
var zt;
(function(t) {
  t[t.High = 0] = "High", t[t.Medium = 1] = "Medium", t[t.Low = 2] = "Low";
})(zt || (zt = {}));
class Ao {
  constructor() {
    Object.defineProperty(this, "did", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ""
    }), Object.defineProperty(this, "isMe", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "causes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    });
  }
  static merge(...e) {
    const r = e.filter((s) => !!s), n = new Ao();
    return r[0] && (n.did = r[0].did, n.isMe = r[0].isMe), n.causes = r.flatMap((s) => s.causes), n;
  }
  downgrade() {
    for (const e of this.causes)
      e.downgraded = !0;
    return this;
  }
  get blocked() {
    return !!this.blockCause;
  }
  get muted() {
    return !!this.muteCause;
  }
  get blockCause() {
    return this.causes.find((e) => e.type === "blocking" || e.type === "blocked-by" || e.type === "block-other");
  }
  get muteCause() {
    return this.causes.find((e) => e.type === "muted");
  }
  get labelCauses() {
    return this.causes.filter((e) => e.type === "label");
  }
  ui(e) {
    const r = new qC.ModerationUI();
    if (this.isMe)
      return r;
    for (const n of this.causes)
      n.type === "blocking" || n.type === "blocked-by" || n.type === "block-other" ? ((e === "profileList" || e === "contentList") && r.filters.push(n), n.downgraded || (ke.BLOCK_BEHAVIOR[e] === "blur" ? (r.noOverride = !0, r.blurs.push(n)) : ke.BLOCK_BEHAVIOR[e] === "alert" ? r.alerts.push(n) : ke.BLOCK_BEHAVIOR[e] === "inform" && r.informs.push(n))) : n.type === "muted" ? ((e === "profileList" || e === "contentList") && r.filters.push(n), n.downgraded || (ke.MUTE_BEHAVIOR[e] === "blur" ? r.blurs.push(n) : ke.MUTE_BEHAVIOR[e] === "alert" ? r.alerts.push(n) : ke.MUTE_BEHAVIOR[e] === "inform" && r.informs.push(n))) : n.type === "mute-word" ? (e === "contentList" && r.filters.push(n), n.downgraded || (ke.MUTEWORD_BEHAVIOR[e] === "blur" ? r.blurs.push(n) : ke.MUTEWORD_BEHAVIOR[e] === "alert" ? r.alerts.push(n) : ke.MUTEWORD_BEHAVIOR[e] === "inform" && r.informs.push(n))) : n.type === "hidden" ? ((e === "profileList" || e === "contentList") && r.filters.push(n), n.downgraded || (ke.HIDE_BEHAVIOR[e] === "blur" ? r.blurs.push(n) : ke.HIDE_BEHAVIOR[e] === "alert" ? r.alerts.push(n) : ke.HIDE_BEHAVIOR[e] === "inform" && r.informs.push(n))) : n.type === "label" && (e === "profileList" && n.target === "account" ? n.setting === "hide" && r.filters.push(n) : e === "contentList" && (n.target === "account" || n.target === "content") && n.setting === "hide" && r.filters.push(n), n.downgraded || (n.behavior[e] === "blur" ? (r.blurs.push(n), n.noOverride && (r.noOverride = !0)) : n.behavior[e] === "alert" ? r.alerts.push(n) : n.behavior[e] === "inform" && r.informs.push(n)));
    return r.filters.sort(Tl), r.blurs.sort(Tl), r;
  }
  setDid(e) {
    this.did = e;
  }
  setIsMe(e) {
    this.isMe = e;
  }
  addHidden(e) {
    e && this.causes.push({
      type: "hidden",
      source: { type: "user" },
      priority: 6
    });
  }
  addMutedWord(e) {
    e && this.causes.push({
      type: "mute-word",
      source: { type: "user" },
      priority: 6
    });
  }
  addBlocking(e) {
    e && this.causes.push({
      type: "blocking",
      source: { type: "user" },
      priority: 3
    });
  }
  addBlockingByList(e) {
    e && this.causes.push({
      type: "blocking",
      source: { type: "list", list: e },
      priority: 3
    });
  }
  addBlockedBy(e) {
    e && this.causes.push({
      type: "blocked-by",
      source: { type: "user" },
      priority: 4
    });
  }
  addBlockOther(e) {
    e && this.causes.push({
      type: "block-other",
      source: { type: "user" },
      priority: 4
    });
  }
  addLabel(e, r, n) {
    const s = ke.CUSTOM_LABEL_VALUE_RE.test(r.val) && n.labelDefs?.[r.src]?.find((E) => E.identifier === r.val) || wl.LABELS[r.val];
    if (!s)
      return;
    const u = r.src === this.did, l = u ? void 0 : n.prefs.labelers.find((E) => E.did === r.src);
    if (!u && !l || u && s.flags.includes("no-self"))
      return;
    let o = s.defaultSetting || "ignore";
    if (s.configurable ? s.flags.includes("adult") && !n.prefs.adultContentEnabled ? o = "hide" : l?.labels[s.identifier] ? o = l?.labels[s.identifier] : n.prefs.labels[s.identifier] && (o = n.prefs.labels[s.identifier]) : o = s.defaultSetting || "hide", o === "ignore" || s.flags.includes("unauthed") && n.userDid)
      return;
    let d;
    const f = XC(s.behaviors[e]);
    s.flags.includes("no-override") || s.flags.includes("adult") && !n.prefs.adultContentEnabled ? d = 1 : o === "hide" ? d = 2 : f === zt.High ? d = 5 : f === zt.Medium ? d = 7 : d = 8;
    let m = !1;
    (s.flags.includes("no-override") || s.flags.includes("adult") && !n.prefs.adultContentEnabled) && (m = !0), this.causes.push({
      type: "label",
      source: u || !l ? { type: "user" } : { type: "labeler", did: l.did },
      label: r,
      labelDef: s,
      target: e,
      setting: o,
      behavior: s.behaviors[e] || ke.NOOP_BEHAVIOR,
      noOverride: m,
      priority: d
    });
  }
  addMuted(e) {
    e && this.causes.push({
      type: "muted",
      source: { type: "user" },
      priority: 6
    });
  }
  addMutedByList(e) {
    e && this.causes.push({
      type: "muted",
      source: { type: "list", list: e },
      priority: 6
    });
  }
}
Qe.ModerationDecision = Ao;
function XC(t) {
  return t ? t.profileView === "blur" || t.contentView === "blur" ? zt.High : t.contentList === "blur" || t.contentMedia === "blur" ? zt.Medium : zt.Low : zt.Low;
}
function Tl(t, e) {
  return t.priority - e.priority;
}
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.filterAccountLabels = mt.decideAccount = void 0;
const zC = Qe;
function FC(t, e) {
  const r = new zC.ModerationDecision();
  r.setDid(t.did), r.setIsMe(t.did === e.userDid), t.viewer?.muted && (t.viewer?.mutedByList ? r.addMutedByList(t.viewer?.mutedByList) : r.addMuted(t.viewer?.muted)), t.viewer?.blocking && (t.viewer?.blockingByList ? r.addBlockingByList(t.viewer?.blockingByList) : r.addBlocking(t.viewer?.blocking)), r.addBlockedBy(t.viewer?.blockedBy);
  for (const n of Kp(t.labels))
    r.addLabel("account", n, e);
  return r;
}
mt.decideAccount = FC;
function Kp(t) {
  return t ? t.filter((e) => !e.uri.endsWith("/app.bsky.actor.profile/self") || e.val === "!no-unauthenticated") : [];
}
mt.filterAccountLabels = Kp;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.filterProfileLabels = yt.decideProfile = void 0;
const ZC = Qe;
function HC(t, e) {
  const r = new ZC.ModerationDecision();
  r.setDid(t.did), r.setIsMe(t.did === e.userDid);
  for (const n of Up(t.labels))
    r.addLabel("profile", n, e);
  return r;
}
yt.decideProfile = HC;
function Up(t) {
  return t ? t.filter((e) => e.uri.endsWith("/app.bsky.actor.profile/self")) : [];
}
yt.filterProfileLabels = Up;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.decideNotification = void 0;
const Cl = Qe, WC = mt, JC = yt;
function QC(t, e) {
  const r = new Cl.ModerationDecision();
  if (r.setDid(t.author.did), r.setIsMe(t.author.did === e.userDid), t.labels?.length)
    for (const n of t.labels)
      r.addLabel("content", n, e);
  return Cl.ModerationDecision.merge(r, (0, WC.decideAccount)(t.author, e), (0, JC.decideProfile)(t.author, e));
}
wa.decideNotification = QC;
var Ta = {}, Ds = {};
Object.defineProperty(Ds, "__esModule", { value: !0 });
Ds.hasMutedWord = void 0;
const YC = c, Ll = {
  LEADING_TRAILING_PUNCTUATION: /(?:^\p{P}+|\p{P}+$)/gu,
  ESCAPE: /[[\]{}()*+?.\\^$|\s]/g,
  SEPARATORS: /[/\-–—()[\]_]+/g,
  WORD_BOUNDARY: /[\s\n\t\r\f\v]+?/g
}, e1 = [
  "ja",
  // Japanese
  "zh",
  // Chinese
  "ko",
  // Korean
  "th",
  // Thai
  "vi"
  // Vietnamese
];
function t1({ mutedWords: t, text: e, facets: r, outlineTags: n, languages: s }) {
  const u = e1.includes(s?.[0] || ""), l = [].concat(n || []).concat(r?.filter((o) => o.features.find((d) => YC.AppBskyRichtextFacet.isTag(d))).map((o) => o.features[0].tag) || []).map((o) => o.toLowerCase());
  for (const o of t) {
    const d = o.value.toLowerCase(), f = e.toLowerCase();
    if (l.includes(d))
      return !0;
    if (!o.targets.includes("content"))
      continue;
    if ((d.length === 1 || u) && f.includes(d))
      return !0;
    if (d.length > f.length)
      continue;
    if (d === f || /(?:\s|\p{P})+?/u.test(d) && f.includes(d))
      return !0;
    const m = f.split(Ll.WORD_BOUNDARY);
    for (const E of m) {
      if (E === d)
        return !0;
      const h = E.replace(Ll.LEADING_TRAILING_PUNCTUATION, "");
      if (d === h)
        return !0;
      if (!(d.length > h.length) && /\p{P}+/u.test(h)) {
        const v = h.replace(/\p{P}+/gu, " ");
        if (v === d || v.replace(/\s/gu, "") === d)
          return !0;
        const _ = h.split(/\p{P}+/u);
        for (const w of _)
          if (w === d)
            return !0;
      }
    }
  }
  return !1;
}
Ds.hasMutedWord = t1;
Object.defineProperty(Ta, "__esModule", { value: !0 });
Ta.decidePost = void 0;
const Bi = Qe, te = c, rt = Ds, Vp = mt, Ip = yt;
function r1(t, e) {
  const r = new Bi.ModerationDecision();
  if (r.setDid(t.author.did), r.setIsMe(t.author.did === e.userDid), t.labels?.length)
    for (const s of t.labels)
      r.addLabel("content", s, e);
  r.addHidden(i1(t, e.prefs.hiddenPosts)), r.isMe || r.addMutedWord(n1(t, e.prefs.mutedWords));
  let n;
  return t.embed && (te.AppBskyEmbedRecord.isViewRecord(t.embed.record) ? n = Sl(t.embed.record, e) : te.AppBskyEmbedRecordWithMedia.isView(t.embed) && te.AppBskyEmbedRecord.isViewRecord(t.embed.record.record) ? n = Sl(t.embed.record.record, e) : te.AppBskyEmbedRecord.isViewBlocked(t.embed.record) ? n = kl(t.embed.record, e) : te.AppBskyEmbedRecordWithMedia.isView(t.embed) && te.AppBskyEmbedRecord.isViewBlocked(t.embed.record.record) && (n = kl(t.embed.record.record, e))), Bi.ModerationDecision.merge(r, n?.downgrade(), (0, Vp.decideAccount)(t.author, e), (0, Ip.decideProfile)(t.author, e));
}
Ta.decidePost = r1;
function Sl(t, e) {
  const r = new Bi.ModerationDecision();
  if (r.setDid(t.author.did), r.setIsMe(t.author.did === e.userDid), t.labels?.length)
    for (const n of t.labels)
      r.addLabel("content", n, e);
  return Bi.ModerationDecision.merge(r, (0, Vp.decideAccount)(t.author, e), (0, Ip.decideProfile)(t.author, e));
}
function kl(t, e) {
  const r = new Bi.ModerationDecision();
  return r.setDid(t.author.did), r.setIsMe(t.author.did === e.userDid), t.author.viewer?.muted && (t.author.viewer?.mutedByList ? r.addMutedByList(t.author.viewer?.mutedByList) : r.addMuted(t.author.viewer?.muted)), t.author.viewer?.blocking && (t.author.viewer?.blockingByList ? r.addBlockingByList(t.author.viewer?.blockingByList) : r.addBlocking(t.author.viewer?.blocking)), r.addBlockedBy(t.author.viewer?.blockedBy), r;
}
function i1(t, e) {
  return e?.length ? !!(e.includes(t.uri) || t.embed && (te.AppBskyEmbedRecord.isViewRecord(t.embed.record) && e.includes(t.embed.record.uri) || te.AppBskyEmbedRecordWithMedia.isView(t.embed) && te.AppBskyEmbedRecord.isViewRecord(t.embed.record.record) && e.includes(t.embed.record.record.uri))) : !1;
}
function n1(t, e) {
  if (!e?.length)
    return !1;
  if (te.AppBskyFeedPost.isRecord(t.record)) {
    if ((0, rt.hasMutedWord)({
      mutedWords: e,
      text: t.record.text,
      facets: t.record.facets,
      outlineTags: t.record.tags,
      languages: t.record.langs
    }))
      return !0;
    if (t.record.embed && te.AppBskyEmbedImages.isMain(t.record.embed)) {
      for (const r of t.record.embed.images)
        if ((0, rt.hasMutedWord)({
          mutedWords: e,
          text: r.alt,
          languages: t.record.langs
        }))
          return !0;
    }
  }
  if (t.embed) {
    if (te.AppBskyEmbedRecord.isViewRecord(t.embed.record)) {
      if (te.AppBskyFeedPost.isRecord(t.embed.record.value)) {
        const r = t.embed.record.value;
        if ((0, rt.hasMutedWord)({
          mutedWords: e,
          text: r.text,
          facets: r.facets,
          outlineTags: r.tags,
          languages: r.langs
        }))
          return !0;
        if (te.AppBskyEmbedImages.isMain(r.embed)) {
          for (const n of r.embed.images)
            if ((0, rt.hasMutedWord)({
              mutedWords: e,
              text: n.alt,
              languages: r.langs
            }))
              return !0;
        }
        if (te.AppBskyEmbedExternal.isMain(r.embed)) {
          const { external: n } = r.embed;
          if ((0, rt.hasMutedWord)({
            mutedWords: e,
            text: n.title + " " + n.description,
            languages: []
          }))
            return !0;
        }
        if (te.AppBskyEmbedRecordWithMedia.isMain(r.embed)) {
          if (te.AppBskyEmbedExternal.isMain(r.embed.media)) {
            const { external: n } = r.embed.media;
            if ((0, rt.hasMutedWord)({
              mutedWords: e,
              text: n.title + " " + n.description,
              languages: []
            }))
              return !0;
          }
          if (te.AppBskyEmbedImages.isMain(r.embed.media)) {
            for (const n of r.embed.media.images)
              if ((0, rt.hasMutedWord)({
                mutedWords: e,
                text: n.alt,
                languages: te.AppBskyFeedPost.isRecord(r.record) ? r.langs : []
              }))
                return !0;
          }
        }
      }
    } else if (te.AppBskyEmbedExternal.isView(t.embed)) {
      const { external: r } = t.embed;
      if ((0, rt.hasMutedWord)({
        mutedWords: e,
        text: r.title + " " + r.description,
        languages: []
      }))
        return !0;
    } else if (te.AppBskyEmbedRecordWithMedia.isView(t.embed) && te.AppBskyEmbedRecord.isViewRecord(t.embed.record.record)) {
      if (te.AppBskyFeedPost.isRecord(t.embed.record.record.value)) {
        const r = t.embed.record.record.value;
        if ((0, rt.hasMutedWord)({
          mutedWords: e,
          text: r.text,
          facets: r.facets,
          outlineTags: r.tags,
          languages: r.langs
        }))
          return !0;
      }
      if (te.AppBskyEmbedImages.isView(t.embed.media)) {
        for (const r of t.embed.media.images)
          if ((0, rt.hasMutedWord)({
            mutedWords: e,
            text: r.alt,
            languages: te.AppBskyFeedPost.isRecord(t.record) ? t.record.langs : []
          }))
            return !0;
      }
    }
  }
  return !1;
}
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
Ca.decideFeedGenerator = void 0;
const Bl = Qe, s1 = mt, a1 = yt;
function o1(t, e) {
  const r = new Bl.ModerationDecision();
  if (r.setDid(t.creator.did), r.setIsMe(t.creator.did === e.userDid), t.labels?.length)
    for (const n of t.labels)
      r.addLabel("content", n, e);
  return Bl.ModerationDecision.merge(r, (0, s1.decideAccount)(t.creator, e), (0, a1.decideProfile)(t.creator, e));
}
Ca.decideFeedGenerator = o1;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
La.decideUserList = void 0;
const l1 = ai, Dl = Qe, u1 = mt, c1 = yt;
function p1(t, e) {
  const r = new Dl.ModerationDecision(), n = f1(t.creator) ? t.creator : void 0;
  if (n) {
    if (r.setDid(n.did), r.setIsMe(n.did === e.userDid), t.labels?.length)
      for (const u of t.labels)
        r.addLabel("content", u, e);
    return Dl.ModerationDecision.merge(r, (0, u1.decideAccount)(n, e), (0, c1.decideProfile)(n, e));
  }
  const s = new l1.AtUri(t.uri).hostname;
  if (r.setDid(s), r.setIsMe(s === e.userDid), t.labels?.length)
    for (const u of t.labels)
      r.addLabel("content", u, e);
  return r;
}
La.decideUserList = p1;
function f1(t) {
  return t && typeof t == "object" && "did" in t;
}
var lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.interpretLabelValueDefinitions = lt.interpretLabelValueDefinition = lt.isQuotedPostWithMedia = lt.isQuotedPost = void 0;
const vo = c;
function d1(t) {
  return !!(t && vo.AppBskyEmbedRecord.isView(t));
}
lt.isQuotedPost = d1;
function b1(t) {
  return !!(t && vo.AppBskyEmbedRecordWithMedia.isView(t));
}
lt.isQuotedPostWithMedia = b1;
function Op(t, e) {
  const r = {
    account: {},
    profile: {},
    content: {}
  }, n = t.severity === "alert" ? "alert" : t.severity === "inform" ? "inform" : void 0;
  t.blurs === "content" ? (r.account.profileList = n, r.account.profileView = n, r.account.contentList = "blur", r.account.contentView = t.adultOnly ? "blur" : n, r.profile.profileList = n, r.profile.profileView = n, r.content.contentList = "blur", r.content.contentView = t.adultOnly ? "blur" : n) : t.blurs === "media" ? (r.account.profileList = n, r.account.profileView = n, r.account.avatar = "blur", r.account.banner = "blur", r.profile.profileList = n, r.profile.profileView = n, r.profile.avatar = "blur", r.profile.banner = "blur", r.content.contentMedia = "blur") : t.blurs === "none" && (r.account.profileList = n, r.account.profileView = n, r.account.contentList = n, r.account.contentView = n, r.profile.profileList = n, r.profile.profileView = n, r.content.contentList = n, r.content.contentView = n);
  let s = "warn";
  (t.defaultSetting === "hide" || t.defaultSetting === "ignore") && (s = t.defaultSetting);
  const u = ["no-self"];
  return t.adultOnly && u.push("adult"), {
    ...t,
    definedBy: e,
    configurable: !0,
    defaultSetting: s,
    flags: u,
    behaviors: r
  };
}
lt.interpretLabelValueDefinition = Op;
function m1(t) {
  return (t.policies?.labelValueDefinitions || []).filter((e) => vo.ComAtprotoLabelDefs.validateLabelValueDefinition(e).success).map((e) => Op(e, t.creator.did));
}
lt.interpretLabelValueDefinitions = m1;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.moderateUserList = t.moderateFeedGenerator = t.moderateNotification = t.moderatePost = t.moderateProfile = t.interpretLabelValueDefinitions = t.interpretLabelValueDefinition = t.hasMutedWord = t.ModerationDecision = t.ModerationUI = void 0;
  const e = mt, r = yt, n = wa, s = Ta, u = Ca, l = La, o = Qe;
  var d = Bs;
  Object.defineProperty(t, "ModerationUI", { enumerable: !0, get: function() {
    return d.ModerationUI;
  } });
  var f = Qe;
  Object.defineProperty(t, "ModerationDecision", { enumerable: !0, get: function() {
    return f.ModerationDecision;
  } });
  var m = Ds;
  Object.defineProperty(t, "hasMutedWord", { enumerable: !0, get: function() {
    return m.hasMutedWord;
  } });
  var E = lt;
  Object.defineProperty(t, "interpretLabelValueDefinition", { enumerable: !0, get: function() {
    return E.interpretLabelValueDefinition;
  } }), Object.defineProperty(t, "interpretLabelValueDefinitions", { enumerable: !0, get: function() {
    return E.interpretLabelValueDefinitions;
  } });
  function h(A, L) {
    return o.ModerationDecision.merge((0, e.decideAccount)(A, L), (0, r.decideProfile)(A, L));
  }
  t.moderateProfile = h;
  function v(A, L) {
    return (0, s.decidePost)(A, L);
  }
  t.moderatePost = v;
  function T(A, L) {
    return (0, n.decideNotification)(A, L);
  }
  t.moderateNotification = T;
  function _(A, L) {
    return (0, u.decideFeedGenerator)(A, L);
  }
  t.moderateFeedGenerator = _;
  function w(A, L) {
    return (0, l.decideUserList)(A, L);
  }
  t.moderateUserList = w;
})(Ro);
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
Sa.mock = void 0;
const Ti = "bafyreiclp443lavogvhj3d2ob2cxbfuscni2k5jk7bebjzg7khl3esabwq";
Sa.mock = {
  post({ text: t, facets: e, reply: r, embed: n }) {
    return {
      $type: "app.bsky.feed.post",
      text: t,
      facets: e,
      reply: r,
      embed: n,
      langs: ["en"],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  postView({ record: t, author: e, embed: r, replyCount: n, repostCount: s, likeCount: u, viewer: l, labels: o }) {
    return {
      $type: "app.bsky.feed.defs#postView",
      uri: `at://${e.did}/app.bsky.feed.post/fake`,
      cid: Ti,
      author: e,
      record: t,
      embed: r,
      replyCount: n,
      repostCount: s,
      likeCount: u,
      indexedAt: (/* @__PURE__ */ new Date()).toISOString(),
      viewer: l,
      labels: o
    };
  },
  embedRecordView({ record: t, author: e, labels: r }) {
    return {
      $type: "app.bsky.embed.record#view",
      record: {
        $type: "app.bsky.embed.record#viewRecord",
        uri: `at://${e.did}/app.bsky.feed.post/fake`,
        cid: Ti,
        author: e,
        value: t,
        labels: r,
        indexedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  },
  profileViewBasic({ handle: t, displayName: e, description: r, viewer: n, labels: s }) {
    return {
      did: `did:web:${t}`,
      handle: t,
      displayName: e,
      description: r,
      // technically not in ProfileViewBasic but useful in some cases
      viewer: n,
      labels: s
    };
  },
  actorViewerState({ muted: t, mutedByList: e, blockedBy: r, blocking: n, blockingByList: s, following: u, followedBy: l }) {
    return {
      muted: t,
      mutedByList: e,
      blockedBy: r,
      blocking: n,
      blockingByList: s,
      following: u,
      followedBy: l
    };
  },
  listViewBasic({ name: t }) {
    return {
      uri: "at://did:plc:fake/app.bsky.graph.list/fake",
      cid: Ti,
      name: t,
      purpose: "app.bsky.graph.defs#modlist",
      indexedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  replyNotification({ author: t, record: e, labels: r }) {
    return {
      uri: `at://${t.did}/app.bsky.feed.post/fake`,
      cid: Ti,
      author: t,
      reason: "reply",
      reasonSubject: `at://${t.did}/app.bsky.feed.post/fake-parent`,
      record: e,
      isRead: !1,
      indexedAt: (/* @__PURE__ */ new Date()).toISOString(),
      labels: r
    };
  },
  followNotification({ author: t, subjectDid: e, labels: r }) {
    return {
      uri: `at://${t.did}/app.bsky.graph.follow/fake`,
      cid: Ti,
      author: t,
      reason: "follow",
      record: {
        $type: "app.bsky.graph.follow",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        subject: e
      },
      isRead: !1,
      indexedAt: (/* @__PURE__ */ new Date()).toISOString(),
      labels: r
    };
  },
  label({ val: t, uri: e, src: r }) {
    return {
      src: r || "did:plc:fake-labeler",
      uri: e,
      val: t,
      cts: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
ka.BskyAgent = void 0;
const Or = ai, y1 = ni, U = c, h1 = Yt, Pl = Ni, E1 = Ro, Kl = {
  hideReplies: !1,
  hideRepliesByUnfollowed: !0,
  hideRepliesByLikeCount: 0,
  hideReposts: !1,
  hideQuotePosts: !1
}, x1 = {
  sort: "oldest",
  prioritizeFollowedUsers: !0
};
class Nr extends y1.AtpAgent {
  constructor() {
    super(...arguments), Object.defineProperty(this, "getTimeline", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getTimeline(e, r)
    }), Object.defineProperty(this, "getAuthorFeed", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getAuthorFeed(e, r)
    }), Object.defineProperty(this, "getActorLikes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getActorLikes(e, r)
    }), Object.defineProperty(this, "getPostThread", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getPostThread(e, r)
    }), Object.defineProperty(this, "getPost", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e) => this.api.app.bsky.feed.post.get(e)
    }), Object.defineProperty(this, "getPosts", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getPosts(e, r)
    }), Object.defineProperty(this, "getLikes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getLikes(e, r)
    }), Object.defineProperty(this, "getRepostedBy", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.feed.getRepostedBy(e, r)
    }), Object.defineProperty(this, "getFollows", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.graph.getFollows(e, r)
    }), Object.defineProperty(this, "getFollowers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.graph.getFollowers(e, r)
    }), Object.defineProperty(this, "getProfile", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.actor.getProfile(e, r)
    }), Object.defineProperty(this, "getProfiles", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.actor.getProfiles(e, r)
    }), Object.defineProperty(this, "getSuggestions", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.actor.getSuggestions(e, r)
    }), Object.defineProperty(this, "searchActors", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.actor.searchActors(e, r)
    }), Object.defineProperty(this, "searchActorsTypeahead", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.actor.searchActorsTypeahead(e, r)
    }), Object.defineProperty(this, "listNotifications", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.notification.listNotifications(e, r)
    }), Object.defineProperty(this, "countUnreadNotifications", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.notification.getUnreadCount(e, r)
    }), Object.defineProperty(this, "getLabelers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (e, r) => this.api.app.bsky.labeler.getServices(e, r)
    });
  }
  clone() {
    const e = new Nr({
      service: this.service
    });
    return this.copyInto(e), e;
  }
  get app() {
    return this.api.app;
  }
  async getLabelDefinitions(e) {
    let r = Nr.appLabelers;
    A1(e) ? r = r.concat(e.moderationPrefs.labelers.map((u) => u.did)) : jp(e) ? r = r.concat(e.labelers.map((u) => u.did)) : r = r.concat(e);
    const n = await this.getLabelers({
      dids: r,
      detailed: !0
    }), s = {};
    if (n.data)
      for (const u of n.data.views)
        s[u.creator.did] = (0, E1.interpretLabelValueDefinitions)(u);
    return s;
  }
  async post(e) {
    if (!this.session)
      throw new Error("Not logged in");
    return e.createdAt = e.createdAt || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.feed.post.create({ repo: this.session.did }, e);
  }
  async deletePost(e) {
    if (!this.session)
      throw new Error("Not logged in");
    const r = new Or.AtUri(e);
    return await this.api.app.bsky.feed.post.delete({
      repo: r.hostname,
      rkey: r.rkey
    });
  }
  async like(e, r) {
    if (!this.session)
      throw new Error("Not logged in");
    return await this.api.app.bsky.feed.like.create({ repo: this.session.did }, {
      subject: { uri: e, cid: r },
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async deleteLike(e) {
    if (!this.session)
      throw new Error("Not logged in");
    const r = new Or.AtUri(e);
    return await this.api.app.bsky.feed.like.delete({
      repo: r.hostname,
      rkey: r.rkey
    });
  }
  async repost(e, r) {
    if (!this.session)
      throw new Error("Not logged in");
    return await this.api.app.bsky.feed.repost.create({ repo: this.session.did }, {
      subject: { uri: e, cid: r },
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async deleteRepost(e) {
    if (!this.session)
      throw new Error("Not logged in");
    const r = new Or.AtUri(e);
    return await this.api.app.bsky.feed.repost.delete({
      repo: r.hostname,
      rkey: r.rkey
    });
  }
  async follow(e) {
    if (!this.session)
      throw new Error("Not logged in");
    return await this.api.app.bsky.graph.follow.create({ repo: this.session.did }, {
      subject: e,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async deleteFollow(e) {
    if (!this.session)
      throw new Error("Not logged in");
    const r = new Or.AtUri(e);
    return await this.api.app.bsky.graph.follow.delete({
      repo: r.hostname,
      rkey: r.rkey
    });
  }
  async upsertProfile(e) {
    if (!this.session)
      throw new Error("Not logged in");
    let r = 5;
    for (; r >= 0; ) {
      const n = await this.com.atproto.repo.getRecord({
        repo: this.session.did,
        collection: "app.bsky.actor.profile",
        rkey: "self"
      }).catch((l) => {
      }), s = await e(n?.data.value);
      s && (s.$type = "app.bsky.actor.profile");
      const u = U.AppBskyActorProfile.validateRecord(s);
      if (!u.success)
        throw u.error;
      try {
        await this.com.atproto.repo.putRecord({
          repo: this.session.did,
          collection: "app.bsky.actor.profile",
          rkey: "self",
          record: s,
          swapRecord: n?.data.cid || null
        });
      } catch (l) {
        if (r > 0 && l instanceof U.ComAtprotoRepoPutRecord.InvalidSwapError) {
          r--;
          continue;
        } else
          throw l;
      }
      break;
    }
  }
  async mute(e) {
    return this.api.app.bsky.graph.muteActor({ actor: e });
  }
  async unmute(e) {
    return this.api.app.bsky.graph.unmuteActor({ actor: e });
  }
  async muteModList(e) {
    return this.api.app.bsky.graph.muteActorList({
      list: e
    });
  }
  async unmuteModList(e) {
    return this.api.app.bsky.graph.unmuteActorList({
      list: e
    });
  }
  async blockModList(e) {
    if (!this.session)
      throw new Error("Not logged in");
    return await this.api.app.bsky.graph.listblock.create({ repo: this.session.did }, {
      subject: e,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async unblockModList(e) {
    if (!this.session)
      throw new Error("Not logged in");
    const r = await this.api.app.bsky.graph.getList({
      list: e,
      limit: 1
    });
    if (!r.data.list.viewer?.blocked)
      return;
    const { rkey: n } = new Or.AtUri(r.data.list.viewer.blocked);
    return await this.api.app.bsky.graph.listblock.delete({
      repo: this.session.did,
      rkey: n
    });
  }
  async updateSeenNotifications(e) {
    return e = e || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.notification.updateSeen({
      seenAt: e
    });
  }
  async getPreferences() {
    const e = {
      feeds: {
        saved: void 0,
        pinned: void 0
      },
      feedViewPrefs: {
        home: {
          ...Kl
        }
      },
      threadViewPrefs: { ...x1 },
      moderationPrefs: {
        adultContentEnabled: !1,
        labels: { ...h1.DEFAULT_LABEL_SETTINGS },
        labelers: Nr.appLabelers.map((s) => ({ did: s, labels: {} })),
        mutedWords: [],
        hiddenPosts: []
      },
      birthDate: void 0,
      interests: {
        tags: []
      }
    }, r = await this.app.bsky.actor.getPreferences({}), n = [];
    for (const s of r.data.preferences)
      if (U.AppBskyActorDefs.isAdultContentPref(s) && U.AppBskyActorDefs.validateAdultContentPref(s).success)
        e.moderationPrefs.adultContentEnabled = s.enabled;
      else if (U.AppBskyActorDefs.isContentLabelPref(s) && U.AppBskyActorDefs.validateContentLabelPref(s).success) {
        const u = g1(s);
        n.push(u);
      } else if (U.AppBskyActorDefs.isLabelersPref(s) && U.AppBskyActorDefs.validateLabelersPref(s).success)
        e.moderationPrefs.labelers = Nr.appLabelers.map((u) => ({ did: u, labels: {} })).concat(s.labelers.map((u) => ({
          ...u,
          labels: {}
        })));
      else if (U.AppBskyActorDefs.isSavedFeedsPref(s) && U.AppBskyActorDefs.validateSavedFeedsPref(s).success)
        e.feeds.saved = s.saved, e.feeds.pinned = s.pinned;
      else if (U.AppBskyActorDefs.isPersonalDetailsPref(s) && U.AppBskyActorDefs.validatePersonalDetailsPref(s).success)
        s.birthDate && (e.birthDate = new Date(s.birthDate));
      else if (U.AppBskyActorDefs.isFeedViewPref(s) && U.AppBskyActorDefs.validateFeedViewPref(s).success) {
        const { $type: u, feed: l, ...o } = s;
        e.feedViewPrefs[s.feed] = { ...Kl, ...o };
      } else if (U.AppBskyActorDefs.isThreadViewPref(s) && U.AppBskyActorDefs.validateThreadViewPref(s).success) {
        const { $type: u, ...l } = s;
        e.threadViewPrefs = { ...e.threadViewPrefs, ...l };
      } else if (U.AppBskyActorDefs.isInterestsPref(s) && U.AppBskyActorDefs.validateInterestsPref(s).success) {
        const { $type: u, ...l } = s;
        e.interests = { ...e.interests, ...l };
      } else if (U.AppBskyActorDefs.isMutedWordsPref(s) && U.AppBskyActorDefs.validateMutedWordsPref(s).success) {
        const { $type: u, ...l } = s;
        e.moderationPrefs.mutedWords = l.items;
      } else if (U.AppBskyActorDefs.isHiddenPostsPref(s) && U.AppBskyActorDefs.validateHiddenPostsPref(s).success) {
        const { $type: u, ...l } = s;
        e.moderationPrefs.hiddenPosts = l.items;
      }
    for (const s of n)
      if (s.labelerDid) {
        const u = e.moderationPrefs.labelers.find((l) => l.did === s.labelerDid);
        if (!u)
          continue;
        u.labels[s.label] = s.visibility;
      } else
        e.moderationPrefs.labels[s.label] = s.visibility;
    return e.moderationPrefs.labels = R1(e.moderationPrefs.labels), this.configureLabelersHeader(qa(r.data.preferences)), e;
  }
  async setSavedFeeds(e, r) {
    return Ci(this, () => ({
      saved: e,
      pinned: r
    }));
  }
  async addSavedFeed(e) {
    return Ci(this, (r, n) => ({
      saved: [...r.filter((s) => s !== e), e],
      pinned: n
    }));
  }
  async removeSavedFeed(e) {
    return Ci(this, (r, n) => ({
      saved: r.filter((s) => s !== e),
      pinned: n.filter((s) => s !== e)
    }));
  }
  async addPinnedFeed(e) {
    return Ci(this, (r, n) => ({
      saved: [...r.filter((s) => s !== e), e],
      pinned: [...n.filter((s) => s !== e), e]
    }));
  }
  async removePinnedFeed(e) {
    return Ci(this, (r, n) => ({
      saved: r,
      pinned: n.filter((s) => s !== e)
    }));
  }
  async setAdultContentEnabled(e) {
    await Ue(this, (r) => {
      let n = r.findLast((s) => U.AppBskyActorDefs.isAdultContentPref(s) && U.AppBskyActorDefs.validateAdultContentPref(s).success);
      return n ? n.enabled = e : n = {
        $type: "app.bsky.actor.defs#adultContentPref",
        enabled: e
      }, r.filter((s) => !U.AppBskyActorDefs.isAdultContentPref(s)).concat([n]);
    });
  }
  async setContentLabelPref(e, r, n) {
    n && (0, Or.ensureValidDid)(n), await Ue(this, (s) => {
      let u = s.findLast((o) => U.AppBskyActorDefs.isContentLabelPref(o) && U.AppBskyActorDefs.validateContentLabelPref(o).success && o.label === e && o.labelerDid === n), l;
      if (u ? u.visibility = r : u = {
        $type: "app.bsky.actor.defs#contentLabelPref",
        label: e,
        labelerDid: n,
        visibility: r
      }, U.AppBskyActorDefs.isContentLabelPref(u) && !u.labelerDid) {
        const o = {
          "graphic-media": "gore",
          porn: "nsfw",
          sexual: "suggestive"
        }[u.label];
        o && (l = s.findLast((d) => U.AppBskyActorDefs.isContentLabelPref(d) && U.AppBskyActorDefs.validateContentLabelPref(d).success && d.label === o && d.labelerDid === void 0), l ? l.visibility = r : l = {
          $type: "app.bsky.actor.defs#contentLabelPref",
          label: o,
          labelerDid: void 0,
          visibility: r
        });
      }
      return s.filter((o) => !U.AppBskyActorDefs.isContentLabelPref(o) || !(o.label === e && o.labelerDid === n)).concat([u]).filter((o) => l ? !U.AppBskyActorDefs.isContentLabelPref(o) || !(o.label === l.label && o.labelerDid === void 0) : !0).concat(l ? [l] : []);
    });
  }
  async addLabeler(e) {
    const r = await Ue(this, (n) => {
      let s = n.findLast((u) => U.AppBskyActorDefs.isLabelersPref(u) && U.AppBskyActorDefs.validateLabelersPref(u).success);
      if (s || (s = {
        $type: "app.bsky.actor.defs#labelersPref",
        labelers: []
      }), U.AppBskyActorDefs.isLabelersPref(s)) {
        let u = s.labelers.find((l) => l.did === e);
        u || (u = {
          did: e
        }, s.labelers.push(u));
      }
      return n.filter((u) => !U.AppBskyActorDefs.isLabelersPref(u)).concat([s]);
    });
    this.configureLabelersHeader(qa(r));
  }
  async removeLabeler(e) {
    const r = await Ue(this, (n) => {
      let s = n.findLast((u) => U.AppBskyActorDefs.isLabelersPref(u) && U.AppBskyActorDefs.validateLabelersPref(u).success);
      return s || (s = {
        $type: "app.bsky.actor.defs#labelersPref",
        labelers: []
      }), U.AppBskyActorDefs.isLabelersPref(s) && (s.labelers = s.labelers.filter((u) => u.did !== e)), n.filter((u) => !U.AppBskyActorDefs.isLabelersPref(u)).concat([s]);
    });
    this.configureLabelersHeader(qa(r));
  }
  async setPersonalDetails({ birthDate: e }) {
    e = e instanceof Date ? e.toISOString() : e, await Ue(this, (r) => {
      let n = r.findLast((s) => U.AppBskyActorDefs.isPersonalDetailsPref(s) && U.AppBskyActorDefs.validatePersonalDetailsPref(s).success);
      return n ? n.birthDate = e : n = {
        $type: "app.bsky.actor.defs#personalDetailsPref",
        birthDate: e
      }, r.filter((s) => !U.AppBskyActorDefs.isPersonalDetailsPref(s)).concat([n]);
    });
  }
  async setFeedViewPrefs(e, r) {
    await Ue(this, (n) => {
      const s = n.findLast((u) => U.AppBskyActorDefs.isFeedViewPref(u) && U.AppBskyActorDefs.validateFeedViewPref(u).success && u.feed === e);
      return s && (r = { ...s, ...r }), n.filter((u) => !U.AppBskyActorDefs.isFeedViewPref(r) || u.feed !== e).concat([{ ...r, $type: "app.bsky.actor.defs#feedViewPref", feed: e }]);
    });
  }
  async setThreadViewPrefs(e) {
    await Ue(this, (r) => {
      const n = r.findLast((s) => U.AppBskyActorDefs.isThreadViewPref(s) && U.AppBskyActorDefs.validateThreadViewPref(s).success);
      return n && (e = { ...n, ...e }), r.filter((s) => !U.AppBskyActorDefs.isThreadViewPref(s)).concat([{ ...e, $type: "app.bsky.actor.defs#threadViewPref" }]);
    });
  }
  async setInterestsPref(e) {
    await Ue(this, (r) => {
      const n = r.findLast((s) => U.AppBskyActorDefs.isInterestsPref(s) && U.AppBskyActorDefs.validateInterestsPref(s).success);
      return n && (e = { ...n, ...e }), r.filter((s) => !U.AppBskyActorDefs.isInterestsPref(s)).concat([{ ...e, $type: "app.bsky.actor.defs#interestsPref" }]);
    });
  }
  async upsertMutedWords(e) {
    await Ue(this, (r) => {
      let n = r.findLast((s) => U.AppBskyActorDefs.isMutedWordsPref(s) && U.AppBskyActorDefs.validateMutedWordsPref(s).success);
      if (n && U.AppBskyActorDefs.isMutedWordsPref(n))
        for (const s of e) {
          let u = !1;
          const l = (0, Pl.sanitizeMutedWordValue)(s.value);
          if (l) {
            for (const o of n.items)
              if (o.value === l) {
                o.targets = Array.from(/* @__PURE__ */ new Set([...o.targets, ...s.targets])), u = !0;
                break;
              }
            u || n.items.push({
              ...s,
              value: l
            });
          }
        }
      else
        n = {
          items: e.map((s) => ({
            ...s,
            value: (0, Pl.sanitizeMutedWordValue)(s.value)
          }))
        };
      return r.filter((s) => !U.AppBskyActorDefs.isMutedWordsPref(s)).concat([
        { ...n, $type: "app.bsky.actor.defs#mutedWordsPref" }
      ]);
    });
  }
  async updateMutedWord(e) {
    await Ue(this, (r) => {
      const n = r.findLast((s) => U.AppBskyActorDefs.isMutedWordsPref(s) && U.AppBskyActorDefs.validateMutedWordsPref(s).success);
      if (n && U.AppBskyActorDefs.isMutedWordsPref(n)) {
        for (const s of n.items)
          if (s.value === e.value) {
            s.targets = e.targets;
            break;
          }
      }
      return r.filter((s) => !U.AppBskyActorDefs.isMutedWordsPref(s)).concat([
        { ...n, $type: "app.bsky.actor.defs#mutedWordsPref" }
      ]);
    });
  }
  async removeMutedWord(e) {
    await Ue(this, (r) => {
      const n = r.findLast((s) => U.AppBskyActorDefs.isMutedWordsPref(s) && U.AppBskyActorDefs.validateMutedWordsPref(s).success);
      if (n && U.AppBskyActorDefs.isMutedWordsPref(n)) {
        for (let s = 0; s < n.items.length; s++)
          if (n.items[s].value === e.value) {
            n.items.splice(s, 1);
            break;
          }
      }
      return r.filter((s) => !U.AppBskyActorDefs.isMutedWordsPref(s)).concat([
        { ...n, $type: "app.bsky.actor.defs#mutedWordsPref" }
      ]);
    });
  }
  async hidePost(e) {
    await Ul(this, e, "hide");
  }
  async unhidePost(e) {
    await Ul(this, e, "unhide");
  }
}
ka.BskyAgent = Nr;
async function Ue(t, e) {
  const r = await t.app.bsky.actor.getPreferences({}), n = e(r.data.preferences);
  return n === !1 ? r.data.preferences : (await t.app.bsky.actor.putPreferences({
    preferences: n
  }), n);
}
async function Ci(t, e) {
  let r;
  return await Ue(t, (n) => {
    let s = n.findLast((u) => U.AppBskyActorDefs.isSavedFeedsPref(u) && U.AppBskyActorDefs.validateSavedFeedsPref(u).success);
    return s ? (r = e(s.saved, s.pinned), s.saved = r.saved, s.pinned = r.pinned) : (r = e([], []), s = {
      $type: "app.bsky.actor.defs#savedFeedsPref",
      saved: r.saved,
      pinned: r.pinned
    }), n.filter((u) => !U.AppBskyActorDefs.isSavedFeedsPref(u)).concat([s]);
  }), r;
}
function g1(t) {
  let e = t.visibility;
  return e === "show" && (e = "ignore"), { ...t, visibility: e };
}
function R1(t) {
  const e = { ...t }, r = {
    gore: "graphic-media",
    nsfw: "porn",
    suggestive: "sexual"
  };
  for (const n in e) {
    const s = r[n];
    s && (e[s] = e[n]);
  }
  return e;
}
function qa(t) {
  const e = t.findLast((n) => U.AppBskyActorDefs.isLabelersPref(n) && U.AppBskyActorDefs.validateLabelersPref(n).success);
  let r = [];
  return e && (r = e.labelers.map((n) => n.did)), r;
}
async function Ul(t, e, r) {
  await Ue(t, (n) => {
    let s = n.findLast((u) => U.AppBskyActorDefs.isHiddenPostsPref(u) && U.AppBskyActorDefs.validateHiddenPostsPref(u).success);
    return s && U.AppBskyActorDefs.isHiddenPostsPref(s) ? s.items = r === "hide" ? Array.from(/* @__PURE__ */ new Set([...s.items, e])) : s.items.filter((u) => u !== e) : r === "hide" && (s = {
      $type: "app.bsky.actor.defs#hiddenPostsPref",
      items: [e]
    }), n.filter((u) => !U.AppBskyActorDefs.isInterestsPref(u)).concat([{ ...s, $type: "app.bsky.actor.defs#hiddenPostsPref" }]);
  });
}
function A1(t) {
  return t && typeof t == "object" && "moderationPrefs" in t && jp(t.moderationPrefs);
}
function jp(t) {
  return t && typeof t == "object" && "labelers" in t;
}
(function(t) {
  var e = B && B.__createBinding || (Object.create ? function(f, m, E, h) {
    h === void 0 && (h = E);
    var v = Object.getOwnPropertyDescriptor(m, E);
    (!v || ("get" in v ? !m.__esModule : v.writable || v.configurable)) && (v = { enumerable: !0, get: function() {
      return m[E];
    } }), Object.defineProperty(f, h, v);
  } : function(f, m, E, h) {
    h === void 0 && (h = E), f[h] = m[E];
  }), r = B && B.__exportStar || function(f, m) {
    for (var E in f)
      E !== "default" && !Object.prototype.hasOwnProperty.call(m, E) && e(m, f, E);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.default = t.BskyAgent = t.DEFAULT_LABEL_SETTINGS = t.LABELS = t.parseLanguage = t.jsonStringToLex = t.jsonToLex = t.stringifyLex = t.lexToJson = t.BlobRef = t.AtUri = void 0;
  var n = ai;
  Object.defineProperty(t, "AtUri", { enumerable: !0, get: function() {
    return n.AtUri;
  } });
  var s = Ui;
  Object.defineProperty(t, "BlobRef", { enumerable: !0, get: function() {
    return s.BlobRef;
  } }), Object.defineProperty(t, "lexToJson", { enumerable: !0, get: function() {
    return s.lexToJson;
  } }), Object.defineProperty(t, "stringifyLex", { enumerable: !0, get: function() {
    return s.stringifyLex;
  } }), Object.defineProperty(t, "jsonToLex", { enumerable: !0, get: function() {
    return s.jsonToLex;
  } }), Object.defineProperty(t, "jsonStringToLex", { enumerable: !0, get: function() {
    return s.jsonStringToLex;
  } });
  var u = tr;
  Object.defineProperty(t, "parseLanguage", { enumerable: !0, get: function() {
    return u.parseLanguage;
  } }), r(Lu, t), r(ji, t), r(Ni, t), r(c, t), r(ni, t), r(si, t), r(ks, t), r(ui, t), r(Je, t), r(Ro, t), r(Le, t), r(Sa, t);
  var l = Yt;
  Object.defineProperty(t, "LABELS", { enumerable: !0, get: function() {
    return l.LABELS;
  } }), Object.defineProperty(t, "DEFAULT_LABEL_SETTINGS", { enumerable: !0, get: function() {
    return l.DEFAULT_LABEL_SETTINGS;
  } });
  var o = ka;
  Object.defineProperty(t, "BskyAgent", { enumerable: !0, get: function() {
    return o.BskyAgent;
  } });
  var d = ni;
  Object.defineProperty(t, "default", { enumerable: !0, get: function() {
    return d.AtpAgent;
  } });
})(to);
const Xa = new to.BskyAgent({
  service: "https://api.bsky.app"
}), Np = ({
  post: t,
  reason: e,
  isRoot: r
}) => {
  const n = t.record.facets || [], s = t.record.text, u = new to.RichText({
    text: s,
    facets: n
  }), l = [];
  for (const f of u.segments())
    f.isLink() ? l.push({
      val: `<a href="${f.link?.uri}" target="_blank" rel="noopener" class="text-blue-500 underline">${f.text}</a>`,
      setInnerHtml: !0
    }) : f.isMention() ? l.push({
      val: `<a href="https://bsky.app/profile/${f.mention?.did}" target="_blank" rel="noopener" class="text-blue-500 underline">${f.text}</a>`,
      setInnerHtml: !0
    }) : f.isTag() ? l.push({
      val: `<a href="https://bsky.app/hashtag/${f.tag?.tag}" target="_blank" rel="noopener" class="text-blue-500 underline">${f.text}</a>`,
      setInnerHtml: !0
    }) : l.push({
      val: f.text,
      setInnerHtml: !1
    });
  const o = t.embed?.$type === "app.bsky.embed.record#view" ? t.embed.record : t.embed?.record?.record?.$type === "app.bsky.embed.record#viewRecord" && t.embed.record.record, d = o && {
    ...o,
    record: o.value,
    embed: (o?.embeds || [])[0]
  };
  return {
    username: t.author.displayName,
    handle: t.author.handle,
    avatar: t.author.avatar,
    // todo fallback
    text: l,
    createdAt: t.record.createdAt,
    uri: t.uri,
    images: [...t.embed?.images || [], ...t.embed?.media?.images || []],
    card: t.embed?.$type === "app.bsky.embed.external#view" && t.embed?.external,
    replyPost: r && d && Np({
      post: d,
      reason: {
        $type: "",
        by: {
          displayName: ""
        }
      },
      isRoot: !1
    }),
    isRepost: e?.$type === "app.bsky.feed.defs#reasonRepost",
    repostBy: e?.by?.displayName
  };
}, za = (t) => (t.feed || []).map((e) => Np({
  ...e,
  isRoot: !0
})), Vl = (t) => {
  const e = t.lastIndexOf("/");
  return e !== -1 ? t.substring(e + 1) : t;
}, v1 = (t) => {
  const e = /* @__PURE__ */ new Date(), r = 60 * 1e3, n = r * 60, s = n * 24, u = s * 30, l = s * 365, o = e.getTime() - t.getTime();
  return o < r ? Math.floor(o / 1e3) + "s" : o < n ? Math.floor(o / r) + "m" : o < s ? Math.floor(o / n) + "h" : o < u ? Math.floor(o / s) + "d" : o < l ? Math.floor(o / u) + " mo" : Math.floor(o / l) + " yr";
};
var _1 = /* @__PURE__ */ Ne('<article class="p-4 border-b border-slate-300 dark:border-slate-800"><div class="flex gap-2"><div><div class="flex max-w-[calc(100vw-96px)] items-center"><a class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white"><span class="font-bold dark:text-white"></span><span> </span><span class="text-slate-500 dark:text-slate-400 text-sm">@</span></a><span class="text-slate-500 dark:text-slate-400 text-sm"><span class=mx-1>·</span><a class=hover:underline></a></span></div><p class="whitespace-pre-wrap dark:text-white">'), w1 = /* @__PURE__ */ Ne('<p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400"><svg viewBox="0 0 576 512"height=16 width=16 tabindex=-1 class=mr-1><path fill=currentColor d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg><span class="text-sm text-slate-500 font-semibold">Reposted by '), T1 = /* @__PURE__ */ Ne('<img alt="profile picture"class="w-14 h-14 rounded-full">'), C1 = /* @__PURE__ */ Ne('<img alt="profile picture"class="w-4 h-4 mr-1 rounded-full">'), Il = /* @__PURE__ */ Ne("<span>"), L1 = /* @__PURE__ */ Ne("<div>"), S1 = /* @__PURE__ */ Ne("<a><img class=rounded-md>"), k1 = /* @__PURE__ */ Ne('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block"><img class=rounded-t-md alt="Post Thumbnail"><div class=p-3><p class="text-slate-500 dark:text-slate-400 text-sm"></p><p class="font-bold dark:text-white mb-1"></p><p class="whitespace-pre-wrap dark:text-white">'), B1 = /* @__PURE__ */ Ne('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block">');
const $p = ({
  linkTarget: t = "_self",
  post: e,
  handleModalContent: r,
  isCard: n = !1
}) => (() => {
  var s = _1(), u = s.firstChild, l = u.firstChild, o = l.firstChild, d = o.firstChild, f = d.firstChild, m = f.nextSibling, E = m.nextSibling;
  E.firstChild;
  var h = d.nextSibling, v = h.firstChild, T = v.nextSibling, _ = o.nextSibling;
  return ie(s, (() => {
    var w = ur(() => !!e.isRepost);
    return () => w() && (() => {
      var A = w1(), L = A.firstChild, K = L.nextSibling;
      return K.firstChild, ie(K, () => e.repostBy, null), A;
    })();
  })(), u), ie(u, !n && (() => {
    var w = T1();
    return Fe(() => xe(w, "src", e.avatar)), w;
  })(), l), ie(o, n && (() => {
    var w = C1();
    return Fe(() => xe(w, "src", e.avatar)), w;
  })(), d), xe(d, "target", t), xe(d, "rel", t === "_blank" ? "noopeener" : ""), ie(f, () => e.username), ie(E, () => e.handle, null), xe(T, "target", t), xe(T, "rel", t === "_blank" ? "noopeener" : ""), ie(T, () => v1(new Date(e.createdAt))), ie(_, () => e.text.map((w) => w.setInnerHtml ? (() => {
    var A = Il();
    return Fe(() => A.innerHTML = w.val), A;
  })() : (() => {
    var A = Il();
    return ie(A, () => w.val), A;
  })())), ie(l, (() => {
    var w = ur(() => e.images.length > 0);
    return () => w() && (() => {
      var A = L1();
      return ie(A, () => e.images.map((L) => (() => {
        var K = S1(), V = K.firstChild;
        return K.$$click = (N) => r(N, L), xe(K, "target", t), xe(K, "rel", t === "_blank" ? "noopeener" : ""), Fe((N) => {
          var q = `https://bsky.app/profile/${e.handle}/post/${Vl(e.uri)}`, Z = L.thumb, ee = L.alt;
          return q !== N.e && xe(K, "href", N.e = q), Z !== N.t && xe(V, "src", N.t = Z), ee !== N.a && xe(V, "alt", N.a = ee), N;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), K;
      })())), Fe(() => Hl(A, e.images.length > 1 ? "mt-4 grid grid-cols-2 gap-2" : "mt-4")), A;
    })();
  })(), null), ie(l, (() => {
    var w = ur(() => !!e.card);
    return () => w() && (() => {
      var A = k1(), L = A.firstChild, K = L.nextSibling, V = K.firstChild, N = V.nextSibling, q = N.nextSibling;
      return ie(V, () => new URL(e.card.uri).hostname), ie(N, () => e.card.title), ie(q, () => e.card.description), Fe((Z) => {
        var ee = e.card.uri, Pe = e.card.thumb;
        return ee !== Z.e && xe(A, "href", Z.e = ee), Pe !== Z.t && xe(L, "src", Z.t = Pe), Z;
      }, {
        e: void 0,
        t: void 0
      }), A;
    })();
  })(), null), ie(l, (() => {
    var w = ur(() => !!e.replyPost);
    return () => w() && (() => {
      var A = B1();
      return ie(A, Fl($p, qf({
        linkTarget: t,
        handleModalContent: r
      }, {
        get post() {
          return e.replyPost;
        },
        isCard: !0
      }))), Fe(() => xe(A, "href", e.card.uri)), A;
    })();
  })(), null), Fe((w) => {
    var A = `https://bsky.app/profile/${e.handle}`, L = `https://bsky.app/profile/${e.handle}/post/${Vl(e.uri)}`;
    return A !== w.e && xe(d, "href", w.e = A), L !== w.t && xe(T, "href", w.t = L), w;
  }, {
    e: void 0,
    t: void 0
  }), s;
})();
Zl(["click"]);
var D1 = /* @__PURE__ */ Ne("<style>"), P1 = /* @__PURE__ */ Ne('<section><dialog class="backdrop:bg-gray-800 backdrop:opacity-90"><form class="fixed top-5 right-5"><button type=submit aria-label=close formmethod=dialog formnovalidate class="bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center">X</button></form><img src=""alt=""class=max-h-[90vh]></dialog><div class="mt-8 mb-16"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Load More Posts'), K1 = /* @__PURE__ */ Ne('<article class="flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800 animate-pulse"><div class="bg-slate-200 w-14 h-14 rounded-full dark:bg-slate-800"></div><div class="flex-1 space-y-2 py-1"><div class="grid grid-cols-4 gap-4"><div class="h-2 bg-slate-200 rounded col-span-2 dark:bg-slate-800"></div></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800">'), U1 = /* @__PURE__ */ Ne("<div>");
const V1 = ({
  username: t,
  feed: e,
  limit: r = 10,
  mode: n = "",
  linkTarget: s = "_self",
  linkImage: u = !1,
  customStyles: l = "",
  search: o
}) => {
  let d = null, f = null;
  const [m, E] = Li(!1), [h, v] = Li([]), [T, _] = Li(r), [w, A] = Li(void 0);
  If(() => {
    E(!0), L();
  }, [t, e, o, T]);
  const L = async (N) => {
    t ? Xa.app.bsky.feed.getAuthorFeed({
      limit: T(),
      actor: t,
      filter: "posts_no_replies",
      cursor: N
    }).then(({
      success: q,
      data: Z
    }) => {
      if (q) {
        const ee = za(Z);
        v(ee), E(!1), A(Z.cursor);
      }
    }) : e ? Xa.app.bsky.feed.getFeed({
      limit: T(),
      feed: e,
      cursor: N
    }).then(({
      success: q,
      data: Z
    }) => {
      if (q) {
        const ee = za(Z);
        v(ee), E(!1), A(Z.cursor);
      }
    }) : o && Xa.app.bsky.feed.searchPosts({
      limit: T(),
      q: o,
      cursor: N
    }).then(({
      success: q,
      data: Z
    }) => {
      if (q) {
        const ee = {
          ...Z,
          feed: Z.posts.map((Br) => ({
            post: Br
          }))
        }, Pe = za(ee);
        v(Pe), E(!1), A(Z.cursor);
      }
    });
  }, K = (N, q) => {
    !u && d && f && (N.preventDefault(), f.src = q.fullsize, f.alt = q.alt, d.showModal());
  }, V = () => {
    L(w());
  };
  return [(() => {
    var N = D1();
    return ie(N, Jf, null), ie(N, l, null), N;
  })(), (() => {
    var N = P1(), q = N.firstChild, Z = q.firstChild, ee = Z.nextSibling, Pe = q.nextSibling, Br = Pe.firstChild;
    return Hl(N, `${n} max-w-screen-sm mx-auto flex flex-col items-center`), ie(N, (() => {
      var ht = ur(() => !!m());
      return () => ht() && Array.from(Array(r)).map(() => K1());
    })(), q), ie(N, (() => {
      var ht = ur(() => !m());
      return () => ht() && h().map((Ps, Ba) => (() => {
        var Dr = U1();
        return xe(Dr, "id", `post-${Ba}`), ie(Dr, Fl($p, {
          post: Ps,
          handleModalContent: K,
          linkTarget: s
        })), Dr;
      })());
    })(), q), Po((ht) => d = ht, q), Po((ht) => f = ht, ee), Br.$$click = V, N;
  })()];
};
Zl(["click"]);
Wf("bsky-embed", {
  username: "",
  feed: "",
  limit: 10,
  mode: "",
  linkTarget: "_self",
  linkImage: !1,
  customStyles: "",
  search: ""
}, V1);
