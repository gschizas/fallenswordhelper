import{b0 as t,y as e,o as n,t as o,V as a,aq as r,A as i}from"./calfSystem-a2862afc.js"
import"./dialogMsg-98e801f7.js"
import{e as f}from"./errorDialog-a4de6042.js"
function s(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function l(t,e){e&&e.s&&i("",t.parentNode)}function u(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(r(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){if(t){a("profile","doDebuff")
s(e.href.match(/(\d+)$/)[1]).then(f).then(o(l,e))}else window.location=e.href}(t,n))}export default function(t,a){const r=e("profileRightColumn")
r&&n(r.lastElementChild,o(u,t),a)}
//# sourceMappingURL=debuff-cad68427.js.map
