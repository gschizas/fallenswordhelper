import{a$ as t,y as e,o as n,t as o,V as a,aq as r,A as f}from"./calfSystem-02c48ff5.js"
import"./dialogMsg-920f7637.js"
import{e as i}from"./errorDialog-48ca89f9.js"
function s(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function u(t,e){e&&e.s&&f("",t.parentNode)}function l(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(r(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){t?(a("profile","doDebuff"),s(e.href.match(/(\d+)$/)[1]).then(i).then(o(u,e))):window.location=e.href}(t,n))}function c(t,a){const r=e("profileRightColumn")
r&&n(r.lastElementChild,o(l,t),a)}export default c
//# sourceMappingURL=debuff-11de042d.js.map
