var $t = Object.defineProperty;
var xt = (l, t, s) => (t in l ? $t(l, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (l[t] = s));
var de = (l, t, s) => (xt(l, typeof t != "symbol" ? t + "" : t, s), s);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
    new MutationObserver((n) => {
        for (const r of n)
            if (r.type === "childList")
                for (const a of r.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
    }).observe(document, { childList: !0, subtree: !0 });
    function s(n) {
        const r = {};
        return (
            n.integrity && (r.integrity = n.integrity),
            n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
            n.crossOrigin === "use-credentials"
                ? (r.credentials = "include")
                : n.crossOrigin === "anonymous"
                  ? (r.credentials = "omit")
                  : (r.credentials = "same-origin"),
            r
        );
    }
    function i(n) {
        if (n.ep) return;
        n.ep = !0;
        const r = s(n);
        fetch(n.href, r);
    }
})();
function H() {}
function Nt(l) {
    return l();
}
function Ot() {
    return Object.create(null);
}
function Ae(l) {
    l.forEach(Nt);
}
function Rt(l) {
    return typeof l == "function";
}
function ee(l, t) {
    return l != l ? t == t : l !== t || (l && typeof l == "object") || typeof l == "function";
}
let Ye;
function Dt(l, t) {
    return l === t ? !0 : (Ye || (Ye = document.createElement("a")), (Ye.href = t), l === Ye.href);
}
function el(l) {
    return Object.keys(l).length === 0;
}
function Vt(l, ...t) {
    if (l == null) {
        for (const i of t) i(void 0);
        return H;
    }
    const s = l.subscribe(...t);
    return s.unsubscribe ? () => s.unsubscribe() : s;
}
function dt(l) {
    let t;
    return Vt(l, (s) => (t = s))(), t;
}
function tl(l, t, s) {
    l.$$.on_destroy.push(Vt(t, s));
}
function $e(l) {
    return l ?? "";
}
function o(l, t) {
    l.appendChild(t);
}
function O(l, t, s) {
    l.insertBefore(t, s || null);
}
function T(l) {
    l.parentNode && l.parentNode.removeChild(l);
}
function ll(l, t) {
    for (let s = 0; s < l.length; s += 1) l[s] && l[s].d(t);
}
function m(l) {
    return document.createElement(l);
}
function p(l) {
    return document.createElementNS("http://www.w3.org/2000/svg", l);
}
function Z(l) {
    return document.createTextNode(l);
}
function E() {
    return Z(" ");
}
function Gt() {
    return Z("");
}
function B(l, t, s, i) {
    return l.addEventListener(t, s, i), () => l.removeEventListener(t, s, i);
}
function e(l, t, s) {
    s == null ? l.removeAttribute(t) : l.getAttribute(t) !== s && l.setAttribute(t, s);
}
function ze(l) {
    return l === "" ? null : +l;
}
function sl(l) {
    return Array.from(l.childNodes);
}
function Fe(l, t) {
    (t = "" + t), l.data !== t && (l.data = t);
}
function I(l, t) {
    l.value = t ?? "";
}
function P(l, t, s, i) {
    s == null ? l.style.removeProperty(t) : l.style.setProperty(t, s, i ? "important" : "");
}
let Re;
function Ne(l) {
    Re = l;
}
function Ut() {
    if (!Re) throw new Error("Function called outside component initialization");
    return Re;
}
function se(l) {
    Ut().$$.on_mount.push(l);
}
function Kt(l) {
    Ut().$$.on_destroy.push(l);
}
const Te = [],
    At = [];
let Oe = [];
const Lt = [],
    nl = Promise.resolve();
let ut = !1;
function il() {
    ut || ((ut = !0), nl.then(Jt));
}
function pt(l) {
    Oe.push(l);
}
const ft = new Set();
let je = 0;
function Jt() {
    if (je !== 0) return;
    const l = Re;
    do {
        try {
            for (; je < Te.length; ) {
                const t = Te[je];
                je++, Ne(t), rl(t.$$);
            }
        } catch (t) {
            throw ((Te.length = 0), (je = 0), t);
        }
        for (Ne(null), Te.length = 0, je = 0; At.length; ) At.pop()();
        for (let t = 0; t < Oe.length; t += 1) {
            const s = Oe[t];
            ft.has(s) || (ft.add(s), s());
        }
        Oe.length = 0;
    } while (Te.length);
    for (; Lt.length; ) Lt.pop()();
    (ut = !1), ft.clear(), Ne(l);
}
function rl(l) {
    if (l.fragment !== null) {
        l.update(), Ae(l.before_update);
        const t = l.dirty;
        (l.dirty = [-1]), l.fragment && l.fragment.p(l.ctx, t), l.after_update.forEach(pt);
    }
}
function ol(l) {
    const t = [],
        s = [];
    Oe.forEach((i) => (l.indexOf(i) === -1 ? t.push(i) : s.push(i))), s.forEach((i) => i()), (Oe = t);
}
const Ze = new Set();
let ge;
function Wt() {
    ge = { r: 0, c: [], p: ge };
}
function Qt() {
    ge.r || Ae(ge.c), (ge = ge.p);
}
function z(l, t) {
    l && l.i && (Ze.delete(l), l.i(t));
}
function G(l, t, s, i) {
    if (l && l.o) {
        if (Ze.has(l)) return;
        Ze.add(l),
            ge.c.push(() => {
                Ze.delete(l), i && (s && l.d(1), i());
            }),
            l.o(t);
    } else i && i();
}
function Pt(l) {
    return (l == null ? void 0 : l.length) !== void 0 ? l : Array.from(l);
}
function ce(l) {
    l && l.c();
}
function ne(l, t, s) {
    const { fragment: i, after_update: n } = l.$$;
    i && i.m(t, s),
        pt(() => {
            const r = l.$$.on_mount.map(Nt).filter(Rt);
            l.$$.on_destroy ? l.$$.on_destroy.push(...r) : Ae(r), (l.$$.on_mount = []);
        }),
        n.forEach(pt);
}
function ie(l, t) {
    const s = l.$$;
    s.fragment !== null &&
        (ol(s.after_update),
        Ae(s.on_destroy),
        s.fragment && s.fragment.d(t),
        (s.on_destroy = s.fragment = null),
        (s.ctx = []));
}
function al(l, t) {
    l.$$.dirty[0] === -1 && (Te.push(l), il(), l.$$.dirty.fill(0)), (l.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
}
function re(l, t, s, i, n, r, a, c = [-1]) {
    const u = Re;
    Ne(l);
    const f = (l.$$ = {
        fragment: null,
        ctx: [],
        props: r,
        update: H,
        not_equal: n,
        bound: Ot(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(t.context || (u ? u.$$.context : [])),
        callbacks: Ot(),
        dirty: c,
        skip_bound: !1,
        root: t.target || u.$$.root,
    });
    a && a(f.root);
    let v = !1;
    if (
        ((f.ctx = s
            ? s(l, t.props || {}, (d, k, ...w) => {
                  const h = w.length ? w[0] : k;
                  return (
                      f.ctx &&
                          n(f.ctx[d], (f.ctx[d] = h)) &&
                          (!f.skip_bound && f.bound[d] && f.bound[d](h), v && al(l, d)),
                      k
                  );
              })
            : []),
        f.update(),
        (v = !0),
        Ae(f.before_update),
        (f.fragment = i ? i(f.ctx) : !1),
        t.target)
    ) {
        if (t.hydrate) {
            const d = sl(t.target);
            f.fragment && f.fragment.l(d), d.forEach(T);
        } else f.fragment && f.fragment.c();
        t.intro && z(l.$$.fragment), ne(l, t.target, t.anchor), Jt();
    }
    Ne(u);
}
class oe {
    constructor() {
        de(this, "$$");
        de(this, "$$set");
    }
    $destroy() {
        ie(this, 1), (this.$destroy = H);
    }
    $on(t, s) {
        if (!Rt(s)) return H;
        const i = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return (
            i.push(s),
            () => {
                const n = i.indexOf(s);
                n !== -1 && i.splice(n, 1);
            }
        );
    }
    $set(t) {
        this.$$set && !el(t) && ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
}
const cl = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(cl);
const Ee = [];
function xe(l, t = H) {
    let s;
    const i = new Set();
    function n(c) {
        if (ee(l, c) && ((l = c), s)) {
            const u = !Ee.length;
            for (const f of i) f[1](), Ee.push(f, l);
            if (u) {
                for (let f = 0; f < Ee.length; f += 2) Ee[f][0](Ee[f + 1]);
                Ee.length = 0;
            }
        }
    }
    function r(c) {
        n(c(l));
    }
    function a(c, u = H) {
        const f = [c, u];
        return (
            i.add(f),
            i.size === 1 && (s = t(n, r) || H),
            c(l),
            () => {
                i.delete(f), i.size === 0 && s && (s(), (s = null));
            }
        );
    }
    return { set: n, update: r, subscribe: a };
}
const Xt = xe({ fallbackResourceName: "debug", allowEscapeKey: !0 }),
    fl = xe(window.GetParentResourceName ? "SK-UI" : dt(Xt).DEBUG_RESOURCE_NAME),
    Yt = xe(!window.invokeNative);
let V = xe(!1);
var Zt = ((l) => (
    (l.visible = "resource:visible"),
    (l.imageResize = "resource:imageSize"),
    (l.imageInvert = "resource:imageInvert"),
    (l.changeText = "resource:changeText"),
    (l.resetText = "resource:resetText"),
    l
))(Zt || {});
dt(Yt);
dt(fl);
function ul(l, t) {
    const s = (i) => {
        const { action: n, data: r } = i.data;
        n === l && t(r);
    };
    se(() => window.addEventListener("message", s)), Kt(() => window.removeEventListener("message", s));
}
const pl = [
    {
        action: Zt.visible,
        handler: (l) => {
            console.log("This is always listened to because it is in the AlwaysListened array.");
        },
    },
];
function hl() {
    for (const l of pl) ul(l.action, l.handler);
}
function dl(l) {
    let t, s, i;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("circle")),
                e(s, "d", "M24 58V2"),
                e(s, "class", "grow-line svelte-omcv5l"),
                e(s, "stroke", l[1]),
                e(s, "stroke-width", "2"),
                e(s, "fill", "none"),
                e(i, "cx", "24"),
                e(i, "cy", "2"),
                e(i, "r", "2"),
                e(i, "fill", l[0]),
                e(i, "class", "pop-circle svelte-omcv5l"),
                e(t, "width", "48"),
                e(t, "height", "58"),
                e(t, "viewBox", "0 0 48 58"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(n, r) {
            O(n, t, r), o(t, s), o(t, i);
        },
        p(n, [r]) {
            r & 2 && e(s, "stroke", n[1]), r & 1 && e(i, "fill", n[0]);
        },
        i: H,
        o: H,
        d(n) {
            n && T(t);
        },
    };
}
function gl(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 0.7 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(0, (i = r.fill)), "stroke" in r && s(1, (n = r.stroke));
        }),
        [i, n]
    );
}
class vl extends oe {
    constructor(t) {
        super(), re(this, t, gl, dl, ee, { fill: 0, stroke: 1 });
    }
}
function kl(l) {
    let t, s, i, n, r, a;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("circle")),
                (a = p("circle")),
                e(s, "d", "M24 58V20"),
                e(s, "class", "grow-line svelte-1dw3cfb"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M6 16 H14 C18 16 20 18 24 20"),
                e(i, "class", "fade-line svelte-1dw3cfb"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M42 16 H34 C30 16 28 18 24 20"),
                e(n, "class", "fade-line svelte-1dw3cfb"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "cx", "6"),
                e(r, "cy", "16"),
                e(r, "r", "2"),
                e(r, "class", "pop-circle svelte-1dw3cfb"),
                e(r, "fill", l[0]),
                e(a, "cx", "42"),
                e(a, "cy", "16"),
                e(a, "r", "2"),
                e(a, "class", "pop-circle svelte-1dw3cfb"),
                e(a, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "58"),
                e(t, "viewBox", "0 0 48 58"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(c, u) {
            O(c, t, u), o(t, s), o(t, i), o(t, n), o(t, r), o(t, a);
        },
        p(c, [u]) {
            u & 1 && e(s, "stroke", c[0]),
                u & 1 && e(i, "stroke", c[0]),
                u & 1 && e(n, "stroke", c[0]),
                u & 1 && e(r, "fill", c[0]),
                u & 1 && e(a, "fill", c[0]);
        },
        i: H,
        o: H,
        d(c) {
            c && T(t);
        },
    };
}
function ml(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 0.8 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class _l extends oe {
    constructor(t) {
        super(), re(this, t, ml, kl, ee, { fill: 1, stroke: 0 });
    }
}
function wl(l) {
    let t, s, i, n, r, a, c, u;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("circle")),
                (c = p("circle")),
                (u = p("circle")),
                e(s, "d", "M24 80V10"),
                e(s, "class", "grow-main svelte-4bpcgj"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M24 10V2"),
                e(i, "class", "grow-top svelte-4bpcgj"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M6 26 H14 C18 26 20 28 24 30"),
                e(n, "class", "fade-line svelte-4bpcgj"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M42 26 H34 C30 26 28 28 24 30"),
                e(r, "class", "fade-line svelte-4bpcgj"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "cx", "6"),
                e(a, "cy", "26"),
                e(a, "r", "2"),
                e(a, "class", "pop-circle svelte-4bpcgj"),
                e(a, "fill", l[0]),
                e(c, "cx", "42"),
                e(c, "cy", "26"),
                e(c, "r", "2"),
                e(c, "class", "pop-circle svelte-4bpcgj"),
                e(c, "fill", l[0]),
                e(u, "cx", "24"),
                e(u, "cy", "2"),
                e(u, "r", "2"),
                e(u, "class", "pop-circle svelte-4bpcgj"),
                e(u, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "100"),
                e(t, "viewBox", "0 0 48 100"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(f, v) {
            O(f, t, v), o(t, s), o(t, i), o(t, n), o(t, r), o(t, a), o(t, c), o(t, u);
        },
        p(f, [v]) {
            v & 1 && e(s, "stroke", f[0]),
                v & 1 && e(i, "stroke", f[0]),
                v & 1 && e(n, "stroke", f[0]),
                v & 1 && e(r, "stroke", f[0]),
                v & 1 && e(a, "fill", f[0]),
                v & 1 && e(c, "fill", f[0]),
                v & 1 && e(u, "fill", f[0]);
        },
        i: H,
        o: H,
        d(f) {
            f && T(t);
        },
    };
}
function bl(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 0.9 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class yl extends oe {
    constructor(t) {
        super(), re(this, t, bl, wl, ee, { fill: 1, stroke: 0 });
    }
}
function Ml(l) {
    let t, s, i, n, r, a, c, u, f, v;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("path")),
                (c = p("circle")),
                (u = p("circle")),
                (f = p("circle")),
                (v = p("circle")),
                e(s, "d", "M24 90V10"),
                e(s, "class", "grow-main svelte-10v9k0c"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M6 6 H14 C18 6 20 8 24 10"),
                e(i, "class", "fade-line svelte-10v9k0c"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M42 6 H34 C30 6 28 8 24 10"),
                e(n, "class", "fade-line svelte-10v9k0c"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M10 46 H17 C20 46 22 48 24 50"),
                e(r, "class", "fade-line svelte-10v9k0c"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "d", "M38 46 H31 C28 46 26 48 24 50"),
                e(a, "class", "fade-line svelte-10v9k0c"),
                e(a, "stroke", l[0]),
                e(a, "stroke-width", "2"),
                e(a, "fill", "none"),
                e(c, "cx", "6"),
                e(c, "cy", "6"),
                e(c, "r", "2"),
                e(c, "class", "pop-circle svelte-10v9k0c"),
                e(c, "fill", l[0]),
                e(u, "cx", "42"),
                e(u, "cy", "6"),
                e(u, "r", "2"),
                e(u, "class", "pop-circle svelte-10v9k0c"),
                e(u, "fill", l[0]),
                e(f, "cx", "10"),
                e(f, "cy", "46"),
                e(f, "r", "2"),
                e(f, "class", "pop-circle svelte-10v9k0c"),
                e(f, "fill", l[0]),
                e(v, "cx", "38"),
                e(v, "cy", "46"),
                e(v, "r", "2"),
                e(v, "class", "pop-circle svelte-10v9k0c"),
                e(v, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "90"),
                e(t, "viewBox", "0 0 48 90"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(d, k) {
            O(d, t, k), o(t, s), o(t, i), o(t, n), o(t, r), o(t, a), o(t, c), o(t, u), o(t, f), o(t, v);
        },
        p(d, [k]) {
            k & 1 && e(s, "stroke", d[0]),
                k & 1 && e(i, "stroke", d[0]),
                k & 1 && e(n, "stroke", d[0]),
                k & 1 && e(r, "stroke", d[0]),
                k & 1 && e(a, "stroke", d[0]),
                k & 1 && e(c, "fill", d[0]),
                k & 1 && e(u, "fill", d[0]),
                k & 1 && e(f, "fill", d[0]),
                k & 1 && e(v, "fill", d[0]);
        },
        i: H,
        o: H,
        d(d) {
            d && T(t);
        },
    };
}
function Cl(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 1 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class Sl extends oe {
    constructor(t) {
        super(), re(this, t, Cl, Ml, ee, { fill: 1, stroke: 0 });
    }
}
function jl(l) {
    let t, s, i, n, r, a, c, u, f, v, d, k;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("path")),
                (c = p("path")),
                (u = p("circle")),
                (f = p("circle")),
                (v = p("circle")),
                (d = p("circle")),
                (k = p("circle")),
                e(s, "d", "M24 95V10"),
                e(s, "class", "grow-main svelte-1pxkvii"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M24 10 V2"),
                e(i, "class", "fade-vertical svelte-1pxkvii"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M6 26 H14 C18 26 20 28 24 30"),
                e(n, "class", "fade-line svelte-1pxkvii"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M42 26 H34 C30 26 28 28 24 30"),
                e(r, "class", "fade-line svelte-1pxkvii"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "d", "M10 66 H17 C20 66 22 68 24 70"),
                e(a, "class", "fade-line svelte-1pxkvii"),
                e(a, "stroke", l[0]),
                e(a, "stroke-width", "2"),
                e(a, "fill", "none"),
                e(c, "d", "M38 66 H31 C28 66 26 68 24 70"),
                e(c, "class", "fade-line svelte-1pxkvii"),
                e(c, "stroke", l[0]),
                e(c, "stroke-width", "2"),
                e(c, "fill", "none"),
                e(u, "cx", "6"),
                e(u, "cy", "26"),
                e(u, "r", "2"),
                e(u, "class", "pop-circle svelte-1pxkvii"),
                e(u, "fill", l[0]),
                e(f, "cx", "42"),
                e(f, "cy", "26"),
                e(f, "r", "2"),
                e(f, "class", "pop-circle svelte-1pxkvii"),
                e(f, "fill", l[0]),
                e(v, "cx", "24"),
                e(v, "cy", "2"),
                e(v, "r", "2"),
                e(v, "class", "pop-circle svelte-1pxkvii"),
                e(v, "fill", l[0]),
                e(d, "cx", "10"),
                e(d, "cy", "66"),
                e(d, "r", "2"),
                e(d, "class", "pop-circle svelte-1pxkvii"),
                e(d, "fill", l[0]),
                e(k, "cx", "38"),
                e(k, "cy", "66"),
                e(k, "r", "2"),
                e(k, "class", "pop-circle svelte-1pxkvii"),
                e(k, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "120"),
                e(t, "viewBox", "0 0 48 120"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(w, h) {
            O(w, t, h),
                o(t, s),
                o(t, i),
                o(t, n),
                o(t, r),
                o(t, a),
                o(t, c),
                o(t, u),
                o(t, f),
                o(t, v),
                o(t, d),
                o(t, k);
        },
        p(w, [h]) {
            h & 1 && e(s, "stroke", w[0]),
                h & 1 && e(i, "stroke", w[0]),
                h & 1 && e(n, "stroke", w[0]),
                h & 1 && e(r, "stroke", w[0]),
                h & 1 && e(a, "stroke", w[0]),
                h & 1 && e(c, "stroke", w[0]),
                h & 1 && e(u, "fill", w[0]),
                h & 1 && e(f, "fill", w[0]),
                h & 1 && e(v, "fill", w[0]),
                h & 1 && e(d, "fill", w[0]),
                h & 1 && e(k, "fill", w[0]);
        },
        i: H,
        o: H,
        d(w) {
            w && T(t);
        },
    };
}
function El(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 1.1 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class Fl extends oe {
    constructor(t) {
        super(), re(this, t, El, jl, ee, { fill: 1, stroke: 0 });
    }
}
function Tl(l) {
    let t, s, i, n, r, a, c, u, f, v, d, k, w, h;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("path")),
                (c = p("path")),
                (u = p("path")),
                (f = p("circle")),
                (v = p("circle")),
                (d = p("circle")),
                (k = p("circle")),
                (w = p("circle")),
                (h = p("circle")),
                e(s, "d", "M24 150V30"),
                e(s, "class", "grow-main svelte-p16grq"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M6 26 H14 C18 26 20 28 24 30"),
                e(i, "class", "fade-line svelte-p16grq"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M42 26 H34 C30 26 28 28 24 30"),
                e(n, "class", "fade-line svelte-p16grq"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M10 76 H17 C20 76 22 78 24 80"),
                e(r, "class", "fade-line svelte-p16grq"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "d", "M38 76 H31 C28 76 26 78 24 80"),
                e(a, "class", "fade-line svelte-p16grq"),
                e(a, "stroke", l[0]),
                e(a, "stroke-width", "2"),
                e(a, "fill", "none"),
                e(c, "d", "M10 126 H17 C20 126 22 128 24 130"),
                e(c, "class", "fade-line svelte-p16grq"),
                e(c, "stroke", l[0]),
                e(c, "stroke-width", "2"),
                e(c, "fill", "none"),
                e(u, "d", "M38 126 H31 C28 126 26 128 24 130"),
                e(u, "class", "fade-line svelte-p16grq"),
                e(u, "stroke", l[0]),
                e(u, "stroke-width", "2"),
                e(u, "fill", "none"),
                e(f, "cx", "6"),
                e(f, "cy", "26"),
                e(f, "r", "2"),
                e(f, "class", "pop-circle svelte-p16grq"),
                e(f, "fill", l[0]),
                e(v, "cx", "42"),
                e(v, "cy", "26"),
                e(v, "r", "2"),
                e(v, "class", "pop-circle svelte-p16grq"),
                e(v, "fill", l[0]),
                e(d, "cx", "10"),
                e(d, "cy", "76"),
                e(d, "r", "2"),
                e(d, "class", "pop-circle svelte-p16grq"),
                e(d, "fill", l[0]),
                e(k, "cx", "38"),
                e(k, "cy", "76"),
                e(k, "r", "2"),
                e(k, "class", "pop-circle svelte-p16grq"),
                e(k, "fill", l[0]),
                e(w, "cx", "10"),
                e(w, "cy", "126"),
                e(w, "r", "2"),
                e(w, "class", "pop-circle svelte-p16grq"),
                e(w, "fill", l[0]),
                e(h, "cx", "38"),
                e(h, "cy", "126"),
                e(h, "r", "2"),
                e(h, "class", "pop-circle svelte-p16grq"),
                e(h, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "180"),
                e(t, "viewBox", "0 0 48 180"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(M, b) {
            O(M, t, b),
                o(t, s),
                o(t, i),
                o(t, n),
                o(t, r),
                o(t, a),
                o(t, c),
                o(t, u),
                o(t, f),
                o(t, v),
                o(t, d),
                o(t, k),
                o(t, w),
                o(t, h);
        },
        p(M, [b]) {
            b & 1 && e(s, "stroke", M[0]),
                b & 1 && e(i, "stroke", M[0]),
                b & 1 && e(n, "stroke", M[0]),
                b & 1 && e(r, "stroke", M[0]),
                b & 1 && e(a, "stroke", M[0]),
                b & 1 && e(c, "stroke", M[0]),
                b & 1 && e(u, "stroke", M[0]),
                b & 1 && e(f, "fill", M[0]),
                b & 1 && e(v, "fill", M[0]),
                b & 1 && e(d, "fill", M[0]),
                b & 1 && e(k, "fill", M[0]),
                b & 1 && e(w, "fill", M[0]),
                b & 1 && e(h, "fill", M[0]);
        },
        i: H,
        o: H,
        d(M) {
            M && T(t);
        },
    };
}
function Ol(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 1.2 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class Al extends oe {
    constructor(t) {
        super(), re(this, t, Ol, Tl, ee, { fill: 1, stroke: 0 });
    }
}
function Ll(l) {
    let t, s, i, n, r, a, c, u, f, v, d, k, w, h, M, b;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("path")),
                (c = p("path")),
                (u = p("path")),
                (f = p("path")),
                (v = p("circle")),
                (d = p("circle")),
                (k = p("circle")),
                (w = p("circle")),
                (h = p("circle")),
                (M = p("circle")),
                (b = p("circle")),
                e(s, "d", "M24 150V30"),
                e(s, "class", "grow-main svelte-p16grq"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M24 0 V30"),
                e(i, "class", "fade-line svelte-p16grq"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M6 26 H14 C18 26 20 28 24 30"),
                e(n, "class", "fade-line svelte-p16grq"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M42 26 H34 C30 26 28 28 24 30"),
                e(r, "class", "fade-line svelte-p16grq"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "d", "M10 76 H17 C20 76 22 78 24 80"),
                e(a, "class", "fade-line svelte-p16grq"),
                e(a, "stroke", l[0]),
                e(a, "stroke-width", "2"),
                e(a, "fill", "none"),
                e(c, "d", "M38 76 H31 C28 76 26 78 24 80"),
                e(c, "class", "fade-line svelte-p16grq"),
                e(c, "stroke", l[0]),
                e(c, "stroke-width", "2"),
                e(c, "fill", "none"),
                e(u, "d", "M10 126 H17 C20 126 22 128 24 130"),
                e(u, "class", "fade-line svelte-p16grq"),
                e(u, "stroke", l[0]),
                e(u, "stroke-width", "2"),
                e(u, "fill", "none"),
                e(f, "d", "M38 126 H31 C28 126 26 128 24 130"),
                e(f, "class", "fade-line svelte-p16grq"),
                e(f, "stroke", l[0]),
                e(f, "stroke-width", "2"),
                e(f, "fill", "none"),
                e(v, "cx", "24"),
                e(v, "cy", "2"),
                e(v, "r", "2"),
                e(v, "class", "pop-circle svelte-p16grq"),
                e(v, "fill", l[0]),
                e(d, "cx", "6"),
                e(d, "cy", "26"),
                e(d, "r", "2"),
                e(d, "class", "pop-circle svelte-p16grq"),
                e(d, "fill", l[0]),
                e(k, "cx", "42"),
                e(k, "cy", "26"),
                e(k, "r", "2"),
                e(k, "class", "pop-circle svelte-p16grq"),
                e(k, "fill", l[0]),
                e(w, "cx", "10"),
                e(w, "cy", "76"),
                e(w, "r", "2"),
                e(w, "class", "pop-circle svelte-p16grq"),
                e(w, "fill", l[0]),
                e(h, "cx", "38"),
                e(h, "cy", "76"),
                e(h, "r", "2"),
                e(h, "class", "pop-circle svelte-p16grq"),
                e(h, "fill", l[0]),
                e(M, "cx", "10"),
                e(M, "cy", "126"),
                e(M, "r", "2"),
                e(M, "class", "pop-circle svelte-p16grq"),
                e(M, "fill", l[0]),
                e(b, "cx", "38"),
                e(b, "cy", "126"),
                e(b, "r", "2"),
                e(b, "class", "pop-circle svelte-p16grq"),
                e(b, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "180"),
                e(t, "viewBox", "0 0 48 180"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(_, g) {
            O(_, t, g),
                o(t, s),
                o(t, i),
                o(t, n),
                o(t, r),
                o(t, a),
                o(t, c),
                o(t, u),
                o(t, f),
                o(t, v),
                o(t, d),
                o(t, k),
                o(t, w),
                o(t, h),
                o(t, M),
                o(t, b);
        },
        p(_, [g]) {
            g & 1 && e(s, "stroke", _[0]),
                g & 1 && e(i, "stroke", _[0]),
                g & 1 && e(n, "stroke", _[0]),
                g & 1 && e(r, "stroke", _[0]),
                g & 1 && e(a, "stroke", _[0]),
                g & 1 && e(c, "stroke", _[0]),
                g & 1 && e(u, "stroke", _[0]),
                g & 1 && e(f, "stroke", _[0]),
                g & 1 && e(v, "fill", _[0]),
                g & 1 && e(d, "fill", _[0]),
                g & 1 && e(k, "fill", _[0]),
                g & 1 && e(w, "fill", _[0]),
                g & 1 && e(h, "fill", _[0]),
                g & 1 && e(M, "fill", _[0]),
                g & 1 && e(b, "fill", _[0]);
        },
        i: H,
        o: H,
        d(_) {
            _ && T(t);
        },
    };
}
function Pl(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 1.3 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class Hl extends oe {
    constructor(t) {
        super(), re(this, t, Pl, Ll, ee, { fill: 1, stroke: 0 });
    }
}
function Il(l) {
    let t, s, i, n, r, a, c, u, f, v, d, k, w, h, M, b, _, g;
    return {
        c() {
            (t = p("svg")),
                (s = p("path")),
                (i = p("path")),
                (n = p("path")),
                (r = p("path")),
                (a = p("path")),
                (c = p("path")),
                (u = p("path")),
                (f = p("path")),
                (v = p("path")),
                (d = p("circle")),
                (k = p("circle")),
                (w = p("circle")),
                (h = p("circle")),
                (M = p("circle")),
                (b = p("circle")),
                (_ = p("circle")),
                (g = p("circle")),
                e(s, "d", "M24 210V30"),
                e(s, "class", "grow-main svelte-ovkyfi"),
                e(s, "stroke", l[0]),
                e(s, "stroke-width", "2"),
                e(i, "d", "M6 26 H14 C18 26 20 28 24 30"),
                e(i, "class", "fade-line svelte-ovkyfi"),
                e(i, "stroke", l[0]),
                e(i, "stroke-width", "2"),
                e(i, "fill", "none"),
                e(n, "d", "M42 26 H34 C30 26 28 28 24 30"),
                e(n, "class", "fade-line svelte-ovkyfi"),
                e(n, "stroke", l[0]),
                e(n, "stroke-width", "2"),
                e(n, "fill", "none"),
                e(r, "d", "M10 76 H17 C20 76 22 78 24 80"),
                e(r, "class", "fade-line svelte-ovkyfi"),
                e(r, "stroke", l[0]),
                e(r, "stroke-width", "2"),
                e(r, "fill", "none"),
                e(a, "d", "M38 76 H31 C28 76 26 78 24 80"),
                e(a, "class", "fade-line svelte-ovkyfi"),
                e(a, "stroke", l[0]),
                e(a, "stroke-width", "2"),
                e(a, "fill", "none"),
                e(c, "d", "M10 126 H17 C20 126 22 128 24 130"),
                e(c, "class", "fade-line svelte-ovkyfi"),
                e(c, "stroke", l[0]),
                e(c, "stroke-width", "2"),
                e(c, "fill", "none"),
                e(u, "d", "M38 126 H31 C28 126 26 128 24 130"),
                e(u, "class", "fade-line svelte-ovkyfi"),
                e(u, "stroke", l[0]),
                e(u, "stroke-width", "2"),
                e(u, "fill", "none"),
                e(f, "d", "M10 176 H17 C20 176 22 178 24 180"),
                e(f, "class", "fade-line svelte-ovkyfi"),
                e(f, "stroke", l[0]),
                e(f, "stroke-width", "2"),
                e(f, "fill", "none"),
                e(v, "d", "M38 176 H31 C28 176 26 178 24 180"),
                e(v, "class", "fade-line svelte-ovkyfi"),
                e(v, "stroke", l[0]),
                e(v, "stroke-width", "2"),
                e(v, "fill", "none"),
                e(d, "cx", "6"),
                e(d, "cy", "26"),
                e(d, "r", "2"),
                e(d, "class", "pop-circle svelte-ovkyfi"),
                e(d, "fill", l[0]),
                e(k, "cx", "42"),
                e(k, "cy", "26"),
                e(k, "r", "2"),
                e(k, "class", "pop-circle svelte-ovkyfi"),
                e(k, "fill", l[0]),
                e(w, "cx", "10"),
                e(w, "cy", "76"),
                e(w, "r", "2"),
                e(w, "class", "pop-circle svelte-ovkyfi"),
                e(w, "fill", l[0]),
                e(h, "cx", "38"),
                e(h, "cy", "76"),
                e(h, "r", "2"),
                e(h, "class", "pop-circle svelte-ovkyfi"),
                e(h, "fill", l[0]),
                e(M, "cx", "10"),
                e(M, "cy", "126"),
                e(M, "r", "2"),
                e(M, "class", "pop-circle svelte-ovkyfi"),
                e(M, "fill", l[0]),
                e(b, "cx", "38"),
                e(b, "cy", "126"),
                e(b, "r", "2"),
                e(b, "class", "pop-circle svelte-ovkyfi"),
                e(b, "fill", l[0]),
                e(_, "cx", "10"),
                e(_, "cy", "176"),
                e(_, "r", "2"),
                e(_, "class", "pop-circle svelte-ovkyfi"),
                e(_, "fill", l[0]),
                e(g, "cx", "38"),
                e(g, "cy", "176"),
                e(g, "r", "2"),
                e(g, "class", "pop-circle svelte-ovkyfi"),
                e(g, "fill", l[0]),
                e(t, "width", "48"),
                e(t, "height", "260"),
                e(t, "viewBox", "0 0 48 260"),
                e(t, "fill", "none"),
                e(t, "xmlns", "http://www.w3.org/2000/svg");
        },
        m(S, j) {
            O(S, t, j),
                o(t, s),
                o(t, i),
                o(t, n),
                o(t, r),
                o(t, a),
                o(t, c),
                o(t, u),
                o(t, f),
                o(t, v),
                o(t, d),
                o(t, k),
                o(t, w),
                o(t, h),
                o(t, M),
                o(t, b),
                o(t, _),
                o(t, g);
        },
        p(S, [j]) {
            j & 1 && e(s, "stroke", S[0]),
                j & 1 && e(i, "stroke", S[0]),
                j & 1 && e(n, "stroke", S[0]),
                j & 1 && e(r, "stroke", S[0]),
                j & 1 && e(a, "stroke", S[0]),
                j & 1 && e(c, "stroke", S[0]),
                j & 1 && e(u, "stroke", S[0]),
                j & 1 && e(f, "stroke", S[0]),
                j & 1 && e(v, "stroke", S[0]),
                j & 1 && e(d, "fill", S[0]),
                j & 1 && e(k, "fill", S[0]),
                j & 1 && e(w, "fill", S[0]),
                j & 1 && e(h, "fill", S[0]),
                j & 1 && e(M, "fill", S[0]),
                j & 1 && e(b, "fill", S[0]),
                j & 1 && e(_, "fill", S[0]),
                j & 1 && e(g, "fill", S[0]);
        },
        i: H,
        o: H,
        d(S) {
            S && T(t);
        },
    };
}
function ql(l, t, s) {
    se(() => {
        setTimeout(() => {
            V.set(!0);
        }, 1.4 * 1e3);
    });
    let { fill: i = "#A1FF5F" } = t,
        { stroke: n = "#A1FF5F" } = t;
    return (
        (l.$$set = (r) => {
            "fill" in r && s(1, (i = r.fill)), "stroke" in r && s(0, (n = r.stroke));
        }),
        [n, i]
    );
}
class Bl extends oe {
    constructor(t) {
        super(), re(this, t, ql, Il, ee, { fill: 1, stroke: 0 });
    }
}
function ht(l) {
    return l && typeof l == "object" && typeof l.icon == "string" && typeof l.label == "string";
}
function he(l) {
    return Array.isArray(l.items) && l.items.length > 0;
}
function zl(l) {
    return (
        !he(l) &&
        (l.action !== void 0 ||
            l.onSelect !== void 0 ||
            l.event !== void 0 ||
            l.serverEvent !== void 0 ||
            l.command !== void 0 ||
            l.export !== void 0)
    );
}
class Nl {
    constructor() {
        de(this, "menuStack", []);
        de(this, "currentMenu", null);
        de(this, "activeMenuPath", []);
        de(this, "eventListeners", []);
    }
    navigateToSubMenu(t, s) {
        if (!Array.isArray(t) || t.length === 0) {
            this.logError({
                type: "navigation",
                message: "Cannot navigate to empty or invalid sub-menu",
                context: { items: t, menuName: s },
            });
            return;
        }
        const i = t.filter((n) =>
            ht(n)
                ? !0
                : (this.logError({ type: "validation", message: "Invalid target option in sub-menu", option: n }), !1)
        );
        if (i.length === 0) {
            this.logError({
                type: "navigation",
                message: "No valid options in sub-menu",
                context: { items: t, menuName: s },
            });
            return;
        }
        this.currentMenu && this.menuStack.push([...this.currentMenu]),
            (this.currentMenu = this.injectBackOption(i)),
            s && this.activeMenuPath.push(s),
            this.emitEvent({
                type: "navigate",
                payload: { targetMenu: this.currentMenu, menuPath: [...this.activeMenuPath] },
            });
    }
    navigateBack() {
        if (this.menuStack.length === 0)
            return (
                this.logError({ type: "navigation", message: "Cannot navigate back - no previous menu in stack" }), null
            );
        const t = this.menuStack.pop();
        return t
            ? ((this.currentMenu = t),
              this.activeMenuPath.length > 0 && this.activeMenuPath.pop(),
              this.emitEvent({
                  type: "back",
                  payload: { targetMenu: this.currentMenu, menuPath: [...this.activeMenuPath] },
              }),
              this.currentMenu)
            : null;
    }
    resetToRoot() {
        (this.menuStack = []),
            (this.currentMenu = null),
            (this.activeMenuPath = []),
            this.emitEvent({ type: "reset", payload: { menuPath: [] } });
    }
    setRootMenu(t) {
        if ((this.resetToRoot(), !Array.isArray(t))) {
            this.logError({
                type: "validation",
                message: "Root menu options must be an array",
                context: { options: t },
            });
            return;
        }
        const s = t.filter((i) =>
            ht(i)
                ? !0
                : (this.logError({ type: "validation", message: "Invalid target option in root menu", option: i }), !1)
        );
        this.currentMenu = s;
    }
    getCurrentMenu() {
        return this.currentMenu;
    }
    isInSubMenu() {
        return this.menuStack.length > 0;
    }
    getNavigationState() {
        return {
            currentMenu: this.currentMenu,
            menuStack: [...this.menuStack],
            isInSubMenu: this.isInSubMenu(),
            activeMenuPath: [...this.activeMenuPath],
        };
    }
    getMenuPath() {
        return this.activeMenuPath.join(" > ");
    }
    injectBackOption(t) {
        return this.isInSubMenu()
            ? [
                  {
                      icon: "fa-solid fa-arrow-left",
                      label: "Go Back",
                      action: "__navigate_back",
                      name: "builtin:goback",
                  },
                  ...t,
              ]
            : t;
    }
    detectCircularReference(t, s = new Set()) {
        if (s.has(t)) return !0;
        if (!he(t)) return !1;
        s.add(t);
        for (const i of t.items) if (this.detectCircularReference(i, s)) return !0;
        return s.delete(t), !1;
    }
    addEventListener(t) {
        this.eventListeners.push(t);
    }
    removeEventListener(t) {
        const s = this.eventListeners.indexOf(t);
        s > -1 && this.eventListeners.splice(s, 1);
    }
    emitEvent(t) {
        this.eventListeners.forEach((s) => {
            try {
                s(t);
            } catch (i) {
                console.error("Error in navigation event listener:", i);
            }
        });
    }
    logError(t) {
        console.warn(`[MenuNavigation] ${t.type}: ${t.message}`, t.option || t.context);
    }
}
function Ht(l, t, s) {
    const i = l.slice();
    return (i[44] = t[s]), (i[46] = s), i;
}
function It(l) {
    let t, s, i, n, r, a, c, u, f, v, d, k;
    const w = [Wl, Jl, Kl, Ul, Gl, Vl, Dl, Rl],
        h = [];
    function M(g, S) {
        return g[13] === 1
            ? 0
            : g[13] === 2
              ? 1
              : g[13] === 3
                ? 2
                : g[13] === 4
                  ? 3
                  : g[13] === 5
                    ? 4
                    : g[13] === 6
                      ? 5
                      : g[13] === 7
                        ? 6
                        : g[13] === 8
                          ? 7
                          : -1;
    }
    ~(u = M(l)) && (f = h[u] = w[u](l));
    let b = Pt(l[14]),
        _ = [];
    for (let g = 0; g < b.length; g += 1) _[g] = Bt(Ht(l, b, g));
    return {
        c() {
            (t = m("div")),
                (s = m("div")),
                (i = m("div")),
                (n = m("i")),
                (a = E()),
                (c = m("div")),
                f && f.c(),
                (v = E()),
                (d = m("div"));
            for (let g = 0; g < _.length; g += 1) _[g].c();
            e(n, "class", (r = $e(l[22]) + " svelte-128csj5")),
                P(n, "position", "relative"),
                P(n, "font-size", l[21]),
                P(n, "color", l[13] > 0 ? l[7] : l[20]),
                P(n, "left", l[19]),
                P(n, "top", l[18]),
                e(i, "class", "target-eye svelte-128csj5"),
                e(c, "class", "line-container svelte-128csj5"),
                e(d, "class", "options-container svelte-128csj5"),
                e(s, "class", "target-container svelte-128csj5"),
                e(t, "class", "ui-wrapper svelte-128csj5");
        },
        m(g, S) {
            O(g, t, S), o(t, s), o(s, i), o(i, n), o(s, a), o(s, c), ~u && h[u].m(c, null), o(s, v), o(s, d);
            for (let j = 0; j < _.length; j += 1) _[j] && _[j].m(d, null);
            k = !0;
        },
        p(g, S) {
            (!k || (S[0] & 4194304 && r !== (r = $e(g[22]) + " svelte-128csj5"))) && e(n, "class", r),
                (!k || S[0] & 2097152) && P(n, "font-size", g[21]),
                (!k || S[0] & 1056896) && P(n, "color", g[13] > 0 ? g[7] : g[20]),
                (!k || S[0] & 524288) && P(n, "left", g[19]),
                (!k || S[0] & 262144) && P(n, "top", g[18]);
            let j = u;
            if (
                ((u = M(g)),
                u === j
                    ? ~u && h[u].p(g, S)
                    : (f &&
                          (Wt(),
                          G(h[j], 1, 1, () => {
                              h[j] = null;
                          }),
                          Qt()),
                      ~u
                          ? ((f = h[u]), f ? f.p(g, S) : ((f = h[u] = w[u](g)), f.c()), z(f, 1), f.m(c, null))
                          : (f = null)),
                S[0] & 25190400)
            ) {
                b = Pt(g[14]);
                let q;
                for (q = 0; q < b.length; q += 1) {
                    const U = Ht(g, b, q);
                    _[q] ? _[q].p(U, S) : ((_[q] = Bt(U)), _[q].c(), _[q].m(d, null));
                }
                for (; q < _.length; q += 1) _[q].d(1);
                _.length = b.length;
            }
        },
        i(g) {
            k || (z(f), (k = !0));
        },
        o(g) {
            G(f), (k = !1);
        },
        d(g) {
            g && T(t), ~u && h[u].d(), ll(_, g);
        },
    };
}
function Rl(l) {
    let t, s, i;
    return (
        (s = new Bl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-8 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Dl(l) {
    let t, s, i;
    return (
        (s = new Hl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-7 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Vl(l) {
    let t, s, i;
    return (
        (s = new Al({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-6 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Gl(l) {
    let t, s, i;
    return (
        (s = new Fl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-5 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Ul(l) {
    let t, s, i;
    return (
        (s = new Sl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-4 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Kl(l) {
    let t, s, i;
    return (
        (s = new yl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-3 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Jl(l) {
    let t, s, i;
    return (
        (s = new _l({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-2 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function Wl(l) {
    let t, s, i;
    return (
        (s = new vl({ props: { fill: l[10], stroke: l[10] } })),
        {
            c() {
                (t = m("div")), ce(s.$$.fragment), e(t, "class", "lines-1 svelte-128csj5");
            },
            m(n, r) {
                O(n, t, r), ne(s, t, null), (i = !0);
            },
            p(n, r) {
                const a = {};
                r[0] & 1024 && (a.fill = n[10]), r[0] & 1024 && (a.stroke = n[10]), s.$set(a);
            },
            i(n) {
                i || (z(s.$$.fragment, n), (i = !0));
            },
            o(n) {
                G(s.$$.fragment, n), (i = !1);
            },
            d(n) {
                n && T(t), ie(s);
            },
        }
    );
}
function qt(l) {
    let t;
    return {
        c() {
            (t = m("i")), e(t, "class", "fa-solid fa-chevron-right submenu-indicator svelte-128csj5");
        },
        m(s, i) {
            O(s, t, i);
        },
        d(s) {
            s && T(t);
        },
    };
}
function Bt(l) {
    let t,
        s,
        i,
        n,
        r,
        a = l[44].label + "",
        c,
        u,
        f = he(l[44]),
        v,
        d,
        k,
        w,
        h = f && qt();
    function M() {
        return l[26](l[44], l[46]);
    }
    return {
        c() {
            (t = m("div")),
                (s = m("i")),
                (r = E()),
                (c = Z(a)),
                (u = E()),
                h && h.c(),
                (v = E()),
                e(s, "class", (i = $e(`fa-fw ${l[44].icon}`) + " svelte-128csj5")),
                e(s, "style", (n = `color: ${l[44].iconColor || "var(--MainColor)"} !important;`)),
                e(
                    t,
                    "class",
                    (d =
                        "fade-options " +
                        (l[23] ? "show" : "") +
                        " option option-" +
                        (l[46] + 1) +
                        "-linecount-" +
                        l[13] +
                        " " +
                        (he(l[44]) ? "has-submenu" : "") +
                        " " +
                        (l[44].name === "builtin:goback" ? "back-option" : "") +
                        " svelte-128csj5")
                );
        },
        m(b, _) {
            O(b, t, _),
                o(t, s),
                o(t, r),
                o(t, c),
                o(t, u),
                h && h.m(t, null),
                o(t, v),
                k || ((w = B(t, "click", M)), (k = !0));
        },
        p(b, _) {
            (l = b),
                _[0] & 16384 && i !== (i = $e(`fa-fw ${l[44].icon}`) + " svelte-128csj5") && e(s, "class", i),
                _[0] & 16384 &&
                    n !== (n = `color: ${l[44].iconColor || "var(--MainColor)"} !important;`) &&
                    e(s, "style", n),
                _[0] & 16384 && a !== (a = l[44].label + "") && Fe(c, a),
                _[0] & 16384 && (f = he(l[44])),
                f ? h || ((h = qt()), h.c(), h.m(t, v)) : h && (h.d(1), (h = null)),
                _[0] & 8413184 &&
                    d !==
                        (d =
                            "fade-options " +
                            (l[23] ? "show" : "") +
                            " option option-" +
                            (l[46] + 1) +
                            "-linecount-" +
                            l[13] +
                            " " +
                            (he(l[44]) ? "has-submenu" : "") +
                            " " +
                            (l[44].name === "builtin:goback" ? "back-option" : "") +
                            " svelte-128csj5") &&
                    e(t, "class", d);
        },
        d(b) {
            b && T(t), h && h.d(), (k = !1), w();
        },
    };
}
function zt(l) {
    let t,
        s,
        i,
        n,
        r,
        a,
        c,
        u,
        f,
        v,
        d,
        k,
        w,
        h,
        M,
        b,
        _,
        g,
        S,
        j,
        q,
        U,
        K,
        N,
        Le,
        te,
        ve,
        ae,
        ke,
        fe,
        Pe,
        He,
        me = (l[4].toString().includes("rem") ? l[4] : l[4] + "rem") + "",
        Ie,
        De,
        R,
        Ve,
        A,
        _e,
        Ge,
        le,
        Ue,
        ue,
        y,
        F,
        D,
        J,
        $,
        we,
        qe,
        gt,
        be,
        vt,
        et,
        Ke = (l[21].toString().includes("px") ? l[21] : l[21] + "px") + "",
        tt,
        kt,
        W,
        mt,
        ye,
        _t,
        lt,
        Je = (l[19].toString().includes("rem") ? l[19] : l[19] + "rem") + "",
        st,
        wt,
        Q,
        bt,
        Me,
        yt,
        nt,
        We = (l[18].toString().includes("rem") ? l[18] : l[18] + "rem") + "",
        it,
        Mt,
        X,
        Ct,
        pe,
        Qe,
        St,
        x,
        jt,
        Xe,
        rt,
        ot,
        Et,
        Ce,
        at,
        Be,
        ct,
        Ft;
    function Tt(C, L) {
        if (C[15]) return Yl;
        if (C[16]) return Xl;
        if (C[17]) return Ql;
    }
    let Se = Tt(l),
        Y = Se && Se(l);
    return {
        c() {
            (t = m("div")),
                (s = m("div")),
                (s.innerHTML = '<label class="svelte-128csj5">🎯 Target Settings</label>'),
                (i = E()),
                (n = m("div")),
                (r = m("label")),
                (r.textContent = "Main Color"),
                (a = E()),
                (c = m("div")),
                (u = m("input")),
                (f = E()),
                (v = m("span")),
                (d = E()),
                (k = m("label")),
                (k.textContent = "Hover Color (RGBA)"),
                (w = E()),
                (h = m("input")),
                (M = E()),
                (b = m("span")),
                (_ = E()),
                (g = m("label")),
                (g.textContent = "Background Color (RGBA)"),
                (S = E()),
                (j = m("input")),
                (q = E()),
                (U = m("span")),
                (K = E()),
                (N = m("label")),
                (N.textContent = "Text Color"),
                (Le = E()),
                (te = m("input")),
                (ve = E()),
                (ae = m("span")),
                (ke = E()),
                (fe = m("label")),
                (Pe = Z("Text Size: ")),
                (He = m("span")),
                (Ie = Z(me)),
                (De = E()),
                (R = m("input")),
                (Ve = E()),
                (A = m("div")),
                (_e = m("label")),
                (_e.textContent = "Eye Icon (FA class)"),
                (Ge = E()),
                (le = m("input")),
                (Ue = E()),
                (ue = m("i")),
                (F = E()),
                (D = m("label")),
                (D.textContent = "Eye Color"),
                (J = E()),
                ($ = m("input")),
                (we = E()),
                (qe = m("span")),
                (gt = E()),
                (be = m("label")),
                (vt = Z("Eye Size: ")),
                (et = m("span")),
                (tt = Z(Ke)),
                (kt = E()),
                (W = m("input")),
                (mt = E()),
                (ye = m("label")),
                (_t = Z("Eye Left Offset: ")),
                (lt = m("span")),
                (st = Z(Je)),
                (wt = E()),
                (Q = m("input")),
                (bt = E()),
                (Me = m("label")),
                (yt = Z("Eye Top Offset: ")),
                (nt = m("span")),
                (it = Z(We)),
                (Mt = E()),
                (X = m("input")),
                (Ct = E()),
                (pe = m("div")),
                (Qe = m("label")),
                (Qe.textContent = "UI Scale"),
                (St = E()),
                (x = m("input")),
                (jt = E()),
                (Xe = m("span")),
                (rt = m("strong")),
                (rt.textContent = "Current Scale: "),
                (ot = Z(l[5])),
                (Et = E()),
                (Ce = m("div")),
                Y && Y.c(),
                (at = E()),
                (Be = m("div")),
                (Be.innerHTML = 'Press <div class="key svelte-128csj5">ESC</div> to close'),
                e(s, "class", "header svelte-128csj5"),
                e(r, "class", "svelte-128csj5"),
                e(u, "type", "color"),
                e(u, "class", "svelte-128csj5"),
                e(v, "class", "preview-color-preview svelte-128csj5"),
                P(v, "background", l[10]),
                e(c, "class", "color-preview svelte-128csj5"),
                e(k, "class", "svelte-128csj5"),
                e(h, "type", "text"),
                P(h, "width", "80%"),
                e(h, "class", "svelte-128csj5"),
                e(b, "class", "preview-color-preview svelte-128csj5"),
                P(b, "background", l[8]),
                e(g, "class", "svelte-128csj5"),
                e(j, "type", "text"),
                e(j, "class", "svelte-128csj5"),
                e(U, "class", "preview-color-preview svelte-128csj5"),
                P(U, "background", l[6]),
                e(N, "class", "svelte-128csj5"),
                e(te, "type", "color"),
                e(te, "class", "svelte-128csj5"),
                e(ae, "class", "preview-color-preview svelte-128csj5"),
                P(ae, "background", l[9]),
                e(fe, "for", "textSize"),
                e(fe, "class", "svelte-128csj5"),
                e(R, "id", "textSize"),
                e(R, "type", "range"),
                e(R, "min", "0.1"),
                e(R, "max", "2"),
                e(R, "step", "0.1"),
                e(R, "class", "svelte-128csj5"),
                e(n, "class", "group svelte-128csj5"),
                e(_e, "class", "svelte-128csj5"),
                e(le, "type", "text"),
                e(le, "class", "svelte-128csj5"),
                e(ue, "class", (y = l[22] + " preview-icon svelte-128csj5")),
                P(ue, "color", l[20]),
                e(D, "class", "svelte-128csj5"),
                e($, "type", "color"),
                e($, "class", "svelte-128csj5"),
                e(qe, "class", "preview-color-preview svelte-128csj5"),
                P(qe, "background", l[20]),
                e(be, "for", "eyeSize"),
                e(be, "class", "svelte-128csj5"),
                e(W, "id", "eyeSize"),
                e(W, "type", "range"),
                e(W, "min", "2"),
                e(W, "max", "12"),
                e(W, "step", "0.1"),
                e(W, "class", "svelte-128csj5"),
                e(ye, "for", "eyeLeft"),
                e(ye, "class", "svelte-128csj5"),
                e(Q, "id", "eyeLeft"),
                e(Q, "type", "range"),
                e(Q, "min", "-2"),
                e(Q, "max", "2"),
                e(Q, "step", "0.001"),
                e(Q, "class", "svelte-128csj5"),
                e(Me, "for", "eyeTop"),
                e(Me, "class", "svelte-128csj5"),
                e(X, "id", "eyeTop"),
                e(X, "type", "range"),
                e(X, "min", "-2"),
                e(X, "max", "2"),
                e(X, "step", "0.01"),
                e(X, "class", "svelte-128csj5"),
                e(A, "class", "group svelte-128csj5"),
                e(Qe, "class", "svelte-128csj5"),
                e(x, "type", "range"),
                e(x, "min", "0.5"),
                e(x, "max", "2"),
                e(x, "step", "0.01"),
                e(x, "class", "svelte-128csj5"),
                e(pe, "class", "group-s svelte-128csj5"),
                e(Ce, "class", "group-s save-btn-s svelte-128csj5"),
                e(t, "class", "settings-container svelte-128csj5"),
                e(Be, "class", "close-text svelte-128csj5");
        },
        m(C, L) {
            O(C, t, L),
                o(t, s),
                o(t, i),
                o(t, n),
                o(n, r),
                o(n, a),
                o(n, c),
                o(c, u),
                I(u, l[10]),
                o(c, f),
                o(c, v),
                o(n, d),
                o(n, k),
                o(n, w),
                o(n, h),
                I(h, l[8]),
                o(n, M),
                o(n, b),
                o(n, _),
                o(n, g),
                o(n, S),
                o(n, j),
                I(j, l[6]),
                o(n, q),
                o(n, U),
                o(n, K),
                o(n, N),
                o(n, Le),
                o(n, te),
                I(te, l[9]),
                o(n, ve),
                o(n, ae),
                o(n, ke),
                o(n, fe),
                o(fe, Pe),
                o(fe, He),
                o(He, Ie),
                o(n, De),
                o(n, R),
                I(R, l[3]),
                o(t, Ve),
                o(t, A),
                o(A, _e),
                o(A, Ge),
                o(A, le),
                I(le, l[22]),
                o(A, Ue),
                o(A, ue),
                o(A, F),
                o(A, D),
                o(A, J),
                o(A, $),
                I($, l[20]),
                o(A, we),
                o(A, qe),
                o(A, gt),
                o(A, be),
                o(be, vt),
                o(be, et),
                o(et, tt),
                o(A, kt),
                o(A, W),
                I(W, l[0]),
                o(A, mt),
                o(A, ye),
                o(ye, _t),
                o(ye, lt),
                o(lt, st),
                o(A, wt),
                o(A, Q),
                I(Q, l[1]),
                o(A, bt),
                o(A, Me),
                o(Me, yt),
                o(Me, nt),
                o(nt, it),
                o(A, Mt),
                o(A, X),
                I(X, l[2]),
                o(t, Ct),
                o(t, pe),
                o(pe, Qe),
                o(pe, St),
                o(pe, x),
                I(x, l[5]),
                o(pe, jt),
                o(pe, Xe),
                o(Xe, rt),
                o(Xe, ot),
                o(t, Et),
                o(t, Ce),
                Y && Y.m(Ce, null),
                O(C, at, L),
                O(C, Be, L),
                ct ||
                    ((Ft = [
                        B(u, "input", l[27]),
                        B(h, "input", l[28]),
                        B(j, "input", l[29]),
                        B(te, "input", l[30]),
                        B(R, "change", l[31]),
                        B(R, "input", l[31]),
                        B(le, "input", l[32]),
                        B($, "input", l[33]),
                        B(W, "change", l[34]),
                        B(W, "input", l[34]),
                        B(Q, "change", l[35]),
                        B(Q, "input", l[35]),
                        B(X, "change", l[36]),
                        B(X, "input", l[36]),
                        B(x, "change", l[37]),
                        B(x, "input", l[37]),
                        B(Ce, "click", l[25]),
                    ]),
                    (ct = !0));
        },
        p(C, L) {
            L[0] & 1024 && I(u, C[10]),
                L[0] & 1024 && P(v, "background", C[10]),
                L[0] & 256 && h.value !== C[8] && I(h, C[8]),
                L[0] & 256 && P(b, "background", C[8]),
                L[0] & 64 && j.value !== C[6] && I(j, C[6]),
                L[0] & 64 && P(U, "background", C[6]),
                L[0] & 512 && I(te, C[9]),
                L[0] & 512 && P(ae, "background", C[9]),
                L[0] & 16 && me !== (me = (C[4].toString().includes("rem") ? C[4] : C[4] + "rem") + "") && Fe(Ie, me),
                L[0] & 8 && I(R, C[3]),
                L[0] & 4194304 && le.value !== C[22] && I(le, C[22]),
                L[0] & 4194304 && y !== (y = C[22] + " preview-icon svelte-128csj5") && e(ue, "class", y),
                L[0] & 1048576 && P(ue, "color", C[20]),
                L[0] & 1048576 && I($, C[20]),
                L[0] & 1048576 && P(qe, "background", C[20]),
                L[0] & 2097152 &&
                    Ke !== (Ke = (C[21].toString().includes("px") ? C[21] : C[21] + "px") + "") &&
                    Fe(tt, Ke),
                L[0] & 1 && I(W, C[0]),
                L[0] & 524288 &&
                    Je !== (Je = (C[19].toString().includes("rem") ? C[19] : C[19] + "rem") + "") &&
                    Fe(st, Je),
                L[0] & 2 && I(Q, C[1]),
                L[0] & 262144 &&
                    We !== (We = (C[18].toString().includes("rem") ? C[18] : C[18] + "rem") + "") &&
                    Fe(it, We),
                L[0] & 4 && I(X, C[2]),
                L[0] & 32 && I(x, C[5]),
                L[0] & 32 && Fe(ot, C[5]),
                Se !== (Se = Tt(C)) && (Y && Y.d(1), (Y = Se && Se(C)), Y && (Y.c(), Y.m(Ce, null)));
        },
        d(C) {
            C && (T(t), T(at), T(Be)), Y && Y.d(), (ct = !1), Ae(Ft);
        },
    };
}
function Ql(l) {
    let t, s;
    return {
        c() {
            (t = m("img")),
                P(t, "align-self", "center"),
                P(t, "height", "10rem"),
                P(t, "width", "10rem"),
                Dt(t.src, (s = "success.gif")) || e(t, "src", s),
                e(t, "alt", "success");
        },
        m(i, n) {
            O(i, t, n);
        },
        d(i) {
            i && T(t);
        },
    };
}
function Xl(l) {
    let t, s;
    return {
        c() {
            (t = m("img")),
                P(t, "align-self", "center"),
                P(t, "height", "10rem"),
                P(t, "width", "10rem"),
                Dt(t.src, (s = "loader.gif")) || e(t, "src", s),
                e(t, "alt", "loader");
        },
        m(i, n) {
            O(i, t, n);
        },
        d(i) {
            i && T(t);
        },
    };
}
function Yl(l) {
    let t;
    return {
        c() {
            (t = m("div")),
                (t.innerHTML = '<i class="far fa-save"></i> <strong>Save Settings</strong>'),
                e(t, "class", "save-btn svelte-128csj5");
        },
        m(s, i) {
            O(s, t, i);
        },
        d(s) {
            s && T(t);
        },
    };
}
function Zl(l) {
    let t,
        s,
        i,
        n = l[11] && It(l),
        r = l[12] && zt(l);
    return {
        c() {
            n && n.c(), (t = E()), r && r.c(), (s = Gt());
        },
        m(a, c) {
            n && n.m(a, c), O(a, t, c), r && r.m(a, c), O(a, s, c), (i = !0);
        },
        p(a, c) {
            a[11]
                ? n
                    ? (n.p(a, c), c[0] & 2048 && z(n, 1))
                    : ((n = It(a)), n.c(), z(n, 1), n.m(t.parentNode, t))
                : n &&
                  (Wt(),
                  G(n, 1, 1, () => {
                      n = null;
                  }),
                  Qt()),
                a[12] ? (r ? r.p(a, c) : ((r = zt(a)), r.c(), r.m(s.parentNode, s))) : r && (r.d(1), (r = null));
        },
        i(a) {
            i || (z(n), (i = !0));
        },
        o(a) {
            G(n), (i = !1);
        },
        d(a) {
            a && (T(t), T(s)), n && n.d(a), r && r.d(a);
        },
    };
}
function $l() {
    const l = {
        event: "setTarget",
        options: {
            entity: [
                { icon: "fas fa-bank", label: "Open Bank", iconColor: "red" },
                { icon: "fas fa-car", label: "Open Garage", iconColor: "purple" },
                {
                    icon: "fas fa-user",
                    label: "Player Actions",
                    iconColor: "aqua",
                    items: [
                        { icon: "fas fa-id-card", label: "Show ID" },
                        { icon: "fas fa-handshake", label: "Give Item" },
                        { icon: "fas fa-comments", label: "Send Message" },
                    ],
                },
                { icon: "fas fa-box", label: "Open Inventory" },
                {
                    icon: "fas fa-tools",
                    label: "Admin Tools",
                    items: [
                        { icon: "fas fa-ban", label: "Ban Player" },
                        { icon: "fas fa-kick", label: "Kick Player" },
                        {
                            icon: "fas fa-cog",
                            label: "Server Settings",
                            items: [
                                { icon: "fas fa-clock", label: "Set Time" },
                                { icon: "fas fa-cloud-rain", label: "Set Weather" },
                                { icon: "fas fa-users", label: "Player Limit" },
                            ],
                        },
                    ],
                },
                { icon: "fas fa-key", label: "Open House Key" },
                { icon: "fas fa-truck", label: "Open Tow Menu" },
            ],
        },
    };
    window.dispatchEvent(new MessageEvent("message", { data: l })),
        window.dispatchEvent(new MessageEvent("message", { data: { event: "visible", state: !0 } }));
}
function xl(l, t, s) {
    let i,
        n,
        r,
        a,
        c,
        u,
        f,
        v,
        d,
        k,
        w,
        h,
        M,
        b = !1,
        _ = !1,
        g = 0,
        S = 4,
        j = -0.1897,
        q = 0,
        U = 1,
        K = [],
        N = new Nl();
    V.subscribe((y) => {
        s(23, (M = y));
    }),
        N.addEventListener((y) => {
            y.type === "navigate" || y.type === "back"
                ? (s(14, (K = N.getCurrentMenu() || [])), s(13, (g = K.length)), N.getMenuPath())
                : y.type;
        });
    function Le(y) {
        return Array.isArray(y)
            ? y
                  .map((F, D) => {
                      try {
                          return ht(F)
                              ? ((!F.icon || typeof F.icon != "string") &&
                                    (console.warn("[TargetOptions] Invalid or missing icon at index", D, F),
                                    (F.icon = "fas fa-question")),
                                (!F.label || typeof F.label != "string") &&
                                    (console.warn("[TargetOptions] Invalid or missing label at index", D, F),
                                    (F.label = "Unknown Option")),
                                F.items &&
                                    (Array.isArray(F.items)
                                        ? ((F.items = Le(F.items)), F.items.length === 0 && (F.items = void 0))
                                        : (console.warn(
                                              "[TargetOptions] Invalid items property (not array) at index",
                                              D,
                                              F
                                          ),
                                          (F.items = void 0))),
                                he(F) && N.detectCircularReference(F)
                                    ? (console.warn("[TargetOptions] Circular reference detected in option", F.label),
                                      { ...F, items: void 0 })
                                    : F)
                              : (console.warn("[TargetOptions] Invalid option structure at index", D, F), null);
                      } catch (J) {
                          return console.error("[TargetOptions] Error processing option at index", D, J, F), null;
                      }
                  })
                  .filter((F) => F !== null)
            : (console.warn("[TargetOptions] Invalid options format, expected array"), []);
    }
    async function te(y, F) {
        if (y.name === "builtin:goback" || y.action === "__navigate_back") {
            N.navigateBack();
            return;
        }
        if (he(y)) {
            N.navigateToSubMenu(y.items, y.label);
            return;
        }
        if (!y.openMenu && zl(y)) {
            const D = [y.targetType, F, y.zoneId];
            await fetch("https://ox_target/select", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(D),
            });
        }
    }
    window.addEventListener("message", (y) => {
        if (
            (y.data.event === "setTargetConfigOptions" &&
                (V.set(!1),
                s(10, (i = y.data.data.mainColor)),
                s(8, (n = y.data.data.hoverColor)),
                s(6, (r = y.data.data.backgroundColor)),
                s(22, (a = y.data.data.eyeIcon)),
                s(21, (c = y.data.data.eyeSize)),
                s(20, (u = y.data.data.defaultEyeColor)),
                s(7, (v = y.data.data.mainColor)),
                s(9, (d = y.data.data.textColor)),
                s(19, (k = y.data.data.eyeLeft)),
                s(18, (w = y.data.data.eyeTop)),
                s(5, (h = y.data.data.uiScale)),
                s(4, (f = y.data.data.textSize))),
            y.data.event === "openTargetSettings" && (V.set(!1), s(12, (_ = !0)), $l()),
            y.data.event === "visible" &&
                (V.set(!1), s(11, (b = y.data.state)), b || (s(14, (K = [])), s(13, (g = 0)), N.resetToRoot())),
            y.data.event === "setTarget")
        ) {
            V.set(!1), s(13, (g = 0)), s(14, (K = []));
            const F = [];
            if (y.data.options)
                for (const J in y.data.options)
                    y.data.options[J].forEach(($, we) => {
                        F.push({ ...$, targetType: J, targetId: we + 1 });
                    });
            if (y.data.zones)
                for (let J = 0; J < y.data.zones.length; J++)
                    y.data.zones[J].forEach(($, we) => {
                        F.push({ ...$, targetType: "zones", targetId: we + 1, zoneId: J + 1 });
                    });
            const D = Le(F);
            N.setRootMenu(D), s(14, (K = N.getCurrentMenu() || [])), s(13, (g = K.length));
        }
        y.data.event === "leftTarget" && (V.set(!1), s(14, (K = [])), s(13, (g = 0)));
    });
    let ve = !0,
        ae = !1,
        ke = !1;
    function fe() {
        s(15, (ve = !1)),
            s(16, (ae = !0)),
            setTimeout(() => {
                s(16, (ae = !1)),
                    s(17, (ke = !0)),
                    setTimeout(() => {
                        s(17, (ke = !1)),
                            s(15, (ve = !0)),
                            s(12, (_ = !1)),
                            s(11, (b = !1)),
                            s(14, (K = [])),
                            s(13, (g = 0)),
                            fetch("https://ox_target/saveTargetConfigurations", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    mainColor: i,
                                    hoverColor: n,
                                    backgroundColor: r,
                                    eyeIcon: a,
                                    eyeSize: c,
                                    eyeColor: u,
                                    eyeActiveColor: v,
                                    textColor: d,
                                    eyeLeft: k,
                                    eyeTop: w,
                                    uiScale: h,
                                    textSize: f,
                                }),
                            });
                    }, 1e3);
            }, 3e3);
    }
    function Pe(y) {
        y.key === "Escape" &&
            (s(11, (b = !1)),
            s(12, (_ = !1)),
            s(14, (K = [])),
            s(13, (g = 0)),
            fetch("https://ox_target/closeTargetSettings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            }));
    }
    se(() => {
        window.addEventListener("keydown", Pe);
    }),
        Kt(() => {
            window.removeEventListener("keydown", Pe);
        });
    const He = (y, F) => te(y, F + 1);
    function me() {
        (i = this.value), s(10, i);
    }
    function Ie() {
        (n = this.value), s(8, n);
    }
    function De() {
        (r = this.value), s(6, r);
    }
    function R() {
        (d = this.value), s(9, d);
    }
    function Ve() {
        (U = ze(this.value)), s(3, U);
    }
    function A() {
        (a = this.value), s(22, a);
    }
    function _e() {
        (u = this.value), s(20, u);
    }
    function Ge() {
        (S = ze(this.value)), s(0, S);
    }
    function le() {
        (j = ze(this.value)), s(1, j);
    }
    function Ue() {
        (q = ze(this.value)), s(2, q);
    }
    function ue() {
        (h = ze(this.value)), s(5, h);
    }
    return (
        (l.$$.update = () => {
            l.$$.dirty[0] & 1 && s(21, (c = `${S}px`)),
                l.$$.dirty[0] & 8 && s(4, (f = `${U}rem`)),
                l.$$.dirty[0] & 1024 && s(7, (v = i)),
                l.$$.dirty[0] & 2 && s(19, (k = `${j}rem`)),
                l.$$.dirty[0] & 4 && s(18, (w = `${q}rem`)),
                l.$$.dirty[0] & 1024 && document.documentElement.style.setProperty("--MainColor", i),
                l.$$.dirty[0] & 512 && document.documentElement.style.setProperty("--TextColor", d),
                l.$$.dirty[0] & 256 && document.documentElement.style.setProperty("--HoverColor", n),
                l.$$.dirty[0] & 128 && document.documentElement.style.setProperty("--EyeActiveColor", v),
                l.$$.dirty[0] & 64 && document.documentElement.style.setProperty("--BackgroundColor", r),
                l.$$.dirty[0] & 32 && document.documentElement.style.setProperty("--ui-scale", h),
                l.$$.dirty[0] & 16 && document.documentElement.style.setProperty("--TextSize", f);
        }),
        s(10, (i = "#A1FF5F")),
        s(8, (n = "rgba(157, 255, 0, 0.082)")),
        s(6, (r = "rgba(157, 255, 0, 0.014)")),
        s(22, (a = "fas fa-circle")),
        s(20, (u = "#FFFFFF")),
        s(9, (d = "#FFFFFF")),
        s(5, (h = "1")),
        s(23, (M = !1)),
        [
            S,
            j,
            q,
            U,
            f,
            h,
            r,
            v,
            n,
            d,
            i,
            b,
            _,
            g,
            K,
            ve,
            ae,
            ke,
            w,
            k,
            u,
            c,
            a,
            M,
            te,
            fe,
            He,
            me,
            Ie,
            De,
            R,
            Ve,
            A,
            _e,
            Ge,
            le,
            Ue,
            ue,
        ]
    );
}
class es extends oe {
    constructor(t) {
        super(), re(this, t, xl, Zl, ee, {}, null, [-1, -1]);
    }
}
function ts(l) {
    let t, s, i, n, r;
    s = new es({});
    let a = !1;
    return {
        c() {
            (t = m("main")), ce(s.$$.fragment), (i = E()), (n = Gt()), e(t, "class", "svelte-1y4be3q");
        },
        m(c, u) {
            O(c, t, u), ne(s, t, null), O(c, i, u), O(c, n, u), (r = !0);
        },
        p(c, [u]) {},
        i(c) {
            r || (z(s.$$.fragment, c), z(a), (r = !0));
        },
        o(c) {
            G(s.$$.fragment, c), G(a), (r = !1);
        },
        d(c) {
            c && (T(t), T(i), T(n)), ie(s);
        },
    };
}
function ls(l, t, s) {
    let i;
    return tl(l, Yt, (n) => s(0, (i = n))), Xt.set({ fallbackResourceName: "debug", allowEscapeKey: !0 }), hl(), [i];
}
class ss extends oe {
    constructor(t) {
        super(), re(this, t, ls, ts, ee, {});
    }
}
new ss({ target: document.getElementById("app") });
