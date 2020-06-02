import{s as t,D as e,a8 as s,z as o,o as a,p as n,b as r,d as c,W as i}from"./calfSystem-02ae8657.js"
import{d as l}from"./dontPost-c73663bf.js"
import{d as u}from"./dataRows-1cf551f5.js"
import{h as f}from"./hideElement-2791bd8d.js"
import"./closest-8af29cf3.js"
import{c as m}from"./closestTable-704cfbde.js"
import{r as d}from"./replaceDoubleSpace-ce11bedd.js"
import"./csvSplit-3188b9df.js"
import{s as p}from"./shouldBeArray-6beb3a25.js"
import{g}from"./guideButtons-7c601389.js"
function b(t,e){const a=d(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
f(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,f(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(g(n,a),e.cells[4])}function h(s){const o=e("hideQuests")?p("hideQuestNames"):[]
u(s.rows,5,0).forEach(t(b,o))}function j(t){"submit"===t.target.type&&(t.preventDefault(),l(m(t.target).parentNode))}let Q,P,S,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function y(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function D(t){return e(t)}function E(t,e){e.length>0&&t.setAttribute("href",e)}function B(t,e){E(S,t[e]),E(N,t[e+1]),E(A,t[e+2])}function C(){const t=x.map(D),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(E(P,e[v]),B(t,0)):(E(Q,e[v]),B(t,3))}function F(){e("storeLastQuestPage")&&(!function(){const e=r("a",n);[Q,P,S,N,A]=e,v=w.reduce(t(y,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(x[v],t)}(),C())}export default function(){a(n,j),F()
const t=r(c,n)[5]
t&&h(t)}
//# sourceMappingURL=injectQuestBookFull-92d47c9f.js.map
