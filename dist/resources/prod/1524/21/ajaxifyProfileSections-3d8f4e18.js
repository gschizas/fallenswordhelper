import{o as e,p as t,t as n,ax as a,bv as o,y as s}from"./calfSystem-2741d97b.js"
import{h as r}from"./hideElement-6a4f37a8.js"
let i
const c=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function f(e,t){return t(e)}function l(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){l(5===Number(o(e.search,"section_id"))?(i||(i=s("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function m(e){const{target:t}=e;(function(e){return c.every(n(f,e))})(t)&&(u(t),a(t.href),e.preventDefault())}export default function(){e(t,m)}
//# sourceMappingURL=ajaxifyProfileSections-3d8f4e18.js.map
