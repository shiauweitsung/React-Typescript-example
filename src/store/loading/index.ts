import {
  createSlice,
  isAsyncThunkAction,
  isFulfilled,
  PayloadAction,
} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading(state) {
      return !state;
    },
    loading(state) {
      return (state = true);
    },
    finishedLoading(state) {
      return (state = false);
    },
  },
  // extraReducers(builder) {
  // 	builder
  // 		.addCase(getSignatureAndconnectWallet.fulfilled, (state) => {
  // 			return (state = false);
  // 		})
  // 		.addCase(getSignatureAndconnectWallet.pending, (state) => {
  // 			return (state = true);
  // 		})
  // 		.addCase(getSignatureAndconnectWallet.rejected, (state) => {
  // 			return (state = false);
  // 		});
  // },
  // async onQueryStarted({ ...args }, { dispatch, queryFulfilled }) {
  //   // `onStart
  //   dispatch(loadingSlice.actions.loading());
  //   try {
  //     const { data } = await queryFulfilled;
  //     // `onSuccess
  //     dispatch(loadingSlice.actions.finishedLoading());
  //   } catch (err) {
  //     // `onError` side-effect
  //     dispatch(loadingSlice.actions.finishedLoading());
  //   }
  // },
});

export default loadingSlice;
