import{M as e,N as t,O as s}from"./calfSystem-26bcf570.js"
function c(c){const a=e(c.elements).filter((e=>!["button","submit"].includes(e.type))).filter((e=>"checkbox"!==e.type||e.checked)).map((e=>`${e.name}=${e.value}`)).join("&")
t(`${s}?${a}`)}export{c as f}
//# sourceMappingURL=formToUrl-ea3e8186.js.map
