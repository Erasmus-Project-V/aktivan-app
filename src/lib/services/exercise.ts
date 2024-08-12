
// Define an interface for the function parameters
export interface StepCalculatorParams {
    distanceMeters: number;
    sex: "male" | "female";
    heightCm: number;
    speedMS: number;
    weightKg: number;
}

export function calculateSteps({
                            distanceMeters,
                            sex,
                            heightCm,
                            speedMS
                        }: StepCalculatorParams): number {
    // Base stride length estimate (in meters)
    let baseStrideLength: number;

    switch (sex) {
        case "male":
            baseStrideLength = (heightCm * 0.415) / 100;
            break;
        case "female":
            baseStrideLength = (heightCm * 0.413) / 100;
            break;
        default:
            throw new Error("Invalid sex");
    }

    // Adjust stride length based on speed
    // This is a simplified adjustment; actual relationship is more complex
    const averageWalkingSpeed = 1.4; // m/s
    const speedAdjustment = 1 + (speedMS - averageWalkingSpeed) * 0.1;
    const adjustedStrideLength = baseStrideLength * speedAdjustment;

    // Calculate number of steps
    const steps = distanceMeters / adjustedStrideLength;

    return Math.round(steps);
}

export function calculateCaloriesBurned({
                                     distanceMeters,
                                     weightKg,
                                     speedMS
                                 }: StepCalculatorParams): number {
    // Convert speed from m/s to km/h
    const speedKmH = speedMS * 3.6;

    // Estimate MET based on speed
    let met: number;
    if (speedKmH < 4.0) {
        met = 2.0; // Very slow walking
    } else if (speedKmH < 4.8) {
        met = 2.5; // Slow walking
    } else if (speedKmH < 5.6) {
        met = 3.0; // Moderate walking
    } else if (speedKmH < 6.4) {
        met = 3.5; // Fast walking
    } else {
        met = 4.0; // Very fast walking / light jogging
    }

    // Calculate duration in hours
    const durationHours = distanceMeters / (speedMS * 3600);

    // Calculate calories burned
    const caloriesBurned = met * weightKg * durationHours;

    return caloriesBurned;
}
