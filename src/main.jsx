import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import RootLayout from "./components/RootLayout.jsx";

import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Hero = lazy(() => import("./components/Hero.jsx"));

const ClassifyText = lazy(() =>
  import("./components/Classify/ClassifyText.jsx")
);

const ExtractKeyword = lazy(() =>
  import("./components/KeyExt/ExtractKeyword.jsx")
);

const SummarizeText = lazy(() =>
  import("./components/Summarize/SummarizeText.jsx")
);

const Sentiment = lazy(() =>
  import("./components/SentimentAnalysis/Sentiment.jsx")
);

const PageNotFound = lazy(() => import("./components/PageNotFound"));

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Hero />} />
        <Route path="sentiment" element={<Sentiment />} />
        <Route path="classify" element={<ClassifyText />} />
        <Route path="keyext" element={<ExtractKeyword />} />
        <Route path="summarize" element={<SummarizeText />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
