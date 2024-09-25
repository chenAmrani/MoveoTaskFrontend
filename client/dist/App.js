import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LobbyPage from './pages/LobbyPage';
import CodeBlockPage from '../src/pages/codeBlockPage';
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LobbyPage, {}) }), _jsx(Route, { path: "/codeblock/:id", element: _jsx(CodeBlockPage, {}) })] }) }));
};
export default App;
