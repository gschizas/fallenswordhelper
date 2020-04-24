import{z as e,C as a,ac as t}from"./calfSystem-9b1fa4ca.js"
import{g as m}from"./groupViewStats-8eb7ee83.js"
import{g as n}from"./getMercStats-7682d4ab.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-6c084462.js.map
