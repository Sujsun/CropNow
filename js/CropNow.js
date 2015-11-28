/**
 * CropNow.js
 * Author: Sunndarasan Natarajan
 */
(function(root) {
    var localObject = {};
    /*---------------- Cropper Starts ------------------*/
    var CustomCropper = function() {
        function t(e, t) {
            return e.currentStyle ? e.currentStyle[t] : typeof window.getComputedStyle == "function" ? window.getComputedStyle(e, null).getPropertyValue(t) : e.style[t]
        }

        function r(e) {
            return e = e || window.event, e.target = e.target || e.srcElement, e.relatedTarget = e.relatedTarget || (e.type == "mouseover" ? e.fromElement : e.toElement), e.target = e.target || e.srcElement, e.stop = function() {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble != null && (e.cancelBubble = !0)
            }, e.target.nodeType === 3 && (e.target = e.target.parentNode), e
        }

        function i(e) {
            if (e === null || typeof e != "object") return e;
            var t = e.constructor();
            for (var n in e) t[n] = i(e[n]);
            return t
        }
        var e = {
            container_class: "cropper",
            width: 0,
            height: 0,
            min_width: 0,
            min_height: 0,
            max_width: 0,
            max_height: 0,
            ratio: {
                width: 0,
                height: 0
            }
        };
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            if (typeof this != "function") throw new TypeError("Bound function not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                n = this,
                r = function() {},
                i = function() {
                    return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            return r.prototype = this.prototype, i.prototype = new r, i
        });
        var n = function() {
                return window.addEventListener ? function(e, t, n) {
                    e.addEventListener(t, n, !1)
                } : window.attachEvent ? function(e, t, n) {
                    e.attachEvent("on" + t, n)
                } : function(e, t, n) {
                    e["on" + t] = n
                }
            }(),
            s = function(t, n) {
                this.options = i(e), n = n || {};
                for (var r in n) this.options[r] = n[r];
                this.image = t;
                var s = this.image.getBoundingClientRect();
                this.width = Math.round(s.right - s.left), this.height = Math.round(s.bottom - s.top), this.coordinates = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }, this.moving = this.resizing = this.direction = !1, this.handles = {}, this.overlays = {}, this.wrapImage(), this.attachEventListeners()
            };
        return s.prototype.wrapImage = function() {
            var e = document.createElement("div");
            e.className = this.options.container_class;
            var n = this.image.parentNode,
                r = this.image.nextSibling;
            e.appendChild(this.image), this.image.style.padding = this.image.style.margin = this.image.style.border = 0, r ? n.insertBefore(e, r) : n.appendChild(e), this.image.ondragstart = function() {
                return !1
            };
            var i = t(e, "position");
            i == "static" && (e.style.position = "relative"), e.style.width = this.width + "px", e.style.height = this.height + "px", this.container = e, this.isWrapped = true
        }, s.prototype.unWrapImage = function() {
            if(this.isWrapped) {
                this.image.parentNode.parentNode.replaceChild(this.image, this.image.parentNode);
                this.isWrapped = false;
            }
        }, s.prototype.createCropArea = function(e) {
            var t = document.createElement("div");
            t.className = this.options.container_class + "-area", t.style.position = "absolute", t.style.cursor = "move", t.style.background = "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)", this.createHandles(t), this.createOverlays(t), this.container.appendChild(t), this.crop_area = t
        }, s.prototype.createHandles = function(e) {
            var t = this,
                i = "-3px",
                s = {
                    nw: {
                        left: i,
                        top: i
                    },
                    n: {
                        left: "50%",
                        top: i,
                        marginLeft: i
                    },
                    ne: {
                        right: i,
                        top: i
                    },
                    e: {
                        right: i,
                        top: "50%",
                        marginTop: i
                    },
                    se: {
                        right: i,
                        bottom: i,
                        zIndex: 10
                    },
                    s: {
                        left: "50%",
                        bottom: i,
                        marginLeft: i
                    },
                    sw: {
                        left: i,
                        bottom: i
                    },
                    w: {
                        left: i,
                        top: "50%",
                        marginTop: i
                    }
                };
            for (var o in s) {
                var u = s[o],
                    a = document.createElement("div");
                a.className = this.options.container_class + "-area-handle";
                for (var f in u) a.style[f] = u[f];
                a.style.position = "absolute", a.style.cursor = o + "-resize", a.setAttribute("position", o), e.appendChild(a), n(a, "mousedown", function(e) {
                    t.resizing = !0, t.direction = r(e).target.getAttribute("position")
                }), this.handles[o] = a
            }
        }, s.prototype.createOverlays = function() {
            var e = {
                top: {
                    left: 0,
                    top: 0,
                    right: 0,
                    width: "100%"
                },
                left: {
                    left: 0
                },
                right: {
                    right: 0
                },
                bottom: {
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%"
                }
            };
            for (position in e) {
                var t = e[position],
                    n = document.createElement("div");
                n.className = this.options.container_class + "-overlay", n.style.position = "absolute";
                for (var r in t) n.style[r] = t[r];
                this.container.appendChild(n), this.overlays[position] = n
            }
        }, s.prototype.attachEventListeners = function() {
            n(this.container, "mousedown", this.mouseDown.bind(this)), n(document, "mouseup", this.mouseUp.bind(this)), n(document, "mousemove", this.mouseMove.bind(this))
        }, s.prototype.mouseDown = function(e) {
            r(e).stop();
            var t = r(e).target,
                n = this.getCursorPosition(e);
            this.crop_area || this.createCropArea(n), this.dragStartCrop = i(this.coordinates), this.dragStart = n;
            if (t == this.crop_area) {
                this.moving = !0;
                return
            }
            if (t.className == this.options.container_class + "-area-handle") return;
            var s = this.options.width ? this.options.width : this.options.min_width ? this.options.min_width : 0,
                o = this.options.height ? this.options.height : this.options.min_height ? this.options.min_height : 0;
            this.coordinates.x = n.x, this.coordinates.y = n.y, this.coordinates.width = s, this.coordinates.height = o, this.dragStartCrop = i(this.coordinates), this.crop();
            if (s && o) return;
            this.resizing = !0, this.direction = "se"
        }, s.prototype.crop = function() {
            this.confine(), this.crop_area.style.left = this.coordinates.x + "px", this.crop_area.style.top = this.coordinates.y + "px", this.crop_area.style.width = this.coordinates.width + "px", this.crop_area.style.height = this.coordinates.height + "px", this.overlays.top.style.height = this.overlays.left.style.top = this.overlays.right.style.top = this.coordinates.y + "px", this.overlays.left.style.height = this.overlays.right.style.height = this.coordinates.height + "px", this.overlays.left.style.width = this.coordinates.x + "px", this.overlays.right.style.width = this.width - this.coordinates.x - this.coordinates.width + "px", this.overlays.bottom.style.height = this.height - this.coordinates.y - this.coordinates.height + "px", typeof this.options.update == "function" && this.options.update.call(this, this.coordinates)
        }, s.prototype.confine = function() {
            var xBreach, yBreach;
            (this.coordinates.x < 0) && (this.coordinates.x = 0), (this.coordinates.y < 0) && (this.coordinates.y = 0), xBreach = (this.coordinates.x + this.coordinates.width) > this.width, yBreach = (this.coordinates.y + this.coordinates.height) > this.height, xBreach && (this.toPrevPosition()), yBreach && (this.toPrevPosition()), (!xBreach && !yBreach) && (this.setCurrentPositionAsPrevPosition());
            // this.coordinates.x + this.coordinates.width > this.width && (this.coordinates.x = this.width - this.coordinates.width), this.coordinates.x < 0 && (this.coordinates.x = 0), this.coordinates.y + this.coordinates.height > this.height && (this.coordinates.y = this.height - this.coordinates.height), this.coordinates.y < 0 && (this.coordinates.y = 0)
        }, s.prototype.setCurrentPositionAsPrevPosition = function() {
            this.previousCoordinates.x = this.coordinates.x, this.previousCoordinates.y = this.coordinates.y, this.previousCoordinates.width = this.coordinates.width, this.previousCoordinates.height = this.coordinates.height;
        }, s.prototype.toPrevPosition = function() {
            if (this.previousCoordinates.x !== undefined) {
                this.coordinates.x = this.previousCoordinates.x, this.coordinates.y = this.previousCoordinates.y, this.coordinates.width = this.previousCoordinates.width, this.coordinates.height = this.previousCoordinates.height;
            }
        }, s.prototype.previousCoordinates = {}, s.prototype.mouseUp = function(e) {
            this.resizing = this.moving = this.direction = !1
        }, s.prototype.mouseMove = function(e) {
            if (this.resizing) return this.resize(e);
            if (this.moving) return this.move(e)
        }, s.prototype.resize = function(e) {
            function o() {
                this.direction.match(/w/) ? (n = t.x, i -= delta_x, t.x > this.dragStartCrop.x + this.dragStartCrop.width && (this.direction = this.direction.replace("w", "e"), n = this.dragStartCrop.x + this.dragStartCrop.width, this.dragStart.x = this.dragStartCrop.x = n, this.dragStartCrop.width = i = 0)) : this.direction.match(/e/) && (i = Math.min(i + delta_x, this.width - n), t.x < this.dragStartCrop.x && (this.direction = this.direction.replace("e", "w"), this.dragStart.x = n, this.dragStartCrop.width = i = 0))
            }

            function u(e) {
                this.direction.match(/n/) ? (e ? (s = Math.round(i / e), r = this.dragStartCrop.y + this.dragStartCrop.height - s) : (r = t.y, s -= delta_y), t.y > this.dragStartCrop.y + this.dragStartCrop.height && (this.direction = this.direction.replace("n", "s"), r = this.dragStart.y + this.dragStartCrop.height, this.dragStart.y = this.dragStartCrop.y = r, this.dragStartCrop.height = s = 0)) : this.direction.match(/s/) && (e ? s = Math.round(i / e) : s = Math.min(s + delta_y, this.height - r), t.y < this.dragStartCrop.y && (this.direction = this.direction.replace("s", "n"), this.dragStart.y = r, this.dragStartCrop.height = s = 0))
            }
            var t = this.getCursorPosition(e),
                n = this.dragStartCrop.x,
                r = this.dragStartCrop.y,
                i = this.dragStartCrop.width,
                s = this.dragStartCrop.height;
            t.x = Math.max(0, t.x), t.y = Math.max(0, t.y), delta_x = t.x - this.dragStart.x, delta_y = t.y - this.dragStart.y;
            if (this.options.ratio.width > 0 && this.options.ratio.height > 0) {
                var a = this.options.ratio.width / this.options.ratio.height;
                this.direction == "n" || this.direction == "s" ? (u.call(this), i = s * a) : this.direction == "w" || this.direction == "e" ? (o.call(this), s = i / a) : (o.call(this), u.call(this, a))
            } else o.call(this), u.call(this);
            this.options.min_width && (i = Math.max(i, this.options.min_width)), this.options.min_height && (s = Math.max(s, this.options.min_height)), this.options.max_width && (i = Math.min(i, this.options.max_width)), this.options.max_height && (s = Math.min(s, this.options.max_height)), this.coordinates.x = Math.round(n), this.coordinates.y = Math.round(r), this.coordinates.width = Math.round(i), this.coordinates.height = Math.round(s), this.crop()
        }, s.prototype.move = function(e) {
            var t = this.getCursorPosition(e),
                n = t.x - this.dragStart.x,
                r = t.y - this.dragStart.y;
            this.coordinates.x = this.dragStartCrop.x + n, this.coordinates.y = this.dragStartCrop.y + r, this.crop()
        }, s.prototype.getCursorPosition = function(e) {
            var t = this.container.getBoundingClientRect();
            return e = r(e), {
                x: Math.round(e.clientX - t.left),
                y: Math.round(e.clientY - t.top)
            }
        }, s
    }();

    /*
     * JavaScript Canvas to Blob 2.0.5
     * https://github.com/blueimp/JavaScript-Canvas-to-Blob
     *
     * Copyright 2012, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * http://www.opensource.org/licenses/MIT
     *
     * Based on stackoverflow user Stoive's code snippet:
     * http://stackoverflow.com/q/4998908
     */

    /*jslint nomen: true, regexp: true */
    /*global window, atob, Blob, ArrayBuffer, Uint8Array, define */

    (function (window) {
        'use strict';
        var CanvasPrototype = window.HTMLCanvasElement &&
                window.HTMLCanvasElement.prototype,
            hasBlobConstructor = window.Blob && (function () {
                try {
                    return Boolean(new Blob());
                } catch (e) {
                    return false;
                }
            }()),
            hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array &&
                (function () {
                    try {
                        return new Blob([new Uint8Array(100)]).size === 100;
                    } catch (e) {
                        return false;
                    }
                }()),
            BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                window.MozBlobBuilder || window.MSBlobBuilder,
            dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob &&
                window.ArrayBuffer && window.Uint8Array && function (dataURI) {
                    var byteString,
                        arrayBuffer,
                        intArray,
                        i,
                        mimeString,
                        bb;
                    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                        // Convert base64 to raw binary data held in a string:
                        byteString = atob(dataURI.split(',')[1]);
                    } else {
                        // Convert base64/URLEncoded data component to raw binary data:
                        byteString = decodeURIComponent(dataURI.split(',')[1]);
                    }
                    // Write the bytes of the string to an ArrayBuffer:
                    arrayBuffer = new ArrayBuffer(byteString.length);
                    intArray = new Uint8Array(arrayBuffer);
                    for (i = 0; i < byteString.length; i += 1) {
                        intArray[i] = byteString.charCodeAt(i);
                    }
                    // Separate out the mime component:
                    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    // Write the ArrayBuffer (or ArrayBufferView) to a blob:
                    if (hasBlobConstructor) {
                        return new Blob(
                            [hasArrayBufferViewSupport ? intArray : arrayBuffer],
                            {type: mimeString}
                        );
                    }
                    bb = new BlobBuilder();
                    bb.append(arrayBuffer);
                    return bb.getBlob(mimeString);
                };
        if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
            if (CanvasPrototype.mozGetAsFile) {
                CanvasPrototype.toBlob = function (callback, type, quality) {
                    if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                        callback(dataURLtoBlob(this.toDataURL(type, quality)));
                    } else {
                        callback(this.mozGetAsFile('blob', type));
                    }
                };
            } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
                CanvasPrototype.toBlob = function (callback, type, quality) {
                    callback(dataURLtoBlob(this.toDataURL(type, quality)));
                };
            }
        }
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return dataURLtoBlob;
            });
        } else {
            // window.dataURLtoBlob = dataURLtoBlob;
            localObject.dataURLtoBlob = dataURLtoBlob;
        }
    }(window));

    /*---------------- Cropper Ends ------------------*/
    /**
     * Detects Canvas support of the browser
     * @return {Boolean}
     */
    function isCanvasSupported() {
        var element = document.createElement('canvas');
        return !!(element.getContext && element.getContext('2d'));
    }
    /**
     * Private Variables
     */
    var fileReader = new FileReader(),
        isCanvasSupportedFlag = isCanvasSupported(),
        isCropperCSSIncluded = false;
        cropperCSSString = '.cropper { position: relative; cursor: crosshair; } .cropper-area-handle { width: 6px; height: 6px; background: yellow; } .cropper-overlay { background: black; opacity: 0.5; filter: alpha(opacity=50); }';
    /**
     * CropNow Class
     * @param {Object} options      Eg: {file: fileInput, image: img, previewImage: previewImg, ratio: {width: 1, height: 1}, resize: { width: 300, height: 300 }, onCrop: function(base64) { console.log('Base64:', base64); },}
     */
    function CropNow(options) {
        isCanvasSupportedFlag || ((function() {
            throw {
                name: 'BroswerCompatibiltyError',
                message: 'canvas/HTML5 is not supported, try updating your broswer',
            };
        })());
        options = options || {};
        options.isNewImage = true;
        options.previewImage || (options.previewImage = {});
        options.resizedRatio = {};
        options.originalSizeCoordinates = {};
        options.canvas || (options.canvas = window.document.createElement('canvas'));
        if (!options.file && !options.image) {
            /**
             * Both "file" and "image" are not present in options
             */
            throw 'Pass ["image"] attribute or ["file", "image"] attributes in options';
        }
        options.image || (function() {
            throw 'Pass "image" attribute in options';
        })();
        /**
         * Attaching file element change event listener
         */
        if (options.file) {
            attachEvent(options.file, 'change', function(event) {
                onFileChange(event, options);
            });
        }
        /**
         * Attaching image load event listener
         */
        attachEvent(options.image, 'load', function(event) {
            options.previewImage.src = options.image.src;
            /**
             * Getting original size
             */
            options.originalSizeImage = getImageOriginalSize(options.image.src, function(originalImageSize) {
                onOriginalImageSize(originalImageSize, options);
            });
        });
        /**
         * Include Cropper CSS properties if it is not included already
         */
        isCropperCSSIncluded || (isCropperCSSIncluded = includeCropperCSS());
        /**
         * Gets Base64 Image String
         * @return {String}
         */
        function getBase64() {
            if(options.cropper) {
                return onCropChange(options);
            }
        }
        /**
         * Gets cropped Blob Object
         * @return {BlobObject}
         */
        function getBlob() {
            if(options.cropper) {
                return localObject.dataURLtoBlob(getBase64());
            }
        }
        /**
         * Exposing object
         */
        return {
            getBase64: getBase64,
            getBlob: getBlob,
        };
    }
    /**
     * Attaches Cropper Event
     * @param  {Object} options
     * @return {Object} cropperObject
     */
    function attachCropperEvent(options) {
        var cropperOptions = {};
        options.ratio && (cropperOptions.ratio = options.ratio);
        options.min_width && (cropperOptions.min_width = options.min_width);
        options.min_height && (cropperOptions.min_height = options.min_height);
        options.max_width && (cropperOptions.max_width = options.max_width);
        options.max_height && (cropperOptions.max_height = options.max_height);
        cropperOptions.update = function(coordinates) {
            options.isCropStarted = true;
            if(options.onCrop || options.previewImage.tagName !== undefined) {
                onCropChange(options);
            }
        };
        return new CustomCropper(options.image, cropperOptions);
    }
    /**
     * Listener Crop Change Method
     * @param  {Object} coordinates     Eg: {x: 100, y: 100, height: 100, width: 100}
     * @param  {Object} options
     * @return {String} base64Cropped
     */
    function onCropChange(options) {
        if(options.isCropStarted) {
            var coordinates = options.cropper.coordinates;
            options.originalSizeCoordinates.x = coordinates.x * options.resizedRatio.width;
            options.originalSizeCoordinates.y = coordinates.y * options.resizedRatio.height;
            options.originalSizeCoordinates.width = coordinates.width * options.resizedRatio.width;
            options.originalSizeCoordinates.height = coordinates.height * options.resizedRatio.height
            try {
                if (options.resize) {
                    options.canvas.width = options.resize.width;
                    options.canvas.height = options.resize.height;
                    options.previewImage.width = options.resize.width;
                    options.previewImage.height = options.resize.height;
                } else {
                    options.canvas.width = options.originalSizeCoordinates.width;
                    options.canvas.height = options.originalSizeCoordinates.height;
                    options.previewImage.width = options.originalSizeCoordinates.width;
                    options.previewImage.height = options.originalSizeCoordinates.height;
                }
                options.canvas.getContext('2d').drawImage(options.originalSizeImage, options.originalSizeCoordinates.x, options.originalSizeCoordinates.y, options.originalSizeCoordinates.width, options.originalSizeCoordinates.height, 0, 0, options.canvas.width, options.canvas.height);
                options.base64Cropped = options.canvas.toDataURL();
                options.previewImage && (options.previewImage.src = options.base64Cropped);
                if (options.onCrop) {
                    options.onCrop(options.base64Cropped);
                }
            } catch (exception) {
                if (exception.name === 'SecurityError') {
                    options.canvas = window.document.createElement('canvas');
                    console.error(new Error({
                        name: 'SecurityError',
                        message: 'Make sure to serve the image from same domain. You cannot crop/edit image of different domain.',
                    }));
                }
                console.error(exception);
            }
        } else {
            delete options.base64Cropped;
        }
        return options.base64Cropped;
    }
    /**
     * Event Handler For File Change
     * @param  {Object} event
     * @param  {Object} options
     * @return {undefined}
     */
    function onFileChange(event, options) {
        delete options.isCropStarted;
        fileReader.onloadend = function(event) {
            var base64String = event.target.result;
            options.image.src = base64String;
        };
        fileReader.readAsDataURL(options.file.files[0]);
    }
    /**
     * Event Handler For Getting OriginalSize Image
     * @param  {Object} originalImageSize   Eg: {width: 100, height: 100}
     * @param  {Object} options
     * @return {Undefined}
     */
    function onOriginalImageSize(originalImageSize, options) {
        options.resizedRatio.width = originalImageSize.width / options.image.width;
        options.resizedRatio.height = originalImageSize.height / options.image.height;
        if (options.resize) {
            options.previewImage.width = options.resize.width;
            options.previewImage.height = options.resize.height;
        } else {
            options.previewImage.width = originalImageSize.width;
            options.previewImage.height = originalImageSize.height;
        }
        if (options.cropper) {
            options.cropper.unWrapImage();
        }
        options.cropper = attachCropperEvent(options);
    }
    /**
     * Gets original size of image
     * @param  {String}   imageSrc
     * @param  {Function} callback  Arg: {width: 100, height: 100}
     * @return {DOM Element} img
     */
    function getImageOriginalSize(imageSrc, callback) {
        var img = window.document.createElement('img');
        attachEvent(img, 'load', function(event) {
            if (callback) {
                callback({
                    width: img.width,
                    height: img.height,
                });
            }
        });
        img.src = imageSrc;
        return img;
    }
    /**
     * Includes Cropper CSS into the DOM Head
     * @return {Boolean}          Flag which tells whether the Cropper CSS is included or not
     */
    function includeCropperCSS () {
        var style = window.document.createElement('style');
        style.innerHTML = cropperCSSString;
        window.document.head.appendChild(style);
        return true;
    }
    /**
     * Attaches events to Element
     * @param  {DOM Element} DOM element to which the event has to be attached
     * @param  {String} event
     * @param  {Function} handler
     * @return {DOM Element}
     */
    function attachEvent(element, event, handler) {
        if (element && event && handler) {
            if (window.$) {
                window.$(element).on(event, handler);
            } else if (element.addEventListener) {
                element.addEventListener(event, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + event, handler);
            } else {
                element['on' + event] = handler;
            }
        }
        return element;
    }
    root['CropNow'] = CropNow;
})(this);