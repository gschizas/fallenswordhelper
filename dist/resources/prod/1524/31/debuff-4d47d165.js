import{bl as t,y as e,o as n,t as o,U as a,aJ as r,A as i}from"./calfSystem-7aee5245.js"
import{e as s}from"./errorDialog-9d880b0d.js"
import"./dialogMsg-844edf4e.js"
function f(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function l(t,e){e&&e.s&&i("",t.parentNode)}function u(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(r(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){t?(a("profile","doDebuff"),f(e.href.match(/(\d+)$/)[1]).then(s).then(o(l,e))):window.location=e.href}(t,n))}function c(t,a){const r=e("profileRightColumn")
r&&n(r.lastElementChild,o(u,t),a)}export default c
//# sourceMappingURL=debuff-4d47d165.js.map
