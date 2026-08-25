function cloneProps(e){return Object.keys(e).reduce((n,r)=>{const s=e[r];return n[r]=Object.assign({},s),isObject(s.value)&&!isFunction(s.value)&&!Array.isArray(s.value)&&(n[r].value=Object.assign({},s.value)),Array.isArray(s.value)&&(n[r].value=s.value.slice(0)),n},{})}function normalizePropDefs(e){return e?Object.keys(e).reduce((n,r)=>{const s=e[r];return n[r]=isObject(s)&&"value"in s?s:{value:s},n[r].attribute||(n[r].attribute=toAttribute(r)),n[r].parse="parse"in n[r]?n[r].parse:typeof n[r].value!="string",n},{}):{}}function propValues(e){return Object.keys(e).reduce((n,r)=>(n[r]=e[r].value,n),{})}function initializeProps(e,t){const n=cloneProps(t);return Object.keys(t).forEach(s=>{const o=n[s],a=e.getAttribute(o.attribute),i=e[s];a&&(o.value=o.parse?parseAttributeValue(a):a),i!=null&&(o.value=Array.isArray(i)?i.slice(0):i),o.reflect&&reflect(e,o.attribute,o.value),Object.defineProperty(e,s,{get(){return o.value},set(l){const d=o.value;o.value=l,o.reflect&&reflect(this,o.attribute,o.value);for(let c=0,f=this.__propertyChangedCallbacks.length;c<f;c++)this.__propertyChangedCallbacks[c](s,l,d)},enumerable:!0,configurable:!0})}),n}function parseAttributeValue(e){if(e)try{return JSON.parse(e)}catch{return e}}function reflect(e,t,n){if(n==null||n===!1)return e.removeAttribute(t);let r=JSON.stringify(n);e.__updating[t]=!0,r==="true"&&(r=""),e.setAttribute(t,r),Promise.resolve().then(()=>delete e.__updating[t])}function toAttribute(e){return e.replace(/\.?([A-Z]+)/g,(t,n)=>"-"+n.toLowerCase()).replace("_","-").replace(/^-/,"")}function isObject(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function isFunction(e){return Object.prototype.toString.call(e)==="[object Function]"}function isConstructor(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let currentElement;function createElementType(e,t){const n=Object.keys(t);return class extends e{static get observedAttributes(){return n.map(s=>t[s].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=initializeProps(this,t);const s=propValues(this.props),o=this.Component,a=currentElement;try{currentElement=this,this.__initialized=!0,isConstructor(o)?new o(s,{element:this}):o(s,{element:this})}finally{currentElement=a}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let s=null;for(;s=this.__releaseCallbacks.pop();)s(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(s,o,a){if(this.__initialized&&!this.__updating[s]&&(s=this.lookupProp(s),s in t)){if(a==null&&!this[s])return;this[s]=t[s].parse?parseAttributeValue(a):a}}lookupProp(s){if(t)return n.find(o=>s===o||s===t[o].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(s){this.__releaseCallbacks.push(s)}addPropertyChangedCallback(s){this.__propertyChangedCallbacks.push(s)}}}function register(e,t={},n={}){const{BaseElement:r=HTMLElement,extension:s}=n;return o=>{let a=customElements.get(e);return a?(a.prototype.Component=o,a):(a=createElementType(r,normalizePropDefs(t)),a.prototype.Component=o,a.prototype.registeredTag=e,customElements.define(e,a,s),a)}}const equalFn=(e,t)=>e===t,$PROXY=Symbol("solid-proxy"),signalOptions={equals:equalFn};let runEffects=runQueue;const STALE=1,PENDING=2,UNOWNED={owned:null,cleanups:null,context:null,owner:null};var Owner=null;let Transition=null,ExternalSourceConfig=null,Listener=null,Updates=null,Effects=null,ExecCount=0;function createRoot(e,t){const n=Listener,r=Owner,s=e.length===0,o=t===void 0?r:t,a=s?UNOWNED:{owned:null,cleanups:null,context:o?o.context:null,owner:o},i=s?e:()=>e(()=>untrack(()=>cleanNode(a)));Owner=a,Listener=null;try{return runUpdates(i,!0)}finally{Listener=n,Owner=r}}function createSignal(e,t){t=t?Object.assign({},signalOptions,t):signalOptions;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),writeSignal(n,s));return[readSignal.bind(n),r]}function createRenderEffect(e,t,n){const r=createComputation(e,t,!1,STALE);updateComputation(r)}function createEffect(e,t,n){runEffects=runUserEffects;const r=createComputation(e,t,!1,STALE);r.user=!0,Effects?Effects.push(r):updateComputation(r)}function createMemo(e,t,n){n=n?Object.assign({},signalOptions,n):signalOptions;const r=createComputation(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,updateComputation(r),readSignal.bind(r)}function untrack(e){if(Listener===null)return e();const t=Listener;Listener=null;try{return e()}finally{Listener=t}}function onMount(e){createEffect(()=>untrack(e))}function readSignal(){if(this.sources&&this.state)if(this.state===STALE)updateComputation(this);else{const e=Updates;Updates=null,runUpdates(()=>lookUpstream(this),!1),Updates=e}if(Listener){const e=this.observers?this.observers.length:0;Listener.sources?(Listener.sources.push(this),Listener.sourceSlots.push(e)):(Listener.sources=[this],Listener.sourceSlots=[e]),this.observers?(this.observers.push(Listener),this.observerSlots.push(Listener.sources.length-1)):(this.observers=[Listener],this.observerSlots=[Listener.sources.length-1])}return this.value}function writeSignal(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&runUpdates(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],a=Transition&&Transition.running;a&&Transition.disposed.has(o),(a?!o.tState:!o.state)&&(o.pure?Updates.push(o):Effects.push(o),o.observers&&markDownstream(o)),a||(o.state=STALE)}if(Updates.length>1e6)throw Updates=[],new Error},!1)),t}function updateComputation(e){if(!e.fn)return;cleanNode(e);const t=ExecCount;runComputation(e,e.value,t)}function runComputation(e,t,n){let r;const s=Owner,o=Listener;Listener=Owner=e;try{r=e.fn(t)}catch(a){return e.pure&&(e.state=STALE,e.owned&&e.owned.forEach(cleanNode),e.owned=null),e.updatedAt=n+1,handleError(a)}finally{Listener=o,Owner=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?writeSignal(e,r):e.value=r,e.updatedAt=n)}function createComputation(e,t,n,r=STALE,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:Owner,context:Owner?Owner.context:null,pure:n};return Owner===null||Owner!==UNOWNED&&(Owner.owned?Owner.owned.push(o):Owner.owned=[o]),o}function runTop(e){if(e.state===0)return;if(e.state===PENDING)return lookUpstream(e);if(e.suspense&&untrack(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ExecCount);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===STALE)updateComputation(e);else if(e.state===PENDING){const r=Updates;Updates=null,runUpdates(()=>lookUpstream(e,t[0]),!1),Updates=r}}function runUpdates(e,t){if(Updates)return e();let n=!1;t||(Updates=[]),Effects?n=!0:Effects=[],ExecCount++;try{const r=e();return completeUpdates(n),r}catch(r){n||(Effects=null),Updates=null,handleError(r)}}function completeUpdates(e){if(Updates&&(runQueue(Updates),Updates=null),e)return;const t=Effects;Effects=null,t.length&&runUpdates(()=>runEffects(t),!1)}function runQueue(e){for(let t=0;t<e.length;t++)runTop(e[t])}function runUserEffects(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:runTop(r)}for(t=0;t<n;t++)runTop(e[t])}function lookUpstream(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===STALE?r!==t&&(!r.updatedAt||r.updatedAt<ExecCount)&&runTop(r):s===PENDING&&lookUpstream(r,t)}}}function markDownstream(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=PENDING,n.pure?Updates.push(n):Effects.push(n),n.observers&&markDownstream(n))}}function cleanNode(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),a=n.observerSlots.pop();r<s.length&&(o.sourceSlots[a]=r,s[r]=o,n.observerSlots[r]=a)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)cleanNode(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function castError(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function handleError(e,t=Owner){throw castError(e)}function createComponent(e,t){return untrack(()=>e(t||{}))}function trueFn(){return!0}const propTraps={get(e,t,n){return t===$PROXY?n:e.get(t)},has(e,t){return t===$PROXY?!0:e.has(t)},set:trueFn,deleteProperty:trueFn,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:trueFn,deleteProperty:trueFn}},ownKeys(e){return e.keys()}};function resolveSource(e){return(e=typeof e=="function"?e():e)?e:{}}function resolveSources(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function mergeProps(...e){let t=!1;for(let a=0;a<e.length;a++){const i=e[a];t=t||!!i&&$PROXY in i,e[a]=typeof i=="function"?(t=!0,createMemo(i)):i}if(t)return new Proxy({get(a){for(let i=e.length-1;i>=0;i--){const l=resolveSource(e[i])[a];if(l!==void 0)return l}},has(a){for(let i=e.length-1;i>=0;i--)if(a in resolveSource(e[i]))return!0;return!1},keys(){const a=[];for(let i=0;i<e.length;i++)a.push(...Object.keys(resolveSource(e[i])));return[...new Set(a)]}},propTraps);const n={},r=Object.create(null);for(let a=e.length-1;a>=0;a--){const i=e[a];if(!i)continue;const l=Object.getOwnPropertyNames(i);for(let d=l.length-1;d>=0;d--){const c=l[d];if(c==="__proto__"||c==="constructor")continue;const f=Object.getOwnPropertyDescriptor(i,c);if(!r[c])r[c]=f.get?{enumerable:!0,configurable:!0,get:resolveSources.bind(n[c]=[f.get.bind(i)])}:f.value!==void 0?f:void 0;else{const w=n[c];w&&(f.get?w.push(f.get.bind(i)):f.value!==void 0&&w.push(()=>f.value))}}}const s={},o=Object.keys(r);for(let a=o.length-1;a>=0;a--){const i=o[a],l=r[i];l&&l.get?Object.defineProperty(s,i,l):s[i]=l?l.value:void 0}return s}function reconcileArrays(e,t,n){let r=n.length,s=t.length,o=r,a=0,i=0,l=t[s-1].nextSibling,d=null;for(;a<s||i<o;){if(t[a]===n[i]){a++,i++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===a){const c=o<r?i?n[i-1].nextSibling:n[o-i]:l;for(;i<o;)e.insertBefore(n[i++],c)}else if(o===i)for(;a<s;)(!d||!d.has(t[a]))&&t[a].remove(),a++;else if(t[a]===n[o-1]&&n[i]===t[s-1]){const c=t[--s].nextSibling;e.insertBefore(n[i++],t[a++].nextSibling),e.insertBefore(n[--o],c),t[s]=n[o]}else{if(!d){d=new Map;let f=i;for(;f<o;)d.set(n[f],f++)}const c=d.get(t[a]);if(c!=null)if(i<c&&c<o){let f=a,w=1,v;for(;++f<s&&f<o&&!((v=d.get(t[f]))==null||v!==c+w);)w++;if(w>c-i){const P=t[a];for(;i<c;)e.insertBefore(n[i++],P)}else e.replaceChild(n[i++],t[a++])}else a++;else t[a++].remove()}}}const $$EVENTS="_$DX_DELEGATE";function template(e,t,n){let r;const s=()=>{const a=document.createElement("template");return a.innerHTML=e,a.content.firstChild},o=()=>(r||(r=s())).cloneNode(!0);return o.cloneNode=o,o}function delegateEvents(e,t=window.document){const n=t[$$EVENTS]||(t[$$EVENTS]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,eventHandler))}}function setAttribute(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function className(e,t){t==null?e.removeAttribute("class"):e.className=t}function use(e,t,n){return untrack(()=>e(t,n))}function insert(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return insertExpression(e,t,r,n);createRenderEffect(s=>insertExpression(e,t(),s,n),r)}function eventHandler(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function insertExpression(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,a=r!==void 0;if(e=a&&n[0]&&n[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),a){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=cleanChildren(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||o==="boolean")n=cleanChildren(e,n,r);else{if(o==="function")return createRenderEffect(()=>{let i=t();for(;typeof i=="function";)i=i();n=insertExpression(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],l=n&&Array.isArray(n);if(normalizeIncomingArray(i,t,n,s))return createRenderEffect(()=>n=insertExpression(e,i,n,r,!0)),()=>n;if(i.length===0){if(n=cleanChildren(e,n,r),a)return n}else l?n.length===0?appendNodes(e,i,r):reconcileArrays(e,n,i):(n&&cleanChildren(e),appendNodes(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(a)return n=cleanChildren(e,n,r,t);cleanChildren(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function normalizeIncomingArray(e,t,n,r){let s=!1;for(let o=0,a=t.length;o<a;o++){let i=t[o],l=n&&n[e.length],d;if(!(i==null||i===!0||i===!1))if((d=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))s=normalizeIncomingArray(e,i,l)||s;else if(d==="function")if(r){for(;typeof i=="function";)i=i();s=normalizeIncomingArray(e,Array.isArray(i)?i:[i],Array.isArray(l)?l:[l])||s}else e.push(i),s=!0;else{const c=String(i);l&&l.nodeType===3&&l.data===c?e.push(l):e.push(document.createTextNode(c))}}return s}function appendNodes(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function cleanChildren(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let a=t.length-1;a>=0;a--){const i=t[a];if(s!==i){const l=i.parentNode===e;!o&&!a?l?e.replaceChild(s,i):e.insertBefore(s,n):l&&i.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}function createProps(e){const t=Object.keys(e),n={};for(let r=0;r<t.length;r++){const[s,o]=createSignal(e[t[r]]);Object.defineProperty(n,t[r],{get:s,set(a){o(()=>a)}})}return n}function lookupContext(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function withSolid(e){return(t,n)=>{const{element:r}=n;return createRoot(s=>{const o=createProps(t);r.addPropertyChangedCallback((i,l)=>o[i]=l),r.addReleaseCallback(()=>{r.renderRoot.textContent="",s()});const a=e(o,n);return insert(r.renderRoot,a)},lookupContext(r))}}function customElement(e,t,n){return arguments.length===2&&(n=t,t={}),register(e,t)(withSolid(n))}const styles=`/*
! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
.visible {
  visibility: visible;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.right-5 {
  right: 1.25rem;
}
.top-5 {
  top: 1.25rem;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-16 {
  margin-bottom: 4rem;
}
.ml-10 {
  margin-left: 2.5rem;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-8 {
  margin-top: 2rem;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.grid {
  display: grid;
}
.h-10 {
  height: 2.5rem;
}
.h-14 {
  height: 3.5rem;
}
.h-2 {
  height: 0.5rem;
}
.h-4 {
  height: 1rem;
}
.h-full {
  height: 100%;
}
.max-h-\\[90vh\\] {
  max-height: 90vh;
}
.w-10 {
  width: 2.5rem;
}
.w-14 {
  width: 3.5rem;
}
.w-4 {
  width: 1rem;
}
.w-full {
  width: 100%;
}
.max-w-\\[calc\\(100\\%-70px\\)\\] {
  max-width: calc(100% - 70px);
}
.max-w-screen-sm {
  max-width: 640px;
}
.flex-1 {
  flex: 1 1 0%;
}
@keyframes pulse {

  50% {
    opacity: .5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.overflow-hidden {
  overflow: hidden;
}
.text-ellipsis {
  text-overflow: ellipsis;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-t-md {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}
.border {
  border-width: 1px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity));
}
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity));
}
.bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
}
.bg-slate-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(226 232 240 / var(--tw-bg-opacity));
}
.bg-slate-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
}
.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-bold {
  font-weight: 700;
}
.font-semibold {
  font-weight: 600;
}
.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
.text-slate-500 {
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
}
.text-slate-600 {
  --tw-text-opacity: 1;
  color: rgb(71 85 105 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.underline {
  text-decoration-line: underline;
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop\\:bg-gray-800::backdrop {
  --tw-bg-opacity: 1;
  background-color: rgb(31 41 55 / var(--tw-bg-opacity));
}
.backdrop\\:opacity-90::backdrop {
  opacity: 0.9;
}
.hover\\:bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:underline:hover {
  text-decoration-line: underline;
}
.dark\\:border-slate-800:where(.dark, .dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity));
}
.dark\\:bg-slate-800:where(.dark, .dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(30 41 59 / var(--tw-bg-opacity));
}
.dark\\:text-slate-400:where(.dark, .dark *) {
  --tw-text-opacity: 1;
  color: rgb(148 163 184 / var(--tw-text-opacity));
}
.dark\\:text-white:where(.dark, .dark *) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
`,SERVICE="https://api.bsky.app",xrpc=async(e,t)=>{const n=new URLSearchParams;for(const[s,o]of Object.entries(t))o!=null&&o!==""&&n.set(s,String(o));const r=await fetch(`${SERVICE}/xrpc/${e}?${n.toString()}`,{headers:{accept:"application/json"}});return r.ok?{success:!0,data:await r.json()}:{success:!1,data:null}},getAuthorFeed=e=>xrpc("app.bsky.feed.getAuthorFeed",e),getFeed=e=>xrpc("app.bsky.feed.getFeed",e),searchPosts=e=>xrpc("app.bsky.feed.searchPosts",e),encoder=new TextEncoder,decoder=new TextDecoder,escapeHtml=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),safeHref=e=>{try{const{protocol:t}=new URL(String(e));return t==="http:"||t==="https:"?String(e):null}catch{return null}},segmentText=(e,t)=>{const n=encoder.encode(e),r=t.filter(a=>a?.index&&a.features?.length&&a.index.byteStart<a.index.byteEnd).sort((a,i)=>a.index.byteStart-i.index.byteStart),s=[];let o=0;for(const a of r){const{byteStart:i,byteEnd:l}=a.index;i<o||(i>o&&s.push({text:decoder.decode(n.slice(o,i))}),s.push({text:decoder.decode(n.slice(i,l)),feature:a.features[0]}),o=l)}return o<n.length&&s.push({text:decoder.decode(n.slice(o))}),s.length||s.push({text:e}),s},formatPost=({post:e,reason:t,isRoot:n})=>{if(e.$type==="app.bsky.embed.record#viewNotFound"||e.$type==="app.bsky.embed.record#viewBlocked")return null;if(e.$type==="app.bsky.graph.defs#listView")return{username:e.creator.displayName,handle:e.creator.handle,avatar:e.creator.avatar,text:[{val:e.description,setInnerHtml:!1}],createdAt:e.indexedAt,uri:e.uri,images:[],card:null,replyPost:null,isRepost:!1,repostBy:null};if(e.$type==="app.bsky.feed.defs#generatorView")return{username:e.creator.displayName,handle:e.creator.handle,avatar:e.creator.avatar,text:[{val:e.description,setInnerHtml:!1}],createdAt:e.indexedAt,uri:e.uri,images:[],card:null,replyPost:null,isRepost:!1,repostBy:null};if(!e.record)return null;const r=e.record.facets||[],s=e.record.text,o=[];for(const d of segmentText(s,r)){const c=d.feature,f=c?.$type==="app.bsky.richtext.facet#link"?safeHref(c.uri):null;f?o.push({val:`<a href="${escapeHtml(f)}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(d.text)}</a>`,setInnerHtml:!0}):c?.$type==="app.bsky.richtext.facet#mention"?o.push({val:`<a href="https://bsky.app/profile/${escapeHtml(c.did??"")}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(d.text)}</a>`,setInnerHtml:!0}):c?.$type==="app.bsky.richtext.facet#tag"?o.push({val:`<a href="https://bsky.app/hashtag/${escapeHtml(c.tag??"")}" target="_blank" rel="noopener" class="text-blue-500 underline">${escapeHtml(d.text)}</a>`,setInnerHtml:!0}):o.push({val:d.text,setInnerHtml:!1})}const a=e.embed?.$type==="app.bsky.embed.record#view"?e.embed.record:e.embed?.record?.record?.$type==="app.bsky.embed.record#viewRecord"&&e.embed.record.record,i=a&&{...a,record:a.value||a.record,embed:(a?.embeds||[])[0]},l=e.author||e.creator;return{username:l.displayName,handle:l.handle,avatar:l.avatar,text:o,createdAt:e.record.createdAt,uri:e.uri,images:[...e.embed?.images||[],...e.embed?.media?.images||[],...[e.embed?.media?.external].filter(Boolean).map(d=>({...d,alt:d.title,thumb:d.uri}))],video:e.embed?.$type==="app.bsky.embed.video#view"&&e.embed,card:e.embed?.$type==="app.bsky.embed.external#view"&&e.embed?.external,replyPost:n&&i&&formatPost({post:i,reason:{$type:"",by:{displayName:""}},isRoot:!1}),isRepost:t?.$type==="app.bsky.feed.defs#reasonRepost",repostBy:t?.by?.displayName}},formatData=e=>(e.feed||[]).map(t=>formatPost({...t,isRoot:!0})),getContentAfterLastSlash=e=>{const t=e.lastIndexOf("/");return t!==-1?e.substring(t+1):e},timeDifference=e=>{const t=new Date,n=60*1e3,r=n*60,s=r*24,o=s*30,a=s*365,i=t.getTime()-e.getTime();return i<n?Math.floor(i/1e3)+"s":i<r?Math.floor(i/n)+"m":i<s?Math.floor(i/r)+"h":i<o?Math.floor(i/s)+"d":i<a?Math.floor(i/o)+" mo":Math.floor(i/a)+" yr"},fetchVideo=async(e,t,n=!1)=>{if(!("IntersectionObserver"in window)){console.error("IntersectionObserver not supported");return}if(!t){console.error("Video element not found");return}const r={root:null,threshold:.5},s=async(a,i)=>{for(const l of a){if(!l.isIntersecting)continue;i.unobserve(t);const{default:d}=await import("./bsky-embed-hls.js");if(d.isSupported()){const c=new d;c.loadSource(e.playlist),c.attachMedia(t),c.on(d.Events.MANIFEST_PARSED,()=>{n||t.play()})}else t.canPlayType("application/vnd.apple.mpegurl")&&(t.src=e.playlist,t.addEventListener("loadedmetadata",()=>{n||t.play()}))}};new IntersectionObserver(s,r).observe(t)};var _tmpl$$1=template('<article class="p-4 border-b border-slate-300 dark:border-slate-800"><div class="flex gap-2"><div class="w-full max-w-[calc(100%-70px)]"><div class="flex items-center"><a class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white"><span class="font-bold dark:text-white"></span><span> </span><span class="text-slate-500 dark:text-slate-400 text-sm">@</span></a><span class="text-slate-500 dark:text-slate-400 text-sm"><span class=mx-1>\xB7</span><a class=hover:underline></a></span></div><p class="whitespace-pre-wrap dark:text-white">'),_tmpl$2$1=template('<p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400"><svg viewBox="0 0 576 512"height=16 width=16 tabindex=-1 class=mr-1><path fill=currentColor d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg><span class="text-sm text-slate-500 font-semibold">Reposted by '),_tmpl$3$1=template('<img alt="profile picture"class="w-14 h-14 rounded-full">'),_tmpl$4$1=template('<img alt="profile picture"class="w-4 h-4 mr-1 rounded-full">'),_tmpl$5$1=template("<span>"),_tmpl$6$1=template("<div>"),_tmpl$7=template("<a><img class=rounded-md>"),_tmpl$8=template('<div class="mt-4 w-full"><video width=100% class="rounded-md w-full h-full object-cover"preload=none>'),_tmpl$9=template('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block"><div class=p-3><p class="text-slate-500 dark:text-slate-400 text-sm"></p><p class="font-bold dark:text-white mb-1"></p><p class="whitespace-pre-wrap dark:text-white">'),_tmpl$10=template('<img class=rounded-t-md alt="Post Thumbnail">'),_tmpl$11=template('<a target=_blank rel=noopener class="mt-4 rounded-md border border-slate-300 block">');const BskyPost=({linkTarget:e="_self",post:t,handleModalContent:n,isCard:r=!1,dateFormat:s,disableImages:o,disableVideos:a,disableAutoplay:i})=>{let l;return onMount(()=>{!a&&t.video&&t.video.cid&&fetchVideo(t.video,l,i)}),(()=>{var d=_tmpl$$1(),c=d.firstChild,f=c.firstChild,w=f.firstChild,v=w.firstChild,P=v.firstChild,O=P.nextSibling,S=O.nextSibling;S.firstChild;var j=v.nextSibling,C=j.firstChild,_=C.nextSibling,R=w.nextSibling;return insert(d,(()=>{var u=createMemo(()=>!!t.isRepost);return()=>u()&&(()=>{var p=_tmpl$2$1(),b=p.firstChild,g=b.nextSibling;return g.firstChild,insert(g,()=>t.repostBy,null),p})()})(),c),insert(c,!r&&(()=>{var u=_tmpl$3$1();return createRenderEffect(()=>setAttribute(u,"src",t.avatar)),u})(),f),insert(w,r&&(()=>{var u=_tmpl$4$1();return createRenderEffect(()=>setAttribute(u,"src",t.avatar)),u})(),v),setAttribute(v,"target",e),setAttribute(v,"rel",e==="_blank"?"noopeener":""),insert(P,()=>t.username),insert(S,()=>t.handle,null),setAttribute(_,"target",e),setAttribute(_,"rel",e==="_blank"?"noopeener":""),insert(_,(()=>{var u=createMemo(()=>!!(s&&s.type==="absolute"));return()=>u()?new Date(t.createdAt).toLocaleDateString(s.locale,s.options):timeDifference(new Date(t.createdAt))})()),insert(R,()=>t.text.map(u=>u.setInnerHtml?(()=>{var p=_tmpl$5$1();return createRenderEffect(()=>p.innerHTML=u.val),p})():(()=>{var p=_tmpl$5$1();return insert(p,()=>u.val),p})())),insert(f,(()=>{var u=createMemo(()=>!o&&t.images.length>0);return()=>u()&&(()=>{var p=_tmpl$6$1();return insert(p,()=>t.images.map(b=>(()=>{var g=_tmpl$7(),A=g.firstChild;return g.$$click=y=>n(y,b),setAttribute(g,"target",e),setAttribute(g,"rel",e==="_blank"?"noopeener":""),createRenderEffect(y=>{var $=`https://bsky.app/profile/${t.handle}/post/${getContentAfterLastSlash(t.uri)}`,h=b.thumb,m=b.alt;return $!==y.e&&setAttribute(g,"href",y.e=$),h!==y.t&&setAttribute(A,"src",y.t=h),m!==y.a&&setAttribute(A,"alt",y.a=m),y},{e:void 0,t:void 0,a:void 0}),g})())),createRenderEffect(()=>className(p,t.images.length>1?"mt-4 grid grid-cols-2 gap-2":"mt-4")),p})()})(),null),insert(f,(()=>{var u=createMemo(()=>!!(!a&&t.video));return()=>u()&&(()=>{var p=_tmpl$8(),b=p.firstChild,g=l;return typeof g=="function"?use(g,b):l=b,b.autoplay=!1,b.controls=!0,b.muted=!0,createRenderEffect(()=>setAttribute(b,"poster",t.video.thumbnail)),p})()})(),null),insert(f,(()=>{var u=createMemo(()=>!!t.card);return()=>u()&&(()=>{var p=_tmpl$9(),b=p.firstChild,g=b.firstChild,A=g.nextSibling,y=A.nextSibling;return insert(p,(()=>{var $=createMemo(()=>!!(t.card.thumb&&!o));return()=>$()&&(()=>{var h=_tmpl$10();return createRenderEffect(()=>setAttribute(h,"src",t.card.thumb)),h})()})(),b),insert(g,()=>new URL(t.card.uri).hostname),insert(A,()=>t.card.title),insert(y,()=>t.card.description),createRenderEffect(()=>setAttribute(p,"href",t.card.uri)),p})()})(),null),insert(f,(()=>{var u=createMemo(()=>!!t.replyPost);return()=>u()&&(()=>{var p=_tmpl$11();return insert(p,createComponent(BskyPost,mergeProps({linkTarget:e,handleModalContent:n,disableImages:o,disableVideos:a,disableAutoplay:i},{get post(){return t.replyPost},isCard:!0}))),createRenderEffect(()=>setAttribute(p,"href",t.card.uri)),p})()})(),null),createRenderEffect(u=>{var p=`https://bsky.app/profile/${t.handle}`,b=`https://bsky.app/profile/${t.handle}/post/${getContentAfterLastSlash(t.uri)}`;return p!==u.e&&setAttribute(v,"href",u.e=p),b!==u.t&&setAttribute(_,"href",u.t=b),u},{e:void 0,t:void 0}),d})()};delegateEvents(["click"]);var _tmpl$=template('<section><dialog class="backdrop:bg-gray-800 backdrop:opacity-90"><form class="fixed top-5 right-5"><button type=submit aria-label=close formmethod=dialog formnovalidate class="bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center">X</button></form><img src=""alt=""class=max-h-[90vh]>'),_tmpl$2=template("<style>"),_tmpl$3=template("<link rel=stylesheet>"),_tmpl$4=template("<div class=w-full>"),_tmpl$5=template('<article class="w-full flex gap-2 p-4 border-b border-slate-300 dark:border-slate-800 animate-pulse"><div class="bg-slate-200 w-14 h-14 rounded-full dark:bg-slate-800"></div><div class="flex-1 space-y-2 py-1"><div class="grid grid-cols-4 gap-4"><div class="h-2 bg-slate-200 rounded col-span-2 dark:bg-slate-800"></div></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-200 rounded dark:bg-slate-800">'),_tmpl$6=template('<div class="mt-8 mb-16"><button id=bsky-load-more class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Load More Posts');const BskyEmbed=({username:e,feed:t,limit:n=10,mode:r="",linkTarget:s="_self",linkImage:o=!1,customStyles:a="",customStylesFile:i,disableStyles:l=!1,search:d,loadMore:c=!1,dateFormat:f,disableImages:w=!1,disableVideos:v=!1,disableAutoplay:P=!1})=>{let O=null,S=null;const[j,C]=createSignal(!1),[_,R]=createSignal([]),[u]=createSignal(n),[p,b]=createSignal(void 0);createEffect(()=>{C(!0),g()},[e,t,d,u]);const g=async h=>{e?getAuthorFeed({limit:u(),actor:e,filter:"posts_no_replies",cursor:h}).then(({success:m,data:x})=>{if(m){const E=formatData(x);$(E),C(!1),b(x.cursor)}}):t?getFeed({limit:u(),feed:t,cursor:h}).then(({success:m,data:x})=>{if(m){const E=formatData(x);$(E),C(!1),b(x.cursor)}}):d&&searchPosts({limit:u(),q:d,cursor:h}).then(({success:m,data:x})=>{if(m){const E={...x,feed:x.posts.map(z=>({post:z}))},k=formatData(E);$(k),C(!1),b(x.cursor)}})},A=(h,m)=>{!o&&O&&S&&(h.preventDefault(),S.src=m.fullsize,S.alt=m.alt,O.showModal())},y=()=>{C(!0),g(p())},$=h=>{const m=[..._(),...h];R(m)};return[!l&&(()=>{var h=_tmpl$2();return insert(h,styles),h})(),a&&(()=>{var h=_tmpl$2();return insert(h,a),h})(),i&&(()=>{var h=_tmpl$3();return setAttribute(h,"href",i),h})(),(()=>{var h=_tmpl$(),m=h.firstChild,x=m.firstChild,E=x.nextSibling;return className(h,`${r} max-w-screen-sm mx-auto flex flex-col items-center`),insert(h,(()=>{var k=createMemo(()=>_().length>0);return()=>k()&&_().map((z,M)=>(()=>{var T=_tmpl$4();return setAttribute(T,"id",`post-${M}`),insert(T,createComponent(BskyPost,{post:z,handleModalContent:A,linkTarget:s,dateFormat:f,disableImages:w,disableVideos:v,disableAutoplay:P})),T})())})(),m),insert(h,(()=>{var k=createMemo(()=>!!j());return()=>k()&&Array.from(Array(n)).map(()=>_tmpl$5())})(),m),use(k=>O=k,m),use(k=>S=k,E),insert(h,(()=>{var k=createMemo(()=>!!(c&&p()));return()=>k()&&(()=>{var z=_tmpl$6(),M=z.firstChild;return M.$$click=y,z})()})(),null),h})()]};delegateEvents(["click"]),customElement("bsky-embed",{username:"",feed:"",limit:10,mode:"",linkTarget:"_self",linkImage:!1,customStyles:"",customStylesFile:"",disableStyles:!1,search:"",loadMore:!1,disableAutoplay:!1,disableImages:!1,disableVideos:!1,dateFormat:{}},BskyEmbed);
