import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { api, adminApi } from '../services/api.js';
import { modelData as localModelData } from '../data/modelData.js';
import { blogData as localBlogData } from '../data/blogData.js';

const DataContext = createContext(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside <DataProvider>');
  return ctx;
};

export const DataProvider = ({ children }) => {
  const [allModels, setAllModels] = useState(localModelData);
  const [blogs, setBlogs] = useState(localBlogData);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  // FIX: track errors per-resource so a failing API doesn't block the whole app
  const [error, setError] = useState(null);

  // ─── Bootstrap data from API ───────────────────────────────────────────────
  useEffect(() => {
    // FIX: Promise.allSettled never rejects, so the outer try-catch was dead code.
    // Handle each result individually so one failed call doesn't silence others.
    const bootstrap = async () => {
      const [productsResult, blogsResult, settingsResult] = await Promise.allSettled([
        api.getProducts(),
        api.getBlogs(),
        api.getSettings(),
      ]);

      if (productsResult.status === 'fulfilled' && Object.keys(productsResult.value).length > 0) {
        setAllModels(productsResult.value);
      } else if (productsResult.status === 'rejected') {
        console.warn('Could not load products from API — using local data:', productsResult.reason?.message);
      }

      if (blogsResult.status === 'fulfilled' && blogsResult.value.length > 0) {
        setBlogs(blogsResult.value);
      } else if (blogsResult.status === 'rejected') {
        console.warn('Could not load blogs from API — using local data:', blogsResult.reason?.message);
      }

      if (settingsResult.status === 'fulfilled') {
        setSettings(settingsResult.value);
      } else if (settingsResult.status === 'rejected') {
        console.warn('Could not load settings from API:', settingsResult.reason?.message);
        setError('Some site settings could not be loaded.');
      }

      setLoading(false);
    };

    bootstrap();
  }, []);

  // ─── Products ──────────────────────────────────────────────────────────────
  const addModel = useCallback(async (id, newModel) => {
    await adminApi.createProduct(newModel);
    setAllModels((prev) => ({ ...prev, [id]: newModel }));
  }, []);

  const updateModel = useCallback(async (id, updatedModel) => {
    await adminApi.updateProduct(id, updatedModel);
    setAllModels((prev) => ({ ...prev, [id]: updatedModel }));
  }, []);

  const deleteModel = useCallback(async (id) => {
    await adminApi.deleteProduct(id);
    setAllModels((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // ─── Blogs ─────────────────────────────────────────────────────────────────
  const addBlog = useCallback(async (newBlog) => {
    const created = await adminApi.createBlog(newBlog);
    setBlogs((prev) => [created, ...prev]);
  }, []);

  const updateBlog = useCallback(async (id, updatedBlog) => {
    const updated = await adminApi.updateBlog(id, updatedBlog);
    setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }, []);

  const deleteBlog = useCallback(async (id) => {
    await adminApi.deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // ─── Settings ──────────────────────────────────────────────────────────────
  const updateSettings = useCallback(async (newSettings) => {
    const updated = await adminApi.updateSettings(newSettings);
    setSettings(updated);
    return updated;
  }, []);

  return (
    <DataContext.Provider
      value={{
        allModels, addModel, updateModel, deleteModel,
        blogs, addBlog, updateBlog, deleteBlog,
        settings, updateSettings,
        loading, error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
