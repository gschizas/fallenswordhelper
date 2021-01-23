import{r as e,x as t,H as o,i as s,p as n,o as i,y as a,l as r,Z as c,t as d,au as m,av as p}from"./calfSystem-393ab895.js"
import{p as g}from"./perfFilter-c8f38b54.js"
import{s as l}from"./simpleCheckbox-649df0f1.js"
import"./getArrayByClassName-1bdcec20.js"
import"./getInventoryById-ed6dc7be.js"
import"./getInventory-55e989a6.js"
import"./guildStore-e2a17b6e.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./isChecked-1c18cd61.js"
let f
const b=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function x(e){0!==e.error?w(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${m+p}breakdown&m=1`}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(x)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function v(){f=!f,c("disableBreakdownPrompts",f)}function B(){t()||(g("composing"),f=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${l("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),v))}export default B
//# sourceMappingURL=breakdown-d007b844.js.map
