var CtmEffects=(()=>{var O=Object.defineProperty;var y=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var _=(p,l,n)=>l in p?O(p,l,{enumerable:!0,configurable:!0,writable:!0,value:n}):p[l]=n,b=(p,l)=>{for(var n in l||(l={}))S.call(l,n)&&_(p,n,l[n]);if(y)for(var n of y(l))V.call(l,n)&&_(p,n,l[n]);return p};window.useCtmEffects=(p="-150px 0 -50px 0")=>{q({inView:{offset:p}})};var q=p=>{var v;let n=b(b({},{inView:{root:null,offset:"50px 10000px",threshold:0},trigger:"fx_",list:"c_list",infix:{in:"-in-",out:"-out-",hover:"-hover-"},scope:{el:{animation:".fx_anim",effect:".fx_efc"},txt:{animation:".c_text",effect:".c_text"},img:{animation:".image_container",effect:".image_container"},ico:{animation:".c_icon",effect:".c_icon"},lnk:{animation:".c_link",effect:".c_link"}},animation:{abbr:"anim",prefix:"fxa_",perform:"fxa_a",props:{delay:{class:"anim-dly-",prop:"--fxa-d"},duration:{class:"anim-dtn-",prop:"--fxa-t"}}},effect:{abbr:"efc",prefix:"fxe_",perform:"fxe_a",props:{factor:{class:"efc-fct-",prop:"--fxe-factor"},duration:{class:"efc-dtn-",prop:"--fxe-duration"},easing:{class:"efc-eas-",prop:"--fxe-easing"}}}}),p),u=(e,s)=>e.className.includes(s)?e.className.split(s)[1].split(" ")[0]:null,h=(e,s,r)=>{let t=n.animation,o=t.perform,c=t.prefix;r&&e.classList.remove(o,c+r),e.classList.add(o,c+s)},L=(e,s,r)=>{let t,o;if(s.classList.contains("item")?t=o=s.querySelector(":scope > .inside"):s.classList.contains("inside")?t=o=s:(t=s.closest(".inside"),o=s),!t||!o)return;let c=n.effect;o.classList.add(c.prefix+r),t.addEventListener("mouseover",()=>{o.classList.add(c.perform)}),t.addEventListener("mouseleave",()=>{o.classList.remove(c.perform)})},k=e=>{let s,r;return s=r=e,e.classList.contains("inside")?s=e.parentElement:r=e.querySelector(":scope > .inside"),[s,r]},m=(e,s,r,t)=>{if(!r&&!t||(e===s&&([e,s]=k(e)),!s))return;let o=n.inView,c={root:o.root,rootMargin:o.offset,threshold:o.threshold},a=new IntersectionObserver(f=>{f.forEach(i=>{r&&i.isIntersecting?h(s,r,t):t&&!i.isIntersecting&&h(s,t,r)})},c);s.addEventListener("animationend",()=>{(!(r&&t)||!(t&&r))&&a.disconnect()}),a.observe(e)},w=(e,s,r,t)=>{let o=t+n[e].props[s].class;return o+u(r,o)},x=(e,s,r,t)=>{let o=n[e].abbr,c=n.trigger+r;return c+o+t+u(s,c+o+t)},E=(e,s,r="")=>{let t=[],o=n[e].props,c=n.infix;for(let a in o)t.push(w(e,a,s,r));switch(e){case"animation":t.push(x(e,s,r,c.in),x(e,s,r,c.out));break;case"effect":t.push(x(e,s,r,c.hover));break}s.classList.remove(...t)},g=(e,s=0)=>((s+1)*parseFloat(e.replace("-","."))).toFixed(3)+"s",P=(e,s,r,t,o,c,a)=>{let f=s.prop,i=u(r,c+s.class);if(!!i)switch(e){case"delay":t.style.setProperty(f,g(i,a));break;case"duration":t.style.setProperty(f,g(i));break;case"factor":t.style.setProperty(f,i.replace("-","."));break;default:t.style.setProperty(f,i)}},I=(e,s,r,t,o,c)=>{let a=n.infix;switch(r){case"animation":let i=u(e,t+a.in),d=u(e,t+a.out);m(e,s,i,d);break;case"effect":c=0,L(e,s,u(e,t+a.hover));break}let f=n[r].props;for(let i in f)P(i,f[i],e,s,r,o,c)};for(let e in n.scope)for(let s in n.scope[e]){let r=e!=="el"?e+"_":"",t=n.trigger+r+n[s].abbr;(v=document.querySelectorAll(`[class*="${t}"]`))==null||v.forEach(o=>{var a,f;let c=(i,d)=>I(o,i,s,t,r,d);switch(e){case"el":o.classList.contains(n.list)?(a=Array.from(o.children))==null||a.forEach((i,d)=>c(i,d)):c(o,0);break;default:(f=Array.from(o.querySelectorAll(n.scope[e][s])))==null||f.forEach((i,d)=>c(i,d))}E(s,o,r)})}};})();
