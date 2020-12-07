#!usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs = require("fs");
var AirPlane = /** @class */ (function () {
    function AirPlane(totalRows, seatsPerRow) {
        if (totalRows === void 0) { totalRows = 128; }
        if (seatsPerRow === void 0) { seatsPerRow = 8; }
        this.totalRows = totalRows;
        this.seatsPerRow = seatsPerRow;
    }
    return AirPlane;
}());
var BoardingPass = /** @class */ (function (_super) {
    __extends(BoardingPass, _super);
    function BoardingPass(ticketString, plane) {
        if (plane === void 0) { plane = new AirPlane(); }
        var _this = _super.call(this, plane.totalRows, plane.seatsPerRow) || this;
        _this.ticketString = ticketString;
        _this.rowString = ticketString.slice(0, ticketString.length - 3);
        _this.rowSelectorHigh = "B";
        _this.rowSelectorLow = "F";
        _this.seatString = ticketString.slice(ticketString.length - 3);
        _this.seatSelectorHigh = "R";
        _this.seatSelectorLow = "L";
        _this.rowNumber = _this.decodeTicketString(_this.rowString, _this.rowSelectorHigh, _this.rowSelectorLow, _this.totalRows);
        _this.seatNumber = _this.decodeTicketString(_this.seatString, _this.seatSelectorHigh, _this.seatSelectorLow, _this.seatsPerRow);
        _this.seatId = _this.rowNumber * _this.seatsPerRow + _this.seatNumber;
        return _this;
    }
    BoardingPass.prototype.decodeTicketString = function (ticketString, selectHigh, selectLow, sectionMax, sectionMin) {
        if (sectionMin === void 0) { sectionMin = 0; }
        var sectionMiddle = Math.floor((sectionMax + sectionMin) / 2);
        for (var i = 0; i < ticketString.length; i++) {
            var char = ticketString.charAt(i);
            if (char === selectHigh) {
                sectionMin = sectionMiddle;
            }
            else if (char === selectLow) {
                sectionMax = sectionMiddle;
            }
            sectionMiddle = Math.floor((sectionMax + sectionMin) / 2);
        }
        return sectionMiddle;
    };
    return BoardingPass;
}(AirPlane));
var DATA = fs.readFileSync("./input.txt", "utf-8").split(/\n/gm).map(function (ticket) { return new BoardingPass(ticket); });
function allSeatIdsAsc(DATA) {
    var list = [];
    DATA.forEach(function (ticket) { return list.push(ticket.seatId); });
    list.sort(function (a, b) { return a - b; });
    return list;
}
function part1(DATA) {
    var list = allSeatIdsAsc(DATA);
    return list[list.length - 1];
}
function part2(data) {
    var list = allSeatIdsAsc(DATA);
    for (var i = 0; i < list.length; i++) {
        if ((list[i] - list[i - 1]) > 1) {
            return list[i] - 1;
        }
    }
}
console.time("part 1");
console.log(part1(DATA));
console.timeLog("part 1");
console.time("part 2");
console.log(part2(DATA));
console.timeLog("part 2");
