import{t,H as e,G as s,A as a,b as o,p as n,d as r,Y as i}from"./calfSystem-a5da5210.js"
import{d as c}from"./dataRows-544fd651.js"
import{h as l}from"./hideElement-c14a94c9.js"
import"./formToUrl-6151060b.js"
import{i as u}from"./interceptSubmit-9e7a42eb.js"
import{g as f}from"./guideButtons-b09fba8a.js"
import{r as m}from"./replaceDoubleSpace-bdb86519.js"
import"./csvSplit-ab694daa.js"
import{s as d}from"./shouldBeArray-ce366392.js"
function p(t,e){const o=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,o,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
a(f(n,o),e.cells[4])}function b(s){const a=e("hideQuests")?d("hideQuestNames"):[]
c(s.rows,5,0).forEach(t(p,a))}let g,h,Q,S,j,P
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,a){return"#FF0000"===t[a].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(Q,t[e]),x(S,t[e+1]),x(j,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
P<3?(x(h,e[P]),E(t,0)):(x(g,e[P]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=o("a",n);[g,h,Q,S,j]=e,P=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(N[P],t)}(),y())}function C(){u(),B()
const t=o(r,n)[5]
t&&b(t)}export default C
//# sourceMappingURL=injectQuestBookFull-2e425e03.js.map
