import{y as s,j as n,i as e,o as t,h as o,b as a,B as c,b6 as i,U as f,V as r,bS as l,I as b}from"./calfSystem-019de1cf.js"
import{g as m,s as h}from"./idb-1bb3cee2.js"
import{c as x}from"./createSpan-c11958c4.js"
function p(n){let e=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
e.indexOf(t)<0&&(e=`<br>${t}${e}`),e.length>1e4&&(e=e.substring(0,1e4)),h("fsh_fsboxcontent",e)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
e(n,"<br>"),function(s){let n=a("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=c(n[0]),e(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const f=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(f,u),o(n,f)}export default function(){const e=s("minibox-fsbox")
n()&&e&&g(e)}
//# sourceMappingURL=injectFSBoxLog-15592ef3.js.map
