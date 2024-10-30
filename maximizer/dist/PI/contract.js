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
    const kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    console.log(contextIn.kind);
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        //console.log(kind);
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
exports.InvestmentStatus = void 0;
var near_sdk_js_1 = require("near-sdk-js");
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus[InvestmentStatus["Deployed"] = 0] = "Deployed";
    // Add other statuses as needed
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
var ProtocolIntegrator = function () {
    var _classDecorators = [(0, near_sdk_js_1.NearBindgen)({})];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _staticExtraInitializers = [];
    var _instanceExtraInitializers = [];
    var _static_getUserInvestments_decorators;
    var _investWithConfirmation_decorators;
    var _withdrawFromProtocol_decorators;
    var _getInvestmentStatus_decorators;
    var ProtocolIntegrator = _classThis = /** @class */ (function () {
        function ProtocolIntegrator_1() {
            this.investments = (__runInitializers(this, _instanceExtraInitializers), new Map());
            this.proposals = new Map();
        }
        //@ts-ignore
        ProtocolIntegrator_1.getUserInvestments = function (_a) {
            var user_id = _a.user_id;
            // Return a list of investments for the given user
            return ProtocolIntegrator.investments.filter(function (investment) { return investment.user_id === user_id; });
        };
        //@ts-ignore
        ProtocolIntegrator_1.prototype.investWithConfirmation = function (_a) {
            var proposalId = _a.proposalId;
            var proposal = this.proposals.get(proposalId);
            if (!proposal || proposal.status !== 'Confirmed') {
                throw new Error('Invalid proposal');
            }
            // Invest the user's funds in the selected protocol
            var investmentId = this.investments.size.toString();
            var investment = {
                investmentId: investmentId,
                user_id: proposal.user_id,
                protocol: proposal.protocol,
                amount: proposal.amount,
                investmentDate: new Date().toISOString(),
                status: InvestmentStatus.Deployed
            };
            this.investments.set(investmentId, investment);
        };
        //@ts-ignore
        ProtocolIntegrator_1.prototype.withdrawFromProtocol = function (_a) {
            var _this = this;
            var user_id = _a.user_id, protocol = _a.protocol;
            // Withdraw the user's funds from the selected protocol
            var investmentsForProtocol = Array.from(this.investments.values())
                .filter(function (investment) { return investment.protocol === protocol && investment.user_id === user_id; });
            investmentsForProtocol.forEach(function (investment) {
                _this.investments.delete(investment.investmentId);
            });
        };
        //@ts-ignore
        ProtocolIntegrator_1.prototype.getInvestmentStatus = function (_a) {
            var user_id = _a.user_id;
            // Return the current investment status for the user in different protocols
            return Array.from(this.investments.values()).filter(function (investment) { return investment.user_id === user_id; });
        };
        return ProtocolIntegrator_1;
    }());
    __setFunctionName(_classThis, "ProtocolIntegrator");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _static_getUserInvestments_decorators = [(0, near_sdk_js_1.view)({})];
        _investWithConfirmation_decorators = [(0, near_sdk_js_1.call)({})];
        _withdrawFromProtocol_decorators = [(0, near_sdk_js_1.call)({})];
        _getInvestmentStatus_decorators = [(0, near_sdk_js_1.view)({})];
        __esDecorate(_classThis, null, _static_getUserInvestments_decorators, { kind: "method", name: "getUserInvestments", static: true, private: false, access: { has: function (obj) { return "getUserInvestments" in obj; }, get: function (obj) { return obj.getUserInvestments; } }, metadata: _metadata }, null, _staticExtraInitializers);
        __esDecorate(_classThis, null, _investWithConfirmation_decorators, { kind: "method", name: "investWithConfirmation", static: false, private: false, access: { has: function (obj) { return "investWithConfirmation" in obj; }, get: function (obj) { return obj.investWithConfirmation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _withdrawFromProtocol_decorators, { kind: "method", name: "withdrawFromProtocol", static: false, private: false, access: { has: function (obj) { return "withdrawFromProtocol" in obj; }, get: function (obj) { return obj.withdrawFromProtocol; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInvestmentStatus_decorators, { kind: "method", name: "getInvestmentStatus", static: false, private: false, access: { has: function (obj) { return "getInvestmentStatus" in obj; }, get: function (obj) { return obj.getInvestmentStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProtocolIntegrator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.investments = (__runInitializers(_classThis, _staticExtraInitializers), []);
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProtocolIntegrator = _classThis;
}();
