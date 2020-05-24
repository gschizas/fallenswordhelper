import{y as e,p as a,Y as t,z as n,T as s,b7 as i,l as c,o,F as l,ak as r,aH as d,v as u}from"./calfSystem-d96a3efd.js"
import"./all-a5e007ad.js"
import{a as f}from"./allthen-182523ad.js"
function m(){t(n("refresh"))}function p(e){const a=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(a.dataset.tipped)[1]})}function h(){const e=r("auctionCancel",n("resultRows"))
if(0===e.length)return
const a=e.map(p)
f(a,m)}export default function(){!e()&&a&&(!function(){const e=s({className:"smallLink",textContent:"Cancel All"}),a=n("fill").parentNode.parentNode.nextElementSibling.children[0]
a.classList.add("fshCenter"),i(a,"]"),c(a,e),i(a,"["),o(e,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),t(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-74042b51.js.map
