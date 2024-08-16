import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async () => {
    const activities = await pb.collection("activities").getList(1, 10000000);

    /*    activities.items.map((activity) => {
            const newActivity = activity;

            // newActivity.start = new DateTime(activity.start).loc
        });*/

    return {
        activities: activities.items,
    };
};