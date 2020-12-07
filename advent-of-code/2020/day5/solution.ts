#!usr/bin/env node

const fs = require("fs");

const DATA = fs.readFileSync("./input.txt", "utf-8").split(/^\n$/gm);

function binarySearch(
  sectionMax: number,
  sectionMin: number,
  ticketString: string,
  topHalfMatch: string,
  bottomHalfMatch: string
): number {
  const testChar: string = ticketString.charAt(0);
  const sectionMiddle: number = Math.floor(sectionMax / 2);
  if (testChar.toUpperCase() === topHalfMatch.toUpperCase()) {
    binarySearch(
      sectionMax,
      sectionMiddle,
      ticketString.slice(1),
      topHalfMatch,
      bottomHalfMatch
    );
  } else if (testChar.toUpperCase() === bottomHalfMatch.toUpperCase()) {
    binarySearch(
      sectionMiddle,
      sectionMin,
      ticketString.slice(1),
      topHalfMatch,
      bottomHalfMatch
    );
  } else {
    return sectionMax;
  }
}

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
  seatId: number;

  constructor(ticketString: string, plane = new AirPlane()) {
    super(plane.totalRows, plane.seatsPerRow);
    this.ticketString = ticketString;
    this.rowString = ticketString.slice(0, ticketString.length - 3);
    this.rowSelectorHigh = "B";
    this.rowSelectorLow = "F";
    this.seatString = ticketString.slice(ticketString.length - 3, ticketString.length - 1);
    this.seatSelectorHigh = "R";
    this.seatSelectorLow = "L";
    this.seatId = this.findSeatId();
  }

  findSeatId(): number {
    const row: number = binarySearch(
      this.totalRows,
      1,
      this.rowString,
      this.rowSelectorHigh,
      this.rowSelectorLow
    );
    const column: number = binarySearch(
      this.seatsPerRow,
      1,
      this.seatString,
      this.seatSelectorHigh,
      this.seatSelectorLow
    );
    return row * this.seatsPerRow + column;
  }
}
