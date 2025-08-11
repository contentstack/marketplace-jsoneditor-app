import { IInstallationData } from "@contentstack/app-sdk/dist/src/types";

export interface TypeSDKData {
  config: any;
  location: any;
  appSdkInitialized: boolean;
}

export interface TypeJsonProps {
  value: object;
  onChange: (value: any) => void;
}

export interface TypeAppSdkConfigState {
  installationData: IInstallationData;
  setInstallationData: (event: any) => any;
  appSdkInitialized: boolean;
}
