import React from 'react';
import { useStateReducer } from 'v2/utils';
import { IZapConfig } from './config';
import { ZapForm, ConfirmZapInteraction, ZapReceipt } from './components';
import { default as GeneralStepper, IStepperPath } from 'v2/components/GeneralStepper';
import { ROUTE_PATHS } from 'v2/config';
import ZapInteractionFactory from './stateFactory';
import { ITxReceipt, ISignedTx } from 'v2/types';
import { SignTransaction } from '../SendAssets/components';
import { ISimpleTxFormFull } from './types';

const initialZapFlowState = (initialZapSelected: IZapConfig) => ({
  zapSelected: initialZapSelected,
  txConfig: undefined,
  txReceipt: undefined
});

interface Props {
  selectedZap: IZapConfig;
}

const ZapStepper = ({ selectedZap }: Props) => {
  const { zapFlowState, handleUserInputFormSubmit, handleTxSigned } = useStateReducer(
    ZapInteractionFactory,
    initialZapFlowState(selectedZap)
  );

  const steps: IStepperPath[] = [
    {
      label: 'Add Funds to Zap',
      component: ZapForm,
      props: (state => state)(zapFlowState),
      actions: (formData: ISimpleTxFormFull, cb: any) => handleUserInputFormSubmit(formData, cb)
    },
    {
      label: 'Confirm Transaction',
      component: ConfirmZapInteraction,
      props: (({ txConfig }) => ({ txConfig }))(zapFlowState)
    },
    {
      label: '',
      component: SignTransaction,
      props: (({ txConfig }) => ({ txConfig }))(zapFlowState),
      actions: (payload: ITxReceipt | ISignedTx, cb: any) => handleTxSigned(payload, cb)
    },
    {
      label: 'Zap Receipt',
      component: ZapReceipt,
      props: (({ txConfig, txReceipt }) => ({ txConfig, txReceipt }))(zapFlowState)
    }
  ];
  return (
    <GeneralStepper
      steps={steps}
      defaultBackPath={ROUTE_PATHS.DEFIZAP.path}
      defaultBackPathLabel={ROUTE_PATHS.DEFIZAP.title} // ToDo: Change this.
    />
  );
};
export default ZapStepper;
