import{z as e,p as t,Z as a,A as n,U as s,b8 as i,m as c,o,G as l,al as r,aI as d,w as u}from"./calfSystem-8dc0fa4b.js"
import"./all-905003de.js"
import{a as f}from"./allthen-88a2d4fe.js"
function m(){a(n("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=r("auctionCancel",n("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,m)}export default function(){!e()&&t&&(!function(){const e=s({className:"smallLink",textContent:"Cancel All"}),t=n("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),i(t,"]"),c(t,e),i(t,"["),o(e,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-5e041e63.js.map
