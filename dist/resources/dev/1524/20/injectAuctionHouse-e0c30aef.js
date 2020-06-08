import{x as e,p as t,y as a,a5 as n,o as i,G as s,R as r,aH as o,u as c}from"./calfSystem-a2862afc.js"
import"./insertElementBefore-372e5ad6.js"
import{i as l}from"./insertElementAfterBegin-195a0721.js"
import{c as m}from"./createSpan-b8f0a31d.js"
import{g as d}from"./getArrayByClassName-c1e64010.js"
import"./all-6bd68ac2.js"
import{a as f}from"./allthen-41484118.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-e0c30aef.js.map
