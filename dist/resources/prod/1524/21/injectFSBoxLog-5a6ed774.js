import{y as s,j as n,i as t,o,h as a,b as e,B as f,b6 as i,U as c,V as r,bS as b,I as l}from"./calfSystem-2741d97b.js"
import{g as m,s as h}from"./idb-cb4fc9f9.js"
import{c as x}from"./createSpan-b0f81047.js"
function p(n){let t=function(s){return s||""}(n)
const o=l("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(o)<0&&(t=`<br>${o}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
o(c,u),a(n,c)}export default function(){const t=s("minibox-fsbox")
n()&&t&&g(t)}
//# sourceMappingURL=injectFSBoxLog-5a6ed774.js.map
