import{z as e,C as a,ab as t}from"./calfSystem-c91e004c.js"
import{g as m}from"./groupViewStats-cb24f5a5.js"
import{g as n}from"./getMercStats-b22771a3.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-6f0ee87a.js.map
