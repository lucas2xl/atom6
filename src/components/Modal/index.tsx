import React from 'react';
import {
  Keyboard,
  Modal as ModalWrapper,
  ModalProps,
  TouchableWithoutFeedback,
} from 'react-native';
import { Wrapper } from './styles';

interface IProps extends ModalProps {
  children?: React.ReactNode;
}

export const Modal = ({ children, ...rest }: IProps) => {
  return (
    <ModalWrapper
      animationType="slide"
      presentationStyle="pageSheet"
      hardwareAccelerated
      {...rest}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>{children}</Wrapper>
      </TouchableWithoutFeedback>
    </ModalWrapper>
  );
};
