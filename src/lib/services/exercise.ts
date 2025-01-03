// Define an interface for the function parameters
import { exercises } from "$lib/types/exercises";

export interface StepCalculatorParams {
  distanceMeters: number;
  sex: "male" | "female";
  heightCm: number;
  speedMS: number;
  weightKg: number;
  durationHours: number;
  exerciseId: number;
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
  exerciseId,
  weightKg,
  speedMS,
  durationHours
}: StepCalculatorParams): number {
  // Convert speed from m/s to km/h
  const speedKmH = speedMS * 3.6;

  // Array of speed thresholds (km/h) and corresponding MET values
  const speedMETTable = exercises[exerciseId].metTable;

  // Find the appropriate MET value for the given speed
  const metValue =
    speedMETTable?.find((entry) => speedKmH < entry.maxSpeed)?.met || 12.8;

  console.log(`Hours: ${durationHours}`);
  // Calculate calories burned
  const caloriesBurned = metValue * weightKg * durationHours;

  return caloriesBurned;
}
