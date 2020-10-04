import{x as e,p as t,y as a,a6 as n,o as i,H as s,Q as r,aI as c,u as o}from"./calfSystem-ec5e5725.js"
import"./insertElementBefore-543d9ef0.js"
import{i as l}from"./insertElementAfterBegin-21a4a979.js"
import{c as m}from"./createSpan-a26e8f7c.js"
import{g as d}from"./getArrayByClassName-bb31bc41.js"
import"./all-e81516b4.js"
import{a as f}from"./allthen-dd6cac31.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}function g(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}export default g
//# sourceMappingURL=injectAuctionHouse-132258db.js.map
