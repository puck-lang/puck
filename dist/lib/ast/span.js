'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Position = exports.Span = exports.ToSpanundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Position = exports.Position = (object) => object;
var Span = exports.Span = (object) => object;
var ToSpan = exports.ToSpan = {
span: function () {
  const self = this;
  return {
    start: ToSpan[self.type].start.call(self),
    end: ToSpan[self.type].end.call(self),
  };
},
start: function () {
  const self = this;
  return ToSpan[self.type].span.call(self).start;
},
end: function () {
  const self = this;
  return ToSpan[self.type].span.call(self).end;
}
};
$puck_1.PartialOrd["$impl_PartialOrd$lib/ast/span.puck:Span"] = {
partialCmp: function (other) {
  const self = this;
  return $puck_1.Some(Span.cmp.call(self.value, $unwrapTraitObject(other)));
},
lt: $puck_1.PartialOrd.lt,
le: $puck_1.PartialOrd.le,
gt: $puck_1.PartialOrd.gt,
ge: $puck_1.PartialOrd.ge
};
ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span"] = {
span: function () {
  const self = this;
  return self.value;
},
start: ToSpan.start,
end: ToSpan.end
};
Span.empty = function () {
  return {
    start: {
    line: 0,
    column: 0,
  },
    end: {
    line: 0,
    column: 0,
  },
  };
};
Span.cmp = function (position) {
  const self = this;
  if (position.line < self.start.line || (position.line === self.start.line && position.column < self.start.column)) {
    return $puck_1.Ordering.Greater;
  }
  else {
    if ((position.line > self.end.line || (position.line === self.end.line && position.column > self.end.column))) {
      return $puck_1.Ordering.Less;
    }
    else {
      return $puck_1.Ordering.Equal;
    };
  };
}
