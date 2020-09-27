import{aa as t,ab as e}from"./calfSystem-d3aab5a8.js"
class r{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((r,o)=>{const n=indexedDB.open(t,1)
n.onerror=()=>o(n.error),n.onsuccess=()=>r(n.result),n.onupgradeneeded=()=>{n.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(r=>new Promise((o,n)=>{const a=r.transaction(this.storeName,t)
a.oncomplete=()=>o(),a.onabort=a.onerror=()=>n(a.error),e(a.objectStore(this.storeName))}))}}let o
function n(){return o||(o=new r),o}const a=r=>{r&&"NotFoundError"!==r.name&&t(e(r),!1)}
async function s(t,e){try{return await function(t,e=n()){let r
return e._withIDBStore("readonly",e=>{r=e.get(t)}).then(()=>r.result)}(t,e)}catch(t){a(t)}}async function c(t,e,r){try{return await function(t,e,r=n()){return r._withIDBStore("readwrite",r=>{r.put(e,t)})}(t,e,r)}catch(t){a(t)}}export{s as g,c as s}
//# sourceMappingURL=idb-f33380fa.js.map
