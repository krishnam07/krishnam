import {
  HomeScreen,
  Signin,
  Signup,
  ProfileScreen,
  QRScreen,
  ScannerScreen,
  CustomizeQrScreen,
} from "../pages";

export const routes = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Login",
    component: Signin,
  },
  {
    name: "Register",
    component: Signup,
  },
  {
    name: "Profile",
    component: ProfileScreen,
  },
  {
    name: "QR",
    component: QRScreen,
  },
  {
    name: "CustomizeQR",
    component: CustomizeQrScreen,
  },
  {
    name: "Scanner",
    component: ScannerScreen,
  },
];
