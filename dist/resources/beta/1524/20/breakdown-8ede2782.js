import{r as e,x as o,G as t,i as s,p as n,o as i,y as a,k as r,Y as c,t as d,bG as m,ao as p}from"./calfSystem-05554bae.js"
import"./isChecked-57b4060d.js"
import{s as g}from"./simpleCheckbox-1bbe1878.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./getInventory-dd72b860.js"
import"./getInventoryById-d10cf296.js"
import"./getArrayByClassName-4e6df9b6.js"
import{p as b}from"./perfFilter-180e82c5.js"
let l
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function k(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function w(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(k,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(x)}function j(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){l=!l,c("disableBreakdownPrompts",l)}export default function(){o()||(b("composing"),l=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,j,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-8ede2782.js.map
