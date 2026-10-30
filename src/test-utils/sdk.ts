import { vi } from "vitest";

type Opts = {
  stored?: unknown;
  globalStringify?: boolean;
  fieldStringify?: boolean;
  installation?: Record<string, unknown>;
};

/** Builds a fake App SDK instance for both the CustomField and AppConfigWidget locations. */
export const makeSdk = ({ stored, globalStringify, fieldStringify, installation = {} }: Opts = {}) => {
  const setData = vi.fn();
  const setInstallationData = vi.fn().mockResolvedValue(undefined);
  const sdk = {
    getConfig: vi.fn().mockResolvedValue(globalStringify === undefined ? {} : { isStringified: globalStringify }),
    pulse: vi.fn(),
    stack: { _data: { api_key: "k", collaborators: [{ uid: "u1" }] } },
    currentUser: { defaultOrganization: "o" },
    location: {
      CustomField: {
        field: { getData: vi.fn().mockReturnValue(stored), setData },
        frame: { updateHeight: vi.fn() },
        fieldConfig: fieldStringify === undefined ? {} : { stringify: fieldStringify },
      },
      AppConfigWidget: {
        installation: {
          getInstallationData: vi.fn().mockResolvedValue({ configuration: installation, serverConfiguration: {} }),
          setInstallationData,
        },
      },
    },
  };
  return { sdk, setData, setInstallationData };
};
