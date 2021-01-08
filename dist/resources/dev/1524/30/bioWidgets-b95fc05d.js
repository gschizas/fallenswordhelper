import{H as e,y as t,c as o,o as s,f as i,m as r,h as a,i as n,p as l,A as c,Z as u}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import"./round-6850c0fc.js"
import"./roundToString-16988956.js"
import{b as f,r as m}from"./render-2a8113c4.js"
import"./playerName-8f1e4e48.js"
import"./toLowerCase-5e186769.js"
import{c as p}from"./createInput-0ba53f77.js"
import{i as d}from"./insertTextBeforeEnd-9513e143.js"
import"./testRange-e43cb031.js"
import{t as b}from"./testQuant-8065b1d8.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],j=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function y(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(y,e)}function k(){const e=b(B.value)
e&&(h=e,u("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===o.cmd&&(t=v(t,j)),t}(g.value),t=m(e)
c(t||e,w)}function S(){h=e("bioEditLines"),g=t("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===o.cmd&&(e="hall"===o.subcmd?"fshBioHall":"fshBioGuild")
const t=r({className:"fshBioContainer "+e}),s=r({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
a(t,s),w=r({className:"fshBioPreview fshBioInner"}),a(t,w),a(g.parentNode,t)}(),"profile"===o.cmd&&n(l,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=r({innerHTML:"<br>Display "})
B=p({min:1,max:99,type:"number",value:h}),a(e,B),d(e," Lines ")
const t=p({className:"custombutton",value:"Update Rows To Show",type:"button"})
s(t,k),a(e,t),a(l,e)}(),g.rows=h,"profile"===o.cmd&&s(g.parentNode,f),i(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-b95fc05d.js.map
