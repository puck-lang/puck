'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Completions = exports.Completion = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _vscodeLanguageserver = require('vscode-languageserver');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _scope = require('./../typeck/src/scope');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var Completion = exports.Completion = function Completion(object) {
  return object;
};
var Completions = exports.Completions = {};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Module"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions Module");
    var __PUCK__value__1 = _core.List.binarySearchBy.call(self.value.statements, function (statement) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TopLevelStatement', value: statement, $isTraitObject: true }), position);
    });
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Ok") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          index = _$unwrapTraitObject$v[0];

      var statement = self.value.statements[index];
      var __PUCK__value__2 = statement;
      var __PUCK__value__3 = __PUCK__value__2;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "ExportDirective") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            s = _$unwrapTraitObject2$[0];

        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ExportDirective"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ExportDirective', value: s, $isTraitObject: true }, position);
      } else {
        var __PUCK__value__4 = __PUCK__value__2;
        if ($unwrapTraitObject(__PUCK__value__4).kind == "ImplDeclaration") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              _s = _$unwrapTraitObject3$[0];

          return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ImplDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: _s, $isTraitObject: true }, position);
        } else {
          var __PUCK__value__5 = __PUCK__value__2;
          if ($unwrapTraitObject(__PUCK__value__5).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
                _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                _s2 = _$unwrapTraitObject4$[0];

            return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ImplShorthandDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: _s2, $isTraitObject: true }, position);
          } else {
            var __PUCK__value__6 = __PUCK__value__2;
            if ($unwrapTraitObject(__PUCK__value__6).kind == "TraitDeclaration") {
              var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
                  _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                  _s3 = _$unwrapTraitObject5$[0];

              return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:TraitDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: _s3, $isTraitObject: true }, position);
            } else {
              var __PUCK__value__7 = __PUCK__value__2;
              if ($unwrapTraitObject(__PUCK__value__7).kind == "BlockLevelStatement") {
                var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
                    _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                    _s4 = _$unwrapTraitObject6$[0];

                return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:BlockLevelStatement"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: _s4, $isTraitObject: true }, position);
              } else {
                var __PUCK__value__8 = __PUCK__value__2;
                if (true) {
                  var __PUCK__value__9 = __PUCK__value__8;
                  (0, _core.print)("statement", statement);
                  return [];
                };
              };
            };
          };
        };
      };
    } else {
      (0, _core.print)("miss");
      return getScopeCompletions(self);
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:BlockLevelStatement"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions BlockLevelStatement");
    var __PUCK__value__10 = self;
    var __PUCK__value__11 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Block") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          s = _$unwrapTraitObject7$[0];

      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Block"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: s, $isTraitObject: true }, position);
    } else {
      var __PUCK__value__12 = __PUCK__value__10;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Expression") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            _s5 = _$unwrapTraitObject8$[0];

        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Expression"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: _s5, $isTraitObject: true }, position);
      } else {
        var __PUCK__value__13 = __PUCK__value__10;
        if (true) {
          var __PUCK__value__14 = __PUCK__value__13;
          return [];
        };
      };
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Expression"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions Expression");
    var __PUCK__value__15 = self;
    var __PUCK__value__16 = __PUCK__value__15;
    if ($unwrapTraitObject(__PUCK__value__16).kind == "Identifier") {
      var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__16),
          _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
          e = _$unwrapTraitObject9$[0];

      return getScopeCompletions(e);
    } else {
      var __PUCK__value__17 = __PUCK__value__15;
      if ($unwrapTraitObject(__PUCK__value__17).kind == "FunctionDeclaration") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__17),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            _e = _$unwrapTraitObject11[0];

        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _e, $isTraitObject: true }, position);
      } else {
        var __PUCK__value__18 = __PUCK__value__15;
        if (true) {
          var __PUCK__value__19 = __PUCK__value__18;
          return [];
        };
      };
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ImplDeclaration"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions ImplDeclaration");
    var __PUCK__value__20 = _core.List.binarySearchBy.call(self.value.members, function (member) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), position);
    });
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Ok") {
      var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__20),
          _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
          index = _$unwrapTraitObject13[0];

      var member = self.value.members[index];
      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }, position);
    } else {
      return [];
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ImplShorthandDeclaration"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions ImplShorthandDeclaration");
    var __PUCK__value__21 = _core.List.binarySearchBy.call(self.value.members, function (member) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), position);
    });
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Ok") {
      var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__21),
          _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
          index = _$unwrapTraitObject15[0];

      var member = self.value.members[index];
      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }, position);
    } else {
      return [];
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:TraitDeclaration"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions TraitDeclaration");
    var __PUCK__value__22 = _core.List.binarySearchBy.call(self.value.members, function (member) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }), position);
    });
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Ok") {
      var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__22),
          _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
          index = _$unwrapTraitObject17[0];

      var member = self.value.members[index];
      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: member, $isTraitObject: true }, position);
    } else {
      return [];
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:ExportDirective"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions ExportDirective");
    var __PUCK__value__23 = self.value.statement;
    var __PUCK__value__24 = __PUCK__value__23;
    if ($unwrapTraitObject(__PUCK__value__24).kind == "TraitDeclaration") {
      var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__24),
          _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
          d = _$unwrapTraitObject19[0];

      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:TraitDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: d, $isTraitObject: true }, position);
    } else {
      var __PUCK__value__25 = __PUCK__value__23;
      if ($unwrapTraitObject(__PUCK__value__25).kind == "FunctionDeclaration") {
        var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__25),
            _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
            _d = _$unwrapTraitObject21[0];

        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: _d, $isTraitObject: true }, position);
      } else {
        var __PUCK__value__26 = __PUCK__value__23;
        if (true) {
          var __PUCK__value__27 = __PUCK__value__26;
          return [];
        };
      };
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Block"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions Block");
    var __PUCK__value__28 = _core.List.binarySearchBy.call(self.value.statements, function (statement) {
      return _span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BlockLevelStatement', value: statement, $isTraitObject: true }), position);
    });
    if ($unwrapTraitObject(__PUCK__value__28).kind == "Ok") {
      var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__28),
          _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
          index = _$unwrapTraitObject23[0];

      var statement = self.value.statements[index];
      var __PUCK__value__29 = statement;
      var __PUCK__value__30 = __PUCK__value__29;
      if ($unwrapTraitObject(__PUCK__value__30).kind == "WhileLoop") {
        var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__30),
            _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
            s = _$unwrapTraitObject25[0];

        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:WhileLoop"].getCompletions.call({ type: '$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:WhileLoop', value: s, $isTraitObject: true }, position);
      } else {
        var __PUCK__value__31 = __PUCK__value__29;
        if ($unwrapTraitObject(__PUCK__value__31).kind == "Expression") {
          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__31),
              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
              _s6 = _$unwrapTraitObject27[0];

          return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Expression"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: _s6, $isTraitObject: true }, position);
        } else {
          var __PUCK__value__32 = __PUCK__value__29;
          if (true) {
            var __PUCK__value__33 = __PUCK__value__32;
            return [];
          };
        };
      };
    } else {
      return getScopeCompletions(self);
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:WhileLoop"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions WhileLoop");
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.body, $isTraitObject: true }), position) == _core.Ordering.Equal) {
      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Block"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: self.value.body, $isTraitObject: true }, position);
    } else {
      return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Expression"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: self.value.condition, $isTraitObject: true }, position);
    };
  }
};
Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:FunctionDeclaration"] = {
  getCompletions: function getCompletions(position) {
    var self = this;
    (0, _core.print)("getCompletions FunctionDeclaration");
    var __PUCK__value__34 = self.value.body;
    if ($unwrapTraitObject(__PUCK__value__34).kind == "Some") {
      var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__34),
          _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
          body = _$unwrapTraitObject29[0];

      if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: body, $isTraitObject: true }), position) == _core.Ordering.Equal) {
        return Completions["$impl_lib/pls/completions.puck:Completions$lib/ast/ast.puck:Block"].getCompletions.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: body, $isTraitObject: true }, position);
      };
    };
    return [];
  }
};
function getScopeCompletions(node) {
  if ($unwrapTraitObject(node).scope) {
    var scope = $unwrapTraitObject(node).scope;
    var __PUCK__value__35 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.values.call(_scope.Scope.getBindings.call(scope)), $isTraitObject: true }, function (binding) {
      return {
        label: binding.name,
        kind: $unwrapTraitObject(_vscodeLanguageserver.CompletionItemKind).Text,
        data: binding.name
      };
    });
    return _core.Iterable[__PUCK__value__35.type].toList.call(__PUCK__value__35);
  } else {
    return [];
  };
}
