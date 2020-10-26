#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var minimist_1 = __importDefault(require("minimist"));
var chalk_1 = __importDefault(require("chalk"));
function getFiles(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var directories, files;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.readdir(dir, { withFileTypes: true })];
                case 1:
                    directories = _b.sent();
                    return [4 /*yield*/, Promise.all(directories.map(function (file) {
                            var res = path_1.resolve(dir, file.name);
                            return file.isDirectory() ? getFiles(res) : res;
                        }))];
                case 2:
                    files = _b.sent();
                    return [2 /*return*/, (_a = Array.prototype).concat.apply(_a, __spread(files))];
            }
        });
    });
}
function main() {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function () {
        var args, currentDirectory, tagDirectory, entryDirectory_1, files, tags_1, files_1, files_1_1, file, trimmedPath, parsed, allMatches, e_1_1, _c, _d, tag, entries, content, fileName, e_2_1, err_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 30, , 31]);
                    console.log(chalk_1.default.blue('\nRunning Roamdown\n'));
                    args = minimist_1.default(process.argv.slice(2));
                    currentDirectory = process.cwd();
                    if (!args.tagDirectory) {
                        console.log(chalk_1.default.blue('No --tagDirectory passed, defaulting to "tags"\n'));
                    }
                    if (!args.entryDirectory) {
                        console.log(chalk_1.default.blue('No --entryDirectory passed, defaulting to "entries"\n'));
                    }
                    tagDirectory = args.tagDirectory || 'tags';
                    entryDirectory_1 = args.entryDirectory || 'entries';
                    // Remove all current tags files.
                    //
                    // For some reason and I'm not quite sure why but using fse.promises is failing
                    // when I execute this package as a binary. When I implemented it in the journal
                    // repository it worked fine and it worked fine in GitHub Actions. I've had to resort
                    // to using the built in fs, which ain't bad, just a tad annoying.
                    return [4 /*yield*/, fs_1.default.promises.rmdir(currentDirectory + ("/" + tagDirectory + "/"), { recursive: true })];
                case 1:
                    // Remove all current tags files.
                    //
                    // For some reason and I'm not quite sure why but using fse.promises is failing
                    // when I execute this package as a binary. When I implemented it in the journal
                    // repository it worked fine and it worked fine in GitHub Actions. I've had to resort
                    // to using the built in fs, which ain't bad, just a tad annoying.
                    _e.sent();
                    return [4 /*yield*/, getFiles(currentDirectory + ("/" + entryDirectory_1 + "/"))];
                case 2:
                    files = _e.sent();
                    tags_1 = {};
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 9, 10, 15]);
                    files_1 = __asyncValues(files);
                    _e.label = 4;
                case 4: return [4 /*yield*/, files_1.next()];
                case 5:
                    if (!(files_1_1 = _e.sent(), !files_1_1.done)) return [3 /*break*/, 8];
                    file = files_1_1.value;
                    trimmedPath = file.split(entryDirectory_1)[1];
                    return [4 /*yield*/, fs_extra_1.default.readFile(file, 'utf-8')];
                case 6:
                    parsed = _e.sent();
                    allMatches = __spread(parsed.matchAll(/\[\[(.*?)\]\]/gi));
                    allMatches === null || allMatches === void 0 ? void 0 : allMatches.forEach(function (match) {
                        var matchAsString = match[1];
                        if (!tags_1[matchAsString]) {
                            tags_1[matchAsString] = [];
                        }
                        // Build the snippet that will appear alongside the link to the file
                        var firstFullStopIndex = parsed.lastIndexOf('.', match.index);
                        var lastFullStopIndex = parsed.indexOf('.', match.index);
                        var lastNextLineIndex = parsed.indexOf('\n', match.index);
                        var lastIndex = lastNextLineIndex < lastFullStopIndex ? lastNextLineIndex : lastFullStopIndex;
                        var substring = parsed.substring(firstFullStopIndex, lastIndex);
                        tags_1[matchAsString].push({
                            entryPath: '/' + entryDirectory_1 + trimmedPath,
                            snippet: substring.replace('.', '').replace(/(^[ \t]*\n)/gm, "")
                        });
                    });
                    _e.label = 7;
                case 7: return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _e.trys.push([10, , 13, 14]);
                    if (!(files_1_1 && !files_1_1.done && (_a = files_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _a.call(files_1)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    console.log(chalk_1.default.blue("Creating files in \"/" + tagDirectory + "\"...\n"));
                    _e.label = 16;
                case 16:
                    _e.trys.push([16, 23, 24, 29]);
                    _c = __asyncValues(Object.keys(tags_1));
                    _e.label = 17;
                case 17: return [4 /*yield*/, _c.next()];
                case 18:
                    if (!(_d = _e.sent(), !_d.done)) return [3 /*break*/, 22];
                    tag = _d.value;
                    entries = __spread(new Set(tags_1[tag]));
                    content = "# " + tag + "\n\nEntries for " + tag + " can be found in:\n\n" + entries.map(function (entry) { return "[" + entry.entryPath + "](" + entry.entryPath + ")\n>" + entry.snippet; }).join('\r\n\n') + "\n";
                    fileName = path_1.resolve(currentDirectory + ("/" + tagDirectory + "/") + tag + '.md');
                    return [4 /*yield*/, fs_extra_1.default.createFile(fileName)];
                case 19:
                    _e.sent();
                    return [4 /*yield*/, fs_extra_1.default.writeFile(fileName, content, 'utf-8')];
                case 20:
                    _e.sent();
                    _e.label = 21;
                case 21: return [3 /*break*/, 17];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _e.trys.push([24, , 27, 28]);
                    if (!(_d && !_d.done && (_b = _c.return))) return [3 /*break*/, 26];
                    return [4 /*yield*/, _b.call(_c)];
                case 25:
                    _e.sent();
                    _e.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29:
                    console.log(chalk_1.default.green('All files successfully created\n'));
                    return [3 /*break*/, 31];
                case 30:
                    err_1 = _e.sent();
                    console.error(err_1);
                    return [3 /*break*/, 31];
                case 31: return [2 /*return*/];
            }
        });
    });
}
main();
