import { baseApi } from "@/redux/api/baseApi";

export type PersonalGender = "mister" | "woman" | "diverse";

export interface PersonalDataPayload {
  image: string | null;
  gender: PersonalGender;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  level_of_care: number;
}

export interface PersonalDataResponse {
  success: boolean;
  message: string;
  data: PersonalDataPayload & { id: number };
}

export interface UpdatePersonalDataPayload {
  image?: File | null;
  gender: PersonalGender;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  level_of_care: number;
}

export const personalDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPersonalData: builder.query<PersonalDataResponse, void>({
      query: () => ({
        url: "/care-box/user-dashboard/personal-data/",
        method: "GET",
      }),
      providesTags: ["PersonalData"],
    }),
    updateUserPersonalData: builder.mutation<
      PersonalDataResponse,
      UpdatePersonalDataPayload
    >({
      query: (payload) => {
        const formData = new FormData();
        formData.append("gender", payload.gender);
        formData.append("first_name", payload.first_name);
        formData.append("last_name", payload.last_name);
        formData.append("date_of_birth", payload.date_of_birth);
        formData.append("level_of_care", String(payload.level_of_care));

        if (payload.image) {
          formData.append("image", payload.image);
        }

        return {
          url: "/care-box/user-dashboard/personal-data/update/",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["PersonalData"],
    }),
  }),
});

export const {
  useGetUserPersonalDataQuery,
  useUpdateUserPersonalDataMutation,
} = personalDataApi;
