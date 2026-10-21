import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { BriefcaseBusiness, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./useTheme";

const navLinks = ["home", "about", "skills", "projects", "blog", "contact"];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const renderLinks = (mobile = false) =>
    navLinks.map((section) => (
      <Link
        key={section}
        to={section}
        smooth
        duration={600}
        offset={-96}
        onClick={() => mobile && setMenuOpen(false)}
        className={`cursor-pointer capitalize transition-colors ${
          mobile
            ? "block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-indigo-50 hover:font-bold hover:text-indigo-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-indigo-300"
            : "rounded-full px-3.5 py-2.5 text-[13px] font-medium text-gray-600 transition-all hover:scale-[1.04] hover:bg-white hover:font-bold hover:text-indigo-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-300"
        }`}
        activeClass={
          mobile
            ? "!bg-indigo-50 !font-bold !text-indigo-700 dark:!bg-gray-700 dark:!text-indigo-300"
            : "!scale-[1.04] !bg-white !font-bold !text-indigo-700 !shadow-sm dark:!bg-gray-700 dark:!text-indigo-300"
        }
        spy
      >
        {section}
      </Link>
    ));

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg shadow-gray-900/5 backdrop-blur-xl dark:border-gray-700/80 dark:bg-gray-900/85 sm:px-5"
      >
        <Link
          to="home"
          smooth
          duration={600}
          offset={-96}
          className="flex shrink-0 cursor-pointer items-center gap-3"
          aria-label="Hammad Awowole, home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-600/20">
            H
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-bold leading-tight text-gray-900 dark:text-white">
              Hammad Awowole
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400">
              Mobile &amp; Web Developer
            </span>
          </span>
        </Link>

        <div className="hidden items-center rounded-l-full rounded-r-2xl bg-gray-100/80 p-1.5 pl-2 dark:bg-gray-800/80 lg:flex">
          {renderLinks()}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700 sm:inline-flex"
          >
            <BriefcaseBusiness size={15} aria-hidden="true" />
            <span className="hidden xl:inline">Available for projects</span>
            <span className="xl:hidden">Hire me</span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-indigo-300"
          >
            {theme === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-indigo-300 lg:hidden"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-[calc(100%+0.6rem)] rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl shadow-gray-900/10 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95 lg:hidden"
          >
            <div className="grid gap-1">{renderLinks(true)}</div>
            <div className="mt-2 border-t border-gray-200 px-4 pt-3 text-xs font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:hidden">
              Available for freelance and project work
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
