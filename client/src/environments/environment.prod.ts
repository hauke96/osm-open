export const environment = {
  production: true,
  sourceRepoUrl: 'https://github.com/hauke96/osm-open',
  dataQueryUrl: `https://overpass-api.de/api/interpreter?data=
[out:json][timeout:30];
(
nwr["opening_hours"]$$BBOX$$;
);
out meta center;`,
};
