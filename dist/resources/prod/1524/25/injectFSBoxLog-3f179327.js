import{y as s,j as n,i as a,o as t,h as e,b as o,B as i,b6 as f,U as c,V as r,bS as l,J as b}from"./calfSystem-71b9378d.js"
import{g as m,s as h}from"./idb-97e2a44e.js"
import{c as x}from"./createSpan-729a1388.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),e(n,c)}function d(){const a=s("minibox-fsbox")
n()&&a&&g(a)}export default d
//# sourceMappingURL=injectFSBoxLog-3f179327.js.map
