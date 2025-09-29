import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import AddressPage from './pages/AddressPage';
import ArticlesPage from "./pages/ArticlesPage";
import Login from "./user/Login";
import CreateUser from "./user/CreateUser";
import AnimalPage from "./pages/AnimalPage";

const App = () => {
    return (
        <BrowserRouter>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/api/addresses" element={<AddressPage />} />
                        <Route path="/api/articles" element={<ArticlesPage />} />
                        <Route path="/api/animals" element={<AnimalPage />} />
                        <Route path="/api/auth/login" element={<Login />} />
                        <Route path="/api/auth/register" element={<CreateUser />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
