import {Platform, Pressable} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Date from '../components/Date';
import moment from 'moment';

const ContainerWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 13px;
`;
const Container = styled.View<{
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web';
}>`
  padding: ${props => (props.os === 'android' ? '5px 20px' : '0 20px')};
`;

const HeaderTitle = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: 700;
`;
const Body = styled.View`
  flex: 1;
`;
const DaysWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  flex-wrap: wrap;
  /* background-color: black; */
`;

const Day = styled.View`
  align-items: center;
  justify-content: center;
  height: 50px;
  flex: 1;
`;
const DayText = styled.Text`
  color: rgb(129, 129, 132);
  font-size: 15px;
  font-weight: 300;
`;

const Calendar = () => {
  const [keyword, setKeyword] = useState(moment().format('YYYY-MM'));
  const changeKeyword = (forward: boolean) => {
    if (forward) {
      setKeyword(moment(keyword).add(1, 'month').format('YYYY-MM'));
    } else {
      setKeyword(moment(keyword).subtract(1, 'month').format('YYYY-MM'));
    }
  };

  return (
    <ContainerWrapper>
      <Container os={Platform.OS}>
        <Header>
          <Pressable
            onPress={() => {
              changeKeyword(false);
            }}>
            <Icon name={'chevron-back-outline'} color={'black'} size={20} />
          </Pressable>
          <HeaderTitle>
            {keyword.split('-')[0]}년 {keyword.split('-')[1]}월
          </HeaderTitle>
          <Pressable
            onPress={() => {
              changeKeyword(true);
            }}>
            <Icon name={'chevron-forward-outline'} color={'black'} size={20} />
          </Pressable>
        </Header>
        <Body>
          <DaysWrapper>
            <Day>
              <DayText>일</DayText>
            </Day>
            <Day>
              <DayText>월</DayText>
            </Day>
            <Day>
              <DayText>화</DayText>
            </Day>
            <Day>
              <DayText>수</DayText>
            </Day>
            <Day>
              <DayText>목</DayText>
            </Day>
            <Day>
              <DayText>금</DayText>
            </Day>
            <Day>
              <DayText>토</DayText>
            </Day>
          </DaysWrapper>
          <Date keyword={keyword} />
        </Body>
      </Container>
    </ContainerWrapper>
  );
};

export default Calendar;
