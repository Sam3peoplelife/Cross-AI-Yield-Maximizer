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
var CrossChainBridge = function () {
    var _classDecorators = [(0, near_sdk_js_1.NearBindgen)({})];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _bridgeTransfer_decorators;
    var _checkProposalStatus_decorators;
    var _getBridgeStatus_decorators;
    var CrossChainBridge = _classThis = /** @class */ (function () {
        function CrossChainBridge_1() {
            this.bridgeTransfers = (__runInitializers(this, _instanceExtraInitializers), new Map());
            this.proposals = new Map();
        }
        //@ts-ignore
        CrossChainBridge_1.prototype.bridgeTransfer = function (_a) {
            var user_id = _a.user_id, protocol = _a.protocol, amount = _a.amount, proposalId = _a.proposalId;
            var proposal = this.proposals.get(proposalId);
            if (!proposal || proposal.status !== 'Confirmed') {
                throw new Error('Invalid proposal');
            }
            // Check if the proposal is confirmed
            var proposalStatus = this.checkProposalStatus({ proposalId: proposalId });
            if (proposalStatus !== 'Confirmed') {
                throw new Error('Proposal is not confirmed');
            }
            // Perform the bridge transfer
            var bridgeTransferId = this.bridgeTransfers.size.toString();
            var bridgeTransfer = {
                user_id: user_id,
                source_chain: 'near',
                destination_chain: 'ethereum',
                amount: amount,
                protocol: protocol,
                status: 'Pending',
            };
            this.bridgeTransfers.set(bridgeTransferId, bridgeTransfer);
            // Update the proposal status
            proposal.status = 'Invested';
            this.proposals.set(proposalId, proposal);
        };
        //@ts-ignore
        CrossChainBridge_1.prototype.checkProposalStatus = function (_a) {
            var proposalId = _a.proposalId;
            var proposal = this.proposals.get(proposalId);
            if (!proposal) {
                return 'Invalid proposal';
            }
            return proposal.status;
        };
        //@ts-ignore
        CrossChainBridge_1.prototype.getBridgeStatus = function (_a) {
            var transactionId = _a.transactionId;
            var bridgeTransfer = this.bridgeTransfers.get(transactionId);
            if (!bridgeTransfer) {
                return 'Invalid transaction';
            }
            return bridgeTransfer.status;
        };
        return CrossChainBridge_1;
    }());
    __setFunctionName(_classThis, "CrossChainBridge");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bridgeTransfer_decorators = [(0, near_sdk_js_1.call)({})];
        _checkProposalStatus_decorators = [(0, near_sdk_js_1.view)({})];
        _getBridgeStatus_decorators = [(0, near_sdk_js_1.view)({})];
        __esDecorate(_classThis, null, _bridgeTransfer_decorators, { kind: "method", name: "bridgeTransfer", static: false, private: false, access: { has: function (obj) { return "bridgeTransfer" in obj; }, get: function (obj) { return obj.bridgeTransfer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkProposalStatus_decorators, { kind: "method", name: "checkProposalStatus", static: false, private: false, access: { has: function (obj) { return "checkProposalStatus" in obj; }, get: function (obj) { return obj.checkProposalStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBridgeStatus_decorators, { kind: "method", name: "getBridgeStatus", static: false, private: false, access: { has: function (obj) { return "getBridgeStatus" in obj; }, get: function (obj) { return obj.getBridgeStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CrossChainBridge = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CrossChainBridge = _classThis;
}();
