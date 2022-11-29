import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
export type initialStateProps = {
  checkedDay: string;
};

const {actions, reducer} = createSlice({
  name: 'redux',
  initialState: {
    checkedDay: moment().format('YYYY-MM-DD'),
  },
  reducers: {
    checkDay: (state, {payload: log}: PayloadAction<string>) => ({
      checkedDay: log,
    }),
  },
});

export const {checkDay} = actions;
export default reducer;
