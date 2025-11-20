"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = void 0;
var typeorm_1 = require("typeorm");
var Medicine = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _nombre_decorators;
    var _nombre_initializers = [];
    var _nombre_extraInitializers = [];
    var _lote_decorators;
    var _lote_initializers = [];
    var _lote_extraInitializers = [];
    var _vencimiento_decorators;
    var _vencimiento_initializers = [];
    var _vencimiento_extraInitializers = [];
    var _stock_actual_decorators;
    var _stock_actual_initializers = [];
    var _stock_actual_extraInitializers = [];
    var _stock_minimo_decorators;
    var _stock_minimo_initializers = [];
    var _stock_minimo_extraInitializers = [];
    var Medicine = _classThis = /** @class */ (function () {
        function Medicine_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.nombre = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _nombre_initializers, void 0));
            this.lote = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _lote_initializers, void 0));
            this.vencimiento = (__runInitializers(this, _lote_extraInitializers), __runInitializers(this, _vencimiento_initializers, void 0));
            this.stock_actual = (__runInitializers(this, _vencimiento_extraInitializers), __runInitializers(this, _stock_actual_initializers, void 0));
            this.stock_minimo = (__runInitializers(this, _stock_actual_extraInitializers), __runInitializers(this, _stock_minimo_initializers, void 0));
            __runInitializers(this, _stock_minimo_extraInitializers);
        }
        return Medicine_1;
    }());
    __setFunctionName(_classThis, "Medicine");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombre_decorators = [(0, typeorm_1.Column)()];
        _lote_decorators = [(0, typeorm_1.Column)()];
        _vencimiento_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _stock_actual_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _stock_minimo_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: function (obj) { return "nombre" in obj; }, get: function (obj) { return obj.nombre; }, set: function (obj, value) { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
        __esDecorate(null, null, _lote_decorators, { kind: "field", name: "lote", static: false, private: false, access: { has: function (obj) { return "lote" in obj; }, get: function (obj) { return obj.lote; }, set: function (obj, value) { obj.lote = value; } }, metadata: _metadata }, _lote_initializers, _lote_extraInitializers);
        __esDecorate(null, null, _vencimiento_decorators, { kind: "field", name: "vencimiento", static: false, private: false, access: { has: function (obj) { return "vencimiento" in obj; }, get: function (obj) { return obj.vencimiento; }, set: function (obj, value) { obj.vencimiento = value; } }, metadata: _metadata }, _vencimiento_initializers, _vencimiento_extraInitializers);
        __esDecorate(null, null, _stock_actual_decorators, { kind: "field", name: "stock_actual", static: false, private: false, access: { has: function (obj) { return "stock_actual" in obj; }, get: function (obj) { return obj.stock_actual; }, set: function (obj, value) { obj.stock_actual = value; } }, metadata: _metadata }, _stock_actual_initializers, _stock_actual_extraInitializers);
        __esDecorate(null, null, _stock_minimo_decorators, { kind: "field", name: "stock_minimo", static: false, private: false, access: { has: function (obj) { return "stock_minimo" in obj; }, get: function (obj) { return obj.stock_minimo; }, set: function (obj, value) { obj.stock_minimo = value; } }, metadata: _metadata }, _stock_minimo_initializers, _stock_minimo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Medicine = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Medicine = _classThis;
}();
exports.Medicine = Medicine;
