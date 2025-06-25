import instanceAxios from "@/utils/axios";

type Props = {
  resource: "login" ;
  values: any;
};

export const auth = async ({ resource, values }: Props) => {
  const { data } = await instanceAxios.post(`/auth/${resource}`, values);
  return data;
};
