import type { LayoutLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: LayoutLoad = async () => {
    const activities = await pb.collection("activities").getFullList();

    return {
        activities: activities,
    };
};