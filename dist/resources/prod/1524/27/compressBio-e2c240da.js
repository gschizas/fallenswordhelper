import{y as e,f as t,t as o,V as s}from"./calfSystem-3bdf319e.js"
import{c as r}from"./createInput-52b88e62.js"
import{c as n}from"./createLabel-5e5a446f.js"
import{i as a}from"./insertElementBefore-543d9ef0.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}export default i
//# sourceMappingURL=compressBio-e2c240da.js.map
