import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AnalysisCenterPage } from '../pages/AnalysisCenterPage';
import { AnnotationCenterPage } from '../pages/AnnotationCenterPage';
import { ImageAnnotationPage } from '../pages/ImageAnnotationPage';
import { OverviewPage } from '../pages/OverviewPage';
import { ReportPage } from '../pages/ReportPage';
import { SampleAnalysisPage } from '../pages/SampleAnalysisPage';
import { SampleLibraryPage } from '../pages/SampleLibraryPage';
import { VideoAnnotationPage } from '../pages/VideoAnnotationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'samples', element: <SampleLibraryPage /> },
      { path: 'annotation', element: <AnnotationCenterPage /> },
      { path: 'annotation/image', element: <ImageAnnotationPage /> },
      { path: 'annotation/video', element: <VideoAnnotationPage /> },
      { path: 'analysis', element: <AnalysisCenterPage /> },
      { path: 'analysis/sample', element: <SampleAnalysisPage /> },
      { path: 'report', element: <ReportPage /> },
    ],
  },
]);
