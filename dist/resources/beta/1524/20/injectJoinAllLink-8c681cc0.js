import{g as a,y as i,B as n,G as t,bX as o,bY as s}from"./calfSystem-05554bae.js"
import{i as e}from"./insertHtmlAfterEnd-1461aee3.js"
function c(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
e(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(c)}
//# sourceMappingURL=injectJoinAllLink-8c681cc0.js.map
