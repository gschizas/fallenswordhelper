import{w as e,p as t,x as a,a5 as n,o as s,D as i,O as r,aB as o,t as c}from"./calfSystem-57340987.js"
import"./insertElementBefore-69bb0e1f.js"
import{i as l}from"./insertElementAfterBegin-d5ad26ea.js"
import{c as d}from"./createSpan-14d38ba8.js"
import"./all-82b4870b.js"
import{a as m}from"./allthen-298d46c2.js"
import{g as f}from"./getArrayByClassName-26f7f305.js"
function p(){r(a("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=f("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(a("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-0c2004a9.js.map
