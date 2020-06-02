import{x as s,j as n,i as a,o as t,f as e,b as o,A as i,be as f,T as c,U as r,c0 as l,F as b}from"./calfSystem-d49dbbd3.js"
import{g as m,s as x}from"./idb-a6d1a1ba.js"
import{c as d}from"./createSpan-d12a564e.js"
function h(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),x("fsh_fsboxcontent",a)}function p(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function u(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(h),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=d({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,p),e(n,c)}export default function(){const a=s("minibox-fsbox")
n()&&a&&u(a)}
//# sourceMappingURL=injectFSBoxLog-5fcb600a.js.map
