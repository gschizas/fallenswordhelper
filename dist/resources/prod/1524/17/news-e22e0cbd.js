import{I as e,p as a,ao as t,f as r,M as s,by as n,bz as o,D as i,a1 as c,W as f,b4 as m,A as d}from"./calfSystem-dec5e071.js"
import{i as p}from"./insertElementBefore-1d764477.js"
import{c as l}from"./createSpan-660731dc.js"
import{g as h}from"./getArrayByClassName-82011e34.js"
import{i as u}from"./insertHtmlAfterEnd-52e450d3.js"
import{c as b}from"./createAnchor-8cf1e1be.js"
import{g}from"./getTitle-2f35bb43.js"
import{p as C}from"./parseDateAsTimestamp-c7307a60.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function y(e){const a=encodeURIComponent(g(e)),t=b({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function w(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(y),h("news_body_tavern",a).filter(w).forEach(k)),i("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-e22e0cbd.js.map
