const requiredFirebaseEnv = [
  "VITE_APIKEY",
  "VITE_AUTHDOMAIN",
  "VITE_PROJECTID",
  "VITE_STORAGEBUCKET",
  "VITE_MESSAGINGSENDERID",
  "VITE_APPID",
];

const getMissingFirebaseEnv = (env) =>
  requiredFirebaseEnv.filter((key) => !env[key] || String(env[key]).trim() === "");

export { requiredFirebaseEnv, getMissingFirebaseEnv };
