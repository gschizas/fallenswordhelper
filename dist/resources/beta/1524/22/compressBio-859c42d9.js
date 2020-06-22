import{y as e,f as t,t as o,U as s}from"./calfSystem-1b876afa.js"
import{c as a}from"./createInput-2c55af64.js"
import{c as r}from"./createLabel-924dcda2.js"
import{i as n}from"./insertElementBefore-f07a50c4.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const r=n(a({id:"fshCompressToggle",type:"checkbox"}),e)
t(r,"change",o(s,"bio","toggle"))}(e),n(r({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-859c42d9.js.map
