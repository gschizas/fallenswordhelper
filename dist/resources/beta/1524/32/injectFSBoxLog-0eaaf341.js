import{c as s}from"./createSpan-d92b45d9.js"
import{y as n,j as t,i as o,o as a,h as e,b as f,B as i,bd as c,V as r,W as b,bU as l,J as m}from"./calfSystem-26bcf570.js"
import{g as h,s as x}from"./idb-47b3fdf8.js"
function d(s){let t=function(s){return s||""}(s)
const o=m("message",n("minibox-fsbox"))[0].innerHTML
t.indexOf(o)<0&&(t=`<br>${o}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),x("fsh_fsboxcontent",t)}function p(){r("injectFSBoxLog","injectFsBoxContent"),b(l)}function u(n){const t=n.lastElementChild
o(t,"<br>"),function(s){let n=f("a",s)
0!==n.length&&(h("fsh_fsboxcontent").then(d),n=i(n[0]),o(s,`<span class="fshPaleVioletRed">[ <a href="${c}${n}">Ignore</a> ]</span> `))}(t)
const r=s({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
a(r,p),e(t,r)}function g(){const s=n("minibox-fsbox")
t()&&s&&u(s)}export default g
//# sourceMappingURL=injectFSBoxLog-0eaaf341.js.map
