import{D as e,p as a,ap as t,h as r,C as s,bx as n,by as o,G as i,a3 as f,Y as c,b5 as m,B as d}from"./calfSystem-34fcd691.js"
import{i as p}from"./insertElementBefore-f1fdb06b.js"
import{c as l}from"./createSpan-4ec18ffd.js"
import{c as h}from"./createAnchor-06e8c34f.js"
import{g as u}from"./getArrayByClassName-674a825f.js"
import{g as b}from"./getTitle-13ec26f0.js"
import{i as g}from"./insertHtmlAfterEnd-d9a9762d.js"
import{p as C}from"./parseDateAsTimestamp-56d08ae7.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function y(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function w(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function A(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>m("PvP Ladder",e.children[1]),E=e=>C(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,L(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,L(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(y),u("news_body_tavern",a).filter(w).forEach(A)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(v).map(E),t=Math.max.apply(null,e)
t>i(f)&&c(f,t)}()}
//# sourceMappingURL=news-68506f23.js.map
