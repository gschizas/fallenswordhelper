import{D as e,p as a,ap as t,f as r,C as s,br as n,bs as o,G as i,a3 as c,Y as f,b3 as m,B as p}from"./calfSystem-03970067.js"
import{i as d}from"./insertElementBefore-c9a36777.js"
import{c as l}from"./createSpan-3c9a32c0.js"
import{i as h}from"./insertHtmlAfterEnd-d9794923.js"
import{c as u}from"./createAnchor-30244aeb.js"
import{g}from"./getArrayByClassName-24024eda.js"
import{g as C}from"./getTitle-788ea5a5.js"
import{p as b}from"./parseDateAsTimestamp-375eca5d.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(C(e)),t=u({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>b(p(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),g("news_body_tavern",a).filter(y).forEach(A)),i("trackLadderReset")&&function(){const e=g("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-09adc780.js.map
