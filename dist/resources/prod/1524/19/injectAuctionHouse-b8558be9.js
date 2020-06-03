import{w as e,p as t,x as n,a5 as a,o as s,D as i,O as c,aB as r,t as o}from"./calfSystem-6fc0cc1b.js"
import"./insertElementBefore-6f4b88f2.js"
import{i as l}from"./insertElementAfterBegin-b4303728.js"
import{c as f}from"./createSpan-12ee4f1a.js"
import"./all-31f0cef5.js"
import{a as m}from"./allthen-14038593.js"
import{g as d}from"./getArrayByClassName-50cbc2c4.js"
function p(){c(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${r}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-b8558be9.js.map
