import{t,H as e,G as s,A as o,b as a,p as n,d as c,Y as r}from"./calfSystem-d3aab5a8.js"
import{d as i}from"./dataRows-87814179.js"
import{h as l}from"./hideElement-c8e0696f.js"
import"./formToUrl-19959c48.js"
import{i as u}from"./interceptSubmit-07270cc9.js"
import{g as f}from"./guideButtons-cc66e75e.js"
import{r as m}from"./replaceDoubleSpace-08433fa1.js"
import"./csvSplit-8c1a6c7f.js"
import{s as d}from"./shouldBeArray-2c799eba.js"
function p(t,e){const a=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(f(n,a),e.cells[4])}function g(s){const o=e("hideQuests")?d("hideQuestNames"):[]
i(s.rows,5,0).forEach(t(p,o))}let h,Q,S,j,b,P
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(S,t[e]),x(j,t[e+1]),x(b,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
P<3?(x(Q,e[P]),E(t,0)):(x(h,e[P]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=a("a",n);[h,Q,S,j,b]=e,P=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
r("lastActiveQuestPage",t),r(N[P],t)}(),y())}function C(){u(),B()
const t=a(c,n)[5]
t&&g(t)}export default C
//# sourceMappingURL=injectQuestBookFull-0d34e948.js.map
