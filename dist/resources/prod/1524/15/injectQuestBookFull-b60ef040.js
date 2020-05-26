import{s as t,D as e,aS as s,z as o,o as a,p as n,b as r,d as c,V as i}from"./calfSystem-740ec4d2.js"
import{d as l}from"./dontPost-e5e24e4d.js"
import{d as u}from"./dataRows-4e334837.js"
import{h as f}from"./hideElement-f48178cf.js"
import"./closest-a3325de8.js"
import{c as d}from"./closestTable-770ab949.js"
import{r as m}from"./replaceDoubleSpace-d60802e1.js"
import"./csvSplit-dbbb8019.js"
import{s as p}from"./shouldBeArray-2f2d7d51.js"
import{g}from"./guideButtons-6c47e38d.js"
function b(t,e){const a=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
f(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,f(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(g(n,a),e.cells[4])}function h(s){const o=e("hideQuests")?p("hideQuestNames"):[]
u(s.rows,5,0).forEach(t(b,o))}function j(t){"submit"===t.target.type&&(t.preventDefault(),l(d(t.target).parentNode))}let Q,S,P,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function y(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function D(t){return e(t)}function E(t,e){e.length>0&&t.setAttribute("href",e)}function B(t,e){E(P,t[e]),E(N,t[e+1]),E(A,t[e+2])}function C(){const t=x.map(D),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(E(S,e[v]),B(t,0)):(E(Q,e[v]),B(t,3))}function F(){e("storeLastQuestPage")&&(!function(){const e=r("a",n);[Q,S,P,N,A]=e,v=w.reduce(t(y,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(x[v],t)}(),C())}export default function(){a(n,j),F()
const t=r(c,n)[5]
t&&h(t)}
//# sourceMappingURL=injectQuestBookFull-b60ef040.js.map
