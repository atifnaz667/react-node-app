import * as userService from "../services/UserService.js";
import cookie from "cookie";

export const register = async (req, res) => {
  try {
    const {user, token} = await userService.registerUser(req.body);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userService.getCurrentUser(token);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({ message: "Logged out successfully" });
};