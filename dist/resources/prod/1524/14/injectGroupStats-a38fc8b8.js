import{y as e,B as a,aa as t}from"./calfSystem-d587d232.js"
import{g as m}from"./groupViewStats-e7b3f27d.js"
import{g as n}from"./getMercStats-df0d69a4.js"
let s
function o(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function r(e){o(s.attackElement,s.attack,e.attack),o(s.defenseElement,s.defense,e.defense),o(s.armorElement,s.armor,e.armor),o(s.damageElement,s.damage,e.damage),o(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(r))}
//# sourceMappingURL=injectGroupStats-a38fc8b8.js.map
