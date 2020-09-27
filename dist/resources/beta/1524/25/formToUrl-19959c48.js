import{M as e,N as t}from"./calfSystem-d3aab5a8.js"
function a(a){const o=e(a.elements).filter(e=>!["button","submit"].includes(e.type)).filter(e=>"checkbox"!==e.type||e.checked).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${t}?${o}`}export{a as f}
//# sourceMappingURL=formToUrl-19959c48.js.map
