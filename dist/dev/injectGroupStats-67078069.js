import{z as e,C as t,ac as a}from"./calfSystem-94018cd0.js"
import{g as m}from"./groupViewStats-e145c660.js"
import{g as n}from"./getMercStats-0ebd4f19.js"
let s
function o(e,m,n){t(`<span class="fshBlue">${a(m)}</span> ( ${a(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-67078069.js.map
