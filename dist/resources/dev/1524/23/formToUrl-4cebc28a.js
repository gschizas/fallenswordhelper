import{M as e,N as t}from"./calfSystem-9901ad27.js"
function o(o){const n=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${n}`}export{o as f}
//# sourceMappingURL=formToUrl-4cebc28a.js.map
