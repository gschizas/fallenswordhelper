import{o as e,p as t,t as n,aC as o,bb as s,y as a}from"./calfSystem-ec5e5725.js"
import{h as r}from"./hideElement-b0b3e820.js"
let i
const c=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function l(e,t){return t(e)}function f(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){f(5===Number(s(e.search,"section_id"))?(i||(i=a("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function b(e){const{target:t}=e;(function(e){return c.every(n(l,e))})(t)&&(u(t),o(t.href),e.preventDefault())}function m(){e(t,b)}export default m
//# sourceMappingURL=ajaxifyProfileSections-e596b259.js.map
