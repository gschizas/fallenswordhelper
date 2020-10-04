import{y as s,j as n,i as e,o as a,h as t,b as o,B as c,bd as i,W as f,X as r,bY as l,J as b}from"./calfSystem-ec5e5725.js"
import{g as m,s as h}from"./idb-cecca562.js"
import{c as x}from"./createSpan-a26e8f7c.js"
function p(n){let e=function(s){return s||""}(n)
const a=b("message",s("minibox-fsbox"))[0].innerHTML
e.indexOf(a)<0&&(e=`<br>${a}${e}`),e.length>1e4&&(e=e.substring(0,1e4)),h("fsh_fsboxcontent",e)}function u(){f("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
e(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=c(n[0]),e(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const f=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(f,u),t(n,f)}function d(){const e=s("minibox-fsbox")
n()&&e&&g(e)}export default d
//# sourceMappingURL=injectFSBoxLog-bf4bc6be.js.map
