import{x as e,p as t,y as a,a7 as n,o as i,G as s,Q as r,aD as c,u as o}from"./calfSystem-d04e4be4.js"
import"./insertElementBefore-cc030078.js"
import{i as l}from"./insertElementAfterBegin-afd674a5.js"
import{c as d}from"./createSpan-ae8c4e9e.js"
import{g as m}from"./getArrayByClassName-a2df28cd.js"
import"./all-f846cd86.js"
import{a as f}from"./allthen-086eab8e.js"
function u(){r(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&a("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-80a8522f.js.map
