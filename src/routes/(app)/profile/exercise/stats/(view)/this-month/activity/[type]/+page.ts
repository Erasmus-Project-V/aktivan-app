import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async ({ params }) => {
    const currentDayInMonth = DateTime.now().toLocal().day;

    const firstDayInMonth = DateTime.now().toLocal().minus({ days: currentDayInMonth - 1 }).set( { hour: 0, minute: 0, second: 0, millisecond: 0 } );
    const lastDayInMonth = DateTime.now().toLocal().plus({ days: DateTime.now().toLocal().daysInMonth - currentDayInMonth }).set( { hour: 23, minute: 59, second: 59, millisecond: 999 } );

    const activities = await pb.collection("activities").getFullList({
        filter: `(type="${params.type}" && start>="${firstDayInMonth.toISODate()}" && start<"${lastDayInMonth.toISODate()}")`,
        sort: "start",
    });

    return {
        firstDayInMonth,
        lastDayInMonth,
        activities,
    };
};