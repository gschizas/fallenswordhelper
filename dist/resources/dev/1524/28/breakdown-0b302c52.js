import{r as e,x as t,H as o,i as s,p as a,o as n,y as i,l as r,Z as d,t as c,bF as m,as as p}from"./calfSystem-b136673a.js"
import"./isChecked-12c32ad5.js"
import{s as g}from"./simpleCheckbox-b7b2f875.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./cmdExport-bd5eafa5.js"
import"./guildStore-a5ab07ad.js"
import"./getInventory-3e718e5a.js"
import"./getInventoryById-bc1a2a8f.js"
import"./getArrayByClassName-d5f86271.js"
import{p as l}from"./perfFilter-d7567671.js"
let b
const f=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(x)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function B(){b=!b,d("disableBreakdownPrompts",b)}function P(){t()||(l("composing"),b=o("disableBreakdownPrompts"),s(a,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),n(i("breakdown-selected-items").parentNode,k,!0),n(i("composing-items"),C),n(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-0b302c52.js.map
