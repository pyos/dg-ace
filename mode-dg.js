define('ace/mode/dg', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/text_highlight_rules'], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var dgHighlightRules = function() {
    this.$keywords = this.createKeywordMapper({
       'support.type.builtin.dg': 'bool|bytearray|bytes|classmethod|complex|dict\'?|float|frozenset|int|list\'?|memoryview|object|property|range|set\'?|slice|staticmethod|str|super|tuple\'?|type'
     , 'support.function.builtin.dg': 'abs|all|any|bin|bind|chr|cmp|compile|complex|delattr|dir|divmod|drop|dropwhile|enumerate|eval|exhaust|filter|flip|foldl1?|format|fst|getattr|globals|hasattr|hash|head|hex|id|init|input|isinstance|issubclass|iter|iterate|last|len|locals|map|max|min|next|oct|open|ord|pow|print|repr|reversed|round|setattr|scanl1?|snd|sorted|sum|tail|take|takewhile|vars|zip'
     , 'constant.language.dg': 'Ellipsis|NotImplemented|None|True|False'
     , 'variable.language.dg': 'self'
     , 'support.type.exception.dg': 'Exception|KeyboardInterrupt|SystemExit|StopIteration|GeneratorExit|[A-Z]\\w*(?:Error|Exception|Warning)'
     , 'keyword.control.flow.dg': 'except|finally|for|if|import|not|otherwise|raise|subclass|while|with|yield|yield'
     , 'keyword.operator.logical.dg': 'and|in|is|or|where'
     , 'variable.other.dg': '[A-Z_]+\'*'
     , 'support.type.dg': '[A-Z]\\w*\'*'
     }, 'identitier.dg');

    this.$rules = { start:
       [ { token: 'text', regex: '\\s+' },
         { token:
            [ 'comment.line.number-sign.dg',
              'punctuation.definition.comment.dg' ],
           regex: '(?:#).*$\\n?' },
         { caseInsensitive: true,
           token: 'constant.numeric.integer.binary.dg',
           regex: '0b[01]+' },
         { caseInsensitive: true,
           token: 'constant.numeric.integer.octal.dg',
           regex: '0o[0-7]+' },
         { caseInsensitive: true,
           token: 'constant.numeric.integer.hexadecimal.dg',
           regex: '0x[0-9a-f]+' },
         { caseInsensitive: true,
           token: 'constant.numeric.float.dg',
           regex: '[+-]?[0-9]+\\.[0-9]+(e[+-]?[0-9]+)?j?' },
         { caseInsensitive: true,
           token: 'constant.numeric.float.dg',
           regex: '[+-]?[0-9]+e[+-]?[0-9]+j?' },
         { caseInsensitive: true,
           token: 'constant.numeric.integer.decimal.dg',
           regex: '[+-]?[0-9]+j?' },
         { token: 'punctuation.definition.string.begin.dg',
           regex: '([bB][rR]|[rR]?[bB]?)"""',
           push:
            [ { token: 'constant.character.escape.dg', regex: '\\\\.' },
              { token: 'punctuation.definition.string.end.dg',
                regex: '"""',
                next: 'pop' },
              { defaultToken: 'string.quoted.double.dg' } ] },
         { token: 'punctuation.definition.string.begin.dg',
           regex: '([bB][rR]|[rR]?[bB]?)\'\'\'',
           push:
            [ { token: 'constant.character.escape.dg', regex: '\\\\.' },
              { token: 'punctuation.definition.string.end.dg',
                regex: '\'\'\'',
                next: 'pop' },
              { defaultToken: 'string.quoted.single.dg' } ] },
         { token: 'punctuation.definition.string.begin.dg',
           regex: '([bB][rR]|[rR]?[bB]?)"',
           push:
            [ { token: 'constant.character.escape.dg', regex: '\\\\.' },
              { token: 'punctuation.definition.string.end.dg',
                regex: '"',
                next: 'pop' },
              { defaultToken: 'string.quoted.double.dg' } ] },
         { token: 'punctuation.definition.string.begin.dg',
           regex: '([bB][rR]|[rR]?[bB]?)\'',
           push:
            [ { token: 'constant.character.escape.dg', regex: '\\\\.' },
              { token: 'punctuation.definition.string.end.dg',
                regex: '\'',
                next: 'pop' },
              { defaultToken: 'string.quoted.single.dg' } ] },
         { token:
            [ 'keyword.operator.function.infix.dg',
              'punctuation.definition.entity.dg',
              'punctuation.definition.entity.dg' ],
           regex: '(?:`)\\w+\'*(?:`)' },
         { token: 'keyword.control.flow.dg.yielfrom',
           regex: '\\byield\\s*from\\b' },
         { token: 'variable.other.readwrite.instance.dg',
           regex: '@@?\\s*\\w+\'*' },
         { token: 'keyword.operator.dg',
           regex: '[!$%&*+\\-./:<-@\\\\^|~;,]+' },
         { token: this.$keywords,
           regex: '\\w+\'*' },
         { token: 'punctuation.block.dg', regex: '[()\\[\\]\\{\\}]' } ] };

    this.normalizeRules();
};


var Mode = function() {
    this.HighlightRules = dgHighlightRules;
};

oop.inherits(dgHighlightRules, TextHighlightRules);
oop.inherits(Mode, TextMode);

Mode.prototype.lineCommentStart = "#";

exports.dgHighlightRules = dgHighlightRules;
exports.Mode = Mode;
});
