import { ObjectId } from "mongodb";

export type Activity = {
  _id: ObjectId;
  activity_type: string;
  date: string;
  favorite: boolean;
  title: string;
  distance: number;
  calories: number;
  time: string;
  average_heart_rate: number;
  max_heart_rate: number;
  average_cadence: number;
  max_cadence: number;
  average_pace: string;
  best_pace: string;
  total_ascent: number;
  total_descent: number;
  average_stride_length: number;
  average_vertical_ratio?: number;
  average_vertical_oscillation?: number;
  average_ground_contact_time?: number;
  training_stress_score: number;
  grit?: number;
  flow?: number;
  average_swolf?: number;
  average_stroke_rate?: number;
  total_reps?: number;
  min_temperature: number;
  decompression: string;
  best_lap_time: string;
  number_of_laps: number;
  max_temperature: number;
  moving_time: string;
  elapsed_time: string;
  min_elevation: number;
  max_elevation: number;
  units: "km" | "m";
};

export type Activities = {
  timestamp: number;
  activities: Array<Activity>;
};

export type DatabaseActivities = {
  _id: ObjectId;
  userId: ObjectId;
} & Activities;

export type Settings = {
  theme: "dark-orange" | "dark-green";
  activitiesPerPage: number;
};

export type DatabaseSettings = {
  _id: ObjectId;
  userId: ObjectId;
} & Settings;

export type UserSummary = {
  averageVO2Max: number | null;
  favoriteActivity: {
    name: string;
    count: number;
  };
};
