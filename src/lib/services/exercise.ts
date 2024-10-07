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
  speedMS,
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
  speedMS,
}: StepCalculatorParams): number {
  // Convert speed from m/s to km/h
  const speedKmH = speedMS * 3.6;

  // Array of speed thresholds (km/h) and corresponding MET values
  const speedMETTable = [
    { maxSpeed: 4.0, met: 2.0 }, // Very slow walking
    { maxSpeed: 4.8, met: 2.5 }, // Slow walking
    { maxSpeed: 5.6, met: 3.0 }, // Moderate walking
    { maxSpeed: 6.4, met: 3.5 }, // Fast walking
    { maxSpeed: 8.0, met: 4.3 }, // Very fast walking / light jogging
    { maxSpeed: 9.7, met: 7.0 }, // Jogging
    { maxSpeed: 11.3, met: 8.3 }, // Running
    { maxSpeed: 12.9, met: 9.8 }, // Fast running
    { maxSpeed: 14.5, met: 11.0 }, // Very fast running
    { maxSpeed: Infinity, met: 12.8 }, // Sprinting
  ];

  // Find the appropriate MET value for the given speed
  const metValue =
    speedMETTable.find((entry) => speedKmH < entry.maxSpeed)?.met || 12.8;

  // Calculate duration in hours
  const durationHours = distanceMeters / (speedMS * 3600);

  // Calculate calories burned
  const caloriesBurned = metValue * weightKg * durationHours;

  return Math.round(caloriesBurned);
}
