## What is stabs.js?
stabs.js is near enough 3 kilobytes of JavaScript for creating tabbed sections of your webpage.

It's not something I'm especially proud of. It's not the friendliest or the most modern approach.

However, it is easy to use, you can just drop it in and it'll work nicely, and coming soon is support for custom selectors specified by you. It's pretty robust.

### Why make this lib?
Bootstrap and other libraries/frameworks which include, or are solely intended for, the creation of tabbed UI elements, tend to require jQuery. This is not surprising but it is disappointing. My 80 lines of vanilla would probably be about 8 lines of jQuery, that much is true.

However, it is 2016, and while ES5/ES6 are gaining traction, in the real and non-transpiled world, ES3 is finally becoming standardised across all browsers, even in IE. Vanilla JS is a good deal faster than working with a framework or abstraction layer, and certainly there's the filesize of libraries/frameworks compared to this tab snippet.

There are of course some other vanilla JS alternatives, like tabby, or that random one whose demo features cats, but they all navigate to hash fragments in the URL bar, which is a feature I explicitly didn't want, and should at most be an optional extra.

I wanted something lean and robust. Thus, stabs.js was born.

### What's the approach?
stabs.js uses only vanilla JavaScript primarily relying on `for` loops and `className`.

stabs loops through everything in the DOM with a class of &ldquo;tabcontainer&rdquo; and then adds event listeners to everything that is a &ldquo;tab&rdquo; in that tabcontainer.

These event listeners wait for a tab to be clicked and then, if the tab is not active, set it and its corresponding tabpane to active (with a CSS class) and all other tabs/tabpanes have their active status removed. This is additionally reflected with aria-attributes and the html5 `hidden` attribute.

This might seem like cheating, but the approach could easily be adapted to manipulate styles directly. However, appending and removing classes is ultimately more efficient, and also enables the exact way tabs are displayed/hidden to be very flexible to the CSS-savvy dev.

This is ultimately the simplest way to work with tabs.

### How does one use it?
Include stabs.js in your page and make sure you have elements corresponding to the selectors. tabs and tab panes do not need to be siblings, but they must be contained within a tabcontainer element and there must be a tab pane for every tab. tabs must be siblings of tabs and same for tab panes. [This is easier to explain in a demo.](https://output.jsbin.com/hosomi/31)

You need a containing element and the tabs and tabpanes must be children of the container, though they need not necessarily be immediate children.

stabs supports nested tabs. This is achieved using 'indexOf' which is polyfilled within.

Demo 1 (home page)    : https://stabs.js.org
Demo 2 (nesting tabs) : https://output.jsbin.com/hosomi/31
