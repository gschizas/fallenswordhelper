import{x as e,p as t,y as a,a5 as n,o as i,G as s,R as r,aH as o,u as c}from"./calfSystem-9c7241dc.js"
import"./insertElementBefore-686b8559.js"
import{i as l}from"./insertElementAfterBegin-2637f36b.js"
import{c as d}from"./createSpan-dd12772b.js"
import{g as m}from"./getArrayByClassName-5afbd411.js"
import"./all-fed72729.js"
import{a as f}from"./allthen-c94a6cae.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-e85a70be.js.map
