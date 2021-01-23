import{c as e}from"./createAnchor-33fc6750.js"
import{c as a}from"./createSpan-6b0a8c35.js"
import{g as t}from"./getArrayByClassName-2a13cfae.js"
import{g as r}from"./getTitle-b48791f0.js"
import{D as s,p as n,aB as o,h as i,C as c,bB as f,bC as m,H as p,a3 as l,Y as d,aA as h,B as u}from"./calfSystem-47fc08ae.js"
import{i as C}from"./insertElementBefore-43970b1f.js"
import{i as b}from"./insertHtmlAfterEnd-5cf43170.js"
import{p as g}from"./parseDateAsTimestamp-f4d2108e.js"
const $=/(\s*A ')([^']*)(' titan has been spotted in )([^!]*)(!)/
function j(e,a){return`<a href="${e}" target="_blank">${a}</a>`}function _(e){return`${o}creatures&search_name=${e}`}function w(a){const t=encodeURIComponent(r(a)),s=e({href:_(t),target:"_blank"})
C(s,a),i(s,a)}function y(e){return $.test(e.firstChild.nodeValue)}function A(e){const a=e.firstChild.nodeValue.match($)
var t
return a[2]=j(_(a[2]),a[2]),a[4]=j((t=a[4],`${o}realms&search_name=${t}`),a[4]),a.slice(1).join("")}function k(e){const t=a({innerHTML:A(e)})
e.replaceChild(t,e.firstChild)}const B=(e,a)=>`&nbsp;<a href="${e}&page=2">View ${a} Page 2</a>`
const L=e=>h("PvP Ladder",e.children[1]),v=e=>g(u(e.children[2]))
function E(){p("pageTwoLinks")&&function(){const e=c(`#pCC a[href="${f}"]`)
if(!e)return
b(e,B(f,"Updates"))
const a=c(`#pCC a[href="${m}"]`)
b(a,B(m,"News"))}(),p("addUfsgLinks")&&(s('.news_body img[src*="/creatures/"]').forEach(w),t("news_body_tavern",n).filter(y).forEach(k)),p("trackLadderReset")&&function(){const e=t("news_head_tavern",n).filter(L).map(v),a=Math.max.apply(null,e)
a>p(l)&&d(l,a)}()}export default E
//# sourceMappingURL=news-d16d2da0.js.map
