import{b0 as t,y as e,o as n,t as o,V as a,aq as r,A as i}from"./calfSystem-9901ad27.js"
import"./dialogMsg-16e7e1c1.js"
import{e as s}from"./errorDialog-7f431a39.js"
function f(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function l(t,e){e&&e.s&&i("",t.parentNode)}function u(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(r(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){if(t){a("profile","doDebuff")
f(e.href.match(/(\d+)$/)[1]).then(s).then(o(l,e))}else window.location=e.href}(t,n))}export default function(t,a){const r=e("profileRightColumn")
r&&n(r.lastElementChild,o(u,t),a)}
//# sourceMappingURL=debuff-ad313ff6.js.map
