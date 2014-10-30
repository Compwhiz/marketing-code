/*
* jQuery Experient extension
* Version 1.0.0 (3/14/2012)
*
* Menglin An
* Copyright 2012, Experient
* http://www.experient-inc.com
*
*/

$.extend({
    efndtnmodal: {
        isOpen: function (id) {
            return $('#' + id).hasClass('open') === true;
        },
        close: function (id) {
            if ($.efndtnmodal.isOpen(id)) {
                $('#' + id).foundation('reveal', 'close');
            }
            else {
                $(document).on('opened.fndtn.reveal', '#' + id, function (e) {
                    //foundation bug where events get fired twice; check for specific namespace 
                    if (e.namespace == 'fndtn.reveal') {
                        console.log('experient:  opened.fndtn.reveal');
                        //using off with the selector doesn't seem to work here...
                        $(document).off('opened.fndtn.reveal');
                        //check if another modal popped up over us, if so then don't close because it will close both modals
                        //foundation will close the first modal for us (eventually)
                        if ($('[data-reveal].open').length == 1) {
                            $('#' + id).foundation('reveal', 'close');
                        }
                    }
                });
            }
        },
        spinner: '<i class="fa fa-spinner fa-spin"></i>' + '&nbsp;'
    },
    ewait: function (method) {
        var id = 'jquery-extension-experient-ewait';

        var methods = {
            wait: function (message) {
                if (typeof message === 'undefined' || message == '') {
                    message = 'Loading.  Please wait...';
                } 

                var content = $.efndtnmodal.spinner + message;

                var $dialog = $('#' + id);
                if ($dialog.length == 0) {
                    $dialog = $('<div id="' + id + '" class="reveal-modal small" data-reveal data-options="close_on_background_click:false"></div>')
                    .appendTo('body')
                }

                $dialog
                    .html(content);

                $dialog.foundation('reveal', 'open')

                return $dialog;
            },
            close: function () {
                $.efndtnmodal.close(id);
            },
            isOpen: function () {
                return $.efndtnmodal.isOpen(id);
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.wait.apply(this, arguments);
        }
    },

    eflash: function (method) {
        var id = 'jquery-extension-experient-eflash';

        var methods = {
            flash: function (message, displayTime) {
                if (typeof message === 'undefined' || message == '') {
                    return;
                }

                if (typeof displayTime === 'undefined' || displayTime == '') {
                    displayTime = 2000;
                }
                var $dialog = $('#' + id);
                if ($dialog.length == 0) {
                    $dialog = $('<div id="' + id + '" class="reveal-modal small eflash" data-reveal></div>')
                        .appendTo('body')
                }

                $dialog
                    .html(message)
                    .foundation('reveal', 'open')

                setTimeout(function () {
                    $dialog.foundation('reveal', 'close')
                }, displayTime);

                return $dialog;
            },
            close: function () {
                $.efndtnmodal.close(id);
            },
            isOpen: function () {
                return $.efndtnmodal.isOpen(id);
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.flash.apply(this, arguments);
        }
    },

    emessage: function (method) {
        var id = 'jquery-extension-experient-emessage';
        var btnOkId = 'emessage-btnOK';

        var methods = {
            message: function (message, ok) {
                if (typeof message === 'undefined' || message == '' || message.length == 0) {
                    return;
                }

                //$.ewait('close');

                var $dialog = $('#' + id);

                if ($dialog.length == 0) {
                    $dialog = $('<div id="' + id + '" class="reveal-modal small" data-reveal data-options="close_on_background_click:false;close_on_esc:false;" ></div>')
                    .appendTo('body');
                }

                if ($.isArray(message)) {
                    $dialog.html('<div class="ExecMsgList">');
                    for (var i = 0; i < message.length; i++) {
                        if (typeof message[i].Text !== 'undefined') {
                            var msg = experient.global.htmlEncode(message[i].Text);
                            msg = msg.replace('PLEASE NOTE: ', '');
                            $dialog.append('<div class="ExecMsg' + experient.global.htmlEncode(message[i].Severity) + '">' + msg + '</div>');
                        }
                    }
                    $dialog.append('</div>');
                } else {
                    $dialog.html(message);
                }

                var content = '<br/><hr><button id="{btnOKId}" style="float:right">OK</button>';
                content = content.replace('{btnOKId}', btnOkId);
                $(content).appendTo($dialog);

                $('#' + btnOkId).click(function (e) {
                    $dialog.foundation('reveal', 'close');
                    if (typeof ok !== 'undefined' && $.isFunction(ok)) {
                        ok.call($dialog);
                    }
                });
 
                $dialog.foundation('reveal', 'open');
                return $dialog;
            },
            close: function () {
                $.efndtnmodal.close(id);
            },
            isOpen: function () {
                return $.efndtnmodal.isOpen(id);
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.message.apply(this, arguments);
        }
    },

    econfirm: function (method) {
        var id = 'jquery-extension-experient-econfirm';
        var btnOkId = 'econfirm-btnOK';
        var btnCancelId = 'econfirm-btnCancel';

        var methods = {
            message: function (message, ok, cancel) {
                if (typeof message === 'undefined' || message == '' || message.length == 0) {
                    return;
                }

                var $dialog = $('#' + id);
                if ($dialog.length == 0) {
                    $dialog = $('<div id="' + id + '" class="reveal-modal small" data-reveal data-options="close_on_background_click:false;close_on_esc:false;" ></div>')
                    .appendTo('body');
                }

                if ($.isArray(message)) {
                    $dialog.html('<div class="ExecMsgList">');
                    for (var i = 0; i < message.length; i++) {
                        if (typeof message[i].Text !== 'undefined') {
                            var msg = experient.global.htmlEncode(message[i].Text);
                            msg = msg.replace('PLEASE NOTE: ', '');
                            $dialog.append('<div class="ExecMsg' + experient.global.htmlEncode(message[i].Severity) + '">' + msg + '</div>');
                        }
                    }
                    $dialog.append('</div>');
                } else {
                    $dialog.html(message);
                }

                var content = '<br/><hr><div style="float:right"><button id="{btnOKId}">OK</button>&nbsp;<button id="{btnCancelId}">Cancel</button></div>';
                content = content.replace('{btnOKId}', btnOkId);
                content = content.replace('{btnCancelId}', btnCancelId);
                $(content).appendTo($dialog);

                $('#' + btnOkId).click(function (e) {
                    $dialog.foundation('reveal', 'close');
                    if (typeof ok !== 'undefined' && $.isFunction(ok)) {
                        ok.call($dialog);
                    }
                });

                $('#' + btnCancelId).click(function (e) {
                    $dialog.foundation('reveal', 'close');
                    if (typeof cancel !== 'undefined' && $.isFunction(cancel)) {
                        cancel.call($dialog);
                    }
                });
 
                $dialog.foundation('reveal', 'open');
                return $dialog;
            },
            close: function () {
                $.efndtnmodal.close(id);
            },
            isOpen: function () {
                return $.efndtnmodal.isOpen(id);
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.message.apply(this, arguments);
        }
    },

    ejax: function (method) {
        var methods = {
            request: function (options) {
                var settings = {
                    url: '',
                    type: 'GET',
                    data: '',
                    success: function (data, status, xhr) { },
                    error: function (xhr, status, errorThrown) { },
                    complete: function (xhr, status) { },
                    wait: false,
                    message: '',
                    async: true,
                    cache: false
                };

                if (options) {
                    $.extend(true, settings, options);
                }

                if (settings.wait) {
                    $.ewait(settings.message);
                }

                if (typeof settings.data === 'undefined') {
                    settings.data = '';
                } else if ($.isFunction(settings.data)) {
                    settings.data = settings.data.apply();
                }

                var success = function (data, status, xhr) {
                    if (data != null && data.RedirectURL != null) {
                        window.location = data.RedirectURL;
                    }

                    if (settings.wait) {
                        $.ewait('close');
                    }
                    var e = { suppressMessage: false };
                    if ($.isFunction(options.success)) {
                        options.success.apply(this, arguments);
                    }
                    if (!e.suppressMessage) {
                        try {
                            $.emessage($.parseJSON(xhr.responseText).messages);
                        }
                        catch (err) {
                        }
                    }
                };

                var error = function (xhr, status, errorThrown) {
                    if (settings.wait) {
                        $.ewait('close');
                    }
                    if (xhr.status !== 0 || xhr.responseText) { // Chrome throws status 0 exception if user navigates away during ajax request
                        var e = { suppressMessage: false };
                        if ($.isFunction(options.error)) {
                            options.error.call(this, xhr, status, errorThrown, e);
                        }
                        if (!e.suppressMessage) {
                            try {
                                $.emessage($.parseJSON(xhr.responseText).messages);
                            }
                            catch (err) {
                                var msg = [];
                                msg.push({ Text: 'Oops. We are unable to process your request', Severity: 'Error' });
                                msg.push({ Text: 'Status: ' + xhr.status + ' ' + errorThrown });
                                $.emessage(msg);
                            }
                        }
                    }
                };

                var complete = function (xhr, status) {
                    if ($.isFunction(options.complete)) {
                        options.complete.apply(this, arguments);
                    }
                };

                settings.success = success;
                settings.error = error;
                settings.complete = complete;

                $.ajax(settings);
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.request.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    },

    eprogress: function (method) {
        var id = 'jquery-extension-experient-eprogress';
        var dialog = $('#' + id);
        var itemSelector = 'h6';
        var itemTag = '<h6></h6>';
        var cssDisabled = 'subheader';

        var methods = {
            start: function (options) {
                var settings = {
                    jobs: [
                    //                        {
                    //                            url: '',
                    //                            type: 'GET',
                    //                            data: '',
                    //                            success: function (data, status, xhr, e) { },
                    //                            error: function (xhr, status, errorThrown, e) { },
                    //                            progress: '',
                    //                            custom: undefined,
                    //                            before: undefined
                    //                        }
                    ],
                    next: undefined,
                    //                    next: {
                    //                        url: '',
                    //                        type: 'GET',
                    //                        data: '',
                    //                        success: function (data, status, xhr, e) { },
                    //                        error: function (xhr, status, errorThrown, e) { },
                    //                        progress: '',
                    //                        custom: undefined,
                    //                        before: undefined
                    //                    },
                    autoClose: true,
                    title: 'Processing. Please wait...'
                };

                // merge
                if (options) {
                    $.extend(true, settings, options);
                }

                // do nothing if there is no job
                if (settings.jobs.length == 0) {
                    return;
                }

                // init dialog if not
                if (dialog.length == 0) {
                    dialog = $('<div id="' + id + '" class="reveal-modal small" data-reveal data-options="close_on_background_click:false;close_on_esc:false;" ></div>')
                        .appendTo('body');
                }

                // persist setting
                dialog.data('settings', settings);

                // reset dialog
                dialog
                    .html('')
                    .append('<h3 class="text-center">' + settings.title + '</h3>');

                // append jobs to dialog
                for (var i = 0; i < settings.jobs.length; i++) {
                    var item = settings.jobs[i].progress == null ? 'job ' + i : settings.jobs[i].progress;
                    $(itemTag).addClass(cssDisabled).html(item).appendTo(dialog);
                }

                dialog.foundation('reveal', 'open');

                // run jobs
                run(settings.jobs);

                return dialog;
            },
            close: function () {
                $.efndtnmodal.close(id);
            },
            isOpen: function () {
                return $.efndtnmodal.isOpen(id);
            },
            resume: function () {
                var jobs = dialog.data('jobs');
                if (typeof jobs !== 'undefined' && jobs.length > 0) {
                    // done current
                    var current = dialog.children('div').length - jobs.length - 1;
                    dialog.children(itemSelector + ':eq(' + current + ')').children('i').filter(':last').remove();
                    dialog.children(itemSelector + ':eq(' + current + ')').append('DONE!');

                    // run rest
                    run(jobs);
                } else {
                    // done last one
                    dialog.children(itemSelector).filter(':last').children('i').filter(':last').remove();
                    dialog.children(itemSelector).filter(':last').append('DONE!');

                    // run "next"
                    next();
                }
            }
        };

        function run(jobs) {
            if (jobs.length > 0) {
                // progress
                var current = dialog.children('div').length - jobs.length;
                dialog.children(itemSelector + ':eq(' + current + ')').removeClass(cssDisabled).append('&nbsp;...&nbsp;' +  $.efndtnmodal.spinner);

                // remove progress job from jobs
                var job = jobs.splice(0, 1)[0];

                // persist rest of jobs
                dialog.data('jobs', jobs);

                if ($.isFunction(job.custom)) {
                    // delay execution for UI
                    dialog.delay(2000).queue(function (next) {
                        job.custom.apply(this, arguments);
                        next();
                    });
                } else {
                    if ($.isFunction(job.before)) {
                        job.before.apply(this, arguments);
                    }
                    $.ejax({
                        url: job.url,
                        type: job.type,
                        data: job.data,
                        success: function (data, status, xhr) {
                            var e = { preventNext: false };
                            if ($.isFunction(job.success)) {
                                job.success.call(this, data, status, xhr, e);
                            }
                            if (!e.preventNext) {
                                dialog.children(itemSelector + ':eq(' + current + ')').children('i').filter(':last').remove();
                                dialog.children(itemSelector + ':eq(' + current + ')').append('DONE!');
                                run(jobs);
                            }
                        },
                        error: function (xhr, status, errorThrown, e) {
                            dialog.dialog('close');
                            if ($.isFunction(job.error)) {
                                job.error.apply(this, arguments);
                            }
                        }
                    });
                }
            } else {
                // run "next"
                next();
            }
        }

        function next() {
            var settings = dialog.data('settings');
            if (typeof settings !== 'undefined') {
                if (typeof settings.next !== 'undefined') {
                    // next progress
                    if (typeof settings.next.progress === 'undefined') {
                        settings.next.progress = 'Please Wait';
                    }
                    $(itemTag).html(settings.next.progress).append('&nbsp;...&nbsp;' + $.efndtnmodal.spinner).appendTo(dialog);

                    if ($.isFunction(settings.next.custom)) {
                        // delay execution for UI
                        dialog.delay(2000).queue(function (next) {
                            settings.next.custom.apply(this, arguments);
                            next();
                        });
                    } else {
                        if ($.isFunction(settings.next.before)) {
                            settings.next.before.apply(this, arguments);
                        }
                        $.ejax({
                            url: settings.next.url,
                            type: settings.next.type,
                            data: settings.next.data,
                            success: function (data, status, xhr) {
                                var e = { preventNext: false };
                                if ($.isFunction(settings.next.success)) {
                                    settings.next.success.call(this, data, status, xhr, e);
                                }
                                if (!e.preventNext) {
                                    dialog.children(itemSelector).filter(':last').children('i').filter(':last').remove();
                                    dialog.children(itemSelector).filter(':last').append('DONE!');

                                    if (settings.autoClose) {
                                        dialog.foundation('reveal', 'close');
                                    } 
                                }
                            },
                            error: function (xhr, status, errorThrown, e) {
                                dialog.foundation('reveal', 'close');
                                if ($.isFunction(settings.next.error)) {
                                    settings.next.error.apply(this, arguments);
                                }
                            }
                        });
                    }
                } else {
                    if (settings.autoClose) {
                        dialog.foundation('reveal', 'close');
                    } 
                }
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.start.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    },

    edialog: function (method) {
        var prefix = 'jquery-extension-experient-edialog-';
        var closehtml = '<a class="close-reveal-modal">&#215;</a>';

        var methods = {
            init: function (options) {
                var settings = {
                    css: 'small',
                    data_options: '',
                    closeicon: true,
                    id: new Date().getTime(),
                    content: '',
                    unloadOnClose: false,
                    ajaxsettings: undefined
                };

                if (options) {
                    $.extend(true, settings, options);
                }

                var $dialog = $('#' + prefix + settings.id);

                // already inited
                if ($dialog.length > 0) {
                    return $dialog;
                }

                var container = '<div id="' + prefix + settings.id + '" class="reveal-modal {css}" data-reveal data-options="{data_options}"></div>';
                container = container.replace('{css}', settings.css);
                container = container.replace('{data_options}', settings.data_options);

                $dialog = $(container)
                    .appendTo('body')

                if (settings.closeicon) {
                    $(closehtml).appendTo($dialog);
                }

                // persist setting
                $dialog.data('settings', settings);

                if (typeof settings.content !== 'undefined' && settings.content != '') {
                    // append will move content element
                    $dialog.append(settings.content);
                }

                return $dialog;
            },
            open: function ($dlg, reload, url) {
                if (typeof $dlg !== 'undefined') {
                    var origsettings = $dlg.data('settings');
                    var settings = $.extend({}, origsettings);

                    if ($dlg.length > 0 && typeof settings !== 'undefined') {
                        // load content
                        if (typeof settings.ajaxsettings !== 'undefined' && settings.ajaxsettings.url != '') {
                            if ((typeof reload !== 'undefined' && reload) || typeof settings.ajaxsettings.cache === 'undefined' || !settings.ajaxsettings.cache || (settings.ajaxsettings.cache && typeof $dlg.data('loaded') === 'undefined')) {
                                var content = '<i class="fa fa-spinner fa-spin"></i>' + '&nbsp;' + 'Loading.  Please wait...';
                                $dlg.html(content);
                                var success = function (data, status, xhr) {
                                    if (typeof origsettings.ajaxsettings.success !== 'undefined' && $.isFunction(origsettings.ajaxsettings.success)) {
                                        // data is not html content; user handles json/xml themself
                                        origsettings.ajaxsettings.success.apply($dlg, arguments);
                                    } else {
                                        $dlg.html(data);
                                        if (settings.closeicon) {
                                            $(closehtml).appendTo($dlg);
                                        }
                                    }
                                    // mark as loaded if cache is on
                                    $dlg.data('loaded', true);
                                };
                                var error = function (xhr, status, errorThrown, e) {
                                    $.edialog('close', $dlg);
                                };
                                var complete = function (xhr, status) {
                                    if (typeof origsettings.ajaxsettings.complete !== 'undefined' && $.isFunction(origsettings.ajaxsettings.complete)) {
                                        origsettings.ajaxsettings.complete.apply($dlg, arguments);
                                    }
                                };
                                settings.success = success;
                                settings.err = error;
                                settings.complete = complete;
                                settings.url = url == null ? settings.ajaxsettings.url : url;
                                $.ejax(settings);
                            }
                        }

                        $dlg.foundation('reveal', 'open');
                        return $dlg;
                    }
                }
            },
            close: function ($dlg) {
                if (typeof $dlg === 'undefined') {
                    $('div[id|="' + prefix + '"]').each(function () {
                        var $this = $(this);
                        if ($.edialog('isOpen', $this)) {
                            $this.foundation('reveal', 'close');
                            if ($this.data('settings') && $this.data('settings').unloadOnClose)
                                $this.remove();
                        }
                    });
                } else {
                    if ($dlg.length > 0 && $.edialog('isOpen', $dlg)) {
                        $dlg.foundation('reveal', 'close');
                        if ($dlg.data('settings') && $dlg.data('settings').unloadOnClose)
                            $dlg.remove();
                    }
                }
            },
            content: function ($dlg, content) {
                $dlg.html('').append(content);
                var settings = $dlg.data('settings');
                if (settings.closeicon) {
                    $(closehtml).appendTo($dlg);
                }
            },
            isOpen: function ($dlg) {
                return $dlg.hasClass('open') === true;
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    },

    eref: function (method) {
        var methods = {
            request: function (url) {
                $.ewait();
                window.location = url;
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.request.apply(this, arguments);
        }
    },

    ejaxSubmit: function ejaxSubmit(form, onSuccess, showSuccessMessage, successMsgText) {
        if ($(form).valid != null && !$(form).valid())
            return;
        $.ejax({
            wait: true,
            message: 'Saving.',
            url: $(form).attr('action'),
            type: 'POST',
            data: $(form).serialize(),
            success: function (data, status, xhr) {
                if (data == "success" || data.success) {
                    if (showSuccessMessage == null || showSuccessMessage) {
                        $.emessage([{ Text: successMsgText == null ? "Save Successful!" : successMsgText, Severity: "User" }]);
                    }
                    if ($.isFunction(onSuccess)) {
                        onSuccess.call();
                    }
                } else {
                    $.emessage([{ Text: "Oops. We are unable to process your request.", Severity: "Error" }]);
                }
            }
        });
    },

    ejaxSubmitReturnPartial: function ejaxSubmitReturnPartial(form, containerSelector, onSuccess) {
        if ($(form).valid != null && !$(form).valid())
            return;
        $.ejax({
            wait: true,
            message: 'Loading.',
            url: $(form).attr('action'),
            type: 'POST',
            data: $(form).serialize(),
            success: function (data, status, xhr) {
                $(containerSelector).html(data);
                if (typeof(jQueryInit) === 'function') {
                    jQueryInit(containerSelector);
                }
                if ($.isFunction(onSuccess)) {
                    onSuccess.call();
                }
            }
        });
    },

    eloadPartial: function eloadPartial(containerSelector, actionUrl, data, wait) {
        $.ejax({
            url: actionUrl,
            cache: false,
            wait: wait == null ? true : wait,
            data: data,
            message: "Loading.",
            success: function (data, status, xhr) {
                $(containerSelector).html(data);
                if (typeof (jQueryInit) === 'function') {
                    jQueryInit(containerSelector);
                }
            }
        });
    }

});



