import{M as e,N as t}from"./calfSystem-57628ebe.js"
function o(o){const n=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${n}`}export{o as f}
//# sourceMappingURL=formToUrl-ed8f6bd0.js.map
