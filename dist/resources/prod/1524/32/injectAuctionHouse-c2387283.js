import{a as t}from"./allthen-975bc488.js"
import{x as e,p as a,y as n,a8 as s,o as i,H as o,Q as r,ai as c,u as l}from"./calfSystem-45544049.js"
import{c as m}from"./createSpan-4c34b034.js"
import{d}from"./doStatTotal-c1750c57.js"
import{g as f}from"./getArrayByClassName-b62a000f.js"
import{i as p}from"./insertElementAfterBegin-ddd00fbd.js"
import"./all-31b59575.js"
import"./insertElementBefore-aa28f497.js"
function u(){r(n("refresh"))}function h(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function g(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const a=e.map(h)
t(a,u)}function j(){!e()&&a&&(!function(){const t=m({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),s(e,"]"),p(e,t),s(e,"["),i(t,g)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),d())}export default j
//# sourceMappingURL=injectAuctionHouse-c2387283.js.map
