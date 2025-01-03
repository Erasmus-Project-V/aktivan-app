import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async ({ params }) => {
  const now = DateTime.now().toLocal();
  const currentWeekday = now.weekday;

  const firstWeekday = now
    .startOf("week")
    .set({ hour: 0, minute: 0, second: 0 });
  const lastWeekday = now
    .endOf("week")
    .set({ hour: 23, minute: 59, second: 59 });

  console.log(firstWeekday.toISO());
  console.log(lastWeekday.toISO());

  const activities = await pb.collection("activities").getFullList({
    filter: `(type="${
      params.type
    }" && start>="${firstWeekday.toSQL()}" && start<="${lastWeekday.toSQL()}")`,
    sort: "start",
  });

  return {
    firstWeekday: firstWeekday,
    lastWeekday: lastWeekday,
    activities,
  };
};
