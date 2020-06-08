import{M as e,N as t}from"./calfSystem-a2862afc.js"
function o(o){const a=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${a}`}export{o as f}
//# sourceMappingURL=formToUrl-3b57fbeb.js.map
