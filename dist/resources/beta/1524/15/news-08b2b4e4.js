import{I as e,p as a,af as t,f as r,L as s,bO as n,bP as o,D as i,V as c,bj as f,A as d}from"./calfSystem-1262535f.js"
import{i as m}from"./insertElementBefore-dcdbe7ae.js"
import{c as l}from"./createSpan-aa5e4be8.js"
import{g as p}from"./getArrayByClassName-486c0115.js"
import{i as h}from"./insertHtmlAfterEnd-2dcd57ed.js"
import{c as u}from"./createAnchor-89104765.js"
import{g as b}from"./getTitle-c55a3ff0.js"
import{p as g}from"./parseDateAsTimestamp-53cf8e3f.js"
const j=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function C(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function $(e){return`${t}creatures&search_name=${e}`}function _(e){const a=encodeURIComponent(b(e)),t=u({href:$(a),target:"_blank"})
m(t,e),r(t,e)}function L(e){return j.test(e.firstChild.nodeValue)}function w(e){const a=e.firstChild.nodeValue.match(j)
var r
return a[2]=C($(a[2]),a[2]),a[4]=C((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function y(e){const a=l({innerHTML:w(e)})
e.replaceChild(a,e.firstChild)}const A=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const k=e=>f("PvP Ladder",e.children[1]),v=e=>g(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,A(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,A(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(_),p("news_body_tavern",a).filter(L).forEach(y)),i("trackLadderReset")&&function(){const e=p("news_head_tavern",a).filter(k).map(v),t=Math.max.apply(null,e)
t>i("lastLadderReset")&&c("lastLadderReset",t)}()}
//# sourceMappingURL=news-08b2b4e4.js.map
