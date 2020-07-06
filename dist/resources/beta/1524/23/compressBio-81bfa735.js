import{y as e,f as t,t as o,U as s}from"./calfSystem-34fcd691.js"
import{c as r}from"./createInput-160fd5a0.js"
import{c as n}from"./createLabel-08dbc484.js"
import{i as a}from"./insertElementBefore-f1fdb06b.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}
//# sourceMappingURL=compressBio-81bfa735.js.map
