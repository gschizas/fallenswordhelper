import{c as s}from"./createSpan-4c34b034.js"
import{y as n,j as t,i as a,o,h as e,b as i,B as c,bb as f,V as r,W as b,bR as l,J as m}from"./calfSystem-45544049.js"
import{g as h,s as x}from"./idb-ca3578bc.js"
function p(s){let t=function(s){return s||""}(s)
const a=m("message",n("minibox-fsbox"))[0].innerHTML
t.indexOf(a)<0&&(t=`<br>${a}${t}`),t.length>1e4&&(t=t.substring(0,1e4)),x("fsh_fsboxcontent",t)}function u(){r("injectFSBoxLog","injectFsBoxContent"),b(l)}function g(n){const t=n.lastElementChild
a(t,"<br>"),function(s){let n=i("a",s)
0!==n.length&&(h("fsh_fsboxcontent").then(p),n=c(n[0]),a(s,`<span class="fshPaleVioletRed">[ <a href="${f}${n}">Ignore</a> ]</span> `))}(t)
const r=s({className:"fshYellow",innerHTML:'[ <span class="fshLink">Log</span> ]'})
o(r,u),e(t,r)}function j(){const s=n("minibox-fsbox")
t()&&s&&g(s)}export default j
//# sourceMappingURL=injectFSBoxLog-c9bcd25e.js.map
