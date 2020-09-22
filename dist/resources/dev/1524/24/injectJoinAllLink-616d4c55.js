import{g as a,y as i,B as n,H as t,b_ as o,b$ as s}from"./calfSystem-38898f3e.js"
import{i as e}from"./insertHtmlAfterEnd-8b82fe39.js"
function c(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
e(a,`<li class="notification">${i}</li>`)}function l(){a("li",i("pCL")).forEach(c)}export default l
//# sourceMappingURL=injectJoinAllLink-616d4c55.js.map
