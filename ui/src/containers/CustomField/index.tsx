import React, { useEffect, useState } from 'react';
import ContentstackAppSdk from '@contentstack/app-sdk';
import { isEmpty } from 'lodash';
import { TypeSDKData } from '../../common/types';
import './styles.scss';
import JSONEditor from '../../components/jsoneditor';

const CustomField: React.FC = function() {
  const [state, setState] = useState<TypeSDKData>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });

  const [jsonData, setJsonData] = useState<Array<object>>([{}]);

  useEffect(() => {
    ContentstackAppSdk.init().then(async appSdk => {
      const config = await appSdk?.getConfig();
      setState({
        config,
        location: appSdk.location,
        appSdkInitialized: true,
      });

      appSdk.location.CustomField?.frame.updateHeight(300);

      const initialData = appSdk.location.CustomField?.field.getData();

      if (initialData && !isEmpty(initialData)) {
        setJsonData(initialData);
      }
    });
  }, []);

  const onChangeSave = (saveData: any) => {
    state.location?.CustomField?.field?.setData([saveData]);
  };

  return (
    <div className='layout-container'>
			{state.appSdkInitialized && (
				<JSONEditor onChange={onChangeSave} value={jsonData[0]} />
			)}
		</div>
  );
};

export default CustomField;