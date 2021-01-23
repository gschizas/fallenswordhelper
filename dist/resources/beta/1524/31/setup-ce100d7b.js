import{a as t}from"./allthen-3a9178b8.js"
import{x as o,d as n,t as e,g as i,al as a,u as p,ak as c}from"./calfSystem-47fc08ae.js"
import{m as s}from"./assets-ad350aab.js"
import"./all-6dfbd6b8.js"
const u=[]
let l,r
function d(t,o){return p({cmd:"arena",subcmd:"dopickmove",move_id:t,slot_id:o})}function f(t){return t.value}function m(t,o){if(t!==u[o])return l.eq(o).attr({src:a,width:"25",height:"25"}),d("x",o)}function v(t,o){if("x"!==t&&t!==u[o])return d(t,o)}function h(){window.location=`${c}setup`}function g(o){const n=o.map(v)
t(n,h)}function k(){const o=i("select",r).map(f),n=o.map(m)
t(n,e(g,o))}function b(t,o,n){const e=function(t){const o=$(t).attr("src").match(s)
return o?o[1]:"x"}(n)
u.push(e)
const i=$('\n<td colspan=3 style="padding-top: 2px;padding-bottom: 2px;">\n<select style="max-width: 50px;">\n<option value="x">Basic Attack</option>\n<option value="0">Block</option>\n<option value="1">Counter Attack</option>\n<option value="2">Critical Hit</option>\n<option value="3">Defend</option>\n<option value="4">Deflect</option>\n<option value="5">Dodge</option>\n<option value="6">Lunge</option>\n<option value="7">Power Attack</option>\n<option value="8">Spin Attack</option>\n<option value="9">Piercing Strike</option>\n<option value="10">Crush</option>\n<option value="11">Weaken</option>\n<option value="12">Ice Shard</option>\n<option value="13">Fire Blast</option>\n<option value="14">Poison</option>\n</select></td>')
$(`option[value=${e}]`,i).prop("selected",!0),t.append(i)}function x(t){$(t.target).off(),l=$('#pCC a[href*="=pickmove&"] img')
const o=l.eq(0).closest(n).parent().closest(n)
!function(t){const o=$("<tr/>")
r=o.get(0),o.append("<td/>"),l.each(e(b,o)),t.append(o)}(o),$('img[src*="arena/bar_spacer."]',o).attr({width:"15",height:"50"}),function(t){const o=$('<tr><td colspan=32 align=center style="padding-top: 2px;padding-bottom: 2px;"><input class="custombutton" value="Update" type="button"></td></tr>')
$("input",o).on("click",k),t.append(o)}(o)}function C(){if(o())return
const t=$('#pCC b:contains("Setup Combat Moves")')
1===t.length&&(t.addClass("fshLink fshGreen"),t.on("click",x))}export default C
//# sourceMappingURL=setup-ce100d7b.js.map
