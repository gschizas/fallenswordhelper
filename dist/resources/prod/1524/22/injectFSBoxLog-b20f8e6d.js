import{y as s,j as n,i as e,o as t,h as a,b as o,B as i,b6 as f,U as c,V as r,bS as l,I as b}from"./calfSystem-d04e4be4.js"
import{g as m,s as h}from"./idb-0492f5ed.js"
import{c as x}from"./createSpan-ae8c4e9e.js"
function p(n){let e=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
e.indexOf(t)<0&&(e=`<br>${t}${e}`),e.length>1e4&&(e=e.substring(0,1e4)),h("fsh_fsboxcontent",e)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
e(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),e(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),a(n,c)}export default function(){const e=s("minibox-fsbox")
n()&&e&&g(e)}
//# sourceMappingURL=injectFSBoxLog-b20f8e6d.js.map
