import{M as e,N as t,O as s}from"./calfSystem-19a5d332.js"
function a(a){const c=e(a.elements).filter((e=>!["button","submit"].includes(e.type))).filter((e=>"checkbox"!==e.type||e.checked)).map((e=>`${e.name}=${e.value}`)).join("&")
t(`${s}?${c}`)}export{a as f}
//# sourceMappingURL=formToUrl-8a3e8d2a.js.map
