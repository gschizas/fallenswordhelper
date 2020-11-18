import{r as e,x as o,H as t,i as s,p as n,o as i,y as a,l as r,Y as c,t as d,bD as m,ao as p}from"./calfSystem-f9a27018.js"
import"./isChecked-92297855.js"
import{s as g}from"./simpleCheckbox-7d7105d2.js"
import"./indexAjaxJson-e32f2264.js"
import"./cmdExport-c40c0dde.js"
import"./getInventory-2a2168d8.js"
import"./getInventoryById-e5cdfc29.js"
import"./getArrayByClassName-b5f38e7c.js"
import{p as l}from"./perfFilter-82006e66.js"
let f
const u=[]
function b(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(b,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(u).then(y)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==u.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=u.indexOf(o);-1===t?u.push(o):u.splice(t,1)}function B(){f=!f,c("disableBreakdownPrompts",f)}function P(){o()||(l("composing"),f=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-21bc012e.js.map
