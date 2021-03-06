/*
Copyright 2014, KISSY v1.50
MIT Licensed
build time: Jan 16 20:32
*/
/*
 Combined modules by KISSY Module Compiler: 

 navigation-view/bar-xtpl
 navigation-view/bar-render
 navigation-view/bar
 navigation-view
*/

KISSY.add("navigation-view/bar-xtpl", [], function(S, require, exports, module) {
  return function(scope, S, undefined) {
    var buffer = "", config = this.config, engine = this, moduleWrap, utils = config.utils;
    if(typeof module !== "undefined" && module.kissy) {
      moduleWrap = module
    }
    var runBlockCommandUtil = utils.runBlockCommand, renderOutputUtil = utils.renderOutput, getPropertyUtil = utils.getProperty, runInlineCommandUtil = utils.runInlineCommand, getPropertyOrRunCommandUtil = utils.getPropertyOrRunCommand;
    buffer += "";
    var config0 = {};
    var params1 = [];
    var id2 = getPropertyUtil(engine, scope, "withTitle", 0, 1);
    params1.push(id2);
    config0.params = params1;
    config0.fn = function(scope) {
      var buffer = "";
      buffer += '\r\n<div class="';
      var config4 = {};
      var params5 = [];
      params5.push("title-wrap");
      config4.params = params5;
      var id3 = runInlineCommandUtil(engine, scope, config4, "getBaseCssClasses", 2);
      buffer += renderOutputUtil(id3, true);
      buffer += '">\r\n    <div class="';
      var config7 = {};
      var params8 = [];
      params8.push("title");
      config7.params = params8;
      var id6 = runInlineCommandUtil(engine, scope, config7, "getBaseCssClasses", 3);
      buffer += renderOutputUtil(id6, true);
      buffer += '" id="ks-navigation-bar-title-';
      var id9 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 3);
      buffer += renderOutputUtil(id9, true);
      buffer += '">';
      var id10 = getPropertyOrRunCommandUtil(engine, scope, {}, "title", 0, 3);
      buffer += renderOutputUtil(id10, true);
      buffer += "</div>\r\n</div>\r\n";
      return buffer
    };
    buffer += runBlockCommandUtil(engine, scope, config0, "if", 1);
    buffer += '\r\n<div class="';
    var config12 = {};
    var params13 = [];
    params13.push("content");
    config12.params = params13;
    var id11 = runInlineCommandUtil(engine, scope, config12, "getBaseCssClasses", 6);
    buffer += renderOutputUtil(id11, true);
    buffer += '" id="ks-navigation-bar-content-';
    var id14 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 6);
    buffer += renderOutputUtil(id14, true);
    buffer += '">\r\n    <div class="';
    var config16 = {};
    var params17 = [];
    params17.push("center");
    config16.params = params17;
    var id15 = runInlineCommandUtil(engine, scope, config16, "getBaseCssClasses", 7);
    buffer += renderOutputUtil(id15, true);
    buffer += '" id="ks-navigation-bar-center-';
    var id18 = getPropertyOrRunCommandUtil(engine, scope, {}, "id", 0, 7);
    buffer += renderOutputUtil(id18, true);
    buffer += '"></div>\r\n</div>';
    return buffer
  }
});
KISSY.add("navigation-view/bar-render", ["./bar-xtpl", "component/control"], function(S, require) {
  var tpl = require("./bar-xtpl");
  var Control = require("component/control");
  return Control.getDefaultRender().extend({createDom:function() {
    var selectors = {centerEl:"#ks-navigation-bar-center-{id}", contentEl:"#ks-navigation-bar-content-{id}"};
    if(this.control._withTitle) {
      selectors.titleEl = "#ks-navigation-bar-title-{id}"
    }
    this.fillChildrenElsBySelectors(selectors)
  }, _onSetTitle:function(v) {
    if(this.control._withTitle) {
      this.control.get("titleEl").html(v)
    }
  }, _onSetBackText:function(v) {
    if(this.control._backBtn) {
      this.control._backBtn.set("content", v)
    }
  }}, {ATTRS:{contentTpl:{value:tpl}}})
});
KISSY.add("navigation-view/bar", ["component/control", "./bar-render", "button"], function(S, require) {
  var Control = require("component/control");
  var BarRender = require("./bar-render");
  var Button = require("button");
  function createGhost(elem) {
    var ghost, width;
    ghost = elem.clone(true);
    ghost[0].id = elem[0].id + "-proxy";
    elem.parent().append(ghost);
    var offset = elem.offset();
    ghost.css("position", "absolute");
    ghost.offset(offset);
    ghost.css({width:width = elem.css("width"), height:elem.css("height")});
    return ghost
  }
  function anim(el, props, complete) {
    el.animate(props, {duration:0.25, useTransition:true, easing:"ease-in-out", complete:complete})
  }
  function getAnimProps(self, backEl, backElProps, reverse) {
    var barElement = self.get("el"), titleElement = self.get("titleEl"), minOffset = Math.min(barElement[0].offsetWidth / 3, 200), newLeftWidth = backEl[0].offsetWidth, barWidth = barElement[0].offsetWidth, titleX = titleElement.offset().left - barElement.offset().left, titleWidth = titleElement[0].offsetWidth, oldBackWidth = backElProps.width, newOffset, oldOffset, backElAnims, titleAnims, omega, theta;
    if(reverse) {
      newOffset = -oldBackWidth;
      oldOffset = Math.min(titleX - oldBackWidth, minOffset)
    }else {
      oldOffset = -oldBackWidth;
      newOffset = Math.min(titleX, minOffset)
    }
    backElAnims = {element:{from:{transform:"translateX(" + newOffset + "px) translateZ(0)"}, to:{transform:"translateX(0) translateZ(0)", opacity:1}}, ghost:{to:{transform:"translateX(" + oldOffset + "px) translateZ(0)", opacity:0}}};
    theta = -titleX + newLeftWidth;
    if(titleWidth > titleX) {
      omega = -titleX - titleWidth
    }
    if(reverse) {
      oldOffset = barWidth - titleX - titleWidth;
      if(omega !== undefined) {
        newOffset = omega
      }else {
        newOffset = theta
      }
    }else {
      newOffset = barWidth - titleX - titleWidth;
      if(omega !== undefined) {
        oldOffset = omega
      }else {
        oldOffset = theta
      }
      newOffset = Math.max(0, newOffset)
    }
    titleAnims = {element:{from:{transform:"translateX(" + newOffset + "px) translateZ(0)"}, to:{transform:"translateX(0) translateZ(0)", opacity:1}}, ghost:{to:{transform:"translateX(" + oldOffset + "px) translateZ(0)", opacity:0}}};
    return{back:backElAnims, title:titleAnims}
  }
  function onBackButtonClick() {
    this.fire("back")
  }
  return Control.extend({initializer:function() {
    this._withTitle = this.get("withTitle")
  }, renderUI:function() {
    var self = this, prefixCls = self.get("prefixCls");
    self._buttons = {};
    if(self.get("withBackButton")) {
      self._backBtn = (new Button({prefixCls:prefixCls + "navigation-bar-", elCls:prefixCls + "navigation-bar-back", elBefore:self.get("contentEl")[0].firstChild, visible:false, content:self.get("backText")})).render()
    }
  }, bindUI:function() {
    if(this._backBtn) {
      this._backBtn.on("click", onBackButtonClick, this)
    }
  }, addButton:function(name, config) {
    var self = this, prefixCls = self.get("prefixCls");
    config.prefixCls = prefixCls + "navigation-bar-";
    if(!config.elBefore && !config.render) {
      var align = config.align = config.align || "left";
      if(align === "left") {
        config.elBefore = self.get("centerEl")
      }else {
        if(align === "right") {
          config.render = self.get("contentEl")
        }
      }
      delete config.align
    }
    self._buttons[name] = (new Button(config)).render();
    return self._buttons[name]
  }, insertButtonBefore:function(name, config, button) {
    config.elBefore = button.get("el");
    return this.addButton(name, config)
  }, removeButton:function(name) {
    this._buttons[name].destroy();
    delete this._buttons[name]
  }, getButton:function(name) {
    return this._buttons[name]
  }, forward:function(title) {
    this.go(title, true)
  }, go:function(title, hasPrevious, reverse) {
    var self = this;
    var backBtn = self._backBtn;
    if(!(backBtn && self._withTitle)) {
      if(self._withTitle) {
        self.get("titleEl").html(title)
      }
      if(backBtn) {
        backBtn[hasPrevious ? "show" : "hide"]()
      }
      return
    }
    var backEl = backBtn.get("el");
    backEl.stop(true);
    if(self.ghostBackEl) {
      self.ghostBackEl.stop(true)
    }
    var backElProps = {width:backEl[0].offsetWidth};
    var ghostBackEl = createGhost(backEl);
    self.ghostBackEl = ghostBackEl;
    backEl.css("opacity", 0);
    backBtn[hasPrevious ? "show" : "hide"]();
    if(self.ghostBackEl) {
      self.ghostBackEl.stop(true)
    }
    var anims = getAnimProps(self, backEl, backElProps, reverse);
    backEl.css(anims.back.element.from);
    if(backBtn.get("visible")) {
      anim(backEl, anims.back.element.to)
    }
    if(ghostBackEl.css("display") !== "none") {
      anim(ghostBackEl, anims.back.ghost.to, function() {
        ghostBackEl.remove();
        self.ghostBackEl = null
      })
    }else {
      ghostBackEl.remove();
      self.ghostBackEl = null
    }
    var titleEl = self.get("titleEl");
    titleEl.stop(true);
    var ghostTitleEl = createGhost(titleEl.parent());
    self.ghostTitleEl = ghostTitleEl;
    titleEl.css("opacity", 0);
    self.set("title", title);
    titleEl.css(anims.title.element.from);
    anim(titleEl, anims.title.element.to);
    anim(ghostTitleEl, anims.title.ghost.to, function() {
      ghostTitleEl.remove();
      self.ghostTitleEl = null
    })
  }, back:function(title, hasPrevious) {
    this.go(title, hasPrevious, true)
  }}, {xclass:"navigation-bar", ATTRS:{handleMouseEvents:{value:false}, focusable:{value:false}, xrender:{value:BarRender}, centerEl:{}, contentEl:{}, titleEl:{}, title:{value:"", view:1}, withBackButton:{value:1}, withTitle:{value:1, view:1}, backText:{value:"Back", view:1}}})
});
KISSY.add("navigation-view", ["node", "component/container", "navigation-view/bar", "component/extension/content-xtpl", "component/extension/content-render"], function(S, require) {
  var $ = require("node").all;
  var Container = require("component/container");
  var Bar = require("navigation-view/bar");
  var ContentTpl = require("component/extension/content-xtpl");
  var ContentRender = require("component/extension/content-render");
  var LOADING_HTML = '<div class="{prefixCls}navigation-view-loading">' + '<div class="{prefixCls}navigation-view-loading-outer">' + '<div class="{prefixCls}navigation-view-loading-inner"></div>' + "</div>" + "</div>";
  var uuid = 0;
  var NavigationViewRender = Container.getDefaultRender().extend([ContentRender], {renderUI:function() {
    var loadingEl = $(S.substitute(LOADING_HTML, {prefixCls:this.control.get("prefixCls")}));
    this.control.get("contentEl").append(loadingEl);
    this.control.loadingEl = loadingEl
  }});
  function onBack(e) {
    if(e.target === this.get("bar")) {
      this.pop()
    }
  }
  function getViewInstance(navigationView, config) {
    var children = navigationView.get("children");
    var viewId = config.viewId;
    for(var i = 0;i < children.length;i++) {
      if(children[i].constructor.xclass === config.xclass) {
        if(viewId) {
          if(children[i].get("viewId") === viewId) {
            return children[i]
          }
        }else {
          return children[i]
        }
      }
    }
    return null
  }
  function gc(navigationView) {
    var children = navigationView.get("children").concat();
    var viewCacheSize = navigationView.get("viewCacheSize");
    if(children.length <= viewCacheSize) {
      return
    }
    var removedSize = Math.floor(viewCacheSize / 3);
    children.sort(function(a, b) {
      return a.uuid - b.uuid
    });
    for(var i = 0;i < removedSize;i++) {
      navigationView.removeChild(children[i])
    }
  }
  function getAnimCss(self, css, enter) {
    return self.view.getBaseCssClass("anim-" + css + "-" + (enter ? "enter" : "leave"))
  }
  function trimClassName(className) {
    return S.trim(className).replace(/\s+/, " ")
  }
  function animateEl(el, self, css) {
    var className = el[0].className, originalClassName = className;
    if(className.match(self.animateClassRegExp)) {
      className = className.replace(self.animateClassRegExp, css)
    }else {
      className += " " + css
    }
    if(css) {
      if(className.indexOf(self.animatorClass) === -1) {
        className += " " + self.animatorClass
      }
    }
    if(className !== originalClassName) {
      el[0].className = trimClassName(className)
    }
  }
  function stopAnimateEl(el, self) {
    var className = el[0].className, originalClassName = className;
    className = className.replace(self.animateClassRegExp, "").replace(self.animatorClassRegExp, "");
    if(className !== originalClassName) {
      el[0].className = trimClassName(className)
    }
  }
  function postProcessSwitchView(self, nextView) {
    var promise = nextView.promise;
    self.set("activeView", nextView);
    gc(self);
    if(promise) {
      promise.then(function() {
        var activeView = self.get("activeView");
        if(activeView && activeView.uuid === nextView.uuid) {
          self.get("bar").set("title", nextView.get("title") || "");
          stopAnimateEl(self.loadingEl, self);
          animateEl(nextView.get("el"), self, self.animateNoneEnterClass)
        }
      })
    }
  }
  function processSwitchView(self, config, nextView, enterAnimCssClass, leaveAnimCssClass) {
    var loadingEl = self.loadingEl;
    var activeView = self.get("activeView");
    if(activeView && activeView.leave) {
      activeView.leave()
    }
    var nextViewEl = nextView.get("el");
    nextView.set(config);
    if(nextView.enter) {
      nextView.enter()
    }
    var promise = nextView.promise;
    if(activeView) {
      animateEl(activeView.get("el"), self, leaveAnimCssClass)
    }
    if(promise) {
      if(activeView) {
        animateEl(loadingEl, self, enterAnimCssClass)
      }else {
        animateEl(loadingEl, self, self.animateNoneEnterClass)
      }
      stopAnimateEl(nextViewEl, self)
    }else {
      if(self.isLoading() || !activeView) {
        stopAnimateEl(loadingEl, self);
        animateEl(nextViewEl, self, self.animateNoneEnterClass)
      }else {
        animateEl(nextViewEl, self, enterAnimCssClass)
      }
    }
  }
  return Container.extend({initializer:function() {
    this.publish("back", {defaultFn:onBack, defaultTargetOnly:false})
  }, isLoading:function() {
    return this.loadingEl.hasClass(this.animatorClass)
  }, renderUI:function() {
    var self = this;
    this.animateClassRegExp = new RegExp(this.view.getBaseCssClass() + "-anim-[^\\s]+");
    this.animatorClass = this.view.getBaseCssClass("animator");
    this.animateNoneEnterClass = getAnimCss(self, "none", true);
    this.animatorClassRegExp = new RegExp(this.animatorClass);
    this.viewStack = [];
    var bar;
    var barCfg = this.get("barCfg");
    barCfg.elBefore = this.get("el")[0].firstChild;
    this.setInternal("bar", bar = (new Bar(barCfg)).render());
    bar.addTarget(this)
  }, createView:function(config) {
    var self = this;
    var nextView = getViewInstance(self, config);
    if(!nextView) {
      nextView = self.addChild(config)
    }
    return nextView
  }, push:function(config) {
    var self = this, nextView, animation, enterAnimation, leaveAnimation, enterAnimCssClass, leaveAnimCssClass, bar, promise, activeView, viewStack = self.viewStack;
    activeView = self.get("activeView");
    bar = self.get("bar");
    config.animation = config.animation || self.get("animation");
    if(!activeView) {
      config.animation = {}
    }
    nextView = self.createView(config);
    nextView.uuid = uuid++;
    viewStack.push(config);
    animation = nextView.get("animation");
    enterAnimation = animation.enter;
    leaveAnimation = animation.leave;
    if(activeView) {
      leaveAnimation = activeView.get("animation").leave || leaveAnimation
    }
    promise = nextView.promise;
    enterAnimCssClass = getAnimCss(self, enterAnimation, true);
    leaveAnimCssClass = getAnimCss(self, leaveAnimation);
    processSwitchView(self, config, nextView, enterAnimCssClass, leaveAnimCssClass);
    if(activeView) {
      bar.forward(nextView.get("title") || "")
    }else {
      if(!promise) {
        bar.set("title", nextView.get("title") || "")
      }
    }
    postProcessSwitchView(self, nextView)
  }, replace:function(config) {
    var self = this, viewStack = self.viewStack;
    S.mix(viewStack[viewStack.length - 1], config)
  }, pop:function() {
    var self = this, activeView, config, nextView, enterAnimCssClass, leaveAnimCssClass, viewStack = self.viewStack;
    if(viewStack.length > 1) {
      viewStack.pop();
      activeView = self.get("activeView");
      config = viewStack[viewStack.length - 1];
      nextView = self.createView(config);
      nextView.uuid = uuid++;
      enterAnimCssClass = getAnimCss(self, nextView.get("animation").leave || activeView.get("animation").leave, true);
      leaveAnimCssClass = getAnimCss(self, activeView.get("animation").enter);
      processSwitchView(self, config, nextView, enterAnimCssClass, leaveAnimCssClass);
      self.get("bar").back(nextView.get("title") || "", viewStack.length > 1);
      postProcessSwitchView(self, nextView)
    }
  }}, {xclass:"navigation-view", ATTRS:{barCfg:{value:{}}, animation:{value:{enter:"slide-right", leave:"slide-left"}}, handleMouseEvents:{value:false}, viewCacheSize:{value:20}, focusable:{value:false}, allowTextSelection:{value:true}, xrender:{value:NavigationViewRender}, contentTpl:{value:ContentTpl}, defaultChildCfg:{value:{handleMouseEvents:false, allowTextSelection:true}}}})
});

