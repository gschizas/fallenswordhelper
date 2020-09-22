import{b0 as t,y as e,o as n,t as o,V as r,aq as a,A as i}from"./calfSystem-38898f3e.js"
import"./dialogMsg-9241492c.js"
import{e as s}from"./errorDialog-8d3200e2.js"
function f(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function u(t,e){e&&e.s&&i("",t.parentNode)}function l(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(a(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){t?(r("profile","doDebuff"),f(e.href.match(/(\d+)$/)[1]).then(s).then(o(u,e))):window.location=e.href}(t,n))}function c(t,r){const a=e("profileRightColumn")
a&&n(a.lastElementChild,o(l,t),r)}export default c
//# sourceMappingURL=debuff-c2051826.js.map
