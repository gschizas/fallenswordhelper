import{a as t}from"./allthen-3a9178b8.js"
import{x as e,p as a,y as n,a8 as s,o as i,H as o,Q as r,ak as c,u as l}from"./calfSystem-393ab895.js"
import{c as d}from"./createSpan-f9f70e5d.js"
import{d as f}from"./doStatTotal-2c67bbbb.js"
import{g as m}from"./getArrayByClassName-1bdcec20.js"
import{i as p}from"./insertElementAfterBegin-b64fd488.js"
import"./all-6dfbd6b8.js"
import"./insertElementBefore-43970b1f.js"
function u(){r(n("refresh"))}function b(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,l({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const a=e.map(b)
t(a,u)}function g(){!e()&&a&&(!function(){const t=d({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),s(e,"]"),p(e,t),s(e,"["),i(t,h)}(),o("autoFillMinBidPrice")&&r(n("auto-fill")),f())}export default g
//# sourceMappingURL=injectAuctionHouse-d81586d7.js.map
