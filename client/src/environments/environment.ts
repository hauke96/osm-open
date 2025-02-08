export const environment = {
  production: false,
  sourceRepoUrl: 'https://github.com/hauke96/osm-open',
  dataQueryUrl: `https://overpass-api.de/api/interpreter?data=
[out:json][timeout:30];
(
nwr$$QUERY$$$$BBOX$$;
);
out meta center;`,
};
