import{y as t,f as e,t as a,A as s}from"./calfSystem-d3aab5a8.js"
let r,n
function l(t){let e=r.value,a=e.length
a>t&&(e=e.substring(0,t),r.value=e,a=t),n||(n=r.parentNode.parentNode.parentNode.parentNode.insertRow().insertCell()),s(`<table class="sbpTbl"><tbody><tr><td class="sbpHdr">Preview (${a}/${t} characters)</td></tr><tr><td class="sbpMsg"><span>${e}</span></td></tr></tbody></table>`,n)}function o(s){r=t("textInputBox"),e(r,"keyup",a(l,s))}export{o as i}
//# sourceMappingURL=injectShoutboxWidgets-d3392581.js.map
