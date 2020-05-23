import{z as t,p as e,Z as a,A as n,U as s,b8 as i,m as c,o,G as l,al as r,aI as d,w as u}from"./calfSystem-70b0df7f.js"
import"./all-d4a4126a.js"
import{a as f}from"./allthen-82910129.js"
function m(){a(n("refresh"))}function p(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function h(){const t=r("auctionCancel",n("resultRows"))
if(0===t.length)return
const e=t.map(p)
f(e,m)}export default function(){!t()&&e&&(!function(){const t=s({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),i(e,"]"),c(e,t),i(e,"["),o(t,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-f98c7370.js.map
