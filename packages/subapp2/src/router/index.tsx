import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { qiankunWindow } from '@ygkit/vite-plugin-qiankun';
import Index from '../pages/index';
import About from '../pages/about';

export default function Router() {
    console.log(
        'qiankunWindow.__POWERED_BY_QIANKUN__',
        qiankunWindow.__POWERED_BY_QIANKUN__,
    );

    const baseUrl = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/subapp2/' : '/';
    return (
        <StrictMode>
            <BrowserRouter basename={baseUrl}>
                <Routes>
                    <Route path="/" element={<Index />}></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}
