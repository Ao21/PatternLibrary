var _htmlHash;
var _currentHash;
var _is_debug = false;

function pushHash(tag) {
  if (typeof(_htmlHash[tag]) == 'undefined') {
    _htmlHash[tag] = eval('"\\u'+_currentHash.toString(16)+'"');
    _currentHash++;
  }
  return _htmlHash[tag];
}

function clearHash() {
  _htmlHash = {};
  _currentHash = 44032; //朝鲜文音节 Hangul Syllables
}

exports.html2plain = function (html) {
  html = html.replace(/<(S*?)[^>]*>.*?|<.*?\/>/g, function(tag){
    //debug:
    if (_is_debug) {
      return pushHash(tag.toUpperCase().replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    } else {
      return pushHash(tag.toUpperCase());
    }
  });
  
  return html;
}

exports.plain2html = function (plain) {
  for(var tag in _htmlHash){
    plain = plain.replace(RegExp(_htmlHash[tag], 'g'), tag);
  }
  return plain;
}
