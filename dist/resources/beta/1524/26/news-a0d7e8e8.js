import{D as a,p as e,ap as t,h as r,C as s,bv as n,bw as o,H as c,a3 as i,Y as f,b5 as m,B as p}from"./calfSystem-cf4d22a7.js"
import{i as d}from"./insertElementBefore-47c09359.js"
import{c as l}from"./createSpan-7e967fbf.js"
import{c as h}from"./createAnchor-4750bb57.js"
import{g as u}from"./getArrayByClassName-9fa4b21c.js"
import{g as b}from"./getTitle-c4da3154.js"
import{i as g}from"./insertHtmlAfterEnd-a7b25c39.js"
import{p as C}from"./parseDateAsTimestamp-21fc8baa.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(a,e){return`<a href="${a}" target="_blank">${e}</a>`}function _(a){return`${t}creatures&search_name=${a}`}function w(a){const e=encodeURIComponent(b(a)),t=h({href:_(e),target:"_blank"})
d(t,a),r(t,a)}function y(a){return $.test(a.firstChild.nodeValue)}function k(a){const e=a.firstChild.nodeValue.match($)
var r
return e[2]=j(_(e[2]),e[2]),e[4]=j((r=e[4],`${t}realms&search_name=${r}`),e[4]),e.slice(1).join("")}function v(a){const e=l({innerHTML:k(a)})
a.replaceChild(e,a.firstChild)}const A=(a,e)=>`&nbsp;<a href="${a}&page=2">View ${e} Page 2</a>`
const L=a=>m("PvP Ladder",a.children[1]),E=a=>C(p(a.children[2]))
function T(){c("pageTwoLinks")&&function(){const a=s(`#pCC a[href="${n}"]`)
if(!a)return
g(a,A(n,"Updates"))
const e=s(`#pCC a[href="${o}"]`)
g(e,A(o,"News"))}(),c("addUfsgLinks")&&(a('.news_body img[src*="/creatures/"]').forEach(w),u("news_body_tavern",e).filter(y).forEach(v)),c("trackLadderReset")&&function(){const a=u("news_head_tavern",e).filter(L).map(E),t=Math.max.apply(null,a)
t>c(i)&&f(i,t)}()}export default T
//# sourceMappingURL=news-a0d7e8e8.js.map
