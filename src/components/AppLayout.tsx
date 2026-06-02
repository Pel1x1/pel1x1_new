import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import NotFound from '@/pages/NotFound';
import WebGLBackground from '@/components/WebGLBackground';

export default function AppLayout() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <WebGLBackground />
            <Index />
          </>
        }
      />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
