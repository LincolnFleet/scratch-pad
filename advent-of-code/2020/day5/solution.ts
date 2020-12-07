#!usr/bin/env node

import { isConstructorDeclaration, NumericLiteral } from "typescript";

const fs = require("fs");

class AirPlane {
  totalRows: number;
  seatsPerRow: number;
  constructor(totalRows = 128, seatsPerRow = 8) {
    this.totalRows = totalRows;
    this.seatsPerRow = seatsPerRow;
  }
}

class BoardingPass extends AirPlane {
  plane: AirPlane;
  ticketString: string;
  rowString: string;
  seatString: string;
  rowSelectorHigh: string;
  rowSelectorLow: string;
  seatSelectorHigh: string;
  seatSelectorLow: string;
  rowNumber: number;
  seatNumber: number;
  seatId: number;

  constructor(ticketString: string, plane = new AirPlane()) {
    super(plane.totalRows, plane.seatsPerRow);
    this.ticketString = ticketString;
    this.rowString = ticketString.slice(0, ticketString.length - 3);
    this.rowSelectorHigh = "B";
    this.rowSelectorLow = "F";
    this.seatString = ticketString.slice(ticketString.length - 3);
    this.seatSelectorHigh = "R";
    this.seatSelectorLow = "L";
    this.rowNumber = this.decodeTicketString(
      this.rowString,
      this.rowSelectorHigh,
      this.rowSelectorLow,
      this.totalRows
    );
    this.seatNumber = this.decodeTicketString(
      this.seatString, 
      this.seatSelectorHigh, 
      this.seatSelectorLow,
      this.seatsPerRow
    );
    this.seatId = this.rowNumber * this.seatsPerRow + this.seatNumber;
  }

  decodeTicketString(
    ticketString: string,
    selectHigh: string,
    selectLow: string,
    sectionMax: number,
    sectionMin: number = 0,
  ): number {
    let sectionMiddle: number = Math.floor((sectionMax + sectionMin) / 2);

    for (let i=0; i < ticketString.length; i++) {
      const char = ticketString.charAt(i);
      if (char === selectHigh) {
        sectionMin = sectionMiddle;
      } else if (char === selectLow) {
        sectionMax = sectionMiddle;
      }
      sectionMiddle = Math.floor((sectionMax + sectionMin) / 2);
    }

    return sectionMiddle;
  }
}

const DATA: BoardingPass[] = fs.readFileSync("./input.txt", "utf-8").split(/\n/gm).map((ticket) => new BoardingPass(ticket));

function allSeatIdsAsc(DATA: BoardingPass[]): number[] {
  let list: number[] = [];
  DATA.forEach((ticket) => list.push(ticket.seatId));
  list.sort((a, b) => a - b);
  return list;
}

function part1(DATA: BoardingPass[]): number {
  const list = allSeatIdsAsc(DATA);
  return list[list.length - 1];
}

function part2(data: BoardingPass[]): number {
  const list = allSeatIdsAsc(DATA);
  
  for (let i = 0; i < list.length; i++) {
    if ((list[i] - list[i-1]) > 1) {
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