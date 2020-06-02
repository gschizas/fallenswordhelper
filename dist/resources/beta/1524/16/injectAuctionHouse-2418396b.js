import{w as e,p as t,x as n,a5 as a,o as s,D as i,O as r,aB as o,t as c}from"./calfSystem-9554b525.js"
import"./insertElementBefore-5f238f78.js"
import{i as l}from"./insertElementAfterBegin-ecab1c25.js"
import{c as m}from"./createSpan-40c5f348.js"
import"./all-e75535ec.js"
import{a as f}from"./allthen-04728b30.js"
import{g as d}from"./getArrayByClassName-61d73ad7.js"
function p(){r(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${o}ui/misc/spinner.gif" width="14" height="14">`,c({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
f(t,p)}export default function(){!e()&&t&&(!function(){const e=m({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-2418396b.js.map
