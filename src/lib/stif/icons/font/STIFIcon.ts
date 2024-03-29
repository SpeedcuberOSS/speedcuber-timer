export type StifIconId =
  | "event-111"
  | "event-222"
  | "event-222bf"
  | "event-222m"
  | "event-234567relay"
  | "event-23456relay"
  | "event-2345relay"
  | "event-234relay"
  | "event-333"
  | "event-333bf"
  | "event-333fm"
  | "event-333ft"
  | "event-333m"
  | "event-333mbf"
  | "event-333mbo"
  | "event-333mts"
  | "event-333oh"
  | "event-444"
  | "event-444bf"
  | "event-555"
  | "event-555bf"
  | "event-666"
  | "event-666bf"
  | "event-777"
  | "event-777bf"
  | "event-clock"
  | "event-curvycopter"
  | "event-fisher"
  | "event-fto"
  | "event-helicopter"
  | "event-kilominx"
  | "event-magic"
  | "event-miniguild"
  | "event-minx"
  | "event-mmagic"
  | "event-mpyram"
  | "event-mskewb"
  | "event-mtetram"
  | "event-pyram"
  | "event-pyramorphix"
  | "event-redi"
  | "event-skewb"
  | "event-sq1"
  | "infraction-10e3"
  | "infraction-A3d1"
  | "infraction-A4b"
  | "infraction-A4b1"
  | "infraction-A4d1"
  | "infraction-A6c"
  | "infraction-A6d"
  | "infraction-A6e";

export type StifIconKey =
  | "Event_111"
  | "Event_222"
  | "Event_222bf"
  | "Event_222m"
  | "Event_234567relay"
  | "Event_23456relay"
  | "Event_2345relay"
  | "Event_234relay"
  | "Event_333"
  | "Event_333bf"
  | "Event_333fm"
  | "Event_333ft"
  | "Event_333m"
  | "Event_333mbf"
  | "Event_333mbo"
  | "Event_333mts"
  | "Event_333oh"
  | "Event_444"
  | "Event_444bf"
  | "Event_555"
  | "Event_555bf"
  | "Event_666"
  | "Event_666bf"
  | "Event_777"
  | "Event_777bf"
  | "EventClock"
  | "EventCurvycopter"
  | "EventFisher"
  | "EventFto"
  | "EventHelicopter"
  | "EventKilominx"
  | "EventMagic"
  | "EventMiniguild"
  | "EventMinx"
  | "EventMmagic"
  | "EventMpyram"
  | "EventMskewb"
  | "EventMtetram"
  | "EventPyram"
  | "EventPyramorphix"
  | "EventRedi"
  | "EventSkewb"
  | "EventSq1"
  | "Infraction_10e3"
  | "InfractionA3d1"
  | "InfractionA4b"
  | "InfractionA4b1"
  | "InfractionA4d1"
  | "InfractionA6c"
  | "InfractionA6d"
  | "InfractionA6e";

export enum StifIcon {
  Event_111 = "event-111",
  Event_222 = "event-222",
  Event_222bf = "event-222bf",
  Event_222m = "event-222m",
  Event_234567relay = "event-234567relay",
  Event_23456relay = "event-23456relay",
  Event_2345relay = "event-2345relay",
  Event_234relay = "event-234relay",
  Event_333 = "event-333",
  Event_333bf = "event-333bf",
  Event_333fm = "event-333fm",
  Event_333ft = "event-333ft",
  Event_333m = "event-333m",
  Event_333mbf = "event-333mbf",
  Event_333mbo = "event-333mbo",
  Event_333mts = "event-333mts",
  Event_333oh = "event-333oh",
  Event_444 = "event-444",
  Event_444bf = "event-444bf",
  Event_555 = "event-555",
  Event_555bf = "event-555bf",
  Event_666 = "event-666",
  Event_666bf = "event-666bf",
  Event_777 = "event-777",
  Event_777bf = "event-777bf",
  EventClock = "event-clock",
  EventCurvycopter = "event-curvycopter",
  EventFisher = "event-fisher",
  EventFto = "event-fto",
  EventHelicopter = "event-helicopter",
  EventKilominx = "event-kilominx",
  EventMagic = "event-magic",
  EventMiniguild = "event-miniguild",
  EventMinx = "event-minx",
  EventMmagic = "event-mmagic",
  EventMpyram = "event-mpyram",
  EventMskewb = "event-mskewb",
  EventMtetram = "event-mtetram",
  EventPyram = "event-pyram",
  EventPyramorphix = "event-pyramorphix",
  EventRedi = "event-redi",
  EventSkewb = "event-skewb",
  EventSq1 = "event-sq1",
  Infraction_10e3 = "infraction-10e3",
  InfractionA3d1 = "infraction-A3d1",
  InfractionA4b = "infraction-A4b",
  InfractionA4b1 = "infraction-A4b1",
  InfractionA4d1 = "infraction-A4d1",
  InfractionA6c = "infraction-A6c",
  InfractionA6d = "infraction-A6d",
  InfractionA6e = "infraction-A6e",
}

export const STIF_ICON_CODEPOINTS: { [key in StifIcon]: string } = {
  [StifIcon.Event_111]: "61697",
  [StifIcon.Event_222]: "61698",
  [StifIcon.Event_222bf]: "61699",
  [StifIcon.Event_222m]: "61700",
  [StifIcon.Event_234567relay]: "61701",
  [StifIcon.Event_23456relay]: "61702",
  [StifIcon.Event_2345relay]: "61703",
  [StifIcon.Event_234relay]: "61704",
  [StifIcon.Event_333]: "61705",
  [StifIcon.Event_333bf]: "61706",
  [StifIcon.Event_333fm]: "61707",
  [StifIcon.Event_333ft]: "61708",
  [StifIcon.Event_333m]: "61709",
  [StifIcon.Event_333mbf]: "61710",
  [StifIcon.Event_333mbo]: "61711",
  [StifIcon.Event_333mts]: "61712",
  [StifIcon.Event_333oh]: "61713",
  [StifIcon.Event_444]: "61714",
  [StifIcon.Event_444bf]: "61715",
  [StifIcon.Event_555]: "61716",
  [StifIcon.Event_555bf]: "61717",
  [StifIcon.Event_666]: "61718",
  [StifIcon.Event_666bf]: "61719",
  [StifIcon.Event_777]: "61720",
  [StifIcon.Event_777bf]: "61721",
  [StifIcon.EventClock]: "61722",
  [StifIcon.EventCurvycopter]: "61723",
  [StifIcon.EventFisher]: "61724",
  [StifIcon.EventFto]: "61725",
  [StifIcon.EventHelicopter]: "61726",
  [StifIcon.EventKilominx]: "61727",
  [StifIcon.EventMagic]: "61728",
  [StifIcon.EventMiniguild]: "61729",
  [StifIcon.EventMinx]: "61730",
  [StifIcon.EventMmagic]: "61731",
  [StifIcon.EventMpyram]: "61732",
  [StifIcon.EventMskewb]: "61733",
  [StifIcon.EventMtetram]: "61734",
  [StifIcon.EventPyram]: "61735",
  [StifIcon.EventPyramorphix]: "61736",
  [StifIcon.EventRedi]: "61737",
  [StifIcon.EventSkewb]: "61738",
  [StifIcon.EventSq1]: "61739",
  [StifIcon.Infraction_10e3]: "61740",
  [StifIcon.InfractionA3d1]: "61741",
  [StifIcon.InfractionA4b]: "61742",
  [StifIcon.InfractionA4b1]: "61743",
  [StifIcon.InfractionA4d1]: "61744",
  [StifIcon.InfractionA6c]: "61745",
  [StifIcon.InfractionA6d]: "61746",
  [StifIcon.InfractionA6e]: "61747",
};
