import { Asset } from "@vendure/admin-ui/core";

export function getImageUrl(image: Asset, preset: string) {
  return `${image.source}?preset=${preset}${
    image.focalPoint
      ? `&fpx=${image.focalPoint.x}&fpy=${image.focalPoint.y}`
      : ""
  }`;
}
