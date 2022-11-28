import {Platform} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
const ContainerWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;
const Container = styled.View<{
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web';
}>`
  padding: ${props => (props.os === 'android' ? '5px 20px' : '0 20px')};
`;

const HeaderTitle = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: 500;
`;
const Body = styled.View`
  margin-top: 10px;
`;
const Day = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const DayText = styled.Text`
  color: rgb(129, 129, 132);
  font-size: 15px;
  font-weight: 300;
`;

const Calendar = () => {
  return (
    <ContainerWrapper>
      <Container os={Platform.OS}>
        <Header>
          <Icon name={'chevron-back-outline'} color={'black'} size={20} />
          <HeaderTitle>2022년 7월</HeaderTitle>
          <Icon name={'chevron-forward-outline'} color={'black'} size={20} />
        </Header>
        <Body>
          <Day>
            <DayText>일</DayText>
            <DayText>월</DayText>
            <DayText>화</DayText>
            <DayText>수</DayText>
            <DayText>목</DayText>
            <DayText>금</DayText>
            <DayText>토</DayText>
          </Day>
        </Body>
      </Container>
    </ContainerWrapper>
  );
};

export default Calendar;
