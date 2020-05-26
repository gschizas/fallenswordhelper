import{I as e,p as a,af as t,f as r,L as s,bK as n,bL as o,D as i,V as c,bh as f,A as d}from"./calfSystem-740ec4d2.js"
import{i as m}from"./insertElementBefore-d3961941.js"
import{c as l}from"./createSpan-b29fd959.js"
import{g as p}from"./getArrayByClassName-c703ad24.js"
import{i as h}from"./insertHtmlAfterEnd-85b35954.js"
import{c as u}from"./createAnchor-a59e97c0.js"
import{g as b}from"./getTitle-23037f08.js"
import{p as g}from"./parseDateAsTimestamp-256bcc14.js"
const C=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function $(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function j(e){return`${t}creatures&search_name=${e}`}function L(e){const a=encodeURIComponent(b(e)),t=u({href:j(a),target:"_blank"})
m(t,e),r(t,e)}function _(e){return C.test(e.firstChild.nodeValue)}function w(e){const a=e.firstChild.nodeValue.match(C)
var r
return a[2]=$(j(a[2]),a[2]),a[4]=$((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function y(e){const a=l({innerHTML:w(e)})
e.replaceChild(a,e.firstChild)}const A=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const k=e=>f("PvP Ladder",e.children[1]),v=e=>g(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,A(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,A(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(L),p("news_body_tavern",a).filter(_).forEach(y)),i("trackLadderReset")&&function(){const e=p("news_head_tavern",a).filter(k).map(v),t=Math.max.apply(null,e)
t>i("lastLadderReset")&&c("lastLadderReset",t)}()}
//# sourceMappingURL=news-ba867060.js.map
