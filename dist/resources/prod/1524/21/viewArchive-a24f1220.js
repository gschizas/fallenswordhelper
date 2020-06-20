import{G as e,a3 as s,b as a,p as r,d as t,b3 as c,B as o,Y as i}from"./calfSystem-2741d97b.js"
import"./isChecked-c01a2e4d.js"
import{s as l}from"./simpleCheckbox-7770c555.js"
import"./hideElement-6a4f37a8.js"
import{i as n}from"./insertHtmlAfterEnd-65ae14da.js"
import{p as m}from"./parseDateAsTimestamp-f8f97be9.js"
import"./toggleForce-69a79716.js"
import{c as d}from"./collapse-7f2cce4c.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const a=m(o(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-a24f1220.js.map
