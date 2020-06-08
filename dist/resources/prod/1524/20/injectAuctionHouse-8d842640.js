import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-03970067.js"
import"./insertElementBefore-c9a36777.js"
import{i as l}from"./insertElementAfterBegin-6c7a660f.js"
import{c as m}from"./createSpan-3c9a32c0.js"
import{g as f}from"./getArrayByClassName-24024eda.js"
import"./all-34a43a38.js"
import{a as d}from"./allthen-0b78a490.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
d(t,u)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-8d842640.js.map
