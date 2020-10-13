import{t,H as e,G as s,A as a,b as o,p as n,d as r,Z as i}from"./calfSystem-b136673a.js"
import{d as c}from"./dataRows-17e46aaa.js"
import{h as l}from"./hideElement-c14a94c9.js"
import"./formToUrl-1d96bdd4.js"
import{i as u}from"./interceptSubmit-957549ab.js"
import{g as f}from"./guideButtons-8654ef8e.js"
import{r as m}from"./replaceDoubleSpace-bdb86519.js"
import"./csvSplit-ab694daa.js"
import{s as d}from"./shouldBeArray-f0a179d2.js"
function p(t,e){const o=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,o,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
a(f(n,o),e.cells[4])}function g(s){const a=e("hideQuests")?d("hideQuestNames"):[]
c(s.rows,5,0).forEach(t(p,a))}let b,h,Q,S,j,P
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,a){return"#FF0000"===t[a].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(Q,t[e]),x(S,t[e+1]),x(j,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
P<3?(x(h,e[P]),E(t,0)):(x(b,e[P]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=o("a",n);[b,h,Q,S,j]=e,P=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(N[P],t)}(),y())}function C(){u(),B()
const t=o(r,n)[5]
t&&g(t)}export default C
//# sourceMappingURL=injectQuestBookFull-bdd6cb06.js.map
