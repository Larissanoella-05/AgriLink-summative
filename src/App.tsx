import Home from "./pages/Home"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./UI/AppLayout"
import Products from "./pages/Products"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ProtectedRoute from "./UI/protectedRoute"
import Account from "./pages/Account"
import PersonalInfo from "./UI/PersonalInfo"
import ManageCrops from "./features/Crops/ManageCrops"
import Crop from "./pages/Crop"
import LanguageProvider from "./contexts/LanguageContext"
import { ProfileCropDetailed } from "./features/Crops/ProfileCropDetailed"
import Education from "./pages/Education"
import Course from "./pages/Course"
import Quiz from "./pages/Quiz"
import { ThemeProvider } from "./contexts/ThemeContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout></AppLayout>}>
                <Route index element={<Navigate replace to="home"></Navigate>}></Route>
                <Route element={<Home></Home>} path="home"></Route>
                <Route element={<Products></Products>} path="products"></Route>
                <Route element={<Education></Education>} path="education"></Route>
                <Route element={<Course></Course>} path="education/course/:id"></Route>
                <Route element={<Quiz></Quiz>} path="quiz/:id"></Route>
                <Route element={<Crop></Crop>} path="crop/:id"></Route>
                <Route
                  element={
                    <ProtectedRoute>
                      <Account></Account>
                    </ProtectedRoute>
                  }
                  path="account"
                >
                  <Route index element={<Navigate replace to="personalInfo"></Navigate>}></Route>

                  <Route element={<PersonalInfo></PersonalInfo>} path="personalInfo"></Route>

                  <Route
                    element={<ProfileCropDetailed></ProfileCropDetailed>}
                    path="/account/manageCrops/crop/:id"
                  ></Route>

                  <Route element={<ManageCrops></ManageCrops>} path="manageCrops"></Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "700px",
                padding: "16px 24px",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
              },
            }}
          />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
