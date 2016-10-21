<h2>What is stabs.js?</h2>
<p>stabs.js is near enough 3 kilobytes of JavaScript for creating tabbed sections of your webpage.</p>
<p>It's not something I'm especially proud of. It's not the friendliest or the most modern approach.</p>
<p>However, it is easy to use, you can just drop it in and it'll work nicely, and coming soon is support for custom selectors specified by you. It's pretty robust.</p>
<h2>Why make this lib?</h2>
<p>Bootstrap and other libraries/frameworks tend to require jQuery. Not surprising. My <s>50</s> 90 lines of vanilla would probably be about 8 lines of jQuery.</p>
<p>However, it is 2016 and ES5/ES6 are gaining traction, and the ES3 that is actually supported in the real world is now largely standardised even in IE.</p>
<p>There are of course some vanilla JS alternatives, but they all navigate to hash fragments in the URL bar, which is a feature I explicitly didn't want.</p>
<p>I wanted something lean and robust.</p>
<p>Thus, stabs.js was born.</p>
<h2>What's the approach?</h2>
<p>stabs.js uses only vanilla JavaScript primarily relying on <code>for/while</code> loops.</p>
<p>This small lib loops through everything in the DOM with a class of &ldquo;tabcontainer&rdquo; and then adds event listeners to everything that is a &ldquo;tab&rdquo; in that tabcontainer.</p>
<p>These event listeners wait for a tab to be clicked and then, if the tab is not active, it and its corresponding tabpane are set to active and all other tabs/tabpanes have their active status removed.</p>
<p>This might seem like cheating, but the approach could easily be adapted to manipulate styles directly. However, appending and removing classes is ultimately more efficient, and also enables the exact way tabs are displayed/hidden to be very flexible to the CSS-savvy dev.</p>
<p>This is ultimately the simplest way to work with tabs.</p>
<h2>How does one use it?</h2>
<p>Include <code>stabs.min.js</code> in your page and below that call the <code>stabs()</code> function</p>
<p>Then just make sure you have elements corresponding to your selectors.</p>
<p>You need a containing element and the tabs and tabpanes must be children of the container, though they need not necessarily be immediate children.</p>
<p>stabs supports nested tabs</p>

Demo: https://output.jsbin.com/hosomi/
