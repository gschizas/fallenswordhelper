import{z as e,C as a,ab as t}from"./calfSystem-07c25a1c.js"
import{g as m}from"./groupViewStats-83bbf950.js"
import{g as n}from"./getMercStats-9c6019d5.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-f68aeef8.js.map
