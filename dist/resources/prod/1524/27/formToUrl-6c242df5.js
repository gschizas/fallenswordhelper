import{M as e,N as t}from"./calfSystem-3bdf319e.js"
function o(o){const n=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${n}`}export{o as f}
//# sourceMappingURL=formToUrl-6c242df5.js.map
