import{G as e,A as t,e as s,o,f as i,l as a,h as r,i as n,p as l,C as u,a4 as c}from"./calfSystem-72fdbe97.js"
import"./numberIsNaN-7d89f7bf.js"
import"./roundToString-a4684890.js"
import{b as f,r as m}from"./render-82c47474.js"
import"./toLowerCase-019d771a.js"
import{c as d}from"./createInput-00d19dd2.js"
import{i as p}from"./insertTextBeforeEnd-549ab030.js"
import"./testRange-a51dd710.js"
import{t as b}from"./testQuant-da078752.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],v=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function k(e,t){return t.reduce(j,e)}function y(){const e=b(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=k(e,N)
return"guild"===s.cmd&&(t=k(t,v)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=a({className:`fshBioContainer ${e}`}),o=a({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
r(t,o),w=a({className:"fshBioPreview fshBioInner"}),r(t,w),r(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=a({innerHTML:"<br>Display "})
B=d({min:1,max:99,type:"number",value:h}),r(e,B),p(e," Lines ")
const t=d({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),r(e,t),r(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-516ab5a3.js.map
