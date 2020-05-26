import{w as e,p as t,N as a,x as n,aQ as s,o as i,D as r,at as o,t as c}from"./calfSystem-1262535f.js"
import"./insertElementBefore-dcdbe7ae.js"
import{i as l}from"./insertElementAfterBegin-eeb77058.js"
import{c as m}from"./createSpan-aa5e4be8.js"
import"./all-c00b9c25.js"
import{a as d}from"./allthen-2a364862.js"
import{g as f}from"./getArrayByClassName-486c0115.js"
function p(){a(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
d(t,p)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),s(t,"]"),l(t,e),s(t,"["),i(e,h)}(),r("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-fab2affb.js.map
