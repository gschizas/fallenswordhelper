import{u as t,F as e,aT as s,bj as a,B as o,m as n,o as c,p as r,b as i,d as l,a3 as u}from"./calfSystem-371c414c.js"
import{d as f}from"./dontPost-0ae0f7ca.js"
import{d}from"./dataRows-e367647c.js"
import"./closest-d5dda5d9.js"
import{c as m}from"./closestTable-b335e246.js"
import{r as p}from"./replaceDoubleSpace-29753e20.js"
import{g}from"./guideButtons-0d2cbcaa.js"
function b(t,e){const s=p(a(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
n(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,n(t)}}(t,s,e)
const c=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(g(c,s),e.cells[4])}function Q(a){const o=e("hideQuests")?s("hideQuestNames"):[]
d(a.rows,5,0).forEach(t(b,o))}function P(t){"submit"===t.target.type&&(t.preventDefault(),f(m(t.target).parentNode))}let j,S,h,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function F(t,e,s,a){return"#FF0000"===t[a].children[0].getAttribute("color")?e+s:e}function T(t){return e(t)}function y(t,e){e.length>0&&t.setAttribute("href",e)}function B(t,e){y(h,t[e]),y(N,t[e+1]),y(A,t[e+2])}function C(){const t=x.map(T),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(y(S,e[v]),B(t,0)):(y(j,e[v]),B(t,3))}function D(){e("storeLastQuestPage")&&(!function(){const e=i("a",r);[j,S,h,N,A]=e,v=w.reduce(t(F,e),0)}(),function(){const t=window.location.search
u("lastActiveQuestPage",t),u(x[v],t)}(),C())}export default function(){c(r,P),D()
const t=i(l,r)[5]
t&&Q(t)}
//# sourceMappingURL=injectQuestBookFull-4ee7bc1e.js.map
