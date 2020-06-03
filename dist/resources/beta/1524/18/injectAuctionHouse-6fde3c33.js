import{w as e,p as t,x as a,a5 as n,o as s,D as i,O as r,aB as c,t as o}from"./calfSystem-4197cc22.js"
import"./insertElementBefore-fe70cd72.js"
import{i as l}from"./insertElementAfterBegin-aa3c6e65.js"
import{c as f}from"./createSpan-537a8929.js"
import"./all-5f4a0555.js"
import{a as m}from"./allthen-634cf4ca.js"
import{g as d}from"./getArrayByClassName-22badefd.js"
function p(){r(a("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=d("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(u)
m(t,p)}export default function(){!e()&&t&&(!function(){const e=f({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),n(t,"]"),l(t,e),n(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(a("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-6fde3c33.js.map
