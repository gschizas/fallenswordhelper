import{w as e,p as t,x as n,a5 as a,o as s,D as i,O as r,aB as c,t as o}from"./calfSystem-be09bdff.js"
import"./insertElementBefore-1fd7bda7.js"
import{i as l}from"./insertElementAfterBegin-c450d776.js"
import{c as d}from"./createSpan-1d780ca0.js"
import"./all-e1939fb2.js"
import{a as f}from"./allthen-47fe90e5.js"
import{g as m}from"./getArrayByClassName-dcccee52.js"
function p(){r(n("refresh"))}function u(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${c}ui/misc/spinner.gif" width="14" height="14">`,o({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=m("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(u)
f(t,p)}export default function(){!e()&&t&&(!function(){const e=d({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),a(t,"]"),l(t,e),a(t,"["),s(e,h)}(),i("autoFillMinBidPrice")&&(n("auto-fill").checked=!0))}
//# sourceMappingURL=injectAuctionHouse-26a23ad7.js.map
