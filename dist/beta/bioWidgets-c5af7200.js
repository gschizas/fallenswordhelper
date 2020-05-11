import{G as e,A as t,e as s,o,f as i,l as r,h as a,i as n,p as l,C as u,a4 as c}from"./calfSystem-99da704d.js"
import"./numberIsNaN-9b6eee03.js"
import"./roundToString-3073111c.js"
import{b as f,r as m}from"./render-2821b20d.js"
import"./toLowerCase-5db36e6f.js"
import{c as b}from"./createInput-bb469b2f.js"
import{i as p}from"./insertTextBeforeEnd-79e0260c.js"
import"./testRange-0e95f26c.js"
import{t as d}from"./testQuant-1d721c08.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],v=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function k(e,t){return t.reduce(j,e)}function y(){const e=d(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=k(e,N)
return"guild"===s.cmd&&(t=k(t,v)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:`fshBioContainer ${e}`}),o=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,o),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),a(e,B),p(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),a(e,t),a(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-c5af7200.js.map
