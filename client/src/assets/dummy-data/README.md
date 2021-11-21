This folder contains dummy data in GeoJSON that's used during development.
It's an excerp from actual OSM data created with this overpas-query:

```
[out:json][timeout:25];
(
  nwr["opening_hours"]({{bbox}});
);
out meta center;
```

Then click on "Export" and choose "raw OSM data".
