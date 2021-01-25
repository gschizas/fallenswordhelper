import{a as e}from"./allthen-975bc488.js"
import{x as t,p as a,y as n,a8 as s,o as i,H as o,Q as r,ak as c,u as l}from"./calfSystem-26bcf570.js"
import{c as m}from"./createSpan-d92b45d9.js"
import{d}from"./doStatTotal-e2c231bd.js"
import{g as f}from"./getArrayByClassName-3eee0c79.js"
import{i as p}from"./insertElementAfterBegin-3ba6aba1.js"
import"./all-31b59575.js"
import"./insertElementBefore-aa28f497.js"
function u(){r(n("refresh"))}function h(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function b(){const t=f("auctionCancel",n("resultRows"))
if(0===t.length)return
const a=t.map(h)
e(a,u)}function g(){!t()&&a&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),s(t,"]"),p(t,e),s(t,"["),i(e,b)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),d())}export default g
//# sourceMappingURL=injectAuctionHouse-c06e9da7.js.map
