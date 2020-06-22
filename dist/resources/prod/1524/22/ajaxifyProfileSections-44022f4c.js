import{o as e,p as t,t as n,ax as o,bv as s,y as a}from"./calfSystem-d04e4be4.js"
import{h as r}from"./hideElement-54f4258c.js"
let i
const c=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function f(e,t){return t(e)}function l(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){l(5===Number(s(e.search,"section_id"))?(i||(i=a("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function m(e){const{target:t}=e;(function(e){return c.every(n(f,e))})(t)&&(u(t),o(t.href),e.preventDefault())}export default function(){e(t,m)}
//# sourceMappingURL=ajaxifyProfileSections-44022f4c.js.map
