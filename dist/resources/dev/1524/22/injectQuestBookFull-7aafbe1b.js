import{t,G as e,K as s,A as o,b as a,p as n,d as r,Z as c}from"./calfSystem-4cc738f8.js"
import{d as i}from"./dataRows-03f8210c.js"
import{h as l}from"./hideElement-22c940e2.js"
import"./formToUrl-84dfad91.js"
import{i as u}from"./interceptSubmit-c1f9070f.js"
import{g as f}from"./guideButtons-6581a489.js"
import{r as m}from"./replaceDoubleSpace-aa6e7904.js"
import"./csvSplit-afd1c5e2.js"
import{s as d}from"./shouldBeArray-8b887a94.js"
function p(t,e){const a=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(f(n,a),e.cells[4])}function g(s){const o=e("hideQuests")?d("hideQuestNames"):[]
i(s.rows,5,0).forEach(t(p,o))}let h,Q,S,j,P,b
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(S,t[e]),x(j,t[e+1]),x(P,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
b<3?(x(Q,e[b]),E(t,0)):(x(h,e[b]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=a("a",n);[h,Q,S,j,P]=e,b=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
c("lastActiveQuestPage",t),c(N[b],t)}(),y())}export default function(){u(),B()
const t=a(r,n)[5]
t&&g(t)}
//# sourceMappingURL=injectQuestBookFull-7aafbe1b.js.map
