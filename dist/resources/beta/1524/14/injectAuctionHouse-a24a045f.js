import{y as e,p as t,X as n,z as a,S as s,bk as i,l as c,o,F as l,aj as r,aE as d,v as u}from"./calfSystem-371c414c.js"
import"./all-93023d41.js"
import{a as f}from"./allthen-691ee788.js"
function m(){n(a("refresh"))}function p(e){const t=e.parentNode.parentNode.children[0].children[0]
return e.outerHTML=`<img src="${d}ui/misc/spinner.gif" width="14" height="14">`,u({cmd:"auctionhouse",subcmd:"cancel",auction_id:/inv_id=(\d+)/.exec(t.dataset.tipped)[1]})}function h(){const e=r("auctionCancel",a("resultRows"))
if(0===e.length)return
const t=e.map(p)
f(t,m)}export default function(){!e()&&t&&(!function(){const e=s({className:"smallLink",textContent:"Cancel All"}),t=a("fill").parentNode.parentNode.nextElementSibling.children[0]
t.classList.add("fshCenter"),i(t,"]"),c(t,e),i(t,"["),o(e,h)}(),l("autoFillMinBidPrice")&&(a("auto-fill").checked=!0),n(a("sort0")))}
//# sourceMappingURL=injectAuctionHouse-a24a045f.js.map
