import{r as e,x as o,H as t,i as s,p as n,o as a,y as i,l as r,Y as d,t as c,bH as m,ao as p}from"./calfSystem-019a589c.js"
import"./isChecked-2d5427f6.js"
import{s as g}from"./simpleCheckbox-863a1324.js"
import"./indexAjaxJson-424248bd.js"
import"./cmdExport-d38d7643.js"
import"./getInventory-42766a10.js"
import"./getInventoryById-4cb1a5ad.js"
import"./getArrayByClassName-6c7f9574.js"
import{p as l}from"./perfFilter-60307b4d.js"
let b
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(y)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){b=!b,d("disableBreakdownPrompts",b)}function P(){o()||(l("composing"),b=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-084f1d3d.js.map
