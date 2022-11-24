import eachWeekOfInterval from "date-fns/eachWeekOfInterval";

export function get2023Dates() {
  return eachWeekOfInterval(
    {
      start: new Date(2022, 12, 7), // January 7
      end: new Date(2023, 3, 1), // April 1
    },
    {
      weekStartsOn: 5, // Friday
    }
  );
}

export enum Status {
  Unavailable = "unavailable",
  Maybe = "maybe",
  Available = "available",
}

export type Availability = {
  [key: string]: Status | null;
};
