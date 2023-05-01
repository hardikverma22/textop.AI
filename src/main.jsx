import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";

import RootLayout from "./components/RootLayout.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loader from "./components/Loader.jsx";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Hero />} />
      <Route path="sentiment" element={<Sentiment />} />
      <Route path="classify" element={<ClassifyText />} />
      <Route path="keyext" element={<ExtractKeyword />} />
      <Route path="summarize" element={<SummarizeText />} />
      {/* <Route path="operation" element={<RootLayout />}>
        <Route path="sentiment" element={<Sentiment />} />
        <Route path="classify" element={<ClassifyText />} />
        <Route path="keyext" element={<ExtractKeyword />} />
        <Route path="summarize" element={<SummarizeText />} />
      </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
