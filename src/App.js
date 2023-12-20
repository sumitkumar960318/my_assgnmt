import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PersonalInfoFilled from "./pages/PersonalInfoFilled";
import ChooseProfilePhoto from "./pages/ChooseProfilePhoto";
import LoginPage from "./pages/LoginPage";
import "./style.css"

function App() {
  return (
    <Routes>
      <Route path="/personalinfo" element={<PersonalInfoFilled />} />
      <Route path="/chooseprofilephoto" element={<ChooseProfilePhoto/>} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}
export default App;
