import{w as e,p as t,x as n,a5 as a,o as s,D as i,P as r,aG as o,t as c}from"./calfSystem-1c103624.js"
import"./insertElementBefore-0e09c5df.js"
import{i as l}from"./insertElementAfterBegin-ed14bd7f.js"
import{c as d}from"./createSpan-475e9683.js"
import"./all-bf5942c7.js"
import{a as f}from"./allthen-a3d432e8.js"
import{g as m}from"./getArrayByClassName-5fd609f9.js"
function p(){r(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
f(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-e83c3eaa.js.map
