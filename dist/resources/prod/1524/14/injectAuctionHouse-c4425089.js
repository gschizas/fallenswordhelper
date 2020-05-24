import{y as t,p as e,X as a,z as n,S as s,bi as i,l as c,o,F as l,aj as r,aE as d,v as u}from"./calfSystem-d587d232.js"
import"./all-39781966.js"
import{a as f}from"./allthen-ba816a7b.js"
function m(){a(n("refresh"))}function p(t){const e=t.parentNode.parentNode.children[0].children[0]
return t.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(e.dataset.tipped)[1]})}function h(){const t=r("auctionCancel",n("resultRows"))
if(0===t.length)return
const e=t.map(p)
f(e,m)}export default function(){!t()&&e&&(!function(){const t=s({className:"smallLink",textContent:"Cancel All"}),e=n("fill").parentNode.parentNode.nextElementSibling.children[0]
e.classList.add("fshCenter"),i(e,"]"),c(e,t),i(e,"["),o(t,h)}(),l("autoFillMinBidPrice")&&(n("auto-fill").checked=!0),a(n("sort0")))}
//# sourceMappingURL=injectAuctionHouse-c4425089.js.map
