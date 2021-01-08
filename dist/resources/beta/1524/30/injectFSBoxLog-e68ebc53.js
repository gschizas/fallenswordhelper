import{y as s,j as n,i as t,o as a,h as e,b as o,B as f,b7 as i,U as c,V as r,bV as b,J as l}from"./calfSystem-ebf4b17d.js"
import{g as m,s as h}from"./idb-b7d9067e.js"
import{c as x}from"./createSpan-2a49124f.js"
function p(n){let t=function(s){return s||""}(n)
const a=l("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),e(n,c)}function d(){const t=s("minibox-fsbox")
n()&&t&&g(t)}export default d
//# sourceMappingURL=injectFSBoxLog-e68ebc53.js.map
