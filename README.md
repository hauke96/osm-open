# OSM Open

Visualizes open stores and lets you filter by date and tags. This enables you to find e.g. open restaurants for tomorrow evening.

There's a hosted version on [hauke-stieler.de/osm-open](https://hauke-stieler.de/osm-open/).

<p align="center">
<img src="screenshot.png" alt="OSM Open Screenshot"/>
</p>

# How to use

## Load data

1. Zoom to the area you want to search in.
2. Click on "Load data" to load all elements with opening hours.
3. Click on a point to get further information.

This step might take a few seconds depending on the amount of data and workload on the backend server (Overpass).

## Select date

Select date and time to change the colors.
If nothing is entered, the current date and time will be used.

## Filter by tags

There are some presets availabel but you can also use your own queries.
The "=" and "~" operators are supported, the latter one enables you to use regex syntax for the value.

For regex the normal JavaScript syntax is supported as the [`.match()` method](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/match) is used. 

### Examples

Search by equality: `amenity=restaurant`

Multiple possible values: `amenity~(restaurant|fast_food|pub)`

String occurrences: `name~.*foo.*` (all names with "foo" in it)

More complex query: `name~^[aA].*` (all things which name starts with the letter "a")

# Contribute

This project only has a frontend, see the [client README](client/README.md) for details.

Also feel free to [raise issues](https://github.com/hauke96/osm-open/issues/new) with feature requests or bugs.
But keep in mind that this is a project I create in my spare time, so don't expect too much ;)
