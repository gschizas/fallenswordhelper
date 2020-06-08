import{o as e,p as t,t as n,aB as o,bB as a,y as s}from"./calfSystem-a2862afc.js"
import{h as r}from"./hideElement-66d2f02e.js"
let i
const f=[e=>"A"===e.tagName,e=>Boolean(e.href),e=>e.href.includes("togglesection")]
function c(e,t){return t(e)}function l(e){e.hasAttribute("style")?function(e){"block"===e.style.display&&r(e),e.removeAttribute("style")}(e):e.classList.toggle("fshHide")}function u(e){l(5===Number(a(e.href,"section_id"))?(i||(i=s("backpackContainer")),i):e.parentNode.parentNode.nextElementSibling)}function m(e){const{target:t}=e;(function(e){return f.every(n(c,e))})(t)&&(u(t),o(t.href),e.preventDefault())}export default function(){e(t,m)}
//# sourceMappingURL=ajaxifyProfileSections-68b6fecb.js.map
