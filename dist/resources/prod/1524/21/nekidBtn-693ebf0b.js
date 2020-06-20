import{bf as t,y as e,m as n,h as o,o as s,U as i,g as r,t as a,A as f}from"./calfSystem-2741d97b.js"
import{i as c}from"./insertTextBeforeEnd-c1340608.js"
import{c as l}from"./createButton-3011f1ad.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(a(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
r("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(r,i)}
//# sourceMappingURL=nekidBtn-693ebf0b.js.map
