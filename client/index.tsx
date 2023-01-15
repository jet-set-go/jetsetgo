import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootNode: HTMLElement = document.getElementById('app')!;
const root = createRoot(rootNode);
root.render(<App />);
