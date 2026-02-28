import { defineComponent as R, openBlock as W, createBlock as _, unref as A, mergeProps as I, withCtx as x, renderSlot as D, useAttrs as ee, useSlots as te, ref as M, resolveComponent as ne, createSlots as oe, renderList as re, normalizeProps as ie, guardReactiveProps as le, onMounted as ae, nextTick as J, readonly as V, watch as F, getCurrentInstance as ue, toRef as se, customRef as ce, shallowRef as fe, computed as G, toValue as h } from "vue";
import { ElButton as de } from "element-plus";
const pe = /* @__PURE__ */ R({
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
    return (o, t) => (W(), _(A(de), I({
      type: e.type,
      size: e.size,
      disabled: e.disabled,
      loading: e.loading,
      round: e.round,
      circle: e.circle
    }, o.$attrs), {
      default: x(() => [
        D(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type", "size", "disabled", "loading", "round", "circle"]));
  }
}), me = /* @__PURE__ */ R({
  __name: "input",
  setup(e, { expose: o }) {
    const t = ee(), n = te(), r = M();
    return o({
      clear: () => {
        var l;
        return (l = r.value) == null ? void 0 : l.clear();
      },
      select: () => {
        var l;
        return (l = r.value) == null ? void 0 : l.select();
      },
      focus: () => {
        var l;
        return (l = r.value) == null ? void 0 : l.focus();
      },
      blur: () => {
        var l;
        return (l = r.value) == null ? void 0 : l.blur();
      }
    }), (l, p) => {
      const m = ne("el-input");
      return W(), _(m, I(A(t), {
        ref_key: "elInputRef",
        ref: r
      }), oe({ _: 2 }, [
        re(A(n), (f, v) => ({
          name: v,
          fn: x((s) => [
            D(l.$slots, v, ie(le(s)))
          ])
        }))
      ]), 1040);
    };
  }
}), ye = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ve = Object.prototype.toString, ge = (e) => ve.call(e) === "[object Object]", he = () => {
};
function Se(...e) {
  if (e.length !== 1) return se(...e);
  const o = e[0];
  return typeof o == "function" ? V(ce(() => ({
    get: o,
    set: he
  }))) : M(o);
}
function be(e, o) {
  function t(...n) {
    return new Promise((r, a) => {
      Promise.resolve(e(() => o.apply(this, n), {
        fn: o,
        thisArg: this,
        args: n
      })).then(r).catch(a);
    });
  }
  return t;
}
const H = (e) => e();
function we(e = H, o = {}) {
  const { initialState: t = "active" } = o, n = Se(t === "active");
  function r() {
    n.value = !1;
  }
  function a() {
    n.value = !0;
  }
  const l = (...p) => {
    n.value && e(...p);
  };
  return {
    isActive: V(n),
    pause: r,
    resume: a,
    eventFilter: l
  };
}
function C(e) {
  return Array.isArray(e) ? e : [e];
}
function Ee(e) {
  return ue();
}
function Be(e, o, t = {}) {
  const { eventFilter: n = H, ...r } = t;
  return F(e, be(n, o), r);
}
function Oe(e, o, t = {}) {
  const { eventFilter: n, initialState: r = "active", ...a } = t, { eventFilter: l, pause: p, resume: m, isActive: f } = we(n, { initialState: r });
  return {
    stop: Be(e, o, {
      ...a,
      eventFilter: l
    }),
    pause: p,
    resume: m,
    isActive: f
  };
}
function Ae(e, o = !0, t) {
  Ee() ? ae(e, t) : o ? e() : J(e);
}
function ke(e, o, t) {
  return F(e, o, {
    ...t,
    immediate: !0
  });
}
const E = ye ? window : void 0;
function Te(e) {
  var o;
  const t = h(e);
  return (o = t == null ? void 0 : t.$el) !== null && o !== void 0 ? o : t;
}
function L(...e) {
  const o = (n, r, a, l) => (n.addEventListener(r, a, l), () => n.removeEventListener(r, a, l)), t = G(() => {
    const n = C(h(e[0])).filter((r) => r != null);
    return n.every((r) => typeof r != "string") ? n : void 0;
  });
  return ke(() => {
    var n, r;
    return [
      (n = (r = t.value) === null || r === void 0 ? void 0 : r.map((a) => Te(a))) !== null && n !== void 0 ? n : [E].filter((a) => a != null),
      C(h(t.value ? e[1] : e[0])),
      C(A(t.value ? e[2] : e[1])),
      h(t.value ? e[3] : e[2])
    ];
  }, ([n, r, a, l], p, m) => {
    if (!(n != null && n.length) || !(r != null && r.length) || !(a != null && a.length)) return;
    const f = ge(l) ? { ...l } : l, v = n.flatMap((s) => r.flatMap((k) => a.map((S) => o(s, k, S, f))));
    m(() => {
      v.forEach((s) => s());
    });
  }, { flush: "post" });
}
const B = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, O = "__vueuse_ssr_handlers__", ze = /* @__PURE__ */ Ce();
function Ce() {
  return O in B || (B[O] = B[O] || {}), B[O];
}
function Me(e, o) {
  return ze[e] || o;
}
function Fe(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const $e = {
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
}, P = "vueuse-storage";
function je(e, o, t, n = {}) {
  var r;
  const { flush: a = "pre", deep: l = !0, listenToStorageChanges: p = !0, writeDefaults: m = !0, mergeDefaults: f = !1, shallow: v, window: s = E, eventFilter: k, onError: S = (i) => {
    console.error(i);
  }, initOnMounted: T } = n, g = (v ? fe : M)(o), d = G(() => h(e));
  if (!t) try {
    t = Me("getDefaultStorage", () => E == null ? void 0 : E.localStorage)();
  } catch (i) {
    S(i);
  }
  if (!t) return g;
  const y = h(o), $ = Fe(y), b = (r = n.serializer) !== null && r !== void 0 ? r : $e[$], { pause: K, resume: j } = Oe(g, (i) => X(i), {
    flush: a,
    deep: l,
    eventFilter: k
  });
  F(d, () => w(), { flush: a });
  let z = !1;
  const Q = (i) => {
    T && !z || w(i);
  }, U = (i) => {
    T && !z || Z(i);
  };
  s && p && (t instanceof Storage ? L(s, "storage", Q, { passive: !0 }) : L(s, P, U)), T ? Ae(() => {
    z = !0, w();
  }) : w();
  function N(i, u) {
    if (s) {
      const c = {
        key: d.value,
        oldValue: i,
        newValue: u,
        storageArea: t
      };
      s.dispatchEvent(t instanceof Storage ? new StorageEvent("storage", c) : new CustomEvent(P, { detail: c }));
    }
  }
  function X(i) {
    try {
      const u = t.getItem(d.value);
      if (i == null)
        N(u, null), t.removeItem(d.value);
      else {
        const c = b.write(i);
        u !== c && (t.setItem(d.value, c), N(u, c));
      }
    } catch (u) {
      S(u);
    }
  }
  function Y(i) {
    const u = i ? i.newValue : t.getItem(d.value);
    if (u == null)
      return m && y != null && t.setItem(d.value, b.write(y)), y;
    if (!i && f) {
      const c = b.read(u);
      return typeof f == "function" ? f(c, y) : $ === "object" && !Array.isArray(c) ? {
        ...y,
        ...c
      } : c;
    } else return typeof u != "string" ? u : b.read(u);
  }
  function w(i) {
    if (!(i && i.storageArea !== t)) {
      if (i && i.key == null) {
        g.value = y;
        return;
      }
      if (!(i && i.key !== d.value)) {
        K();
        try {
          const u = b.write(g.value);
          (i === void 0 || (i == null ? void 0 : i.newValue) !== u) && (g.value = Y(i));
        } catch (u) {
          S(u);
        } finally {
          i ? J(j) : j();
        }
      }
    }
  }
  function Z(i) {
    w(i.detail);
  }
  return g;
}
function Pe() {
  const e = je("theme", "light"), o = (n) => {
    if (n !== e.value) {
      if (!n)
        throw new Error("newTheme is required");
      e.value = n, t();
    }
  }, t = () => {
    document.documentElement.classList.forEach((n) => {
      n.startsWith("theme-") && document.documentElement.classList.remove(n);
    }), e.value || (e.value = "light"), document.documentElement.classList.add(`theme-${e.value}`);
  };
  return t(), {
    theme: e,
    toggleTheme: o,
    applyTheme: t
  };
}
const q = {
  MyButton: pe,
  MyInput: me
}, Re = {
  install(e) {
    Object.entries(q).forEach(([o, t]) => {
      e.component(o, t);
    });
  }
}, We = Object.keys(q);
export {
  pe as MyButton,
  me as MyInput,
  We as componentList,
  Re as default,
  Pe as useTheme
};
