import{r as e,x as o,G as t,i as s,p as n,o as a,y as i,l as r,Y as c,t as d,bC as m,ao as p}from"./calfSystem-2741d97b.js"
import"./isChecked-c01a2e4d.js"
import{s as g}from"./simpleCheckbox-7770c555.js"
import"./indexAjaxJson-2aa42945.js"
import"./cmdExport-b57576c3.js"
import"./getInventory-a458051a.js"
import"./getInventoryById-e8d5c395.js"
import"./getArrayByClassName-3946388a.js"
import{p as l}from"./perfFilter-5a7e409a.js"
let b
const u=[]
function f(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(f,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(u).then(y)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==u.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=u.indexOf(o);-1===t?u.push(o):u.splice(t,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}export default function(){o()||(l("composing"),b=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-0020ec37.js.map
