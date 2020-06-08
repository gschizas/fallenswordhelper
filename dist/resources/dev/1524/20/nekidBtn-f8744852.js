import{b0 as t,y as e,l as n,f as o,o as s,V as i,g as a,t as r,A as f}from"./calfSystem-a2862afc.js"
import{i as c}from"./insertTextBeforeEnd-45ef154f.js"
import{c as l}from"./createButton-62b6c44a.js"
function u(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let m
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&u(e).then(r(d,t))}function h(){i("profile","nekidBtn")
const t=m.nextElementSibling
a("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
m=e("profileCombatSetDiv")
const i=m.parentNode.nextElementSibling,a=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(a,i)}
//# sourceMappingURL=nekidBtn-f8744852.js.map
