import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-05554bae.js"
import"./insertElementBefore-2ba0b318.js"
import{i as l}from"./insertElementAfterBegin-1acc7ec9.js"
import{c as m}from"./createSpan-472d43ae.js"
import{g as f}from"./getArrayByClassName-4e6df9b6.js"
import"./all-e13706ab.js"
import{a as d}from"./allthen-feed7e5f.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-015ac7cb.js.map
