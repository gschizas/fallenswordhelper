import{y as s,j as n,i as a,o as t,f as o,b as e,B as f,bd as i,V as c,W as r,bY as l,I as b}from"./calfSystem-a2862afc.js"
import{g as m,s as h}from"./idb-911ff7c2.js"
import{c as x}from"./createSpan-b8f0a31d.js"
function p(n){let a=function(s){return s||""}(n)
const t=b("message",s("minibox-fsbox"))[0].innerHTML
a.indexOf(t)<0&&(a=`<br>${t}${a}`),a.length>1e4&&(a=a.substring(0,1e4)),h("fsh_fsboxcontent",a)}function u(){c("injectFSBoxLog","injectFsBoxContent"),r(l)}function g(s){const n=s.lastElementChild
a(n,"<br>"),function(s){let n=e("a",s)
0!==n.length&&(m("fsh_fsboxcontent").then(p),n=f(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${i}${n}">Ignore</a> ]</span> `))}(n)
const c=x({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
t(c,u),o(n,c)}export default function(){const a=s("minibox-fsbox")
n()&&a&&g(a)}
//# sourceMappingURL=injectFSBoxLog-478c06b3.js.map
