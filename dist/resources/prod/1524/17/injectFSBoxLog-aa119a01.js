import{x as s,j as n,i as e,o as t,f as o,b as a,A as f,b7 as i,S as c,T as r,bV as l,F as b}from"./calfSystem-dec5e071.js"
import{g as m,s as x}from"./idb-8fe34e30.js"
import{c as h}from"./createSpan-660731dc.js"
function p(n){let e=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
e.indexOf(t)<0&&(e=`<br>${t}${e}`),e.length>1e4&&(e=e.substring(0,1e4)),x("fsh_fsboxcontent",e)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
e(n,"<br>"),function(s){let n=a("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),e(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=h({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),o(n,c)}export default function(){const e=s("minibox-fsbox")
n()&&e&&g(e)}
//# sourceMappingURL=injectFSBoxLog-aa119a01.js.map
