import{t,G as e,K as s,A as o,b as a,p as n,d as r,Y as i}from"./calfSystem-2741d97b.js"
import{d as c}from"./dataRows-9eb2983f.js"
import{h as l}from"./hideElement-6a4f37a8.js"
import"./formToUrl-d134536c.js"
import{i as u}from"./interceptSubmit-60aabec1.js"
import{g as f}from"./guideButtons-a33f4502.js"
import{r as m}from"./replaceDoubleSpace-060109a0.js"
import"./csvSplit-566a136d.js"
import{s as d}from"./shouldBeArray-f8476c4b.js"
function p(t,e){const a=m(s(e.cells[0]))
!function(t,e,s){if(t.includes(e)){let t=s
l(t)
for(let e=0;e<3;e++)t=t.nextElementSibling,l(t)}}(t,a,e)
const n=/quest_id=(\d+)/.exec(e.cells[4].innerHTML)[1]
o(f(n,a),e.cells[4])}function g(s){const o=e("hideQuests")?d("hideQuestNames"):[]
c(s.rows,5,0).forEach(t(p,o))}let b,h,Q,S,j,P
const A=[0,3,0,1,2],N=["lastNormalActiveQuestPage","lastNormalCompletedQuestPage","lastNormalNotStartedQuestPage","lastSeasonalActiveQuestPage","lastSeasonalCompletedQuestPage","lastSeasonalNotStartedQuestPage"]
function v(t,e,s,o){return"#FF0000"===t[o].children[0].getAttribute("color")?e+s:e}function w(t){return e(t)}function x(t,e){e.length>0&&t.setAttribute("href",e)}function E(t,e){x(Q,t[e]),x(S,t[e+1]),x(j,t[e+2])}function y(){const t=N.map(w),e=function(t){return[t[3],t[4],t[5],t[0],t[1],t[2]]}(t)
P<3?(x(h,e[P]),E(t,0)):(x(b,e[P]),E(t,3))}function B(){e("storeLastQuestPage")&&(!function(){const e=a("a",n);[b,h,Q,S,j]=e,P=A.reduce(t(v,e),0)}(),function(){const t=window.location.search
i("lastActiveQuestPage",t),i(N[P],t)}(),y())}export default function(){u(),B()
const t=a(r,n)[5]
t&&g(t)}
//# sourceMappingURL=injectQuestBookFull-48b2e8c9.js.map
