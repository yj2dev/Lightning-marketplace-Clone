"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tag_model_1 = require("./model/tag.model");
const mongoose_2 = require("mongoose");
let TagRepository = class TagRepository {
    constructor(tag) {
        this.tag = tag;
    }
    async saveTags(tags, id) {
        try {
            for (const tag of tags) {
                await this.tag.create({ name: tag, toProductId: id });
            }
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async deleteTagsByProductId(productId) {
        try {
            const result = await this.tag.deleteMany({ toProductId: productId });
            console.log('[delete tags] result >> ', result);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
};
TagRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tag_model_1.Tag.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TagRepository);
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.reposigory.js.map