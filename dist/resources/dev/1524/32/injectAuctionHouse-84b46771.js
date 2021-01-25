import{a as t}from"./allthen-975bc488.js"
import{x as e,p as a,y as n,a9 as s,o as i,H as o,R as r,al as c,u as l}from"./calfSystem-19a5d332.js"
import{c as m}from"./createSpan-58506d04.js"
import{d}from"./doStatTotal-6503c402.js"
import{g as f}from"./getArrayByClassName-8cefca3b.js"
import{i as p}from"./insertElementAfterBegin-635560b5.js"
import"./all-31b59575.js"
import"./insertElementBefore-aa28f497.js"
function u(){r(n("refresh"))}function h(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function g(){const e=f("auctionCancel",n("resultRows"))
if(0===e.length)return
const a=e.map(h)
t(a,u)}function j(){!e()&&a&&(!function(){const t=m({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),s(e,"]"),p(e,t),s(e,"["),i(t,g)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),d())}export default j
//# sourceMappingURL=injectAuctionHouse-84b46771.js.map
