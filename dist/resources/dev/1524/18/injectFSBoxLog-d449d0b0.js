import{x as s,j as n,i as a,o as t,f as e,b as o,A as i,be as c,T as f,U as r,c0 as l,F as b}from"./calfSystem-5545a3e6.js"
import{g as m,s as x}from"./idb-ab1a88c6.js"
import{c as h}from"./createSpan-2a3ac8a5.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),x("fsh_fsboxcontent",a)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(n)
const f=h({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(f,u),e(n,f)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-d449d0b0.js.map
