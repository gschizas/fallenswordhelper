import{y as s,j as n,i as a,o as t,h as e,b as o,B as f,b5 as i,U as c,V as r,bQ as l,J as b}from"./calfSystem-57628ebe.js"
import{g as m,s as h}from"./idb-5c863a6f.js"
import{c as x}from"./createSpan-4a052a9f.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),e(n,c)}function j(){const a=s("minibox-fsbox")
n()&&a&&g(a)}export default j
//# sourceMappingURL=injectFSBoxLog-b1be5594.js.map
