var CtmEffects = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_effects = __commonJS({
    "assets/js/effects.js"(exports) {
      window.useCtmEffects = (inViewOffset = "50px") => {
        initEffectsBundle({
          inView: {
            offset: inViewOffset
          }
        });
      };
      const getFxValueByPrefix = (el, prefix) => {
        if (!el.className.includes(prefix))
          return null;
        return el.className.split(prefix)[1].split(" ")[0];
      };
      const initEffectsBundle = (opts) => {
        var _a;
        const defaultOptions = {
          inView: {
            root: null,
            offset: "50px",
            threshold: 0.5
          },
          trigger: "fx_",
          list: "c_list",
          scope: {
            el: {
              animation: ".fx_anim"
            },
            txt: {
              animation: ".c_text"
            },
            img: {
              animation: ".image_container"
            },
            ico: {
              animation: ".c_icon"
            },
            lnk: {
              animation: ".c_link"
            }
          },
          animation: {
            abbr: "anim",
            prefix: "fxa_",
            perform: "fxa_a",
            infixIn: "-in-",
            infixOut: "-out-",
            delay: {
              class: "anim-dly-",
              prop: "--fxa-d"
            },
            duration: {
              class: "anim-dtn-",
              prop: "--fxa-t"
            }
          },
          effect: {
            abbr: "efc",
            prefix: "fxe_",
            perform: "fxe_a",
            duration: {
              class: "efc-dtn",
              prop: ""
            }
          }
        };
        const options = __spreadValues(__spreadValues({}, defaultOptions), opts);
        const animate = (el, name, removeFromClasses) => {
          if (removeFromClasses)
            el.classList.remove(options.animation.perform, options.animation.prefix + removeFromClasses);
          el.classList.add(options.animation.perform, options.animation.prefix + name);
        };
        const animateInView = (observerElement, enter, exit) => {
          const observerOptions = {
            root: options.inView.root,
            rootMargin: options.inView.offset,
            threshold: options.inView.threshold
          };
          const callback = (entries) => {
            entries.forEach((entry) => {
              entry.isIntersecting ? enter.call(exports) : exit.call(exports);
            });
          };
          new IntersectionObserver(callback, observerOptions).observe(observerElement);
        };
        const removeAnimationInitClass = (el, type, prefix = "") => {
          const { delay, duration, abbr, infixIn, infixOut } = options[type];
          const triggerPrefix = options.trigger + prefix;
          [
            prefix + delay.class + getFxValueByPrefix(el, prefix + delay.class),
            prefix + duration.class + getFxValueByPrefix(el, prefix + duration.class),
            triggerPrefix + abbr + infixIn + getFxValueByPrefix(el, triggerPrefix + abbr + infixIn),
            triggerPrefix + abbr + infixOut + getFxValueByPrefix(el, triggerPrefix + abbr + infixOut)
          ].forEach((option) => el.classList.contains(option) && el.classList.remove(option));
        };
        const initAnimationItem = (el, item, type, trigger, prefix, index) => {
          const duration = getFxValueByPrefix(el, prefix + options[type].duration.class);
          if (duration)
            item.style.setProperty(options[type].duration.prop, duration.replace("-", ".") + "s");
          const delay = getFxValueByPrefix(el, prefix + options[type].delay.class);
          if (delay)
            item.style.setProperty(options[type].delay.prop, (parseFloat(delay.replace("-", ".")) * (index + 1)).toFixed(3) + "s");
          const inAnimationName = getFxValueByPrefix(el, trigger + options[type].infixIn);
          const outAnimationName = getFxValueByPrefix(el, trigger + options[type].infixOut);
          const inAnimation = inAnimationName ? () => animate(item, inAnimationName, outAnimationName) : () => {
          };
          const outAnimation = outAnimationName ? () => animate(item, outAnimationName, inAnimationName) : () => {
          };
          animateInView(el, inAnimation, outAnimation);
        };
        const initEffectsItem = (el, item, typeOptions) => {
        };
        for (const scope in options.scope) {
          for (const type in options.scope[scope]) {
            let infix = scope !== "el" ? scope + "_" : "";
            let typeTrigger = options.trigger + infix + options[type].abbr;
            (_a = document.querySelectorAll(`[class*="${typeTrigger}"]`)) == null ? void 0 : _a.forEach((el) => {
              var _a2, _b;
              const initItem = (item, index) => initAnimationItem(el, item, type, typeTrigger, infix, index);
              switch (scope) {
                case "el":
                  if (!el.classList.contains(options.list))
                    initItem(el, 0);
                  else
                    (_a2 = Array.from(el.children)) == null ? void 0 : _a2.forEach((item, index) => initItem(item, index));
                  break;
                default:
                  (_b = Array.from(el.querySelectorAll(options.scope[scope][type]))) == null ? void 0 : _b.forEach((item, index) => initItem(item, index));
              }
              removeAnimationInitClass(el, type, infix);
            });
          }
        }
      };
    }
  });
  return require_effects();
})();
//# sourceMappingURL=effects.js.map
