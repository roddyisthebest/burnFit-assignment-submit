import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import Day from './Day';
import {Dimensions} from 'react-native';
const Container = styled.View<{
  width: number;
  position: 'relative' | 'absolute';
}>`
  flex-wrap: wrap;
  flex-direction: row;
  width: ${props => props.width - 40}px;
  background-color: transparent;
  position: ${props => props.position};
  z-index: ${props => (props.position === 'absolute' ? 1000 : 1)};
`;

const Date = ({
  keyword,
  position,
}: {
  keyword: string;
  position: 'relative' | 'absolute';
}) => {
  const [days, setDays] = useState<
    {now: boolean; day: number; index: number}[]
  >([]);
  useEffect(() => {
    setDays([]);
    let lastDay =
      moment(
        moment(keyword).subtract(1, 'month').format('YYYY-MM'),
      ).daysInMonth() + 1;

    for (let i = 0; i < moment(keyword).day(); i++) {
      setDays(prev => {
        lastDay -= 1;
        return [{now: false, day: lastDay, index: lastDay * 51}, ...prev];
      });
    }
    for (let i = 1; i < moment(keyword).daysInMonth() + 1; i++) {
      setDays(prev => [...prev, {now: true, day: i, index: i}]);
    }
    for (
      let i = 1;
      i < 7 - moment(`${keyword}-${moment(keyword).daysInMonth()}`).day();
      i++
    ) {
      setDays(prev => [...prev, {now: false, day: i, index: i * 123421}]);
    }
  }, [keyword]);

  return (
    <Container width={Dimensions.get('window').width} position={position}>
      {days.map(day => (
        <Day data={day} keyword={keyword} key={day.index} />
      ))}
    </Container>
  );
};

export default Date;
