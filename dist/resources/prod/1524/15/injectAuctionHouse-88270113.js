import{w as e,p as t,N as a,x as n,aQ as s,o as i,D as r,at as o,t as c}from"./calfSystem-740ec4d2.js"
import"./insertElementBefore-d3961941.js"
import{i as l}from"./insertElementAfterBegin-08e27acb.js"
import{c as d}from"./createSpan-b29fd959.js"
import"./all-30e677b0.js"
import{a as m}from"./allthen-0a5c5fb9.js"
import{g as f}from"./getArrayByClassName-c703ad24.js"
function p(){a(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),s(t,"]"),l(t,e),s(t,"["),i(e,h)}(),r("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-88270113.js.map
