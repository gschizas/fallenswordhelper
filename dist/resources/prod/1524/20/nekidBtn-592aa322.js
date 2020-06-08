import{bf as t,y as e,l as n,f as o,o as s,U as i,g as r,t as a,A as f}from"./calfSystem-03970067.js"
import{i as c}from"./insertTextBeforeEnd-2cd4288e.js"
import{c as l}from"./createButton-082f5876.js"
function u(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let m
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&u(e).then(a(d,t))}function h(){i("profile","nekidBtn")
const t=m.nextElementSibling
r("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
m=e("profileCombatSetDiv")
const i=m.parentNode.nextElementSibling,r=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(r,i)}
//# sourceMappingURL=nekidBtn-592aa322.js.map
