// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Launchers ={
    flight_number: number;
    rocket: {
        rocket_name: string;
    };
    mission_name: string;
    launch_year: string;
    launch_date_local: string;
    launch_success: boolean;
    links: {
        mission_patch_small: string;
        mission_name: string;
    };
  };
type singleLauncher = {
    links:{
        mission_patch:string,
        mission_patch_small:string
        }
}
// Define a service using a base URL and expected endpoints
export const launchersApi = createApi({
  reducerPath: 'launchersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/launches'}),
  endpoints: (builder) => ({
    getLauncher: builder.query<singleLauncher,{}>({
      query: (flight_number) => `/${flight_number}`,
    }),
    getAllLauncher: builder.query<[Launchers],[]>({
      query: () => `/`,
    }),
  }),
})

export const { useGetAllLauncherQuery, useGetLauncherQuery } = launchersApi