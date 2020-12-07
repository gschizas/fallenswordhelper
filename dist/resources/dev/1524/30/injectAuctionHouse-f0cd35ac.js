import{x as e,p as t,y as n,a5 as a,o as i,H as s,Q as r,aH as o,u as c}from"./calfSystem-54df10e3.js"
import"./insertElementBefore-1b96a575.js"
import{i as l}from"./insertElementAfterBegin-3912763d.js"
import{c as m}from"./createSpan-f01d3abc.js"
import{g as d}from"./getArrayByClassName-1306b7b7.js"
import"./all-36f83e81.js"
import{a as f}from"./allthen-7d061027.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}function g(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-f0cd35ac.js.map
