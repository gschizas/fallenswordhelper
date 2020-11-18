import{o as e,p as t,t as n,ax as a,b5 as o,y as s}from"./calfSystem-f9a27018.js"
import{h as r}from"./hideElement-a8c1e8d6.js"
let i
const c=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function f(e,t){return t(e)}function l(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){l(5===Number(o(e.search,"section_id"))?(i||(i=s("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function m(e){const{target:t}=e;(function(e){return c.every(n(f,e))})(t)&&(u(t),a(t.href),e.preventDefault())}function d(){e(t,m)}export default d
//# sourceMappingURL=ajaxifyProfileSections-dd3535da.js.map
