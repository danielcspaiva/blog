import { Container } from "@/components/Container";
import { SITE } from "@/consts";
import { BackToTop } from "@/components/back-to-top";
import { ThemeToggle } from "@/components/theme-toggle";
import { DitherField } from "@/components/DitherField";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="flex justify-end">
          <BackToTop />
        </div>
      </Container>
      {/* The page sinks into ink: a rising dither field that resolves into
          the solid footer bar. */}
      <div aria-hidden="true" className="relative h-44 overflow-hidden">
        <DitherField direction="up" falloff={1.7} anchor />
      </div>
      <div className="site-footer__bar">
        <Container>
          <div className="flex items-center justify-between py-5">
            <div className="eyebrow text-[0.65rem]">
              © {new Date().getFullYear()} · {SITE.TITLE}
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </div>
    </footer>
  );
}
