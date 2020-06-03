import{s as t,D as e,a8 as s,z as o,o as a,p as n,b as r,d as c,W as i}from"./calfSystem-57340987.js"
import{d as l}from"./dontPost-e24d8962.js"
import{d as u}from"./dataRows-bbabdd56.js"
import{h as d}from"./hideElement-5296bb8b.js"
import"./closest-f4291115.js"
import{c as f}from"./closestTable-7d6c0bc6.js"
import{r as m}from"./replaceDoubleSpace-875d1c55.js"
import"./csvSplit-356d0548.js"
import{s as p}from"./shouldBeArray-2512cd9c.js"
import{g as b}from"./guideButtons-0218b9dc.js"
function g(t,e){const a=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
d(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,d(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(b(n,a),e.cells[4])}function h(s){const o=e("hideQuests")?p("hideQuestNames"):[]
u(s.rows,5,0).forEach(t(g,o))}function j(t){"submit"===t.target.type&&(t.preventDefault(),l(f(t.target).parentNode))}let Q,P,S,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function y(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function D(t){return e(t)}function E(t,e){e.length>0&&t.setAttribute("href",e)}function B(t,e){E(S,t[e]),E(N,t[e+1]),E(A,t[e+2])}function C(){const t=x.map(D),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(E(P,e[v]),B(t,0)):(E(Q,e[v]),B(t,3))}function F(){e("storeLastQuestPage")&&(!function(){const e=r("a",n);[Q,P,S,N,A]=e,v=w.reduce(t(y,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(x[v],t)}(),C())}export default function(){a(n,j),F()
const t=r(c,n)[5]
t&&h(t)}
//# sourceMappingURL=injectQuestBookFull-0d6a8d3d.js.map
