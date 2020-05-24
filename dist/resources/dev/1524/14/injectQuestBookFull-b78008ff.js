import{u as t,F as e,aV as s,b6 as a,B as o,m as n,o as c,p as r,b as i,d as l,a4 as u}from"./calfSystem-d96a3efd.js"
import{d as f}from"./dontPost-a74ab672.js"
import{d as m}from"./dataRows-f436d5a8.js"
import"./closest-f6c323ce.js"
import{c as d}from"./closestTable-2bbeb9ce.js"
import{r as p}from"./replaceDoubleSpace-712a985e.js"
import{g}from"./guideButtons-30467c7e.js"
function b(t,e){const s=p(a(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
n(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,n(t)}}(t,s,e)
const c=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(g(c,s),e.cells[4])}function Q(a){const o=e("hideQuests")?s("hideQuestNames"):[]
m(a.rows,5,0).forEach(t(b,o))}function P(t){"submit"===t.target.type&&(t.preventDefault(),f(d(t.target).parentNode))}let S,h,j,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function F(t,e,s,a){return"#FF0000"===t[a].children[0].getAttribute("color")?e+s:e}function y(t){return e(t)}function B(t,e){e.length>0&&t.setAttribute("href",e)}function C(t,e){B(j,t[e]),B(N,t[e+1]),B(A,t[e+2])}function D(){const t=x.map(y),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(B(h,e[v]),C(t,0)):(B(S,e[v]),C(t,3))}function E(){e("storeLastQuestPage")&&(!function(){const e=i("a",r);[S,h,j,N,A]=e,v=w.reduce(t(F,e),0)}(),function(){const t=window.location.search
u("lastActiveQuestPage",t),u(x[v],t)}(),D())}export default function(){c(r,P),E()
const t=i(l,r)[5]
t&&Q(t)}
//# sourceMappingURL=injectQuestBookFull-b78008ff.js.map
