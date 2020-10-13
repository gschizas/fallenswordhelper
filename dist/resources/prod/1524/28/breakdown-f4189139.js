import{r as e,x as o,H as t,i as s,p as n,o as a,y as i,l as r,Y as c,t as d,by as m,ao as p}from"./calfSystem-a5da5210.js"
import"./isChecked-12c32ad5.js"
import{s as g}from"./simpleCheckbox-b35743b7.js"
import"./indexAjaxJson-e64296df.js"
import"./cmdExport-7f82d72f.js"
import"./getInventory-6f87e502.js"
import"./getInventoryById-6fa4cb8c.js"
import"./getArrayByClassName-6e0bb75e.js"
import{p as l}from"./perfFilter-0f21dca6.js"
let f
const b=[]
function u(e){e.hide()}function y(e,o){e.animate({height:0},500,o)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(y,e,d(u,e)))}function w(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(h,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(b).then(x)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?j():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=b.indexOf(o);-1===t?b.push(o):b.splice(t,1)}function B(){f=!f,c("disableBreakdownPrompts",f)}function P(){o()||(l("composing"),f=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-f4189139.js.map
