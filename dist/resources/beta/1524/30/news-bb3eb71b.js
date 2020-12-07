import{D as e,p as a,ap as t,h as r,C as s,bu as n,bv as o,H as i,a3 as f,Y as c,b4 as m,B as p}from"./calfSystem-ebf4b17d.js"
import{i as d}from"./insertElementBefore-1b96a575.js"
import{c as l}from"./createSpan-2a49124f.js"
import{c as h}from"./createAnchor-eef06802.js"
import{g as u}from"./getArrayByClassName-f55d7526.js"
import{g as b}from"./getTitle-24a55fc7.js"
import{i as g}from"./insertHtmlAfterEnd-e822003d.js"
import{p as C}from"./parseDateAsTimestamp-6231b29e.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=h({href:_(a),target:"_blank"})
d(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function v(e){const a=l({innerHTML:k(e)})
e.replaceChild(a,e.firstChild)}const A=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const L=e=>m("PvP Ladder",e.children[1]),E=e=>C(p(e.children[2]))
function T(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
g(e,A(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
g(a,A(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",a).filter(y).forEach(v)),i("trackLadderReset")&&function(){const e=u("news_head_tavern",a).filter(L).map(E),t=Math.max.apply(null,e)
t>i(f)&&c(f,t)}()}export default T
//# sourceMappingURL=news-bb3eb71b.js.map
