import React, { useEffect, useState } from "react";
import ContentstackAppSdk from "@contentstack/app-sdk";
import constants, { eventNames } from "../../common/constants";
import { isEmpty } from "../../common/utils";
import { TypeSDKData } from "../../common/types";
import "./styles.scss";
import useAnalytics from "../../hooks/useAnalytics";
import JSONEditor from "../../components/jsoneditor";

const CustomField: React.FC = function () {
  const [state, setState] = useState<TypeSDKData>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });
  const [jsonData, setJsonData] = useState<Array<any>>([{}]);
  const { trackEvent } = useAnalytics();
  const [saveJsonData, setSaveJsonData] = useState<Array<any>>([{}]);
  const { APP_INITIALIZE_SUCCESS, APP_INITIALIZE_FAILURE } = eventNames;

  let isStringified: any;

  const toStringify = (localConfig: any, globalConfig: any) => {
    if (localConfig === true || localConfig === false) {
      return localConfig;
    }
    if (globalConfig) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk) => {
        const config = await appSdk?.getConfig();
        setState({
          config,
          location: appSdk?.location,
          appSdkInitialized: true,
        });

        appSdk?.location?.CustomField?.frame?.updateHeight(300);
        isStringified = appSdk?.location?.CustomField?.fieldConfig?.stringify;

        const initialData = appSdk?.location?.CustomField?.field?.getData();
        let jsonVal = [{}];

        if (initialData && !isEmpty(initialData)) {
          try {
            jsonVal =
              typeof initialData[0] === "string" ?
                [
                    JSON.parse(
                      initialData[0]?.trim()?.length ? initialData[0] : "{}"
                    ),
                  ]
                : initialData;
          } catch (e) {
            jsonVal = [{}];
          }
          setJsonData(jsonVal);
        }
        setSaveJsonData(
          toStringify(isStringified, config?.isStringified) ?
            [JSON.stringify(jsonVal[0])]
            : jsonVal
        );
        trackEvent(APP_INITIALIZE_SUCCESS)
      })
      .catch((error) => {
        console.error(constants.appSdkError, error);
        trackEvent(APP_INITIALIZE_FAILURE)
      });
  }, []);

  const onChangeSave = (saveData: any) => {
    state.location?.CustomField?.field?.setData(
      toStringify(isStringified, state?.config?.isStringified) ?
        [JSON.stringify(saveData)]
        : [saveData]
    );
  };

  useEffect(() => {
    state?.location?.CustomField?.field?.setData(saveJsonData);
  }, [saveJsonData]);

  return (
    <div className="layout-container">
      {state?.appSdkInitialized && (
        <JSONEditor onChange={onChangeSave} value={jsonData[0]} />
      )}
    </div>
  );
};

export default CustomField;
