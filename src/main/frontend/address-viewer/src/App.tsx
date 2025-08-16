import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import AddressPage from './pages/AddressPage';
import ArticlesPage from "./pages/ArticlesPage";

const App = () => {
    return (
        <BrowserRouter>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/adresses" element={<AddressPage />} />
                        <Route path="/articles" element={<ArticlesPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
