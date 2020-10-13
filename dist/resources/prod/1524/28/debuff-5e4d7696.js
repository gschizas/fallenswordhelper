import{bc as t,y as e,o as n,t as o,U as a,am as r,A as i}from"./calfSystem-a5da5210.js"
import"./dialogMsg-8ea305bd.js"
import{e as s}from"./errorDialog-326900ed.js"
function f(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function u(t,e){e&&e.s&&i("",t.parentNode)}function l(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(r(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){t?(a("profile","doDebuff"),f(e.href.match(/(\d+)$/)[1]).then(s).then(o(u,e))):window.location=e.href}(t,n))}function c(t,a){const r=e("profileRightColumn")
r&&n(r.lastElementChild,o(l,t),a)}export default c
//# sourceMappingURL=debuff-5e4d7696.js.map
