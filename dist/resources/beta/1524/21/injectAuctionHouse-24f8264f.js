import{x as e,p as t,y as n,a7 as a,o as i,G as s,Q as r,aD as o,u as c}from"./calfSystem-89b939c8.js"
import"./insertElementBefore-08d48547.js"
import{i as l}from"./insertElementAfterBegin-402b077c.js"
import{c as d}from"./createSpan-716fba1d.js"
import{g as m}from"./getArrayByClassName-ed630846.js"
import"./all-ca702d79.js"
import{a as f}from"./allthen-b213c39d.js"
function u(){r(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,u)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),i(e,h)}(),s("autoFillMinBidPrice")&&n("auto-fill").click())}
//# sourceMappingURL=injectAuctionHouse-24f8264f.js.map
