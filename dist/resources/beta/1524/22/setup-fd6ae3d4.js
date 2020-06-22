import{x as t,d as o,t as n,g as e,a$ as i,u as a,a_ as p}from"./calfSystem-1b876afa.js"
import"./all-8cfc3076.js"
import{a as c}from"./allthen-d1515ca1.js"
import{m as s}from"./assets-669be9a7.js"
const u=[]
let l,r
function d(t,o){return a({cmd:"arena",subcmd:"dopickmove",move_id:t,slot_id:o})}function f(t){return t.value}function m(t,o){if(t!==u[o])return l.eq(o).attr({src:i,width:"25",height:"25"}),d("x",o)}function v(t,o){if("x"!==t&&t!==u[o])return d(t,o)}function h(){window.location=p+"setup"}function g(t){const o=t.map(v)
c(o,h)}function k(){const t=e("select",r).map(f),o=t.map(m)
c(o,n(g,t))}function x(t,o,n){const e=function(t){const o=$(t).attr("src").match(s)
return o?o[1]:"x"}(n)
u.push(e)
const i=$('\n<td colspan=3 style="padding-top: 2px;padding-bottom: 2px;">\n<select style="max-width: 50px;">\n<option value="x">Basic Attack</option>\n<option value="0">Block</option>\n<option value="1">Counter Attack</option>\n<option value="2">Critical Hit</option>\n<option value="3">Defend</option>\n<option value="4">Deflect</option>\n<option value="5">Dodge</option>\n<option value="6">Lunge</option>\n<option value="7">Power Attack</option>\n<option value="8">Spin Attack</option>\n<option value="9">Piercing Strike</option>\n<option value="10">Crush</option>\n<option value="11">Weaken</option>\n<option value="12">Ice Shard</option>\n<option value="13">Fire Blast</option>\n<option value="14">Poison</option>\n</select></td>')
$(`option[value=${e}]`,i).prop("selected",!0),t.append(i)}function b(t){$(t.target).off(),l=$('#pCC a[href*="=pickmove&"] img')
const e=l.eq(0).closest(o).parent().closest(o)
!function(t){const o=$("<tr/>")
r=o.get(0),o.append("<td/>"),l.each(n(x,o)),t.append(o)}(e),$('img[src*="arena/bar_spacer."]',e).attr({width:"15",height:"50"}),function(t){const o=$('<tr><td colspan=32 align=center style="padding-top: 2px;padding-bottom: 2px;"><input class="custombutton" value="Update" type="button"></td></tr>')
$("input",o).on("click",k),t.append(o)}(e)}export default function(){if(t())return
const o=$('#pCC b:contains("Setup Combat Moves")')
1===o.length&&(o.addClass("fshLink fshGreen"),o.on("click",b))}
//# sourceMappingURL=setup-fd6ae3d4.js.map
