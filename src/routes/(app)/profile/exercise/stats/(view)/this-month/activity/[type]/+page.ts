import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async ({ params }) => {
  const firstDayInMonth = DateTime.now()
    .toLocal()
    .startOf("month")
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const lastDayInMonth = DateTime.now()
    .toLocal()
    .endOf("month")
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

  const activities = await pb.collection("activities").getFullList({
    filter: `(type="${
      params.type
    }" && start>="${firstDayInMonth.toSQL()}" && start<"${lastDayInMonth.toSQL()}")`,
    sort: "start",
  });

  return {
    firstDayInMonth,
    lastDayInMonth,
    activities,
  };
};
