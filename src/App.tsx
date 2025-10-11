import logo from "./assets/rustypaste-logo.webp";
import { AuthGuard } from "@/components/AuthGuard.tsx";
import { Sections } from "@/components/Sections.tsx";
import { FaGithub } from "react-icons/fa";

export function App() {
  return (
    <div className="container mx-auto w-full h-screen p-4 flex flex-col items-center gap-4">
      <section className="flex justify-center mt-8">
        <img src={logo} alt="Rustypaste Logo" className="w-auto h-16" />
      </section>
      <AuthGuard>
        <Sections />
      </AuthGuard>
      <footer className="mt-auto text-gray-500">
        <a href="https://github.com/Silvenga/rustypaste-ui"
           rel="external nofollow noopener noreferrer"
           target="_blank"
           aria-label="Github Repository"
           className="hover:text-gray-700">
          <FaGithub className="size-5" />
        </a>
      </footer>
    </div>
  );
}
