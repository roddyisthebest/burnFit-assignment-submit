import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import React from 'react';
import {checkDay, initialStateProps} from '../store/slice';
import {useDispatch, useSelector} from 'react-redux';

const ContainerWrapper = styled.Pressable<{width: number}>`
  width: ${props => props.width * 0.1282}px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View<{isItChecked: boolean}>`
  background-color: ${props => (props.isItChecked ? '#90B4FF' : 'white')};
  border-radius: 15px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const ContainerText = styled.Text<{isItNowDate: boolean; isItChecked: boolean}>`
  color: ${props =>
    props.isItNowDate ? (props.isItChecked ? 'white' : 'black') : 'lightgray'};
  font-size: 12px;
`;

const Day = ({
  data,
  keyword,
}: {
  data: {now: boolean; day: number; index: number};
  keyword: string;
}) => {
  const dispatch = useDispatch();
  const {checkedDay} = useSelector((state: initialStateProps) => ({
    checkedDay: state.checkedDay,
  }));

  return (
    <ContainerWrapper
      onPress={() => {
        if (data.day < 10) {
          dispatch(checkDay(`${keyword}-0${data.day}`));
        }
        dispatch(checkDay(`${keyword}-${data.day}`));
      }}
      width={Dimensions.get('window').width}
      disabled={!data.now}>
      <Container
        isItChecked={checkedDay === `${keyword}-${data.day}` && data.now}>
        <ContainerText
          isItChecked={checkedDay === `${keyword}-${data.day}`}
          isItNowDate={data.now}>
          {data.day}
        </ContainerText>
      </Container>
    </ContainerWrapper>
  );
};

export default Day;
