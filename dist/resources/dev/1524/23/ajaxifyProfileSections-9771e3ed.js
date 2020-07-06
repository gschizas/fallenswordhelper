import{o as e,p as t,t as n,aB as o,bC as a,y as s}from"./calfSystem-9901ad27.js"
import{h as r}from"./hideElement-48576eeb.js"
let i
const c=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function l(e,t){return t(e)}function f(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){f(5===Number(a(e.search,"section_id"))?(i||(i=s("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function m(e){const{target:t}=e;(function(e){return c.every(n(l,e))})(t)&&(u(t),o(t.href),e.preventDefault())}export default function(){e(t,m)}
//# sourceMappingURL=ajaxifyProfileSections-9771e3ed.js.map
