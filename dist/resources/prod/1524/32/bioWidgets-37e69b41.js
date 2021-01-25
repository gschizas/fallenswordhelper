import{b as e,r as t}from"./render-942754bc.js"
import{H as s,y as o,c as i,o as a,f as r,m as n,h as l,i as c,p as u,A as m,Z as f}from"./calfSystem-45544049.js"
import{c as b}from"./createInput-8791792e.js"
import{i as d}from"./insertTextBeforeEnd-88d13d4d.js"
import{t as p}from"./testQuant-73b87a40.js"
import"./roundToString-dbdb82cb.js"
import"./numberIsNaN-fecd7e6d.js"
import"./playerName-c1bcaeb9.js"
import"./toLowerCase-ace931b6.js"
import"./testRange-edf4a984.js"
let h,g,w,B
const N=[[/</g,"&lt"],[/>/g,"&gt"],[/\n/g,"<br>"],[/\[(\/?[biu])\]/g,"<$1>"],[/\\\\/g,"&#92"],[/\\/g,""]],y=[[/\[(\/?block)\]/g,"<$1quote>"],[/\[list\]/g,'<ul class="list">'],[/\[\/list\]/g,"</ul>"],[/\[\*\](.*?)<br>/g,"<li>$1</li>"]]
function j(e,t){return e.replace(t[0],t[1])}function v(e,t){return t.reduce(j,e)}function k(){const e=p(B.value)
e&&(h=e,f("bioEditLines",e),g.rows=h)}function T(){const e=function(e){let t=v(e,N)
return"guild"===i.cmd&&(t=v(t,y)),t}(g.value),s=t(e)
m(s||e,w)}function S(){h=s("bioEditLines"),g=o("textInputBox"),g&&(!function(){let e="fshBioProfile"
"guild"===i.cmd&&(e="hall"===i.subcmd?"fshBioHall":"fshBioGuild")
const t=n({className:`fshBioContainer ${e}`}),s=n({className:"fshBioHeader fshBioInner",innerHTML:"Preview"})
l(t,s),w=n({className:"fshBioPreview fshBioInner"}),l(t,w),l(g.parentNode,t)}(),"profile"===i.cmd&&c(u,'<div>`~This will allow FSH Script users to select buffs from your bio~`<br>You can use the [cmd] tag as well to determine where to put the "Ask For Buffs" button<br><br><blockquote><ul class="list"><li>Note 1: The ` and ~ characters are on the same key on US QWERTY keyboards. ` is <b>NOT</b> an apostrophe.</li><li>Note 2: Inner text will not contain special characters (non-alphanumeric).</li><li>P.S. Be creative with these! Wrap your buff pack names in them to make buffing even easier!</li></ul></blockquote></div>'),function(){const e=n({innerHTML:"<br>Display "})
B=b({min:1,max:99,type:"number",value:h}),l(e,B),d(e," Lines ")
const t=b({className:"custombutton",value:"Update Rows To Show",type:"button"})
a(t,k),l(e,t),l(u,e)}(),g.rows=h,"profile"===i.cmd&&a(g.parentNode,e),r(g,"keyup",T),T())}export default S
//# sourceMappingURL=bioWidgets-37e69b41.js.map
