import{M as e,N as t}from"./calfSystem-4cc738f8.js"
function c(c){const o=e(c.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${o}`}export{c as f}
//# sourceMappingURL=formToUrl-84dfad91.js.map
