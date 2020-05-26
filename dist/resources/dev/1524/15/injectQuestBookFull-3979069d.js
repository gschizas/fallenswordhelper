import{s as t,D as e,aQ as s,z as o,o as a,p as n,b as c,d as r,W as i}from"./calfSystem-ee582533.js"
import{d as l}from"./dontPost-2a1b6847.js"
import{d as u}from"./dataRows-b7cf82e5.js"
import{h as f}from"./hideElement-faecef36.js"
import"./closest-d675e111.js"
import{c as m}from"./closestTable-ffc1b5cf.js"
import{r as d}from"./replaceDoubleSpace-f55f9c04.js"
import"./csvSplit-7018cdb4.js"
import{s as p}from"./shouldBeArray-3e5e27c5.js"
import{g}from"./guideButtons-5a03aed0.js"
function b(t,e){const a=d(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
f(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,f(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(g(n,a),e.cells[4])}function Q(s){const o=e("hideQuests")?p("hideQuestNames"):[]
u(s.rows,5,0).forEach(t(b,o))}function h(t){"submit"===t.target.type&&(t.preventDefault(),l(m(t.target).parentNode))}let j,P,S,N,A,v
const w=[0,3,0,1,2],x=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function y(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function D(t){return e(t)}function E(t,e){e.length>0&&t.setAttribute("href",e)}function B(t,e){E(S,t[e]),E(N,t[e+1]),E(A,t[e+2])}function C(){const t=x.map(D),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
v<3?(E(P,e[v]),B(t,0)):(E(j,e[v]),B(t,3))}function F(){e("storeLastQuestPage")&&(!function(){const e=c("a",n);[j,P,S,N,A]=e,v=w.reduce(t(y,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(x[v],t)}(),C())}export default function(){a(n,h),F()
const t=c(r,n)[5]
t&&Q(t)}
//# sourceMappingURL=injectQuestBookFull-3979069d.js.map
