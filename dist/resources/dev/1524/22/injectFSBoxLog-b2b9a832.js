import{y as s,j as n,i as a,o as t,h as e,b as o,B as c,bd as i,V as f,W as r,bZ as l,I as b}from"./calfSystem-4cc738f8.js"
import{g as m,s as h}from"./idb-670c0cca.js"
import{c as x}from"./createSpan-273eaa7e.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=c(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const f=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(f,u),e(n,f)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-b2b9a832.js.map
