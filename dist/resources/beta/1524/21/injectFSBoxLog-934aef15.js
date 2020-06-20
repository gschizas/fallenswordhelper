import{y as s,j as n,i as t,o as a,h as e,b as o,B as i,b8 as f,U as c,V as r,bX as b,I as l}from"./calfSystem-89b939c8.js"
import{g as m,s as h}from"./idb-9be3057e.js"
import{c as x}from"./createSpan-716fba1d.js"
function p(n){let t=function(s){return s||""}(n)
const a=l("message",s("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),h("fsh_fsboxcontent",t)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(b)}function g(s){const n=s.lastElementChild
t(n,"<br>"),function(s){let n=o("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=i(n[0]),t(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(c,u),e(n,c)}export default function(){const t=s("minibox-fsbox")
n()&&t&&g(t)}
//# sourceMappingURL=injectFSBoxLog-934aef15.js.map
