import{r as e,x as o,G as t,i as s,p as n,o as a,y as i,k as r,Y as d,t as c,bB as m,ao as p}from"./calfSystem-03970067.js"
import"./isChecked-02800593.js"
import{s as g}from"./simpleCheckbox-6af8c076.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import"./getInventory-f35b83ee.js"
import"./getInventoryById-4e448ba1.js"
import"./getArrayByClassName-24024eda.js"
import{p as l}from"./perfFilter-21f49fba.js"
let f
const b=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function k(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function w(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(k,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(b).then(x)}function j(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function B(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=b.indexOf(o);-1===t?b.push(o):b.splice(t,1)}function C(){f=!f,d("disableBreakdownPrompts",f)}export default function(){o()||(l("composing"),f=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,j,!0),a(i("composing-items"),B),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-8254aa39.js.map
