import{x as s,j as n,i as a,o as t,f as e,b as o,A as f,b7 as i,S as c,T as r,bW as l,F as b}from"./calfSystem-be09bdff.js"
import{g as m,s as x}from"./idb-a63ec135.js"
import{c as h}from"./createSpan-1d780ca0.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),x("fsh_fsboxcontent",a)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=h({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),e(n,c)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-123fe1a8.js.map
