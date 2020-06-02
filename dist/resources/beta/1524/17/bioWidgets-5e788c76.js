import{D as e,x as t,c as s,o,e as i,k as r,f as a,i as n,p as l,z as c,W as u}from"./calfSystem-02ae8657.js"
import"./numberIsNaN-0b348b17.js"
import"./roundToString-50224ae1.js"
import{b as f,r as m}from"./render-4c96861c.js"
import"./playerName-9873e3df.js"
import"./toLowerCase-f5058453.js"
import{c as b}from"./createInput-cbb1c2cb.js"
import{i as p}from"./insertTextBeforeEnd-9b01785d.js"
import"./testRange-fb8ca2bd.js"
import{t as d}from"./testQuant-cde3ecdc.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function k(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(k,e)}function y(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){let e=function(e){let t=v(e,N)
return"guild"===s.cmd&&(t=v(t,j)),t}(g.value)
e=m(e),c(e,w)}export default function(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===s.cmd&&(e="hall"===s.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),o=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,o),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===s.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),a(e,B),p(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
o(t,y),a(e,t),a(l,e)}(),g.rows=h,"profile"===s.cmd&&o(g.parentNode,f),i(g,"keyup",T),T())}
//# sourceMappingURL=bioWidgets-5e788c76.js.map
