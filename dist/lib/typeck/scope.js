#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Visitor = require("../ast/visit").Visitor;
var walkExpression = require("../ast/visit").walkExpression;
var walkBlock = require("../ast/visit").walkBlock;
var walkFunction = require("../ast/visit").walkFunction;
var walkIdentifier = require("../ast/visit").walkIdentifier;
var walkTypeBound = require("../ast/visit").walkTypeBound;
var walkVariableDeclaration = require("../ast/visit").walkVariableDeclaration;
var walkImportDirective = require("../ast/visit").walkImportDirective;
var walkAssignmentExpression = require("../ast/visit").walkAssignmentExpression;
var walkBinaryExpression = require("../ast/visit").walkBinaryExpression;
var walkCallExpression = require("../ast/visit").walkCallExpression;
var walkForExpression = require("../ast/visit").walkForExpression;
var walkIfExpression = require("../ast/visit").walkIfExpression;
var walkLoopExpression = require("../ast/visit").walkLoopExpression;
var walkUnaryExpression = require("../ast/visit").walkUnaryExpression;
var walkWhileExpression = require("../ast/visit").walkWhileExpression;
var walkIndexAccess = require("../ast/visit").walkIndexAccess;
var walkMemberAccess = require("../ast/visit").walkMemberAccess;
var walkBreak = require("../ast/visit").walkBreak;
var walkReturn = require("../ast/visit").walkReturn;
var walkArrayLiteral = require("../ast/visit").walkArrayLiteral;
var walkBooleanLiteral = require("../ast/visit").walkBooleanLiteral;
var walkNumberLiteral = require("../ast/visit").walkNumberLiteral;
var walkObjectLiteral = require("../ast/visit").walkObjectLiteral;
var walkStringLiteral = require("../ast/visit").walkStringLiteral;
var SyntaxKind = require("../compiler/ast").SyntaxKind;
function createScope(parent) {
  var bindings = {};
  return {
    parent: parent,
    getLocalBinding: function getLocalBinding(name) {
      return bindings[name];
    },
    getBinding: function getBinding(name) {
      return bindings[name] || parent && parent.getBinding(name);
    },
    declare: function declare(name, binding) {
      return bindings[name] = binding;
    }
  };
};
var scopeVisitor = exports.scopeVisitor = Object.assign({}, Visitor, {
  scope: createScope(),
  visitBlock: function visitBlock(b) {
    var self = this;
    b.scope = self.scope;
    return walkBlock(self, b);
  },
  visitFunction: function visitFunction(f) {
    var self = this;
    if (f.name) {
      self.scope.declare(f.name.name, { mutable: false });
    };
    self.scope = createScope(self.scope);
    f.scope = self.scope;
    walkFunction(self, f);
    return self.scope = self.scope.parent;
  },
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    i.scope = self.scope;
    return walkIdentifier(self, i);
  },
  visitObjectDestructure: function visitObjectDestructure(i) {
    var self = this;
    i.scope = self.scope;
    return i.members.forEach(function (m) {
      return self.scope.declare(m.local.name, { mutable: false });
    });
  },
  visitTypeBound: function visitTypeBound(t) {
    var self = this;
    t.scope = self.scope;
    return walkTypeBound(self, t);
  },
  visitVariableDeclaration: function visitVariableDeclaration(d) {
    var self = this;
    self.scope.declare(d.identifier.name, { mutable: d.mutable });
    d.scope = self.scope;
    return walkVariableDeclaration(self, d);
  },
  visitImportDirective: function visitImportDirective(i) {
    var self = this;
    i.scope = self.scope;
    if (i.specifier.kind == SyntaxKind.Identifier) {
      return self.scope.declare(i.specifier.name, { mutable: false });
    } else {
      return walkImportDirective(self, i);
    };
  },
  visitAssignmentExpression: function visitAssignmentExpression(e) {
    var self = this;
    e.scope = self.scope;
    if (e.lhs.kind == SyntaxKind.Identifier) {
      var binding = e.scope.getBinding(e.lhs.name);
      if (binding && !binding.mutable) {
        throw "Can't assign to immutable variable " + e.lhs.name;
      };
    };
    return walkAssignmentExpression(self, e);
  },
  visitBinaryExpression: function visitBinaryExpression(e) {
    var self = this;
    e.scope = self.scope;
    return walkBinaryExpression(self, e);
  },
  visitCallExpression: function visitCallExpression(e) {
    var self = this;
    e.scope = self.scope;
    return walkCallExpression(self, e);
  },
  visitForExpression: function visitForExpression(e) {
    var self = this;
    self.scope = createScope(self.scope);
    e.scope = self.scope;
    walkForExpression(self, e);
    return self.scope = self.scope.parent;
  },
  visitIfExpression: function visitIfExpression(e) {
    var self = this;
    self.scope = createScope(self.scope);
    e.scope = self.scope;
    walkIfExpression(self, e);
    return self.scope = self.scope.parent;
  },
  visitLoopExpression: function visitLoopExpression(e) {
    var self = this;
    self.scope = createScope(self.scope);
    e.scope = self.scope;
    walkLoopExpression(self, e);
    return self.scope = self.scope.parent;
  },
  visitUnaryExpression: function visitUnaryExpression(e) {
    var self = this;
    e.scope = self.scope;
    return walkUnaryExpression(self, e);
  },
  visitWhileExpression: function visitWhileExpression(e) {
    var self = this;
    self.scope = createScope(self.scope);
    e.scope = self.scope;
    walkWhileExpression(self, e);
    return self.scope = self.scope.parent;
  },
  visitIndexAccess: function visitIndexAccess(a) {
    var self = this;
    a.scope = self.scope;
    return walkIndexAccess(self, a);
  },
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    a.scope = self.scope;
    return walkMemberAccess(self, a);
  },
  visitBreak: function visitBreak(b) {
    var self = this;
    b.scope = self.scope;
    return walkBreak(self, b);
  },
  visitReturn: function visitReturn(r) {
    var self = this;
    r.scope = self.scope;
    return walkReturn(self, r);
  },
  visitArrayLiteral: function visitArrayLiteral(l) {
    var self = this;
    l.scope = self.scope;
    return walkArrayLiteral(self, l);
  },
  visitBooleanLiteral: function visitBooleanLiteral(l) {
    var self = this;
    l.scope = self.scope;
    return walkBooleanLiteral(self, l);
  },
  visitNumberLiteral: function visitNumberLiteral(l) {
    var self = this;
    l.scope = self.scope;
    return walkNumberLiteral(self, l);
  },
  visitObjectLiteral: function visitObjectLiteral(l) {
    var self = this;
    l.scope = self.scope;
    return walkObjectLiteral(self, l);
  },
  visitStringLiteral: function visitStringLiteral(l) {
    var self = this;
    l.scope = self.scope;
    return walkStringLiteral(self, l);
  }
});
module.exports.scopeVisitor = scopeVisitor;
