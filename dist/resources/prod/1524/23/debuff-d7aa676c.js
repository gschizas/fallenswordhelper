import{bf as e,y as t,o as n,t as o,U as a,am as r,A as i}from"./calfSystem-019de1cf.js"
import"./dialogMsg-16e7e1c1.js"
import{e as f}from"./errorDialog-7f431a39.js"
function s(t){return function(t){return e({subcmd:"removeskill",skill_id:t})}(t)}function l(e,t){t&&t.s&&i("",e.parentNode)}function u(e,t){if(!t.returnValue)return
const n=function(e){let t=e
return"IMG"===t.tagName&&(r(e),t=t.parentNode),t}(t.target)
"A"===n.tagName&&(function(e){1===e.eventPhase&&e.stopPropagation()}(t),t.preventDefault(),function(e,t){if(e){a("profile","doDebuff")
s(t.href.match(/(\d+)$/)[1]).then(f).then(o(l,t))}else window.location=t.href}(e,n))}export default function(e,a){const r=t("profileRightColumn")
r&&n(r.lastElementChild,o(u,e),a)}
//# sourceMappingURL=debuff-d7aa676c.js.map
