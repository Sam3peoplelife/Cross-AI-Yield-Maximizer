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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalStatus = void 0;
var near_sdk_js_1 = require("near-sdk-js");
var AssetManager = function () {
    var _classDecorators = [(0, near_sdk_js_1.NearBindgen)({})];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _proposeAllocation_decorators;
    var _confirmAllocation_decorators;
    var _rejectAllocation_decorators;
    var _getUserProposals_decorators;
    var AssetManager = _classThis = /** @class */ (function () {
        function AssetManager_1() {
            this.proposals = (__runInitializers(this, _instanceExtraInitializers), new Map());
            this.userProposals = new Map();
        }
        AssetManager_1.getUserProposals = function (_a) {
            var user_id = _a.user_id;
            // Return a list of proposals for the given user
            return AssetManager.proposals.filter(function (proposal) { return proposal.user_id === user_id; });
        };
        AssetManager_1.confirmAllocation = function (_a) {
            var user_id = _a.user_id, proposalId = _a.proposalId;
            // Perform the actual allocation
            var proposal = AssetManager.proposals.find(function (proposal) { return proposal.proposalId === proposalId; });
            if (proposal) {
                proposal.status = ProposalStatus.Confirmed;
            }
        };
        //@ts-ignore
        AssetManager_1.prototype.proposeAllocation = function (_a) {
            var user_id = _a.user_id, protocol = _a.protocol, amount = _a.amount, risk_level = _a.risk_level;
            // Validate input parameters
            if (risk_level < 0 || risk_level > 100) {
                throw new Error('Risk level must be between 0 and 100');
            }
            // Create a new proposal
            var proposalId = this.proposals.size.toString();
            var proposal = {
                user_id: user_id,
                protocol: protocol,
                amount: amount,
                risk_level: risk_level,
                status: ProposalStatus.Pending,
                proposalId: proposalId
            };
            this.proposals.set(proposalId, proposal);
            this.userProposals.set(user_id, __spreadArray(__spreadArray([], (this.userProposals.get(user_id) || []), true), [proposalId], false));
        };
        //@ts-ignore
        AssetManager_1.prototype.confirmAllocation = function (_a) {
            var user_id = _a.user_id, proposalId = _a.proposalId;
            // Validate input parameters
            var proposal = this.proposals.get(proposalId);
            if (!proposal || proposal.user_id !== user_id || proposal.status !== ProposalStatus.Pending) {
                throw new Error('Invalid proposal');
            }
            // Confirm the proposal
            proposal.status = ProposalStatus.Confirmed;
            this.proposals.set(proposalId, proposal);
        };
        //@ts-ignore
        AssetManager_1.prototype.rejectAllocation = function (_a) {
            var user_id = _a.user_id, proposalId = _a.proposalId;
            // Validate input parameters
            var proposal = this.proposals.get(proposalId);
            if (!proposal || proposal.user_id !== user_id || proposal.status !== ProposalStatus.Pending) {
                throw new Error('Invalid proposal');
            }
            // Reject the proposal
            proposal.status = ProposalStatus.Rejected;
            this.proposals.set(proposalId, proposal);
        };
        //@ts-ignore
        AssetManager_1.prototype.getUserProposals = function (_a) {
            var _this = this;
            var user_id = _a.user_id;
            // Return the proposals for the user
            var proposals = this.userProposals.get(user_id) || [];
            return proposals.map(function (proposalId) { return _this.proposals.get(proposalId); });
        };
        return AssetManager_1;
    }());
    __setFunctionName(_classThis, "AssetManager");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _proposeAllocation_decorators = [(0, near_sdk_js_1.call)({})];
        _confirmAllocation_decorators = [(0, near_sdk_js_1.call)({})];
        _rejectAllocation_decorators = [(0, near_sdk_js_1.call)({})];
        _getUserProposals_decorators = [(0, near_sdk_js_1.view)({})];
        __esDecorate(_classThis, null, _proposeAllocation_decorators, { kind: "method", name: "proposeAllocation", static: false, private: false, access: { has: function (obj) { return "proposeAllocation" in obj; }, get: function (obj) { return obj.proposeAllocation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmAllocation_decorators, { kind: "method", name: "confirmAllocation", static: false, private: false, access: { has: function (obj) { return "confirmAllocation" in obj; }, get: function (obj) { return obj.confirmAllocation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectAllocation_decorators, { kind: "method", name: "rejectAllocation", static: false, private: false, access: { has: function (obj) { return "rejectAllocation" in obj; }, get: function (obj) { return obj.rejectAllocation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserProposals_decorators, { kind: "method", name: "getUserProposals", static: false, private: false, access: { has: function (obj) { return "getUserProposals" in obj; }, get: function (obj) { return obj.getUserProposals; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AssetManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    // In AssetManager contract
    _classThis.proposals = [];
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AssetManager = _classThis;
}();
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus[ProposalStatus["Pending"] = 0] = "Pending";
    ProposalStatus[ProposalStatus["Confirmed"] = 1] = "Confirmed";
    ProposalStatus[ProposalStatus["Rejected"] = 2] = "Rejected";
})(ProposalStatus || (exports.ProposalStatus = ProposalStatus = {}));
