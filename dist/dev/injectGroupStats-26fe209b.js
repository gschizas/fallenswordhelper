import{z as e,C as a,ac as t}from"./calfSystem-8dc0fa4b.js"
import{g as m}from"./groupViewStats-ed114cc2.js"
import{g as n}from"./getMercStats-a2ebdb2c.js"
let s
function c(e,m,n){a(`<span class="fshBlue">${t(m)}</span> ( ${t(m-n)} )`,e)}function o(e){c(s.attackElement,s.attack,e.attack),c(s.defenseElement,s.defense,e.defense),c(s.armorElement,s.armor,e.armor),c(s.damageElement,s.damage,e.damage),c(s.hpElement,s.hp,e.hp)}export default function(){e()||(s=m(document),s.attackElement&&n().then(o))}
//# sourceMappingURL=injectGroupStats-26fe209b.js.map
