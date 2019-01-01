var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function callAfter(fn, i) {
		if (i === 0) fn();
		return () => {
			if (!--i) fn();
		};
	}

	function addLoc(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		fn();
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function destroyDev(detach) {
		destroy.call(this, detach);
		this.destroy = function() {
			console.warn('Component was already destroyed');
		};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function setDev(newState) {
		if (typeof newState !== 'object') {
			throw new Error(
				this._debugName + '.set was called without an object of data key-values to update.'
			);
		}

		this._checkReadOnly(newState);
		set.call(this, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var protoDev = {
		destroy: destroyDev,
		get,
		fire,
		on,
		set: setDev,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src\Share.html generated by Svelte v2.16.0 */

	const serverBase = window.serverBase || '//maps.kosmosnimki.ru/';

	function data() {
		return {
			regl: null,
			clasters: false,
			layers: {},
			filter: ''
		}
	}
	var methods = {
		parseJSON(json) {
			console.log('zoomstart', arguments);
		}
	};

	function onstate({ changed, current, previous }) {
		//console.log('map onstate', changed, current, previous);
	}
	const file = "src\\Share.html";

	function create_main_fragment(component, ctx) {
		var span3, ul, li0, a0, span0, text1, li1, a1, span1, text2, li2, a2, span2, current;

		return {
			c: function create() {
				span3 = createElement("span");
				ul = createElement("ul");
				li0 = createElement("li");
				a0 = createElement("a");
				span0 = createElement("span");
				span0.textContent = "Share on Facebook";
				text1 = createText("\n");
				li1 = createElement("li");
				a1 = createElement("a");
				span1 = createElement("span");
				text2 = createText("\n");
				li2 = createElement("li");
				a2 = createElement("a");
				span2 = createElement("span");
				span0.className = "icon-facebook svelte-1amcmn3";
				addLoc(span0, file, 2, 269, 370);
				a0.className = "link--anchor";
				a0.href = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.vogue.com%2Ffashion-shows%2Fspring-2019-menswear%2Falexander-mcqueen%3Fmbid%3Dsocial_onsite_facebook";
				addLoc(a0, file, 2, 74, 175);
				li0.className = "share-links--link facebook analytics--target__runwaySlideshow svelte-1amcmn3";
				addLoc(li0, file, 2, 0, 101);
				span1.className = "icon-pinterest svelte-1amcmn3";
				addLoc(span1, file, 3, 451, 883);
				a1.className = "link--anchor";
				a1.href = "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.vogue.com%2Ffashion-shows%2Fspring-2019-menswear%2Falexander-mcqueen%3Fmbid%3Dsocial_onsite_pinterest&media=https://assets.vogue.com/photos/5b2d26fe748d2059b8363ab6/master/pass/KIM_2206.jpg&description=Alexander%20McQueen%20Spring%202019%20Menswear%20Paris%20Collection";
				addLoc(a1, file, 3, 75, 507);
				li1.className = "share-links--link pinterest analytics--target__runwaySlideshow svelte-1amcmn3";
				addLoc(li1, file, 3, 0, 432);
				span2.className = "icon-twitter svelte-1amcmn3";
				addLoc(span2, file, 4, 354, 1283);
				a2.className = "link--anchor";
				a2.href = "https://twitter.com/intent/tweet?text=Alexander%20McQueen%20Spring%202019%20Menswear%20Fashion%20Show&url=https%3A%2F%2Fwww.vogue.com%2Ffashion-shows%2Fspring-2019-menswear%2Falexander-mcqueen%3Fmbid%3Dsocial_onsite_twitter&via=voguemagazine";
				addLoc(a2, file, 4, 73, 1002);
				li2.className = "share-links--link twitter analytics--target__runwaySlideshow svelte-1amcmn3";
				addLoc(li2, file, 4, 0, 929);
				ul.className = "social-sharer--share-links svelte-1amcmn3";
				addLoc(ul, file, 1, 0, 61);
				span3.className = "social-sharer social-sharer__runway-slideshow";
				addLoc(span3, file, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, span3, anchor);
				append(span3, ul);
				append(ul, li0);
				append(li0, a0);
				append(a0, span0);
				append(ul, text1);
				append(ul, li1);
				append(li1, a1);
				append(a1, span1);
				append(ul, text2);
				append(ul, li2);
				append(li2, a2);
				append(a2, span2);
				current = true;
			},

			p: noop,

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(span3);
				}
			}
		};
	}

	function Share(options) {
		this._debugName = '<Share>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data(), options.data);
		this._intro = !!options.intro;

		this._handlers.state = [onstate];

		onstate.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Share.prototype, protoDev);
	assign(Share.prototype, methods);

	Share.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\Top.html generated by Svelte v2.16.0 */

	const serverBase$1 = window.serverBase || '//maps.kosmosnimki.ru/';
	// import Picture from './Picture.html';

	function index({ currentIndex }) {
		return currentIndex + 1;
	}

	function data$1() {
		return {
			filter: ''
		}
	}
	var methods$1 = {
		parseJSON(json) {
			console.log('zoomstart', arguments);
		}
	};

	function onstate$1({ changed, current, previous }) {
		//console.log('map onstate', changed, current, previous);
	}
	const file$1 = "src\\Top.html";

	function create_main_fragment$1(component, ctx) {
		var header, span2, span0, text0, text1, span1, text2, text3, span3, text5, span7, span4, text6, span5, text7, span6, current;

		var share = new Share({
			root: component.root,
			store: component.store
		});

		return {
			c: function create() {
				header = createElement("header");
				span2 = createElement("span");
				span0 = createElement("span");
				text0 = createText(ctx.index);
				text1 = createText("/");
				span1 = createElement("span");
				text2 = createText(ctx.count);
				text3 = createText("\n\t");
				span3 = createElement("span");
				span3.textContent = "vogue";
				text5 = createText("\n\t\n\n\t");
				span7 = createElement("span");
				span4 = createElement("span");
				share._fragment.c();
				text6 = createText("\n\t\t");
				span5 = createElement("span");
				text7 = createText("\n\t\t");
				span6 = createElement("span");
				span0.className = "index svelte-ggsij2";
				addLoc(span0, file$1, 2, 2, 59);
				span1.className = "total";
				addLoc(span1, file$1, 2, 37, 94);
				span2.className = "nav-item svelte-ggsij2";
				addLoc(span2, file$1, 1, 1, 33);
				span3.className = "logo svelte-ggsij2";
				addLoc(span3, file$1, 4, 1, 139);
				span4.className = "share svelte-ggsij2";
				addLoc(span4, file$1, 9, 2, 276);
				span5.className = "icon-y svelte-ggsij2";
				addLoc(span5, file$1, 10, 2, 315);
				span6.className = "icon-x svelte-ggsij2";
				addLoc(span6, file$1, 11, 2, 346);
				span7.className = "gallery-buttons svelte-ggsij2";
				addLoc(span7, file$1, 7, 1, 240);
				header.className = "gallery-header svelte-ggsij2";
				addLoc(header, file$1, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, header, anchor);
				append(header, span2);
				append(span2, span0);
				append(span0, text0);
				append(span2, text1);
				append(span2, span1);
				append(span1, text2);
				append(header, text3);
				append(header, span3);
				append(header, text5);
				append(header, span7);
				append(span7, span4);
				share._mount(span4, null);
				append(span7, text6);
				append(span7, span5);
				append(span7, text7);
				append(span7, span6);
				current = true;
			},

			p: function update(changed, ctx) {
				if (!current || changed.index) {
					setData(text0, ctx.index);
				}

				if (!current || changed.count) {
					setData(text2, ctx.count);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (share) share._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(header);
				}

				share.destroy();
			}
		};
	}

	function Top(options) {
		this._debugName = '<Top>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$1(), options.data);

		this._recompute({ currentIndex: 1 }, this._state);
		if (!('currentIndex' in this._state)) console.warn("<Top> was created without expected data property 'currentIndex'");

		if (!('count' in this._state)) console.warn("<Top> was created without expected data property 'count'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate$1];

		onstate$1.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$1(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Top.prototype, protoDev);
	assign(Top.prototype, methods$1);

	Top.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('index' in newState && !this._updatingReadonlyProperty) throw new Error("<Top>: Cannot set read-only property 'index'");
	};

	Top.prototype._recompute = function _recompute(changed, state) {
		if (changed.currentIndex) {
			if (this._differs(state.index, (state.index = index(state)))) changed.index = true;
		}
	};

	/* src\Picture.html generated by Svelte v2.16.0 */

	//import { fade, fly } from 'svelte-transitions';
	//in:fly="{x: 50}"
	//out:fade
	let touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

	function prefix({ item }) {
		return '//assets.vogue.com/photos/' + item.md + '/master/w_';
	}

	function posfix({ item }) {
		return ',c_limit/KIM_' + item.nm + '.jpg';
	}

	function imgNum({ currentIndex }) {
		return currentIndex + 1;
	}

	function data$2() {
		return {
			item: {},
			count: 0,
			currentIndex: 0,
			layers: {},
			//prefix: '//assets.vogue.com/photos/'
		}
	}
	var methods$2 = {
		touchstart(ev) {
			this._start = ev.touches[0].pageX;
	//console.log('touchstart', ev);
		},
		mouseClick(ev) {
			if (touchDevice) { return; }
			let {index, currentIndex, count} = this.get(),
				ind = index + (ev.clientX < ev.target.parentNode.clientWidth / 2 ? -1 : 1);

			//ind = ind >= count ? 0 : (ind < 0 ? count - 1 : ind);

			this.set({currentIndex: ind >= count ? 0 : (ind < 0 ? count - 1 : ind) });
	console.log('mouseClick', ev);
		},
		touchend(ev) {
			let {index, currentIndex, count} = this.get(),
				touche = ev.changedTouches ? ev.changedTouches[0] : ev,
				_start = this._start || 0,
				delta = touche.pageX - _start,
				ind = index + (delta > 0 ? -1 : (delta === 0 && touche.clientX < ev.target.parentNode.clientWidth / 2 ? -1 : 1));

			//ind = ind >= count ? 0 : (ind < 0 ? count - 1 : ind);

			this.set({currentIndex: ind >= count ? 0 : (ind < 0 ? count - 1 : ind) });
	console.log('touchend', ev);
		}
	};

	function onstate$2({ changed, current, previous }) {
		//console.log('Picture', changed, current, previous);
	}
	const file$2 = "src\\Picture.html";

	function create_main_fragment$2(component, ctx) {
		var img, img_class_value, img_srcset_value, img_src_value, current;

		function click_handler(event) {
			component.mouseClick(event);
		}

		function touchstart_handler(event) {
			component.touchstart(event);
		}

		function touchend_handler(event) {
			component.touchend(event);
		}

		return {
			c: function create() {
				img = createElement("img");
				addListener(img, "click", click_handler);
				addListener(img, "touchstart", touchstart_handler);
				addListener(img, "touchend", touchend_handler);
				img.className = img_class_value = "" + (ctx.currentIndex === ctx.index ? '' : 'hidden') + " svelte-1vyj006";
				img.srcset = img_srcset_value = "" + ctx.prefix + "320" + ctx.posfix + " 320w,\n             " + ctx.prefix + "450" + ctx.posfix + " 450w,\n             " + ctx.prefix + "600" + ctx.posfix + " 600w,\n             " + ctx.prefix + "640" + ctx.posfix + " 640w,\n             " + ctx.prefix + "760" + ctx.posfix + " 760w,\n             " + ctx.prefix + "900" + ctx.posfix + " 900w,\n             " + ctx.prefix + "1200" + ctx.posfix + " 1200w,\n             " + ctx.prefix + "1520" + ctx.posfix + " 1520w";
				img.sizes = "(max-width: 320px) 320px,\n            (max-width: 450px) 450px,\n            (max-width: 600px) 600px,\n            (max-width: 640px) 640px,\n            (max-width: 760px) 760px,\n            (max-width: 900px) 900px,\n            (max-width: 1200px) 1200px,\n            (max-width: 1520px) 1520px,\n            1520px";
				img.src = img_src_value = "" + ctx.prefix + "320" + ctx.posfix;
				img.alt = "";
				addLoc(img, file$2, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, img, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if ((changed.currentIndex || changed.index) && img_class_value !== (img_class_value = "" + (ctx.currentIndex === ctx.index ? '' : 'hidden') + " svelte-1vyj006")) {
					img.className = img_class_value;
				}

				if ((changed.prefix || changed.posfix) && img_srcset_value !== (img_srcset_value = "" + ctx.prefix + "320" + ctx.posfix + " 320w,\n             " + ctx.prefix + "450" + ctx.posfix + " 450w,\n             " + ctx.prefix + "600" + ctx.posfix + " 600w,\n             " + ctx.prefix + "640" + ctx.posfix + " 640w,\n             " + ctx.prefix + "760" + ctx.posfix + " 760w,\n             " + ctx.prefix + "900" + ctx.posfix + " 900w,\n             " + ctx.prefix + "1200" + ctx.posfix + " 1200w,\n             " + ctx.prefix + "1520" + ctx.posfix + " 1520w")) {
					img.srcset = img_srcset_value;
				}

				if ((changed.prefix || changed.posfix) && img_src_value !== (img_src_value = "" + ctx.prefix + "320" + ctx.posfix)) {
					img.src = img_src_value;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(img);
				}

				removeListener(img, "click", click_handler);
				removeListener(img, "touchstart", touchstart_handler);
				removeListener(img, "touchend", touchend_handler);
			}
		};
	}

	function Picture(options) {
		this._debugName = '<Picture>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$2(), options.data);

		this._recompute({ item: 1, currentIndex: 1 }, this._state);
		if (!('item' in this._state)) console.warn("<Picture> was created without expected data property 'item'");
		if (!('currentIndex' in this._state)) console.warn("<Picture> was created without expected data property 'currentIndex'");
		if (!('index' in this._state)) console.warn("<Picture> was created without expected data property 'index'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate$2];

		onstate$2.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$2(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Picture.prototype, protoDev);
	assign(Picture.prototype, methods$2);

	Picture.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('prefix' in newState && !this._updatingReadonlyProperty) throw new Error("<Picture>: Cannot set read-only property 'prefix'");
		if ('posfix' in newState && !this._updatingReadonlyProperty) throw new Error("<Picture>: Cannot set read-only property 'posfix'");
		if ('imgNum' in newState && !this._updatingReadonlyProperty) throw new Error("<Picture>: Cannot set read-only property 'imgNum'");
	};

	Picture.prototype._recompute = function _recompute(changed, state) {
		if (changed.item) {
			if (this._differs(state.prefix, (state.prefix = prefix(state)))) changed.prefix = true;
			if (this._differs(state.posfix, (state.posfix = posfix(state)))) changed.posfix = true;
		}

		if (changed.currentIndex) {
			if (this._differs(state.imgNum, (state.imgNum = imgNum(state)))) changed.imgNum = true;
		}
	};

	/* src\Bottom.html generated by Svelte v2.16.0 */

	const serverBase$2 = window.serverBase || '//maps.kosmosnimki.ru/';
	// import Picture from './Picture.html';

	function data$3() {
		return {
			filter: ''
		}
	}
	var methods$3 = {
		parseJSON(json) {
			console.log('zoomstart', arguments);
		}
	};

	function onstate$3({ changed, current, previous }) {
		//console.log('map onstate', changed, current, previous);
	}
	const file$3 = "src\\Bottom.html";

	function create_main_fragment$3(component, ctx) {
		var div4, div0, a0, text1, span, text2, div1, a1, text4, div2, text6, div3, current;

		var share = new Share({
			root: component.root,
			store: component.store
		});

		return {
			c: function create() {
				div4 = createElement("div");
				div0 = createElement("div");
				a0 = createElement("a");
				a0.textContent = "Spring 2019 Menswear";
				text1 = createText("\n\t\t");
				span = createElement("span");
				share._fragment.c();
				text2 = createText("\n\t");
				div1 = createElement("div");
				a1 = createElement("a");
				a1.textContent = "Alexander McQueen";
				text4 = createText("\n\t");
				div2 = createElement("div");
				div2.textContent = "collection";
				text6 = createText("\n\t");
				div3 = createElement("div");
				div3.textContent = "Photo: Kim WestonArnold / Indigital.tv";
				a0.className = "subtitle svelte-kc0ojk";
				a0.href = "/fashion-shows/spring-2019-menswear";
				addLoc(a0, file$3, 2, 2, 57);
				span.className = "right svelte-kc0ojk";
				addLoc(span, file$3, 3, 2, 147);
				div0.className = "subtitle-cont svelte-kc0ojk";
				addLoc(div0, file$3, 1, 1, 27);
				a1.href = "https://www.vogue.com/fashion-shows/designer/alexander-mcqueen";
				a1.className = "svelte-kc0ojk";
				addLoc(a1, file$3, 8, 2, 225);
				div1.className = "headline svelte-kc0ojk";
				addLoc(div1, file$3, 7, 1, 200);
				div2.className = "collection svelte-kc0ojk";
				addLoc(div2, file$3, 10, 1, 329);
				div3.className = "bottom svelte-kc0ojk";
				addLoc(div3, file$3, 11, 1, 371);
				div4.className = "bottom-cont svelte-kc0ojk";
				addLoc(div4, file$3, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div4, anchor);
				append(div4, div0);
				append(div0, a0);
				append(div0, text1);
				append(div0, span);
				share._mount(span, null);
				append(div4, text2);
				append(div4, div1);
				append(div1, a1);
				append(div4, text4);
				append(div4, div2);
				append(div4, text6);
				append(div4, div3);
				current = true;
			},

			p: noop,

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (share) share._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div4);
				}

				share.destroy();
			}
		};
	}

	function Bottom(options) {
		this._debugName = '<Bottom>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$3(), options.data);
		this._intro = !!options.intro;

		this._handlers.state = [onstate$3];

		onstate$3.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$3(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(Bottom.prototype, protoDev);
	assign(Bottom.prototype, methods$3);

	Bottom.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\App.html generated by Svelte v2.16.0 */

	const serverBase$3 = window.serverBase || '//maps.kosmosnimki.ru/';
	//import GallerySlide from './GallerySlide.html';
	// it = {nm: 2206, md: '5b2d26fe748d2059b8363ab6'}
	function count({ pictureItems }) {
		return pictureItems.length;
	}

	function data$4() {
		return {
			pictureItems: [
				{md: '5b2d273b47b9940fb269b91f', nm: 2228}, 
				{md: '5b2d273c7357fe57e6f1737b', nm: 2254}, 
				{md: '5b2d277a7357fe57e6f1737d', nm: 2272}, 
				{md: '5b2d27ba748d2059b8363aba', nm: 2296}, 
				{md: '5b2d27bb13302553811d855f', nm: 2316}, 
				{md: '5b2d27f8f90cc35fe4d59ec2', nm: 2338}, 
				{md: '5b2d27fb405ee337f2a03593', nm: 2354}, 
				{md: '5b2d27fc47b9940fb269b921', nm: 2370}, 
				{md: '5b2d283c30f94b78490af428', nm: 2384}, 
				{md: '5b2d283d405ee337f2a03596', nm: 2400}, 
				{md: '5b2d287e748d2059b8363abf', nm: 2414}, 
				{md: '5b2d28807e0ad8413011aab9', nm: 2430}, 
				{md: '5b2d287f4c6bbc393b0c95d2', nm: 2444}, 
				{md: '5b2d28bc73868676444b51b5', nm: 2456}, 
				{md: '5b2d28bd73868676444b51b7', nm: 2474}, 
				{md: '5b2d28be4c6bbc393b0c95d4', nm: 2486}, 
				{md: '5b2d28fbdfb55f5d708a2ce9', nm: 2504}, 
				{md: '5b2d28fc405ee337f2a03599', nm: 2518}, 
				{md: '5b2d28fddfb55f5d708a2ceb', nm: 2532}, 
				{md: '5b2d26fe748d2059b8363ab6', nm: 2206}
			],
			currentIndex: 0,
			layers: {},
			filter: ''
		}
	}
	var methods$4 = {
		parseJSON(json) {
			console.log('zoomstart', arguments);
		}
	};

	function onstate$4({ changed, current, previous }) {
		//console.log('map onstate', changed, current, previous);
	}
	const file$4 = "src\\App.html";

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.it = list[i];
		child_ctx.i = i;
		return child_ctx;
	}

	function create_main_fragment$4(component, ctx) {
		var div1, text0, div0, text1, current;

		var top_initial_data = {
		 	currentIndex: ctx.currentIndex,
		 	count: ctx.count
		 };
		var top = new Top({
			root: component.root,
			store: component.store,
			data: top_initial_data
		});

		var each_value = ctx.pictureItems;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(() => {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		var bottom = new Bottom({
			root: component.root,
			store: component.store
		});

		return {
			c: function create() {
				div1 = createElement("div");
				top._fragment.c();
				text0 = createText("\n\n");
				div0 = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text1 = createText("\n");
				bottom._fragment.c();
				div0.className = "slick-list svelte-1l49egf";
				addLoc(div0, file$4, 3, 0, 80);
				div1.className = "gallery-meyer svelte-1l49egf";
				addLoc(div1, file$4, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div1, anchor);
				top._mount(div1, null);
				append(div1, text0);
				append(div1, div0);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(div0, null);
				}

				append(div1, text1);
				bottom._mount(div1, null);
				current = true;
			},

			p: function update(changed, ctx) {
				var top_changes = {};
				if (changed.currentIndex) top_changes.currentIndex = ctx.currentIndex;
				if (changed.count) top_changes.count = ctx.count;
				top._set(top_changes);

				if (changed.pictureItems || changed.count || changed.currentIndex) {
					each_value = ctx.pictureItems;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(div0, null);
					}
					for (; i < each_blocks.length; i += 1) outroBlock(i, 1);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 3);

				if (top) top._fragment.o(outrocallback);

				each_blocks = each_blocks.filter(Boolean);
				const countdown = callAfter(outrocallback, each_blocks.length);
				for (let i = 0; i < each_blocks.length; i += 1) outroBlock(i, 0, countdown);

				if (bottom) bottom._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div1);
				}

				top.destroy();

				destroyEach(each_blocks, detach);

				bottom.destroy();
			}
		};
	}

	// (5:0) {#each pictureItems as it, i}
	function create_each_block(component, ctx) {
		var picture_updating = {}, current;

		var picture_initial_data = {
		 	item: ctx.it,
		 	index: ctx.i,
		 	count: ctx.count
		 };
		if (ctx.currentIndex  !== void 0) {
			picture_initial_data.currentIndex = ctx.currentIndex ;
			picture_updating.currentIndex = true;
		}
		var picture = new Picture({
			root: component.root,
			store: component.store,
			data: picture_initial_data,
			_bind(changed, childState) {
				var newState = {};
				if (!picture_updating.currentIndex && changed.currentIndex) {
					newState.currentIndex = childState.currentIndex;
				}
				component._set(newState);
				picture_updating = {};
			}
		});

		component.root._beforecreate.push(() => {
			picture._bind({ currentIndex: 1 }, picture.get());
		});

		return {
			c: function create() {
				picture._fragment.c();
			},

			m: function mount(target, anchor) {
				picture._mount(target, anchor);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				var picture_changes = {};
				if (changed.pictureItems) picture_changes.item = ctx.it;
				if (changed.count) picture_changes.count = ctx.count;
				if (!picture_updating.currentIndex && changed.currentIndex) {
					picture_changes.currentIndex = ctx.currentIndex ;
					picture_updating.currentIndex = ctx.currentIndex  !== void 0;
				}
				picture._set(picture_changes);
				picture_updating = {};
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (picture) picture._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				picture.destroy(detach);
			}
		};
	}

	function App(options) {
		this._debugName = '<App>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data$4(), options.data);

		this._recompute({ pictureItems: 1 }, this._state);
		if (!('pictureItems' in this._state)) console.warn("<App> was created without expected data property 'pictureItems'");
		if (!('currentIndex' in this._state)) console.warn("<App> was created without expected data property 'currentIndex'");
		this._intro = !!options.intro;

		this._handlers.state = [onstate$4];

		onstate$4.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$4(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(App.prototype, protoDev);
	assign(App.prototype, methods$4);

	App.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('count' in newState && !this._updatingReadonlyProperty) throw new Error("<App>: Cannot set read-only property 'count'");
	};

	App.prototype._recompute = function _recompute(changed, state) {
		if (changed.pictureItems) {
			if (this._differs(state.count, (state.count = count(state)))) changed.count = true;
		}
	};

	const app = new App({
		target: document.body,
		data: {
			name: 'world'
		}
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
