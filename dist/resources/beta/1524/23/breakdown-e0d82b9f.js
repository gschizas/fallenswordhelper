import{r as e,x as o,G as t,i as s,p as n,o as i,y as a,l as r,Y as c,t as d,bH as m,ao as p}from"./calfSystem-34fcd691.js"
import"./isChecked-8ee9db43.js"
import{s as g}from"./simpleCheckbox-86567985.js"
import"./indexAjaxJson-951ebca2.js"
import"./cmdExport-963c885b.js"
import"./getInventory-284d6084.js"
import"./getInventoryById-60064bf6.js"
import"./getArrayByClassName-674a825f.js"
import{p as l}from"./perfFilter-84404503.js"
let b
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(y)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}export default function(){o()||(l("composing"),b=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-e0d82b9f.js.map
