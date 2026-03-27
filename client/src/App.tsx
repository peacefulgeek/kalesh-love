import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Writing from "./pages/Writing";
import ArticlePage from "./pages/ArticlePage";
import Books from "./pages/Books";
import Connect from "./pages/Connect";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/writing" component={Writing} />
      <Route path="/writing/:slug" component={ArticlePage} />
      <Route path="/books" component={Books} />
      <Route path="/connect" component={Connect} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
