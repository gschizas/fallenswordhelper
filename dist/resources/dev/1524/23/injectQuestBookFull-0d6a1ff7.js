import{t,G as e,K as s,A as a,b as o,p as n,d as r,Z as c}from"./calfSystem-9901ad27.js"
import{d as i}from"./dataRows-8a79afc4.js"
import{h as l}from"./hideElement-48576eeb.js"
import"./formToUrl-4cebc28a.js"
import{i as u}from"./interceptSubmit-ce974a7c.js"
import{g as f}from"./guideButtons-d2afe322.js"
import{r as m}from"./replaceDoubleSpace-aad7da5f.js"
import"./csvSplit-4ba7a6af.js"
import{s as d}from"./shouldBeArray-8c69684a.js"
function p(t,e){const o=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,o,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
a(f(n,o),e.cells[4])}function g(s){const a=e("hideQuests")?d("hideQuestNames"):[]
i(s.rows,5,0).forEach(t(p,a))}let h,Q,S,b,j,P
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,a){return"#FF0000"===t[a].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(S,t[e]),x(b,t[e+1]),x(j,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
P<3?(x(Q,e[P]),E(t,0)):(x(h,e[P]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=o("a",n);[h,Q,S,b,j]=e,P=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
c("lastActiveQuestPage",t),c(N[P],t)}(),y())}export default function(){u(),B()
const t=o(r,n)[5]
t&&g(t)}
//# sourceMappingURL=injectQuestBookFull-0d6a1ff7.js.map
