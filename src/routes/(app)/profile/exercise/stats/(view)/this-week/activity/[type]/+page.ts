import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async ({ params }) => {
    const currentWeekday = DateTime.now().toLocal().weekday;

    const firstWeekday = DateTime.now().toLocal().minus({ days: currentWeekday - 1 }).set( { hour: 0, minute: 0, second: 0, millisecond: 0 } );
    const lastWeekday = DateTime.now().toLocal().plus({ days: 7 - currentWeekday }).set( { hour: 23, minute: 59, second: 59, millisecond: 999 } );

    const activities = await pb.collection("activities").getFullList({
        filter: `(type="${params.type}" && start>="${firstWeekday.toISODate()}" && start<"${lastWeekday.toISODate()}")`,
        sort: "start",
    });

    return {
        firstWeekday,
        lastWeekday,
        activities,
    };
};