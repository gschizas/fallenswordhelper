import{I as e,p as a,ao as t,f as r,M as s,bD as n,bE as o,D as i,a1 as c,W as f,b6 as m,A as d}from"./calfSystem-4197cc22.js"
import{i as p}from"./insertElementBefore-fe70cd72.js"
import{c as l}from"./createSpan-537a8929.js"
import{g as h}from"./getArrayByClassName-22badefd.js"
import{i as u}from"./insertHtmlAfterEnd-33a3ae32.js"
import{c as g}from"./createAnchor-846eef4c.js"
import{g as b}from"./getTitle-aa9d108f.js"
import{p as C}from"./parseDateAsTimestamp-11233d2d.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${t}creatures&search_name=${e}`}function w(e){const a=encodeURIComponent(b(e)),t=g({href:_(a),target:"_blank"})
p(t,e),r(t,e)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var r
return a[2]=j(_(a[2]),a[2]),a[4]=j((r=a[4],`${t}realms&search_name=${r}`),a[4]),a.slice(1).join("")}function k(e){const a=l({innerHTML:A(e)})
e.replaceChild(a,e.firstChild)}const E=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const L=e=>m("PvP Ladder",e.children[1]),v=e=>C(d(e.children[2]))
export default function(){i("pageTwoLinks")&&function(){const e=s(`#pCC a[href="${n}"]`)
if(!e)return
u(e,E(n,"Updates"))
const a=s(`#pCC a[href="${o}"]`)
u(a,E(o,"News"))}(),i("addUfsgLinks")&&(e('.news_body img[src*="/creatures/"]').forEach(w),h("news_body_tavern",a).filter(y).forEach(k)),i("trackLadderReset")&&function(){const e=h("news_head_tavern",a).filter(L).map(v),t=Math.max.apply(null,e)
t>i(c)&&f(c,t)}()}
//# sourceMappingURL=news-58e59db4.js.map
