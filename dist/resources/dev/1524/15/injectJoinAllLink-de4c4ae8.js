import{g as a,x as i,A as n,D as t,b5 as o,b6 as s}from"./calfSystem-ee582533.js"
import{i as e}from"./insertHtmlAfterEnd-4dbaaf09.js"
function c(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
e(a,`<li class="notification">${i}</li>`)}export default function(){a("li",i("pCL")).forEach(c)}
//# sourceMappingURL=injectJoinAllLink-de4c4ae8.js.map
