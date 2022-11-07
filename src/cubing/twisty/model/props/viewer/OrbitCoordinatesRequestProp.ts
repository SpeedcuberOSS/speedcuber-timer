import { mod } from "../../helpers";
import { TwistyPropSource } from "../TwistyProp";

export type CoordinateDegrees = number;

export interface OrbitCoordinates {
  latitude: CoordinateDegrees;
  longitude: CoordinateDegrees;
  distance: number;
}

export function orbitCoordinatesEqual(
  c1: OrbitCoordinates,
  c2: OrbitCoordinates,
): boolean {
  return (
    c1.latitude === c2.latitude &&
    c1.longitude === c2.longitude &&
    c1.distance === c2.distance
  );
}

// TOOD: Check if freezing affects perf.
// const DEFAULT_COORDINATES = Object.freeze({
//   latitude: 35,
//   longitude: 30,
//   distance: 6,
// });

export type OrbitCoordinatesRequest = Partial<OrbitCoordinates> | "auto";

// TODO: Put the "auto" calculations in a separate place.
export class OrbitCoordinatesRequestProp extends TwistyPropSource<
  OrbitCoordinatesRequest,
  Partial<OrbitCoordinates> | "auto"
> {
  getDefaultValue(): OrbitCoordinatesRequest {
    return "auto";
  }

  canReuseValue(v1: OrbitCoordinates, v2: OrbitCoordinates) {
    return v1 === v2 || orbitCoordinatesEqual(v1, v2);
  }

  async derive(
    newCoordinates: Partial<OrbitCoordinates> | "auto",
    oldValuePromise: Promise<OrbitCoordinatesRequest>,
  ): Promise<OrbitCoordinatesRequest> {
    if (newCoordinates === "auto") {
      return "auto";
    }

    let oldValue = await oldValuePromise;
    if (oldValue === "auto") {
      oldValue = {};
    }

    const newValue: Partial<OrbitCoordinates> = Object.assign({}, oldValue);
    Object.assign(newValue, newCoordinates);

    if (typeof newValue.latitude !== "undefined") {
      newValue.latitude = Math.min(Math.max(newValue.latitude, -90), 90);
    }
    if (typeof newValue.longitude !== "undefined") {
      newValue.longitude = mod(newValue.longitude, 360, 180);
    }
    return newValue;
  }
}
