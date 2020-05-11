import{A as t,f as e,v as s,C as a}from"./calfSystem-99da704d.js"
let r,n
function l(t){let e=r.value,s=e.length
s>t&&(e=e.substring(0,t),r.value=e,s=t),n||(n=r.parentNode.parentNode.parentNode.parentNode.insertRow().insertCell()),a('<table class="sbpTbl"><tbody><tr>'+`<td class="sbpHdr">Preview (${s}/${t} characters)</td></tr><tr><td class="sbpMsg"><span>${e}</span></td></tr></tbody></table>`,n)}function d(a){r=t("textInputBox"),e(r,"keyup",s(l,a))}export{d as i}
//# sourceMappingURL=injectShoutboxWidgets-67ff0ba4.js.map
