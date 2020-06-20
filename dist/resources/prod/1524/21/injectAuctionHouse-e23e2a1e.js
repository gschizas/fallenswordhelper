import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as c,u as o}from"./calfSystem-2741d97b.js"
import"./insertElementBefore-1ac41a54.js"
import{i as l}from"./insertElementAfterBegin-83c570c6.js"
import{c as m}from"./createSpan-b0f81047.js"
import{g as d}from"./getArrayByClassName-3946388a.js"
import"./all-75af160a.js"
import{a as f}from"./allthen-dcd66ca6.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-e23e2a1e.js.map
