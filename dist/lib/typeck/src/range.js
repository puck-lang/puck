'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getRange = exports.checkRangeundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
function getRange(parameters, isOptional, reportError, name) {
  let firstOptional = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true});
  let hasOptional = false;
  let $puck_2 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true})
;
  $puck_1.Iterable[$puck_2.type].forEach.call($puck_2, function ([i, parameter]) {
    if (isOptional($unwrapTraitObject(parameter)) && !hasOptional) {
      hasOptional = true;
      firstOptional = i;
      return [];
    }
    else {
      if ((!isOptional($unwrapTraitObject(parameter)) && hasOptional)) {
        return reportError(parameter, "An optional " + name + " can't be followed by a required " + name + "");
      };
    };
  });
  return {
    start: firstOptional,
    end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}) + 1,
  };
};
exports.getRange = getRange;
function checkRange(_arguments, range, argumentName, subjectName) {
  const argumentCount = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _arguments, $isTraitObject: true});
  const max = range.end - 1;
  const min = range.start;
  let $puck_3;
  if ((argumentCount < min)) {
    $puck_3 = $puck_1.Err("few");
  }
  else {
    let $puck_4;
    if (argumentCount > max) {
      $puck_4 = $puck_1.Err("many");
    }
    else {
      $puck_4 = $puck_1.Ok([]);
    };
    $puck_3 = $puck_4;
  };
  const error = $puck_3;
  return $puck_1.Result.mapErr.call(error, function (error) {
    let $puck_5;
    if (min == max) {
      $puck_5 = "" + min + "";
    }
    else {
      $puck_5 = "" + min + " to " + max + "";
    };
    const required = $puck_5;
    return "Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given";
  });
};
exports.checkRange = checkRange
