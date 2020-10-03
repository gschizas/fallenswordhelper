import{H as e,y as t,c as o,o as s,f as i,m as r,h as a,i as n,p as l,A as c,Z as u}from"./calfSystem-4991bf5b.js"
import"./numberIsNaN-a6bcb044.js"
import"./round-24bc52d1.js"
import"./roundToString-b5c0e5f9.js"
import{b as f,r as m}from"./render-c26527e3.js"
import"./playerName-69861ead.js"
import"./toLowerCase-b21b7cc8.js"
import{c as b}from"./createInput-befbd592.js"
import{i as p}from"./insertTextBeforeEnd-742418cd.js"
import"./testRange-960066fd.js"
import{t as d}from"./testQuant-50452735.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function y(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(y,e)}function k(){const e=d(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value),t=m(e)
c(t||e,w)}function S(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),s=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,s),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),a(e,B),p(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,k),a(e,t),a(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),i(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-009fcd94.js.map
