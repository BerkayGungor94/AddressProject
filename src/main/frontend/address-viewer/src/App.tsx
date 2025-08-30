import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import AddressPage from './pages/AddressPage';
import ArticlesPage from "./pages/ArticlesPage";
import Login from "./user/Login";
import CreateUser from "./user/CreateUser";

const App = () => {
    return (
        <BrowserRouter>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/addresses" element={<AddressPage />} />
                        <Route path="/articles" element={<ArticlesPage />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<CreateUser />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
