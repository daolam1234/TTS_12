import instanceAxios from "@/utils/axios";
import bcrypt from "bcryptjs";

type Props = {
  resource: "login" | "register";
  values?: any;
};

export const auth = async ({ resource, values }: Props) => {
  if (resource === "register") {
    const { email, password, fullName } = values;

    // Kiểm tra email đã tồn tại
    const checkEmail = await instanceAxios.get(`users?email=${email}`);
    if (checkEmail.data.length > 0) {
      throw new Error("Email đã được sử dụng!");
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      role: "user",
    };

    const { data } = await instanceAxios.post("users", newUser);
    return data;
  }

  if (resource === "login") {
    const { data } = await instanceAxios.get(`users?email=${values.email}`);
    if (data.length === 0) {
      throw new Error("Email không tồn tại!");
    }

    const user = data[0];
    const isMatch = await bcrypt.compare(values.password, user.password);

    if (!isMatch) {
      throw new Error("Mật khẩu không đúng!");
    }

    return {
      accessToken: "dummy-token",
      user,
    };
  }

  throw new Error("Resource không hợp lệ");
};
