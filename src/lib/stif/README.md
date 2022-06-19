<!--
 Copyright (c) 2022 Joseph Hale <me@jhale.dev>

 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
# STIF

The official specification of the Speedcuber Timer Interchange Format.

*Current Version:* `0.1.0`

## Motivation

When this specification was created, most speedcubing timers rolled
their own data format for storing data about each practice solve. This
made it very difficult for people to move their data from one timer to
another. The same was true for most community-developed data analysis
tools which were either designed for a specific timer's data format or
had also rolled its own.

The goal of this specification is to provide a standardized set of
fields that different timers and data analysis tools can use to
communicate effectively with each other.

## FAQ

### Why not just use [WCIF (WCA Competition Interchange Format)](https://github.com/SpeedcuberOSS/wcif)?
WCIF is a fantastic specification for building *cubing competition
management* software. As such, it includes many objects not applicable
to at-home speedcubing timers (e.g.
[Schedule](https://github.com/SpeedcuberOSS/wcif/blob/master/specification.md#Schedule)
and
[Venue](https://github.com/SpeedcuberOSS/wcif/blob/master/specification.md#Venue))
and omits many fields desireable for analyzing personal solves (e.g.
millisecond precision, solving sessions, solving categories, etc.)

STIF takes the great ideas from WCIF and applies them to the realm of
*personal speedcubing timers*.