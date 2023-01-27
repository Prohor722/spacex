import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LaunchesSlice = {
    isLoading: boolean;
    error: string;
    allLaunches: [];
    launch: {};
    searchValue: string;

}

// const initialState: LaunchesSlice ={
//     isLoading: false,
//     error: "",
//     allLaunches: [],
//     launch: {},
//     searchValue: "",
// }

// export const launchesSlice = createSlice({
//     name: 'launches',
//     initialState,
//     reducers: {
//         getAllLaunchers: (state, action)=>{
//             state.
//         }
//     }
// })