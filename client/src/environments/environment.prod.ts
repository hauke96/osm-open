export const environment = {
  production: true,
  sourceRepoUrl: 'https://github.com/hauke96/osm-open',
  dataQueryUrl: `https://overpass-api.de/api/interpreter?data=
[out:json][timeout:30];
(
node["opening_hours"]$$BBOX$$;
way["opening_hours"]$$BBOX$$;
);
out center;`,
};
