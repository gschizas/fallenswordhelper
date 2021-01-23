import{M as e,N as t}from"./calfSystem-7aee5245.js"
function o(o){const n=e(o.elements).filter((e=>!["button","submit"].includes(e.type))).filter((e=>"checkbox"!==e.type||e.checked)).map((e=>`${e.name}=${e.value}`)).join("&")
window.location=`${t}?${n}`}export{o as f}
//# sourceMappingURL=formToUrl-c1b61cd0.js.map
