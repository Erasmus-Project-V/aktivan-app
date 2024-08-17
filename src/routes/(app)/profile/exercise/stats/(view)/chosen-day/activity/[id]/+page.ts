import type { PageLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { DateTime } from "luxon";

export const load: PageLoad = async ({ params }) => {
    const activity = await pb.collection("activities").getOne(params.id);
    const locations = await pb.collection("locations").getFullList({
        filter: `(activity="${params.id}")`,
        sort: "time",
    });

    return {
        activity,
        locations,
    };
};