import{D as e,x as t,c as s,o,e as i,k as r,f as a,i as n,p as l,z as u,W as c}from"./calfSystem-9554b525.js"
import"./numberIsNaN-f35fe828.js"
import"./roundToString-df4d21d0.js"
import{b as f,r as m}from"./render-33419b8e.js"
import"./playerName-855f1e8d.js"
import"./toLowerCase-5de73e6e.js"
import{c as d}from"./createInput-73435eda.js"
import{i as p}from"./insertTextBeforeEnd-10d7d9cd.js"
import"./testRange-2d1c6f52.js"
import{t as b}from"./testQuant-9809f33d.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=b(B.value)
e&&(h=e,c("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),u(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),o=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,o),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=d({min:1,max:99,type:"number",value:h}),a(e,B),p(e," Lines ")
const t=d({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),a(e,t),a(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-98d5c3ef.js.map
