import { Container } from "@/components/Container";
import { SITE } from "@/consts";
import { BackToTop } from "@/components/back-to-top";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="animate">
      <Container>
        <div className="relative">
          <div className="absolute -top-12 right-0">
            <BackToTop />
          </div>
        </div>
        <div className="hr-eink flex items-center justify-between border-t pt-5">
          <div className="eyebrow text-[0.65rem] text-ink-500 dark:text-ink-400">
            © {new Date().getFullYear()} · {SITE.TITLE}
          </div>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
