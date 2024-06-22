'use client';

import {BrowserRouter as Router} from 'react-router-dom';

export default function ClientRouterProvider({children}) {
    return <Router>{children}</Router>;
}