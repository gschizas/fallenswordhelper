import{M as e,N as t}from"./calfSystem-cf4d22a7.js"
function o(o){const c=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${c}`}export{o as f}
//# sourceMappingURL=formToUrl-31554e27.js.map
