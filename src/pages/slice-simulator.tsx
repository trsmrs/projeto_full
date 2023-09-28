"use client";

import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

// import { components } from "../slices";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={(props: any) => <SliceZone {...props} />}
    />
  );
}
