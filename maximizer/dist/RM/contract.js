"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
var near_sdk_js_1 = require("near-sdk-js");
var RiskManager = function () {
    var _classDecorators = [(0, near_sdk_js_1.NearBindgen)({})];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _setUserRiskProfile_decorators;
    var _getUserRiskProfile_decorators;
    var RiskManager = _classThis = /** @class */ (function () {
        function RiskManager_1() {
            this.riskProfiles = (__runInitializers(this, _instanceExtraInitializers), new Map());
            /******  09d20619-40a9-4bfb-b754-4bb7f6666c29  *******/
        }
        RiskManager_1.getUserRiskProfile = function (arg0) {
            throw new Error('Method not implemented.');
        };
        //@ts-ignore
        RiskManager_1.prototype.setUserRiskProfile = function (_a) {
            var user_id = _a.user_id, risk_level = _a.risk_level;
            // Validate input parameters
            if (risk_level < 0 || risk_level > 100) {
                throw new Error('Risk level must be between 0 and 100');
            }
            // Set the risk profile for the user
            this.riskProfiles.set(user_id, { user_id: user_id, risk_level: risk_level });
        };
        //@ts-ignore
        RiskManager_1.prototype.getUserRiskProfile = function (_a) {
            var user_id = _a.user_id;
            // Return the risk profile for the user, or null if not found
            return this.riskProfiles.get(user_id) || null;
        };
        return RiskManager_1;
    }());
    __setFunctionName(_classThis, "RiskManager");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _setUserRiskProfile_decorators = [(0, near_sdk_js_1.call)({})];
        _getUserRiskProfile_decorators = [(0, near_sdk_js_1.view)({})];
        __esDecorate(_classThis, null, _setUserRiskProfile_decorators, { kind: "method", name: "setUserRiskProfile", static: false, private: false, access: { has: function (obj) { return "setUserRiskProfile" in obj; }, get: function (obj) { return obj.setUserRiskProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserRiskProfile_decorators, { kind: "method", name: "getUserRiskProfile", static: false, private: false, access: { has: function (obj) { return "getUserRiskProfile" in obj; }, get: function (obj) { return obj.getUserRiskProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RiskManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RiskManager = _classThis;
}();
