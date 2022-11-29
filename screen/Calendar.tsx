import {Platform, Pressable, Dimensions} from 'react-native';
import {FlatList, GestureDetector, Gesture} from 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Date from '../components/Date';
import moment from 'moment';
import {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo,
  runOnJS,
} from 'react-native-reanimated';

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
  /* flex: 1; */
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

const HideWrapper = styled.View`
  position: relative;
`;

const Calendar = () => {
  const aref = useAnimatedRef();
  const scroll = useSharedValue(0);
  const animation = useSharedValue(true);
  const gestureDir = useSharedValue(0);
  const disabledShareVal = useSharedValue(false);

  useDerivedValue(() => {
    scrollTo(aref, scroll.value, 0, animation.value);
  });

  function changeKeyword(forward: boolean) {
    disabledShareVal.value = true;
    setDisabled(true);
    animation.value = true;
    if (forward) {
      scroll.value = 10000;
      setAnotherKey(moment(keyword).add(1, 'month').format('YYYY-MM'));

      setTimeout(() => {
        animation.value = false;
        setKeyword(moment(keyword).add(1, 'month').format('YYYY-MM'));
      }, 500);
    } else {
      scroll.value = 0;
      setAnotherKey(moment(keyword).subtract(1, 'month').format('YYYY-MM'));

      setTimeout(() => {
        animation.value = false;
        setKeyword(moment(keyword).subtract(1, 'month').format('YYYY-MM'));
      }, 500);
    }

    setTimeout(() => {
      setHideVisible(true);
      setFlatListVisible(false);
    }, 300);
    setTimeout(() => {
      setFlatListVisible(true);
    }, 600);
    setTimeout(() => {
      setHideVisible(false);
      setDisabled(false);
      disabledShareVal.value = false;
    }, 700);
  }
  function callback(forward: boolean) {
    'worklet';
    runOnJS(changeKeyword)(forward);
  }

  const gesture = Gesture.Pan()
    .onBegin(event => {
      gestureDir.value = event.absoluteX;
    })
    .onEnd(event => {
      gestureDir.value -= event.absoluteX;
      !disabledShareVal.value && callback(gestureDir.value > 0);
    });

  const [keyword, setKeyword] = useState(moment().format('YYYY-MM'));
  const [keywords, setKeywords] = useState<string[]>([
    moment(keyword).subtract(1, 'month').format('YYYY-MM'),
    moment(keyword).format('YYYY-MM'),
    moment(keyword).add(1, 'month').format('YYYY-MM'),
  ]);
  const [anotherKey, setAnotherKey] = useState(
    moment().subtract(1, 'month').format('YYYY-MM'),
  );

  const [hideVisible, setHideVisible] = useState<boolean>(false);
  const [flatListVisible, setFlatListVisible] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  useEffect(() => {
    setKeywords(() => {
      return [
        moment(keyword).subtract(1, 'month').format('YYYY-MM'),
        moment(keyword).format('YYYY-MM'),
        moment(keyword).add(1, 'month').format('YYYY-MM'),
      ];
    });
    scroll.value = Dimensions.get('window').width - 40;
  }, [keyword, scroll]);

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <Date key={index} keyword={item} position={'relative'} />
  );

  return (
    <ContainerWrapper>
      <Container os={Platform.OS}>
        <Header>
          <Pressable
            disabled={disabled}
            onPress={() => {
              changeKeyword(false);
            }}>
            <Icon name={'chevron-back-outline'} color={'black'} size={20} />
          </Pressable>
          <HeaderTitle>
            {keyword.split('-')[0]}년 {keyword.split('-')[1]}월
          </HeaderTitle>
          <Pressable
            disabled={disabled}
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
          <GestureDetector
            gesture={gesture}
            userSelect={disabled ? 'auto' : 'none'}>
            <HideWrapper>
              {hideVisible ? (
                <Date keyword={anotherKey} position={'absolute'} />
              ) : null}
              <FlatList
                ref={aref}
                data={keywords}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                style={{opacity: flatListVisible ? 1 : 0}}
                initialScrollIndex={1}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
              />
            </HideWrapper>
          </GestureDetector>
        </Body>
      </Container>
    </ContainerWrapper>
  );
};

export default Calendar;
