import{be as e,y as t,m as n,h as o,o as s,U as i,g as r,t as a,A as f}from"./calfSystem-ebf4b17d.js"
import{i as c}from"./insertTextBeforeEnd-008f8df5.js"
import{c as l}from"./createButton-b3c6a5bd.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(e,t){t.s&&f("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(a(d,e))}function b(){i("profile","nekidBtn")
const e=u.nextElementSibling
r("a",e).forEach(p)}function h(){const e=t("profileRightColumn")
u=t("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(e,"[ "),o(e,t),c(e," ]"),s(t,b),e}()
e.replaceChild(r,i)}export default h
//# sourceMappingURL=nekidBtn-db7eb883.js.map
