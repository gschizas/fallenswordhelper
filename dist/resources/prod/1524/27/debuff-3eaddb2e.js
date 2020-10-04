import{bd as t,y as e,o as n,t as o,V as r,an as a,A as i}from"./calfSystem-3bdf319e.js"
import"./dialogMsg-9c8d1b20.js"
import{e as f}from"./errorDialog-7f9c11b0.js"
function s(e){return function(e){return t({subcmd:"removeskill",skill_id:e})}(e)}function u(t,e){e&&e.s&&i("",t.parentNode)}function l(t,e){if(!e.returnValue)return
const n=function(t){let e=t
return"IMG"===e.tagName&&(a(t),e=e.parentNode),e}(e.target)
"A"===n.tagName&&(function(t){1===t.eventPhase&&t.stopPropagation()}(e),e.preventDefault(),function(t,e){t?(r("profile","doDebuff"),s(e.href.match(/(\d+)$/)[1]).then(f).then(o(u,e))):window.location=e.href}(t,n))}function c(t,r){const a=e("profileRightColumn")
a&&n(a.lastElementChild,o(l,t),r)}export default c
//# sourceMappingURL=debuff-3eaddb2e.js.map
