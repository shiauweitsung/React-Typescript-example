import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export const fetchPokemo = createAsyncThunk(
  'pokemoApi',
  // if you type your function argument here
  async () => {
    const response = await fetch('https://pokeapi.co/api/v2/');
    return await response.json();
  }
);

// Define a type for the slice state
interface CounterState {
  value: number;
  pokemoData: any;
}

// type CounterState = {
//     value:number;
// }

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  pokemoData: undefined,
};

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemo.fulfilled, (state, action) => {
      // console.log(state, action, 'state, action');
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

// export default counterSlice;

export default counterSlice;
