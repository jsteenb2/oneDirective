(function(angular) {
  'use strict';

  var module = angular.module('angularEffDrop', ['ng']),
      extend = angular.extend;

  module.provider('dropWrapper', [function() {
    // Default template for tooltips.
    var defaultTemplateUrl = 'template/eff-drop.html'
    this.setDefaultTemplateUrl = function(templateUrl) {
      defaultTemplateUrl = templateUrl;
    };

    var defaultTetherOptions = {
    };
    this.setDefaultTetherOptions = function(options) {
      extend(defaultTetherOptions, options);
    };

    this.$get = [ '$rootScope', '$compile', '$templateCache', function($rootScope, $compile, $templateCache) {
      return function(options) {
        options = options || {};
        var templateUrl = options.templateUrl || defaultTemplateUrl,
            template    = options.template || $templateCache.get(templateUrl),
            scope       = options.scope || $rootScope.$new(),
            elem        = $compile(template)(scope),
            drop;
        var opts = {
            target: options.target[0],
            content: elem[0],
            position: options.position || 'bottom left',
            openOn: options.openOn || undefined,
            openDelay: options.openDelay || undefined,
            closeDelay: options.closeDelay || undefined,
            constrainToWindow: options.constrainToWindow || true,
            constrainToScrollParent: options.constrainToScrollParent || true,
            classes: options.classes || 'drop-theme-arrows-bounce-dark',
            remove: false,
            tetherOptions: options.tetherOptions || defaultTetherOptions,
        };
        if ((opts.content == null) || (opts.content == undefined))
        {
          console.error('content of (', templateUrl || template, ')', opts.content);
          throw("'templateUrl' or 'template' parameter is incorrect !");
        }

        /**
         * Create a drop for the target and the template.
         */
        function attachDrop() {
          if (drop)
            detachDrop();
          drop = new Drop(opts);
        };

      	/**
         * Detach the drop.
         */
        function detachDrop() {
          if ((drop) && (drop.isOpened()))
          {
            drop.destroy();
            drop = undefined;
          }
        };

      	/**
         * Open the drop
         */
        function open(fn) {
          if (typeof(fn) == 'function')
           fn(scope, true);
          attachDrop();
          if (!drop.isOpened())
          {
            drop.open();
          }
        };

      	/**
         * Close the drop
         */
        function close(fn) {
          if (typeof (fn) == 'function')
            fn(scope, false);
          detachDrop();
        };

        function toogle(fn) {
          if ((drop) && (drop.isOpened()))
          {
            close(fn);
          }
          else
          {
            open(fn);
          }
        };

        function isOpened() {
          if ((drop) && (drop.isOpened()))
            return true;
          return false;
        }

        // Close the tooltip when the scope is destroyed.
        scope.$on('$destroy', close);
        // Prepare the tooltip to be shown when the scope is created.
        attachDrop();

        return {
          open: open,
          close: close,
          toogle: toogle,
          isOpened: isOpened
        };
      };
    }];
  }]);

  module.provider('effDropFactory', [function() {
    /**
     * Returns a factory function for building a directive for tooltips.
     *
     * @param {String} name - The name of the directive.
     */
    this.$get = [ 'dropWrapper', function(wrapper) {
      return function(name, options) {
        return {
          restrict: 'EA',
          scope: {
            content:  '@' + name
          },
          link: function(scope, elem, attrs) {
            var drop = wrapper(angular.extend({
              target: elem,
              scope: scope,

            }, options));

            /**
             * Toggle the drop.
             */
            $(elem).hover(function mouseenter() {
              scope.$apply(drop.open);
            }, function mouseleave() {
              scope.$apply(drop.close);
            });
          }
        };
      };
    }];
  }]);

  module.directive('effDrop', ['effDropFactory', function(provider) {
    return provider('effDrop');
  }]);

  module.run(['$templateCache', function($templateCache) {
    $templateCache.put('template/eff-drop.html', '<div class="eff-drop">{{content}}</div>');
  }]);

})(angular);
