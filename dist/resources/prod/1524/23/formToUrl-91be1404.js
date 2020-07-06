import{M as e,N as t}from"./calfSystem-019de1cf.js"
function o(o){const c=e(o.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${c}`}export{o as f}
//# sourceMappingURL=formToUrl-91be1404.js.map
