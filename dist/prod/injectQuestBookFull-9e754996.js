import{v as t,G as e,aU as s,bi as o,C as a,n,o as c,p as r,b as i,c as l,a4 as u}from"./calfSystem-cb871cc0.js"
import{d as f}from"./dontPost-bd45f448.js"
import{d}from"./dataRows-87df51bd.js"
import"./closest-8cd211a4.js"
import{c as m}from"./closestTable-f05bb6bb.js"
import{r as p}from"./replaceDoubleSpace-0d9f0c77.js"
import{g as b}from"./guideButtons-73b474c4.js"
function g(t,e){const s=p(o(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
n(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,n(t)}}(t,s,e)
const c=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
a(b(c,s),e.cells[4])}function Q(o){const a=e("hideQuests")?s("hideQuestNames"):[]
d(o.rows,5,0).forEach(t(g,a))}function P(t){"submit"===t.target.type&&(t.preventDefault(),f(m(t.target).parentNode))}let S,h,j,N,v,A
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function C(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function y(t){return e(t)}function D(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){D(j,t[e]),D(N,t[e+1]),D(v,t[e+2])}function F(){const t=x.map(y),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
A<3?(D(h,e[A]),E(t,0)):(D(S,e[A]),E(t,3))}function L(){e("storeLastQuestPage")&&(!function(){const e=i("a",r);[S,h,j,N,v]=e,A=w.reduce(t(C,e),0)}(),function(){const t=window.location.search
u("lastActiveQuestPage",t),u(x[A],t)}(),F())}export default function(){c(r,P),L()
const t=i(l,r)[5]
t&&Q(t)}
//# sourceMappingURL=injectQuestBookFull-9e754996.js.map
