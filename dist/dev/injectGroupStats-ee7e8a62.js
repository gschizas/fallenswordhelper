import{z as e,C as t,ac as a}from"./calfSystem-fd021443.js"
import{g as m}from"./groupViewStats-559d39f1.js"
import{g as n}from"./getMercStats-f11fc3b2.js"
let s
function f(e,m,n){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-n)} )`,e)}function o(e){f(s.attackElement,s.attack,e.attack),f(s.defenseElement,s.defense,e.defense),f(s.armorElement,s.armor,e.armor),f(s.damageElement,s.damage,e.damage),f(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-ee7e8a62.js.map
