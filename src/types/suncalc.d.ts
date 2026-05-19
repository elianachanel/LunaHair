declare module "suncalc" {
  export interface MoonIllumination {
    fraction: number;
    phase: number;
    angle: number;
    age: number;
  }

  export function getMoonIllumination(date: Date): MoonIllumination;
}
