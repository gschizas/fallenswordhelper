import{z as e,C as a,ab as t}from"./calfSystem-d06402b1.js"
import{g as m}from"./groupViewStats-fef195b2.js"
import{g as n}from"./getMercStats-00f959af.js"
let s
function f(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function o(e){f(s.attackElement,s.attack,e.attack),f(s.defenseElement,s.defense,e.defense),f(s.armorElement,s.armor,e.armor),f(s.damageElement,s.damage,e.damage),f(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-56088928.js.map
