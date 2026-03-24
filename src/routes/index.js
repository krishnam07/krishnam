import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
  QRScreen,
  ScannerScreen,
  CustomizeQrScreen,
} from "./src/pages";

export const routes = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Login",
    component: LoginScreen,
  },
  {
    name: "Register",
    component: RegisterScreen,
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
