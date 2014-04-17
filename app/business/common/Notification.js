/**
 * notification
 *
 * @author  miaojian(miaojian@wandoujia.com)
 */

define([
    'angular',
    'jQuery'
], function (angular, $) {
    'use strict';

    angular.module('notificationModule', [])

    .factory('notification', [ '$rootScope', '$window',

        function ($rootScope, $window) {

            var win = $window,
                PERMISSION_DEFAULT = 'default',
                PERMISSION_GRANTED = 'granted',
                PERMISSION_DENIED = 'denied',
                PERMISSION = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED],
                defaultSetting = {
                    pageVisibility: true,
                    autoClose: 2000
                },
                empty = {},
                emptyString = '',
                isSupported = (function () {
                    var isSupported = false;
                    try {
                        isSupported = !!(win.Notification || /* Chrome & ff-html5notifications plugin */win.webkitNotifications || /* Firefox Mobile */navigator.mozNotification || /* IE9+ */(win.external && win.external.msIsSiteMode() !== undefined));
                    } catch (e) {}
                    return isSupported;
                }()),
                ieVerification = Math.floor((Math.random() * 10) + 1),
                isFunction = function (value) { return (value && (value).constructor === Function); },
                isString = function (value) {return (value && (value).constructor === String); },
                isObject = function (value) {return (value && (value).constructor === Object); },
                /**
                 * Dojo Mixin
                 */
                mixin = function (target, source) {
                    var name, s;
                    for (name in source) {

                        if (source.hasOwnerProperty(name)) {
                            s = source[name];
                            if (!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))) {
                                target[name] = s;
                            }
                        }
                    }
                    return target; // Object
                },
                noop = function () {},
                settings = defaultSetting;
            function getNotification(title, options) {
                var notification;
                if (win.Notification) { /* Safari 6, Chrome (23+) */
                    notification =  new win.Notification(title, {
                        /* The notification's icon - For Chrome in Windows, Linux & Chrome OS */
                        icon: isString(options.icon) ? options.icon : options.icon.x32,
                        /* The notification’s subtitle. */
                        body: options.body || emptyString,
                        /*
                            The notification’s unique identifier.
                            This prevents duplicate entries from appearing if the user has multiple instances of your website open at once.
                        */
                        tag: options.tag || emptyString
                    });
                } else if (win.webkitNotifications) { /* FF with html5Notifications plugin installed */
                    notification = win.webkitNotifications.createNotification(options.icon, title, options.body);
                    notification.show();
                } else if (navigator.mozNotification) { /* Firefox Mobile */
                    notification = navigator.mozNotification.createNotification(title, options.body, options.icon);
                    notification.show();
                } else if (win.external && win.external.msIsSiteMode()) { /* IE9+ */
                    //Clear any previous notifications
                    win.external.msSiteModeClearIconOverlay();
                    win.external.msSiteModeSetIconOverlay((isString(options.icon) ? options.icon : options.icon.x16), title);
                    win.external.msSiteModeActivate();
                    notification = {
                        'ieVerification': ieVerification + 1
                    };
                }
                return notification;
            }
            function getWrapper(notification) {
                return {
                    close: function () {
                        if (notification) {
                            if (notification.close) {
                                //http://code.google.com/p/ff-html5notifications/issues/detail?id=58
                                notification.close();
                            } else if (win.external && win.external.msIsSiteMode()) {
                                if (notification.ieVerification === ieVerification) {
                                    win.external.msSiteModeClearIconOverlay();
                                }
                            }
                        }
                    }
                };
            }
            function requestPermission(callback) {
                if (!isSupported) { return; }
                var callbackFunction = isFunction(callback) ? callback : noop;
                if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
                    /*
                     * Chrome 23 supports win.Notification.requestPermission, but it
                     * breaks the browsers, so use the old-webkit-prefixed
                     * win.webkitNotifications.checkPermission instead.
                     *
                     * Firefox with html5notifications plugin supports this method
                     * for requesting permissions.
                     */
                    win.webkitNotifications.requestPermission(callbackFunction);
                } else if (win.Notification && win.Notification.requestPermission) {
                    win.Notification.requestPermission(callbackFunction);
                }
            }
            function permissionLevel() {
                var permission;
                if (!isSupported) { return; }
                if (win.Notification && win.Notification.permissionLevel) {
                    //Safari 6
                    permission = win.Notification.permissionLevel();
                } else if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
                    //Chrome & Firefox with html5-notifications plugin installed
                    permission = PERMISSION[win.webkitNotifications.checkPermission()];
                } else if (navigator.mozNotification) {
                    //Firefox Mobile
                    permission = PERMISSION_GRANTED;
                } else if (win.Notification && win.Notification.permission) {
                    // Firefox 23+
                    permission = win.Notification.permission;
                } else if (win.external && (win.external.msIsSiteMode() !== undefined)) { /* keep last */
                    //IE9+
                    permission = win.external.msIsSiteMode() ? PERMISSION_GRANTED : PERMISSION_DEFAULT;
                }
                return permission;
            }
            /**
             *
             */
            function config(params) {
                if (params && isObject(params)) {
                    mixin(settings, params);
                }
                return settings;
            }
            function isDocumentHidden() {
                return settings.pageVisibility ? (document.hidden || document.msHidden || document.mozHidden || document.webkitHidden) : true;
            }
            function createNotification(title, options) {
                var notification,
                    notificationWrapper;

                console.info('isDocumentHidden', isDocumentHidden());
                if (isSupported && isDocumentHidden() && isString(title) && (options && (isString(options.icon) || isObject(options.icon))) && (permissionLevel() === PERMISSION_GRANTED)) {
                    notification = getNotification(title, options);
                }
                notificationWrapper = getWrapper(notification);
                //Auto-close notification
                if (settings.autoClose && notification && !notification.ieVerification && notification.addEventListener) {
                    notification.addEventListener('show', function () {
                        var notification = notificationWrapper;
                        win.setTimeout(function () {
                            notification.close();
                        }, settings.autoClose);
                    });
                }
                return notificationWrapper;
            }

            return {
                PERMISSION_DEFAULT: PERMISSION_DEFAULT,
                PERMISSION_GRANTED: PERMISSION_GRANTED,
                PERMISSION_DENIED: PERMISSION_DENIED,
                isSupported: isSupported,
                config: config,
                createNotification: createNotification,
                permissionLevel: permissionLevel,
                requestPermission: requestPermission
            };
        }
    ]);
});
