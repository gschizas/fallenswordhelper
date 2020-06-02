import{bk as t,w as e,z as s,aK as o,x as n,aU as a,ap as r,s as i,D as c,p as l,W as u}from"./calfSystem-02ae8657.js"
import{d as f}from"./dialogMsg-f195b598.js"
function g(t,e){u(e,t[e])}function p(){const t=o(n("HelperfshSettings").value)
if(a(t)){const e=t
r(e).forEach(i(g,e)),f("Settings loaded successfully!")}}function d(t,e){return t[e]=c(e),t}export default function(){if(e())return
const o=function(){const e=[],s=new RegExp("^"+t)
for(let o=0,n=window.localStorage.length;o<n;o+=1){const n=window.localStorage.key(o)
n.match(s)&&e.push(n.replace(t,""))}return e}().reduce(d,{})
!function(t,e){s(`<h1>FSH Settings</h1><br><center>The box below is your current settings. Copy it to save your current settings<br>To load saved settings, simply replace the contents of the box with your saved copy and press the button below.<textarea align="center" cols="80" rows="25" style="background-color:white;font-family:Consolas,'Lucida Console','Courier New',monospace;" id="HelperfshSettings" name="fshSettings">${JSON.stringify(e)}</textarea><br><input id="HelperLoadSettings" class="custombutton" type="submit" value="Load Settings!" /></center>`,t)}(l,o),$("#HelperLoadSettings").on("click",p)}
//# sourceMappingURL=load-26f4ba92.js.map
