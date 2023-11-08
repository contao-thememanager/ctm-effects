var CtmEffects=(()=>{var O=Object.defineProperty;var _=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var m=(l,p,n)=>p in l?O(l,p,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[p]=n,h=(l,p)=>{for(var n in p||(p={}))S.call(p,n)&&m(l,n,p[n]);if(_)for(var n of _(p))V.call(p,n)&&m(l,n,p[n]);return l};window.useCtmEffects=(l="-15% 0% -50px 0%")=>{q({inView:{offset:l}})};var q=l=>{var v;let n=h(h({},{inView:{root:null,offset:'-15% 0% -50px 0%"',threshold:0},trigger:"fx_",list:"c_list",heading:"c_headline",infix:{in:"-in-",out:"-out-",hover:"-hover-"},scope:{el:{animation:".fx_anim",effect:".fx_efc"},txt:{animation:".c_text",effect:".c_text"},img:{animation:".image_container",effect:".image_container"},ico:{animation:".c_icon",effect:".c_icon"},lnk:{animation:".c_link",effect:".c_link"},frm:{animation:"form",effect:"form"}},animation:{abbr:"anim",prefix:"fxa_",perform:"fxa_a",props:{delay:{class:"anim-dly-",prop:"--fxa-d"},duration:{class:"anim-dtn-",prop:"--fxa-t"}}},effect:{abbr:"efc",prefix:"fxe_",perform:"fxe_a",props:{factor:{class:"efc-fct-",prop:"--fxe-factor"},duration:{class:"efc-dtn-",prop:"--fxe-duration"},easing:{class:"efc-eas-",prop:"--fxe-easing"}}}}),l),u=(s,e)=>s.className.includes(e)?s.className.split(e)[1].split(" ")[0]:null,g=(s,e,r)=>{let t=n.animation,o=t.perform,c=t.prefix;r&&s.classList.remove(o,c+r),s.classList.add(o,c+e)},y=(s,e,r)=>{let t,o;if(e.classList.contains("item")?t=o=e.querySelector(":scope > .inside"):s.classList.contains(n.heading)?t=o=s:e.classList.contains("inside")?t=o=e:(t=e.closest(".inside"),o=e),!t||!o)return;let c=n.effect;o.classList.add(c.prefix+r),t.addEventListener("mouseover",()=>{o.classList.add(c.perform)}),t.addEventListener("mouseleave",()=>{o.classList.remove(c.perform)})},L=s=>{let e,r;return e=r=s,s.classList.contains("mod_article")?r=s.querySelector(":scope > .inside"):e=s.parentElement,[e,r]},k=(s,e,r,t)=>{if(!r&&!t||(s===e&&([s,e]=L(s)),!e))return;let o=n.inView,c={root:o.root,rootMargin:o.offset,threshold:o.threshold},a=new IntersectionObserver(f=>{f.forEach(i=>{r&&i.isIntersecting?g(e,r,t):t&&!i.isIntersecting&&g(e,t,r)})},c);e.addEventListener("animationend",()=>{(!(r&&t)||!(t&&r))&&a.disconnect()}),a.observe(s)},w=(s,e,r,t)=>{let o=t+n[s].props[e].class;return o+u(r,o)},x=(s,e,r,t)=>{let o=n[s].abbr,c=n.trigger+r;return c+o+t+u(e,c+o+t)},E=(s,e,r="")=>{let t=[],o=n[s].props,c=n.infix;for(let a in o)t.push(w(s,a,e,r));switch(s){case"animation":t.push(x(s,e,r,c.in),x(s,e,r,c.out));break;case"effect":t.push(x(s,e,r,c.hover));break}e.classList.remove(...t)},b=(s,e=0)=>((e+1)*parseFloat(s.replace("-","."))).toFixed(3)+"s",P=(s,e,r,t,o,c,a)=>{let f=e.prop,i=u(r,c+e.class);if(!!i)switch(s){case"delay":t.style.setProperty(f,b(i,a));break;case"duration":t.style.setProperty(f,b(i));break;case"factor":t.style.setProperty(f,i.replace("-","."));break;default:t.style.setProperty(f,i)}},I=(s,e,r,t,o,c)=>{let a=n.infix;switch(r){case"animation":let i=u(s,t+a.in),d=u(s,t+a.out);k(s,e,i,d);break;case"effect":c=0,y(s,e,u(s,t+a.hover));break}let f=n[r].props;for(let i in f)P(i,f[i],s,e,r,o,c)};for(let s in n.scope)for(let e in n.scope[s]){let r=s!=="el"?s+"_":"",t=n.trigger+r+n[e].abbr;(v=document.querySelectorAll(`[class*="${t}"]`))==null||v.forEach(o=>{var a,f;let c=(i,d)=>I(o,i,e,t,r,d);switch(s){case"el":[n.list,n.heading].some(i=>o.classList.contains(i))?(a=Array.from(o.children))==null||a.forEach((i,d)=>c(i,d)):c(o,0);break;default:(f=Array.from(o.querySelectorAll(n.scope[s][e])))==null||f.forEach((i,d)=>c(i,d))}E(e,o,r)})}};})();
