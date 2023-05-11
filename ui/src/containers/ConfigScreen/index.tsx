/* Import React modules */
/* eslint-disable */
import React, { useState, useEffect } from "react";
/* Import other node modules */

import VenusHelp from "../../components/venus-help";
import ContentstackAppSdk from "@contentstack/app-sdk";
import tippy from "tippy.js";

/* Import our modules */
import localeTexts from "../../common/locale/en-us";
import constants from "../../common/constants";
import { mergeObjects } from "../../common/utils";
import TrackJS from "../../trackjs";
import { TypeAppSdkConfigState } from "../../common/types";

/* Import node module CSS */
import "tippy.js/dist/tippy.css";
/* Import our CSS */
import "./styles.scss";

import useJsErrorTracker from "../../hooks/useJsErrorTracker";

const ConfigScreen: React.FC = function () {

  // error tracking hooks
  const { addMetadata, trackError } = useJsErrorTracker();

  const [state, setState] = useState<TypeAppSdkConfigState>({
    installationData: {
      configuration: {
        /* Add all your config fields here */
        /* The key defined here should match with the name attribute
        given in the DOM that is being returned at last in this component */
        isStringified: false,
      },
      serverConfiguration: {},
    },
    setInstallationData: (): any => {
      /* this method 'setInstallationData' is empty */
    },
    appSdkInitialized: false,
  });
  const [isStringified, setIsStringified] = useState(false);

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk) => {
        //Adding Track.js metadata
        TrackJS.addMetadata(appSdk);

        const sdkConfigData = appSdk?.location?.AppConfigWidget?.installation;
        if (sdkConfigData) {
          const installationDataFromSDK =
            await sdkConfigData?.getInstallationData();
          const setInstallationDataOfSDK = sdkConfigData?.setInstallationData;
          setState({
            ...state,
            installationData: mergeObjects(
              state?.installationData,
              installationDataFromSDK
            ),
            setInstallationData: setInstallationDataOfSDK,
            appSdkInitialized: true,
          });
          setIsStringified(
            state?.installationData?.configuration?.isStringified
          );

          // setting metadata for js error tracker
          addMetadata("stack", `${appSdk?.stack._data.name}`);
          addMetadata("organization", `${appSdk?.currentUser.defaultOrganization}`);
          addMetadata("api_key", `${stackKey}`);
          addMetadata("user_uid", `${appSdk?.stack._data.collaborators[0].uid}`);
          
        }
      })
      .catch((error) => {
        trackError(error);
        console.error(constants.appSdkError, error);
      });
  }, []);

  /** updateConfig - Function where you should update the state variable
   * Call this function whenever any field value is changed in the DOM
   * */

  const updateConfig = async (e: any) => {
    // eslint-disable-next-line prefer-const
    let { name: fieldName, value: fieldValue } = e?.target || {};
    if (typeof fieldValue === "string") fieldValue = fieldValue?.trim();
    const updatedConfig = state?.installationData?.configuration || {};
    const updatedServerConfig = state?.installationData?.serverConfiguration;

    if (fieldName === "auth_token") updatedServerConfig[fieldName] = fieldValue;
    else updatedConfig[fieldName] = fieldValue;

    if (typeof state?.setInstallationData !== "undefined") {
      await state?.setInstallationData({
        ...state?.installationData,
        configuration: updatedConfig,
        serverConfiguration: updatedServerConfig,
      });
    }

    return true;
  };

  const updateCustomJSON = (e: any) => {
    const val = e?.target?.id !== "jsonObject";
    setIsStringified(val);
    updateConfig({ target: { name: "isStringified", value: val } });
  };

  tippy("#help-text", {
    content: localeTexts.configFields.entrySaveRadioButton.help,
    arrow: false,
    placement: "right",
    theme: "venus",
  });

  return (
    <div className="layout-container">
      <div className="page-wrapper">
        <form data-testid="cs-form" className="config-wrapper">
          <div className="Form__item">
            <div
              className="Field Field--full json-field"
              data-testid="cs-field"
            >
              <label
                className="FieldLabel"
                htmlFor="isStringified"
                data-testid="cs-field-label"
              >
                {localeTexts.configFields.entrySaveRadioButton.label}
                <span className="FieldLabel__required-text">
                  <span className="">*</span>
                </span>
              </label>
              <div
                className="tippy-wrapper"
                id="help-text"
                data-testid="cs-tooltip"
              >
                <VenusHelp />
              </div>
              <div className="Radio-wrapper">
                <label data-testid="cs-radio-one" className="Radio label-text">
                  <input
                    id="jsonObject"
                    type="radio"
                    name="isStringified"
                    required
                    value="false"
                    checked={!isStringified}
                    onChange={updateCustomJSON}
                  />
                  <span className="Radio__box"></span>
                  <span className="Radio__label">
                    {localeTexts.configFields.entrySaveRadioButton.jsonObject}
                  </span>
                </label>
                <label data-testid="cs-radio-two" className="Radio label-text">
                  <input
                    id="stringified"
                    type="radio"
                    name="isStringified"
                    required
                    value="true"
                    checked={isStringified}
                    onChange={updateCustomJSON}
                  />
                  <span className="Radio__box"></span>
                  <span className="Radio__label">
                    {
                      localeTexts.configFields.entrySaveRadioButton
                        .jsonStringified
                    }
                  </span>
                </label>
              </div>
              <p className="InstructionText" data-testid="cs-instruction-text">
                {localeTexts.configFields.entrySaveRadioButton.instruction}
              </p>
            </div>
          </div>
          <div className="Form__item">
            <div className="Line Line--Dashed"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigScreen;
