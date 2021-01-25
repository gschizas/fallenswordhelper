import{c as e}from"./createAnchor-bae86be2.js"
import{c as a}from"./createSpan-d92b45d9.js"
import{g as t}from"./getArrayByClassName-3eee0c79.js"
import{g as r}from"./getTitle-62ba3c23.js"
import{D as s,p as n,aC as o,h as i,C as c,bC as f,bD as m,H as p,a4 as d,Z as l,aB as h,B as u}from"./calfSystem-26bcf570.js"
import{i as b}from"./insertElementBefore-aa28f497.js"
import{i as C}from"./insertHtmlAfterEnd-5d93c8a7.js"
import{p as g}from"./parseDateAsTimestamp-623e3c34.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${o}creatures&search_name=${e}`}function w(a){const t=encodeURIComponent(r(a)),s=e({href:_(t),target:"_blank"})
b(s,a),i(s,a)}function y(e){return $.test(e.firstChild.nodeValue)}function k(e){const a=e.firstChild.nodeValue.match($)
var t
return a[2]=j(_(a[2]),a[2]),a[4]=j((t=a[4],`${o}realms&search_name=${t}`),a[4]),a.slice(1).join("")}function A(e){const t=a({innerHTML:k(e)})
e.replaceChild(t,e.firstChild)}const L=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const v=e=>h("PvP Ladder",e.children[1]),B=e=>g(u(e.children[2]))
function E(){p("pageTwoLinks")&&function(){const e=c(`#pCC a[href="${f}"]`)
if(!e)return
C(e,L(f,"Updates"))
const a=c(`#pCC a[href="${m}"]`)
C(a,L(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(w),t("news_body_tavern",n).filter(y).forEach(A)),p("trackLadderReset")&&function(){const e=t("news_head_tavern",n).filter(v).map(B),a=Math.max.apply(null,e)
a>p(d)&&l(d,a)}()}export default E
//# sourceMappingURL=news-f200f95e.js.map
