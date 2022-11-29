/* eslint-disable no-underscore-dangle */
import { TrackJS } from "trackjs";

// To get started with Track.js - add .env variables and change the app's name here.
const installation = () => {
  TrackJS.install({
    token: `${process.env.REACT_APP_TRACKER_TOKEN}`,
    application: process.env.REACT_APP_TRACKER_ENV,
    console: { display: true },
  });

  TrackJS.addMetadata("application_type", "marketplace");
  TrackJS.addMetadata("application_name", "JSON-Editor App");
};

// Adding bulk metadata to the Track.js here
const addMetadata = (appSdk: any = {}) => {
  const { api_key: apiKey, org_uid: orgUid, name } = appSdk?.stack?._data || {};
  const { uid: userUid } = appSdk?.currentUser || {};
  const metaData = Object.entries({ apiKey, name, orgUid, userUid });
  metaData?.forEach(([key, value]) => {
    TrackJS.addMetadata(key, value);
  });
};

// To log the error manuall.
const trackError = (error: any) => {
  TrackJS.track(error);
};

export default {
  installation,
  addMetadata,
  trackError,
};
