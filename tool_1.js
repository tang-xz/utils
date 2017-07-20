/**
 * [isDOM determine obj is DOM element or not]
 * @param  {[type]}  obj [dom element]
 * @return {Boolean}     [determine result]
 */
function isDOM(obj) {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement;
  } else {
    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
}

/**
 * [fileToDataURL read file and transfer to dataURL]
 * @param  {[type]} file      [file object]
 * @param  {[type]} successCb [success callback]
 * @param  {[type]} errorCb   [error callback]
 * @return {[type]}           [dataURL]
 */
function fileToDataURL(file, successCb, errorCb) {
  var reader = new FileReader();

  reader.onload = function(e) {
    successCb && successCb(reader.result, e);
  };
  reader.onerror = function(e) {
    errorCb && errorCb(e);
  };
  reader.readAsDataURL(file);
}

/**
 * [urlToImage read url and transfer to DOM img object]
 * @param  {[type]} url [dataURL or remote url]
 * @param  {[type]} successCb [success callback]
 * @param  {[type]} errorCb   [error callback]
 * @return {[type]}           [DOM img instance]
 */
function urlToImage(url, successCb, errorCb) {
  var image = new Image();

  image.onload = function(e) {
    successCb && successCb(image, e);
  };
  image.onerror = function(e) {
    errorCb && errorCb(e);
  };
  image.src = url;
}

/**
 * [canvasToDataURL get dataURL through canvas drawImage]
 * @param  {[type]} img     [DOM img element]
 * @param  {[type]} width   [desired width]
 * @param  {[type]} height  [desired height]
 * @param  {[type]} quality [desired quality, default to 0.95]
 * @param  {[type]} mime    [desired mime type, default to image/jpeg]
 * @return {[type]}         [dataURL]
 */
function canvasToDataURL(img, width, height, quality, mime) {
  let dataURL,
    _quality = quality || 0.92,
    _mime = mime ? 'image/' + mime : 'image/jpeg',
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  dataURL = canvas.toDataURL(_mime, _quality);

  return dataURL;
}

/**
 * [dataURLtoBlob transfer dataURL to Blob or File]
 * @param  {[type]} dataURL [dataURL]
 * @param  {[type]} mime    [Blob or File mime type]
 * @param  {[type]} toFile  [return File or not]
 * @param  {[type]} name    [Blob or File name]
 * @return {[type]}         [Blob or File]
 */
function dataURLtoBlob(dataURL, mime, toFile, name) {
  'use strict'

  var byteString,
    result,
    mimeString = mime || dataURL.split(',')[0].split(':')[1].split(';')[0],
    nameString = name || 'default',
    content = new Array();

  if (dataURL.split(',')[0].indexOf('base64') !== -1) {
    byteString = atob(dataURL.split(',')[1])
  } else {
    byteString = decodeURI(dataURL.split(',')[1])
  }

  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i)
  }

  if (toFile) {
    result = new File([new Uint8Array(content)], nameString, {
      type: mimeString
    });
  } else {
    result = new Blob([new Uint8Array(content)], {
      type: mimeString
    });
  }

  return result;
}