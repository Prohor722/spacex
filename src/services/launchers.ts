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
    flight_number: number,
    launch_date_local: string,
    launch_site:{
        site_id:string|null,
        site_name:string|null,
        site_name_long: string|null,
    },
    launch_failure_details:{
        reason: string|null
    },
    launch_success: boolean,
    launch_year: string,
    links:{
        article_link: string|null,
        mission_patch:string,
        mission_patch_small:string,
        video_link: string|null,
        wikipedia: string|null,
        }
    mission_name: string|null,
    rocket:{
        rocket_id:string|null,
        rocket_name:string|null,
        rocket_type:string|null,
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