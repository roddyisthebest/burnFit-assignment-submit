import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';
export type initialStateProps = {
  checkedDate: string;
};

const {actions, reducer} = createSlice({
  name: 'redux',
  initialState: {
    checkedDate: moment().format('YYYY-MM-DD'),
  },
  reducers: {
    checkDate: (state, {payload: log}: PayloadAction<string>) => ({
      checkedDate: log,
    }),
  },
});

export const {checkDate} = actions;
export default reducer;
