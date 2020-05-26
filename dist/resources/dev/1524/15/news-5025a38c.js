import{I as e,p as a,ai as t,f as r,M as s,bT as n,bU as o,D as i,W as c,bp as f,A as m}from"./calfSystem-ee582533.js"
import{i as d}from"./insertElementBefore-7ed837be.js"
import{c as p}from"./createSpan-63b97269.js"
import{g as l}from"./getArrayByClassName-981a136a.js"
import{i as h}from"./insertHtmlAfterEnd-4dbaaf09.js"
import{c as u}from"./createAnchor-0ba33db2.js"
import{g as b}from"./getTitle-0b8e386f.js"
import{p as g}from"./parseDateAsTimestamp-aa2b0443.js"
const C=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function $(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function j(e){return`${t}creatures&search_name=${e}`}function _(e){const a=encodeURIComponent(b(e)),t=u({href:j(a),target:"_blank"})
d(t,e),r(t,e)}function L(e){return C.test(e.firstChild.nodeValue)}function w(e){const a=e.firstChild.nodeValue.match(C)
var r
return a[2]=$(j(a[2]),a[2]),a[4]=$((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function y(e){const a=p({innerHTML:w(e)})
e.replaceChild(a,e.firstChild)}const A=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const k=e=>f("PvP Ladder",e.children[1]),T=e=>g(m(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
h(e,A(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
h(a,A(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(_),l("news_body_tavern",a).filter(L).forEach(y)),i("trackLadderReset")&&function(){const e=l("news_head_tavern",a).filter(k).map(T),t=Math.max.apply(null,e)
t>i("lastLadderReset")&&c("lastLadderReset",t)}()}
//# sourceMappingURL=news-5025a38c.js.map
