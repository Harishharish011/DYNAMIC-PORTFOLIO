import './style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { LenisProvider } from './lenis/LenisProvider.js';
import GalaxyBackground from './components/background/GalaxyBackground.js';
import { Navbar } from './components/layout/Navbar/Navbar.js';
import { About } from './components/about/About.js';
import { SkillsSection } from './components/sections/SkillsSection.js';
import { ProjectsSection } from './components/sections/ProjectsSection.js';
import { ContactSection } from './components/sections/ContactSection.js';
import { Footer } from './components/Footer.js';
import { ProjectDetails } from './pages/ProjectDetails.js';
import { BlogsPage } from './pages/BlogsPage.js';
import { BlogDetailsPage } from './pages/BlogDetailsPage.js';
import { GithubPage } from './pages/GithubPage.js';
import { AdminLayout } from './pages/admin/AdminLayout.js';
import { LoginPage } from './pages/admin/LoginPage.js';


const rootEl = document.getElementById('app');



if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          LenisProvider,
          null,
          React.createElement(GalaxyBackground, null),
          React.createElement(Navbar, null),
          React.createElement(
            Routes,
            null,
            React.createElement(
              Route,
              {
                path: '/',
                element: React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(About, null),
                  React.createElement(SkillsSection, null),

                  React.createElement(ProjectsSection, null),
                  React.createElement(ContactSection, null),


                  React.createElement(Footer, null),
                ),
              },
              undefined,
            ),
            React.createElement(Route, {
              path: '/project/:id',
              element: React.createElement(ProjectDetails, null),
            }),
            React.createElement(Route, {
              path: '/blogs',
              element: React.createElement(BlogsPage, null),
            }),
            React.createElement(Route, {
              path: '/blogs/:slug',
              element: React.createElement(BlogDetailsPage, null),
            }),
            React.createElement(Route, {
              path: '/github',
              element: React.createElement(GithubPage, null),
            }),
            React.createElement(Route, {
              path: '/admin/login',
              element: React.createElement(LoginPage, null),
            }),
            React.createElement(Route, {
              path: '/admin/*',
              element: React.createElement(AdminLayout, null),
            }),

          ),

        ),
      ),
    ),
  );
}
