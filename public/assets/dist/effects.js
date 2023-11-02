var CtmEffects = (() => {
    var V = Object.defineProperty;
    var v = Object.getOwnPropertySymbols;
    var F = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable;
    var _ = (f, p, n) => p in f ? V(f, p, {enumerable: !0, configurable: !0, writable: !0, value: n}) : f[p] = n,
        h = (f, p) => {
            for (var n in p || (p = {})) F.call(p, n) && _(f, n, p[n]);
            if (v) for (var n of v(p)) O.call(p, n) && _(f, n, p[n]);
            return f
        };
    window.useCtmEffects = (f = "50px") => {
        S({inView: {offset: `${f} 10000px`}})
    };
    var S = f => {
        var b;
        let n = h(h({}, {
                inView: {root: null, offset: "50px 10000px", threshold: 0},
                trigger: "fx_",
                list: "c_list",
                infix: {in: "-in-", out: "-out-", hover: "-hover-"},
                scope: {
                    el: {animation: ".fx_anim", effect: ".fx_efc"},
                    txt: {animation: ".c_text", effect: ".c_text"},
                    img: {animation: ".image_container", effect: ".image_container"},
                    ico: {animation: ".c_icon", effect: ".c_icon"},
                    lnk: {animation: ".c_link", effect: ".c_link"}
                },
                animation: {
                    abbr: "anim",
                    prefix: "fxa_",
                    perform: "fxa_a",
                    props: {delay: {class: "anim-dly-", prop: "--fxa-d"}, duration: {class: "anim-dtn-", prop: "--fxa-t"}}
                },
                effect: {
                    abbr: "efc",
                    prefix: "fxe_",
                    perform: "fxe_a",
                    props: {
                        factor: {class: "efc-fct-", prop: "--fxe-factor"},
                        duration: {class: "efc-dtn-", prop: "--fxe-duration"},
                        easing: {class: "efc-eas-", prop: "--fxe-easing"}
                    }
                }
            }), f), u = (s, e) => s.className.includes(e) ? s.className.split(e)[1].split(" ")[0] : null, g = (s, e, i) => {
                let t = n.animation, r = t.perform, o = t.prefix;
                i && s.classList.remove(r, o + i), s.classList.add(r, o + e)
            }, y = (s, e, i) => {
                let t, r;
                if (e.classList.contains("item") ? t = r = e.querySelector(":scope > .inside") : e.classList.contains("inside") ? t = r = e : (t = e.closest(".inside"), r = e), !t || !r) return;
                let o = n.effect;
                r.classList.add(o.prefix + i), t.addEventListener("mouseover", () => {
                    r.classList.add(o.perform)
                }), t.addEventListener("mouseleave", () => {
                    r.classList.remove(o.perform)
                })
            }, L = (s, e, i, t) => {
                if (!i || !t) return;
                let r, o = !1, c = n.inView, l = {root: c.root, rootMargin: c.offset, threshold: c.threshold},
                    a = new IntersectionObserver(d => {
                        d.forEach(m => {
                            i && m.isIntersecting && !r && !o ? (g(e, i, t), o = !0) : t && !m.isIntersecting && !r && o && (g(e, t, i), o = !1)
                        })
                    }, l);
                return s.addEventListener("animationstart", () => {
                    r = !0, o && a.unobserve(s)
                }), s.addEventListener("animationend", () => {
                    e.classList.remove(n.animation.prefix + t), r = !1, a.observe(s)
                }), a.observe(s), () => {
                    o = !1, r || a.observe(s)
                }
            }, w = (s, e, i, t) => {
                let r = t + n[s].props[e].class;
                return r + u(i, r)
            }, x = (s, e, i, t) => {
                let r = n[s].abbr, o = n.trigger + i;
                return o + r + t + u(e, o + r + t)
            }, k = (s, e, i = "") => {
                let t = [], r = n[s].props, o = n.infix;
                for (let c in r) t.push(w(s, c, e, i));
                switch (s) {
                    case"animation":
                        t.push(x(s, e, i, o.in), x(s, e, i, o.out));
                        break;
                    case"effect":
                        t.push(x(s, e, i, o.hover));
                        break
                }
                e.classList.remove(...t)
            }, I = (s, e = 0) => ((e + 1) * parseFloat(s.replace("-", "."))).toFixed(3) + "s",
            P = (s, e, i, t, r, o, c) => {
                let l = e.prop, a = u(i, o + e.class);
                if (!!a) switch (s) {
                    case"delay":
                    case"duration":
                        t.style.setProperty(l, I(a, c));
                        break;
                    case"factor":
                        t.style.setProperty(l, a.replace("-", "."));
                        break;
                    default:
                        t.style.setProperty(l, a)
                }
            }, E = (s, e, i, t, r, o) => {
                let c = n.infix;
                switch (i) {
                    case"animation":
                        let a = u(s, t + c.in), d = u(s, t + c.out);
                        L(s, e, a, d);
                        break;
                    case"effect":
                        o = 0, y(s, e, u(s, t + c.hover));
                        break
                }
                let l = n[i].props;
                for (let a in l) P(a, l[a], s, e, i, r, o)
            };
        for (let s in n.scope) for (let e in n.scope[s]) {
            let i = s !== "el" ? s + "_" : "", t = n.trigger + i + n[e].abbr;
            (b = document.querySelectorAll(`[class*="${t}"]`)) == null || b.forEach(r => {
                var c, l;
                let o = (a, d) => E(r, a, e, t, i, d);
                switch (s) {
                    case"el":
                        r.classList.contains(n.list) ? (c = Array.from(r.children)) == null || c.forEach((a, d) => o(a, d)) : o(r, 0);
                        break;
                    default:
                        (l = Array.from(r.querySelectorAll(n.scope[s][e]))) == null || l.forEach((a, d) => o(a, d))
                }
                k(e, r, i)
            })
        }
    };
})();
