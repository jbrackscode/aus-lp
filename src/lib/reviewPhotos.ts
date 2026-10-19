// Real customer-uploaded photos attached to reviews on the live Okendo
// reviews widget at https://jbracks.com.au/products/4-e-bike-rack — filtered
// to 5-star reviews left on the AU store, so the wall only shows Australian
// customers' happiest results. Pulled directly from the reviews API.
// Used by RacksInUse on /lp-vertical-bike-racks for volume social proof.

export type ReviewPhoto = {
  src: string;
  alt: string;
  author: string;
};

export const reviewPhotos: ReviewPhoto[] = [
  {
    src: "https://media-dynamic.okendo.io/images/ab00a254-0ba8-411c-b535-d84dbf0433a4/aa230f0b-d80d-4e92-8ee6-35f5904894e7.jpg?d=1600x1600",
    alt: "A mountain bike mounted on a bike rack attached to the back of a vehicle, parked on grass with bare trees and houses visible in the background",
    author: "Sam J. I.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/ab00a254-0ba8-411c-b535-d84dbf0433a4/0d471e5a-bde9-461a-b28f-293f0c035481.jpg?d=1600x1600",
    alt: "A black metal bike rack or carrier attachment mounted on a vehicle hitch, with bicycle wheels visible on either side",
    author: "Sam J. I.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/ab00a254-0ba8-411c-b535-d84dbf0433a4/aea8bb7d-0964-4880-82f8-a05c812074fc.jpg?d=1600x1600",
    alt: "Four bicycles mounted on a car's rear bike rack in a residential driveway",
    author: "Sara T.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/8722f514-09b1-41bf-ac96-92a50d68075f.jpg?d=1600x1600",
    alt: "Two bicycles stored vertically on a black bike rack in a garage with brick walls and white paneling",
    author: "Lachlan M.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/3b4bfbc1-c4b0-4f94-b014-74ec8065abaf.jpg?d=1600x1600",
    alt: "Three bicycles mounted on a bike rack attached to the back of a dark ute parked in a residential driveway",
    author: "Benjamin Q.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/72776b37-3245-4137-b603-75c833a5b802.jpg?d=1600x1600",
    alt: "A white Ford SUV with a turquoise bike rack mounted on the rear hitch, parked in a driveway with trees and landscaping in the background",
    author: "Graeme V.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/56cd3b1b-f375-4d24-9bdc-b61ea004a131.jpg?d=1600x1600",
    alt: "A white car with a black bike rack mounted on the back, holding multiple bicycles, parked on a brick paved driveway in front of residential houses",
    author: "Matt T.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/30edd2e8-3d26-489b-b6d5-f8530a9f7a12.jpg?d=1600x1600",
    alt: "White SUV with bike rack holding multiple bicycles parked under covered carport area",
    author: "Carl Z.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/fc6982bb-acb0-43ba-bcac-dfcf23ab85ff.jpg?d=1600x1600",
    alt: "A white SUV with its rear hatch open and a black bike rack attached, holding two mountain bikes in a residential driveway",
    author: "Carl Z.",
  },
  {
    src: "https://media-dynamic.okendo.io/images/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/06f903ac-1d39-4d81-a9bc-e699cf20f077.jpg?d=1600x1600",
    alt: "White Nissan Navara ute with green metal bike rack mounted on the back, parked on concrete surface",
    author: "marc-paul d. g.",
  },
];
