import { defineComponent as D, openBlock as J, createBlock as V, unref as W, mergeProps as G, withCtx as H, renderSlot as Q, useAttrs as ae, useSlots as le, ref as N, resolveComponent as ue, createSlots as se, renderList as ce, normalizeProps as de, guardReactiveProps as fe, onMounted as K, nextTick as U, readonly as X, watch as $, getCurrentInstance as P, toRef as pe, customRef as me, getCurrentScope as ve, hasInjectionContext as Y, inject as ye, shallowRef as E, computed as C, toValue as h, watchEffect as he } from "vue";
import { ElButton as ge } from "element-plus";
const Se = /* @__PURE__ */ D({
  __name: "button",
  props: {
    size: { default: "default" },
    disabled: { type: Boolean },
    type: { default: "primary" },
    icon: {},
    nativeType: {},
    loading: { type: Boolean },
    loadingIcon: {},
    plain: { type: Boolean },
    text: { type: Boolean },
    link: { type: Boolean },
    bg: { type: Boolean },
    autofocus: { type: Boolean },
    round: { type: Boolean },
    circle: { type: Boolean },
    color: {},
    dark: { type: Boolean },
    autoInsertSpace: { type: Boolean },
    tag: {}
  },
  setup(e) {
    return (n, t) => (J(), V(W(ge), G({
      type: e.type,
      size: e.size,
      disabled: e.disabled,
      loading: e.loading,
      round: e.round,
      circle: e.circle
    }, n.$attrs), {
      default: H(() => [
        Q(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "disabled", "loading", "round", "circle"]));
  }
}), be = /* @__PURE__ */ D({
  __name: "input",
  setup(e, { expose: n }) {
    const t = ae(), o = le(), r = N();
    return n({
      clear: () => {
        var a;
        return (a = r.value) == null ? void 0 : a.clear();
      },
      select: () => {
        var a;
        return (a = r.value) == null ? void 0 : a.select();
      },
      focus: () => {
        var a;
        return (a = r.value) == null ? void 0 : a.focus();
      },
      blur: () => {
        var a;
        return (a = r.value) == null ? void 0 : a.blur();
      }
    }), (a, d) => {
      const m = ue("el-input");
      return J(), V(m, G(W(t), {
        ref_key: "elInputRef",
        ref: r
      }), se({ _: 2 }, [
        ce(W(o), (c, v) => ({
          name: v,
          fn: H((s) => [
            Q(a.$slots, v, de(fe(s)))
          ])
        }))
      ]), 1040);
    };
  }
}), A = /* @__PURE__ */ new WeakMap(), we = /* @__NO_SIDE_EFFECTS__ */ (...e) => {
  var n;
  const t = e[0], o = (n = P()) === null || n === void 0 ? void 0 : n.proxy, r = o ?? ve();
  if (r == null && !Y()) throw new Error("injectLocal must be called in setup");
  return r && A.has(r) && t in A.get(r) ? A.get(r)[t] : ye(...e);
}, Me = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ke = Object.prototype.toString, Ee = (e) => ke.call(e) === "[object Object]", Be = () => {
};
function Oe(...e) {
  if (e.length !== 1) return pe(...e);
  const n = e[0];
  return typeof n == "function" ? X(me(() => ({
    get: n,
    set: Be
  }))) : N(n);
}
function We(e, n) {
  function t(...o) {
    return new Promise((r, l) => {
      Promise.resolve(e(() => n.apply(this, o), {
        fn: n,
        thisArg: this,
        args: o
      })).then(r).catch(l);
    });
  }
  return t;
}
const Z = (e) => e();
function Ce(e = Z, n = {}) {
  const { initialState: t = "active" } = n, o = Oe(t === "active");
  function r() {
    o.value = !1;
  }
  function l() {
    o.value = !0;
  }
  const a = (...d) => {
    o.value && e(...d);
  };
  return {
    isActive: X(o),
    pause: r,
    resume: l,
    eventFilter: a
  };
}
function R(e) {
  return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function T(e) {
  return Array.isArray(e) ? e : [e];
}
function je(e) {
  return P();
}
function ze(e, n, t = {}) {
  const { eventFilter: o = Z, ...r } = t;
  return $(e, We(o, n), r);
}
function Ae(e, n, t = {}) {
  const { eventFilter: o, initialState: r = "active", ...l } = t, { eventFilter: a, pause: d, resume: m, isActive: c } = Ce(o, { initialState: r });
  return {
    stop: ze(e, n, {
      ...l,
      eventFilter: a
    }),
    pause: d,
    resume: m,
    isActive: c
  };
}
function Te(e, n = !0, t) {
  je() ? K(e, t) : n ? e() : U(e);
}
function Fe(e, n, t) {
  return $(e, n, {
    ...t,
    immediate: !0
  });
}
const w = Me ? window : void 0;
function Ne(e) {
  var n;
  const t = h(e);
  return (n = t == null ? void 0 : t.$el) !== null && n !== void 0 ? n : t;
}
function F(...e) {
  const n = (o, r, l, a) => (o.addEventListener(r, l, a), () => o.removeEventListener(r, l, a)), t = C(() => {
    const o = T(h(e[0])).filter((r) => r != null);
    return o.every((r) => typeof r != "string") ? o : void 0;
  });
  return Fe(() => {
    var o, r;
    return [
      (o = (r = t.value) === null || r === void 0 ? void 0 : r.map((l) => Ne(l))) !== null && o !== void 0 ? o : [w].filter((l) => l != null),
      T(h(t.value ? e[1] : e[0])),
      T(W(t.value ? e[2] : e[1])),
      h(t.value ? e[3] : e[2])
    ];
  }, ([o, r, l, a], d, m) => {
    if (!(o != null && o.length) || !(r != null && r.length) || !(l != null && l.length)) return;
    const c = Ee(a) ? { ...a } : a, v = o.flatMap((s) => r.flatMap((g) => l.map((f) => n(s, g, f, c))));
    m(() => {
      v.forEach((s) => s());
    });
  }, { flush: "post" });
}
// @__NO_SIDE_EFFECTS__
function $e() {
  const e = E(!1), n = P();
  return n && K(() => {
    e.value = !0;
  }, n), e;
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  const n = /* @__PURE__ */ $e();
  return C(() => (n.value, !!e()));
}
const xe = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function Ie() {
  const e = Y() ? /* @__PURE__ */ we(xe, null) : null;
  return typeof e == "number" ? e : void 0;
}
function Le(e, n = {}) {
  const { window: t = w, ssrWidth: o = /* @__PURE__ */ Ie() } = n, r = /* @__PURE__ */ Pe(() => t && "matchMedia" in t && typeof t.matchMedia == "function"), l = E(typeof o == "number"), a = E(), d = E(!1), m = (c) => {
    d.value = c.matches;
  };
  return he(() => {
    if (l.value) {
      l.value = !r.value, d.value = h(e).split(",").some((c) => {
        const v = c.includes("not all"), s = c.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), g = c.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let f = !!(s || g);
        return s && f && (f = o >= R(s[1])), g && f && (f = o <= R(g[1])), v ? !f : f;
      });
      return;
    }
    r.value && (a.value = t.matchMedia(h(e)), d.value = a.value.matches);
  }), F(a, "change", m, { passive: !0 }), C(() => d.value);
}
const B = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, O = "__vueuse_ssr_handlers__", Re = /* @__PURE__ */ _e();
function _e() {
  return O in B || (B[O] = B[O] || {}), B[O];
}
function De(e, n) {
  return Re[e] || n;
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  return Le("(prefers-color-scheme: dark)", e);
}
function Ve(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const Ge = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, _ = "vueuse-storage";
function He(e, n, t, o = {}) {
  var r;
  const { flush: l = "pre", deep: a = !0, listenToStorageChanges: d = !0, writeDefaults: m = !0, mergeDefaults: c = !1, shallow: v, window: s = w, eventFilter: g, onError: f = (i) => {
    console.error(i);
  }, initOnMounted: j } = o, b = (v ? E : N)(n), y = C(() => h(e));
  if (!t) try {
    t = De("getDefaultStorage", () => w == null ? void 0 : w.localStorage)();
  } catch (i) {
    f(i);
  }
  if (!t) return b;
  const S = h(n), x = Ve(S), M = (r = o.serializer) !== null && r !== void 0 ? r : Ge[x], { pause: ee, resume: I } = Ae(b, (i) => oe(i), {
    flush: l,
    deep: a,
    eventFilter: g
  });
  $(y, () => k(), { flush: l });
  let z = !1;
  const te = (i) => {
    j && !z || k(i);
  }, ne = (i) => {
    j && !z || ie(i);
  };
  s && d && (t instanceof Storage ? F(s, "storage", te, { passive: !0 }) : F(s, _, ne)), j ? Te(() => {
    z = !0, k();
  }) : k();
  function L(i, u) {
    if (s) {
      const p = {
        key: y.value,
        oldValue: i,
        newValue: u,
        storageArea: t
      };
      s.dispatchEvent(t instanceof Storage ? new StorageEvent("storage", p) : new CustomEvent(_, { detail: p }));
    }
  }
  function oe(i) {
    try {
      const u = t.getItem(y.value);
      if (i == null)
        L(u, null), t.removeItem(y.value);
      else {
        const p = M.write(i);
        u !== p && (t.setItem(y.value, p), L(u, p));
      }
    } catch (u) {
      f(u);
    }
  }
  function re(i) {
    const u = i ? i.newValue : t.getItem(y.value);
    if (u == null)
      return m && S != null && t.setItem(y.value, M.write(S)), S;
    if (!i && c) {
      const p = M.read(u);
      return typeof c == "function" ? c(p, S) : x === "object" && !Array.isArray(p) ? {
        ...S,
        ...p
      } : p;
    } else return typeof u != "string" ? u : M.read(u);
  }
  function k(i) {
    if (!(i && i.storageArea !== t)) {
      if (i && i.key == null) {
        b.value = S;
        return;
      }
      if (!(i && i.key !== y.value)) {
        ee();
        try {
          const u = M.write(b.value);
          (i === void 0 || (i == null ? void 0 : i.newValue) !== u) && (b.value = re(i));
        } catch (u) {
          f(u);
        } finally {
          i ? U(I) : I();
        }
      }
    }
  }
  function ie(i) {
    k(i.detail);
  }
  return b;
}
function Ue() {
  const e = He("theme", "light"), n = /* @__PURE__ */ Je(), t = () => {
    e.value = e.value === "light" ? "dark" : "light";
  }, o = () => {
    document.documentElement.classList.remove("theme-light", "theme-dark"), document.documentElement.classList.add(`theme-${e.value}`);
  };
  return o(), {
    theme: e,
    isDark: n,
    toggleTheme: t,
    applyTheme: o
  };
}
const q = {
  MyButton: Se,
  MyInput: be
}, Xe = {
  install(e) {
    Object.entries(q).forEach(([n, t]) => {
      e.component(n, t);
    });
  }
}, Ye = Object.keys(q);
export {
  Se as MyButton,
  be as MyInput,
  Ye as componentList,
  Xe as default,
  Ue as useTheme
};
