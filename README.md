# OSM Open

Visualizes open stores and lets you filter by date and tags. This enables you to find e.g. open restaurants for tomorrow evening.

There's a hosted version on [hauke-stieler.de/osm-open](https://hauke-stieler.de/osm-open/).

<p align="center">
<img src="screenshot.png" alt="OSM Open Screenshot"/>
</p>

## How to use

1. Zoom to the area you want to search in.
2. Select a point in time for which the opening hours should be checked.
3. Select a tag filter (either from the selection menu or manually type in an Overpass-like-expression)
4. Click on "Load data" to load all elements with opening hours.
5. Click on a point to get further information.

Loading data might take a few seconds depending on the amount of data and workload on the backend server (Overpass).

## Colors

* Red: Is _closed_ at the selected point in time.
* Green: Is _open_ at the selected point in time.
* Gray: Matches the tag-filter, but has no opening hour data in OSM.

## Tag filter expressions

There are some presets available, but you can also use your own queries.
The "=" and "~" operators are supported, the latter one enables you to use regex syntax for the value.

The expression is turned into an Overpass-Expression, so `foo=bar` becomes `["foo"="bar"]`.
This also means the regex syntax follows the one of Overpass.

### Examples

Search by equality: `amenity=restaurant`

Multiple possible values: `amenity~(restaurant|fast_food|pub)`

String occurrences: `name~.*foo.*` (all names with "foo" in it)

More complex query: `name~^[aA].*` (all things which name starts with the letter "a")

## Contribute

This project only has a frontend, see the [client README](client/README.md) for details.

Also feel free to [raise issues](https://github.com/hauke96/osm-open/issues/new) with feature requests or bugs.
But keep in mind that this is a project I create in my spare time, so don't expect too much ;)
