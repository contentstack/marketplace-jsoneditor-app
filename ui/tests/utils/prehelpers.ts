// module dependencies
const axios = require("axios");
const jsonfile = require("jsonfile");

interface ExtensionUid {
  uid: string;
}
const file = "data.json";
const savedObj = {};
const writeFile = async (obj: any) => {
  jsonfile
    .writeFile(file, obj)
    .then((res) => {
      return res;
    })
    .catch((error) => console.error(error));
};
// get authtoken
export const getAuthToken = async (): Promise<string> => {
  const options = {
    url: `https://${process.env.BASE_API_URL}/v3/user-session`,
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      user: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    },
  };
  try {
    const result = await axios(options);
    savedObj.authToken = result.data.user.authtoken;
    await writeFile(savedObj);
    return result.data.user.authtoken;
  } catch (error) {
    return error;
  }
};
// create app in developer hub
export const createApp = async (authToken: string) => {
  const options = {
    url: `https://${process.env.DEVELOPER_HUB_API}/apps`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: process.env.ORG_ID,
      authtoken: authToken,
    },
    data: {
      name: `Json editor App ${Math.floor(Math.random() * 1000)}`,
      target_type: "stack",
    },
  };
  try {
    const result = await axios(options);
    return result.data.data;
  } catch (error) {
    return error;
  }
};
// updating app in developer hub & set baseUrl
export const updateApp = async (authToken: string, appId: string) => {
  const options = {
    url: `https://${process.env.DEVELOPER_HUB_API}/apps/${appId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      organization_uid: process.env.ORG_ID,
      authtoken: authToken,
    },
    data: {
      ui_location: {
        locations: [
          {
            type: "cs.cm.stack.field_extension",
            meta: [
              {
                name: `Json editor app ${Math.floor(Math.random() * 1000)}`,
                path: "/field-extension",
                signed: true,
                enabled: true,
                default_width: "full",
              },
            ],
          },
        ],
        signed: true,
        base_url: process.env.APP_BASE_URL,
      },
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};
// install app in stack & return installation id
export const installApp = async (authToken: string, appId: string, stackApiKey: string | undefined) => {
  const options = {
    url: `https://${process.env.DEVELOPER_HUB_API}/apps/${appId}/install`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      organization_uid: process.env.ORG_ID,
      authtoken: authToken,
    },
    data: {
      target_type: "stack",
      target_uid: stackApiKey,
    },
  };
  try {
    const result = await axios(options);
    return result.data.data;
  } catch (error) {
    return error;
  }
};
// get installed app
export const getInstalledApp = async (authToken: string, appId: string) => {
  const options = {
    url: `https://${process.env.DEVELOPER_HUB_API}/apps/${appId}/installations`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      organization_uid: process.env.ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};
// uninstall app from the stack
export const uninstallApp = async (authToken: string, installId: string) => {
  const options = {
    url: `https://${process.env.DEVELOPER_HUB_API}/installations/${installId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      organization_uid: process.env.ORG_ID,
      authtoken: authToken,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};
// create content-type
export const createContentType = async (
  authToken: string | undefined,
  extension_uid: ExtensionUid[],
  stackApiKey: string | undefined
) => {
  const generateUid = `Test Content Type_${Math.floor(Math.random() * 1000)}`;
  const options = {
    url: `https://${process.env.BASE_API_URL}/v3/content_types`,
    method: "POST",
    headers: {
      api_key: stackApiKey,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      content_type: {
        title: generateUid,
        uid: generateUid.replace(/\s/g, "_").toLowerCase(),
        schema: [
          {
            display_name: "Title",
            uid: "title",
            data_type: "text",
            field_metadata: {
              _default: true,
            },
            unique: false,
            mandatory: true,
            multiple: false,
          },
        ],
      },
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};
// create entry
export const createEntry = async (
  authToken: string | undefined,
  contentTypeId: string | undefined,
  stackApiKey: string | undefined
) => {
  const generateTitle = `Test Entry ${Math.floor(Math.random() * 1000)}`;
  const options = {
    url: `https://${process.env.BASE_API_URL}/v3/content_types/${contentTypeId}/entries`,
    method: "POST",
    headers: {
      api_key: stackApiKey,
      authtoken: authToken,
      "Content-type": "application/json",
    },
    data: {
      entry: {
        title: generateTitle,
      },
    },
  };
  try {
    const result = await axios(options);
    return result.data.entry.uid;
  } catch (error) {
    return error;
  }
};

// publish an entry
export const publishEntry = async (
  authToken: string | undefined,
  contentTypeId: string | undefined,
  entryId: string | undefined,
  stackApiKey: string | undefined,
  mgmtToken: string | undefined
) => {
  const options = {
    url: `https://${process.env.BASE_API_URL}/v3/content_types/${contentTypeId}/entries/${entryId}/publish`,
    method: "POST",
    headers: {
      api_key: stackApiKey,
      authtoken: authToken,
      authorization: mgmtToken,
      "Content-type": "application/json",
    },
    data: {
      entry: {
        environments: ["preview"],
        locales: ["en-us"],
      },
      locale: "en-us",
      version: 1,
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};

// adding entry to release
export const addEntryToRelease = async (
  authToken: string | undefined,
  contentTypeId: string | undefined,
  entryId: string | undefined,
  stackApiKey: string | undefined,
  mgmtToken: string | undefined,
  releaseID: string | undefined
) => {
  const options = {
    url: `https://${process.env.BASE_API_URL}/v3/releases/${releaseID}/item?`,
    method: "POST",
    headers: {
      api_key: stackApiKey,
      authtoken: authToken,
      authorization: mgmtToken,
      "Content-type": "application/json",
    },
    data: {
      item: {
        version: 1,
        uid: entryId,
        content_type_uid: contentTypeId,
        action: "publish",
        locale: "en-us",
      },
    },
  };
  try {
    const result = await axios(options);
    return result.data;
  } catch (error) {
    return error;
  }
};