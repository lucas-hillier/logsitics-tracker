import { useState } from "react";
import { STATUS_ORDER } from "../constants";
import type { Driver } from "../types";

type SortDirection = "asc" | "desc" | "none";

const SORT_LABELS: Record<SortDirection, string> = {
  none: "Sort",
  asc: "Priority ↑", // delivering first
  desc: "Priority ↓", // completed first
};

const NEXT_DIRECTION: Record<SortDirection, SortDirection> = {
  none: "asc",
  asc: "desc",
  desc: "none",
};

export const useDriverSort = () => {
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");

  const toggle = () => setSortDirection((prev) => NEXT_DIRECTION[prev]);

  const sort = (drivers: Driver[]) => {
    if (sortDirection === "none") return drivers;
    return [...drivers].sort((a, b) => {
      const aIdx = STATUS_ORDER.indexOf(a.status);
      const bIdx = STATUS_ORDER.indexOf(b.status);
      return sortDirection === "asc" ? aIdx - bIdx : bIdx - aIdx;
    });
  };

  return { sortDirection, toggle, sortLabel: SORT_LABELS[sortDirection], sort };
};
